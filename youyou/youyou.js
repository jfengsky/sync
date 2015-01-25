/**
 * @description: 游游助手脚本文件
 * @author jiang.f@ctrip.com
 * @time: 2015-01-24
 */

(function(window, undefined) {
  /**
   * 考虑到移植性,不采用任何js框架, 直接用原生js
   */
  var QA = {

    /**
     * 获取id容器
     * @param  {String} _id  id容器名
     * @return {Object} id容器对象
     */
    $: function(_id) {
      return document.getElementById(_id)
    },

    /**
     * 获取id容器下的样式
     * @param  {String} _id id容器名
     * @param  {String} _el class容器
     * @return {Object} class容器
     */
    $Class: function (_id, _el) {
      var elements = document.getElementById(_id);
      return elements.getElementsByTagName(_el);
    },

    /**
     * 实现jsonp方法
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    jsonp: function(_options) {

    },

    /**
     * 向容器最后写入内容
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    append: function(_el) {

    },

    /**
     * 替换容器内容
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    html: function(_data) {

    },

    bind: function() {

    }
  };

  // append
  // html

})(window);