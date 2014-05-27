var config = {
	https: true,
	ws: "beta.whispeer.de",
	wsPort: 3001
};

if (typeof module != "undefined" && module.exports) {
    module.exports = config;
}

if (typeof define === "function") {
    define([], function () {
		"use strict";
		return config;
    });
}
