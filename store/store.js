// 个职业配置参数
var kinds = [{
  'name': '牧师',
  'key': 'mmm',
  'select': false
}, {
  'name': '法师',
  'key': 'fff',
  'select': true
}]

// 显示职业列表
function formController($scope) {
  $scope.options = {
    player: '',
    enimy: ''
  };
  $scope.kinds = kinds;
  $scope.addTodo = function(myForm) {
    console.log(myForm.player);
    console.log(myForm.enimy);
    console.log(myForm.result);
  }
  $scope.newValue = function(value) {
    console.log(value);
    $scope.options.value = value;
  }
}