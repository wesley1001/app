/**
* settingsMainController
**/

define(["controllers/controllerModule"], function (controllerModule) {
	"use strict";

	function settingsController($scope, sessionService) {
		$scope.logout = function () {
			sessionService.logout();
		};
	}

	settingsController.$inject = ["$scope", "ssn.sessionService"];

	controllerModule.controller("ssn.settingsMainController", settingsController);
});
