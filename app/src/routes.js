'use stricts';

angApp.constant('partialsPath', 'app/src/')

.config(['$routeProvider', 'partialsPath', 'USER_ROLES',
    function($routeProvider, partialsPath, USER_ROLES) {
        $routeProvider.
            when('/home', {
                    templateUrl: partialsPath+'main/home.html',
                    controller: 'HomeController',
                    authorizedRoles: [USER_ROLES.all]
            }).
            when('/main', {
                    templateUrl: partialsPath+'main/main.html',
                    controller: 'MainController',
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.member]
            }).
            when('/login', {
                    templateUrl: partialsPath+'login/login.html',
                    controller: 'LoginController',
                    authorizedRoles: [USER_ROLES.all]
            }).
            when('/custom', {
                    templateUrl: partialsPath+'main/custom.html',
                    controller: 'CustomController',
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.member]
            }).
            when('/form', {
                    templateUrl: partialsPath+'main/form.html',
                    controller: 'FormController',
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.member]
            }).
            when('/admin', {
                    templateUrl: partialsPath+'admin/adminDash.html',
                    controller: 'AdminController',
                    authorizedRoles: [USER_ROLES.admin]
            }).
            when('/404', {
                    templateUrl: partialsPath+'main/404.html',
                    authorizedRoles: [USER_ROLES.all]
            }).
            otherwise({redirectTo: "/home" });
    }
])
;   