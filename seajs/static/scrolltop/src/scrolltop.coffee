###
 * Description: 回到顶部
 * Author: jiangfeng(jiang.f @ctrip.com)
 * Date: 2014 - 03 - 26 14: 07
###

define (require, exports, module) ->
  "use strict"

  $ = require('jquery')
  ###
   * @param {String} id 按钮id
   * @param {JsonObj} options      配置参数
   *   @param {Boolean} motion     是否缓慢移动 默认为：false(直接跳到顶部)
   *   @param {Boolean} autohide   是否超过一个屏幕才显示按钮 默认为：false (一直显示回到顶部按钮)
  ###
  ScrollTop = (id, options) ->

  ScrollTop:: =
    _top: ->
      return

    init: (id, options)->
      $(document).delegate(id, 'click', ->
        $(window).scrollTop(0)
        return
      )
      return

  module.exports = ScrollTop

  return