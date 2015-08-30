define(["whispeerHelper", "Dexie", "bluebird", "services/serviceModule"], function (h, Dexie, Promise, serviceModule) {
	"use strict";

	function getDirectoryFileList(directoryEntry) {
		var reader = directoryEntry.createReader();

		return new Promise(function (resolve, reject) {
			var files = [];

			function doRead() {
				reader.readEntries(function (toAddFiles) {
					if (toAddFiles.length === 0) {
						resolve(files);
						return;
					}

					files = files.concat(toAddFiles);
					doRead();
				}, reject);
			}

			doRead();
		});
	}

	function promisify(func, thisArg) {
		return function () {
			var $_len = arguments.length;
			var args = new Array($_len);
			for(var $_i = 0; $_i < $_len; ++$_i) {
				args[$_i] = arguments[$_i];
			}

			return new Promise(function (resolve, reject) {
				args.push(resolve, reject);

				func.apply(thisArg, args);
			});
		};
	}

	function readFile(fileObject) {
		var reader = new FileReader();

		var resultPromise = new Promise(function (resolve) {
			reader.onload = function (evt) {
				resolve(evt.target.result);
			};
		});

		reader.readAsText(fileObject);

		return resultPromise;
	}

	function getFileContent(directoryEntry, filename, options) {
		var getFileAsync = promisify(directoryEntry.getFile, directoryEntry);

		return getFileAsync(filename, options).then(function (fileEntry) {
			var getFileObject = promisify(fileEntry.file, fileEntry);
			return getFileObject();
		}).then(function (fileObject) {
			if (options.raw) {
				return fileObject;
			}

			return readFile(fileObject);
		});
	}

	function writeFile(directoryEntry, filename, options, data) {
		var getFileAsync = promisify(directoryEntry.getFile, directoryEntry);

		return getFileAsync(filename, options).then(function (fileEntry) {
			var createWriterAsync = promisify(fileEntry.createWriter, fileEntry);
			return createWriterAsync();
		}).then(function (fileWriter) {
			var resultPromise = new Promise(function (resolve, reject) {
				fileWriter.onwriteend = resolve;
				fileWriter.onerror = reject;
			});

			fileWriter.write(data);

			return resultPromise;
		});
	}

	if (window.cordova && window.cordova.file) {
		var resolveLocalFileSystemURLAsync = promisify(window.resolveLocalFileSystemURL);
		var openCacheDirectory = resolveLocalFileSystemURLAsync(window.cordova.file.cacheDirectory).then(function (fs) {
			var getDirectoryAsync = promisify(fs.getDirectory, fs);
			return getDirectoryAsync("whispeerCacheDatabase", {create: true});
		});
	}

	var errorService;

	function Cache(name, options) {
		this._name = name;
		this._options = options || {};

		this._openSubCacheDirectory = openCacheDirectory.then(function (directoryEntry) {
			var getDirectoryAsync = promisify(directoryEntry.getDirectory, directoryEntry);
			return getDirectoryAsync(name, {create: true});
		});
	}

	Cache.prototype.entryCount = function () {
		return this._openSubCacheDirectory.then(function (cacheDir) {
			return getDirectoryFileList(cacheDir);
		}).then(function (files) {
			return files.filter(function (file) {
				return file.isFile;
			}).filter(function (file) {
				return file.name.indexOf("Data") > -1;
			});
		}).then(function (files) {
			return files.length;
		});
	};

	Cache.prototype.store = function (id, data, blob) {
		if (blob && blob.size > 1*1024*1024) {
			return Promise.resolve();
		}

		Promise.delay().bind(this).then(function () {
			return this.cleanUp();
		}).catch(errorService.criticalError);

		return this._openSubCacheDirectory.bind(this).then(function (cacheDir) {
			var metaEntry = {
				created: new Date().getTime(),
				used: new Date().getTime(),
				id: this._name + "/" + id,
				type: this._name,
				size: 0
			};

			if (blob) {
				metaEntry.blob = true;
				metaEntry.size = blob.size;
			}

			var done = [
				writeFile(cacheDir, "Cache" + id + "Meta", {create: true}, JSON.stringify(metaEntry)),
				writeFile(cacheDir, "Cache" + id + "Data", {create: true}, JSON.stringify(data))
			];

			if (blob) {
				done.push(writeFile(cacheDir, "Cache" + id + "Blob", {create: true}, blob));
			}

			return Promise.all(done);
		});
	};

	Cache.prototype._updateUsed = function (id, meta) {
		if (new Date().getTime() - meta.used > 12 * 60 * 60 * 1000) {
			meta.used = new Date().getTime();

			var newContent = JSON.stringify(meta);
			this._openSubCacheDirectory.then(function (cacheDir) {
				return writeFile(cacheDir, "Cache" + id + "Meta", {}, newContent);
			}).catch(errorService.criticalError);
		}
	};

	Cache.prototype.get = function (id) {
		return this.getMeta(id).bind(this).then(function (parsedContent) {
			this._updateUsed(id, parsedContent);

			var files = [this.getData()];

			if (parsedContent.blob) {
				files.push(this.getBlob());
			}

			return Promise.all(files).spread(function (data, blob) {
				parsedContent.blob = blob;
				parsedContent.data = data;

				return parsedContent;
			});
		}).catch(function (err) {
			console.error(err);

			throw new Error("cache miss");
		});
	};

	Cache.prototype.getData = function (id) {
		return this._openSubCacheDirectory.bind(this).then(function (cacheDir) {
			return getFileContent(cacheDir, "Cache" + id + "Data", {});
		}).then(function (data) {
			return JSON.parse(data);
		});
	};

	Cache.prototype.getBlob = function (id) {
		return this._openSubCacheDirectory.bind(this).then(function (cacheDir) {
			return getFileContent(cacheDir, "Cache" + id + "Blob", { raw: true });
		});
	};

	Cache.prototype.getMeta = function (id) {
		return this._openSubCacheDirectory.then(function (cacheDir) {
			return getFileContent(cacheDir, "Cache" + id + "Meta", {});
		}).then(function (content) {
			return JSON.parse(content);
		});
	};

	Cache.prototype.cleanUp = function () {
		//remove data which hasn't been used in a long time or is very big
		return this.entryCount().bind(this).then(function (count) {
			if (count > 100) {
				return this._openSubCacheDirectory.bind(this).then(function (cacheDir) {
					return getDirectoryFileList(cacheDir);
				}).then(function (files) {
					var byIDs = {}, groupedFiles = [];

					files.filter(function (file) {
						return file.isFile;
					}).forEach(function (file) {
						var id = file.name
							.replace(/Meta$/, "")
							.replace(/Data$/, "")
							.replace(/Blob$/, "")
							.replace(/^Cache/, "");

						console.log(id);
						if (!byIDs[id]) {
							byIDs[id] = {
								files: [],
								id: id
							};
						}
						byIDs[id].files.push(file);
					});

					h.objectEach(byIDs, function (key, val) {
						groupedFiles.push(val);
					});

					return groupedFiles;
				}).map(function (cacheEntry) {
					return this.getMeta(cacheEntry.id).then(function (metaData) {
						cacheEntry.meta = metaData;

						return cacheEntry;
					});
				}).then(function (files) {
					return files.sort(function (f1, f2) {
						return f1.meta.used - f2.meta.used;
					}).slice(0, files.length - 70);
				}).map(function (fileData) {
					return Promise.all(fileData.files.map(function (fileEntry) {
						var rem = promisify(fileEntry.remove, fileEntry);
						return rem();
					}));
				});
			}
		});
	};

	function NoCache() {}

	NoCache.prototype.entryCount = function () {
		return Promise.reject();
	};

	NoCache.prototype.store = function () {
		return Promise.resolve();
	};

	NoCache.prototype.get = function () {
		return Promise.reject();
	};

	NoCache.prototype.cleanUp = function () {
		return Promise.resolve();
	};

	function service (_errorService) {
		errorService = _errorService;

		if (window.cordova && window.cordova.file) {
			return Cache;
		}

		return NoCache;
	}

	service.$inject = ["ssn.errorService"];

	serviceModule.factory("ssn.cacheService", service);
});
