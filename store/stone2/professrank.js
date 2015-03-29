/**
 * 基本职业排行
 */
angular.module('professrank', []).controller('professrankCtrl', ['$scope',
  function($scope) {

    // 获取结果数据
    Idb.getResult({
      callback: function(_data) {
        var professWinArray = [],
          professList = [],
          professWinList = [],
          professListPec = [],
          totalProfess = 0,
          winArray = [];

        PROFESSIONAL.forEach(function(_item, _index) {
          professWinArray[_index] = 0;
          winArray[_index] = 0;
          professList.push({
            cname: _item.cname,
            percent: 0,
            winpec: 0
          });
        });

        console.log(_data);
        _data.forEach(function(_item) {
          var tempName = '';
          if (_item.enimyBelong) {
            // 自定义职业
            tempName = _item.enimyBelong;
          } else {
            // 基本职业
            tempName = _item.enimyProfess;
          };

          // 把胜的结果累加进数组
          if (_item.result) {
            PROFESSIONAL.forEach(function(_proName) {
              if (_proName.cname === tempName) {
                winArray[_proName.id] ++
              }
            });
          }

          // 把所有对方职业累加进数组
          PROFESSIONAL.forEach(function(_proName) {
            if (_proName.cname === tempName) {
              professWinArray[_proName.id] ++
            }
          });
        });


        // 碰到的职业总数
        professWinArray.forEach(function(_item) {
          if (_item) {
            totalProfess = totalProfess + _item;
          }
        });

        // 计算基本职业百分比
        professList.forEach(function(_professItem, _professIndex) {
          var professNum = professWinArray[_professIndex];
          _professItem.percent = ((professNum / totalProfess) * 100).toFixed(2) - 0;
          professWinList.push(_professItem);

        });

        winArray.forEach(function(_item, _index) {
          var tempWinPec = 0;
          if (_item) {
            tempWinPec = ((_item / professWinArray[_index]) * 100).toFixed(2) - 0;
            professWinList[_index].winpec = tempWinPec;
          }
        });

        // 清0
        professWinList.forEach(function(_item) {
          if (_item.percent)
            professListPec.push(_item);
        });
        $scope.$apply(function() {
          $scope.professData = professListPec;
        });
      }
    });
  }
]);