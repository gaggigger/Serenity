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
        return function(input, format) {
            var date = null;
            if (typeof format === "undefined") format = 'shortDate';
            if (input.match("-")) {
                input = input.split("-");
                if (format !== "shortDate") {
                    input[1] = input[1]-1;
                }
                date = new Date(input[0], input[1], input[2]);
            } else {
                date = new Date(input);
            }
            var dateStr = "";
            switch (format) {
                case 'shortDate':
                default:
                    var monStr = date.getMonth();
                    dateStr += ((monStr < 10) ? "0" + monStr : monStr) + "/";
                    var strDay = date.getDate();
                    dateStr += ((strDay < 10) ? "0" + strDay : strDay) + "/";
                    dateStr += date.getFullYear();
                    break;
                case "utc":
                    dateStr = date.toUTCString();
                    break;
                case "gmt":
                    dateStr = date.toGMTString();
                    break;
                case "dateString":
                    dateStr = date.toDateString();
                    break;
            }
            return dateStr;
        };
    }
)
;