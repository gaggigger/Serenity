'use strict';
describe("UsersService", function() {
	
    beforeEach(module('serenityApp'));
    beforeEach(module('ngMock'));
    
    var UsersService,
    	$httpBackend,
    	config,
    	paths;
    
    beforeEach(inject(function(_UsersService_, _$httpBackend_, _config_, _paths_) {
    	UsersService = _UsersService_;
    	$httpBackend = _$httpBackend_; 
    	config = _config_;
    	paths = _paths_;
    }));
    
    afterEach(function(){
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
   
    describe('getUsers', function() {
    	
        var response = {
            "status": 200,
            "error": false,
            "userCount":4,
            "users": [
                {
                    "name": "Jeff Fox",
                    "email": "jfox015@gmail.com",
                    "emailPublic": false,
                    "userId": "jfox015",
                    "role": "admin",
                    "dateJoined": "2014-06-01",
                    "group": "Administrators"
                },
                {
                    "name": "Ginger Baker",
                    "email": "gbaker@gmail.com",
                    "emailPublic": true,
                    "userId": "gBaker47362",
                    "role": "member",
                    "dateJoined": "2014-07-06",
                    "group": "Cream Band"
                },
                {
                    "name": "Jack Bruce",
                    "email": "jbruce@gmail.com",
                    "emailPublic": true,
                    "userId": "jbruce",
                    "role": "editor",
                    "dateJoined": "2014-07-06",
                    "group": "Cream Band"
                },
                {
                    "name": "Eric Clapton",
                    "email": "eclapton@gmail.com",
                    "emailPublic": true,
                    "userId": "eclapton",
                    "role": "member",
                    "dateJoined": "2014-07-06",
                    "group": "Cream Band"
                }
            ]
        };
        beforeEach(function() {
            $httpBackend.whenGET(paths[config.mode].users).respond( response );
    	});
    
        it("should get the list of users with no errors", function(){
            var result;

            UsersService.load().then(function(response){
                result = response;
            });

            $httpBackend.flush();

            expect(result.status).toEqual(200); 	
            expect(result.error).toEqual(false); 	
            expect(result.error).not.toEqual(true); 	
            expect(result.users.length).toEqual(4); 	
        });
    });
});