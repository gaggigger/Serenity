'use strict';
describe('flashMessaging', function(){
	
	beforeEach(module('serenityApp'));
	
	var flashMessaging;
	
	beforeEach(inject(function(_flashMessaging_) {
		flashMessaging = _flashMessaging_;
	}));
	
	it('should provide a message', function() {
            flashMessaging.setMessage("This is a message");
            var result = flashMessaging.getMessage();
            expect(result).toBeDefined();
	});
        
	it('should return the message only once', function() {
            flashMessaging.setMessage("This is a message");
            var result = flashMessaging.getMessage();
            var result2 = flashMessaging.getMessage();
            expect(result2).toBe("");
	});
        
});