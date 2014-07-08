'use strict';
/**
 *  ANGULAR AUTH SERVICE
 *  
 *  A collection of angular objects to provide user authentication and role 
 *  support to web applications.
 *  
 *  @author     Jeff Fox (@jfox015)
 *  @see        js/app/src/common/login/login.js
 *  @see        js/app/src/common/login/session.js
 *  @license    MIT LIcense (See README.md)
 */
angApp
/**
 *  AUTH CONSTANTS AND VARIABLES
 */
.constant('USER_ROLES', {
  all: '*',
  admin: 'Admin',
  editor: 'Editor',
  member: 'Member',
  guest: 'Guest'
})
.filter('userRoleFilter', ['USER_ROLES',
    function(USER_ROLES) {
        return function(input) {
            return USER_ROLES[input];
        };
    }
])
.constant('AUTH_GROUPS', {
  all: '*',
  admin: 'Administrators',
  editor: 'Editors',
  member: 'Members',
  guest: 'Guests'
})
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  logout: 'auth-logout',
  logoutFailed: 'auth-logout-failed'
})
.constant('AUTH_MESSAGES', {
  loginSuccess: 'You were successfully Logged In',
  loginFailed: 'Login Failed.',
  logoutSuccess: 'You have been logged out',
  sessionTimeout: 'Your session has timed out',
  notAuthenticated: 'You have not yet been authenticated',
  notAuthorized: 'You are not authorized to view the selected resource',
  logout: 'You were successfully logged out',
  logoutFailed: 'You were unable yo be logged out'
})
/**
 *  HTTP INTERCEPTORS
 *  @param $httpProvider
 *  @returns AuthInterceptor
 */
.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push(['$injector', 
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }
])
/**
 *  ROOT SCOPE BROADCAST RECEIVERS
 *  Event handlers for events boradcast to the $rootScope object
 *  @param SuperObject   $rootScope
 *  @param SuperObject   $location
 *  @param Service       AuthProvider
 *  @param Constant      AUTH_EVENTS
 *  @param Constant      AUTH_MESSAGES
 *  @param Service       flashMessaging
 *  @returns             <void>
 */
.run(['$rootScope', '$location', 'AuthProvider', 'AUTH_EVENTS', 'AUTH_MESSAGES', 'flashMessaging',
    function($rootScope, $location, AuthProvider, AUTH_EVENTS, AUTH_MESSAGES, flashMessaging) {
        // register listener to watch route changes
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.notAuthorized);
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.notAuthenticated);
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.unauthorizedResponse, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.unauthorizedResponse);
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.sessionTimeout);
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.loginSuccess);
            if ($location.path() !== "/main") {
                $location.path("/main");
            }
        });
        $rootScope.$on(AUTH_EVENTS.loginFailed, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.loginFailed);
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.logoutFailed, function(event) {
            flashMessaging.setMessage(AUTH_MESSAGES.logoutFailed);
        });
        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function(event, next) {
            if (next && typeof next.authorizedRoles !== "undefined") {
                if (!AuthProvider.isAuthorized(next.authorizedRoles)) {
                    event.preventDefault();
                    if (AuthProvider.isAuthenticated()) {
                      $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
            }
        });
     }
 ])
 .factory('AuthInterceptor', 
     function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                if (response.status === 401) {
                    $rootScope.$broadcast(AUTH_EVENTS.unauthorizedResponse, response);
                }
                if (response.status === 419 || response.status === 440) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                }
                return $q.reject(response);
            }
        };
    }
)
.service('secureLogin',  ['md5', 
    function (md5) {
        this.secure = function(credentials) {
            var cred = { username: credentials.username, password: credentials.password };
            cred.password = md5.createHash(cred.password);
            return cred;
        };
        return this;
    }
])
.factory('AuthProvider', ['$resource', 'SessionService', 'config', 'paths', 
    function ($resource, SessionService, config, paths) {
        return {
            login: function (credentials) {  
                return $resource(paths[config.mode].login).get(credentials).$promise;
            },
            logout: function () {  
                return $resource(paths[config.mode].logout).get().$promise;
            },

            isAuthenticated: function () {
              return !!SessionService.get("userId");
            },

            isAuthorized: function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                if (authorizedRoles[0] === "*") {
                    return true;
                } else {
                    return this.isAuthenticated() && authorizedRoles.indexOf(SessionService.get("userRole")) !== -1;
                }
            }
        };
    }
])
;