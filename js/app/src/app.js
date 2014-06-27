'use strict';
/**
 *  SERENITY APP
 *  
 *  An open source start kit using Angular JS, SlimPHP and Eloquent ORM.
 *  
 *  @author Jeff Fox (jfox015)
 *  
 *  The MIT License (MIT)
 *  
 *  Copyright (c) 2014 Jeff Fox
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *  
 */
var angApp = angular.module("serenityApp", ['ngRoute', 'ngResource', 'angular-md5'])

.constant('config', {
    /**
     * LIVE DATA
     * Determines if the app should look to the server (API) for data or local 
     * JSON data mocks instead
     */
    liveData: false
})
.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    }
)
.controller("NavController", ['$scope', 'AuthProvider', 'AUTH_EVENTS', 'SessionService',
    function($scope, AuthProvider, AUTH_EVENTS, SessionService) {
       
        $scope.currentUser = null;
        $scope.authenticated = AuthProvider.isAuthenticated();
        $scope.noauth = !$scope.authenticated;
        
        // FUNCTIONS
        $scope.logout = function() {
            angular.element(document).scope().$broadcast(AUTH_EVENTS.logout);
        };
        // EVENT HANDLERS
        $scope.$on(AUTH_EVENTS.loginSuccess, function(event) {
            $scope.authenticated = AuthProvider.isAuthenticated();
            $scope.noauth = !$scope.authenticated;
            $scope.currentUser = {
                "name": SessionService.get("userId"),
                "role": SessionService.get("userRole")
            };
        });
        $scope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
            console.log("Logged out!");
            $scope.authenticated = false;
            $scope.noauth = !$scope.authenticated;
            $scope.currentUser = null;
        });
    }
])
.controller("FooterController", ['$scope', 
    function($scope) {
        
    }
])
.controller("HomeController", ['$scope', 'flashMessaging', '$log',
    function($scope, flashMessaging, $log) {
        $scope.flash = flashMessaging;
        $scope.flash.setMessage("Welcome to the app!");
        $log.info($scope.flash.getMessage());
    }
])
.controller("MainController", ['$scope','flashMessaging', '$log', 
    function($scope, flashMessaging, $log) {
        $scope.flash = flashMessaging;
        $log.info($scope.flash.getMessage());
    }
])
.controller("FormController",
    function() {
        $('.chosen').chosen();
        $("[rel=tooltip]").tooltip();
    }
)
;