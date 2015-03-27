var stoneApp = angular.module('stoneApp', ['ngRoute', 'stoneEdit', 'default', 'stoneAdd','stonelist']);

stoneApp.config(function($routeProvider) {
  $routeProvider.when('/default', {
    templateUrl: 'tpl/default.html',
    controller: 'defaultCtrl'
  }).when('/add',{
    templateUrl: 'tpl/add.html',
    controller: 'addCtrl'
  }).when('/edit', {
    templateUrl: 'tpl/edit.html',
    controller: 'editCtrl'
  }).when('/list',{
    templateUrl: 'tpl/list.html',
    controller: 'listCtrl'
  }).otherwise({
    redirectTo: '/default'
  })
});