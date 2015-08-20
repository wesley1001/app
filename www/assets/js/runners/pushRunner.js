/**
* SessionService
**/
define(["runners/runnerModule"], function (runnerModule) {
	"use strict";

	runnerModule.run([
		"$rootScope", "$window", "ssn.socketService", "ssn.errorService",
		function ($rootScope, $window, socketService, errorService) {
		if (!$window.PushNotification) {
			console.warn("no push notifications");
			return;
		}
		var push = $window.PushNotification.init({
			"android": {
				"senderID": "649891747084"
			},
			"ios": {},
			"windows": {}
		});

		push.on("registration", function(data) {
			var type = "";

			if ($window.ionic.Platform.isAndroid()) {
				type = "android";
			} else if ($window.ionic.Platform.isIOS()) {
				type = "ios";
			}

			socketService.awaitConnection().then(function () {
				return socketService.emit("pushNotification.subscribe", {
					token: data.registrationId,
					type: type
				}, this);
			}).catch(errorService.criticalError);
			console.log(data.registrationId);
		});

		push.on("notification", function(data) {
			if (data.additionalData && data.additionalData) {
				console.log(data.additionalData);
				debugger;
			}
		});

		push.on("error", errorService.criticalError);
	}]);
});
