###
 * Description: 回到顶部
 * Author: jiangfeng(jiang.f @ctrip.com)
 * Date: 2014 - 03 - 26 14: 07
###

define (require, exports, module) ->
  "use strict"

  $ = require('jquery')

  ScrollTop = () ->

  ScrollTop:: =
    ###
     * 滚动条判断，是否显示按钮
    ###
    _scroll: (id)->
      $(window).on('scroll', ->
        if $(window).scrollTop() > $(window).height()
          $(id).show()
        else
          $(id).hide()
        return
      )
      return

    ###
     * @param {String} id 按钮id
     * @param {JsonObj} options      配置参数
     *   @param {Boolean} motion     是否缓慢移动 默认为：false(直接跳到顶部)
     *   @param {Boolean} autohide   是否超过一个屏幕才显示按钮 默认为：false (一直显示回到顶部按钮)
    ###
    init: (id, options) ->
      if !options or options.autohide
        this._scroll(id);
      $(document).delegate(id, 'click', ->
        if not options or not options.motion
          $('html,body').scrollTop(0)
        else
          $('html,body').animate({
            scrollTop: 0
          },200)
        return
      )
      return

  module.exports = ScrollTop

  return