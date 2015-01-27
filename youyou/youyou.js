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
    if (typeof(id) === 'string') {
      this.elements = document.getElementById(id);
    } else if (typeof(id) === 'object') {
      this.elements = id
    }
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
     * 显示一个元素
     * @return {Object} 返回该元素
     */
    show: function() {
      this.elements.style.display = 'inline-block';
      return this
    },

    /**
     * 移除一个元素
     * @return {[type]} [description]
     */
    remove: function() {
      this.elements.parentNode.removeChild(this.elements);
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
     * 向容器子元素最后写入内容
     * @param  {Object} _el 要写入的内容对象
     * @return {Object} 返回该元素
     */
    append: function(_el) {
      this.elements.appendChild(_el);
      return this
    },

    /**
     * 替换容器内容
     * @param  {String} _string 要替换的内容
     * @return {Object} 返回该元素
     */
    html: function(_string) {
      this.elements.innerHTML = _string;
      return this
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
      url = '../data.php',

      // 焦点是否在提问输入框
      questionFocus = false;

    /**
     * 格式化参数, jsonp专用
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    this._formatParams = function(data) {
      var arr = [];
      for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }
      return arr.join('&');
    };

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
    this.jsonp = function(_options) {
      _options = _options || {};
      if (!_options.url || !_options.callback) {
        throw new Error("参数不合法");
      };

      //创建 script 标签并加入到页面中
      var callbackName = ('jsonp' + new Date().getTime());
      var oHead = document.getElementsByTagName('head')[0];
      _options.data[_options.callback] = callbackName;
      var params = this._formatParams(_options.data);
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
      if (_options.timeout) {
        oS.timer = setTimeout(function() {
          window[callbackName] = null;
          oHead.removeChild(oS);
          _options.fail && _options.fail({
            message: "超时"
          });
        }, _options.timeout);
      }
    };


    /**
     * 用户提问显示模板
     * @param  {String} _question  提问的问题
     * @param  {Number} _index     问题序号
     * @return {String}            模板字符串
     */
    this._quesTpl = function(_question, _index) {
      return '<div class="vbk_client_box">' +
        '<span class="J_sing" id="J_sing' + _index + '">发送中... </span>' +
        '<span class="J_serr" id="J_serr' + _index + '" style="display:none">发送失败,请点击重新发送 </span>' +
        '<p class="vbk_client_pass">' + _question + '</p>' +
        '</div>' +
        '<p class="vbk_client_box" id="J_stime' + _index + '"></p>' +
        '</div>';
    };

    /**
     * [_answerTpl description]
     * @return {[type]} [description]
     */
    this._answerTpl = function(_answer, _resTime) {
      return '<p class="vbk_ctrip">游游助手</p>' +
        '<div>' +
        '<div class="vbk_ctrip_info">' + _answer + '</div>' +
        '</div>' +
        '<p class="vbk_ctrip">' + _resTime + '</p>';
    };

    /**
     * 格式化时间,返回hh:mm:ss格式
     * @param  {[type]} _date [description]
     * @return {[type]}       [description]
     */
    this._formatDate = function( _date ){
      var dateArr = [];
          tempDate = new Date(_date),
          dateArr[0] = tempDate.getHours(),
          dateArr[1] = tempDate.getMinutes(),
          dateArr[2] = tempDate.getSeconds();
      for(var i = 0; i < 3; i++){
        if(dateArr[i] < 10){
          dateArr[i] = '0' + dateArr[i]
        }
      };
      return dateArr.join(':')
    };

    /**
     * 显示回答
     * @param  {String} _answer  系统的回答
     * @param  {String} _resTime 回答的时间
     * @return
     */
    this._showAnswer = function(_index, _answer, _resTime) {
      var answerCont = this._viewCont(_index, 'answer'),
        answerInfo = this._answerTpl(_answer, _resTime);

      $G('J_chatbox').append(answerCont);
      $G('asw' + _index).html(answerInfo);

    };

    /**
     * 发送异步请求
     * @param  {Object} _options  请求的参数
     * @return
     */
    this._sendData = function(_options) {
      this.jsonp({
        url: url,
        callback: 'callback',
        data: {
          q: _options.question,
          index: questionIndex
        },
        success: function(_data) {

          var index = _data.index,
            sendTime = self._formatDate(_data.sendTime),
            answer = _data.answer,
            resTime = self._formatDate(_data.resTime);
          console.log(_data);

          // 移除发送中提示和错误提示
          $G('J_sing' + index).remove();
          $G('J_serr' + index).remove();

          // 写入发送时间
          $G('J_stime' + index).html(sendTime)

          // TODO 显示回答
          self._showAnswer(index, answer, resTime);


          // 发送按钮变亮,可再次提交提问
          self._sending(false);

          // 滚动到底部
          window.scrollTo(0, 9999);

          questionIndex++
        },
        fail: function() {
          $G('J_sing' + questionIndex).hide();
          $G('J_serr' + questionIndex).show();

          // 发送按钮变亮,可再次提交提问
          self._sending(false);
        },
        timeout: 2000
      })
    };

    /**
     * 发送按钮的样式
     * @param  {Boolean} _bool true:发送中;false:发送成功
     * @return
     */
    this._sending = function(_bool) {
      if (_bool) {
        $G('J_send').hide();
        $G('J_sending').show();
        $G('J_question').val('');
      } else {
        $G('J_send').show();
        $G('J_sending').hide();
      }
    };

    /**
     * 提问/回答显示模板容器
     * @param  {Number} _index  提问序号
     * @param  {String} _type   类型参数,'question':提问;'answer':回答
     * @return {Object} 提问模板容器
     */
    this._viewCont = function(_index, _type) {
      var content = document.createElement('div');
      if (_type === 'question') {
        content.setAttribute('id', 'chat' + _index);
      } else {
        content.setAttribute('id', 'asw' + _index);
      }
      return content
    };
    /**
     * 显示用户的提问
     * @param  {String} _question  用户的提问
     * @return
     */
    this._showQuestion = function(_question) {
      var tpl = this._viewCont(questionIndex, 'question');

      $G('J_chatbox').append(tpl);

      $G('chat' + questionIndex).html(this._quesTpl(_question, questionIndex));

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

        // 发送按钮变灰色,不能立刻再次提交
        self._sending(true);

        // 发送提问给后端,请求数据
        self._sendData({
          question: tempQuestion
        });
      }
    };

    /**
     * 绑定一些事件
     * @return
     */
    this._bind = function() {
      $G('J_question').bind('focus', function() {
        questionFocus = true
      });
      $G('J_question').bind('blur', function() {
        questionFocus = false
      })
    };

    /**
     * 发送按钮绑定提交事件
     */
    this._sendButton = function() {

      $G('J_send').bind('click', this._sendEvent);

      // TODO 回车按钮也绑定提交事件
      $G(document).bind('keyup', function(ev) {
        if (questionFocus && ev.keyCode === 13) {
          self._sendEvent();
        }
      })

    };

    this.init = function() {

      this._bind();
      // 发送按钮绑定提交事件
      this._sendButton();


    };
  };

  new QA().init();

})(window);