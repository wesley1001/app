
define(["angular", "asset/state", "whispeerHelper"], function (angular, State, h) {
    angular.module('whispeer.controllers', [])
    .controller('rootCtrl', function($scope, $location, $rootScope) {
        $scope.loading = true;

        $rootScope.$on("ssn.ownLoaded", function () {
            $scope.loading = false;
        });

        $scope.loadNewMessageView = function () {
            $location.path('newMessage');
        };
    })
    .controller('LoginCtrl', function($scope, $ionicHistory) {
        $scope.login = true;
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
    })
    .controller('ChatsCtrl', ["$scope", "ssn.messageService", "ssn.errorService", function($scope, messageService, errorService) {
        $scope.loggedin = true;

        $scope.remove = function(chat) {
            Chats.remove(chat);
        };

        $scope.chats = messageService.data.latestTopics.data;

        var topicsLoadingState = new State();
        $scope.topicsLoadingState = topicsLoadingState.data;

        function loadTopics() {
            if (topicsLoadingState.isPending()) {
                return;
            }

            topicsLoadingState.pending();
            step(function () {
                messageService.loadMoreLatest(this);    
            }, errorService.failOnError(topicsLoadingState));
        }

        if ($scope.chats.length < 10) {
            loadTopics();
        }

        $scope.loadMoreTopics = function () {
            loadTopics();
        };

        messageService.loadMoreLatest(function () {
            $scope.chats = messageService.data.latestTopics.data;
        });

    }])
    .controller('ChatDetailCtrl', [
        "$scope",
        "$stateParams",
        "$timeout",
        "$ionicScrollDelegate",
        "ssn.messageService",
        "ssn.errorService",
    function($scope, $stateParams, $timeout, $ionicScrollDelegate, messageService, errorService) {
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

        function stabilizeScroll() {
            $ionicScrollDelegate.scrollBottom();
        }

        topicLoadingState.pending();

        var topic;
        step(function () {
            messageService.getTopic(topicID, this);
        }, h.sF(function (_topic) {
            topic = _topic;

            topic.onMessageAdd(stabilizeScroll);
            $scope.activeTopic = topic.data;

            $scope.canSend = true;
            $scope.newMessage = false;
            topic.loadInitialMessages(this);
        }), h.sF(function () {
            $scope.topicLoaded = true;

            if (topic.data.messages.length > 0) {
                topic.markRead(errorService.criticalError);
            }

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
    }])
    .controller('NewMessageCtrl', function($scope) {
        $scope.users = [
            {
                "id": 55,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik m\u00fcller"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "selected": true,
                "name": "yannik m\u00fcller",
                "names": {
                    "name": "yannik m\u00fcller",
                    "firstname": "yannik",
                    "lastname": "m\u00fcller",
                    "nickname": "muster"
                },
                "added": true,
                "isMyFriend": true
            },
            {
                "id": 57,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster3",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik kunder"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "name": "yannik kunder",
                "names": {
                    "name": "yannik kunder",
                    "firstname": "yannik",
                    "lastname": "kunder",
                    "nickname": "muster3"
                },
                "added": true,
                "isMyFriend": true
            },
            {
                "id": 4,
                "trustLevel": -1,
                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
                "basic": {
                    "url": "user/Nilos",
                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
                    "shortname": "Nils"
                },
                "signatureValid": true,
                "me": true,
                "other": false,
                "online": -1,
                "name": "Nils Kenneweg",
                "added": false,
                "isMyFriend": false
            }
        ];
        $scope.user = [$scope.users[0], $scope.users[1]];
    })
    .controller('FriendsCtrl', function($scope, Chats) {
        $scope.users = [
            {
                "id": 55,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik m\u00fcller"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "selected": true,
                "name": "yannik m\u00fcller",
                "names": {
                    "name": "yannik m\u00fcller",
                    "firstname": "yannik",
                    "lastname": "m\u00fcller",
                    "nickname": "muster"
                },
                "added": true,
                "isMyFriend": true
            },
            {
                "id": 57,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster3",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik kunder"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "name": "yannik kunder",
                "names": {
                    "name": "yannik kunder",
                    "firstname": "yannik",
                    "lastname": "kunder",
                    "nickname": "muster3"
                },
                "added": true,
                "isMyFriend": true
            },
            {
                "id": 4,
                "trustLevel": -1,
                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
                "basic": {
                    "url": "user/Nilos",
                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
                    "shortname": "Nils"
                },
                "signatureValid": true,
                "me": true,
                "other": false,
                "online": -1,
                "name": "Nils Kenneweg",
                "added": false,
                "isMyFriend": false
            }
        ];
    })
    .controller("SettingsCtrl", ["$scope", "ssn.sessionService", function($scope, sessionService) {
        $scope.logout = function () {
            sessionService.logout();
        };
    }]);
});
