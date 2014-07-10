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
     it('should transform ISO 8601 date to GMT Date', function() {
        expect(dateJoinedFilter('2014-07-08', 'gmt')).toBe('Tue, 08 Jul 2014 04:00:00 GMT');
        expect(dateJoinedFilter('2010-01-15', 'gmt')).toBe('Fri, 15 Jan 2010 05:00:00 GMT');
     });        
     it('should transform ISO 8601 date to UTC Date', function() {
        expect(dateJoinedFilter('2014-07-08', 'utc')).toBe('Tue, 08 Jul 2014 04:00:00 GMT');
        expect(dateJoinedFilter('2010-01-15', 'utc')).toBe('Fri, 15 Jan 2010 05:00:00 GMT');
     });        
     it('should transform ISO 8601 date to a date string', function() {
        expect(dateJoinedFilter('2014-07-08', 'dateString')).toBe('Tue Jul 08 2014');
        expect(dateJoinedFilter('2010-01-15', 'dateString')).toBe('Fri Jan 15 2010');
     });        
});