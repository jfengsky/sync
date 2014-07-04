/**
 * 详情页新增配送等操作
 * TODO  pad兼容
 *   1. 是否弹出修改订单层，需开发给个参数
 *     a). 弹层某些订单内容是disabled状态，默认选中第一个可修改的订单内容项
 *   2. 预约配送按钮是否显示
 *     a). 点击预约配送按钮，配送内容变成可编辑字段，配送城市只能是上海，地区需要一个接口或者常量字段，地址显示之前保存过的地址
 *     b). 配送时段问题
 */
define(function(require, exports, module) {
  "use strict";
  var JQ = require('jquery');


  function Peisong(area) {
    var self = this,
      weekSend = true, // 周末是否配送
      psMessage = {
        weekend: '该地区周末不配送',
        nosend: '该地区不配送'
      },
      data = [{
        area: '浦东新区',
        areaid: 30,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '奉贤、南汇、浦东机场不配送',
          bak: '(只适用于陆家嘴、金桥、张江、三林、塘桥)'
        }
      }, {
        area: '松江区',
        areaid: 29,
        info: {
          am: '',
          pm: '13:30-17:00',
          weekend: false,
          message: '辰塔路、闵塔公路以外不配送',
          bak: '不配送'
        }
      }, {
        area: '青浦区',
        areaid: 33,
        info: {
          am: '',
          pm: '13:30-17:00',
          weekend: false,
          message: '沪青平公路、漕盈路、北青公路以外不配送',
          bak: '不配送'
        }
      }, {
        area: '嘉定区',
        areaid: 27,
        info: {
          am: '不配送',
          pm: '13:30-17:00',
          weekend: false,
          message: '外青松公路、沪宜公路、环城路、嘉罗公路以外不配送',
          bak: ''
        }
      }, {
        area: '宝山区',
        areaid: 28,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '月罗公路以外不配送',
          bak: '（中环线以外不适用）'
        }
      }, {
        area: '长宁区',
        areaid: 17,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '虹桥机场范围不配送',
          bak: ''
        }
      }, {
        area: '黄浦区',
        areaid: 25,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '静安区',
        areaid: 23,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '奉贤区',
        areaid: 32,
        info: {
          am: '',
          pm: '',
          weekend: false,
          message: '不配送',
          bak: ''
        }
      },{
        area: '南汇区',
        areaid: 31,
        info: {
          am: '',
          pm: '',
          weekend: false,
          message: '不配送',
          bak: ''
        }
      }, {
        area: '徐汇区',
        areaid: 22,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '普陀区',
        areaid: 18,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '虹口区',
        areaid: 21,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '杨浦区',
        areaid: 19,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '闸北区',
        areaid: 20,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: ''
        }
      }, {
        area: '闵行区',
        areaid: 26,
        info: {
          am: '9:30-12:00',
          pm: '13:30-17:00',
          weekend: true,
          message: '',
          bak: '（外环以外不适用）'
        }
      }, {
        area: '崇明县',
        areaid: 35,
        info: {
          am: '',
          pm: '',
          weekend: false,
          message: '不配送',
          bak: ''
        }
      }, {
        area: '金山区',
        areaid: 34,
        info: {
          am: '',
          pm: '',
          weekend: false,
          message: '不配送',
          bak: ''
        }
      }];

    /**
     * 重新选择区域初始化时间和提示
     * @return
     */
    this._clear = function() {
      JQ('#J_time').val('');
      JQ('#J_pstime').val('');
      JQ('#J_order_deliverytip').text('');
      JQ(document).undelegate('#J_pstime', 'focus');
    };

    /**
     * 无法配送初始化
     * @return
     */
    this._disabled = function(bool) {
      JQ('#J_dispatchaddress').attr('disabled', bool);
      JQ('#J_time').attr('disabled', bool);
      JQ('#J_pstime').attr('disabled', bool);
    };

    this.init = function(area) {
      self._clear();
      if (area === 35 || area === 34 || area === 31 || area === 32) {
        self._disabled(true);
        $('#J_order_deliverytip').text(psMessage.nosend).css('color', '#f00');
        return false;
      } else {
        self._disabled(false);
        for (var i = 0, dataLength = data.length; i < dataLength; i++) {
          if (data[i].areaid === area) {
            weekSend = data[i].info.weekend;

            // 配送消息
            if (data[i].info.message) {
              JQ('#J_message').text(data[i].info.message).show();
            } else {
              JQ('#J_message').hide();
            };

            // 写入配送时间
            if (data[i].info.am) {
              JQ('#J_am').text(data[i].info.am).closest('li').show();
              JQ('#J_em').text(data[i].info.bak);
            } else {
              JQ('#J_am').closest('li').hide();
            };
            if (data[i].info.pm) {
              JQ('#J_pm').text(data[i].info.pm).closest('li').show();
            } else {
              JQ('#J_pm').closest('li').hide();
            };
          }
        }
      }

    }
    JQ(document).ready(function() {
      var amSecond = 34200000, // 上午毫秒数 9:30     9.5 * 60 * 60 * 1000
        pmSecond = 48600000, // 下午毫秒数 13:30   13.5 * 60 * 60 * 1000
        hours24 = 86400000; // 24小时毫秒数      24* 60 * 60 * 1000

      function _cantDelivery(_deliveTimerror){
        JQ('#J_order_deliverytip').text('只能预约24小时后的配送').css('color', '#f00');
        _deliveTimerror.val(false);
      };

      function _cDelivery(_deliveTimerror){
        JQ('#J_pstime').val('').attr('disabled', false);
        _deliveTimerror.val(true);
      };

      function _deliverCheck(_selectTime, _serverTime, _deliveTimerror) {
        
        JQ('#J_search_zipcode a').bind('click', function() {
          JQ('#J_order_deliverytip').text('');
          if ($(this).attr('id') === 'J_am') { // 选择上午
            if (_serverTime < _selectTime - hours24 + amSecond) {
              _cDelivery(_deliveTimerror)
            } else {
              _cantDelivery(_deliveTimerror)
            }
          } else {
            if (_serverTime < _selectTime - hours24 + pmSecond) {
              _cDelivery(_deliveTimerror)
            } else {
              _cantDelivery(_deliveTimerror)
            }
          }

        })
      };

      $LAB.script({src:'http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js', charset:"utf-8"}).wait(function() {
        $('#J_time').regMod('calendar', '6.0', {
          options: {
            container: "#c_container",
            showAlways: false,
            step: 1,
            showWeek: false
          },
          // festival:{
          //   '2014-04-20': ['c_chuxi', '除夕']
          // },
          listeners: {
            // onBeforeShow: function(){
            //   console.log('回调不能选的日期')
            // },
            onChange: function(input, value) {
              var d = value.toDate(),
                deliveTimerror = JQ('#J_detimerr'),
                psTimePop = true,
                tempTime = GV.app.detail.data.TotalMilliseconds.split('-'), // 服务器时间
                selectMs = new Date(d).getTime(),
                serverMs = new Date(tempTime[0], (tempTime[1] - 1), tempTime[2], tempTime[3], tempTime[4], tempTime[5], tempTime[6]).getTime();

              JQ('#J_search_zipcode a').unbind('click');
              if (!weekSend && (new Date(d).getDay() === 0 || new Date(d).getDay() === 6)) {
                JQ('#J_order_deliverytip').text(psMessage.weekend).css('color', '#f00').show();
                JQ('#J_pstime').val('').attr('disabled', true);
                psTimePop = false;
              } else {
                JQ('#J_order_deliverytip').text('');
                psTimePop = true;
              };

              if (selectMs <= serverMs) {
                psTimePop = false;
                _cantDelivery(deliveTimerror)
              } else if (selectMs - serverMs >= hours24) {
                _cDelivery(deliveTimerror)
              } else {
                // 验证24小时内的操作
                JQ('#J_pstime').val('').attr('disabled', false);
                _deliverCheck(selectMs, serverMs, deliveTimerror);
              }



              JQ(document).undelegate('#J_pstime', 'focus');
              JQ(document).delegate('#J_pstime', 'focus', function() {
                if (psTimePop) {
                  JQ('#J_search_zipcode').show();
                }
              });
            }
          }
        });
      });
    });
  };

  module.exports = Peisong;
});