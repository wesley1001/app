/* global module */

var production = false;
var useServer = false;
var buildDate = "2015429";

if (production) {
	useServer = true;
}

var config = {
	https: false,
	ws: "127.0.0.1",
	wsPort: 3000
};

if (useServer) {
	config = {
		https: true,
		ws: "data.whispeer.de",
		wsPort: 443
	};
}

config.production = production;
config.buildDate = buildDate;

if (typeof module !== "undefined" && module.exports) {
	module.exports = config;
}

if (typeof define === "function") {
	define([], function () {
		"use strict";
		return config;
	});
}
