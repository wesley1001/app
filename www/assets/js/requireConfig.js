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
    base = base.replace(/\#(.*)/g, "");
    base = base.replace(/[^\/]*$/g, "");
}

var baseElement = document.createElement("base");
baseElement.setAttribute("href", base);
document.getElementsByTagName("head")[0].appendChild(baseElement);

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
        debug: "../../lib/visionmedia-debug/dist/debug"
    },
    shim: {
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
