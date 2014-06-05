# Description:
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34
define (require, exports, module) ->
  "use strict"
  $ = require 'jquery'


  ###
   * Tab切换
   * 重置筛选
   * 请求数据
  ###
  TabChange = ->
    self = this
    @_clear = ->
      $('#J_tab span').removeClass 'cur'
      return
    @init = ->
      $('#J_tab').delegate 'span', 'click', (ev)->
        self._clear()
        $(ev.target).addClass 'cur'
        return
      return
    return

  new TabChange().init()
  #module.exports = fn
  return