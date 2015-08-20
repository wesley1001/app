"use strict";

define([
	"angular",
	"ionic",
	"ngCordova",

	"config/localizationConfig",
	"localizationModule",
	"services/services",
	"messages/messagesLoader",
	"user/userLoader",
	"models/models",
	"runners/runners",
	"config/interceptorsConfig",

	"config/routesConfig",
	"controllers/controllers",
	"directives/userimage",
	"directives/syntaxify",
	"optional!cordova"
], function (angular) {
	"use strict";
	// Ionic Starter App

	// angular.module is a global place for creating, registering and retrieving Angular modules
	// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
	// the 2nd parameter is an array of "requires"
	// "starter.services" is found in services.js
	// "starter.controllers" is found in controllers.js
	return angular.module("whispeer", [
		"ionic",
		"ssn.controllers",
		"ssn.services",
		"ssn.messages",
		"ssn.user",
		"ssn.models",
		"ssn.runners",
		//"ssn.directives",
		"ssn.interceptors.config",
		"ssn.locale.config",
		"localization",
		"ngCordova",
		"ssn.directives",
		"ssn.interceptors.config",
		"ssn.locale.config",
		"ssn.routes.config",
		"localization"
	])
		.run(["$ionicPlatform", "ssn.messageService", "ssn.sessionService", "ssn.trustService", function($ionicPlatform, messageService) {
			function vibrate(message) {
				if (!message.isOwn()) {
					navigator.vibrate(300);
				}
			}

			messageService.listen(vibrate, "message");

			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard && window.ionic.Platform.isIOS()) {
					window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					window.cordova.plugins.Keyboard.disableScroll(true);
				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					window.StatusBar.styleDefault();
				}
			});
		}]);
});
