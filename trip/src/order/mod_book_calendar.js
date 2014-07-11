/**
 * 证件有效期，出生日期 日历交互模块
 */
define(function (require, exports, module) {
  var JQ = require('jquery');
  function Birthday(){
    var self = this;

    /**
     * 日期月份补0
     */
    // this._setZero = function(_Num){
    //   if(_Num.toString().length <= 1){
    //     return '0' + _Num
    //   } else {
    //     return _Num;
    //   }
    // };
    /**
     * 日历选择操作
     * @return
     */
    this._calendar = function(_id, _defaultDate){
      _id.regMod('calendar', '6.0', {
        options: {
          container: "#J_cardanCnt",
          showAlways: false,
          step: 1,
          minDate: "1900-01-01",
          maxDate: "#",
          data: null,
          defaultDate: _defaultDate,
          showOptions: true,
          showWeek: false
        },
        listeners: {
          onChange: function(input, value) {
            JQ(input).focus();
            JQ('#J_cardanCnt').html('');
           JQ(input).closest('li').next().find('input,select').focus();
            // var d = value.toDate(),
            // getDate = new Date(d),
            // fullYear = getDate.getFullYear(),
            // fullMonth = getDate.getMonth() + 1,
            // fullDate = getDate.getDate(),
            // cnt = JQ(input).closest('li');
            // cnt.find('input[_cqnotice="yyyy"]').val(fullYear);
            // cnt.find('input[_cqnotice="mm"]').val(fullMonth);
            // cnt.find('input[_cqnotice="dd"]').val(fullDate);
          }
        }
      });
    }

    /**
     * 初始化
     * @return
     */
    this.init = function(){
      JQ('body').append('<div id="J_cardanCnt"></div>');
      $LAB.script({src:'http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js', charset:"utf-8"}).wait(function() {
        // 初始化生日日历框
        // self._calendar( $('input[role="birthdayS"]') , '1980-01-01');

        // 初始化证件有效期日历框
        // self._calendar( $('input[role="cardValidUntilS"]'), '2020-01-01');
        var inputArr = ['role="cardValidUntilS"', 'role="birthdayS"'];
        JQ.each(inputArr, function(_index, _item){
          var tmpInputs = $('input[' + _item + ']'),
              TempDefaultDate = '1980-01-01';
          if( _item == 'role="cardValidUntilS"'){
            TempDefaultDate = '2020-01-01';
          };
          JQ.each(tmpInputs, function(_idx, _key){
            self._calendar($(_key), TempDefaultDate);
          });
        });
      });
    }
  };
      

  module.exports = Birthday;

});
