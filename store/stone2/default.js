/**
 * 首页
 * @return {[type]}         [description]
 */
angular.module('default', []).controller('defaultCtrl', ['$scope',
  function($scope) {
    // 获取自定义职业数据
    Idb.getData({
      DBname: Stone.DBName,
      tableName: Stone.professTable,
      callback: function(_data) {
        console.log(_data);
      }
    });
    
    // 获取结果数据
    Idb.getResult({
      callback: function(_data){
        console.log(_data);
        // $scope.$apply(function(){
        //   $scope.historyData = _data;
        // });
      }
    });
  }
]);