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
      // var elements = new Array();
      // for (var i = 0; i < arguments.length; i++) {
      //   var element = arguments[i];
      //   if (typeof element == 'string')
      //     element = document.getElementById(element);
      //   if (arguments.length == 1)
      //     return element;
      //   elements.push(element);
      // }
      // return elements;
      return document.getElementById(_id)
    },

    /**
     * 获取id容器下的样式
     * @param  {String} _id id容器名
     * @param  {String} _el class容器
     * @return {Object} class容器
     */
    $Class: function(_id, _el) {
      var elements = document.getElementById(_id);
      return elements.getElementsByTagName(_el);
    },

    /**
     * 格式化参数
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    formatParams: function(data) {
      var arr = [];
      for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[i]));
      }
      return arr.join('&');
    }

    /**
     * 实现jsonp方法
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    /*
      调用方法
      jsonp({
        url:"http://www.xxx.com",
        callback:"callback",   //跟后台协商的接收回调名
        data:{id:"1000120"},
        success:function(json){
            alert("jsonp_ok");
        },
        fail:function(){
            alert("fail");
        },
        time:10000
      })
    */

      jsonp: function(_options) {
      _options = _options || {};
      if (!_options.url || !_options.callback) {
        throw new Error("参数不合法");
      }

      //创建 script 标签并加入到页面中
      var callbackName = ('jsonp_' + Math.random()).replace(".", "");
      var oHead = document.getElementsByTagName('head')[0];
      _options.data[_options.callback] = callbackName;
      var params = formatParams(_options.data);
      var oS = document.createElement('script');
      oHead.appendChild(oS);

      //创建jsonp回调函数
      window[callbackName] = function(json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        _options.success && _options.success(json);
      };

      //发送请求
      oS.src = _options.url + '?' + params;

      //超时处理
      if (_options.time) {
        oS.timer = setTimeout(function() {
          window[callbackName] = null;
          oHead.removeChild(oS);
          _options.fail && _options.fail({
            message: "超时"
          });
        }, time);
      }
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