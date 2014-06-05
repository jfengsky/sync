/**
 * Created by jiangfeng on 14-6-3.
 */
define(function (require) {
  "use strict";
  var countdown = require('./mod_timedown'),
      getData = require('./mod_getdata');

  // 页面倒计时
  new countdown().init();

  //
//  new getData().init();

  // TODO 翻页

});