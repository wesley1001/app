define(["directives/directivesModule"], function (directivesModule) {
	"use strict";

	function savebuttonDirective() {
		return {
			transclude: true,
			scope:	{
				state:		"=state"
			},
			restrict: "E",
			templateUrl: "assets/views/directives/saveButton.html",
			replace: true,
			link: function (scope, iElement, iAttrs) {
				scope.successIcon = "ion-checkmark-circled";
				scope.failureIcon = "ion-close-circled";

				if (iAttrs.initicon) {
					scope.initIcon = iAttrs.initicon;
				}

				if (iAttrs.successicon) {
					scope.successIcon = iAttrs.successicon;
				}

				if (iAttrs.failureicon) {
					scope.failureIcon = iAttrs.failureicon;
				}

				if (typeof iAttrs.noiniticon !== "undefined") {
					delete scope.initIcon;
				}
			}
		};
	}

	directivesModule.directive("savebutton", savebuttonDirective);
});
