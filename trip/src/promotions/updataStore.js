/**
 * 更新数据：在秒杀时间段每隔2分钟去服务器请求一次剩余名额数据
 * author: jiangfeng(jiang.f@ctrip.com)
 * date: 2014-03-14
 *
 * TODO 4-10需求修改，切换tab再请求库存数据
 */

define(function (require, exports, module) {
  "use strict";
  var $ = require("../../../lib/jquery.js");
  /**
   * 根据滚动条去获取更新数据， 不主动更新数据
   * 切换Tab请求一次库存
   * 滚动时候再请求库存，并2分钟请求一次该库存，其它时候不请求库存
   *
   */
  // var items = $('#j_container .products_list li');
  // $(window).on('scroll', function(){
  //   $.each(items, function(index, item){
  //     var itemTop = $(item).offset().top;
  //     console.log(itemTop);
  //   });
  //   console.log(items);
  //   console.log($(window).scrollTop());
  //   console.log($('#j_container .products_list li').offset());
  //   console.log($(window).height());
  // })

  /**
   * 请求更新数据
   * @param {String} api  接口地址
   * @param {String} ids  商品id字符串 "111,222,333", 当为'all'是所有商品
   * @param {Number} time 请求数据间隔时间(单位:秒)
   */

  function UpdataStore(url, ids, time) {
    this.url = url;
    this.ids = ids;
    this.time = time * 1000;
    this.getInterval = null;
    this.tabItem = [];
    this.viewItem = [];
  };



  UpdataStore.prototype = {
    _setClass: function() {
      var tempid, tempdom;
      for (var i = 0, lis = $('#j_container li').size(); i < lis; i++) {
        tempdom = $($('#j_container li')[i]);
        tempid = tempdom.attr('data-id');
        tempdom.addClass(tempid);
      }
    },

    /**
     * 当没有传id参数时自动获取所有商品id
     * @return {[type]} [description]
     */
    // _getIds: function() {
    //   var itemIds = [],
    //     tempid = null;
    //   if (this.ids === 'all') {
    //     for (var i = 0, lis = $('#j_container li').size(); i < lis; i++) {
    //       tempid = $($('#j_container li')[i]).attr('data-id');
    //       if (tempid) {
    //         tempid = tempid.slice(2);
    //         itemIds.push(tempid);
    //       }
    //     }
    //     return itemIds.join(',')
    //   } else {
    //     return this.ids
    //   }
    // },

    /**
     * 请求数据
     * @param  {Function} fn 请求数据成功后的回调
     * @return {[type]}      [description]
     */
    _getData: function(_ids, fn) {
      var self = this;
      if (_ids) {
        $.ajax({
          type: "get",
          url: this.url,
          data: {
            type: 'inventory',
            // ids: this._getIds()
            ids: _ids
          },
          dataType: 'json',
          cache: false,
          success: function(data) {
            fn(data, _ids)
          },
          error: function() {
            return
          }
        });
      }
    },

    /**
     * 还有名额
     * @param  {Number}  id  商品id
     * @param  {Number}  num 剩余名额数
     * @param  {String}  url 商品detail地址
     * @return
     */
    _hasLeftString: function(id, num) {
      var cnt = $('.J_' + id);
      if (num >= 99999 || num <= -99999) {
        cnt.find('.opacity').hide();
      } else if(num >10 ) {
        cnt.find('.opacity').removeClass('opacity2').html("剩余名额：>10位").show();
      } else if(num <= 10){
        cnt.find('.opacity').removeClass('opacity2').html("仅剩名额：" + num + " 位").show();
      }
      cnt.find('.basefix').removeClass('saleout willstart').find('.btns').html('<a href="javascript:;" target="_blank" title="正在秒杀">正在秒杀<span>&gt;</span></a>');
    },

    /**
     * 名额为0
     * @param  {Number} id  商品id
     * @return
     */
    _emptyLeftString: function(id) {
      var cnt, tpl, area, url, data;
      var cnt = $('.J_' + id);
      var tempObj = {};
      if (!cnt.hasClass('opacity2')) {
        data = cnt.attr('data').split(',');
        $.each(data, function(index, item) {
          tempObj[item.split(':')[0]] = item.split(':')[1];
          area = tempObj['DestinationCityName'] || '';
          url = 'http://' + tempObj['RecommendUrl'] || 'javascript:;';
        });
        tpl = '<p>^__^你来晚啦亲，已经被抢光啦！</p><p>你可以点击这里去<a href="' + url + '" title="" target="_blank">查看其它' + area + '线路</a>哦~~</p>';
        cnt.find('.opacity').addClass('opacity2').hide().html(tpl);
        // 时间也隐藏掉
        cnt.find('.depart_date').hide();
        cnt.find('.basefix').addClass('saleout').removeClass('willstart').find('.btns').html('卖光了！');
        cnt.find('a.link').attr('href', 'javascript:;').css('cursor', 'default').removeAttr('target');
      }
    },

    /**
     * 更新模板
     *   如果剩余名额>0 ，仅更新剩余名额，否则更新商品状态，显示卖光了
     *
     */
    _html: function(data, ids) {
      var d = data,
          self = this,
          backId = [],
          sendId = ids.split(','),
          emptyId = [];
        // allEmpty = true; // TODO 怎样取得allEmpty
      if (d) {
        for (var id in d) {
          backId.push(id);
          if (d[id] > 0 || d[id] <= -99999) {
            self._hasLeftString(id, d[id]);
            // allEmpty = false;
          } else {
            self._emptyLeftString(id);
          }
        }
      };

      // 比较是否有没返回的id，当作库存0处理
      $.each(backId, function(bidx, bid){
        $.each(sendId, function(sidx, sid){
          if(bid === sid){
            sendId.splice(sidx,1);
          }
        })
      });
      if(sendId){
        $.each(sendId, function(index, item){
          self._emptyLeftString(item);
        })
      }
    },

    /**
     * 卖光的产品浮层在hover时才显示
     * @return {[type]} [description]
     */
    _hover: function() {
      $('#j_container').delegate('li', 'mouseenter mouseleave', function(ev) {
        if (ev.type === 'mouseenter') {
          $(this).find('.opacity2').show();
        };
        if (ev.type === 'mouseleave') {
          $(this).find('.opacity2').hide();
        }
      });
    },

    /**
     * 获取当前高亮标签
     * @return {jqueryObject} 当前
     */
    _getArea: function() {
      var navTab = $('#j_container .topics_part0'),
        tabName = '';
      $.each(navTab, function(index, item) {
        if ($(item).hasClass('current')) {
          tabName = $(item);
        }
      });
      return tabName;
    },

    /**
     * 检查产品是否在可视区域
     * @param  {jQueryObject} _cnt 容器对象
     * @return {[type]}      [description]
     */
    _checkViewItem: function(_content) {
      var self = this,
        tempItemArr = []
        $.each(_content, function(index, item) {
          var itemTop = $(item).offset().top;
          if ((itemTop > $(window).scrollTop()) && (itemTop < $(window).scrollTop() + $(window).height())) {
            tempItemArr.push($(item).attr('data-id').slice(2) - 0);
          }
        });
    self._getData(tempItemArr.join(','), function (data, ids) {
        // TODO 当标签下的产品是否全部卖光不好获取 self._html(data, fn);
        self._html(data, ids);
      });
    },

    /**
     * 滚动窗口更新库存
     * @param  {[type]} _content [description]
     * @return {[type]}          [description]
     */
    _scroll: function(_content) {
      var scrollTime = null,
        self = this;
      $(window).unbind('scroll');
      // 滚动时候每300ms检测一次scroll，避免时时操作
      $(window).bind('scroll', function() {
          if (scrollTime) {
            clearTimeout(scrollTime)
          }
          scrollTime = setTimeout(function() {
            self._checkViewItem(_content);
          }, 300);
        }
      );
    },

    init: function(fn) {
      var self = this,
        curTab = self._getArea();
      this._setClass();
      // 准备进入秒杀阶段请求当前view数据
      this._checkViewItem(curTab.find('li'));
      
      // 获取显示的区域 根据区域触发scroll事件来获取产品id，存入数组，如果
      this._scroll(curTab.find('li'));

      // 切换Tab
      $('#j_topics_tabs_handle').delegate('a', 'click', function() {
        var cntName = $(this).attr('section');
        $.each($('#j_container .topics_part0'), function(index, item) {
          if ($(item).attr('section') === cntName) {
            curTab = $(item);
          }
        });
        setTimeout(function() {
          self._checkViewItem(curTab.find('li'));
        }, 200)
        self._scroll(curTab.find('li'));
      })

      // 如果数组有改动，去获取数组

      // 获取当前展示的Tab
      // self._getData(this._getIds(), function (data) {
      //     self._html(data, fn);
      // });
      // this.getInterval = setInterval(function () {
      //     self._getData(this._getIds(), function (data) {
      //         self._html(data, fn);
      //     });
      // }, this.time);
      this._hover();
    },

    /**
     * 停止数据更新
     * @return
     */
    stop: function() {
      clearInterval(this.getInterval);
    }
  }
  module.exports = UpdataStore;
});