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
   * predepartCity  出发城市     1 2 3
   * dest       目的地       1 2 3
   * mon        出发月份     1 2 3
   * order      排序方式    0:综合  1:价格从低到高  2:价格从高到低
   * pageCount  每页条数    10  20
   * page       显示页数    1 2 3
  ###

  DEFAULTDATA = ->
    "type": 0
    "prdtype": "0"
#    "startcity": null
    "predepartCity": null
    "dest": ""
    "mon": null
    "order": 0
#    "pageCount": 10
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
    filters = tabs.slice(1)
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
      if _data.prdtype == '自由行'
        htmlType = '<p class="tag_zyx">' + _data.prdtype + '</p>'
      else
        htmlType = '<p>' + _data.prdtype + '</p>'
      '<li id="J_' + _data.prdid + '" data-sp="' + _data.salePrice + '" data-src="' + _data.prdUrl + '"><div class="pro_res"><a href="' + _data.prdUrl + '" class="pro_border" target="_blank"></a><h3><a href="' + _data.prdUrl + '" title="' + _data.prdname + '" target="_blank">' + _data.prdname + '</a></h3></div><div class="product_pic"><a href="' + _data.prdUrl + '"><img src="' + _data.imgUrl + '" alt="' + _data.prdname + '"></a><div class="tag">' + htmlType + '<p class="discount"></p></div></div><div class="product_detial"><div class="pro_txt"></div></div></li>'

    ###
     * 详细信息内容模板
    ###
    @_infoTpl = (_data, _salePrice, _href) ->
      qi = '起'
      if _salePrice.length >=5
        qi = ''
      '<div class="txt_overhidden">' + _data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span class="price_btn"><dfn>&yen;</dfn><span>' + _salePrice + '</span>' + qi + '</span></div>'
    @_infoPriceTpl = (_data, _href) ->
      '<div class="txt_overhidden">' +_data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span class="price_btn time_btn">实时计价</span></div>'
    @_infoRend = (_data) ->
      data = _data
      if data.isSuccess and data.items
        $.each data.items, (_index, _item) ->
          cnt = $('#J_' + _item.prdid)
          salePrice = cnt.attr('data-sp') - 0
          ze = ((salePrice / _item.marketPrice) * 10).toFixed(1) - 0
          itemHref = cnt.attr('data-src')
#          if _item.marketPrice <= 0
          if salePrice <= 0
            cnt.find('.discount').hide().html('')
            cnt.find('.pro_txt').html self._infoPriceTpl(_item, itemHref)
          else
            if ze <= 10 && ze > 0
              cnt.find('.discount').html('<span>'+ ze + '</span>折')
            else
              cnt.find('.discount').hide()
            cnt.find('.pro_txt').html self._infoTpl(_item, salePrice, itemHref)
          cnt.find('.right_btn').show()
          cnt.find('.tag').show()
          return

        # TODO 清除之前商品的计时器
        # 执行倒计时方法
        if _CountDown
          _CountDown.itemInit(data.serverTime)

#      Page.init _data
      return

    ###
     * 筛选模板
    ###
    @_filterTpl = (_data) ->
      '<span data-tag="' + _data.k + '">' + _data.v + '</span>'

    ###
     * 写入筛选模板
    ###
    @_filterRend = (_id, _data) ->
      html = '<span class="cur" data-tag="all">全部</span>'
      if _data
        $.each _data, (_index, _item) ->
          html += self._filterTpl _item
          return
      $(_id).html html

      return

    ###
     * 请求产品详细数据
    ###
    @_getItemInfo = (_ids)->
      infoData =
        "type": 5
        "prds": _ids.join(',')
      self._getData infoData, self._infoRend
      return

    ###
      渲染模板
    ###
    @_rend = (_data, _bool) ->
      data = _data
      html = ''
      ids = []
      if data.isSuccess and data.items
        if data.items.length > 0

          $.each data.items, (_index, _item) ->
            html += self._cntTpl _item
            ids.push _item.prdid
            return

          $('#J_cnt').html html
          $('#J_proempty').hide()
          $('#J_prolist').show()
          # 请求后续数据
          self._getItemInfo ids
#          infoData =
#            "type": 5
#            "prds": ids.join(',')
#          self._getData infoData, self._infoRend
          # 翻页
          Page.init
            currentPage: _data.currentPage
            totalPage: _data.totalPage
        else
          $('#J_proempty').show()
          $('#J_prolist').hide()

        # 填充筛选条件
        if _bool
          # 更新出发地筛选
          self._filterRend '#J_send dd', data.filter_startcity

          # 更新出发出发时间筛选
          self._filterRend '#J_sendtime dd', data.filter_mon

          # 更新目的地筛选
          self._filterRend '#J_arrived dd', data.filter_dest
      return
    ###
     * 请求数据
    ###
    @_getData = (_data, _callback, _bool)->
      # console.log _data
      $.ajax
        url: "/Package-Booking-VacationsOnlineSiteUI/Handler2/DealsHandler.ashx"
