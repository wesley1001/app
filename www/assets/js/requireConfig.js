/*
	Console-polyfill. MIT license.
	https://github.com/paulmillr/console-polyfill
	Make it safe to do console.log() always.
*/
(function(con) {
	"use strict";
	var dummy = function() {};

	var methods =
		["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed",
		"groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd",
		"timeStamp","trace","warn"];

	con.memory = {};

	var i;
	for (i = 0; i < methods.length; i += 1) {
		con[methods[i]] = con[methods[i]] || dummy;
	}
})(this.console = this.console || {}); // Using `this` for web workers.

var globalErrors = [];
var startup = new Date().getTime();

var baseUrl = "assets/js";
var base = "/";

if (window.location.href.indexOf("file:///") === 0) {
    base = window.location.href.replace("file://", "");
    base = base.replace(/\#\!(.*)/g, "");
    base = base.replace(/[^\/]*$/g, "");
}

var baseElement = document.createElement("base");
baseElement.setAttribute("href", base);
document.getElementsByTagName("head")[0].appendChild(baseElement);

define("optional", [], {
    load : function (moduleName, parentRequire, onload){
        "use strict";
        var onLoadSuccess = function(moduleInstance){
            // Module successfully loaded, call the onload callback so that
            // requirejs can work its internal magic.
            onload(moduleInstance);
        };

        var onLoadFailure = function(err){
            // optional module failed to load.
            var failedId = err.requireModules && err.requireModules[0];
            console.warn("Could not load optional module: " + failedId);

            // Undefine the module to cleanup internal stuff in requireJS
            requirejs.undef(failedId);

            // Now define the module instance as a simple empty object
            // (NOTE: you can return any other value you want here)
            define(failedId, [], function(){return {};});

            // Now require the module make sure that requireJS thinks 
            // that is it loaded. Since we've just defined it, requirejs 
            // will not attempt to download any more script files and
            // will just call the onLoadSuccess handler immediately
            parentRequire([failedId], onLoadSuccess);
        };

        parentRequire([moduleName], onLoadSuccess, onLoadFailure);
    }
});

requirejs.config({
    baseUrl: baseUrl,
    paths: {
        angular:          '../../lib/angular/angular',
        angularAnimate:   '../../lib/angular-animate/angular-animate',
        angularSanitize:  '../../lib/angular-sanitize/angular-sanitize',
        uiRouter:         '../../lib/angular-ui-router/release/angular-ui-router',
        ionic:            '../../lib/ionic/js/ionic',
        ionicAngular:     '../../lib/ionic/js/ionic-angular',
        text:             '../../lib/text',
        step: "step/lib/step",
        whispeerHelper: "helper/helper",
        bluebird: "../../lib/bluebird/js/browser/bluebird",
        jquery: "../../lib/jquery/dist/jquery",
        requirejs: "../../lib/requirejs/require",
        socket: "../../lib/socket.io-client/socket.io",
        socketStream: "libs/socket.io-stream",
        qtip: "../../lib/qtip2/basic/jquery.qtip",
        imageLib: "../../lib/blueimp-load-image/js/load-image",
        localizationModule: "../../lib/angular-i18n-directive/src/localizationModule",
        workerQueue: "../../lib/worker-queue.js/src/index",
        PromiseWorker: "../../lib/require-promise-worker.js/src/index",
        Dexie: "../../lib/dexie/dist/latest/Dexie",
        debug: "../../lib/visionmedia-debug/dist/debug",
        ngCordova: "../../lib/ngCordova/dist/ng-cordova",
        cordova: "../../cordova"
    },
    shim: {
        cordova: { deps: ["ngCordova"] },
        ngCordova: { deps: ["angular"] },
        angular : {exports : 'angular', deps: ['jquery']},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], exports : 'ionic'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']}
    },
    priority: [
        'angular',
        'ionic'
    ]
});

var initialElement = document.querySelectorAll("script[data-initial]");

if (initialElement.length === 1) {
    var initialModule = initialElement[0].getAttribute("data-initial");
    requirejs([initialModule]);
}
