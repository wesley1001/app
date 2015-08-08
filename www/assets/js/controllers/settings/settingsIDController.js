/**
* friendsController
**/

define(["whispeerHelper", "step", "asset/state", "libs/qr", "controllers/controllerModule"], function (h, step, State, qr, controllerModule) {
	"use strict";

	function settingsController($scope, $timeout, errorService, sessionHelper, userService) {
		step(function () {
			userService.getown().loadBasicData(this);
		}, h.sF(function () {
			var fp = userService.getown().data.fingerprint;
			$scope.fingerprint = [fp.substr(0,13), fp.substr(13,13), fp.substr(26,13), fp.substr(39,13)];

			qr.image({
				image: document.getElementById("fingerPrintQR"),
				value: fp,
				size: 8,
				level: "M"
			});
		}), errorService.criticalError);
	}

	settingsController.$inject = ["$scope", "$timeout", "ssn.errorService", "ssn.sessionHelper", "ssn.userService"];

	controllerModule.controller("ssn.settingsIDController", settingsController);
});
