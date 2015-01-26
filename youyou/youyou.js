/**
 * @description: 游游助手脚本文件
 * @author jiang.f@ctrip.com
 * @time: 2015-01-24
 */

(function(window, undefined) {

  /**
   * 逻辑代码部分
   * 考虑到移植性,不采用任何js框架, 直接用原生js
   * GL 一些全局通用方法类库
   */
  var GL = {

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
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
      },

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
        };

        //创建 script 标签并加入到页面中
        var callbackName = ('jsonp' + new Date().getTime());
        var oHead = document.getElementsByTagName('head')[0];
        _options.data[_options.callback] = callbackName;
        var params = GL.formatParams(_options.data);
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
       * @param  {Object} _el     写入内容的元素
       * @param  {String} _string 要写入的内容
       * @return        [
       */
      append: function(_el, _string) {
        _el.appendChild(_string)
      },

      /**
       * 替换容器内容
       * @param  {[type]} _data [description]
       * @return {[type]}       [description]
       */
      html: function(_data) {
        this.innerHTML = _data
      },

      hide: function( _el ){
        _el.style.display = 'none'
      },

      show: function( _el ){
        _el.style.display = 'inline-block'
      },

      /**
       * 给元素绑定事件
       * @param  {Object}     _el         需要绑定事件的元素
       * @param  {String}     _type       事件类型
       * @param  {Function}   _callback   事件回调方法
       * @return
       */
      bind: function(_el, _type, _callback) {
        if (window.addEventListener) {
          _el.addEventListener(_type, _callback, false);
          return true;
        } else {
          // } else if(window.attachEvent) {
          var r = _el.attachEvent('on' + _type, _callback);
          return r;
        }
        //  else {
        //   this['on' + _type] = _callback;//DOM 0
        // }


        // if (window.attachEvent) {
        //   // ie
        //   this.attachEvent("on" + _type, function(_event) {
        //     _callback(_event)
        //   });
        // } else {
        //   // 非ie
        //   this.addEventListener(_type, function(_event) {
        //     _callback(_event)
        //   }, false);
        // }
      }


      // unbind: function(_el, _type, _fn) {
      //   if (window.removeEventListener) {
      //     _el.removeEventListener(_type, _fn, false);
      //     return true
      //   } else {
      //     var r = _el.detachEvent('on' + _type);
      //     return r
      //   }
      // }


    },

    /**
     * 业务代码部分
     */
    QA = function() {
      var self = this,

        // 请求计数器
        questionIndex = 1,

        // api接口
        url = '../data.php';

      /**
       * 提问显示模板
       * @return {[type]} [description]
       */
      this._quesCont = function(_index) {
        var content = document.createElement('div');
        content.setAttribute('id','chat' + _index);
        return content
        // return '<div id="chat' + _index + '">' +
        //   '<div class="vbk_client_box">' +
        //   '<span class="J_sing">发送中...</span>' +
        //   '<span class="J_serr" style="display:none">发送失败,请点击重新发送</span>' +
        //   '<p class="vbk_client_pass">'+ _question +'</p>' +
        //   '</div>' +
        //   '<p class="vbk_client_box">19:43</p>' +
        //   '</div>';
      };

      this._quesTpl = function(_question){
        return '<div class="vbk_client_box">' +
          '<span class="J_sing">发送中... </span>' +
          '<span class="J_serr" style="display:none">发送失败,请点击重新发送 </span>' +
          '<p class="vbk_client_pass">'+ _question +'</p>' +
          '</div>' +
          '<p class="vbk_client_box">19:43</p>' +
          '</div>';
      };

      /**
       * 发送按钮的样式
       * @param  {Boolean} _bool true:发送中;false:发送成功
       * @return
       */
      this._sending = function(_bool){
        if(_bool){
          GL.hide(GL.$('J_send'));
          GL.show(GL.$('J_sending'));
          GL.$('J_question').value = '';
        } else {
          GL.show(GL.$('J_send'));
          GL.hide(GL.$('J_sending'));
        }
      };

      /**
       * 发送异步请求
       * @param  {Object} _options  请求的参数
       * @return
       */
      this._sendData = function(_options) {
        GL.jsonp({
          url: url,
          callback: 'callback',
          data: {
            q: _options.question,
            index: questionIndex
          },
          success: function(_data) {
            console.log(_data);

            // TODO 发送按钮变亮,可再次提交提问
            self._sending(false);
            questionIndex++
          }
        })
      };

      /**
       * 显示用户的提问
       * @param  {String} _question  用户的提问
       * @return
       */
      this._showQuestion = function(_question) {
        var tpl = this._quesCont(questionIndex, _question);
        GL.append(GL.$('J_chatbox'), tpl);
        GL.$('chat' + questionIndex).innerHTML = this._quesTpl(_question);

        window.scrollTo(0,9999);
        // TODO 滚动到底部
        // console.log(window.outerHeight);
        // window.scrollTop = 99999;
      };

      /**
       * 特殊字符验证 $%&<>/\
       * @param  {String} _string  常用字符
       * @return {Boolean}         字符是否符合要求
       */
      this.checkString = function(_string) {
        if (_string === '') {
          alert('请输入您的问题');
          return false
        } else if (/[$%&<>\/\\]/.test(_string)) {
          alert('不能输入特殊字符');
          return false
        }
        return true
      };

      /**
       * 点击发送按钮后执行的操作
       * @return
       */
      this._sendEvent = function() {
        var tempQuestion = GL.$('J_question').value;
        if (self.checkString(tempQuestion)) {

          // 显示用户提问
          self._showQuestion(tempQuestion);

          // TODO 发送按钮变灰色,不能再次提交
          self._sending(true);

          // GL.$('J_send').
          // GL.unbind(GL.$('J_send'), 'click', self._sendEvent);
          // TODO 清空文本框内容

          // 发送提问给后端,请求数据
          self._sendData({
            question: tempQuestion
          });
        }
      };

      /**
       * 发送按钮绑定事件
       * @return {[type]} [description]
       */
      this._sendButton = function() {
        GL.bind(GL.$('J_send'), 'click', this._sendEvent)
      };

      this.init = function() {

        // 发送按钮绑定事件
        this._sendButton();
      };
    }

  new QA().init();


})(window);