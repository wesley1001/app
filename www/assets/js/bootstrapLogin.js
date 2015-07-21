/*global define, require, console, cordova, navigator */

define([
	"angular",
	"login/loginController",
	"ionicAngular"
], function (angular) {
    'use strict';

    function onDeviceReady() {
		var app = angular.module("whispeerLogin", ["ionic", "ssn.login"])
			.run(function($ionicPlatform) {
				$ionicPlatform.ready(function() {
					// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
					// for form inputs)
					if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
						cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					}
					if (window.StatusBar) {
						// org.apache.cordova.statusbar required
						StatusBar.styleDefault();
					}
				});
			});

        angular.bootstrap(document, [app.name]);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    if (typeof cordova === 'undefined') {
        angular.element().ready(onDeviceReady);
    }
    
});
