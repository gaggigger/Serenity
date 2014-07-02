angular.module('specMocks', []).service('PromiseMock', function() {
	return function(response) {
		this.then = function(callback) {
			this.callback = callback;
			if(!this.wait) {
				callback(response);
			}
		};
		
		this.flush = function() {
			this.callback(response);
		};
	};
});