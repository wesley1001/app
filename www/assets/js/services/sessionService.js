/**
* SessionService
**/
define(["services/serviceModule"], function (serviceModule) {
	"use strict";

	var provider = function () {
		var redirect = true;

		this.noRedirect = function () {
			redirect = false;
		};

		var service = function ($rootScope, $timeout, locationService, Storage) {
			var sid = "", loggedin = false, userid;

			var sessionStorage = new Storage("whispeer.session");

			function saveSession() {
				sessionStorage.set("sid", sid);
				sessionStorage.set("userid", userid);
				sessionStorage.set("loggedin", true);
			}

			function setLoginData(_sid, _userid, noRedirect) {
				sid = _sid;
				userid = _userid;
				loggedin = true;

				$timeout(function () {
					$rootScope.$broadcast("ssn.login");
					if (!noRedirect) {
						locationService.loadInitialURL();
					}
				});
			}

			function loadOldLogin() {
				if (sessionStorage.get("loggedin") === "true" && sessionStorage.get("password")) {
					setLoginData(sessionStorage.get("sid"), sessionStorage.get("userid"));
				} else {
					sessionStorage.clear();

					if (redirect) {
						locationService.landingPage();
					}
				}
			}

			loadOldLogin();

			$rootScope.$on("$stateChangeStart", function (scope, next) {
				locationService.updateURL(loggedin, next.controller);
			});

			var sessionService = {
				saveSession: saveSession,
				setLoginData: setLoginData,
				setReturnUrl: function (url) {
					locationService.setReturnUrl(url);
				},

				getSID: function () {
					return sid;
				},

				getUserID: function () {
					return parseInt(userid, 10);
				},

				logout: function () {
					if (loggedin) {
						$rootScope.$broadcast("ssn.reset");
						sessionStorage.clear();
						locationService.landingPage();
					}
				},

				isLoggedin: function () {
					return loggedin;
				}
			};

			return sessionService;
		};

		this.$get = ["$rootScope", "$timeout", "ssn.locationService", "ssn.storageService", service];
	};

	serviceModule.provider("ssn.sessionService", provider);
});
