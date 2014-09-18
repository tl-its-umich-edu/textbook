'use strict';

/**
 * @ngdoc function
 * @name textbooksApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the textbooksApp
 */
angular.module('textbooksApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
