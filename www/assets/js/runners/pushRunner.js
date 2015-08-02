/**
* SessionService
**/
define(["runners/runnerModule"], function (runnerModule) {
	"use strict";

	runnerModule.run([
		"$ionicPlatform", "$cordovaPush", "$rootScope", "$window", "ssn.socketService", "ssn.errorService",
		function ($ionicPlatform, $cordovaPush, $rootScope, $window, socketService, errorService) {
		if (!$window.plugins || !$window.plugins.pushNotification) {
			console.warn("No push notifications available");
			return;
		}

		$rootScope.$on("$cordovaPush:notificationReceived", function(event, notification) {
			switch(notification.event) {
				case "registered":
					if (notification.regid.length > 0 ) {
						socketService.awaitConnection().then(function () {
							return socketService.emit("pushNotification.subscribe", {
								token: notification.regid,
								type: "android"
							}, this);
						}).catch(errorService.criticalError);
					}
					break;

				case "message":
					// this is the actual push notification. its format depends on the data model from the push server
					console.log("message = " + notification);
					break;

				case "error":
					alert("GCM error = " + notification.msg);
					break;

				default:
					alert("An unknown GCM event has occurred");
					break;
			}
		});

		$ionicPlatform.ready(function() {
			var androidConfig = {
				"senderID": "649891747084",
			};

			$cordovaPush.register(androidConfig).catch(function(err) {
				alert("Push registration failed");
				console.error(err);
			});
		});
	}]);
});
