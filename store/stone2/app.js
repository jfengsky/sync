/**
 * 全局路由
 * @type {[type]}
 */
var stoneApp = angular.module('stoneApp', ['ngRoute', 'stoneEdit', 'default', 'stoneAdd', 'stonelist', 'myFilter', 'professrank']);

stoneApp.config(function($routeProvider) {
  $routeProvider.when('/default', {

    // 首页
    templateUrl: 'tpl/default.html',
    controller: 'defaultCtrl'
  }).when('/add',{

    // 添加战斗结果
    templateUrl: 'tpl/add.html',
    controller: 'addCtrl'
  }).when('/edit', {

    // 编辑自定义职业
    templateUrl: 'tpl/edit.html',
    controller: 'editCtrl'
  }).when('/list',{

    // 对战结果列表页
    templateUrl: 'tpl/list.html',
    controller: 'listCtrl'
  }).when('/professrank',{

    // 基本职业排行
    templateUrl: 'tpl/professrank.html',
    controller: 'professrankCtrl'
  }).otherwise({
    redirectTo: '/default'
  })
});