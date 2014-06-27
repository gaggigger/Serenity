'use strict';

angApp.factory("flashMessaging", ['$rootScope', 
    function($rootScope) {
        var messageTypes = {
           'success': 'alert-success',
           'info': 'alert-info',
           'warning': 'alert-warning',
           'danger': 'alert-danger'
        },
        queue = [],
        currentMessage = "",
        messageType = "info";

        $rootScope.$on("$routeChangeSuccess", function() {
          currentMessage = queue.shift() || "";
        });

        return {
            setMessage: function(message) {
                queue.push(message);
                currentMessage = queue[0];
            },
            getMessage: function() {
                if (queue.length > 0) queue.shift();
                return currentMessage;
            },
            getMessageType: function() {
                return messageType;
            },
            setMessageType: function(type) {
                messageType = messageTypes[type];
            }
        };
    }
]);