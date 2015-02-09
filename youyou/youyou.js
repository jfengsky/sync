/**
 * @description: 游游助手脚本文件
 * @author jiang.f@ctrip.com
 * @time: 2015-01-24
 */

(function(window, undefined) {
  var doc = document,
    $G = function(id) {
      return new _$(id);
    };

  function _$(id) {
    if (typeof(id) === 'string') {
      if (id !== 'body') {
        this.elements = doc.getElementById(id);
      } else {
        this.elements = doc.getElementsByTagName('body')[0];
      }

    } else if (typeof(id) === 'object') {
      this.elements = id
    }
  };

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
     * 判断元素是否含有样式
     * @param  {String}  _classname  样式名
     * @return {Boolean}
     */
    hasClass: function(_classname) {
      return this.elements.className.match(new RegExp('(\\s|^)' + _classname + '(\\s|$)')) ? true : false;
    },

    /**
     * 添加class
     * @param  {String}  _classname  样式名
     * @return {Object} 返回该元素
     */
    addClass: function(_classname) {
      if (!$G(this.elements).hasClass(_classname)) {
        this.elements.className += ' ' + _classname
      };
      return this
    },

    /**
     * 移除classname
     * @param  {String}  _classname  样式名
     * @return {Object} 返回该元素
     */
    removeClass: function(_classname) {
      var reg = new RegExp('(\\s|^)' + _classname + '(\\s|$)');
      if ($G(this.elements).hasClass(_classname)) {
        this.elements.className = this.elements.className.replace(reg, ' ')
      };
      return this
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
      if (this.elements) {
        if (doc.addEventListener) {
          this.elements.addEventListener(_type, _fn, false)
        } else if (doc.attachEvent) {
          this.elements.attachEvent('on' + _type, _fn)
        }
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
      // SEARCHURL = 'http://localhost:3000/search',
      SEARCHURL = '',

      // 反馈接口
      // FEEDBACKURL = '/bookingnext/smartqa/feedback',
      FEEDBACKURL = '',

      // 焦点是否在提问输入框
      questionFocus = false,

      // 嵌入版游游助手css是否已经载入
      cssHasLoad = false,

      // 如果被其它页面引用，这个地址可能要变化
      SMALLYOUYOUURL = '',

      // 是否是嵌入版(小窗口)的游游助手
      isSmallYouyou = false,

      // 问题类型,用于是否显示评分 1:精确模式;2:模糊模式
      questionType = 2,

      // 产品id
      productId = 0,

      // 员工OP的id
      opId = '';


    /**
     * 异步载入css
     * @param  {String} _href css地址
     * @return
     */
    this._loadCss = function(_href) {
      var head = doc.getElementsByTagName('head')[0],
        styleTag = doc.createElement('link');
      styleTag.setAttribute('type', 'text/css');
      styleTag.setAttribute('rel', 'stylesheet');
      styleTag.setAttribute('href', _href);
      head.appendChild(styleTag);
    };

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
      var oHead = doc.getElementsByTagName('head')[0];
      _options.data[_options.callback] = callbackName;
      var params = this._formatParams(_options.data);
      var oS = doc.createElement('script');
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


    this._smallWinTpl = '<div class="youyou_title"><h1>游游助手<i id="J_youyouboxclose">x</i></h1></div>' +
      '<div class="body-search" id="J_bodysearch"><div class="box" id="J_chatbox">' +
      '<div id="chat0">' +
      '<p class="vbk_ctrip">游游助手</p>' +
      '<div class="basefix">' +
      '<div class="left_box yellow_bg">' +
      '您好，我是机器人游游，很高兴为您复您。' +
      '<div class="choose_box">' +
      '<label>' +
      '<input type="radio">好用' +
      '</label>' +
      '<label>' +
      '<input type="radio">一般' +
      '</label>' +
      '<label>' +
      '<input type="radio">不好用' +
      '</label>' +
      '</div>' +
      '</div>' +
      '</div>' +
      // '<p class="vbk_ctrip">2014-10-23  19:43</p>' +
      '</div>' +
      '</div></div>' +
      '<div class="output"><input type="text" placeholder="请输入文字" id="J_question"><a href="javascript:void(0)" class="send yy_halfalpha" id="J_send">发送</a></div>';

    /**
     * [_smallquesTpl description]
     * @param  {[type]} _question [description]
     * @param  {[type]} _index    [description]
     * @return {[type]}           [description]
     */
    // this._smallquesTpl = function(_question, _index) {
    //   return '<div class="basefix">' +
    //     // '<span class="J_sing" id="J_sing' + _index + '">发送中... </span>' +
    //     '<div class="right_box">' + _question + '</div>' +
    //     '</div>';
    // };

    /**
     * 用户提问显示模板
     * @param  {String} _question  提问的问题
     * @param  {Number} _index     问题序号
     * @return {String}            模板字符串
     */
    this._quesTpl = function(_question, _index) {
      return '<div class="vbk_client_box">' +
        // '<span class="J_sing" id="J_sing' + _index + '">发送中... </span>' +
        '<span class="J_serr" id="J_serr' + _index + '" style="display:none">发送失败,请点击重新发送 </span>' +
        '<p class="vbk_client_pass">' + _question + '</p>' +
        '</div>' +
        '<p class="vbk_client_box" id="J_stime' + _index + '"></p>' +
        '</div>';
    };

    /**
     * 滚动到底部
     * @return
     */
    this._scrollBottom = function() {
      var scrollCnt = doc.getElementById('J_bodysearch');
      if (scrollCnt) {
        scrollCnt.scrollTop = 9999
      } else {
        window.scrollTo(0, 9999)
      };
    };

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
      // $G('J_sing' + questionIndex).hide();
      $G('J_serr' + questionIndex).show();

      // 发送按钮变亮,可再次提交提问
      self._sending(true);
    };

    /**
     * 高亮关键字
     * @param  {String}    _string    文本
     * @param  {Array}     _kerword   关键字数组
     * @return {String}               高亮关键字的文本
     */
    this._lightKeyword = function(_string, _kerword) {
      var tempString = _string,
        reg = '';
      for (var i = 0, leg = _kerword.length; i < leg; i++) {
        reg = new RegExp(_kerword[i], 'ig');
        tempString = tempString.replace(reg, '<span class="red">' + _kerword[i] + '</span>');
      }
      return tempString
    };

    /**
     * 评分区域模板
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
      if (_data && _data.length) {
        for (var i = 0, leg = _data.length; i < leg; i++) {
          tempStr += '<p>' + (i + 1) + ', <a href="javascript:void(0)" data-type="relatequest" data-k=\'' + _data[i].K + '\'>' + _data[i].Q + '</a><p>';
        };
        return '<div class="ask_box"><p>相关问题：</p>' + tempStr + '</div>'
      } else {
        return ''
      }
    };

    /**
     * 当没有答案的回答
     * @return
     */
    this._emptyAnswer = function(_resTime) {
      return '<p class="vbk_ctrip">游游助手</p>' +
        '<div>' +
        '<div class="vbk_ctrip_info">我太笨了，不知道你这个问题的答案，见笑了^-^</div>' +
        '</div>' +
        '<p class="vbk_ctrip">' + _resTime + '</p>'
    };

    /**
     * 模糊答案显示模板 SR 显示: R [SN S] + 好用不好用(RID)
     * @param  {Number}   _index                  问题序号
     * @param  {String}   _resTime                回答时间
     * @param  {Object}   _searchResult           答案数组
     * @param  {Array}    _searchResultKeyWord    关键词数组,用于高亮
     * @return
     */
    this._fuzzyTpl = function(_index, _resTime, _searchResult, _searchResultKeyWord) {
      var answerStr = '', // 模糊匹配数据
        relateStr = '', // 精准匹配数据
        KeyWordArr = _searchResult.TK,
        fuzzyAnswer = _searchResult.SR,
        lightClass = '',
        feedbackTpl = '';
      if (fuzzyAnswer && fuzzyAnswer.length) {
        for (var i = 0; i < fuzzyAnswer.length; i++) {

          // 模糊搜索的第一个答案要高亮
          if (i === 0 && questionType === 2) {
            lightClass = 'yellow_bg';
          } else {
            lightClass = '';
          };

          if (questionType === 2) {
            feedbackTpl = this._feedBack(_index, fuzzyAnswer[i].RID, i);
          } else {
            feedbackTpl = '';
          }

          answerStr += '<div><div class="vbk_ctrip_info ' + lightClass + '">' + this._lightKeyword(fuzzyAnswer[i].R, KeyWordArr) + ' [' + fuzzyAnswer[i].SN + ', ' + fuzzyAnswer[i].S + ']' + feedbackTpl + '</div></div>'
        };

        relateStr = this._relateAnswer(_searchResult.RQ);

        return '<p class="vbk_ctrip">游游助手</p>' + answerStr + relateStr + '<p class="vbk_ctrip">' + _resTime + '</p>';
      } else {
        return ''
      }
    };

    /**
     * 显示答案
     *
     * @param  {Number}   _index                  问题序号
     * @param  {String}   _resTime                回答时间
     * @param  {Object}   _searchResult           答案
     * @return
     */
    this._showAnswer = function(_index, _resTime, _searchResult) {
      var answerCont = this._viewCont(_index, 'answer'),
        answerTpl = this._fuzzyTpl(_index, _resTime, _searchResult);
      $G('J_chatbox').append(answerCont);

      // 如果RQ和SR都为null 则显示 "我太笨了，不知道你这个问题的答案，见笑了^-^"
      if (!_searchResult.RQ && !_searchResult.SR) {
        $G('asw' + _index).html(self._emptyAnswer(_resTime));
      } else {
        $G('asw' + _index).html(answerTpl);
      }

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
        sendTime = self._formatDate(data.RQT - 0),
        resTime = self._formatDate(data.RPT - 0);

      // 移除发送中提示和错误提示
      // $G('J_sing' + index).remove();
      $G('J_serr' + index).remove();

      // 写入发送时间
      $G('J_stime' + index).html(sendTime);

      // 显示答案
      self._showAnswer(index, resTime, data);

      // 清空输入框内容,初始化发送按钮
      self._sending(true);

      // 滚动到底部
      self._scrollBottom();

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
        timeout: 10000
      })
    };

    /**
     * 发送按钮的样式
     * @param  {Boolean} _bool true:发送中;false:发送成功
     * @return
     */
    this._sending = function(_bool) {
      if (_bool) {
        $G('J_send').addClass('yy_halfalpha');
        $G('J_send').html('发送');
        $G('J_question').val('');
      } else {
        $G('J_send').removeClass('yy_halfalpha');
      }
    };

    /**
     * 提问/回答显示模板容器
     * @param  {Number} _index  提问序号
     * @param  {String} _type   类型参数,'question':提问;'answer':回答
     * @return {Object} 提问模板容器
     */
    this._viewCont = function(_index, _type) {
      var content = doc.createElement('div');
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
      // 容器模板
      var tpl = this._viewCont(questionIndex, 'question'),
        chatTpl = this._quesTpl(_question, questionIndex);
      // if (isSmallYouyou) {
      //   chatTpl = this._smallquesTpl(_question, questionIndex);;
      // };

      $G('J_chatbox').append(tpl);

      $G('chat' + questionIndex).html(chatTpl);

      // 滚动到底部
      this._scrollBottom();
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

      // 精确模式
      questionType = 1;

      // 显示用户提问
      self._showQuestion(questionChar);

      // 发送按钮变灰色,不能立刻再次提交
      self._sending(true);
      $G('J_send').html('发送中...');
      this._sendData({
        url: SEARCHURL,
        param: {
          "M": 1, // 搜索模式，1精确模式，2模糊模式
          "PID": productId, // 产品id, 没有传0
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
        url: FEEDBACKURL,
        param: {
          "RID": radioRid,
          "FR": radioVal,
          "EID": opId // TODO 员工OP的ID
        },
        callback: null,
        error: null
      });
    };

    /**
     * 点击发送按钮后执行的操作
     * @return
     */
    this._sendEvent = function() {
      var tempQuestion = $G('J_question').val();
      if (!$G('J_send').hasClass('yy_halfalpha')) {
        // 模糊模式
        questionType = 2;

        if (self.checkString(tempQuestion)) {

          // 显示用户提问
          self._showQuestion(tempQuestion);

          // 发送按钮变灰色,不能立刻再次提交
          self._sending(true);
          $G('J_send').html('发送中...');
          // 发送提问给后端,请求数据
          self._sendData({
            url: SEARCHURL,
            param: {
              "M": 2, // 搜索模式，1精确模式，2模糊模式
              "PID": productId, // 产品id, 没有传0
              "K": escape(tempQuestion), // 问题字符串
              "SQ": questionIndex // 提问序列号
            },
            callback: self._answers,
            error: self._dataError
          });
        }
      };

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
      });

      // 绑定产品id
      $G('J_bindproduct').bind('click', function() {
        productId = prompt('请输入需要绑定的产品Id') || 0;
        if (productId !== 0) {
          $G(this).hide();
          $G('J_pkgid').html(productId);
          $G('J_unbindproductcnt').show();
          productId = parseInt(productId) || 0;
        }
      });

      // 取消绑定产品id
      $G('J_unbindproduct').bind('click', function() {
        productId = 0;
        $G('J_unbindproductcnt').hide();
        $G('J_bindproduct').show();
        $G('J_pkgid').html('');
      });

    };

    /**
     * 发送按钮绑定提交事件
     */
    this._sendButton = function() {

      $G('J_send').bind('click', this._sendEvent);

      // TODO 回车按钮也绑定提交事件
      $G(doc).bind('keyup', function(ev) {
        if (questionFocus && ev.keyCode !== 13) {
          var queStr = $G('J_question').val();
          if (queStr.length > 0) {
            $G('J_send').removeClass('yy_halfalpha')
          } else {
            $G('J_send').addClass('yy_halfalpha')
          }
        };

        if (questionFocus && ev.keyCode === 13) {
          self._sendEvent();
        };
      })

    };


    this._offlineClick = function() {
      var youyouButton = $G('youyou'),
          isShow = youyouButton.attr('data-show');

      if (isShow === 'true') {
        $G('J_youyou_box').hide();
        youyouButton.attr('data-show', 'false');
      } else if (isShow === 'false') {
        $G('J_youyou_box').show();
        youyouButton.attr('data-show', 'true');
      } else {
        // 异步载入css文件
        self._loadCss(SMALLYOUYOUURL);

        // 创建窗口容器
        var content = doc.createElement('div');
        content.setAttribute('class', 'youyou_box');
        content.setAttribute('id', 'J_youyou_box');
        content.setAttribute('style', 'position:fixed;bottom:0;right:60px;z-index:1000');
        $G('body').append(content);
        $G('J_youyou_box').html(self._smallWinTpl);

        // 绑定事件
        self._bind();
        self._sendButton();

        // 标记为已显示
        youyouButton.attr('data-show', 'true');
        cssHasLoad = true;
      }
    };

    /**
     * 嵌入版本的初始化
     *
     */
    this._boxInit = function() {

      // 点击游游助手按钮
      this._offlineClick();
      $G('youyou').bind('click', this._offlineClick);

      // 关闭游游助手窗口按钮
      $G('J_youyouboxclose').bind('click', function(){
        $G('J_youyou_box').hide();
        $G('youyou').attr('data-show', 'false');
      })
    };

    this.init = function(_options) {

      SEARCHURL = _options.searchUrl;

      FEEDBACKURL = _options.feedBackUrl;

      SMALLYOUYOUURL = _options.cssUrl;

      productId = _options.productId || 0;

      opId = _options.EID || '';



      // 判断页面是单页面版还是嵌入版,页面是否存在游游助手按钮
      if (_options.pageType === 'offline') {
        isSmallYouyou = true
      };

      if (isSmallYouyou) {

        this._boxInit();

      } else {
        this._bind();

        // 发送按钮绑定提交事件
        this._sendButton();
      }

    };
  };

  window.QA = QA;

})(window);