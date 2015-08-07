
define(["angular"], function (angular) {
    angular.module('whispeer.controllers', [])
    .controller('NewMessageCtrl', function($scope) {
        $scope.users = [
            {
                "id": 55,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik m\u00fcller"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "selected": true,
                "name": "yannik m\u00fcller",
                "names": {
                    "name": "yannik m\u00fcller",
                    "firstname": "yannik",
                    "lastname": "m\u00fcller",
                    "nickname": "muster"
                },
                "added": true,
                "isMyFriend": true
            },
            {
                "id": 57,
                "trustLevel": 2,
                "fingerprint": "SDGMXHPDZCPMRNRDVAQW6TXANPK5HZWCYB0DP0H1SKFPX66GFBN0",
                "basic": {
                    "url": "user/muster3",
                    "image": "https://randomuser.me/api/portraits/thumb/men/16.jpg",
                    "shortname": "yannik kunder"
                },
                "signatureValid": true,
                "me": false,
                "other": true,
                "online": 1,
                "name": "yannik kunder",
                "names": {
                    "name": "yannik kunder",
                    "firstname": "yannik",
                    "lastname": "kunder",
                    "nickname": "muster3"
                },
                "added": true,
                "isMyFriend": true
            },
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
        ];
        $scope.user = [$scope.users[0], $scope.users[1]];
    })
    .controller("SettingsCtrl", ["$scope", "ssn.sessionService", function($scope, sessionService) {
        $scope.logout = function () {
            sessionService.logout();
        };
    }]);
});
