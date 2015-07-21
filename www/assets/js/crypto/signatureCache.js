define (["whispeerHelper", "step", "asset/observer", "asset/errors", "crypto/keyStore", "crypto/helper", "asset/securedDataWithMetaData"], function (h, step, Observer, errors, keyStore, chelper, SecuredData) {
	"use strict";
	var database, loaded = false, signKey, changed = false;

	function dataSetToHash(signature, hash, key) {
		var data = {
			signature: chelper.bits2hex(signature),
			signatureHash: chelper.bits2hex(hash),
			key: key
		};

		return keyStore.hash.hashObjectOrValueHex(data);
	}

	function allHashes() {
		return database.metaKeys().filter(function (key) {
				return key.indexOf("hash::") === 0;
		});
	}

	function cleanUpDatabase() {
		if (allHashes().length > 500) {
			console.log("Cleaning up database (" + allHashes().length + ")");
			var times = allHashes().map(function (key) {
				return database.metaAttr(key);
			});

			times.sort(function (a, b) { return b - a; });

			var border = times[400] + 200;

			allHashes().forEach(function (key) {
				if (database.metaAttr(key) < border) {
					database.metaRemoveAttr(key);
					changed = true;
				}
			});

			console.log("Cleaned up database (" + allHashes().length + ")");
		}
	}

	var signatureCache = {
		isLoaded: function () {
			return loaded;
		},
		isChanged: function () {
			return changed;
		},
		createDatabase: function (ownKey) {
			var data = {};

			signKey = ownKey;
			data.me = ownKey;

			database = new SecuredData.load(undefined, data, { type: "signatureCache" });
			loaded = true;

			signatureCache.notify("", "loaded");
		},
		loadDatabase: function (data, ownKey, cb) {
			var givenDatabase = new SecuredData.load(undefined, data, { type: "signatureCache" });
			step(function () {
				if (data.me === ownKey) {
					givenDatabase.verify(ownKey, this);
				} else {
					throw new errors.SecurityError("not my signature cache");
				}
			}, h.sF(function () {
				//migrate database here before really loading it if necessary
				givenDatabase.metaKeys().filter(function (key) {
					return key.indexOf("hash::") === 0 && typeof givenDatabase.metaAttr(key) === "boolean";
				}).forEach(function (key) {
					if (givenDatabase.metaAttr(key) === false) {
						givenDatabase.metaRemoveAttr(key);
					} else {
						givenDatabase.metaSetAttr(key, new Date().getTime());
					}

					changed = true;
				});

				this.ne();
			}), h.sF(function () {
				signKey = ownKey;
				database = givenDatabase;
				loaded = true;

				signatureCache.notify("", "loaded");

				this.ne();
			}), cb);
		},
		isSignatureInCache: function (signature, hash, key) {
			var sHash = dataSetToHash(signature, hash, key);
			if (database.metaHasAttr(sHash)) {
				return true;
			}

			return false;
		},
		getSignatureStatus: function (signature, hash, key) {
			var sHash = dataSetToHash(signature, hash, key);
			if (database.metaHasAttr(sHash)) {
				var data = database.metaAttr(sHash);

				changed = true;
				database.metaSetAttr(sHash, new Date().getTime());

				cleanUpDatabase();

				return (data !== false);
			} else {
				throw new Error("tried to get signature status but not in cache!");
			}
		},
		addSignatureStatus: function (signature, hash, key, valid) {
			if (!valid) {
				return;
			}

			changed = true;

			if (typeof valid !== "boolean" || !h.isRealID(key) || !h.isSignature(chelper.bits2hex(signature))) {
				throw new Error("invalid input");
			}

			var sHash = dataSetToHash(signature, hash, key);

			database.metaSetAttr(sHash, new Date().getTime());

			cleanUpDatabase();
		},
		reset: function () {
			loaded = false;
			database = undefined;
		},
		getUpdatedVersion: function (cb) {
			changed = false;

			step(function () {
				database.sign(signKey, cb, true);
			}, cb);
		}
	};

	Observer.call(signatureCache);

	return signatureCache;
});
