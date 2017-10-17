var app = angular.module("shishaApp",['ngRoute','ngMaterial','ngAnimate','ui.bootstrap','md.time.picker','720kb.tooltips']);

app.config(function($routeProvider,$mdThemingProvider){
  'use strict';
  $mdThemingProvider.theme('default').primaryPalette('red');

  $routeProvider.when('/',{
      controller: 'MainController',
      templateUrl: 'Views/home.html'
    }).when('/flavours/',{
      controller: 'FlavourController',
      templateUrl: 'Views/flavours.html'
  }).when('/head/',{
    controller: 'HeadsController',
    templateUrl: 'Views/head.html'
  }).when('/payment/',{
    controller: 'PaymentController',
    templateUrl: 'Views/payment.html'
  }).when('/completed/',{
    controller: 'CompletedController',
    templateUrl: 'Views/completed.html'
  }).otherwise({
    redirectTo: '/'
  });
});
