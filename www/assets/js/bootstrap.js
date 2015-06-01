/*global define, require, console, cordova, navigator */

define(['angular', 'app', 'ionicAngular'], function (angular, app) {
    'use strict';

    function onDeviceReady() {
        angular.bootstrap(document, [app.name]);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    if (typeof cordova === 'undefined') {
        angular.element().ready(onDeviceReady);
    }
    
});
