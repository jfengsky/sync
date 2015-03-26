var myModule = angular.module('myApp',[]);

myModule.controller('MyCtrl',['$scope', function($scope){
  $scope.loadData = function(){
    console.log('loadding')
  }
}]);

myModule.controller('MyCtrl2',['$scope', function($scope){
  $scope.loadData2 = function(){
    console.log('loadding2222')
  }
}]);

myModule.directive('loader', function(){
  return {
    restrict: 'AE',
    link: function(scope, element, attr){
      element.bind('mouseenter', function(){
        // scope.loadData();
        scope.$apply(attr.howtoload);
      })
    }
  }
});