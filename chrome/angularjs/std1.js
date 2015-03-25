var bookStoreApp = angular.module('bookStoreApp', ['ngRoute', 'ngAnimate', 'BookListCtrls']);

bookStoreApp.config(function($routeProvider) {
  $routeProvider.when('/hello', {
    templateUrl: 'tpl/hello.html',
    controller: 'HelloCtrl'
  }).when('/list', {
    templateUrl: 'tpl/book.html',
    controller: 'BookListCtrl'
  }).otherwise({
    redirectTo: '/hello'
  })
});