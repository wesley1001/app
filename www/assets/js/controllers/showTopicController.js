define(["step", "whispeerHelper", "asset/state", "controllers/controllerModule"], function (step, h, State, controllerModule) {
	"use strict";
	controllerModule.controller("ssn.showTopicController", [
		"$scope",
		"$stateParams",
		"$timeout",
		"$ionicScrollDelegate",
		"ssn.messageService",
		"ssn.errorService",
		function($scope, $stateParams, $timeout, $ionicScrollDelegate, messageService, errorService) {
			$scope.loadingMessages = true;

			$scope.topics = messageService.data;

			var MINUTE = 60 * 1000;

			var topicLoadingState = new State();
			$scope.topicLoadingState = topicLoadingState.data;

			var topicID = h.parseDecimal($stateParams.chatId);

			$scope.canSend = false;

			$scope.markRead = function () {
				$scope.activeTopic.obj.markRead(errorService.criticalError);
			};

			$scope.loadMoreMessages = function () {
				$scope.loadingMessages = true;
				$scope.activeTopic.obj.loadMoreMessages(function () {
					$scope.loadingMessages = false;
				});
			};

			function getScrollerInstance() {
				return scroller._instances.filter(function (i) {
					return i.$$delegateHandle === scroller.handle;
				})[0];
			}

			function getScrollElement() {
				return getScrollerInstance().$element;
			}

			function getFirstListElement() {
				return getScrollElement().find("li.message").first();
			}

			var oldHeight = 0, firstElement;

			var scroller = $ionicScrollDelegate.$getByHandle("messageScroll");

			$scope.$on('elastic:resize', function(event, element, oldInputHeight, newInputHeight) {
				jQuery("#messageList").css("bottom", jQuery("#inputWrap").height() - oldInputHeight + newInputHeight + 1);
				scroller.resize();
			});

			window.addEventListener("native.keyboardshow", function() {
				scroller.scrollBottom();
			});

			window.addEventListener("native.keyboardhide", function() {
				scroller.resize();
			});

			$timeout(function () {
				getScrollElement().on("scroll-resize", function () {
					if (!firstElement) {
						firstElement = getFirstListElement();
					}

					var newHeight = scroller.getScrollView().getScrollMax().top;

					if (oldHeight !== newHeight && firstElement.data("messageid") !== getFirstListElement().data("messageid")) {
						scroller.scrollBy(0, newHeight - oldHeight);

						firstElement = getFirstListElement();
					}

					oldHeight = newHeight;
				});
			});

			function stabilizeScroll() {
				var view = scroller.getScrollView();

				if (view.getScrollMax().top - scroller.getScrollPosition().top < 10) {
					scroller.scrollBottom();
				} else {
					scroller.resize();
				}
			}

			topicLoadingState.pending();

			var topic;
			step(function () {
				messageService.getTopic(topicID, this);
			}, h.sF(function (_topic) {
				topic = _topic;

				topic.listen(stabilizeScroll, "addMessages");
				$scope.activeTopic = topic.data;

				$scope.canSend = true;
				$scope.newMessage = false;

				if (topic.hasInitialLoaded()) {
					this.ne();
				} else {
					$timeout(this.ne, 1000);
				}
			}), h.sF(function () {
				topic.loadInitialMessages(this);
			}), h.sF(function () {
				$scope.topicLoaded = true;
				$scope.loadingMessages = false;

				if (topic.data.messages.length > 0) {
					topic.markRead(errorService.criticalError);
				}

				$timeout(function () {
					scroller.scrollBottom();
				});

				this.ne();
			}), errorService.failOnError(topicLoadingState));

			var sendMessageState = new State();
			$scope.sendMessageState = sendMessageState.data;

			$scope.sendMessage = function () {
				sendMessageState.pending();

				var images = [];
				var text = $scope.activeTopic.newMessage;

				if (text === "" && images.length === 0) {
					sendMessageState.failed();
					return;
				}

				$scope.canSend = false;

				step(function () {
					messageService.sendMessage($scope.activeTopic.id, text, images, this);
				}, h.sF(function () {
					$scope.activeTopic.newMessage = "";
					$scope.markRead(errorService.criticalError);
					$timeout(function () {
						sendMessageState.reset();
					}, 2000);
					this.ne();
				}), function (e) {
					$scope.canSend = true;
					this(e);
				}, errorService.failOnError(sendMessageState));
			};

			var burstMessageCount = 0, bursts = [], burstTopic;

			function Burst() {
				this.messages = [];
			}

			Burst.prototype.addMessage = function (message) {
				this.messages.push(message);
			};

			Burst.prototype.firstMessage = function () {
				return this.messages[0];
			};

			Burst.prototype.hasMessages = function () {
				return this.messages.length > 0;
			};

			Burst.prototype.fitsMessage = function (message) {
				if (!this.hasMessages()) {
					return true;
				}

				return this.sameSender(message) &&
				this.sameDay(message) &&
				this.timeDifference(message) < MINUTE * 10;

			};

			Burst.prototype.sameSender = function (message) {
				return this.firstMessage().sender.id === message.sender.id;
			};

			Burst.prototype.sameDay = function (message) {
				if (!message) {
					return false;
				}

				if (message instanceof Burst) {
					message = message.firstMessage();
				}

				var date1 = new Date(h.parseDecimal(this.firstMessage().timestamp));
				var date2 = new Date(h.parseDecimal(message.timestamp));

				if (date1.getDate() !== date2.getDate()) {
					return false;
				}

				if (date1.getMonth() !== date2.getMonth()) {
					return false;
				}

				if (date1.getFullYear() !== date2.getFullYear()) {
					return false;
				}

				return true;
			};

			Burst.prototype.timeDifference = function (message) {
				return Math.abs(h.parseDecimal(message.timestamp) - h.parseDecimal(this.firstMessage().timestamp));
			};

			Burst.prototype.isMe = function () {
				return this.firstMessage().sender.me;
			};

			Burst.prototype.isOther = function () {
				return !this.firstMessage().sender.me;
			};

			Burst.prototype.sender = function () {
				return this.firstMessage().sender;
			};

			$scope.messageBursts = function() {
				if (!$scope.activeTopic || $scope.activeTopic.messages.length === 0) {
					return [];
				}

				var messages = $scope.activeTopic.messages, currentBurst = new Burst();

				if (burstTopic === $scope.activeTopic.id && burstMessageCount === messages.length) {
					return bursts;
				}

				burstTopic = $scope.activeTopic.id;
				burstMessageCount = messages.length;

				bursts = [currentBurst];

				messages.forEach(function(message) {
					if (!currentBurst.fitsMessage(message)) {
						currentBurst = new Burst();
						bursts.push(currentBurst);
					}

					currentBurst.addMessage(message);
				});

				bursts = bursts.filter(function (burst) {
					return burst.hasMessages();
				});

				return bursts;
			};
		}]);
});
