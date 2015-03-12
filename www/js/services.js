angular.module('starter.services', [])

.factory('Chats', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var chats = [
		{
			id: 0,
			type: 'groupChat',
			title: 'Test',
			lastMessage: 'Hey whats up?',
			users: [
				{
					name: 'Matthew Reyes',
					firstname: 'Matthew',
					lastname: 'Reyes',
					userimage: 'https://randomuser.me/api/portraits/med/men/40.jpg'
				},
				{
					name: 'Irene Horton',
					firstname: 'Irene',
					lastname: 'Horton',
					userimage: 'https://randomuser.me/api/portraits/med/women/54.jpg'
				},
				{
					name: 'Tim Gray',
					firstname: 'Tim',
					lastname: 'Gray',
					userimage: 'https://randomuser.me/api/portraits/med/men/43.jpg'
				},
				{
					name: 'Janice Cunningham',
					firstname: 'Janice',
					lastname: 'Cunningham',
					userimage: 'https://randomuser.me/api/portraits/med/women/5.jpg'
				},
				{
					name: 'Alfredo Palmer',
					firstname: 'Alfredo',
					lastname: 'Palmer',
					userimage: 'https://randomuser.me/api/portraits/med/men/73.jpg'
				}
			],
			messages: [
				{
					user: {
						name: 'Matthew Reyes',
						firstname: 'Matthew',
						lastname: 'Reyes',
						userimage: 'https://randomuser.me/api/portraits/med/men/40.jpg'
					},
					messageText: 'Hey whats up?',
					messageTime: '',
					messageRead: [] // userids of users who read this message
				}
			]
		},
		{
			id: 1,
			type: 'peerChat',
			title: 'Test',
			lastMessage: 'Hey whats up?',
			users: [
				{
					name: 'Janice Cunningham',
					firstname: 'Janice',
					lastname: 'Cunningham',
					userimage: 'https://randomuser.me/api/portraits/med/women/5.jpg'
				}
			],
			messages: [
				{
					user: {
						name: 'Matthew Reyes',
						firstname: 'Matthew',
						lastname: 'Reyes',
						userimage: 'https://randomuser.me/api/portraits/med/men/40.jpg'
					},
					messageText: 'Hey whats up?',
					messageTime: '',
					messageRead: [] // userids of users who read this message
				}
			]
		}
	];

	return {
		all: function() {
			return chats;
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function(chatId) {
			for (var i = 0; i < chats.length; i++) {
				if (chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
});
