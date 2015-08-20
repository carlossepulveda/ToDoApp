'use strict';

/**
 * @ngdoc overview
 * @name webSiteTestYoApp
 * @description
 * # webSiteTestYoApp
 *
 * Main module of the application.
 */
angular
  .module('toDoTaskApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
