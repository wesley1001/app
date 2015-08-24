define (["whispeerHelper", "step", "asset/observer", "asset/securedDataWithMetaData", "asset/enum", "asset/errors"], function (h, step, Observer, SecuredData, Enum, errors) {
	"use strict";
	var database, loaded = false, trustManager;

	var trustStates = new Enum("BROKEN", "UNTRUSTED", "TIMETRUSTED", "WHISPEERVERIFIED", "NETWORKVERIFIED", "VERIFIED", "OWN");

	function serializeTrust(trustLevel) {
		return trustStates.toString(trustLevel);
	}

	function unserializeTrust(trustLevel) {
		return trustStates.fromString(trustLevel);
	}

	function KeyTrustData(data) {
		var trustSymbol = unserializeTrust(data.trust);

		this.getAddedTime = function () {
			return data.added;
		};
		this.getKey = function () {
			return data.key;
		};
		this.getUserID = function () {
			return data.userid;
		};
		this.getNickname = function () {
			return data.nickname;
		};
		this.getTrust = function () {
			return trustSymbol;
		};


		this.isUntrusted = function () {
			return trustSymbol === trustStates.UNTRUSTED;
		};
		this.isTimeTrusted  = function () {
			return trustSymbol === trustStates.TIMETRUSTED;
		};
		this.isWhispeerVerified  = function () {
			return trustSymbol === trustStates.WHISPEERVERIFIED;
		};
		this.isNetworkVerified  = function () {
			return trustSymbol === trustStates.NETWORKVERIFIED;
		};
		this.isVerified = function () {
			return trustSymbol === trustStates.VERIFIED;
		};
		this.isOwn = function () {
			return trustSymbol === trustStates.OWN;
		};

		this.setTrust = function (trustLevel) {
			trustManager.setKeyTrustLevel(data.key, trustLevel);
		};
	}

	function userToDataSet(user, trustLevel) {
		var content = {
			added: new Date().getTime(),
			key: user.getSignKey(),
			userid: user.getID(),
			trust: serializeTrust(trustLevel || trustStates.UNTRUSTED)
		};

		if (user.getNickname()) {
			content.nickname = user.getNickname();
		}

		return content;
	}

	var fakeKeyExistence = 0, ownKey;

	trustManager = {
		allow: function (count) {
			if (!loaded) {
				fakeKeyExistence = count;
			}
		},
		disallow: function () {
			fakeKeyExistence = 0;
		},
		trustStates: trustStates,
		isLoaded: function () {
			return loaded;
		},
		createDatabase: function (me) {
			var data = {};

			data.nicknames = {};
			data.ids = {};

			var signKey = me.getSignKey();

			data[signKey] = userToDataSet(me, trustStates.OWN);
			if (me.getNickname()) {
				data.nicknames[me.getNickname()] = signKey;
			}
			data.ids[me.getID()] = signKey;

			data.me = me.getSignKey();

			database = SecuredData.load(undefined, data, { type: "trustManager" });

			loaded = true;
		},
		setOwnSignKey: function (_ownKey) {
			ownKey = _ownKey;
		},
		addDataSet: function (dataSet) {
			var signKey = dataSet.key;

			var idKey = database.metaAttr(["ids", dataSet.userid]);
			var nicknameKey = database.metaAttr(["nicknames", dataSet.nickname]);

			if (idKey && idKey !== signKey) {
				throw new errors.SecurityError("we already have got a key for this users id");
			}

			if (nicknameKey && nicknameKey !== signKey) {
				throw new errors.SecurityError("we already have got a key for this users nickname");
			}

			database.metaAdd([signKey], dataSet);

			if (dataSet.nickname) {
				database.metaAdd(["nicknames", dataSet.nickname], signKey);
			}

			database.metaAdd(["ids", dataSet.userid], signKey);
		},
		updateDatabase: function (data, cb) {
			if (!loaded || data._signature === database.metaAttr("_signature")) {
				cb();
				return;
			}

			var givenDatabase = SecuredData.load(undefined, data, { type: "trustManager" });
			step(function () {
				if (data.me === ownKey) {
					givenDatabase.verify(ownKey, this);
				} else {
					throw new errors.SecurityError("not my trust database");
				}
			}, h.sF(function () {
				var newKeys = givenDatabase.metaKeys().filter(function (key) {
					return !database.metaHasAttr(key);
				});

				newKeys.forEach(function (signKey) {
					var userDataSet = givenDatabase.metaAttr(signKey);

					trustManager.addDataSet(userDataSet);
				});

				if (newKeys.length > 0) {
					trustManager.notify("", "updated");
				}

				this.ne(newKeys.length > 0);
			}), cb);
		},
		loadDatabase: function (data, cb) {
			if (loaded) {
				return;
			}

			var givenDatabase = SecuredData.load(undefined, data, { type: "trustManager" });
			step(function () {
				if (data.me === ownKey) {
					givenDatabase.verify(ownKey, this);
				} else {
					throw new errors.SecurityError("not my trust database");
				}
			}, h.sF(function () {
				trustManager.disallow();
				database = givenDatabase;
				loaded = true;

				trustManager.notify("", "loaded");

				this.ne();
			}), cb);
		},
		reset: function () {
			loaded = false;
			database = undefined;
		},
		hasKeyData: function (keyid) {
			if (!loaded) {
				if (keyid === ownKey) {
					return true;
				} else if (fakeKeyExistence > 0) {
					fakeKeyExistence -= 1;
					return true;
				} else {
					throw new Error("trust manager not yet loaded");
				}
			}
			return database.metaHasAttr(keyid);
		},
		getKeyData: function (keyid) {
			var keyData = database.metaAttr(keyid);

			if (keyData) {
				return new KeyTrustData(keyData);
			}

			return false;
		},
		addUser: function (user) {
			trustManager.addDataSet(userToDataSet(user));
		},
		setKeyTrustLevel: function (signKey, trustLevel) {
			if (trustLevel === trustStates.OWN) {
				throw new Error("do not use setKeyTrustLevel for own keys.");
			}

			if (database.metaHasAttr(signKey)) {
				database.metaAdd([signKey, "trust"], serializeTrust(trustLevel));

				return true;
			}

			return false;
		},
		getUpdatedVersion: function (cb) {
			database.sign(ownKey, cb, false);
		}
	};

	Observer.call(trustManager);

	return trustManager;
});
