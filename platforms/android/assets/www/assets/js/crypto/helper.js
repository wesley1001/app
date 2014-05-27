define(["libs/sjcl", "whispeerHelper"], function (sjcl, h) {
	"use strict";
	var helper = {
		getCurveName: function (curve) {
			var curcurve;
			for (curcurve in sjcl.ecc.curves) {
				if (sjcl.ecc.curves.hasOwnProperty(curcurve)) {
					if (sjcl.ecc.curves[curcurve] === curve) {
						return curcurve;
					}
				}
			}

			throw new Error("curve not existing");
		},
		getCurve: function (curveName) {
			if (typeof curveName !== "string" || curveName.substr(0, 1) !== "c") {
				curveName = "c" + curveName;
			}

			if (sjcl.ecc.curves[curveName]) {
				return sjcl.ecc.curves[curveName];
			}

			throw new Error("invalidCurve");
		},
		hex2bits: function (t) {
			if (t instanceof Array) {
				return t;
			}

			if (h.isHex(t)) {
				return sjcl.codec.hex.toBits(t);
			}

			//TODO
			throw new InvalidHexError();
		},
		bits2hex: function (t) {
			if (typeof t === "string") {
				return t;
			}

			return sjcl.codec.hex.fromBits(t);
		},
		sjclPacket2Object: function (data) {
			var decoded = sjcl.json.decode(data);
			var result = {
				ct: helper.bits2hex(decoded.ct),
				iv: helper.bits2hex(decoded.iv)
			};

			if (decoded.salt) {
				result.salt = helper.bits2hex(decoded.salt);
			}

			return result;
		},
		Object2sjclPacket: function (data) {
			if (typeof data.salt === "string") {
				data.salt = helper.hex2bits(data.salt);
			}

			if (typeof data.iv === "string") {
				data.iv = helper.hex2bits(data.iv);
			}

			if (typeof data.ct === "string") {
				data.ct = helper.hex2bits(data.ct);
			}

			return sjcl.json.encode(data);
		}
	};

	return helper;
});