angular.module('stonelist', []).controller('listCtrl', ['$scope',
  function($scope){

    // 获取对战结果数据
    Idb.getData({
      DBname: Stone.DBName,
      tableName: Stone.resultTable,
      callback: function(_data) {
        console.log(_data);

        // 格式化数据
        //_data.forEach(function( _item ){
        //  _item._time = formatData.formatTime(_item.time)
        //});
        $scope.$apply(function(){
          $scope.historyData = _data;
        });
      }
    });
    console.log(Stone);
  }
]);