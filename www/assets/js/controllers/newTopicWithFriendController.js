define(["step", "whispeerHelper", "controllers/controllerModule", "asset/state"], function (step, h, controllerModule, State) {
	"use strict";
	controllerModule.controller("ssn.newTopicWithFriendController", [
		"$scope", "$state", "$stateParams", "$ionicHistory", "ssn.userService", "ssn.messageService", "ssn.errorService",
		function($scope, $state, $stateParams, $ionicHistory, userService, messageService, errorService) {

		$scope.now = new Date();

		var userID = h.parseDecimal($stateParams.userId);
		step(function () {
			messageService.getUserTopic(userID, this);
		}, h.sF(function (topicID) {
			if (topicID) {
				$ionicHistory.currentView($ionicHistory.backView());
				$state.go("chat-detail", {chatId: topicID}, { location: "replace" });
				return;
			}
			userService.get(userID, this);
		}), h.sF(function (user) {
			$scope.user = user.data;
			user.loadBasicData(this);
		}), errorService.criticalError);

		var sendMessageState = new State();
		$scope.sendMessageState = sendMessageState.data;

		$scope.create = {
			text: "",
			selectedUsers: {},
			send: function (text) {
				var receiver = [$scope.user.id];

				sendMessageState.pending();

				if (text === "" || receiver.length === 0) {
					sendMessageState.failed();
					return;
				}

				step(function () {
					messageService.sendNewTopic(receiver, text, [], this);
				}, h.sF(function (id) {
					$scope.create.text = "";
					$scope.create.selectedUsers = {};
					$scope.goToShow(id);
				}), errorService.failOnError(sendMessageState));
			}
		};

		$scope.goToShow = function (topicID) {
			$state.go("chat-detail", { chatId: topicID });
		};
	}]);
});
