/**
 * Created by jiangfeng on 14-6-3.
 */
define(function (require) {
  "use strict";
  var countdown = require('./mod_timedown'),
      getData = require('./mod_getdata'),
      rightScroll = require('./mod_right'),
      CD = new countdown();

  // 顶部倒计时
  CD.topInit();
  CD.itemInit();

  //
  new getData(CD).init();

  // 右侧滚动条悬浮显示
  new rightScroll().init();

});