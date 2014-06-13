(function () {
	"use strict";

	/*
		topic: {
			createTime: (int)
			key: key,
			receiver: [{identifier, key}],
			creator: (int),
			newest (int),
			unread: (bool)
		}
	*/

	var topicJSON = {
		"name": "Topic",
		"type": "object",
		"properties": {
			"createTime": {
				"required": true,
				"type": "number",
				"min": 1376244464102
			},
			"key": {
				"required": true,
				"type": "object"
			},
			"receiver": {
				"required": true,
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"identifier": {
							"required": true,
							"type": "integer",
							"min": 1
						},
						"key": {
							"type": "object"
						}
					}
				}
			},
			"creator": {
				"type": "number",
				"min": 1
			},
			"newest": {
				"type": "number",
				"min": 1
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = topicJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return topicJSON;
		});
	}
})();