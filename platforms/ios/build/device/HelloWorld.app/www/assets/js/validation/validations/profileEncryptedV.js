(function () {
	"use strict";

	var profileEncryptedJSON = {
		"type": "object",
		"properties": {
			"basic": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"image": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"location": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"contact": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"relationship": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"relatives": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"extended": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"knowledge": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"jobs": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},
			"key": {
				"type": "string",
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = profileEncryptedJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return profileEncryptedJSON;
		});
	}
})();