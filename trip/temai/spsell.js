/**
 * Created by jiangfeng on 14-6-3.
 */
define(function (require) {
  "use strict";
  var countdown = require('./mod_timedown'),
      getData = require('./mod_getdata'),
      CD = new countdown();

  // 顶部倒计时
  CD.topInit();
  CD.itemInit();

  //
  new getData(CD).init();



});