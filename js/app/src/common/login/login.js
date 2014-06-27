'use strict';

angApp.controller('LoginController', ['$scope', '$rootScope', 'SessionService', 'AUTH_EVENTS', 'AuthProvider', 'secureLogin', 'flashMessaging', 'md5', 
    function ($scope, $rootScope, SessionService, AUTH_EVENTS, AuthProvider, secureLogin, flashMessaging) {

        $scope.flash = flashMessaging;
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function (credentials) {
            
            credentials = secureLogin.secure(credentials);
            
            AuthProvider.login(credentials).then(function (response) {
                if (response.status === 200) {
                    SessionService.create(response.data.sessionId, response.data.name, response.data.role, response.data.authKey);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            });
        };
        
        $rootScope.$on(AUTH_EVENTS.logout, function(event) {
            AuthProvider.logout(SessionService.get('userId')).then(function(response) {
                if (response.status === 200) {
                    SessionService.destroy();
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
                }
            });
        });
    }
]);