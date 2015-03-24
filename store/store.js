// 个职业配置参数
var kinds = [{
  'cname': '战士',
  'ename': 'warrior',
  'value': 0
}, {
  'cname': '萨满',
  'ename': 'shaman',
  'value': 1
}, {
  'cname': '盗贼',
  'ename': 'rogue',
  'value': 2
}, {
  'cname': '圣骑士',
  'ename': 'paladin',
  'value': 3
}, {
  'cname': '猎人',
  'ename': 'hunter',
  'value': 4
}, {
  'cname': '德鲁伊',
  'ename': 'druid',
  'value': 5
}, {
  'cname': '术士',
  'ename': 'warlock',
  'value': 6
}, {
  'cname': '法师',
  'ename': 'mage',
  'value': 7
}, {
  'cname': '牧师',
  'ename': 'priest',
  'value': 8
}];

var data = [];

// id序号, 从localstorage获取
var idIndex = 1;

/**
 * 获取中文职业名称
 * @param  {Number} _value 序号
 * @return {String}        中文名
 */
function getCname(_value) {
  var tempJob = '';
  kinds.forEach(function(_item) {
    if (_item.value === _value) {
      tempJob = _item.cname
    }
  });
  return tempJob
};

/**
 * 把事件转化为 YYYY-MM-DD HH-MM 格式
 * @param  {Number} _minSec  毫秒时间
 * @return {String}          新的时间格式
 */
function formatDate(_minSec) {
  var tempDate = new Date(_minSec);
  return tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes()
};

/**
 * 计算个职业的百分比
 * @param  {[type]} _item     [description]
 * @param  {[type]} _totalArr [description]
 * @return {[type]}           [description]
 */
function kindPercent(_item, _totalArr) {
  var totalNum = 0,
    tempPec = 0;
  _totalArr.forEach(function(_item) {
    totalNum = totalNum + _item
  });
  if (_totalArr[_item.value]) {
    tempPec = ((_totalArr[_item.value] / totalNum).toFixed(4)) * 100;
  }
  return tempPec.toFixed(2)
};

/**
 * 计算对各职业胜率
 * @param  {[type]} _item  [description]
 * @param  {[type]} winArr [description]
 * @return {[type]}        [description]
 */
function winPercent(_item, _winArr, _totalArr) {
  var tempPec = 0;
  _totalArr.forEach(function(_totalItem) {
    if (_totalItem) {
      _winArr.forEach(function(_winItem) {
        if (_winItem) {
          tempPec = ((_winArr[_item.value] / _totalArr[_item.value]).toFixed(4)) * 100;
          return false
        }
      });
    }
  });
  return tempPec
};

function totalFormat(_data) {
  var totalArr = [],
    winArr = [],
    tempArr = [];

  kinds.forEach(function(_item, _index) {
    totalArr[_index] = 0;
    winArr[_index] = 0;
  });

  _data.forEach(function(_item) {
    totalArr[_item.enimy] ++;
    if (_item.result) {
      winArr[_item.enimy] ++;
    }
  });

  kinds.forEach(function(_item, _index) {
    var tempKindPercent = kindPercent(_item, totalArr);
    // console.log(winPercent(_item, winArr, totalArr));
    if (tempKindPercent > 0) {
      tempArr.push({
        'cname': _item.cname,
        'kindPercent': kindPercent(_item, totalArr),
        'winPercent': winPercent(_item, winArr, totalArr)
      });
    }

  });
  return tempArr
}

function AllKindsWinArr(_kind, _data) {
  var totalArr = [],
    tempArr = [];

  kinds.forEach(function(_item, _index) {
    var tempArr = [];
    kinds.forEach(function(_secItem, _secIndex) {
      tempArr[_secIndex] = {
        'total': 0,
        'win': 0
      };
    });
    totalArr[_index] = tempArr;
  });

  // console.log(totalArr)

  _data.forEach(function(_item) {
    totalArr[_kind.value][_item.enimy]['total'] ++;
    if (_item.result) {
      totalArr[_kind.value][_item.player]['win'] ++;
    }
  });
  console.log(totalArr)


  // totalArr.forEach(function(_item){
  //   var tempPec = 0;
  //   if(_item){
  //     tempPec = (winArr[_kind.value] / _item).toFixed(4) * 100
  //   };
  //   tempArr.push(tempPec);
  // });

  return tempArr
}

function kindsWinFormat(_data) {
  var tempArr = [];

  kinds.forEach(function(_item, _index) {
    tempArr.push({
      'cname': _item.cname,
      'kindswin': AllKindsWinArr(_item, _data)
    });
  });
  // console.log(tempArr);
  return tempArr
}


// 显示职业列表
function formController($scope) {
  var historyData = [];
  $scope.player = 'player';
  $scope.enimy = 'enimy';
  $scope.kinds = kinds;
  $scope.data = data;
  $scope.historyData = historyData;
  $scope.kindswin = [];
  $scope.addTodo = function(myForm) {
    data.push({
      "id": idIndex,
      "time": new Date().getTime(),
      "player": myForm.player.$modelValue,
      "enimy": myForm.enimy.$modelValue,
      "start": myForm.start.$modelValue,
      "result": myForm.result.$modelValue
    });

    historyData.push({
      "id": idIndex,
      "time": formatDate(new Date().getTime()),
      "player": getCname(myForm.player.$modelValue),
      "enimy": getCname(myForm.enimy.$modelValue),
      "start": myForm.start.$modelValue ? '先' : '后',
      "result": myForm.result.$modelValue ? '赢' : '输',
      "style": myForm.result.$modelValue ? 'success' : 'danger'
    });
    // totalFormat(data);
    $scope.totalData = totalFormat(data);
    // $scope.kindswin = kindsWinFormat(data);
    idIndex++;
  };
  $scope.delhistory = function(_id) {
    data.forEach(function(_item, _index) {
      if(_item.id === _id) {
        data.splice(_index, 1);
      }
    });

    $scope.totalData = totalFormat(data);
  };
}