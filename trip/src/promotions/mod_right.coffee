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
      # 右侧高度
      rightHeight = $('#J_sidebar').height()

      # 页面高度
      docHeight = $(document).height()
      resizeTime = null
      hasBottom = true
      $(window).bind 'scroll.right', ->
        if docHeight > 1200
          if $(this).scrollTop() >= rightBarTop
            if ($(this).scrollTop() + rightHeight) + 200 >= docHeight

              if hasBottom
                $('#J_sidebar').css
                  'position': 'absolute'
                  'top': $('#J_sidebar').offset().top - 522
                hasBottom = false
            else
              $('#J_sidebar').css
                'position':'fixed'
                'top': 0
              hasBottom = true
          else
            $('#J_sidebar').removeAttr('style')
            hasBottom = true
#        if resizeTime
#          clearTimeout resizeTime
#        resizeTime = setTimeout ->
#          if $(this).scrollTop() >= rightBarTop
#            $('#J_sidebar').css('position', 'fixed')
#          else
#            $('#J_sidebar').css('position', 'absolute')
#          return
#        , 100
        return
      return
    return
  module.exports = RightScroll
  return