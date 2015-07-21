/**
* LoginService
**/
define(["services/serviceModule", "crypto/keyStore"], function (serviceModule, keyStore) {
	"use strict";

	var service = function ($rootScope, socketService) {
		$rootScope.$on("ssn.reset", function () {
			keyStore.reset();
		});

		keyStore.setAfterAsyncCall(function (cb) {
			$rootScope.$apply(function () {
				cb();
			});
		});

		keyStore.upload.setSocket(socketService);

		return keyStore;
	};

	serviceModule.factory("ssn.keyStoreService", ["$rootScope", "ssn.socketService", service]);
});
