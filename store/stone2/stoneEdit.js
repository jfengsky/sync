/**
 * 编辑自定义职业
 * @return {[type]}         [description]
 */
angular.module('stoneEdit', []).controller('editCtrl', ['$scope',
  function($scope) {

    $scope.ProfessType = PROFESSIONAL[0].cname;
    $scope.profess = PROFESSIONAL;
    $scope.specProfess = [];

    // 初始化自定义职业
    function showList() {
      Idb.getData({
        DBname: Stone.DBName,
        tableName: Stone.professTable,
        callback: function(_data) {
          $scope.$apply(function() {
            $scope.specProfess = _data;
          });
        }
      });
    };

    showList();

    // 添加自定义职业
    $scope.addProfessional = function() {
      var tempData = [];
      var newProfess = {
        cname: $scope.ProfessName,
        belong: $scope.ProfessType
      };
      tempData.push(newProfess);

      // 把该数据写入数据库
      Idb.addData({
        DBname: Stone.DBName,
        tableName: Stone.professTable,
        data: tempData,
        callback: function() {

          // 重新读取数据表
          showList();

          // directive 提示添加成功

          // 清空填写框
          $scope.ProfessName = '';
        }
      });
    };

    // 删除自定义职业
    $scope.del = function(_id) {
      Idb.deleteData({
        DBname: Stone.DBName,
        tableName: Stone.professTable,
        id: _id,
        callback: function() {
          // 重新读取数据表
          showList();

          // directive 提示删除成功
        }
      });
    }
  }
]);