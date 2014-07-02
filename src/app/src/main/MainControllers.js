'use strict';

angApp
.controller("HomeController", ['$scope', 'flashMessaging',
    function($scope, flashMessaging) {
        flashMessaging.setMessage("Login to begin", "info");
        $scope.$broadcast('flashMessage');
    }
])
.controller("MainController", ['$scope', 
    function($scope) {
        $scope.emailAddress = '';
        $scope.newsletterSubmit = function(emailAddress) {
            console.log("email address = " + emailAddress);
        };
    }
])
.controller("CustomController", ['$scope', 
    function($scope) {
        
    }
])
.controller("FormController",
    function() {
        $('.chosen').chosen();
        $("[rel=tooltip]").tooltip();
    }
)
;