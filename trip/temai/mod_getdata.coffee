# Description:
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34

define (require, exports, module) ->
  "use strict"
  $ = require 'jquery'
  ###
   * type 0:    全部特卖      1:限时秒杀 2:提前预售 3:专场 4:爆款
   **** type等于4，5时下面不用传
   * prdtype    产品类型     grouptravel:跟团 freetravel:自由行
   * startcity  出发城市     1 2 3
   * dest       目的地       1 2 3
   * mon        出发月份     1 2 3
   * order      排序方式    0:综合  1:价格从低到高  2:价格从高到低
   * pageCount  每页条数    10  20
   * page       显示页数    1 2 3
  ###
#  DEFAULTDATA =
#    "type": 0
#    "prdtype": "0"
#    "startcity": null
#    "dest": ""
#    "mon": null
#    "order": 0
#    "pageCount": 10
#    "page": 1
  ###
   * Tab切换
   * 重置筛选
   * 请求数据
  ###
  GetDatas = ->
    self = this
    sendData =
      "type": 0
      "prdtype": "0"
      "startcity": null
      "dest": ""
      "mon": null
      "order": 0
      "pageCount": 10
      "page": 1
    ###
     * function check
    ###
    @_funcCheck = (_fn) ->
      if typeof _fn is "function"
        _fn()
      return
    ###
     * 内容初步模板
    ###
    @_cntTpl = (_data) ->
      '<li id="J_' + _data.prdid + '"><div class="product_pic"><a href="./tmh_files/tmh.htm?id="' + _data.prdid + '><img src="' + _data.imgUrl + '" alt="' + _data.prdname + '"></a><div class="tag"><p class="tag_zyx">' + _data.prdtype + '</p><p class="discount"></p></div></div><div class="product_detial"><h3><a href="./tmh_files/tmh.htm?id="' + _data.prdid + '>' + _data.prdname + '</a></h3><div class="pro_txt"></div></div></li>'
    ###
      渲染模板
    ###
    @_rend = (_data) ->
      data = _data
      html = ''
      ids = []
      if data.isSuccess and data.items
        $.each data.items, (_index, _item) ->
          html += self._cntTpl _item
          ids.push _item.prdid
          return
      $('#J_cnt').html html
      # TODO 请求后续数据
      #console.log ids
      return
    ###
     * 请求数据
    ###
    @_getData = (_data, _callback)->
#      console.log(_data);
#      console.log('----');
      $.ajax
#        url: "../package-Booking-VacationsOnlineSiteUI/Handler2/DealsHandler.ashx"
        url: 'data.json'
        type: "post"
        data: _data
        dataType: "json"
        success: (_backData)->
          self._funcCheck ->
            _callback _backData
            return
          return
      return
    ###
     * tab筛选
    ###
    @_tabChange = (_callback) ->
      $('#J_tab span').bind 'click', () ->
        console.log DEFAULTDATA
        tabs = [
          '#J_tab span'
          '#J_type span'
          '#J_sendtime span'
          '#J_arrived span'
          '#J_rank a'
          ]
        if !$(this).hasClass 'cur'
          $.each tabs, (_index, _item) ->
            $(_item).removeClass 'cur'
            #$($(_item)[0]).addClass 'cur'
            return
          tabs.splice(0,1)
          $.each tabs, (_index, _item) ->
            $($(_item)[0]).addClass 'cur'
            return
          sendData =
            "type": 0
            "prdtype": "0"
            "startcity": null
            "dest": ""
            "mon": null
            "order": 0
            "pageCount": 10
            "page": 1
          $(this).addClass 'cur'
          sendData['type'] = $(this).attr('data-tag')
          self._funcCheck ->
            _callback sendData,self._rend
            return
        return
      return
    ###
     * 清除单个设置
    ###
    @_signalChange = (_id, _value, _callback) ->
      $(_id).bind 'click', (ev) ->
        if !$(this).hasClass 'cur'
          $(_id).removeClass 'cur'
          $(this).addClass 'cur'
          sendData[_value] = $(this).attr('data-tag')
          self._funcCheck ->
            _callback sendData,self._rend
            return
        return
      return
    ###
     * 初始化
    ###
    @init = ->
      # tab切换
      self._tabChange self._getData

      # 产品类型切换
      self._signalChange '#J_type span', 'prdtype', ->
        console.log(222)
        return
      return
    return

  new GetDatas().init()
  #module.exports = fn
  return