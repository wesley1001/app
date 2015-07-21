define(["services/serviceModule", "whispeerHelper"], function (serviceModule, h) {
	"use strict";

	serviceModule.factory("ssn.locationService", ["$location", "ssn.storageService", function ($location, Storage) {
		var loginStorage = new Storage("whispeer.login");
		var sessionStorage = new Storage("whispeer.session");

		var blockedReturnUrls = ["/b2c", "/recovery"];

		var api = {
			setTopLocation: function (url) {
				window.location = url;
			},
			mainPage: function () {
				api.setTopLocation("main.html");
			},
			landingPage: function () {
				api.setTopLocation("login.html");
			},
			isLoginPage: function () {
				return window.top.location.pathname.indexOf("login.html") !== -1;
			},
			loginPage: function () {
				api.setTopLocation("login.html");
			},
			isBlockedReturnUrl: function (url) {
				return false;
			},
			setReturnUrl: function (url) {
			},
			loadInitialURL: function () {
				$location.path("/main");
			},
			getUrlParameter: function (param) {
				var search = window.top.location.search;
				var pairs = search.substr(1).split("&");

				var result = h.array.find(pairs.map(function (pair) {
					if (pair.indexOf("=") !== -1) {
						return {
							key: pair.substr(0, pair.indexOf("=")),
							value: pair.substr(pair.indexOf("=") + 1)
						};
					} else {
						return {
							key: pair,
							value: ""
						};
					}
				}), function (pair) {
					return pair.key === param;
				});

				if (result) {
					return result.value;
				}
			},
			updateURL: function (loggedin) {
				//not logged in but on a page requiring login --> landing
				if (!loggedin) {
					//this is only here to make absolutely sure that the localStorage is cleared to protect from infinite redirects.
					sessionStorage.clear();
					api.setReturnUrl($location.path());
					api.landingPage();
					return;
				}
			}
		};

		return api;
	}]);
});