#        url: "../Handler2/DealsHandler.ashx"
#        url: 'data.json'
        type: "post"
        data: _data
#        cache: false
        dataType: "json"
        success: (_backData)->
          self._funcCheck ->
            _callback _backData, _bool
            return
          return
      return

    ###
     * tab筛选
    ###
#    @_tabChange = (_callback) ->
#      topTabs = $('#J_tab a span')
#      tempType = null
#      $.each topTabs, (_index, _item) ->
#        if $(this).hasClass('cur')
#          tempType = $(this).attr('data-tag') - 0
#        return
#      sendData = new DEFAULTDATA()
#      sendData['type'] = tempType
#      self._funcCheck ->
#        _callback sendData,self._rend, true
#        return

#      $('#J_tab span').bind 'click', () ->
#        if !$(this).hasClass 'cur'
#
#          $.each tabs, (_index, _item) ->
#            $(_item).removeClass 'cur'
#            #$($(_item)[0]).addClass 'cur'
#            return
#
#          $.each filters, (_index, _item) ->
#            $($(_item)[0]).addClass 'cur'
#            return
#          sendData = new DEFAULTDATA()
#          $(this).addClass 'cur'
#          sendData['type'] = $(this).attr('data-tag') - 0
#          self._funcCheck ->
#            _callback sendData,self._rend, true
#            return
#        return
#      return
    ###
     * 清除单个设置
    ###
    @_signalChange = (_id, _target, _value, _callback) ->
      $(_id).delegate _target, 'click', () ->
#      $(_id).bind 'click', () ->
        if !$(this).hasClass 'cur'
          $(_id + ' ' + _target).removeClass 'cur'
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
     * 首次请求数据
    ###
    @_firstGetIds = ->
      ids = []
      type = 0
      if $('#J_cnt li').length > 0
        $.each $('#J_cnt li'), (_index, _item) ->
          ids.push $(_item).attr('id').slice(2) - 0
          $(_item).attr 'data-sp', $(_item).find('.price_btn span').text()
#          $(_item).attr 'data-src', $(_item).find('span.price_btn').attr('href')
          return
        self._getItemInfo ids
      $.each $('#J_tab span'), (_index, _item) ->
        if $(_item).hasClass('cur')
          type = $(_item).attr('data-tag') - 0
        return
      sendData.type = type
      return
    ###
     * 初始化
    ###
    @init = ->
      #第1次进入页面需要立即请求数据
      self._firstGetIds()
      # tab切换
      #self._tabChange self._getData

      # 产品类型切换
      self._signalChange '#J_type', 'span', 'prdtype', self._getData

      # 出发地切换
      self._signalChange '#J_send', 'span', 'predepartCity', self._getData

      # 出发时间切换
      self._signalChange '#J_sendtime', 'span', 'mon', self._getData

      # 目的地切换
      self._signalChange '#J_arrived', 'span', 'dest', self._getData

      # 排序切换
      self._signalChange '#J_rank', 'a', 'order', self._getData

      # 翻页
      $('#J_page').delegate 'a', 'click', ->
        if ($(this).hasClass 'up_nocurrent') or ($(this).hasClass 'down_nocurrent') or ($(this).hasClass 'current')
          return false
        else
          sendData = self._pageChange(this)
          self._getData sendData, self._rend
        $(window).scrollTop(0)
        return

      # 页码直接跳转
      $(document).delegate '#J_pagebtn', 'click', ->
        page = $('#J_turnpage').val() - 0
        if !page || page <= 0 || page > ($('#J_page').attr('pagenum') - 0) || $('#J_turnpage').val() == ''
          if $('#J_page .J_pageErr').length <= 0
            $('#J_page').css('position','relative').append('<span class="J_pageErr" style ="position:absolute;left:50%;top:60px;color:#f00">请输入正确的页码</span>')
            setTimeout ->
              $('#J_page .J_pageErr').remove()
              return
            ,1000
        else
          sendData.page = page
          self._getData sendData, self._rend
        $(window).scrollTop(0)
        return

      # 初始化翻页
      Page.init
        currentPage: 1
        totalPage: $('#J_page').attr('pagenum') - 0
#        callback: self
      return
    return

  module.exports = GetDatas
  return