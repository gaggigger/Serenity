describe('LoginController', function(){

	beforeEach(module('serenityApp'));
	beforeEach(module('specMocks'));
	
	var scope,
		LoginController,
		AuthService,
		testResult,
		$location;
		
	beforeEach(inject(function($rootScope, $controller, _$location_, PromiseMock){
		scope = $rootScope.$new();
		AuthService = jasmine.createSpyObj('AuthService', ['login']);
		$location = _$location_;
		
		testResult = { user:'anyuser', status:'success' };
		var promise = new PromiseMock(testResult);
		AuthService.login.and.returnValue(promise);
		
		LoginController = $controller('LoginController', {
			$scope: scope,
			AuthService: AuthService,
			$location: $location
		});
		
		spyOn($location, 'path');
	}));

	afterEach(function(){

	});

});