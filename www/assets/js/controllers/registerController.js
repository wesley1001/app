/**
* loginController
**/

define(["step", "whispeerHelper", "asset/resizableImage", "asset/observer"], function (step, h, ResizableImage, Observer) {
	"use strict";

	function registerController($scope, errorService, sessionHelper, sessionService, cssService) {
		var resizableImage = new ResizableImage();
		var observer = new Observer();
		cssService.setClass("registerView");
		
		var ENDSIZE = 250;
		var CANVASWIDTH = 600, CANVASHEIGHT = 300;

		$scope.imageChange = resizableImage.callBackForFileLoad(function () {
			resizableImage.paintImageOnCanvasWithResizer({
				element: document.getElementById("original"),
				width: CANVASWIDTH,
				height: CANVASHEIGHT
			});
		});

		observer.listen(function () {
			$scope.registerError = true;
			return $scope.mailCheck &&
					$scope.nicknameCheck &&
					!$scope.noPasswordMatch() &&
					!$scope.passwordToWeak();
		}, "stepLeave1");

		observer.listen(function () {
			$scope.registerError = false;
		}, "stepLoaded2");

		observer.listen(function () {
			resizableImage.removeResizable();
		}, "stepLeave3");

		observer.listen(function () {
			resizableImage.repaint({
				element: document.getElementById("original"),
				width: CANVASWIDTH,
				height: CANVASHEIGHT
			});
		}, "stepLoaded3");

		$scope.password = "";
		$scope.password2 = "";

		$scope.mail = "";
		$scope.mail2 = "";

		$scope.nickname = "";
		$scope.nicknameCheckLoading = false;
		$scope.nicknameCheck = false;
		$scope.nicknameCheckError = false;

		$scope.identifier = "";

		$scope.mailCheck = true;
		$scope.mailCheckError = false;
		$scope.mailCheckLoading = false;

		$scope.firstname = {
			value: "",
			encrypted: false
		};

		$scope.lastname = {
			value: "",
			encrypted: false
		};

		$scope.days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
		$scope.months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
		$scope.years = ["1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918", "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909", "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"];

		$scope.user = {
			basic: {},
			birthday: {},
			location: {}
		};

		$scope.validImage = true;

		function falseAnd(a, b) {
			return a !== false && b !== false;
		}

		window.addEventListener("popstate", function (event) {
			if (event.state && event.state.oldStep && event.state.step) {
				$scope.$apply(function () {
					setStep(event.state.step, true);
				});
			}
		});

		window.history.pushState({oldStep: -1, step: 1}, "step changed");

		function setStep(step, popStateChange) {
			if (step > 0 && step < 4) {
				var oldStep = $scope.registerState.step;
				var result1 = observer.notify(oldStep, "stepLeave", falseAnd);
				var result2 = observer.notify(oldStep, "stepLeave" + oldStep, falseAnd);

				if (result1 !== false && result2 !== false) {
					$scope.registerState.step = step;
					
					if (!popStateChange) {
						window.history.pushState({oldStep: oldStep, step: step}, "step changed");
					}

					observer.notify(step, "stepChanged");
					observer.notify(step, "stepChanged" + step);
				}
			}
		}

		$scope.stepLoaded = function stepLoadedF() {
			var step = $scope.registerState.step;
			observer.notify(step, "stepLoaded");
			observer.notify(step, "stepLoaded" + step);
		};

		$scope.nextRegisterStep = function nextRegisterStep() {
			setStep($scope.registerState.step+1);
		};
		
		$scope.prevRegisterStep = function prevRegisterStep() {
			setStep($scope.registerState.step-1);
		};
		
		$scope.passwordStrength = function passwordStrengthC() {
			return sessionHelper.passwordStrength($scope.password);
		};

		$scope.registerFormClick = function formClickF() {
			sessionHelper.startKeyGeneration();
		};

		$scope.acceptIcon = function acceptIconC(value1, value2) {
			if (value1 === value2) {
				return "assets/img/accept.png";
			}

			return "assets/img/fail.png";
		};

		$scope.startKeyGeneration = function startKeyGen1() {
			sessionHelper.startKeyGeneration();
		};

		$scope.mailChange = function mailChange() {
			if ($scope.mail === "") {
				$scope.mailCheckLoading = false;
				$scope.mailCheck = true;
				$scope.mailCheckError = false;

				return;
			}

			step(function doMailCheck() {
				var internalMail = $scope.mail;

				$scope.mailCheckLoading = true;
				$scope.mailCheck = false;
				$scope.mailCheckError = false;

				sessionHelper.mailUsed(internalMail, this);
			}, function mailChecked(e, mailUsed) {
				errorService.criticalError(e);

				$scope.mailCheckLoading = false;

				if (mailUsed === false) {
					$scope.mailCheck = true;
				} else if (mailUsed === true) {
					$scope.mailCheck = false;
				} else {
					$scope.mailCheckError = true;
				}
			});
		};

		$scope.lock = function lockF(bool) {
			if (bool) {
				return "assets/img/lock_closed.png";
			} else {
				return "assets/img/lock_open.png";
			}
		};

		$scope.red = function redF(bool) {
			if (!bool) {
				return "red";
			} else {
				return "";
			}
		};

		$scope.acceptIconMailFree = function acceptIconMail() {
			if ($scope.mailCheckLoading) {
				return "assets/img/loader_green.gif";
			}

			if ($scope.mailCheckError === true) {
				return "assets/img/error.png";
			}

			if ($scope.mailCheck) {
				return "assets/img/accept.png";
			}

			return "assets/img/fail.png";
		};

		$scope.nicknameChange = function nicknameChange() {
			step(function nicknameCheck() {
				var internalNickname = $scope.nickname;
				$scope.nicknameCheckLoading = true;
				$scope.nicknameCheck = false;
				$scope.nicknameCheckError = false;

				sessionHelper.nicknameUsed(internalNickname, this);
			}, function nicknameChecked(e, nicknameUsed) {
				errorService.criticalError(e);

				$scope.nicknameCheckLoading = false;

				if (nicknameUsed === false) {
					$scope.nicknameCheck = true;
				} else if (nicknameUsed === true) {
					$scope.nicknameCheck = false;
				} else {
					$scope.nicknameCheckError = true;
				}
			});
		};

		$scope.showHint = false;

		$scope.nicknameInvalid = function () {
			return $scope.nickname === "" || !h.isNickname($scope.nickname);
		};

		$scope.nicknameUsed = function () {
			return !$scope.nicknameInvalid() && !$scope.nicknameCheck && !$scope.nicknameCheckLoading;
		};

		$scope.mailInvalid = function () {
			return $scope.mail !== "" && !h.isMail($scope.mail);
		};

		$scope.mailUsed = function () {
			return !$scope.mailInvalid() && !$scope.mailCheck && !$scope.mailCheckLoading;
		};

		$scope.passwordToWeak = function () {
			return $scope.passwordStrength() < 1;
		};

		$scope.noPasswordMatch = function () {
			return $scope.password !== $scope.password2;
		};

		$scope.acceptIconNicknameFree = function acceptIconNickname() {
			if ($scope.nicknameCheckLoading) {
				return "assets/img/loader_green.gif";
			}

			if ($scope.nicknameCheckError === true) {
				return "assets/img/error.png";
			}

			if ($scope.nicknameCheck) {
				return "assets/img/accept.png";
			}

			return "assets/img/fail.png";
		};

		var defaultSettings = {
			encrypt: true,
			visibility: []
		};

		$scope.register = function doRegisterC() {
			var settings = {
				privacy: {
					basic: {
						firstname: {
							encrypt: false,
							visibility: ["always:allfriends"]
						},
						lastname: {
							encrypt: false,
							visibility: ["always:allfriends"]
						}
					},
					image: {
						encrypt: false,
						visibility: []
					},
					imageBlob: {
						encrypt: false,
						visibility: []
					},
					location: defaultSettings,
					birthday: defaultSettings,
					relationship: defaultSettings,
					education: defaultSettings,
					work: defaultSettings,
					gender: defaultSettings,
					languages: defaultSettings
				},
				sharePosts: ["always:allfriends"]
			};

			var profile = {
				pub: {},
				priv: {},
				nobody: $scope.user,
				metaData: {
					scope: "always:allfriends"
				}
			};

			step(function () {
				resizableImage.getImageBlob(ENDSIZE, this.ne);
			}, h.sF(function (imageBlob) {
				function setAttribute(name, data) {
					settings.privacy.basic[name].encrypt = data.encrypted;


					if (data.value !== "") {
						if (data.encrypted) {
							profile.priv.basic = profile.priv.basic || {};
							profile.priv.basic[name] = data.value;
						} else {
							profile.pub.basic = profile.pub.basic || {};
							profile.pub.basic[name] = data.value;
						}
					}
				}

				setAttribute("firstname", $scope.firstname);
				setAttribute("lastname", $scope.lastname);

				console.time("register");
				sessionHelper.register($scope.nickname, $scope.mail, $scope.password, profile, imageBlob, settings, this);
			}), function () {
				console.timeEnd("register");
				console.log("register done!");
				resizableImage.removeResizable();
			});
		};
	}

	registerController.$inject = ["$scope", "ssn.errorService", "ssn.sessionHelper", "ssn.sessionService", "ssn.cssService"];

	return registerController;
});