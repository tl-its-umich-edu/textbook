'use strict';

/**
 * @ngdoc function
 * @name textbooksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the textbooksApp
 */
angular.module('textbooksApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
