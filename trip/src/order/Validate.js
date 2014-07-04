define(function (require) {
    var $ = require('jquery');
    var orderprocess;
	//function () {//验证提示
    var statistics = []; //记录

    function ubt_userblock_post(el, msg) {
        if (!el) return false;
        var ct = 'validateCount', count = cQuery(el).data(ct);
        !count ? cQuery(el).data(ct, 1) : cQuery(el).data(ct, count + 1);
        window.__bfi.push(['_trackUserBlock', {
            'dom': (el.id && ('id:' + el.id)) || (el.name && ('name:' + el.name)) || '',
            'value': el.value || '',
            'type': (el.tagName ? 'dom:' + el.tagName.toLowerCase() : '') + (el.type ? ':' + el.type : ''),
            'form': el.form ? ((el.form.id && ('id:' + el.form.id)) || (el.form.name && ('name:' + el.form.name))) : '',
            'message': msg || '',
            'count': cQuery(el).data(ct)
        }]);
    }

	var _userTrack = function () {//用户记录
		if (statistics.length) {
			for (var i = 0; i < statistics.length; i++) {
				ubt_userblock_post(statistics[i].params.target, statistics[i].params.data || '');
			}
		}
	};
	var ins = function (opts) {
		var _defaults = {
			zIndex: 999,
			errorClass: "f_error",
			removeErrorClass: true,
			isFocus: false,
			srollHeight: 0,
			srollWidth: 0,
			target: null,
			$obj: null,
			isAutoHide: false,
			hideSpeed: 2000,
			/**显示后调用*/
			show: function () { },
			/**隐藏后调用*/
			hide: function () { },
			/**位置*/
			position: "rm_lm",
			templs: {
				tipTempl: '<div id={{tipId}} class="{{tip}}"  style="min-width:{{minWidth}}px; width:{{maxWidth}}px;_width:{{minWidth}}px; width:auto !important;max-width:{{maxWidth}}px;overflow:hidden;display:block;z-index:99;margin:0;padding:0;left:0px;top:0px;overflow:hidden;position:absolute;padding-left:16px;"><div class="{{box}} {{boxType}} {{boxArrow}}" id={{boxId}}><b class="{{arrow}}" id={{arrowId}}></b><div class={{content}} id={{contentId}}></div></div>',
				contentTpl: '<div class="jmp_bd">{{{txt}}}</div>'
			},
			css: {
				//最大宽度
				maxWidth: "370",
				//最小宽度
				minWidth: "50"
			},
			classNames: {
				//浮动层最外层的类
				tip: 'book_jmpinfo',
				//浮动层的类
				box: 'base_jmp',
				//浮动层类型的类
				boxType: 'jmp_alert',
				boxArrow: 'base_jmp_t',
				//浮动层箭头的类
				arrow: 'tri_l',
				//浮动层加载时的类
				loading: 'jmp_loading',
				//浮动层内容的类
				tipContent: 'jmp_content'
			},
			ids: {
				boxId: "boxId",
				arrowId: "arrowId",
				loadingId: "loadingId",
				contentId: "contentId"
			},
			/**提示内容*/
			data: "提示信息!",
			/**样式*/
			styles: ".book_jmpinfo {margin: 20px;color: #666;font: 12px/2 Arial,Tahoma,simsun;-webkit-text-size-adjust: none;}.book_jmpinfo ul,li{list-style: none;}.book_jmpinfo a{color: #00c;cursor: pointer;text-decoration: none;}.book_jmpinfo a: hover{color: #f00;text-decoration: underline;}.book_jmpinfo .font16{font-size: 16px;}.book_jmpinfo .jmp_hd{height:30px; padding-left:10px; background:url(http://pic.c-ctrip.com/common/un_base_btn.png) repeat-x 0 -390px; font-size:12px; line-height:30px; color:#333;} .book_jmpinfo .jmp_hd h3{font-size: 12px;} .book_jmpinfo .jmp_bd{padding: 2px 3px!important;}  .book_jmpinfo .jmp_alert{border: 1px solid #ffb533; background: #fff5d1;} .book_jmpinfo .base_jmp b{position: absolute; width: 16px; height: 16px; background-image: url(http://pic.c-ctrip.com/common/un_jmp_tri.png); left:10px;top:24px;background-repeat: no-repeat; overflow: hidden;} .book_jmpinfo .base_jmp_t{margin-top: 8px;} .book_jmpinfo .base_jmp_r{margin-right: 8px;} .book_jmpinfo .base_jmp_b{margin-bottom: 7px;} .book_jmpinfo .base_jmp_l{margin-left: 8px;} .book_jmpinfo .base_jmp_t b{margin-top: -7px;} .book_jmpinfo .base_jmp_r b{margin-top: 10px; right: 0;} .book_jmpinfo .base_jmp_b b{bottom: -8px;} .book_jmpinfo .base_jmp_l b{margin-top: 10px; left: 9px;}  .book_jmpinfo .jmp_title .tri_b{background-position: -32px -32px;} .book_jmpinfo .jmp_alert .tri_t{background-position: -16px 0;} .book_jmpinfo .jmp_alert .tri_r{background-position: -16px -16px;} .book_jmpinfo .jmp_alert .tri_b{background-position: -16px -32px;} .book_jmpinfo .jmp_alert .tri_l{background-position: -16px -48px;} .book_jmpinfo .jmp_table .tri_t{background-position: -32px 0;}.f_error {background-color: #FFF7D9 !important; border-color: #D80000 #E50000 #E50000 #D80000 !important; border-style: solid; border-width: 1px;}"
		};
		this.params = $.extend(_defaults, opts);
		this.oid = null;
		this.timeid = null;
		this.init();
	};
	ins.prototype = {
		init: function () {
			this.creatStyle(this.params.styles);
			this.creatContainer();
			this.creatContent();
			if (orderprocess) {
				statistics.push(this);
				orderprocess.insStatistics = statistics;
				_userTrack();
			}
		},
		creatStyle: function (styles) {//加入样式
			var doc = document;
			if (!doc.styles) {
				if (! -[1, ]) {
					var styleSheet = doc.createStyleSheet();
					styleSheet.cssText = styles;
				} else {
					var sty = doc.createElement('style');
					sty.type = "text/css";
					sty.textContent = styles;
					doc.getElementsByTagName('head')[0].appendChild(sty)
				}
				doc.styles = true;
			} else {
				return;
			}
		},
		uid: function () {
			var target = this.params.target;
			var base = 'abcdefghijklmnopqrstuvwxyz';
			var _i = 0,
				rd = function () {
					return Math.random() * 26;
				},
				md = new Date,
				wd = [],
				ret;
			for (_i = 0; _i < 5; _i++) {
				wd.push(base.charAt(rd()));
			}
			ret = 'uid' + wd.join('') + md.getTime();
			$(target).data('uid', ret);
			return ret;
		},
		show: function (opts) {
			var me = this;
			var opts = $.extend(this.params, opts);
			var pos;
			opts.$obj = opts.$obj ? opts.$obj : opts.target;
			if (opts.errorClass) {
				$(opts.$obj).addClass(opts.errorClass);
			}
			if (opts.data) {
				this.contentId.children().html(opts.data);
			}
			pos = this.getPos();
			this.tipId.css({
				top: pos.top,
				left: pos.left
			}).show();
			this.arrowId.css({
				top: pos.arrow.top
			});
			if (opts.isAutoHide) {
				if (this.timeid) clearTimeout(this.timeid);
				this.timeid = setTimeout($.proxy(this.hide, this), opts.hideSpeed);
			}
			$(opts.$obj).bind('focus', function () {
				me.hide({ $obj: this });
			});
			return this;
		},
		setPos: function (opts) {
			var pos = this.getPos();
			if (parseInt(this.tipId.css('top')) > 0) {
				this.tipId.css({
					top: pos.top,
					left: pos.left
				});
				this.arrowId.css({
					top: pos.arrow.top
				});
			}
		},
		hide: function (opts) {
			var opts = $.extend(this.params, opts);
			opts.$obj = opts.$obj ? opts.$obj : opts.target;
			if (opts.removeErrorClass) {
				$(opts.$obj).removeClass(opts.errorClass);
			}
			this.tipId.css({
				top: '-9999em',
				left: '-9999em'
			});
		},
		render: function (tpl, data) {
			var Template = Handlebars.compile(tpl);
			return html = Template(data);
		},
		creatContainer: function () {
			var opts = this.params;
			var uid = this.oid || (this.oid = this.uid());
			var oid = '#' + uid;
			if (!$(oid).length) {
				var bb = $('<div/>').html(this.render(opts.templs.tipTempl, {
					tipId: uid,
					boxId: opts.ids.boxId,
					arrowId: opts.ids.arrowId,
					loadingId: opts.ids.loadingId,
					contentId: opts.ids.contentId,
					tip: opts.classNames.tip,
					box: opts.classNames.box,
					boxType: opts.classNames.boxType,
					boxArrow: opts.classNames.boxArrow,
					arrow: opts.classNames.arrow,
					maxWidth: opts.css.maxWidth,
					minWidth: opts.css.minWidth,
					minHeight: opts.css.minHeight,
					content: opts.classNames.tipContent
				})).children().css({
					'top': '-9999em',
					'left': '-9999em'
				}).appendTo('body');

			}
			this.tipId = $("#" + uid);
			this.boxId = $("#" + opts.ids.boxId, oid);
			this.arrowId = $("#" + opts.ids.arrowId, oid);
			this.loadingId = $("#" + opts.ids.loadingId, oid);
			this.contentId = $("#" + opts.ids.contentId, oid);
			// $('#'+uid)[0].style.zIndex = opts.zIndex;
		},
		creatContent: function () {
			var opts = this.params;
			var html = this.render(opts.templs.contentTpl, {
				"txt": opts.data
			});
			this.contentId.html(html);
		},
		getPos: function () {
			var opts = this.params;
			var pos = opts.position.split("_")
			var targ = {};
			var tip = {};
			tip.pos = {
				width: parseInt(this.tipId[0].offsetWidth, 10),
				height: parseInt(this.tipId[0].offsetHeight, 10)
			}
			targ.pos = $(opts.target).offset();
			tip.arrow = {
				top: (parseInt(this.tipId.outerHeight()) - parseInt(this.arrowId.outerHeight())) / 2 + 12
			};
			var targ_left = targ.pos.left;
			var targ_top = targ.pos.top;
			var targ_width = $(opts.target).width();
			var targ_height = $(opts.target).height();
			var tip_width = tip.pos.width;
			var tip_height = tip.pos.height;
			var tipDot = {
				lm: {
					left: targ_left,
					top: targ_top - tip_height / 2,
					offsetX: 0,
					offsetY: 0
				},
				rm: {
					left: targ_left - tip_width,
					top: targ_top - tip_height / 2,
					offsetX: 0,
					offsetY: 0
				}
			}
			var targDot = {
				"lm": [0, targ_height / 2, "left", "Middle"],
				"rm": [targ_width, targ_height / 2, "right", "Middle"]
			};
			var tp = tipDot[pos[1]];
			var tg = targDot[pos[0]];
			var left = tp.left + tg[0];
			var top = tp.top + tg[1];
			var arrow = tip.arrow;
			var offsetX = tp.offsetX;
			var offsetY = tp.offsetY;
			var ret = {
				left: left,
				top: top,
				arrow: tip.arrow
			}
			return ret;
		}
	};
    //询问红卫之后， 这个是 order/pgk_book_fill.js 必须用的，整个验证会用，而其他的页面如果引用这个模块，无需设置
	ins.setOrderprocess = function (_orderprocess) {
	    orderprocess = _orderprocess;
	};
	return ins;
	//} ()
});