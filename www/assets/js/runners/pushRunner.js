/**
* SessionService
**/
define(["runners/runnerModule", "bluebird"], function (runnerModule, Bluebird) {
	"use strict";

	runnerModule.run([
		"$state", "$rootScope", "$window", "ssn.socketService", "ssn.errorService", "ssn.messageService",
		function ($state, $rootScope, $window, socketService, errorService, messageService) {
		if (!$window.PushNotification) {
			console.warn("no push notifications");
			return;
		}

		var ownLoaded = new Bluebird(function (resolve) {
			$rootScope.$on("ssn.ownLoaded", resolve);
		});

		var push = $window.PushNotification.init({
			"android": {
				"senderID": "809266780938"
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
			if (data.additionalData && data.additionalData && data.additionalData.content) {
				ownLoaded.then(function () {
					messageService.addData(data.additionalData.content);
					$state.go("chat-detail", { chatId: data.additionalData.content.message.meta.topicid });
				});
			}
		});

		push.on("error", errorService.criticalError);
	}]);
});
