angular.module('myApp',[])
.controller('myCtrl',['$scope',
  function($scope){
    $scope.loadData = function(){
      console.log('加载数据中')
    }
  }
])
.controller('myCtrl2',['$scope',
    function($scope){
      $scope.loadData2 = function(){
        console.log('222222')
      }
    }
])
.directive('loader', function(){
  return {
    restrict: 'AE',
    link: function(scope, element, attr){
      element.bind('mouseenter', function(){
        //scope.loadData();
        //scope.$apply('loadData()');
        scope.$apply(attr.howtoload);
      })
    }
  }
})