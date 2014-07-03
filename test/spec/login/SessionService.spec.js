'use strict';

/* jasmine specs for services go here */

describe('SessionService', function() {
    
    beforeEach(module('serenityApp'));

    var SessionService;
    
    beforeEach(inject(function( _SessionService_) {
    	SessionService = _SessionService_;
    }));
    
    describe('Session Support', function() {
        
        var sessionData = {
            id: 'hdyhd873bd8idhdjd9djn39_4',
            userId: 'anyuser',
            userRole: 'member',
            token: '8dhdbd7sdvbw89wsb'
        };
        function makeNewSession() {

            SessionService.create(sessionData.id, sessionData.userId, sessionData.userRole, sessionData.token);
            
        }
        it('should create a session', function() {
            
            makeNewSession();
            var result = SessionService.get("id");
            expect(result).toEqual(sessionData.id); 
        });
        
        it('should destroy a session', function() {
            
            makeNewSession();
            SessionService.destroy(); 
            var result = SessionService.get("id");
            expect(result).not.toEqual(sessionData.id); 
        });
    });
});