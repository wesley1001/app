/**
* settingsProfileController
**/

define(["whispeerHelper", "step", "asset/state", "controllers/controllerModule"], function (h, step, State, controllerModule) {
	"use strict";

	function settingsController($scope, $timeout, $ionicNavBarDelegate, errorService, sessionHelper, settingsService, userService, localize) {
		var saveNameState = new State();
		$scope.saveNameState = saveNameState.data;

		var saveMailState = new State();
		$scope.saveMailState = saveMailState.data;

		var savePasswordState = new State();
		$scope.savePasswordState = savePasswordState.data;

		$scope.user = {};

		$scope.languages = ["de", "en"];

		$scope.pwState = { password: "" };
		$scope.pwValidationOptions = {
			validateOnCallback: true,
			hideOnInteraction: true
		};

		var loadSettingsData = function() {
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
				$scope.user.firstName = names.firstname;
				$scope.user.lastName = names.lastname;
				$scope.user.nickName = names.nickname;
			}), errorService.criticalError);
		};

		loadSettingsData();

		$scope.user.mail = userService.getown().getMail();

		$scope.editing = false;

		$scope.startEdit = function() {
			$scope.editing = true;
		};

		$scope.resetEdit = function() {
			$scope.editing = false;
			loadSettingsData();
			$scope.user.mail = userService.getown().getMail();
		};

		$scope.$watch("editing", function() {
			$ionicNavBarDelegate.showBackButton(!$scope.editing);
		});

		$scope.saveName = function () {
			saveNameState.pending();

			var me = userService.getown();
			step(function () {
				me.setProfileAttribute("basic", {
					firstname: $scope.user.firstName,
					lastname: $scope.user.lastName
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
				userService.getown().setMail($scope.user.mail, this);
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

		$scope.saveAll = function () {
			$scope.saveName();
			$scope.saveMail();
			$scope.editing = false;
			//$scope.savePassword();
		};
	}

	settingsController.$inject = ["$scope", "$timeout", "$ionicNavBarDelegate", "ssn.errorService", "ssn.sessionHelper", "ssn.settingsService", "ssn.userService", "localize"];

	controllerModule.controller("ssn.settingsProfileController", settingsController);
});
