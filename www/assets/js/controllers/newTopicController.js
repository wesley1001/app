define(["step", "whispeerHelper", "controllers/controllerModule"], function (step, h, controllerModule) {
	"use strict";
	controllerModule.controller("ssn.newTopicController", ["$scope", "ssn.friendsService", "ssn.userService", function($scope, friendsService, userService) {
		$scope.users = [];

		step(function () {
			var friends = friendsService.getFriends();
			userService.getMultipleFormatted(friends, this);
		}, h.sF(function (result) {
			$scope.users = result;
		}));
	}]);
});
