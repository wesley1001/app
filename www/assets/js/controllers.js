angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope) {
	$scope.loggedin = false;
})
.controller('ChatsCtrl', function($scope, Chats) {
	$scope.loggedin = true;
	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.loggedin = true;
	$scope.chat = Chats.get($stateParams.chatId);
});