describe("AuthProvider", function() {
	
	beforeEach(module('serenityApp'));
    beforeEach(module('ngMock'));
    
    var AuthProvider,
    	$httpBackend,
    	serviceBase;
    
    beforeEach(inject(function(_$httpBackend_, _serviceBase_, _AuthProvider_) {
    	AuthProvider = _AuthProvider_;
    	$httpBackend = _$httpBackend_; 
    	serviceBase = _serviceBase_;
    }));
   
	
});