'use strict';
describe('LoginController', function(){

	beforeEach(module('serenityApp'));
	beforeEach(module('specMocks'));
	
	var scope,
        rootScope,
		LoginController,
		AuthProvider,
		testResult,
		$location,
                AUTH_EVENTS,
                secureLogin;
		
        
        beforeEach(inject(function($rootScope, $controller, _$location_, PromiseMock, _AUTH_EVENTS_, _secureLogin_) {
		scope = $rootScope.$new();
		rootScope = jasmine.createSpyObj('$rootScope', ['$broadcast']);
		AuthProvider = jasmine.createSpyObj('AuthProvider', ['login']);
		$location = _$location_;
                AUTH_EVENTS = _AUTH_EVENTS_;
		secureLogin = _secureLogin_;
                
		testResult = { name:'jfox015', status:'success' };
		var promise = new PromiseMock(testResult);
		AuthProvider.login.and.returnValue(promise);
		
		LoginController = $controller('LoginController', {
			$scope: scope,
			AuthProvider: AuthProvider,
			$location: $location
		});
		
		spyOn($location, 'path');
	}));

	afterEach(function(){ });
        
        it('should call AuthService with encypted password', function(){
		
                var credentials = { username:'jfox015', password: 'myPass01' };
		
                scope.login(credentials);
		
		expect(AuthProvider.login).toHaveBeenCalledWith(secureLogin.secure(credentials));
	});

});