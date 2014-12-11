'use strict';
/* jshint  strict: true*/
/* global $, _,  angular */


var textApp = angular.module('textApp', ['textBookFilters', 'ngRoute', 'ngAnimate','truncate']);


/**
 * get the current AngularJS url
 * @returns {string|*}
 */
function getRailsUrl() {
    var url = location.protocol + '//' + location.host;
    return  url.replace(location.port, '3000');
}

textApp.config(function($routeProvider){
    //routes
    $routeProvider.when('/', {
        controller: 'coursesController',
        templateUrl: 'views/courses.html',
        animate: 'slideRight'
    }).when('/print_courses', {
        controller: 'coursesController',
        templateUrl: 'views/print_courses.html',
        animate: 'slideLeft'
    }).when('/mysales', {
        controller: 'mySalesController',
        templateUrl: 'views/mysales.html',
        animate: 'slideLeft'
    }).when('/offers/:bookId', {
        controller: 'offersController',
        templateUrl: 'views/offers.html',
        animate: 'slideLeft'
    }).when('/ubook', {
        controller: 'uBookController',
        templateUrl: 'views/ubook.html',
        animate: 'slideLeft'
    }).otherwise({
        redirectTo: '/',
        animate: 'slideRight'
    });
});

textApp.controller('coursesController', ['$scope', '$http', function($scope, $http){
    $scope.loading = true;
    var url = getRailsUrl() + '/api/v1/classes.json';
    //below for testing
    //var url = 'data/test-textbook-number.json';

    $http.get(url, {
            params: {
                term: '2010',
                uid:'jorhill'
            }
        }
    ).success(function(data){
          var isbns = [];
          $.each(data, function (i, l) {
            l.Instructor = _.filter(l.Instructor, function (instructor) {
              return instructor.Role !== 'Dummy';
            });
            if(l.Textbook.length === undefined){
                l.Textbook = [].concat(l.Textbook);
            }
            $.each(l.Textbook, function (i, l) {
                isbns.push(this.ISBN);
            });
          });
          $scope.loading = false;
          $scope.courses= data;
          $scope.isbns = _.uniq(isbns).toString();
    }).error(function() {
        $scope.error = true;
        $scope.errorUrl = url;
        $scope.loading = false;
      });
}
]);

textApp.controller('offersController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var url = getRailsUrl() + '/api/v1/booksforsale/' + $routeParams.bookId + '.json';
    $http.get(url).success(function(data){
        $scope.offers = data.offers;
    });
}
]);

textApp.controller('uBookController', ['$scope', '$http',  function($scope, $http){
    var url = getRailsUrl() + '/api/v1/myoffers.json';
    $http.get(url).success(function(data){
        $scope.books = data.books;
    });
}
]);


textApp.directive('animClass',function($route){
  return {
    link: function(scope, elm){
      var enterClass = $route.current.animate;
      elm.addClass(enterClass);
      scope.$on('$destroy',function(){
        elm.removeClass(enterClass);
        elm.addClass($route.current.animate);
      });
    }
  };
});
