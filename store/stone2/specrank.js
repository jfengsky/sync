/**
 * 自定义职业排行
 */

angular.module('specialrank', []).controller('specrankCtrl', ['$scope',
  function($scope) {

    $scope.careerData = [];

    // 获取自定义职业数据
    Idb.getData({
      DBname: Stone.DBName,
      tableName: Stone.professTable,
      callback: function(_data) {

        // 自定义职业
        var specialCareerList = _data,
          specialCareerArray = [];

        // 根据id初始化碰到的职业数组,有就为0,没有为null
        specialCareerList.forEach(function(_item) {
          specialCareerArray[_item.id] = 0;
        });

        console.log(specialCareerArray);

        // 获取结果数据
        Idb.getResult({
          callback: function(_resultDta) {

            // 对战结果
            var matchResult = _resultDta,
                totalMatch = 0;
            matchResult.forEach(function(_item) {
              var tempCareerId;
              specialCareerList.forEach(function(_careerItem) {
                if (_item.enimyProfess === _careerItem.cname) {
                  tempCareerId =  _careerItem.id
                  return false;
                }
              });
              if(tempCareerId){
                specialCareerArray[tempCareerId]++
              }
            });

            // 计算总对战数
            specialCareerArray.forEach(function(_item){
              totalMatch = totalMatch + _item;
            });

            specialCareerList.forEach(function(_listItem){
              _listItem.percent = ((specialCareerArray[_listItem.id] / totalMatch) * 100 ).toFixed(2);
            });
            $scope.$apply(function(){
              $scope.careerData = specialCareerList;
            });

          }
        });

      }
    });

    // 获取结果数据
    Idb.getResult({
      callback: function(_data) {
        console.log(_data);
        // $scope.$apply(function(){
        //   $scope.historyData = _data;
        // });
      }
    });


  }
]);