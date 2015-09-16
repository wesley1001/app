define(["step", "whispeerHelper", "services/serviceModule", "bluebird"], function (step, h, serviceModule, Bluebird) {
	"use strict";

	var service = function ($timeout, $rootScope, errorService, socketService, sessionService, migrationService, CacheService) {
		var newCallbacks = [];

		function awaitConnection() {
			return new Bluebird(function (resolve) {
				if (socketService.isConnected()) {
					resolve();
				} else {
					socketService.once("connect", resolve);
				}
			});
		}

		function getCache(initRequest) {
			console.time("cacheGet" + initRequest.domain);
			return new CacheService(initRequest.domain).get(initRequest.id || sessionService.getUserID()).then(function (cache) {
				initRequest.cache = cache;
				console.timeEnd("cacheGet" + initRequest.domain);

				return initRequest;
			}).catch(function () {
				console.timeEnd("cacheGet" + initRequest.domain);
				return initRequest;
			});
		}

		function setCache(initResponse, transformedData) {
			if (!transformedData) {
				return Bluebird.resolve(initResponse);
			}

			console.time("cacheSet" + initResponse.domain);
			return new CacheService(initResponse.domain)
				.store(initResponse.id || sessionService.getUserID(), transformedData)
				.then(function () {
					console.timeEnd("cacheSet" + initResponse.domain);
					return initResponse;
				})
				.catch(function () {
					console.timeEnd("cacheSet" + initResponse.domain);
					return initResponse;
				});
		}

		function getServerData(initRequests) {
			return Bluebird.resolve(initRequests).map(function (request) {
				var requestObject = {
					responseKey: "content"
				};

				var id = request.id;

				if (typeof id === "function") {
					id = id();
				}

				if (typeof id !== "undefined") {
					requestObject.id = id;
				}

				if (request.cache && request.cache.data) {
					if (request.cache.data._signature) {
						requestObject.cacheSignature = request.cache.data._signature;
					} else if (request.cache.data.meta && request.cache.data.meta._signature) {
						requestObject.cacheSignature = request.cache.data.meta._signature;
					}
				}

				return socketService.emit(request.domain, requestObject).then(function (response) {
					request.data = response;

					return request;
				});
			});
		}

		function runCallbacksPriorized(initResponses, shouldBePriorized) {
			return Bluebird.resolve(initResponses.filter(function (response) {
				return (shouldBePriorized ? response.options.priorized : !response.options.priorized);
			})).map(function (response) {
				var callback = Bluebird.promisify(response.callback);

				if (response.options.cache) {
					return callback(response.data.content, response.cache).then(function (transformedData) {
						return setCache(response, transformedData);
					});
				}

				return callback(response.data.content);
			});
		}

		function runCallbacks(initResponses) {
			return runCallbacksPriorized(initResponses, true).then(function () {
				return runCallbacksPriorized(initResponses, false);
			});
		}

		function loadData() {
			awaitConnection().then(function () {
				console.time("cacheInitGet");
				return newCallbacks;
			}).map(function (initRequest) {
				if (initRequest.options.cache) {
					return getCache(initRequest);
				} else {
					return initRequest;
				}
			}).then(function (initRequests) {
				console.timeEnd("cacheInitGet");
				console.time("serverInitGet");
				return getServerData(initRequests);
			}).then(function (initResponses) {
				console.timeEnd("serverInitGet");
				console.time("init");
				return runCallbacks(initResponses);
			}).then(function () {
				console.timeEnd("init");
				migrationService();
				$rootScope.$broadcast("ssn.ownLoaded");
			}).catch(errorService.criticalError);
		}

		$rootScope.$on("ssn.login", function () {
			loadData();
		});

		return {
			/** get via api, also check cache in before!
			* @param domain: domain to get from
			* @param priorized: is this callback priorized?
			*/
			get: function (domain, id, cb, options) {
				newCallbacks.push({
					domain: domain,
					id: id,
					callback: cb,
					options: options || {}
				});
			}
		};
	};

	service.$inject = ["$timeout", "$rootScope", "ssn.errorService", "ssn.socketService", "ssn.sessionService", "ssn.migrationService", "ssn.cacheService"];

	serviceModule.factory("ssn.initService", service);
});
