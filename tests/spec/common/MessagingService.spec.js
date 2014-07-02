describe('MessagingService', function(){
	
	beforeEach(module('serenityApp'));
	beforeEach(module('ngMock'));
	
	var MessagingService;
	
	beforeEach(inject(function(_MessagingService_) {
		MessagingService = _MessagingService_;
	}));
	
	
	it('should provide a message', function() {
		var results;
	
                
		MessagingService.setMessage("This is a message");
                
		var results = MessagingService.getMessage();
		
		expect(results).toBeTruthy();
	});
});