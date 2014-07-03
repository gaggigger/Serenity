'use strict';
describe("AuthProvider", function() {
	
    beforeEach(module('serenityApp'));
    beforeEach(module('ngMock'));
    
    var AuthProvider,
    	$httpBackend,
    	config,
    	paths;
    
    beforeEach(inject(function(_AuthProvider_, _$httpBackend_, _config_, _paths_) {
    	AuthProvider = _AuthProvider_;
    	$httpBackend = _$httpBackend_; 
    	config = _config_;
    	paths = _paths_;
    }));
    
    afterEach(function(){
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
   
    describe('login', function() {
    	
        var response = {
            "status": 200,
            "name": "jefffox",
            "role": "Admin",
            "authKey": "jdud7nsdjd9wuj3nd9djdo",
            "publicKey": "kjdhd8idyu3ne0dhsjw873he9dcudbdhsd82h290xdh",
            "sessionId": "83y2bfuhasfhqasbfi8ashf9hasfasf"
        };
        beforeEach(function() {
            $httpBackend.whenGET(paths[config.mode].login).respond( response );
    	});
    
        it("should get the user name", function(){
            var result;

            AuthProvider.login().then(function(response){
                result = response;
            });

            $httpBackend.flush();

            expect(result['name']).toEqual(response['name']); 	
        });
    });
    describe('logout', function() {
        
        var response = {
            "status": 200,
            "name": "",
            "role": "",
            "authKey": "",
            "publicKey": "",
            "sessionId": ""
        };
        beforeEach(function() {
            $httpBackend.whenGET(paths[config.mode].logout).respond( response );
    	});
        it ("should log the user out", function() {
            var result;

            AuthProvider.logout().then(function(response){
                result = response;
            });

            $httpBackend.flush();

            expect(result['name']).toEqual(""); 
        });
    });
});