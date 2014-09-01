angular.module('CalendarDirectiveChallenge', [])

  .directive('calendar', function() {
    return {
      restrict: 'E',
      templateUrl: 'calendar-template.html',
      scope: true,
      link: function(scope, element, attrs) {
        scope.calendar = {
          range: CalendarRange.getMonthlyRange(new Date()),
          isInCurrentMonth: function(day) {
            var currentMonth = new Date().getMonth();
            return (day.month == currentMonth);
          }
        };
      }
    };
  })

  .directive('datepicker', function() {
    return {
      restrict: 'E',
      templateUrl: 'datepicker-template.html',
      scope: true,
      link: function(scope, element, attrs) {

        function setYears() {
          var years = [];
          var currentYear = new Date().getFullYear();
          for (i = currentYear - 20; i <= currentYear + 20; i++) {
            years.push(i);
          }
          return years;
        }

        scope.range = {
          months: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
          ],
          years: setYears()
        };

      }
    };
  });

