var myModule = angular.module('myApp',[]);

myModule.directive('hello', function(){
  return {
    restrict: 'AECM',
    transclude: true,
    template: '<div>hello everyone!<div ng-transclude></div></div>'
    //templateUrl: '../tpl/book.html',
    //replace: true
  }
})
