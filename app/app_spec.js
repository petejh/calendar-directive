describe('CalendarDirectiveChallenge', function() {

  var dateFixtures = [
    {
      date: { year: 2014, month: 3, day: 15 },
      count: 35
    },
    {
      date: { year: 2011, month: 7, day: 29 },
      count: 42
    }
  ];
  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var element,
      html,
      rootScope,
      scope;

  beforeEach(module('CalendarDirectiveChallenge'));

  describe('calendar directive', function() {

    beforeEach(module('calendar-template.html'));
    beforeEach(inject(function($rootScope, $compile) {

      html = '<calendar date="date"></calendar>';

      rootScope = $rootScope;
      rootScope.date = {};

      scope = rootScope.$new();
      element = angular.element(html);
      $compile(element)(scope);
      scope.$digest();
    }));

    it("changes the date when it changes on the parent scope", function() {
      rootScope.date = dateFixtures[0].date;
      expect(element.scope().date).toBe(dateFixtures[0].date);
      rootScope.date = dateFixtures[1].date;
      expect(element.scope().date).toBe(dateFixtures[1].date);
    });

    it("computes a complete grid of days for the month", function() {
      rootScope.date = dateFixtures[0].date;
      scope.$digest();
      expect(element.isolateScope().days.length).toBe(dateFixtures[0].count);
    });

    it("recognizes that a certain day is in the current month", function() {
      rootScope.date = dateFixtures[0].date;
      scope.$digest();
      expect(element.isolateScope().isInCurrentMonth(dateFixtures[0].date)).toBe(true);
    });

    it("recognizes that a certain day is not in the current month", function() {
      rootScope.date = dateFixtures[0].date;
      scope.$digest();
      expect(element.isolateScope().isInCurrentMonth(dateFixtures[1].date)).toBe(false);
    });
  });

  describe('datepicker directive', function() {

    beforeEach(module('datepicker-template.html'));
    beforeEach(inject(function($rootScope, $compile) {

      html = '<datepicker date="date"></datepicker>';

      rootScope = $rootScope;
      rootScope.date = {};

      scope = rootScope.$new();
      element = angular.element(html);
      $compile(element)(scope);
      scope.$digest();
    }));

    it("changes the date when it changes on the parent scope", function() {
      rootScope.date = dateFixtures[0].date;
      expect(element.scope().date).toBe(dateFixtures[0].date);
      rootScope.date = dateFixtures[1].date;
      expect(element.scope().date).toBe(dateFixtures[1].date);
    });

    it("selects the current month", function() {
      rootScope.date = dateFixtures[0].date;
      rootScope.$apply();
      var month = dateFixtures[0].date.month;
      expect(element.find('option:contains("'+ months[month] +'")').prop('selected')).toBe(true);
    });

    it("selects the current year", function() {
      rootScope.date = dateFixtures[0].date;
      rootScope.$apply();
      var year = dateFixtures[0].date.year;
      expect(element.find('option:contains("'+ year +'")').prop('selected')).toBe(true);
    });
  });

});

