'use strict';
/**
 *  SERENITY
 *  
 *  An open source web app start kit using Angular JS, SlimPHP, Eloquent ORM and Twitter Bootstrap.
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

.controller("NavController", ['$scope', 'AuthProvider', 'AUTH_EVENTS', 'USER_ROLES', 'SessionService', 'isAdmin',
    function($scope, AuthProvider, AUTH_EVENTS, USER_ROLES, SessionService, isAdmin) {
       
        $scope.currentUser = null;
        $scope.authenticated = AuthProvider.isAuthenticated();
        $scope.noauth = !$scope.authenticated;
        
        // FUNCTIONS
        $scope.logout = function(e) {
            angular.element(document).scope().$broadcast(AUTH_EVENTS.logout);
        };
        // EVENT HANDLERS
        $scope.$on(AUTH_EVENTS.loginSuccess, function(event) {
            $scope.authenticated = AuthProvider.isAuthenticated();
            $scope.noauth = !$scope.authenticated;
            $scope.currentUser = {
                name: SessionService.get("userId"),
                role: SessionService.get("userRole")
            };
            $scope.userRoles = USER_ROLES;
            isAdmin = $scope.isAdmin = ($scope.currentUser.role === USER_ROLES['admin']);
            
        });
        $scope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
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
.controller("MessageController", ['$scope', 'flashMessaging', 
    function($scope, flashMessaging) {
        var message = flashMessaging.getMessage();
        $scope.message = message;
        $scope.type = flashMessaging.getMessageType();
        $scope.$on('flashMessage', function(e) {
            $scope.apply();
        });
    }
])
;