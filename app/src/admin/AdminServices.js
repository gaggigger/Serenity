'use strict';

angApp.
service('UsersService', ['paths', 'config', '$resource',
    function(paths, config, $resource) {
        this.load = function() {
            return $resource(paths[config.mode].users).get().$promise;
        };
    }
])
.service('SettingsService', ['paths', 'config', '$resource',
    function(paths, config, $resource) {
        this.load = function() {
            return $resource(paths[config.mode].settings).get().$promise;
        };
        this.save = function(settings) {
            return $resource(paths[config.mode].settings).save(settings).$promise;
        };
    }
])
;