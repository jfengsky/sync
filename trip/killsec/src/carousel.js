
define(function(require, exports, module) {
  "use strict";

  var $ = require('jquery');
  /**
   * [Carousel description]
   * @param {String} element 走马灯容器
   * @param {Json} options  配置参数
   *     @param {String} prev 向前滚动按钮
   *     @param {String} next 向后滚动按钮
   *     @param {String} scrollcnt 容器滚动区域
   *     @param {Boolean} autoscroll 是否自动滚动
   *     @param {Number} interval 自动滚动时间间隔
   */
  function Carousel(element, options){
    this.$element = $(element);
    this.options = options;
  };

  Carousel.prototype = {
    /**
     * 容器滚动
     * @param  {jquery Object}   el    容器
     * @param  {Number}   index 当前是第几个
     * @param  {Number}   width li宽度
     * @param  {Function} fn    滚动后回调函数
     * @return {[type]}         [description]
     */
    _scroll: function(el, index, width, fn){
      el.animate({
        left: index * width
      },fn);
    },

    /**
     * 当滚动到最后一个设置按钮透明
     * @param  {jquery Object} el    [description]
     * @param  {Number} value [description]
     * @param  {String} mouse [description]
     * @return {[type]}       [description]
     */
    _opacity: function(el, value, mouse){
      el.css({
        opacity: value,
        cursor: mouse
      });
    },
    _btnShow: function(el){
      this._opacity(el, 1, 'pointer')
    },
    _btnHide: function(el){
      this._opacity(el, .3, 'text')
    },

    /**
     * 初始化
     * @return {[type]} [description]
     */
    init: function(){
      var self = this,
          elementScrollCnt = this.$element.find(this.options.scrollcnt),
          elementul = elementScrollCnt.children(),
          elementli = elementul.children(),
          cntHeight = elementli.height(),
          cneWidth = elementScrollCnt.width(),
          listLength = elementli.size(),
          lioutWidth = elementli.outerWidth(true),
          viewLength = Math.floor(cneWidth / lioutWidth),
          scrollIndex = 0;
      
      elementScrollCnt.css({
        'height': cntHeight,
        'width': cneWidth,
        'overflow':'hidden',
        'position': 'relative'
      });
      elementul.css({
        'width': lioutWidth * listLength,
        'position': 'absolute',
        'left': 0,
        'top': 0
      });

      // 初始化最左边的按钮
      this.$element.find('.btn_prev').css({
        opacity: .3,
        cursor: 'text'
      })

      /**
       * 点击滚动
       * @return {[type]} [description]
       */
      this.$element.delegate('.btn', 'click', function(){
        if($(this).hasClass('btn_next')){
          if( (listLength - viewLength > 0) && (viewLength - listLength) < scrollIndex ) {
            scrollIndex--;
            self._scroll(elementul, scrollIndex, lioutWidth, function(){
              self._btnShow(self.$element.find('.btn_prev'));
              if(viewLength - listLength >= scrollIndex){
                self._btnHide(self.$element.find('.btn_next'));
              }
            });
          }
        };
        if($(this).hasClass('btn_prev')){
          if(scrollIndex < 0) {
            scrollIndex++;
            self._scroll(elementul, scrollIndex, lioutWidth, function(){
              self._btnShow(self.$element.find('.btn_next'));
              if(scrollIndex === 0) {
                self._btnHide(self.$element.find('.btn_prev'));
              }
            })
          }
        }
      });
    }
  };


  module.exports = Carousel;
});
