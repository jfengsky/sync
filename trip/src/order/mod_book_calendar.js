/**
 * 证件有效期，出生日期 日历交互模块
 */
define(function (require, exports, module) {
    var JQ = require('jquery');
      $LAB.script({src:'http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js', charset:"utf-8"}).wait(function() {
        var CinputSelect = $('.J_uyear'),
            JinputSelect = JQ('.J_uyear'),
            Jcalcnt = JinputSelect.nextAll('.J_carduntil');

        JinputSelect.regMod('calendar', '6.0', {
          options: {
            container: "#J_carduntil",
            showAlways: false,
            step: 1,
            showWeek: false
          },
          listeners: {
            // onBeforeShow: function(){
            //   console.log('回调不能选的日期')
            // },
            onChange: function(input, value) {
              var d = value.toDate();

            }
          }
        });
      });
    
    


});
