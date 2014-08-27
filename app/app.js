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
            var today = new Date();
            return (day.month == today.getMonth());
          }
        };
      }
    };
  });

