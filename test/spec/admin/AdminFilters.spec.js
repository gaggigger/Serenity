'use strict';

describe('userRoleFilter', function(){
	
    beforeEach(module('serenityApp'));

    var userRoleFilter;

    beforeEach(inject(function($filter) {
            userRoleFilter = $filter('userRoleFilter');
    }));
    
    it('should resolve the role names correctly', function() {
        expect(userRoleFilter('admin')).toBe('Admin');
        expect(userRoleFilter('editor')).toBe('Editor');
        expect(userRoleFilter('member')).toBe('Member');
        expect(userRoleFilter('guest')).toBe('Guest');
     });        
});

describe('dateJoinedFilter', function(){
	
    beforeEach(module('serenityApp'));

    var dateJoinedFilter;

    beforeEach(inject(function($filter) {
            dateJoinedFilter = $filter('dateJoinedFilter');
    }));
    
    it('should transform ISO 8601 date to mm/dd/yyyy format', function() {
        expect(dateJoinedFilter('2014-07-08')).toBe('07/08/2014');
        expect(dateJoinedFilter('2010-01-15')).toBe('01/15/2010');
     });        
});