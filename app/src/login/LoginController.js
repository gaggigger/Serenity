'use strict';

angApp.controller('LoginController', ['$scope', '$rootScope', '$location', 'SessionService', 'AUTH_EVENTS', 'AuthProvider', 'secureLogin', 'flashMessaging', 'md5', 
    function ($scope, $rootScope, $location, SessionService, AUTH_EVENTS, AuthProvider, secureLogin, flashMessaging) {

        $scope.flash = flashMessaging;
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function (credentials) {
            credentials = secureLogin.secure(credentials);
            AuthProvider.login(credentials).then(function (response) {
                if (response.status === 200) {
                    SessionService.create(response.sessionId);
                    SessionService.set("userId", response.name);
                    SessionService.set("userRole", response.role);
                    SessionService.set("authKey", response.authKey);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            });
        };
        
        $rootScope.$on(AUTH_EVENTS.logout, function(e) {
            AuthProvider.logout(SessionService.get('userId')).then(function(response) {
                if (response.status === 200) {
                    SessionService.destroy();
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                    $location.path('/home');
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
                }
            });
        });
    }
]);