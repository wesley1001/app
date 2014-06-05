(function () {
	"use strict";
	var profileJSON = {
		"type": "object",
		"properties": {
			"basic": {
				"type": "object",
				"properties": {
					"firstname": {
						"type": "string"
					},
					"lastname": {
						"type": "string"
					}
				}
			},

			"image": {
				"type": "string",
				"pattern": /^data:image\/\w+;base64,[A-Za-z0-9+\/=]*$/
			},

			"imageBlob": {
				"type": "object",
				"additionalProperties": false,
				"properties": {
					"imageHash": {
						"type": "string",
						"pattern": /^[A-Fa-f0-9]*$/
					},
					"blobid": {
						"type": "string",
						"pattern": /^[A-z0-9]*$/
					}
				}
			},

			"location": {
				"type": "object",
				"properties": {
					"road": {
						"type": "string"
					},
					"number": {
						"type": "string"
					},
					"town": {
						"type": "string"
					},
					"state": {
						"type": "string"
					},
					"country": {
						"type": "string"
					}
				}
			},

			"contact": {
				"type": "object",
				"properties": {
					"im": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"messenger": {
									"required": true,
									"type": "string",
									"enum": ["icq", "skype", "jabber"]
								},
								"address": {
									"type": "string"
								}
							}
						}
					},
					"mail": {
						"type": "Array",
						"items": {
							"type": "string",
							"format": "email"
						}
					},
					"telephone": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"where": {
									"type": "string"
								},
								"number": {
									"required": true,
									"type": "string",
									"format": "phone"
								}
							}
						}
					},
					"mobile": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"where": {
									"type": "string"
								},
								"number": {
									"required": true,
									"type": "string",
									"format": "phone"
								}
							}
						}
					},
					"website": {
						"type": "Array",
						"items": {
							"type": "string",
							"format": "url"
						}
					}
				}
			},

			"relationship": {
				"type": "object",
				"properties": {
					"partner": {
						"type": "object",
						"properties": {
							"user": {
								"type": "integer",
								"minimum": 1
							},
							"partnerSignature": {
								"type": "string",
								"hex": true
							}
						}
					},
					"since": {
						"type": "string",
						"format": "date",
						"after": "1900-01-01"
					},
					"status": {
						"type": "string",
						"enum": ["single", "relationship", "engaged", "married", "divorced", "widowed", "complicated", "open", "inlove"]
					}
				}
			},

			"relatives": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"user": {
							"type": "integer"
						},
						"status": {
							"type": "string",
							"enum": [
								"sister",
								"brother",

								"mother",
								"father",

								"daughter",
								"son",

								"aunt",
								"uncle",

								"niece",
								"nephew",

								"femalecousin",
								"malecousin",

								"grandmother",
								"grandfather",

								"granddaughter",
								"grandson",

								"stepsister",
								"stepbrother",

								"stepmother",
								"stepfather",

								"stepdaughter",
								"stepson",

								"sister-in-law",
								"brother-in-law",

								"mother-in-law",
								"father-in-law",

								"daughter-in-law",
								"son-in-law"
							]
						}
					}
				}
			},

			"extended": {
				"type": "object",
				"properties": {
					"sex": {
						"type": "string",
						"enum": ["f", "m"]
					},
					"birthday": {
						"type": "string",
						"format": "date",
						"after": "1900-01-01"
					},
					"religion": {
						"type": "string"
					},
					"political": {
						"type": "string"
					}
				}
			},

			"knowledge": {
				"type": "object",
				"properties": {
					"education": {
						"type": "array",
						"items": {
							"type": "object",
							"properties": {
								"name": {
									"type": "string"
								},
								"startDate": {
									"type": "string",
									"format": "date"
								},
								"endDate": {
									"type": "string",
									"format": "date"
								},
								"edutype": {
									"type": "string"
								},
								"titles": {
									"type": "Array",
									"items": {
										"type": "object",
										"properties": {
											"name": {
												"required": true,
												"type": "string"
											},
											"date": {
												"type": "string",
												"format": "date"
											}
										}
									}
								}
							}
						}
					},
					"knowledge": {
						"type": "string"
					},
					"languages": {
						"type": "array",
						"items": {
							"type": "string"
						}
					}
				}
			},

			"jobs": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"title": {
							"type": "string"
						},
						"company": {
							"type": "string"
						},
						"startDate": {
							"type": "string",
							"format": "date"
						},
						"endDate": {
							"type": "string",
							"format": "date"
						}
					}
				}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = profileJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return profileJSON;
		});
	}
})();