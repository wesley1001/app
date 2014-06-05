/**
* messagesController
**/

define([], function () {
	"use strict";

	function messagesController($scope, $location, errorService, messageService)  {
		$scope.shortenName = function (name) {
			if(name.length > 17) {
				return name.substr(0, 17) + "..";
			} else {
				return name;
			}
		};
		$scope.shortenMessage = function (string) {
			if(string.length > 27) {
				return string.substr(0, 27) + "...";
			} else {
				return string;
			}
		};
		$scope.unreadClass = function(element) {
			if(element.unread) {
				return "unread";
			}
			return "";
		};
		$scope.loadTopic = function(id) {
			$location.path("/messages").search({topicid: id});
		};

		messageService.loadMoreLatest(errorService.criticalError);

		$scope.topics = messageService.data.latestTopics.data;
	}

	messagesController.$inject = ["$scope", "$location", "ssn.errorService", "ssn.messageService"];

	return messagesController;
});