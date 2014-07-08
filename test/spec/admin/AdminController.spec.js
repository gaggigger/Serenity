'use strict';
describe('AdminController', function(){
	
	beforeEach(module('serenityApp'));
	beforeEach(module('specMocks'));
	
	var scope,
		AdminController,
		$window;
	
	beforeEach(function() {
		
	});
	
	beforeEach(inject(function($rootScope, $controller, _$window_){
		scope = $rootScope.$new();
		spyOn(scope, '$apply');
		$window = _$window_;
		
		AdminController = $controller('AdminController', {
			$scope: scope
		});
	}));
});