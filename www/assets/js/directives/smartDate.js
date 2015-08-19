define(["whispeerHelper", "directives/directivesModule"], function (h, directivesModule) {
    "use strict";
    var directive = function ($window, localize) {
        var ONEHOUR = 60*60*1000;
        var ONEMINUTE = 60*1000;

        Date.prototype.getWeek = function(){
		    var d = new Date(+this);
		    d.setHours(0,0,0);
		    d.setDate(d.getDate()+4-(d.getDay()||7));
		    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
		};

        function timestampDiffNow(timestamp) {
            return new Date().getTime() - timestamp;
        }

        function toDateString(input, noDayDisplay) {
            if (input) {
                var date = new Date(h.parseDecimal(input));
                var diff = timestampDiffNow(h.parseDecimal(input));

                var sameDate = new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
                if (sameDate) {
                    var minutes = Math.floor(diff%ONEHOUR/ONEMINUTE);
		            if (diff < ONEMINUTE) {
		                return localize.getLocalizedString("date.time.justNow");
		            } else {
			            return date.toLocaleTimeString().slice(0,-3);
		            }
                }

                if (noDayDisplay) {
                    return date.toLocaleTimeString();
                }
				if (new Date(date).getWeek() === new Date().getWeek()) {
					return localize.getLocalizedString("date.day." + date.getDay());
				} else {
					return date.toLocaleDateString();
				}
            } else {
                return "";
            }
        }

        return {
            scope: {
                time: "=smartDate"
            },
            link: function (scope, element, attrs) {
                var previousResult;
                function updateDateString() {
                    var result = toDateString(scope.time, attrs.smartDateNoDay !== undefined);

                    if (result !== previousResult) {
                        element.text(result);
                    }
                }

                updateDateString();

                scope.$watch(function () {
                    return scope.time;
                }, updateDateString);

                var time = h.parseDecimal(scope.time);
                if (time > 999999) {
                    var diff = timestampDiffNow(time);

                    if (diff > ONEHOUR) {
                        $window.setInterval(updateDateString, 5*60*1000);
                    } else if (diff > ONEMINUTE) {
                        $window.setInterval(updateDateString, 30*1000);
                    } else {
                        $window.setInterval(updateDateString, 1000);
                    }
                }
            }
        };
    };

    directive.$inject = ["$window", "localize"];

    directivesModule.directive("smartDate", directive);
});
