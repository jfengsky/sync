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
     * 设置/获取元素的属性
     * @param  {String}  _key    属性
     * @param  {String}  _value  值
     * @return {Object/String} 返回该元素/属性的值
     */
    attr: function(_key, _value) {
      if (_value) {
        // 设置属性
        this.elements.setAttribute(_key, _value)
        return this
      } else {
        // 获取属性
        return this.elements.getAttribute(_key)
      }
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
     * 获取节点里的文本
     * @return {String}
     */
    text: function() {
      var str = '',
        el = this.elements.childNodes || this.elements;
      for (var j = 0; j < el.length; j++) {
        str += el[j].nodeType != 1 ?
          el[j].nodeValue : text(el[j].childNodes);
      }
      return str
    },

    /**
     * 把json对象转化为字符串
     * @param  {Object} _obj  对象参数
     * @return {String}       字符串
     */
    stringify: function(_obj) {
      if (JSON) {
        return JSON.stringify(_obj)
      } else {
        this.jsonToStr(_obj)
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
      // url = '/bookingnext/smartqa/search',
      url = '/search',

      // 反馈接口
      feedBackUrl = '/bookingnext/smartqa/feedback',

      // 焦点是否在提问输入框
      questionFocus = false;


    // this._jsonToStr = function(_obj) {
    //     var arr = [];
    //     var fmt = function(s) {
    //       if (typeof s == 'object' && s != null) {
    //         return JsonToStr(s);
    //       }
    //       return /^(string)$/.test(typeof s) ? "'" + s + "'" : s;
    //     }
    //     for (var i in o) {
    //       arr.push("'" + i + "':" + fmt(o[i]));
    //       return '{' + arr.join(',') + '}';
    //     }
    //   };
    /**
     * 把json对象转化为字符串
     * @param  {Object} _obj  对象参数
     * @return {String}       字符串
     */
    this._stringify = function(_obj) {
      if (JSON) {
        return JSON.stringify(_obj)
      } else {
        // this._jsonToStr(_obj)
      }
    };

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
    // this._answerTpl = function(_answer, _resTime) {
    //   var listTpl = '',
    //     answerContTpl = '';
    //   if (typeof(_answer) === 'object') {
    //     for (var i = 0; i < _answer.length; i++) {
    //       listTpl += '<p>' + (i + 1) + ',' + '<a href="javascript:void(0)">' + _answer[i] + '</a></p>';
    //     };
    //     answerContTpl = '<div class="ask_box">' +
    //       '<p>相关问题：</p>' + listTpl +
    //       '</div>';
    //   } else {
    //     answerContTpl = '<div>' +
    //       '<div class="vbk_ctrip_info">' + _answer + '</div>' +
    //       '</div>';
    //   };

    //   return '<p class="vbk_ctrip">游游助手</p>' + answerContTpl + '<p class="vbk_ctrip">' + _resTime + '</p>';

    // };

    /**
     * 格式化时间
     * @param  {Number} _date  毫秒时间
     * @return {String}        返回YYYY-MM-DD hh:mm格式时间
     */
    this._formatDate = function(_date) {
      var dateArr = [],
        tempDate = new Date(_date);
      dateArr[0] = tempDate.getFullYear();
      dateArr[1] = tempDate.getMonth() + 1;
      dateArr[2] = tempDate.getDate();

      dateArr[3] = tempDate.getHours();
      dateArr[4] = tempDate.getMinutes();
      // dateArr[2] = tempDate.getSeconds();

      return dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2] + ' ' + dateArr[3] + ':' + dateArr[4]
    };

    /**
     * 网络错误或者返回错误的提示
     * @return
     */
    this._dataError = function() {
      $G('J_sing' + questionIndex).hide();
      $G('J_serr' + questionIndex).show();

      // 发送按钮变亮,可再次提交提问
      self._sending(false);
    };

    /**
     * 显示回答
     * @param  {String} _answer  系统的回答
     * @param  {String} _resTime 回答的时间
     * @return
     */
    // this._showAnswer = function(_index, _answer, _resTime) {
    //   var answerCont = this._viewCont(_index, 'answer'),
    //     answerInfo = this._answerTpl(_answer, _resTime);

    //   $G('J_chatbox').append(answerCont);
    //   $G('asw' + _index).html(answerInfo);

    // };

    /**
     * 高亮关键字
     * @param  {String}    _string    文本
     * @param  {Array}     _kerword   关键字数组
     * @return {String}               高亮关键字的文本
     */
    this._lightKeyword = function(_string, _kerword) {
      var tempString = '',
        reg = '';
      for (var i = 0, leg = _kerword.length; i < leg; i++) {
        reg = new RegExp(_kerword[i], 'ig');
        tempString = _string.replace(reg, '<span class="red">' + _kerword[i] + '</span>');
      }
      return tempString
    };

    /**
     * 好用不好用区域
     * @param  {Number} _index      答案序号
     * @param  {Number} _rid        radio的值,用于传给后端
     * @param  {Number} _nameIndex  radio组的序号
     * @return {String}
     */
    this._feedBack = function(_index, _rid, _nameIndex) {
      var tempName = 'feedback_' + _index + '_' + _nameIndex;
      return '<div class="choose_box">' +
        '<label><input data-type="feedback" type="radio" value="1" data-rid="' + _rid + '" name="' + tempName + '">好用</label>' +
        '<label><input data-type="feedback" type="radio" value="2" data-rid="' + _rid + '" name="' + tempName + '">一般</label>' +
        '<label><input data-type="feedback" type="radio" value="3" data-rid="' + _rid + '" name="' + tempName + '">不好用</label>' +
        '</div>'
    };

    /**
     * 相关问题答案
     * RQ 显示: 序号 + Q (K用来点击传给后端)
     * @param {Object} _data 相关问题数据
     * @return {String}
     */
    this._relateAnswer = function(_data) {
      var tempStr = '';
      if (_data.length) {
        for (var i = 0, leg = _data.length; i < leg; i++) {
          tempStr += '<p>' + (i + 1) + ', <a href="javascript:void(0)" data-type="relatequest" data-k="' + _data[i].K + '">' + _data[i].Q + '</a><p>';
        }
      }
      return '<div class="ask_box"><p>相关问题：</p>' + tempStr + '</div>'
    };

    /**
     * 模糊答案显示模板 SR 显示: R [SN S] + 好用不好用(RID)
     * @param  {Number}   _index                  问题序号
     * @param  {String}   _resTime                回答时间
     * @param  {Object}    _searchResult           答案数组
     * @return
     */
    this._fuzzyTpl = function(_index, _resTime, _searchResult, _searchResultKeyWord) {
      var answerStr = '', // 模糊匹配数据
        relateStr = '', // 精准匹配数据
        KeyWordArr = _searchResult.TK,
        fuzzyAnswer = _searchResult.SR;

      for (var i = 0; i < fuzzyAnswer.length; i++) {
        answerStr += '<div><div class="vbk_ctrip_info">' + this._lightKeyword(fuzzyAnswer[i].R, KeyWordArr) + ' [' + fuzzyAnswer[i].SN + ', ' + fuzzyAnswer[i].S + ']' + this._feedBack(_index, fuzzyAnswer[i].RID, i) + '</div></div>'
      };

      relateStr = this._relateAnswer(_searchResult.RQ);

      return '<p class="vbk_ctrip">游游助手</p>' + relateStr + answerStr + '<p class="vbk_ctrip">' + _resTime + '</p>';
    };

    /**
     * 显示答案
     * @param  {Number}   _index                  问题序号
     * @param  {String}   _resTime                回答时间
     * @param  {Object}   _searchResult           答案
     * @return
     */
    this._showAnswer = function(_index, _resTime, _searchResult) {
      var answerCont = this._viewCont(_index, 'answer'),
        answerTpl = this._fuzzyTpl(_index, _resTime, _searchResult);
      $G('J_chatbox').append(answerCont);

      $G('asw' + _index).html(answerTpl);

    };

    /**
     * 显示后端返回的答案
     * @param {Object} _data 返回的数据
     * @return
     */
    this._answers = function(_data) {
      console.log(_data);
      var data = _data.data,
        index = data.SQ,
        sendTime = self._formatDate(data.RQT),
        resTime = self._formatDate(data.RPT);
      // searchResult = data.SR, // 模糊匹配的答案
      // aboutResult = data.RQ, // 相关问题的答案
      // searchResultKeyWord = data.TK; // 答案的关键字,用于高亮

      // 移除发送中提示和错误提示
      $G('J_sing' + index).remove();
      $G('J_serr' + index).remove();

      // 写入发送时间
      $G('J_stime' + index).html(sendTime);

      // TODO 显示答案
      // 模糊问题
      //    SR 显示: R [SN S] + 好用不好用(RID)
      // if (searchResult.length) {
      //   self._showAnswer(index, resTime, searchResult, searchResultKeyWord);
      // }
      self._showAnswer(index, resTime, data);


      // 相关问题
      //    RQ 显示: 序号 + Q (K用来点击传给后端)
      // self._showAnswer(index, answer, resTime);


      // 发送按钮变亮,可再次提交提问
      self._sending(false);

      // 滚动到底部
      window.scrollTo(0, 9999);

      questionIndex++

    };

    /**
     * 发送异步请求
     * @param  {Object} _options  请求的参数
     * @return
     */
    this._sendData = function(_options) {
      this.jsonp({
        url: _options.url,
        callback: 'callback',
        data: {
          "param": self._stringify(_options.param)
        },
        success: function(_data) {
          if (_data.errno === 0 && _options.callback) {
            _options.callback(_data)
          } else {
            if (_options.error) {
              _options.error()
            }
          }
        },
        fail: function() {
          if (_options.error) {
            _options.error()
          }
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
     * 点击相关问题的操作
     * @param  {Object} _obj radio按钮
     * @return
     */
    this._sendRelateData = function(_obj) {

      // 相关问题需要把K传给后端而不是问题字符串
      var sendKey = $G(_obj).attr('data-k'),
        questionChar = $G(_obj).text();

      // 显示用户提问
      self._showQuestion(questionChar);

      // 发送按钮变灰色,不能立刻再次提交
      self._sending(true);

      this._sendData({
        url: 'http://localhost:3000' + url,
        param: {
          "M": 1, // 搜索模式，1精确模式，2模糊模式
          "PID": 0, // 产品id, 没有传0
          "K": sendKey, // 问题字符串
          "SQ": questionIndex // 提问序列号
        },
        callback: self._answers,
        error: self._dataError
      });
    };

    /**
     * 点击反馈radio后的操作
     * @param  {Object} _obj radio按钮
     * @return
     */
    this._sendFeedBack = function(_obj) {
      var radioRid = $G(_obj).attr('data-rid') - 0,
        radioVal = $G(_obj).val() - 0;
      this._sendData({
        url: feedBackUrl,
        param: {
          "RID": radioRid,
          "FR": radioVal,
          "EID": "", // TODO 员工OP的ID
        }
      });
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
          url: 'http://localhost:3000' + url,
          param: {
            "M": 2, // 搜索模式，1精确模式，2模糊模式
            "PID": 0, // 产品id, 没有传0
            "K": tempQuestion, // 问题字符串
            "SQ": questionIndex // 提问序列号
          },
          callback: self._answers,
          error: self._dataError
        });
      }
    };

    /**
     * 绑定一些事件
     * @return
     */
    this._bind = function() {

      // 焦点是否在提问输入表单,用于判断按回车键提交问题
      $G('J_question').bind('focus', function() {
        questionFocus = true
      });
      $G('J_question').bind('blur', function() {
        questionFocus = false
      })

      // 相关问题点击直接发送请求的事件代理
      $G('J_chatbox').bind('click', function(ev) {
        var targetType = $G(ev.target).attr('data-type');
        if (targetType === 'feedback') {
          // 反馈打分
          self._sendFeedBack(ev.target);
        } else if (targetType === 'relatequest') {
          // 相关问题
          self._sendRelateData(ev.target);
        }
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