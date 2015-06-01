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

requirejs.config({
    paths: {
        angular:          '../../lib/angular/angular',
        angularAnimate:   '../../lib/angular-animate/angular-animate',
        angularSanitize:  '../../lib/angular-sanitize/angular-sanitize',
        uiRouter:         '../../lib/angular-ui-router/release/angular-ui-router',
        ionic:            '../../lib/ionic/js/ionic',
        ionicAngular:     '../../lib/ionic/js/ionic-angular',
        text:             '../../lib/text'
    },
    shim: {
        angular : {exports : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], exports : 'ionic'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']}
    },
    priority: [
        'angular',
        'ionic'
    ],
    deps: [
        'bootstrap'
    ]
});
