angular.module('stoneEdit', []).controller('editCtrl', ['$scope',
  function($scope) {
    $scope.ProfessType = 0;
    $scope.profess = PROFESSIONAL;
    $scope.addProfessional = function(){
      console.log($scope.ProfessName);
      console.log($scope.ProfessType)
    };
  }
]);