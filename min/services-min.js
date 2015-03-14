angular.module('starter.services', [])

.factory('Chats', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var chats = [
		{
			id: 0,
			latestMessage: {
	            "text": "dskljfghlsdfkjghsdkl",
	            "timestamp": "1426357333931",
	            "loading": true,
	            "loaded": false,
	            "sender": {
	                "id": 4,
	                "trustLevel": -1,
	                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
	                "basic": {
	                    "url": "user/Nilos",
	                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
	                    "shortname": "Nils"
	                },
	                "signatureValid": true,
	                "me": true,
	                "other": false,
	                "online": -1,
	                "name": "Nils Kenneweg",
	                "added": false,
	                "isMyFriend": false
	            },
	            "id": 36744
	        },
	        partners: [
		        {
			        "id": 4,
	                "trustLevel": -1,
	                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
	                "basic": {
	                    "url": "user/Nilos",
	                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
	                    "shortname": "Nils"
	                },
	                "signatureValid": true,
	                "me": true,
	                "other": false,
	                "online": -1,
	                "name": "Nils Kenneweg",
	                "added": false,
	                "isMyFriend": false
		        }
	        ],
	        type: "peerChat",
	        newMessage: "",
	        unread: false,
			messages: [
				[
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346468883",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36674
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346527052",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36677
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346567689",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36679
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346594581",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36680
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346611859",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36681
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346630432",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36682
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkle version reinpacken? Dann passt das markup ja quasi schon",
			            "timestamp": "1426346771645",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36683
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346870519",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36684
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346891016",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36685
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346900535",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36686
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426346926997",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36687
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347048831",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36691
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347058782",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36692
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347072251",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36695
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347137824",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36696
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347144338",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36697
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426347239700",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36699
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426349629250",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36711
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426351855820",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36714
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426351859491",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36715
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426357320459",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 1,
			                "trustLevel": 2,
			                "fingerprint": "ANB62GX98YSN2VZC6C20GT2EJB1C67BDDJ1HB4WY49XQRPYYG9Z0",
			                "basic": {
			                    "url": "user/daniel",
			                    "image": "https://randomuser.me/api/portraits/men/29.jpg",
			                    "shortname": "Daniel"
			                },
			                "signatureValid": true,
			                "me": false,
			                "other": true,
			                "online": 2,
			                "name": "Daniel Melchior",
			                "added": true,
			                "isMyFriend": true
			            },
			            "id": 36742
			        }
			    ],
			    [
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426357327050",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36743
			        },
			        {
			            "text": "dskljfghlsdfkjghsdkl",
			            "timestamp": "1426357333931",
			            "loading": true,
			            "loaded": false,
			            "sender": {
			                "id": 4,
			                "trustLevel": -1,
			                "fingerprint": "S10Y1GDN3SZZ16TG9DMRSQPHGNT7PN6QE733TD33RG1SB0AYJXJ0",
			                "basic": {
			                    "url": "user/Nilos",
			                    "image": "https://randomuser.me/api/portraits/men/4.jpg",
			                    "shortname": "Nils"
			                },
			                "signatureValid": true,
			                "me": true,
			                "other": false,
			                "online": -1,
			                "name": "Nils Kenneweg",
			                "added": false,
			                "isMyFriend": false
			            },
			            "id": 36744
			        }
			    ]
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


