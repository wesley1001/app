/**
* friendsController
**/

define(["whispeerHelper", "step", "asset/state", "controllers/controllerModule"], function (h, step, State, controllerModule) {
	"use strict";

	function settingsController($scope, $timeout, errorService, sessionHelper, settingsService, userService, localize) {
		var saveNameState = new State();
		$scope.saveNameState = saveNameState.data;

		var saveMailState = new State();
		$scope.saveMailState = saveMailState.data;

		var savePasswordState = new State();
		$scope.savePasswordState = savePasswordState.data;

		$scope.languages = ["de", "en"];

		$scope.pwState = { password: "" };
		$scope.pwValidationOptions = {
			validateOnCallback: true,
			hideOnInteraction: true
		};

		step(function () {
			userService.getown().loadBasicData(this);
		}, h.sF(function () {
			var uiLanguage = settingsService.getBranch("uiLanguage");

			$scope.sendShortCut = "enter";

			$scope.uiLanguage = localize.getLanguage();

			if (uiLanguage && uiLanguage.data) {
				$scope.uiLanguage = uiLanguage.data;
			}

			var names = userService.getown().data.names || {};
			$scope.firstName = names.firstname;
			$scope.lastName = names.lastname;
			$scope.nickName = names.nickname;
		}), errorService.criticalError);

		$scope.mail = userService.getown().getMail();

		$scope.saveName = function () {
			saveNameState.pending();

			var me = userService.getown();
			step(function () {
				me.setProfileAttribute("basic", {
					firstname: $scope.firstName,
					lastname: $scope.lastName
				}, this.parallel());
			}, h.sF(function () {
				me.uploadChangedProfile(this);
			}), h.sF(function () {
				$timeout(this);
			}), errorService.failOnError(saveNameState));
		};

		$scope.saveMail = function () {
			saveMailState.pending();

			step(function () {
				userService.getown().setMail($scope.mail, this);
			}, errorService.failOnError(saveMailState));
		};

		$scope.savePassword = function () {
			savePasswordState.pending();

			if ($scope.pwValidationOptions.checkValidations()) {
				savePasswordState.failed();
				return;
			}

			step(function () {
				userService.getown().changePassword($scope.pwState.password, this);
			}, errorService.failOnError(savePasswordState));
		};
	}

	settingsController.$inject = ["$scope", "$timeout", "ssn.errorService", "ssn.sessionHelper", "ssn.settingsService", "ssn.userService", "localize"];

	controllerModule.controller("ssn.settingsProfileController", settingsController);
});
