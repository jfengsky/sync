/**
 * revise slider cseckill
 * 
 * @author: william
 * @date: 2014/4/24
 * @time: 本地功能测试中。。。。。。
 */
define(function(require, exports, module) {
	var $ = require("../../../lib/jquery.js"),
		defaultOptions = {
			unitDisplayed: 4,    //显示单元个数
			numToMove: 4,		 //一次移动单元个数
			scrollTarget: 'ul',  //移动对象
			speed: 500,          //移动速度(ms)
			margin: 12,          //滚动具体单元的margin
			loop: true,      //是否循环移动
			// direction: 'H'    //移动水平(H)或垂直(V)
			btnPrev: 'btn_prev',
			btnNext: 'btn_next'
		};

	exports = module.exports = new Slider;

	function Slider() {
		this._options = $.extend({}, defaultOptions);
	}

	Slider.prototype.init = function (element) {
		var self = this;
		this._target = $(element);
		this._scrollTarget = this._target.find(this._options['scrollTarget']),      
		this._viewedSize = this._scrollTarget.parent().width(),    //可视窗口的宽度
		this._scrollUnits = this._scrollTarget.find('li'),         //滚动的具体单元
		this._unitLen = this._scrollUnits.eq(0).outerWidth() + this._options['margin'],       //滚动单元长度
		this._numToMove = this._options['numToMove'] > this._options['unitDisplayed'] ? this._options['unitDisplayed'] : this._options['numToMove'],
		this._scrollTargetSize = this._scrollUnits.length * this._unitLen,      //滚动目标的宽度 
		this._offset = 0,    //最大移动长度
		this._offsetnow = 0,    //当前移动长度
		this._movelength = this._unitLen * this._numToMove,     //一次移动的长度
		this._moving = false,     //标志当前是否在移动
		this._loop = this._options['loop'],
		this._speed = this._options['speed'],
		this._btnRight = this._target.find('.' + this._options['btnNext']),      //下一页的目标元素
		this._btnLeft = this._target.find('.' + this._options['btnPrev']);       //上一页的目标元素
		this._margin = this._viewedSize - this._unitLen * this._options['unitDisplayed'];
		return this;
	};

	/** 传递一个Option对象配置Slider
	 *
	 * @param {Object} Option args
	 * @return {Object} this for chain
	 */
	Slider.prototype.option = function (options) {
		this._options = $.extend(this._options, options);
		return this;
	};

	/** Slider启动
	 *
	 * @todo: 循环移动、上一页和下一页功能
	 */
	Slider.prototype.run = function () {
		var self = this,
			stopLoop;
		
		this._offset = this._scrollTargetSize - this._viewedSize;
		
		this._btnLeft.click(function(){
			var moveUnits = 0;
			self._movelength = self._movelength > 0 ? -self._movelength : self._movelength;
			if(self._offsetnow < -self._movelength && self._offsetnow >= 0) {
				moveUnits = (Math.abs(self._movelength) - Math.abs(self._offsetnow)) / self._unitLen;
				for(var i = 0;i < moveUnits;i++) {
					self._scrollTarget.find('li:last').remove().prependTo(self._scrollTarget);
				}
				self._offsetnow -= self._movelength;
			}
			self.move();
		});

		this._btnRight.click(function(){
			var moveUnits = 0;
			self._movelength = self._movelength > 0 ? self._movelength : -self._movelength;
			if(self._offsetnow <= self._offset + self._margin && self._offsetnow > self._offset + self._margin - self._movelength) {
				moveUnits = (self._offsetnow + self._movelength - self._offset - self._margin) / self._unitLen;
				for(var i = 0;i < moveUnits;i++) {
					self._scrollTarget.find('li:first').remove().appendTo(self._scrollTarget);
				}
				self._offsetnow -= moveUnits * self._unitLen;
			}
			self.move();
		});
		
		if(this._loop) {
			this._target.hover(
				function () {
					clearInterval(stopLoop);
				},
				function () {
					stopLoop = setInterval(function () {
						self._movelength = Math.abs(self._movelength);
						self.move();
					}, 3000);
				}
			);

			stopLoop = setInterval(function () {
				self._movelength = Math.abs(self._movelength);
				self.move();
			}, 3000);
		}

		$(window).resize(function () {
			// clearInterval(stopLoop);
			// throttle(resizeLen, this, self);
			self._offsetnow = 0;
			self._unitLen = self._scrollUnits.eq(0).outerWidth() + self._options['margin'];
			self._movelength = self._unitLen * self._numToMove;
			self.move();
		});
	};

	/** 产品移动
	 *
	 * @api private
	 */
	Slider.prototype.move = function () {
		var self = this;
		if(!this._moving) {
			this._moving = true;
			if(self._movelength > 0 && self._offsetnow <= self._offset + self._margin && self._offsetnow > self._offset + self._margin - self._movelength) {
				moveUnits = (self._offsetnow + self._movelength - self._offset - self._margin) / self._unitLen;
				for(var i = 0;i < moveUnits;i++) {
					self._scrollTarget.find('li:first').remove().appendTo(self._scrollTarget);
				}
				self._offsetnow -= moveUnits * self._unitLen;
			} 
			this._offsetnow += this._movelength;
			self._scrollTarget.css('left', -self._offsetnow + 'px');
			self._moving = false;
		}
	};


	/** 解决window的resize事件
	 *
	 * 技巧：函数节流
	 * @ref：Javascript高级程序设计中第22章
	 */
	// function throttle(method, context, obj) {
	// 	clearTimeout(method.tId);
	// 	method.tId = setTimeout(function () {
	// 		method.call(context, obj);
	// 	}, 300);
	// }

	// function resizeLen (obj) {
	// 	var adaptNum = obj._offsetnow / obj._unitLen,
	// 		oldUnitsLen = obj._unitLen;

	// 	obj._unitLen = obj._scrollUnits.eq(0).outerWidth() + obj._options['margin'];
	// 	if(oldUnitsLen !== obj._unitLen) {
	// 		obj._movelength = obj._unitLen * obj._numToMove;
	// 		obj._offsetnow = obj._movelength * adaptNum;
	// 		obj._movelength = obj._unitLen * obj._numToMove;
	// 		obj._offsetnow = obj._movelength * adaptNum;
	// 		obj.move();
	// 	}
	// }





	// var slider = (function () {
	// 	var options = {
	// 		element: '',         //当前元素
	// 		unitDisplayed: 4,    //显示单元个数
	// 		numToMove: 4,		 //一次移动单元个数
	// 		scrollTarget: 'ul',  //移动对象
	// 		unitLen: 0,          //单元长度
	// 		speed: 500,          //移动速度(ms)
	// 		margin: 12,          //滚动具体单元的margin
	// 		loop: true,      //是否循环移动
	// 		// direction: 'H'    //移动水平(H)或垂直(V)
	// 		btnPrev: 'btn_prev',
	// 		btnNext: 'btn_next'
	// 	};

	// 	function _init(opt) {
	// 		var option = $.extend({}, options, opt),
	// 			scrollTarget = $(option.element).find(option.scrollTarget),      
	// 			viewedSize = scrollTarget.parent().width(),    //可视窗口的宽度
	// 			scrollUnits = scrollTarget.find('li'),         //滚动的具体单元
	// 			unitLen = option.unitLen || scrollUnits.eq(0).outerWidth() + option.margin,       //滚动单元长度
	// 			numToMove = option.numToMove > option.unitDisplayed ? option.unitDisplayed : option.numToMove,
	// 			scrollTargetSize = scrollUnits.length * unitLen,      //滚动目标的宽度 
	// 			offset = 0,    //最大移动长度
	// 			offsetnow = 0,    //当前移动长度
	// 			movelength = unitLen * numToMove,     //一次移动的长度
	// 			moving = false,     //标志当前是否在移动
	// 			loop = option.loop,
	// 			speed = option.speed,
	// 			btnRight = $(option.element).find('.' + option.btnNext),      //下一页的目标元素
	// 			btnLeft = $(option.element).find('.' + option.btnPrev);       //上一页的目标元素

	// 		option = {
	// 			scrollTarget: scrollTarget,
	// 			viewedSize: viewedSize,
	// 			scrollUnits: scrollUnits,
	// 			unitLen: unitLen,
	// 			unitDisplayed: option.unitDisplayed,
	// 			numToMove: numToMove,
	// 			scrollTargetSize: scrollTargetSize,
	// 			margin: option.margin,
	// 			offset: offset,
	// 			offsetnow: offsetnow,
	// 			movelength: movelength,
	// 			moving: moving,
	// 			loop: loop,
	// 			speed: speed,
	// 			btnRight: btnRight,
	// 			btnLeft: btnLeft
	// 		};
	// 		_main(option);
	// 	}

	// 	function _main(option) {
	// 		option.btnRight.unbind('click');
	// 		option.btnLeft.unbind('click');
	// 		if(option.scrollTargetSize > option.viewedSize){
	// 			option.btnLeft.hide();
	// 			option.btnRight.show();
	// 			option.offset = option.scrollTargetSize - option.viewedSize;
	// 		} else {
	// 			option.btnLeft.hide();
	// 			option.btnRight.hide();
	// 		}

	// 		if(option.loop) {
	// 			if(!option.moving) {
	// 				option.moving = true;
	// 				option.offsetnow += option.movelength;
	// 				if(option.offsetnow < option.offset) {
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', -option.offsetnow + 'px');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: -option.offsetnow}, 1000, '', function(){option.moving = false;});
	// 				} else {
	// 					option.offsetnow = option.offset + option.margin;
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', -option.offsetnow + 'px');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: -option.offsetnow}, option.speed, '', function(){option.moving = false;});
	// 					$(this).hide();
	// 				}
	// 				option.btnLeft.show();
	// 			}
	// 		}

	// 		option.btnLeft.click(function(){
	// 			if(!option.moving) {
	// 				option.moving = true;
	// 				option.offsetnow -= option.movelength;
	// 				if(option.offsetnow > 0){
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', -option.offsetnow + 'px');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: - option.offsetnow}, option.speed, '', function(){option.moving = false;});
	// 				}else{
	// 					option.offsetnow = 0;
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', '0');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: 0}, option.speed, '', function(){option.moving = false;});
	// 					$(this).hide();
	// 				}
	// 				option.btnRight.show();
	// 			}
	// 			return false;
	// 		});

	// 		option.btnRight.click(function(){
	// 			if(!option.moving) {
	// 				option.moving = true;
	// 				option.offsetnow += option.movelength;
	// 				if(option.offsetnow < option.offset) {
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', -option.offsetnow + 'px');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: -option.offsetnow}, option.speed, '', function(){option.moving = false;});
	// 				} else {
	// 					option.offsetnow = option.offset + option.margin;
	// 					// setTimeout(function() {
	// 					// 	option.scrollTarget.css('left', -option.offsetnow + 'px');
	// 					// 	option.moving = false;
	// 					// }, 0);
	// 					option.scrollTarget.animate({left: -option.offsetnow}, option.speed, '', function(){option.moving = false;});
	// 					$(this).hide();
	// 				}
	// 				option.btnLeft.show();
	// 			}
	// 			return false;
	// 		});

	// 		option.scrollTarget.animate({left: 0}, 0, '', function(){option.moving = false;});
	// 	}

	// 	return {
	// 		init: _init
	// 	};
	// }());

	// exports.init = slider.init;
});