define(["angular", "config/localizationConfig", "directives/savebutton", "localizationModule"], function (angular) {
	"use strict";
	return angular.module("ssn.login", ["ssn.services", "ssn.directives", "ssn.locale.config", "localization"]);
});
