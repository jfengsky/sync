# Description: 右侧跟随下拉滚动条模块
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34

define (require, exports, module) ->
  "use strict"
  $ = require 'jquery'
  RightScroll = ->
    self = this
    @init = ->
      rightBarTop = $('#J_sidebar').offset().top
      resizeTime = null
      $(window).bind 'scroll.right', ->
        if resizeTime
          clearTimeout resizeTime
        resizeTime = setTimeout ->
          if $(this).scrollTop() >= rightBarTop
            $('#J_sidebar').css('position', 'fixed')
          else
            $('#J_sidebar').css('position', 'absolute')
#          return
        , 100
#        return
#      return
    return
  module.exports = RightScroll
  return