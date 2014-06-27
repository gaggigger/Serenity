'use stricts';

angApp.constant('partialsPath', 'partials/')

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
            when('/form', {
                    templateUrl: partialsPath+'main/form.html',
                    controller: 'FormController',
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.member]
            }).
            otherwise({redirectTo: "/home" });
    }
]);   