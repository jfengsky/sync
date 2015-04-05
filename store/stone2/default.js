/**
 * 首页
 * @return {[type]}         [description]
 */

angular.module('default', []).controller('defaultCtrl', ['$scope',
  function($scope) {
    // 获取自定义职业数据
    // Idb.getData({
    //   DBname: Stone.DBName,
    //   tableName: Stone.professTable,
    //   callback: function(_data) {
    //     console.log(_data);
    //   }
    // });
    
    // 获取结果数据
    // Idb.getResult({
    //   callback: function(_data){
    //     console.log(_data);
    //     // $scope.$apply(function(){
    //     //   $scope.historyData = _data;
    //     // });
    //   }
    // });
    
    // console.log($scope.$stateParams);
    // console.log($stateProvider);
    
    var temp = Idb.getMatchResult(function(_obj){
      console.log(_obj);
      var totalMatch = 0,
          totalWin = 0;
      _obj.matchArray.forEach(function(_item){
        totalMatch = totalMatch + _item;
      });
      _obj.winArray.forEach(function(_item){
        totalWin = totalWin + _item;
      });
      $scope.$apply(function(){
        $scope.winPercent = ((totalWin/totalMatch) * 100).toFixed(2);
      });
    });

  }
]);