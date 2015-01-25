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
     * [$ description]
     * @param  {[type]} _id [description]
     * @return {[type]}     [description]
     */
    $: function(_id) {
      return document.getElementById(_id)
    },

    /**
     * [$Class description]
     * @param  {[type]} id [description]
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
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
     * [append description]
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    append: function(_data) {

    },

    /**
     * [html description]
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