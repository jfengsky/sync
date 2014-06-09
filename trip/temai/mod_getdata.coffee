# Description:
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34

define (require, exports, module) ->
  "use strict"
  $ = require 'jquery'
  page = require './mod_page'
  Page = new page()
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

  DEFAULTDATA = ->
    "type": 0
    "prdtype": "0"
    "startcity": null
    "dest": ""
    "mon": null
    "order": 0
    "pageCount": 10
    "page": 1
  ###
   * Tab切换
   * 重置筛选
   * 请求数据
  ###
  GetDatas = (_CountDown) ->
    self = this
    sendData = new DEFAULTDATA()

    # 所有可切换标签
    tabs = [
      '#J_tab span'
      '#J_type span'
      '#J_send span'
      '#J_sendtime span'
      '#J_arrived span'
      '#J_rank a'
    ]
    filters = tabs.slice(1, -1)
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
      '<li id="J_' + _data.prdid + '"><div class="product_pic"><a href="' + _data.prdUrl + '"><img src="' + _data.imgUrl + '" alt="' + _data.prdname + '"></a><div class="tag"><p class="tag_zyx">' + _data.prdtype + '</p><p class="discount"></p></div></div><div class="product_detial"><h3><a href="' + _data.prdUrl + '">' + _data.prdname + '</a></h3><div class="pro_txt"></div></div></li>'
    ###
     * 详细信息内容模板
    ###
    @_infoTpl = (_data) ->
      '<p>出行交通： 阿提哈德</p><p>入住酒店： 市区3星级、郊区4星级</p><p>出团日期： ' + _data.Desc + '</p><p class="date_txt" data-time="' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>￥</dfn>' + _data.marketPrice + '</del></p><a href="#" class="price_btn"><dfn>￥</dfn><span>' + _data.salePrice + '</span>起</a></div>'
    @_infoRend = (_data) ->
      data = _data
      if data.isSuccess and data.items
        $.each data.items, (_index, _item) ->
          cnt = $('#J_' + _item.prdid)
          ze = ((_item.salePrice / _item.marketPrice) * 10).toFixed(1) - 0
          cnt.find('.discount').html('<span>'+ ze + '</span>折')
          cnt.find('.pro_txt').html self._infoTpl(_item)
          return
        # 执行倒计时方法
        if _CountDown
          _CountDown.itemInit()

#      Page.init _data
      return
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
      # 请求后续数据
      infoData =
        "type": 5
        "prds": ids.join(',')
      self._getData infoData, self._infoRend

      # 翻页
      Page.init
        currentPage: sendData.page
        totalPage: sendData.pageCount

      return
    ###
     * 请求数据
    ###
    @_getData = (_data, _callback)->
      console.log _data
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
        if !$(this).hasClass 'cur'
          $.each tabs, (_index, _item) ->
            $(_item).removeClass 'cur'
            #$($(_item)[0]).addClass 'cur'
            return
          $.each filters, (_index, _item) ->
            $($(_item)[0]).addClass 'cur'
            return
          sendData = new DEFAULTDATA()
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
      $(_id).bind 'click', () ->
        if !$(this).hasClass 'cur'
          $(_id).removeClass 'cur'
          $(this).addClass 'cur'
          sendData[_value] = $(this).attr('data-tag')
          sendData.page = 1
          self._funcCheck ->
            _callback sendData,self._rend
            return
        return
      return
    ###
     * 页码切换
    ###
    @_pageChange = (_this)->
      tempSendData = sendData
      # 不可点击的翻页
#      if ($(_this).hasClass 'up_nocurrent') or ($(_this).hasClass 'down_nocurrent') or ($(_this).hasClass 'current')
#        return false
        # 点击上一页
#      else if $(_this).hasClass 'up'
      if $(_this).hasClass 'up'
        tempSendData.page = sendData.page - 1
        # 点击下一页
      else if $(_this).hasClass 'down'
        tempSendData.page = sendData.page + 1
      else
        tempSendData.page = $(_this).attr('data-tag') - 0
      return tempSendData
    ###
     * 初始化
    ###
    @init = ->
      # tab切换
      self._tabChange self._getData

      # 产品类型切换
      self._signalChange '#J_type span', 'prdtype', self._getData

      # 出发地切换
      self._signalChange '#J_send span', 'startcity', self._getData

      # 出发时间切换
      self._signalChange '#J_sendtime span', 'mon', self._getData

      # 目的地切换
      self._signalChange '#J_arrived span', 'dest', self._getData

      # 排序切换
      self._signalChange '#J_rank a', 'order', self._getData

      # 翻页
      $('#J_page').delegate 'a', 'click', ->
        if ($(this).hasClass 'up_nocurrent') or ($(this).hasClass 'down_nocurrent') or ($(this).hasClass 'current')
          return false
        else
          sendData = self._pageChange(this)
          self._getData sendData, self._rend
        return

      # 页码直接跳转
      $(document).delegate '#J_pagebtn', 'click', ->
        page = $('#J_turnpage').val() - 0
        sendData.page = page
        self._getData sendData, self._rend
        return
      return
    return

  module.exports = GetDatas
  return