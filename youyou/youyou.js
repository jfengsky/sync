/**
 * @description: 游游助手脚本文件
 * @author jiang.f@ctrip.com
 * @time: 2015-01-24
 */

(function(window, undefined) {
  var $G = function(id) {
    return new _$(id);
  };

  function _$(id) {
    this.elements = document.getElementById(id);
  }

  _$.prototype = {
    constructor: _$,

    /**
     * 隐藏一个元素
     * @return {Object} 返回该元素
     */
    hide: function() {
      this.elements.style.display = 'none';
      return this
    },

    /**
     * 设置/获取表单的值
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    val: function(_data) {
      if (_data || _data === '') {
        this.elements.value = _data
      } else {
        return this.elements.value
      }
    },

    /**
     * 绑定事件
     * @param {String} _type  事件类型
     * @param {Function} _fn  事件回调
     */
    bind: function(_type, _fn) {
      if (document.addEventListener) {
        this.elements.addEventListener(_type, _fn, false)
      } else if (document.attachEvent) {
        this.elements.attachEvent('on' + _type, _fn)
      }
      return this
    }

  };

  /**
   * 业务代码部分
   */
  var QA = function() {
    var self = this,

      // 请求计数器
      questionIndex = 1,

      // api接口
      url = '../data1.php';

    /**
     * 显示用户的提问
     * @param  {String} _question  用户的提问
     * @return
     */
    this._showQuestion = function(_question) {
      var tpl = this._quesCont(questionIndex, _question);

      $G('J_chatbox').append(tpl);

      $G('chat' + questionIndex).html(this._quesTpl(_question, questionIndex));
      // GL.append(GL.$('J_chatbox'), tpl);
      // GL.$('chat' + questionIndex).innerHTML = this._quesTpl(_question, questionIndex);

      // 滚动到底部
      window.scrollTo(0, 9999);
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
      var tempQuestion = $G('J_question').val();
      if (self.checkString(tempQuestion)) {

        // 显示用户提问
        self._showQuestion(tempQuestion);

        //   // TODO 发送按钮变灰色,不能再次提交
        //   self._sending(true);

        //   // GL.$('J_send').
        //   // GL.unbind(GL.$('J_send'), 'click', self._sendEvent);
        //   // TODO 清空文本框内容

        //   // 发送提问给后端,请求数据
        //   self._sendData({
        //     question: tempQuestion
        //   });
      }
    };

    /**
     * 发送按钮绑定提交事件
     */
    this._sendButton = function() {

      $G('J_send').bind('click', this._sendEvent);

      // TODO 回车按钮也绑定提交事件
    };

    this.init = function() {

      // 发送按钮绑定事件
      this._sendButton();


    };
  };

  new QA().init();

})(window);



