/**
 * 预售脚本配置页面
 * @param  {[type]} require [description]
 * @return {[type]}         [description]
 */
define(function(require) {
  "use strict";
  var $ = require("jquery"),
      counttime = require('./yushou'),
      changeArea = require('./changeArea'),
      bookmark = require('./bookmark'),
      share = require('./share');
      

  // 预售倒计时
  new counttime().init();

  // 导航切换
  new changeArea().init();

  // 微博分享
  new share().init();


  // TODO 切换城市请求数据

  // 卖光浮层hover效果 TODO pad处理
  $('#J_main').delegate('li.end', 'mouseenter mouseleave', function(ev){
    var layer = $(this).find('.opacity');
    if(ev.type === 'mouseenter'){
      layer.show();
    };
    if(ev.type === 'mouseleave'){
      layer.hide();
    }
  });

  // 回到顶部
  $('#J_scrolltop').click(function() {
    $(window).scrollTop(0);
  });

  // 收藏
$('#J_fav,#J_favbottom').click(function () {
    try {
      window.external.addFavorite(document.location.href, document.title);
    } catch (e) {
      try {
        $(this).attr('title', document.title).attr('href', document.location.href);
        window.sidebar.addPanel(document.title, document.location.href, "");
      } catch (e) {
        if (navigator.userAgent.indexOf("Firefox") > -1) {
          return;
        } else {
          $(this).attr('href', 'javascript:;');
          alert("加入收藏失败，请使用Ctrl+D手工添加");
        }
      }
    };
  });


  // 邮件订阅功能
  new bookmark().init();
  
  /**
   * TODO 分享功能，详情页拿过来用
   */
})