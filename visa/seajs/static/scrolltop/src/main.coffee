###
 * Description:
 * Author: jiangfeng(jiang.f @ctrip.com)
 * Date: 2014 - 03 - 26 14: 07
###
define (require) ->
  "use strict"
  scrolltop = require('./scrolltop')

  toTop = new scrolltop();
  ###
   * 默认直接回到顶部
  ###
  toTop.init('#J_scrolltop',{
    motion: false
  });

  ###
   * 缓动回到顶部
  ###
  toTop.init('#J_scrollmotion',{
    motion: true
  })

  ###
   * 缓动回到顶部
   * 滚动条高度不满一屏自动隐藏
  ###
  toTop.init('#J_scrollhide',{
    motion: true,
    autohide: true
  })

  return