'use strict';
/**
 *  SESSION SERVICE
 *  
 *  A common service that proviodes session storgae functionality. It uses the HTML 5
 *  Session Storgae object (if available) and backs down to a generic JavaScript 
 *  Object if not found (older browsers)
 *  
 *  @author Jeff Fox (@jfox015)
 */
angApp
.service('SessionService', 
    function () {
        
        this.session = null;
        this.type = null;
        
        if (typeof(window.sessionStorage) !== 'undefined') {
            this.session = window.sessionStorage;
            this.type = 'html5session';
        }else {
            this.session =  { };
            this.type = 'object';
        }
        
        this.create = function (sessionId, userId, userRole, token) {
            if (this.type === 'html5session') {
                this.session.setItem("id", sessionId);
                this.session.setItem("userId", userId);
                this.session.setItem("userRole", userRole);
                this.session.setItem("token", token);
            } else {
                this.session.id = sessionId;
                this.session.userId = userId;
                this.session.userRole = userRole;
                this.session.token = token;
            }
        };
        this.get = function(key) {
             if (this.type === 'html5session') {
                 return this.session.getItem(key);
             } else {
                 return this.session[key];
             }
        };
        
        this.destroy = function () {
            if (this.type === 'html5session') {
                this.session.clear();
            } else {
                this.session = {};
            }
        };
    return this;
    }
);