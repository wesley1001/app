define(["step", "whispeerHelper", "asset/state", "controllers/controllerModule"], function (step, h, State, controllerModule) {
    "use strict";
    controllerModule.controller("ssn.listTopicsController", ["$scope", "ssn.messageService", "ssn.errorService", function($scope, messageService, errorService) {
        $scope.loggedin = true;

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

    }]);
});
