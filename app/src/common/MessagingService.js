'use strict';

angApp.factory("flashMessaging", [
    function() {
        var messageTypes = {
           'success': 'alert-success',
           'info': 'alert-info',
           'warning': 'alert-warning',
           'danger': 'alert-danger'
        },
        queue = [],
        currentMessage = "",
        messageType = "info";

        return {
            setMessage: function(message, type) {
                queue.push(message);
                currentMessage = queue[0];
                if (messageType !== type) messageType = type;
                return this;
            },
            getMessage: function() {
                currentMessage = (queue.length > 0) ? queue.shift() : "";
                return currentMessage;
            },
            getMessageType: function() {
                return messageType;
            },
            setMessageType: function(type) {
                messageType = messageTypes[type];
                return this;
            },
            alert: function() {
                return messageType === messageTypes['dnager'];
            }
        };
    }
]);