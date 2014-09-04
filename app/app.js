angular.module('CalendarDirectiveChallenge', [])

  .directive('calendar', function() {
    return {
      restrict: 'E',
      scope: {
        date: '=' // <calendar date="sharedvariable"></calendar>
      },
      templateUrl: 'calendar-template.html',
      link: function(scope, element, attrs) {

        var currentDate = new Date();

        scope.$watchCollection('date', function(date) {
          currentDate = new Date(date.year, date.month, date.day);
          scope.days = CalendarRange.getMonthlyRange(currentDate).days;
        });

        scope.days = CalendarRange.getMonthlyRange(currentDate).days;

        scope.isInCurrentMonth = function(day) {
          return (day.month == currentDate.getMonth());
        };
      }
    };
  })

  .directive('datepicker', function() {
    return {
      restrict: 'E',
      scope: {
        date: '=' // <datepicker date="sharedvariable"></datepicker>
      },
      templateUrl: 'datepicker-template.html',
      link: function(scope, element, attrs) {

        var today = new Date();
        var yearsToSelect = 20;

        function setYears() {
          var yearsRange = [];
          var currentYear = today.getFullYear();
          for (i = currentYear - yearsToSelect;
               i <= currentYear + yearsToSelect;
               i++) {
            yearsRange.push(i);
          }
          return yearsRange;
        }

        scope.date = scope.date || {
          year: today.getFullYear(),
          month: today.getMonth(),
          day: 1
        };

        scope.months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        scope.years = setYears();
      }
    };
  });

