'use strict';

angApp
.filter('userRoleFilter', ['USER_ROLES',
    function(USER_ROLES) {
        return function(input) {
            return USER_ROLES[input];
        };
    }
])
.filter('dateJoinedFilter', 
    function() {
        return function(input) {
            var date = new Date(input);
            var dateStr = "";
            var monStr = (date.getMonth() + 1);
            dateStr += ((monStr < 10) ? "0" + monStr : monStr) + "/";
            var strDay = date.getDate();
            dateStr += ((strDay < 10) ? "0" + strDay : strDay) + "/";
            dateStr += date.getFullYear();
            return dateStr;
        };
    }
)
;