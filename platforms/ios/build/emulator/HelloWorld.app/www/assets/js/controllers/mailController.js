define(["whispeerHelper", "step", "asset/state"], function (h, step, SuccessState) {
	"use strict";

	function mailController($scope, $routeParams, socketService, cssService) {
		cssService.setClass("mailView");

		$scope.mails = true;

		var verifying = new SuccessState();
		$scope.verifying = verifying;

		$scope.verify = function (mailsEnabled) {
			verifying.reset();
			verifying.pending();

			step(function () {
				socketService.emit("verifyMail", {
					challenge: $routeParams.challenge,
					mailsEnabled: mailsEnabled
				}, this);
			}, h.sF(function (data) {
				if (data.mailVerified) {
					verifying.success();
				} else {
					$scope.verifying.failed();
				}
			}));
		};
	}

	mailController.$inject = ["$scope", "$routeParams", "ssn.socketService", "ssn.cssService"];

	return mailController;
});