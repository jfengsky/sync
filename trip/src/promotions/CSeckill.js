define(function(require, exports, module) {
	var $ = require("../../../lib/jquery.js"),
		Slider = require('./slider.js'),
		Tabs = require('./tabs.js'),
		CountDown = require('./countDown.js'),
		updataStore = require('./UpdataStore'),
		intervalupdata = new updataStore('/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx', 'all', 120),
		nextperiod = require('./nextperiod'),
		sections = $('.topics_part0'),
		curSection = 0,
		currentTime = +$('#hfNow').val(), // 当前时间
		startTime = +$('#hfTime').val().split(',')[0], // 秒杀开始时间
		endTime = +$('#hfTime').val().split(',')[1], // 秒杀结束时间
		nextStartTime = $('#hfTime').val().split(',')[2] - 0;

	for (var i = 0, l = sections.length; i < l; i++) {
		if ($(sections[i]).attr('data') === 'block') {
			curSection = i;
			break;
		}
	}
	$('.secKill_review').hide();

	function showSlider() {
	    var j_secKill_review_details_ul = $('#j_secKill_review_details ul');
	    j_secKill_review_details_ul.css('width', '100000px');
	    $.getJSON('/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx?type=history', function (result) {
	        $.each(result, function (i, element) {
	            var tempPrice = '<span class="rmb">&yen;</span><span>' + element.PromotionPrice + '</span>';
	            if (element.PromotionPrice <= 0) {
	                tempPrice = '<span>实时计价</span>';
	            };
	            j_secKill_review_details_ul.append('<li title="' + element.ProductName + '">\
					<div class="pic"><img src="' + element.ImageUrl + '" alt="' + element.ProductName + '"></div>\
					<h3 class="title">' + element.ProductName + '</h3>\
					<div class="price">\
						<span class="price_active">' + tempPrice + '</span>\
						<span class="price_market">\
						<span class="rmb">&yen;</span>\
						<span>' + element.MarketPrice + '</span></span>\
					</div>\
				</li>');
	        });
	        // <div class="discount"><span>立减</span>' + (element.MarketPrice - element.PromotionPrice) + '</div>\
	        // Slider.init({element: '#j_secKill_review_details'});
	        Slider
	        	.init('#j_secKill_review_details')
	        	.run();
	    });
	    $('.secKill_review').show();
	}


	/**
	 * 1.	Tab下如果没有产品，整个栏目隐藏
	 */
	$.each($('#j_container ul.products_list'), function(index, items){
		if($(items).find('li').size() <= 0){
			$(items).hide();
			$(items).prev('.hd_title').hide();
		}
	})




	/**
	 * 活动还没开始
	 * 		距离活动开始时间＞24小时，就显示“距秒杀开始还剩**天**小时**分钟”的倒计时。
	 */
	function Killdown(){
		var self = this,
				startMessage = "距秒杀开始还剩",
				endMessage = "距秒杀结束还剩",
				countdown = new CountDown(),
				// nextStartTime = nextStartTime, // 下期秒杀开始时间
				nextHasRender = true, // 是否还未更新敬请期待
				hasbegin = false,     // 是否已更新即将开始
				topicsProgressLi = $('.topics_progress li'),
				productList = $('.p_list_item'),
				opacitySet = $('.opacity'),
				currentLeft = 0,
				hourMS = 3600000;

		this._dayTpl = function(data){
			return startMessage + '<span class="remain_time_bg">' + data.d + '</span>天<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分'
		};
		this._startTpl = function(data){
			return startMessage + '<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟<span class="remain_time_bg">' + data.s + '</span>秒'
		};
		this._endTpl = function(data){
			return endMessage + '<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟<span class="remain_time_bg">' + data.s + '</span>秒'
		};

		/**
		 * 在活动的抢购时间内，如果所有站点的产品全部卖完了，那么显示提示话术“本期秒杀产品已售罄 更多优惠 请期待下期”
		 */
		this._sellEmpty = function(){
			countdown.clear();
			$('#j_remain_time').html('本期秒杀产品已售罄 更多优惠 请期待下期');
		};

		/**
		 * 敬请期待
		 * @return 
		 */
		this._commingSoon = function(){
			intervalupdata.stop();
			// 获取标记判断页面是否显示的下期预告，是：跳过，否：请求接口向页面写入数据
			if ($('#hHasNext').val() === 'false') {
				new nextperiod('/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx').init();
			};
			topicsProgressLi.removeClass('current');
			topicsProgressLi.eq(2).addClass('current');
			// 如果出发班期是0001-01-01 则隐藏
			$.each(productList.find('.summary'), function(idx, item){
				var tempDate = $(item).find('.depart_date');
						str = tempDate.text();
						if(str && str.slice(5) == '0001-01-01'){
							tempDate.remove();
						}
			});
			// $.each(productList.find('.depart_date').text(), function(index, item){
			// 	console.log(item);
			// });

			// productList.find('.summary').remove();
			productList.find('.opacity').remove();
			$('#j_container .btns').html('<a href="javascript:void(0)" target="_blank" title="敬请期待">敬请期待</a>');
			showSlider();
		};

		/**
		 * 正在秒杀阶段 
		 */
		this._killing = function(){
			intervalupdata.init(function(){
				self._sellEmpty();
			});
			topicsProgressLi.removeClass('current');
			topicsProgressLi.eq(1).addClass('current');
		};

		/**
		 * 即将开始
		 * @return {[type]} [description]
		 */
		this._toBegin = function(){
			intervalupdata.stop();
			topicsProgressLi.removeClass('current');
			topicsProgressLi.eq(0).addClass('current');
			$('#j_container .btns').html('<a href="javascript:void(0)" target="_blank" title="即将开始">即将开始</a>');
			for (var i = 0, l = opacitySet.length; i < l; i++) {
			 	currentLeft = $(opacitySet[i]).html().substr(5);
			 	if (currentLeft <= 0) {
			   	$(opacitySet[i]).hide();
			 	}
			}
		};

		/**
		 * 倒计时 显示DD:HH:MM 秒杀开始前 >24小时才有
		 * @param  {Number} sTime 倒计时开始时间(ms)
		 * @param  {Number} eTime 倒计时结束时间(ms)
		 * @return {[type]}       [description]
		 */
		this._showDay = function(sTime, eTime){
			countdown.clear();
			if(!eTime){
				$('#j_remain_time').html('更多优惠 请期待下期');
				return
			} else {
				if(eTime - sTime > 86400000){
					countdown.init({
						startTime: sTime,
						endTime: eTime,
						intervalback: function(data){
							$('#j_remain_time').html(self._dayTpl(data));
							if(data.c <= 86400000){
								self._showSecond( (eTime - 86400000) ,eTime, self._startTpl, false);
							}
						}
					});
				} else {
					self._showSecond(sTime, eTime, self._startTpl, false);
				}
			}
		};

		/**
		 * 倒计时 显示HH:MM:SS 秒杀开始前 <24 或者秒杀阶段才有
		 * @param  {Number} sTime  倒计时开始时间(ms)
		 * @param  {Number} eTime  倒计时结束时间(ms)
		 * @param  {[type]} tpl    显示模板(秒杀开始文案模板or秒杀结束文案模板)
		 * @param  {[type]} status 当前状态(秒杀开始前[false] or 秒杀阶段 [true])
		 * @return {[type]}        [description]
		 */
		this._showSecond = function(sTime, eTime, tpl, status){
			countdown.clear();
			countdown.init({
				startTime: sTime,
				endTime: eTime,
				intervalback: function(data){
			    $('#j_remain_time').html(tpl(data));
			    if( data.c < (3 * hourMS) && !status && !hasbegin){
			    	self._toBegin();
			    	hasbegin = true;
			    }
				},
				callback: function(){
					if(status){		// 跳转到秒杀结束阶段模板
						self._showDay(endTime, nextStartTime);
						if(nextHasRender){
							self._commingSoon();
							nextHasRender = false;
						}
					} else {			// 跳转到正在秒杀阶段模板
						self._killing();
						self._showSecond(currentTime, endTime, self._endTpl, true);
					}
				}
			});
		};

		this.init = function(){
			/*
			 * 先判断是否秒杀阶段 立即更新库存，再判断其它阶段
			 */
			
			if (currentTime >= startTime && currentTime <= endTime) {					// 正在秒杀阶段
				self._killing();
				self._showSecond(currentTime, endTime, self._endTpl, true);
			} else {
				if( startTime - currentTime < 86400000 ){	// 准备阶段 小于1天
					if(currentTime < startTime - hourMS * 3){
						self._commingSoon()
					} else {
						self._toBegin()
					}
					self._showSecond(currentTime, startTime, self._startTpl, false);
				} else { // 准备阶段大于1天
					self._commingSoon()
					self._showDay(currentTime, startTime);
				}
			}
		}
	}
  


	

	new Killdown().init();

	// function render(tpl, data, handle, cb) {
	// 	var Template = Handlebars.compile(tpl);
	// 	var html = Template(data);
	// 	return html;
	// }

	// function twoCountDown(currentTime) {
	// 	var topicsProgressLi = $('.topics_progress li'),
	// 		productList = $('.p_list_item'),
	// 		hourMS = 3600000,
	// 		opacitySet = $('.opacity'),
	// 		currentLeft = 0;
	// 	topicsProgressLi.removeClass('current');
	// 	if (currentTime < startTime && currentTime >= startTime - hourMS * 3) {
	// 		// TODO 
	// 		$('#j_container .btns').html('<a href="javascript:void(0)" target="_blank" title="即将开始">即将开始</a>');
	// 		for (var i = 0, l = opacitySet.length; i < l; i++) {
	// 			currentLeft = $(opacitySet[i]).html().substr(5);
	// 			if (currentLeft <= 0) {
	// 				$(opacitySet[i]).hide();
	// 			}
	// 		}
	// 		intervalupdata.stop();
	// 		topicsProgressLi.eq(0).addClass('current');
	// 		// CountDown.init({element: $('#j_remain_time'), tpl: Cseckill.tpl.tStartTime, currentTime: currentTime, endTime: startTime, callback: twoCountDown});
	// 	}

	// 	if (currentTime >= startTime && currentTime < endTime) {
	// 		intervalupdata.init();
	// 		topicsProgressLi.eq(1).addClass('current');
	// 		// CountDown.init({element: $('#j_remain_time'), tpl: Cseckill.tpl.tEndTime, currentTime: currentTime, endTime: endTime, callback: twoCountDown});
	// 	}

	// 	if (currentTime >= endTime || currentTime < startTime - hourMS * 3) {
	// 		intervalupdata.stop();
	// 		// 获取标记判断页面是否显示的下期预告，是：跳过，否：请求接口向页面写入数据
	// 		if ($('#hHasNext').val() === 'false') {
	// 			new nextperiod('/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx').init();
	// 		}
	// 		topicsProgressLi.removeClass('current');
	// 		topicsProgressLi.eq(2).addClass('current');
	// 		productList.find('.summary').remove();
	// 		productList.find('.opacity').remove();
	// 		productList.find('.basefix').attr('class', 'waiting basefix').html('<div class="btns"><a href="#" target="_blank" title="敬请期待">敬请期待</a></div>');
	// 		$('#j_remain_time').html(render(Cseckill.tpl.tNextRushBuy, {
	// 			rushBuyOver: '本期秒杀已结束  更多优惠 请期待下期'
	// 		}));
	// 		showSlider();
	// 	}
	// }

	function init() {
		Tabs.init('#j_topics_tabs_handle', '#j_container', curSection);
		// twoCountDown(currentTime);
	}

	// 回到顶部
	$('#J_scrolltop').click(function() {
		$(window).scrollTop(0);
	});
	// 收藏
	$('#J_fav').click(function() {
		try {
			window.external.addFavorite(document.location.href, document.title);
		} catch (e) {
			try {
				$(this).attr('title', document.title).attr('href', document.location.href);
				window.sidebar.addPanel(document.title, document.location.href, "");
			} catch (e) {
				if (navigator.userAgent.indexOf("Firefox") > -1) {
					return;
				} else {
					$(this).attr('href', 'javascript:;');
					alert("加入收藏失败，请使用Ctrl+D手工添加");
				}
			}
		};
	});
	exports.init = init;
});