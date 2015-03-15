angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicHistory) {
	$scope.loggedin = false;
	$ionicHistory.nextViewOptions({
	  disableBack: true
	});
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