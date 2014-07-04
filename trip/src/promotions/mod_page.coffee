# Description:
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34

# 只有1页不显示翻页
# 第一页不显示向前
# 最后一页不显示向后
# 大于5页显示...

define (require, exports, module) ->
  "use strict"
  $ = require 'jquery'

  Page = ->
    self = this
    ###
     * 每个页码显示逻辑
     * @param {Number}  _page     当前页码
     * @param {Boolean} _current  是否高亮
    ###
    @_sigPage = (_page, _current) ->
      html = '<a href="javascript:void(0)" data-tag="' + _page + '">' + _page + '</a>'
      if _current
        html = '<a href="javascript:void(0)" class="current" data-tag="' + _page + '">' + _page + '</a>'
      html
    ###
     * 省略号
    ###
    @_morePage = '<span class="pkg_page_ellipsis">...</span>';
    ###
     * 页码直接跳转
    ###
    @_tplGoto = '<span class="pkg_pagevalue">到<input type="text" class="pkg_page_num" name="" id="J_turnpage" value="">页<input type="button" class="pkg_page_submit" value="确定" id="J_pagebtn" name=""></span>'
    ###
     * 页面中间处理
    ###
    @_tplPage = (_data) ->
      html = ''
      # 总页码<=6 并且当前页码 <=6 显示 1～6
      if _data.totalPage <= 6 && _data.currentPage <= 6
        for i in [1.._data.totalPage]
          if i is _data.currentPage
            html += self._sigPage(i, true)
#            html += '<a href="javascript:void(0)" class="current">' + i + '</a>'
          else
            html += self._sigPage(i)
#            html += '<a href="javascript:void(0)">' + i + '</a>'
      # 总页码 >6 并且当前页码 <=6 显示 1~6 ... 最后页
      # TODO 总页码 > 6 并且当页码 < 4
      else if _data.totalPage > 6 && _data.currentPage <= 6
        for i in [1..i+5]
          if i is _data.currentPage
            html += self._sigPage(i, true)
#            html += '<a href="javascript:void(0)" class="current">' + i + '</a>'
          else
            html += self._sigPage(i)
#            html += '<a href="javascript:void(0)">' + i + '</a>'
        html += self._morePage
        html += self._sigPage(_data.totalPage)
#        html += '<a href="javascript:void(0)">' + _data.totalPage + '</a>'
      # 总页码 >6 并且当前页码 > 6 并且 当前页< 总页码-2 显示 前面2个页码 当前高亮页码 后面2个页码 ... 最后页
      else if _data.totalPage > 6 and _data.currentPage > 6 and _data.currentPage < (_data.totalPage - 2)
        html += self._sigPage(1)
#        html += '<a href="javascript:void(0)">1</a>'
        html += self._morePage
        for i in [(_data.currentPage - 2).._data.currentPage]
          if i is _data.currentPage
            html += self._sigPage(i, true)
#            html += '<a href="javascript:void(0)" class="current">' + i + '</a>'
          else
            html += self._sigPage(i)
#            html += '<a href="javascript:void(0)">' + i + '</a>'
        for i in [(_data.currentPage + 1)..(_data.currentPage + 2)]
          html += self._sigPage(i)
#          html += '<a href="javascript:void(0)">' + i + '</a>'
        html += self._morePage
        html += self._sigPage(_data.totalPage)
#        html += '<a href="javascript:void(0)">' + _data.totalPage + '</a>'
      else if _data.totalPage > 6 and _data.currentPage > 6 and _data.currentPage >= (_data.totalPage - 2)
        html += self._sigPage(1)
#        html += '<a href="javascript:void(0)">1</a>'
        html += self._morePage
        for i in [(_data.currentPage - 2).._data.currentPage]
          if i is _data.currentPage
            html += self._sigPage(i, true)
#            html += '<a href="javascript:void(0)" class="current">' + i + '</a>'
          else
            html += self._sigPage(i)
#            html += '<a href="javascript:void(0)">' + i + '</a>'
        if _data.totalPage != _data.currentPage
          for i in [(_data.currentPage + 1).._data.totalPage]
            html += self._sigPage(i)
#            html += '<a href="javascript:void(0)">' + i + '</a>'
#        html += '<a href="javascript:void(0)">' + _data.totalPage + '</a>'
      html
    @_tpl = (_data)->
      $('#J_page').show()
      html = '<div class="pkg_page basefix">';

      # 只1页不用显示翻页
#      if _data.currentPage <= 1 and _data.totalPage <= 1
      if _data.totalPage <= 1
        $('#J_page').hide()
        return
        #html += '<a href="javascript:void(0)" class="up"><b></b></a>'

      # 第1页 总页码 > 1
      else if _data.currentPage is 1 and _data.totalPage > 1
        html += '<a href="javascript:void(0)" class="up up_nocurrent"><b></b></a>'
        html += self._tplPage _data
        html += '<a href="javascript:void(0)" class="down">下一页<b></b></a>'
        html += self._tplGoto
      # 最后一页
      else if _data.currentPage is _data.totalPage
        html += '<a href="javascript:void(0)" class="up"><b></b></a>'
        html += self._tplPage _data
        html += '<a href="javascript:void(0)" class="down down_nocurrent">下一页<b></b></a>'
        html += self._tplGoto
      # 其它页码
      else if _data.currentPage > 1
        html += '<a href="javascript:void(0)" class="up"><b></b></a>'
        html += self._tplPage _data
        html += '<a href="javascript:void(0)" class="down">下一页<b></b></a>'
        html += self._tplGoto
      html += '</div>'


    @init = (_data) ->
      $('#J_page').html self._tpl _data

      # 页面跳转到顶部
#      $(window).scrollTop($('#J_tab').offset().top);
#      $(window).scrollTop(0);
#      $(document).undelegate '#J_pagebtn', 'click'
#      $(document).delegate '#J_pagebtn', 'click', ->
#        toPage = $('#J_turnpage').val() - 0
#        if (toPage > _data.totalPage || toPage <= 0) && !$.isNumeric(toPage)
#          $('#J_turnpage').css
#            'border-color': '#f00'
#          return false
#        else
#          _data.callback._getData toPage, _data.callback._rend
#        return
    return
  module.exports = Page
  return