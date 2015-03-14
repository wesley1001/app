// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})
	.config(function($stateProvider, $urlRouterProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

		// Each tab has its own nav history stack:

		.state('chats', {
			url: '/',
			templateUrl: 'assets/views/pages/chats.html',
			controller: 'ChatsCtrl'
		})
		.state('chat-detail', {
			url: '/:chatId',
			templateUrl: 'assets/views/pages/chat-detail.html',
			controller: 'ChatDetailCtrl'
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');
	})
	.directive('savebutton', function () {
		return {
			transclude: true,
			scope:	{
				state:		"=state",
				translation:"@translation"
			},
			restrict: "E",
			templateUrl: "assets/views/directives/saveButton.html",
			replace: true,
			link: function (scope, iElement, iAttrs) {
				scope.successIcon = "fa-check-circle";
				scope.initIcon = "fa-check-circle";
				scope.failureIcon = "fa-times-circle";

				if (iAttrs.initicon) {
					scope.initIcon = iAttrs.initicon;
				}

				if (iAttrs.successicon) {
					scope.successIcon = iAttrs.successicon;
				}

				if (iAttrs.failureicon) {
					scope.failureIcon = iAttrs.failureicon;
				}

				if (typeof iAttrs.noiniticon !== "undefined") {
					delete scope.initIcon;
				}
			}
		};
	})
	.directive('userimage', function () {
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


