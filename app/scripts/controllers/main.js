'use strict';

/**
 * @ngdoc function
 * @name spheresApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spheresApp
 */
angular.module('spheresApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
