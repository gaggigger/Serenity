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
.controller('AdminSettingsController',  ['$scope',
    function ($scope) {
        
    }
])
;