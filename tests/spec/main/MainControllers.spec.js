
describe('MainControllers', function(){
	
	beforeEach(module('serenityApp'));
	beforeEach(module('specMocks'));
	
	var scope,
		MainController,
		$window;
	
	beforeEach(function() {
		
	});
	
	beforeEach(inject(function($rootScope, $controller, _$window_){
		scope = $rootScope.$new();
		spyOn(scope, '$apply');
		$window = _$window_;
		
		MainController = $controller('MainController', {
			$scope: scope
		});
	}));
});