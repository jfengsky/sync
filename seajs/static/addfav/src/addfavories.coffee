###
 * 加入收藏
 * @author: jiang.f@ctrip.com
 * @date: 2014-03-25
###
define (require, exports, module) ->
  $ = require('jquery')
  Addfav = () ->
    self = this
    @_main = (id, title, url) ->
      try
        window.external.addFavorite(url, title)
      catch e
        try
          $(id).attr('title', title)
          window.sidebar.addPanel(title, url, "")
        catch e
          if navigator.userAgent.indexOf("Firefox") > -1
            return
          else
            alert "加入收藏失败，请使用Ctrl+D手工添加"

      return
    ###
     * @param {String} id        容器id
     * @param {Object} options        (可选)配置参数,不写为收藏当前页面url和标题
     *        @param {String} title      (可选)收藏标题
     *        @param {String} url        (可选)收藏url
    ###
    @init = (id, options) ->
      title = document.title
      url = document.location.href
      if options
        title = options.title or title
        url = options.url or url
      self._main(id, title, url)
      return
    return


  module.exports = Addfav
  return