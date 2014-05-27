define(["asset/observer"], function (Observer) {
	"use strict";

	function service(localize) {
		var advancedTitle = {}, count = 0, topicInternalCount = 0;

		function cycleTitle() {
			var titles = Object.keys(advancedTitle);

			if (count >= titles.length) {
				count = 0;
				document.title = localize.getLocalizedString("window.title.basic");
			} else {
				var data = advancedTitle[titles[count]];
				document.title = localize.getLocalizedString("window.title." + titles[count]).replace("{data}", data[topicInternalCount]);

				topicInternalCount += 1;

				if (topicInternalCount >= data.length) {
					count += 1;
					topicInternalCount = 0;
				}
			}
		}

		window.setInterval(cycleTitle, 3000);

		var api = {
			isVisible: true,
			isActive: true,
			setAdvancedTitle: function (topic, data) {
				advancedTitle[topic] = advancedTitle[topic] || [];

				if (advancedTitle[topic].indexOf(data) === -1) {
					advancedTitle[topic].push(data);
					cycleTitle();
				}
			},
			removeAdvancedTitle: function (topic) {
				delete advancedTitle[topic];
				cycleTitle();
			},
			playMessageSound: function () {
				document.getElementById("sound").play();
			}
		};

		Observer.call(api);

		var hidden = "hidden";

		// Standards:
		if (hidden in document) {
			document.addEventListener("visibilitychange", onchange);
		} else if ((hidden = "mozHidden") in document) {
			document.addEventListener("mozvisibilitychange", onchange);
		} else if ((hidden = "webkitHidden") in document) {
			document.addEventListener("webkitvisibilitychange", onchange);
		} else if ((hidden = "msHidden") in document) {
			document.addEventListener("msvisibilitychange", onchange);
		} else {
			window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
		}

		function setVisible(visible) {
			if (visible !== api.isVisible) {
				api.isVisible = visible;

				api.notify(visible, "visibilitychange");

				if (visible) {
					api.notify(visible, "visible");
				} else {
					api.notify(visible, "hidden");
				}
			}

			api.isActive = visible;
		}

		function onchange(evt) {
			var v = true, h = false,
				evtMap = {
					focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
				};

			evt = evt || window.event;
			if (evt.type in evtMap) {
				setVisible(evtMap[evt.type]);
			} else {
				setVisible(this[hidden] ? h : v)
			}
		}

		return api;
	}

	service.$inject = ["localize"];

	return service;
});