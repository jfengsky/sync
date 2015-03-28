/**
 * 各种filter
 * @return
 */
angular.module('myFilter',[]).filter('matchResult', function(){
  return function(_item){
    if(_item ){
      return '赢'
    } else {
      return '输'
    }
  }
}).filter('start',function(){
  return function(_item){
    if(_item){
      return '先'
    } else {
      return '后'
    }
  }
}).filter('proEmpty', function(){
  return function(_item){
    if(_item){
      return '(' + _item + ')'
    }
  }
}).filter('resultColor', function(){
  return function(_item){
    if(_item){
      return 'success'
    } else {
      return 'danger'
    }
  }
});