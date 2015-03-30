var myModule = angular.module('myApp', []);
myModule.controller('MyCtrl', ['$scope',
  function($scope){
    $scope.ctrlFlavor = "中文"
  }
])
myModule.directive('drink', function(){
  return {
    restrict: 'AE',
    scope: {
      flavor: '@'
    },
    template: '<div>{{flavor}}</div>'
    //link: function(scope, element, attrs){
    //  scope.flavor = attrs.flavor;
    //}
  }
});