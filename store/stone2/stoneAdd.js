angular.module('stoneAdd', []).controller('addCtrl', ['$scope',
  function($scope) {
    var professData = PROFESSIONAL;
    var ResultData = [];
    // 这里的profess是基本职业和特殊职业的综合
    Idb.getData({
      DBname: Stone.DBName,
      tableName: Stone.professTable,
      callback: function(_data) {
        $scope.$apply(function() {
          $scope.profess = PROFESSIONAL.concat(_data)
        });
      }
    });

    $scope.player = 'player';
    $scope.enimy = 'enimy';

    // 添加结果
    $scope.addResult = function(addForm) {
      var playProfessArr = addForm.player.$modelValue.toString().split('.'),
        enimyProfessArr = addForm.enimy.$modelValue.toString().split('.');

      ResultData.push({
        time: new Date().getTime(),
        start: addForm.start.$modelValue,
        result: addForm.result.$modelValue,
        playProfess: playProfessArr[0],
        playBelong: playProfessArr[1],
        enimyProfess: enimyProfessArr[0],
        enimyBelong: enimyProfessArr[1]
      });

      // 把该数据写入数据库
      Idb.addData({
        DBname: Stone.DBName,
        tableName: Stone.resultTable,
        data: ResultData,
        callback: function() {
          location.hash = '#/list'
        }
      });
    }

  }
]);