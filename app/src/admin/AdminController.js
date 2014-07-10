'use strict';

angApp
.controller('AdminController',  
    function () {
        
        
    }
)
.controller('AdminUsersController',  ['$scope', 'UsersService',
    function ($scope, UsersService) {
        UsersService.load().then( function(response) {
            if (response.status === 200 && response.users.length > 0) {
                $scope.users = response.users;
            }
        });
        
    }
])
.controller('AdminSettingsController',  ['$scope', '$location', '$window', 'SettingsService', 'flashMessaging',
    function ($scope, $location, $window, SettingsService, flashMessaging) {
        SettingsService.load().then( function(response) {
            if (response.status === 200) {
                $scope.site_name = response.site_name;
                $scope.version = response.version;
                $scope.allow_signup = response.allow_signup;
            }
        });
        
        $scope.saveSettings = function () {
            console.log("Saving settings");
            var settings = {
                site_name: $scope.site_name,
                version: $scope.version,
                allow_signup: $scope.allow_signup
            };
            console.log(settings);
            SettingsService.save(angular.toJson(settings)).then( function(response) {
                if (response.status === 200) {
                    flashMessaging.setMessage("Settings Saved.");
                    $location.path("/#admin")
                }
            });;
        };
        $scope.cancel = function() {
            $window.history.back();
        }
    }
])
;