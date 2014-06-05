(function () {
	"use strict";

	/*
		circle: {
			key,
			content,
			iv
		}
	*/

	var circleJSON = {
		"type": "object",
		"properties": {
			"key": {
				"required": true
			},
			"user": {
				"type": "array",
				"items": {
					"type": "integer"
				}
			},
			"name": {
				"required": true,
				"type": "string"
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = circleJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return circleJSON;
		});
	}
})();