var textApp = angular.module('textApp', ['dashFilters', 'ngRoute', 'ngAnimate']);

var proxy = '';

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
    })
    
})

textApp.controller('coursesController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var url = 'data/classes.json';
    $http.get(url).success(function(data){
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

textApp.controller('uBookController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    var url = 'data/myoffers.json';
    $http.get(url).success(function(data){
        $scope.books = data.books;
    });
}
]);
