/*jshint strict:false */

var textApp = angular.module('textApp', ['textBookFilters', 'ngRoute', 'ngAnimate','truncate']);

textApp.config(function($routeProvider){
    //routes
    $routeProvider.when('/', {
        controller: 'coursesController',
        templateUrl: 'views/courses.html',
        animate: 'slideRight'
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
    var url = 'http://localhost:3000/api/v1/classes.json';
    //below for testing    
    //var url = 'data/courses.json';

    $http.get(url, {
            params: {
                term: '2010',
                uid:'jorhill'
            }
        }
    ).success(function(data){
        $scope.courses= data;
    });
}
]);

textApp.controller('offersController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var url = 'http://localhost:3000/api/v1/booksforsale/' + $routeParams.bookId + '.json';
    $http.get(url).success(function(data){
        $scope.offers = data.offers;
    });
}
]);

textApp.controller('uBookController', ['$scope', '$http',  function($scope, $http){
    var url = 'http://localhost:3000/api/v1/myoffers.json';
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