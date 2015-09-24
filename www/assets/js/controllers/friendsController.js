/**
* friendsController
**/

define(["step", "whispeerHelper", "controllers/controllerModule"], function (step, h, controllerModule) {
	"use strict";

	function friendsController($scope, $ionicScrollDelegate, friendsService, userService, localize)  {
		$scope.friends = [];
		$scope.requests = [];
		$scope.friendsLoading = true;

		$scope.search = {
			friendsInput: ""
		};

		$scope.removeFriend = function (user) {
			if (confirm(localize.getLocalizedString("magicbar.requests.confirmRemove", { user: user.name }))) {
				user.user.removeAsFriend();
			}
		};

		function loadFriendsUsers() {
			step(function () {
				var friends = friendsService.getFriends();
				userService.getMultipleFormatted(friends, this);
			}, h.sF(function (result) {
				$scope.friends = result;
				$scope.friendsLoading = false;
				$ionicScrollDelegate.scrollTo(0,55);
			}));
		}

		function loadRequestsUsers() {
			step(function () {
				var requests = friendsService.getRequests();
				userService.getMultipleFormatted(requests, this);
			}, h.sF(function (result) {
				$scope.requests = result;
			}));
		}

		friendsService.listen(loadFriendsUsers);
		friendsService.listen(loadRequestsUsers);
		loadFriendsUsers();
		loadRequestsUsers();

		$scope.acceptRequest = function (request) {
			request.user.acceptFriendShip();
		};

		$scope.ignoreRequest = function (request) {
			request.user.ignoreFriendShip();
		};
	}

	friendsController.$inject = ["$scope", "$ionicScrollDelegate", "ssn.friendsService", "ssn.userService", "localize"];

	controllerModule.controller("ssn.friendsController", friendsController);
});
