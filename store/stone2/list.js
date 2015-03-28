/**
 * 对战结果列表页
 * @return
 */
angular.module('stonelist', []).controller('listCtrl', ['$scope',
  function($scope){

    // 获取对战结果数据
    
    Idb.getResult({
      callback: function(_data){
        $scope.$apply(function(){
          $scope.historyData = _data;
        });
      }
    });
  }
]);