define([
	"angular",
	"ionic",
	"controllers",
	"services",
	"config/localizationConfig",
	"localizationModule",
	"services/services",
	"messages/messagesLoader",
	"user/userLoader",
	"models/models",
	"config/interceptorsConfig",
	"controllers/controllers"
], function (angular) {
	// Ionic Starter App

	// angular.module is a global place for creating, registering and retrieving Angular modules
	// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
	// the 2nd parameter is an array of "requires"
	// "starter.services" is found in services.js
	// "starter.controllers" is found in controllers.js
	return angular.module("whispeer", [
		"ionic",
		"whispeer.controllers",
		"whispeer.services",
		"ssn.controllers",
		"ssn.services",
		"ssn.messages",
		"ssn.user",
		"ssn.models",
		//"ssn.directives",
		"ssn.interceptors.config",
		"ssn.locale.config",
		"localization"
	])
		.run(["$ionicPlatform", "ssn.messageService", "ssn.sessionService", "ssn.trustService", function($ionicPlatform, messageService) {
			function vibrate(message) {
				if (!message.isOwn()) {
					navigator.vibrate(700);
				}
			}

			messageService.listen(vibrate, "message");

			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard && ionic.Platform.isIOS()) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);
				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}
			});
		}])
		.config(function($stateProvider, $urlRouterProvider) {
			// Ionic uses AngularUI Router which uses the concept of states
			// Learn more here: https://github.com/angular-ui/ui-router
			// Set up the various states which the app can be in.
			// Each state"s controller can be found in controllers.js
			$stateProvider

			// Each tab has its own nav history stack:

			.state("main", {
				url: "/main",
				templateUrl: "assets/views/pages/main.html"
			})
			.state("main.chats", {
				url: "/chats",
				templateUrl: "assets/views/pages/main/chats.html",
				controller: "ssn.listTopicsController"
			})
			.state("main.friends", {
				url: "/friends",
				templateUrl: "assets/views/pages/main/friends.html",
				controller: "ssn.friendsController"
			})
			.state("main.settings", {
				url: "/settings",
				templateUrl: "assets/views/pages/main/settings.html",
				controller: "ssn.settingsController"
			})
			.state("chat-detail", {
				url: "/chat/:chatId",
				templateUrl: "assets/views/pages/chat-detail.html",
				controller: "ssn.showTopicController"
			})
			.state("newMessage", {
				url: "/newMessage",
				templateUrl: "assets/views/pages/newMessage.html",
				controller: "NewMessageCtrl"
			});

			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise("/main/chats");
		})
		.directive("userimage", function () {
			return {
				transclude: false,
				scope:	{
					userData: 	"=user"
				},
				restrict: "E",
				templateUrl: "assets/views/directives/userimage.html",
				replace: true
			};
		});
});
