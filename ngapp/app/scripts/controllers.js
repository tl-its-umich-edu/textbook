/*jshint strict:false */

var textApp = angular.module('textApp', ['textBookFilters', 'ngRoute', 'ngAnimate','truncate']);

textApp.config(function($routeProvider){
    //routes
    $routeProvider.when('/', {
        controller: 'coursesController',
        templateUrl: 'views/courses.html'
    }).when('/mysales', {
        controller: 'mySalesController',
        templateUrl: 'views/mysales.html'
    }).when('/offers/:bookId', {
        controller: 'offersController',
        templateUrl: 'views/offers.html'
    }).when('/ubook', {
        controller: 'uBookController',
        templateUrl: 'views/ubook.html'
    }).otherwise({
        redirectTo: '/'
    }); 
});

textApp.controller('coursesController', ['$scope', '$http', function($scope, $http){
    var url = 'data/classes.json';
    $http.get(url, { cache: 'true'}).success(function(data){
        $scope.courses = data;
    });


}
]);

textApp.controller('offersController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var url = 'data/booksforsale/' + $routeParams.bookId + '.json';
    $http.get(url).success(function(data){
        $scope.offers = data.offers;
    });
}
]);

textApp.controller('uBookController', ['$scope', '$http',  function($scope, $http){
    var url = 'data/myoffers.json';
    $http.get(url).success(function(data){
        $scope.books = data.books;
    });
}
]);
