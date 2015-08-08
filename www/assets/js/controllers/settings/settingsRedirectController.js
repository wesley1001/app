/**
* settingsRedirectController
**/

define(["controllers/controllerModule"], function (controllerModule) {
	"use strict";

	function settingsController($scope, $rootScope, $state) {
		function checkState() {
			var stateName = $state.current.name
			if (stateName === "main.settings") {
				$state.go("main.settings.main");
			}
		}

		checkState();

		$rootScope.$on("$stateChangeSuccess", checkState);
	}

	settingsController.$inject = ["$scope", "$rootScope", "$state"];

	controllerModule.controller("ssn.settingsRedirectController", settingsController);
});
