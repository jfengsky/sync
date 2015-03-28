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
});