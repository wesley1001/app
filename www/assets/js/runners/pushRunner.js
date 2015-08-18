/**
* SessionService
**/
define(["runners/runnerModule"], function (runnerModule) {
	"use strict";

	runnerModule.run([
		"$ionicPlatform", "$cordovaPush", "$rootScope", "$window", "$http", "ssn.socketService", "ssn.errorService",
		function ($ionicPlatform, $cordovaPush, $rootScope, $window, $http, socketService, errorService) {
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

			if (notification.alert) {
				navigator.notification.alert(notification.alert);
			}

			if (notification.sound) {
				var snd = new Media(event.sound);
				snd.play();
			}

			if (notification.badge) {
				$cordovaPush.setBadgeNumber(notification.badge).then(function(result) {}).catch(function(err) {
					alert("APN error: " + err);
				});
			}
		});

		$ionicPlatform.ready(function() {
			if(ionic.Platform.isIOS()) {
				var config = {
					"badge": true,
					"sound": true,
					"alert": true,
				};
			}

			if(ionic.Platform.isAndroid())  {
				var config = {
					"senderID": "649891747084",
				};
			}

			$cordovaPush.register(config).then(function(deviceToken){
				if (ionic.Platform.isIOS()) {
					console.log("deviceToken: " + deviceToken);
					$http.post("http://192.168.178.69:7777/subscribe", {user: "5", type: "ios", token: deviceToken}); // TODO: put real userid
				}
			}).catch(function(err) {
				alert("Push registration failed");
				console.error(err);
			});

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

			});
		});
	}]);
});
