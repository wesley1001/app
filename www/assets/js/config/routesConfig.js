define(["angular"], function (angular) {
	"use strict";

	angular.module("ssn.routes.config", ["ionic"]).config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
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
			controller: "ssn.settingsRedirectController"
		})
		.state("main.settings.main", {
			url: "",
			templateUrl: "assets/views/pages/main/settings/settings-main.html",
			controller: "ssn.settingsMainController"
		})
		.state("main.settings.id", {
			url: "/settings/id",
			templateUrl: "assets/views/pages/main/settings/settings-id.html",
			controller: "ssn.settingsIDController"
		})
		.state("main.settings.profile", {
			url: "/settings/profile",
			templateUrl: "assets/views/pages/main/settings/settings-profile.html",
			controller: "ssn.settingsProfileController"
		})
		.state("chat-detail", {
			url: "/chat/:chatId",
			templateUrl: "assets/views/pages/chat-detail.html",
			controller: "ssn.showTopicController"
		})
		.state("newMessage", {
			url: "/newMessage",
			templateUrl: "assets/views/pages/newMessage.html",
			controller: "ssn.newTopicController"
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise("/main/chats");
	}]);
});
