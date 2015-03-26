var myModule = angular.module('myApp',[]);
myModule.directive('hello',function(){
  return {
    restrict: 'EAC',
    template: '<div>Hi everyone!</div>',
    // templateUrl: '',
    replace: 'true'
  }
});