define(["ionic", "step", "whispeerHelper", "controllers/controllerModule"], function (ionic, step, h, controllerModule) {
	"use strict";

	controllerModule.controller("ssn.rootController", ["$scope", "$location", "$rootScope", "$timeout", "ssn.userService", function($scope, $location, $rootScope, $timeout, userService) {
        $scope.loading = true;

        $rootScope.$on("ssn.ownLoaded", function () {
            $scope.loading = false;
            $scope.myself = userService.getown().data;
            $timeout(function () {});
        });

        $scope.loadNewMessageView = function () {
            $location.path("newMessage");
        };

        $scope.platform = ionic.Platform.platform();
    }]);
});