//(function(window, undefined) {
//
//  /**
//   * 逻辑代码部分
//   * 考虑到移植性,不采用任何js框架, 直接用原生js
//   * GL 一些全局通用方法类库
//   */
//
//  function _$(els) {
//    this.elements = []; //存放HTML元素
//    for (var i = 0, len = els.length; i < len; i++) {
//      var element = els[i];
//      if (typeof element === 'string') {
//        element = document.getElementById(element);
//      }
//      this.elements.push(element);
//    }
//  };
//
//
//
//  _$.prototype = {
//
//    /**
//     * 遍历数组
//     * @param  {Function} _fn 回调方法
//     * @return {Object} 返回该元素
//     */
//    each: function(_fn) {
//      for (var i = 0; i < this.elements.length; i++) {
//        _fn.call(this, this.elements[i]);
//      }
//      return this;
//    },
//
//    /**
//     * 设置样式
//     * @param {String} _key   样式属性
//     * @param {String} _value 样式的值
//     * @return {Object} 返回该元素
//     */
//    setStyle: function(_key, _value) {
//      this.each(function(el) {
//        el.style[_key] = _value;
//      });
//      return this;
//    },
//
//    /**
//     * 显示元素
//     * @return {Object} 返回该元素
//     */
//    show: function() {
//      var self = this;
//      this.each(function() {
//        self.setStyle('display', 'inline-block');
//      });
//      return this;
//    },
//
//    /**
//     * 隐藏元素
//     * @return {Object} 返回该元素
//     */
//    hide: function() {
//      var self = this;
//      this.each(function() {
//        self.setStyle('display', 'none');
//      });
//      return this;
//    },
//
//    /**
//     * 向容器子元素最后写入内容
//     * @param  {Object} _el 要写入的内容对象
//     * @return {Object} 返回该元素
//     */
//    append: function(_el) {
//      this.each(function(el){
//        el.appendChild(_el);
//      });
//      return this
//    },
//
//    /**
//     * 替换容器内容
//     * @param  {String} _string 要替换的内容
//     * @return {Object} 返回该元素
//     */
//    html: function(_string) {
//      this.each(function(_el){
//        _el.innerHTML = _string
//      });
//      return this
//    },
//
//    /**
//     * 获取/设置 表单的值
//     * @return {[type]} [description]
//     */
//    val: function(_data){
//      this.each(function(el){
//        if(typeof(_data) === 'string'){
//          el.value = _data
//        } else {
//          return el.value
//        }
//      })
//    },
//
//    /**
//     * 移除元素
//     * @return {Object} 返回该元素
//     */
//    remove: function() {
//      this.parentNode.removeChild(this);
//    },
//
//    /**
//     * 绑定事件
//     * @param {String} _type  事件类型
//     * @param {Function} _fn  事件回调
//     */
//    bind: function(_type, _fn) {
//      var addHandle = function(el) {
//        if (document.addEventListener) {
//          el.addEventListener(_type, _fn, false);
//        } else if (document.attachEvent) {
//          el.attachEvent('on' + _type, _fn);
//        }
//      };
//      this.each(function(el) {
//        addHandle(el);
//      });
//      return this;
//    },
//
//    /**
//     * 格式化参数, jsonp专用
//     * @param  {[type]} data [description]
//     * @return {[type]}      [description]
//     */
//    _formatParams: function(data) {
//      var arr = [];
//      for (var name in data) {
//        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
//      }
//      return arr.join('&');
//    },
//
//    /**
//     * 实现jsonp方法
//     * @param  {[type]} _options [description]
//     * @return {[type]}          [description]
//     */
//    /*
//      调用方法
//      jsonp({
//        url:"http://www.xxx.com",
//        callback:"callback",   //跟后台协商的接收回调名
//        data:{id:"1000120"},
//        success:function(json){
//            alert("jsonp_ok");
//        },
//        fail:function(){
//            alert("fail");
//        },
//        time:10000
//      })
//    */
//    jsonp: function(_options) {
//      _options = _options || {};
//      if (!_options.url || !_options.callback) {
//        throw new Error("参数不合法");
//      };
//
//      //创建 script 标签并加入到页面中
//      var callbackName = ('jsonp' + new Date().getTime());
//      var oHead = document.getElementsByTagName('head')[0];
//      _options.data[_options.callback] = callbackName;
//      var params = GL.formatParams(_options.data);
//      var oS = document.createElement('script');
//      oHead.appendChild(oS);
//
//      //创建jsonp回调函数
//      window[callbackName] = function(json) {
//        oHead.removeChild(oS);
//        clearTimeout(oS.timer);
//        window[callbackName] = null;
//        _options.success && _options.success(json);
//      };
//
//      //发送请求
//      oS.src = _options.url + '?' + params;
//
//      //超时处理
//      if (_options.timeout) {
//        oS.timer = setTimeout(function() {
//          window[callbackName] = null;
//          oHead.removeChild(oS);
//          _options.fail && _options.fail({
//            message: "超时"
//          });
//        }, _options.timeout);
//      }
//    }
//
//  };
//
//  var $G = function() {
//      return new _$(arguments);
//    },
//
//    /**
//     * 业务代码部分
//     */
//    QA = function() {
//      var self = this,
//
//        // 请求计数器
//        questionIndex = 1,
//
//        // api接口
//        url = '../data1.php';
//
//      /**
//       * 提问显示模板
//       * @return {[type]} [description]
//       */
//      this._quesCont = function(_index) {
//        var content = document.createElement('div');
//        content.setAttribute('id', 'chat' + _index);
//        return content
//          // return '<div id="chat' + _index + '">' +
//          //   '<div class="vbk_client_box">' +
//          //   '<span class="J_sing">发送中...</span>' +
//          //   '<span class="J_serr" style="display:none">发送失败,请点击重新发送</span>' +
//          //   '<p class="vbk_client_pass">'+ _question +'</p>' +
//          //   '</div>' +
//          //   '<p class="vbk_client_box">19:43</p>' +
//          //   '</div>';
//      };
//
//      this._quesTpl = function(_question, _index) {
//        return '<div class="vbk_client_box">' +
//          '<span class="J_sing" id="J_sing' + _index + '">发送中... </span>' +
//          '<span class="J_serr" id="J_serr' + _index + '" style="display:none">发送失败,请点击重新发送 </span>' +
//          '<p class="vbk_client_pass">' + _question + '</p>' +
//          '</div>' +
//          '<p class="vbk_client_box" id="J_stime' + _index + '"></p>' +
//          '</div>';
//      };
//
//      /**
//       * 发送按钮的样式
//       * @param  {Boolean} _bool true:发送中;false:发送成功
//       * @return
//       */
//      this._sending = function(_bool) {
//        if (_bool) {
//          GL.hide(GL.$('J_send'));
//          GL.show(GL.$('J_sending'));
//          GL.$('J_question').value = '';
//        } else {
//          GL.show(GL.$('J_send'));
//          GL.hide(GL.$('J_sending'));
//        }
//      };
//
//      /**
//       * 发送异步请求
//       * @param  {Object} _options  请求的参数
//       * @return
//       */
//      this._sendData = function(_options) {
//        GL.jsonp({
//          url: url,
//          callback: 'callback',
//          data: {
//            q: _options.question,
//            index: questionIndex
//          },
//          success: function(_data) {
//
//            var index = _data.index,
//              sendDate = new Date(_data.sendTime),
//              sendTime = sendDate.getHours() + ':' + sendDate.getMinutes() + ':' + sendDate.getSeconds();
//            console.log(_data);
//
//            console.log(sendTime);
//
//            // 移除发送中提示和错误提示
//            GL.remove('J_sing' + index);
//            GL.remove('J_serr' + index);
//
//            // 写入发送时间
//            GL.html(GL.$('J_stime' + index), sendTime);
//
//            // 发送按钮变亮,可再次提交提问
//            self._sending(false);
//
//
//            // 滚动到底部
//            window.scrollTo(0, 9999);
//
//            questionIndex++
//          },
//          fail: function() {
//            GL.show(GL.$('J_serr' + questionIndex));
//            console.log('fail');
//          },
//          timeout: 2000
//        })
//      };
//
//      /**
//       * 显示用户的提问
//       * @param  {String} _question  用户的提问
//       * @return
//       */
//      this._showQuestion = function(_question) {
//        var tpl = this._quesCont(questionIndex, _question);
//
//        $G('J_chatbox').append(tpl);
//
//        $G('chat' + questionIndex).html(this._quesTpl(_question, questionIndex));
//        // GL.append(GL.$('J_chatbox'), tpl);
//        // GL.$('chat' + questionIndex).innerHTML = this._quesTpl(_question, questionIndex);
//
//        // 滚动到底部
//        window.scrollTo(0, 9999);
//      };
//
//      /**
//       * 特殊字符验证 $%&<>/\
//       * @param  {String} _string  常用字符
//       * @return {Boolean}         字符是否符合要求
//       */
//      this.checkString = function(_string) {
//        if (_string === '') {
//          alert('请输入您的问题');
//          return false
//        } else if (/[$%&<>\/\\]/.test(_string)) {
//          alert('不能输入特殊字符');
//          return false
//        }
//        return true
//      };
//
//      /**
//       * 点击发送按钮后执行的操作
//       * @return
//       */
//      this._sendEvent = function() {
//        console.log($G('J_question'));
//        var tempQuestion = $G('J_question').val();
//        if (self.checkString(tempQuestion)) {
//
//          // 显示用户提问
//          self._showQuestion(tempQuestion);
//
//          // TODO 发送按钮变灰色,不能再次提交
//          self._sending(true);
//
//          // GL.$('J_send').
//          // GL.unbind(GL.$('J_send'), 'click', self._sendEvent);
//          // TODO 清空文本框内容
//
//          // 发送提问给后端,请求数据
//          self._sendData({
//            question: tempQuestion
//          });
//        }
//      };
//
//      /**
//       * 发送按钮绑定事件
//       * @return {[type]} [description]
//       */
//      this._sendButton = function() {
//        $G('J_send').bind('click', this._sendEvent);
//
//        // TODO 回车键绑定发送事件
//      };
//
//      this.init = function() {
//
//        // 发送按钮绑定事件
//        this._sendButton();
//      };
//    }
//
//  new QA().init();
//
//
//})(window);