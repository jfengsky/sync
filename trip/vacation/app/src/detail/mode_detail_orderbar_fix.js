define(function (require, exports, module) {
	var $ = require('jquery');
	var _ = require('underscore');
	var util = require('./mod_util');

	var win = $(window);
	var orderNode;

	var bar;
	var smallCalendar;
	//var orderPaddingTop;

	var STATUS = {
	    STATIC: 'static',
        FIXED: 'fixed'
	};
    //exports.STATUS = STATUS;
	var CLASS_NAME = {
        // 粗底边
	    FIXED: 'price_bar_fixed_page',
	    // 细底边
	    FIXED_NO_BOTTOM: 'price_bar_fixed'
	};

	bar = {
	    _barStatus: STATUS.STATIC,
	    _barPrevStatus: STATUS.STATIC,
		init: function () {
			// 这个节点是每次都会重新生成的，html整块被替换了
			this.nodeBar = this.getOrderNode().find('.resource_price_wrap');
			this.caclAvaliableRange();
			this.bindWinScroll();

			this.comparePosition();
		},
		getOrderNode: function () {
			if (!orderNode) orderNode = $('#js_order');
			return orderNode;
		},
		bindWinScroll: function () {
			if (!this._isBindedWinScroll) {
			    $(window).on('scroll', _.bind(this.onWinScroll, this));
				this._isBindedWinScroll = true;
			}
		},
		comparePosition: function () {
			var scrollTop = win.scrollTop();
			var range = this.availableRange;
			/*if (scrollTop > range.max) {
			    this.switchBarStatus(true, false);
			}
			else if (scrollTop > range.min) {
				this.switchBarStatus(true, true);
			}*/
			if(scrollTop > range.min && scrollTop < range.max){
			    this.switchBarStatus(true);
			}
			else {
				this.switchBarStatus(false);
			}
		},
		caclAvaliableRange: function () {
			var offset = this.getOrderNode().offset();
		    // 包含 padding & border & margin
			var orderNode = this.getOrderNode(), height;
            // 因为loading 有 图片，而图片此时还没有加载上来，过一会才会出来，所以此时高度计算不准确，干脆写死算了
			if(orderNode.find('.detail_loading').length){
			    height = 169;
			}
			else{
			    height = orderNode.outerHeight(true)
			}

			var barNode = this.getOrderNode().find('.resource_price_wrap');
			// 包含 padding & border
			var barHeight = barNode.outerHeight();

			this.availableRange = {
				// bar 的 top 最小到这里
				min: offset.top,
				// bar 的 top 最大到这里
				max: offset.top + height - barHeight,

				barHeight: barHeight
			};
			return this.availableRange;
		},
		switchBarStatus: function (fix, noBottom) {
		    if (noBottom === undefined) noBottom = true;
		    if (fix) {
		        var nowNoBottom = this.getOrderNode().hasClass(CLASS_NAME.FIXED_NO_BOTTOM);
			    if (this._barStatus !== STATUS.FIXED || nowNoBottom != noBottom) {
			        this.getOrderNode().removeClass(noBottom ? CLASS_NAME.FIXED : CLASS_NAME.FIXED_NO_BOTTOM).addClass(noBottom ? CLASS_NAME.FIXED_NO_BOTTOM : CLASS_NAME.FIXED);

					this._barStatus = STATUS.FIXED;
				}
			}
			else if (this._barStatus !== STATUS.STATIC) {
			    this.getOrderNode().removeClass(CLASS_NAME.FIXED).removeClass(CLASS_NAME.FIXED_NO_BOTTOM);
				this._barStatus = STATUS.STATIC;
			}
		},
		onWinScroll: function () {
		    this._barPrevStatus = this._barStatus;
		    this.comparePosition();
		    GV.emit('big-order-topbar-recompared', this._barStatus, this._barPrevStatus, STATUS);
		}
	};

	exports.getStatus = function () { return bar._barStatus };
	exports.setStatus = function (status) {
	    bar._barStatus = status;
	};
	exports.comparePosition = _.bind(bar.comparePosition, bar);
	exports.STATUS = STATUS;

	exports.getInputDateNodeInfo = _.bind(function () {
	    var topbarNode = this.getOrderNode().find('.resource_price_wrap')
	    var startDateNode = this.getOrderNode().find('.start_date');
	    var inputNode = this.getOrderNode().find('#js-departure-date');
	    var offset = inputNode.offset();
	    return {
	        barPaddingTop: topbarNode.css('padding-top'),
            inputOffsetTop: offset.top,
            inputMarginTop: startDateNode.css('margin-top'),
	        inputHeight: startDateNode.outerHeight()
	    };
	}, bar);

	GV.on('html-added-to-dom', function (e) {
		if (e.type == 'fee_infos' || e.type == 'big_order') {
			bar.init();
		}
	});
	GV.on('resource-box-height-changed', function () {
		bar.init();
	});
});