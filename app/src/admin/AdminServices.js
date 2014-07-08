'use strict';

angApp.
service('UsersService', ['paths', 'config', '$resource',
    function(paths, config, $resource) {
        this.load = function() {
            console.log(paths[config.mode].users);
            return $resource(paths[config.mode].users).get().$promise;
        };
    }
]);