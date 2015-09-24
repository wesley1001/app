define(["step", "whispeerHelper", "controllers/controllerModule", "asset/state"], function (step, h, controllerModule, State) {
	"use strict";
	controllerModule.controller("ssn.newTopicController", [
		"$scope", "$state", "$ionicScrollDelegate", "ssn.friendsService", "ssn.userService", "ssn.messageService", "ssn.errorService",
		function($scope, $state, $ionicScrollDelegate, friendsService, userService, messageService, errorService) {
		$scope.users = [];
		$scope.friendsLoading = true;
		$scope.search = {
			friendsInput: ""
		};

		step(function () {
			var friends = friendsService.getFriends();
			userService.getMultipleFormatted(friends, this);
		}, h.sF(function (result) {
			$scope.users = result;
			$ionicScrollDelegate.scrollTo(0,55);
			$scope.friendsLoading = false;
		}));

		var sendMessageState = new State();
		$scope.sendMessageState = sendMessageState.data;

		$scope.create = {
			text: "",
			selectedUsers: {},
			send: function (text) {
				var receiver = $scope.users.filter(function (u) {
					return $scope.create.selectedUsers[u.id];
				}).map(function (u) {
					return u.id;
				});

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
