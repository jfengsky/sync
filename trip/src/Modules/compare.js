/**
 * @Author : hbmu
 * @Date   : 2014/03/21
 * @Desc   : 产品比较
 */

define(function(require, exports, module) {
	require('../public/localStorage');
	var $ = require('../../../lib/jquery'),
			tpl = require('../tpl/modules/compare.html.js'),
			tplLi = '<li data-id="{{ProductID}}">\
				<div class="compare_product_wrap">\
					<a href="{{Url}}" class="compare_pic"><img src="{{PicUrl}}" alt="" width="125" height="70" target="_blank"></a>\
					<a class="compare_name" href="{{Url}} target="_blank"">{{Name}}</a>\
					<p class="compare_price">\
						<span class="place">{{ProductDepartureCity}}</span>\
						<span class="base_price">\
							{{#if MinPrice}}\
								<dfn>¥</dfn><strong>{{MinPrice}}</strong>起\
							{{else}}\
								实时计价\
							{{/if}}\
						</span>\
					</p>\
					<a class="clean" href="###"></a>\
				</div>\
			</li>';

	Handlebars.registerHelper('help', function(i) {
	  return i+1;
	});

	var compare = {
		init: function(options) {
			var self = this,
					template = Handlebars.compile(tpl),
					templateLi = Handlebars.compile(tplLi),
					compareBox,
					productUl,
					begin,
					compareShow,
					compareTip;

			var objData = compare.readData();

			$(template({list: objData.data, visible: objData.visible})).appendTo(options.parentSelector);

			compareBox = $(options.parentSelector).find('.compare_fixed');
			productUl = compareBox.find('ul:eq(0)');
			begin = compareBox.find('.begin');
			compareShow = compareBox.prev('.compare_show');

			// fixed兼容IE6
			var isIE6 = 'undefined' == typeof (document.body.style.maxHeight),
					timer;
			$(window).on('scroll resize', function() {
				var boxHeight = compareBox.height(),
						showHeight = compareShow.height();
				if(isIE6) {
					compareBox.css('position','absolute');
					compareBox.prev().css('position','absolute');
					timer && clearTimeout(timer);
					timer = setTimeout(function() {
						compareBox.css('top', $(window).height() + $(document).scrollTop() - boxHeight)
						compareBox.prev().css('top', $(window).height() + $(document).scrollTop() - showHeight)
					}, 200);
				}
			})

			compare.ajaxInit(); // 初始化对比按钮

			compareBox
				.on('click', '.clean', function(){ // 删除某个产品
					var objData = compare.readData();
					var li = $(this).closest('li');
					for(var i = 0; i < objData.data.length; i++) { // 本地数据处理
						if(objData.data[i].ProductID == li.data('id')) {
							compare.removeData(objData, i);
						}
					}
					$('a.compare_in').each(function(i) { // 加入按钮处理
						var data = $(this).data('compare');
						typeof data === 'string' && (data = cQuery.parseJSON(data));
						if(data.ProductID == li.data('id')) {
							$(this).show().next().hide();
						}
					});
					li.remove(); // 对比栏处理
					return false;
				})
				.on('mouseenter', '.compare_product_wrap', function(){  // 鼠标移入对比栏相应产品，显示删除按钮
					$(this).addClass('compare_product_hover')
				})
				.on('mouseleave', '.compare_product_wrap', function(){
					$(this).removeClass('compare_product_hover')
				})
				.find('.compare_hidden').click(function() { // 对比栏隐藏
					var objData = compare.readData();
					compare.show(objData, false);  // 对比栏显隐标示
					compareBox.hide();
					return false;
				})
				.end()
				.find('.clean_all').click(function() { // 清除产品
					var objData = compare.readData();
					productUl.find('li').remove(); // 对比栏处理
					objData.data = []; // 本地数据处理
					compare.writeData(objData)
					$('a.compare_in').each(function() { // 加入按钮处理
						$(this).show().next().hide();
					})
					return false;
				})
			compareShow.click(function() { // 对比栏显隐
				var objData = compare.readData();
				if(compareBox.is(':visible')) {
					compare.show(objData, false);  // 对比栏显隐标示
					compareBox.hide();
				}else {
					compare.show(objData, true);  // 对比栏显隐标示
					compareBox.show();
				}
				return false;
			})
			

			$('body').on('click', 'a.compare_in', function(e) { // 新增产品

				var $this = $(this),
						data = $this.data('compare');

				var objData = compare.readData();

				compareBox.show();
				compare.show(objData, true);  // 对比栏显隐标示

				if(objData.data.length >= 3) {
					// compareBox.find('.error_notice').stop(true, true).fadeIn().delay(3000).fadeOut();
					var x = $this.offset().left,
         			y = $this.offset().top;
         	if(!compareTip) {
         		compareTip = '<div id="compareTip" class="more_del_up"><span style="position: absolute;right:30px;"><b></b><i></i></span><div class="more_del_info"><em></em>最多能添加3条线路，<br>请删除部分线路后再加入。</div></div>'
         		$(compareTip)
         			.appendTo('body')
         			.find('em').click(function() {
								$(this).closest('.more_del_up').hide();
							})
         	}
       		$('#compareTip').css({left: x - 130, top: y + 30}).show();
					return false;
				}

				typeof data === 'string' && (data = cQuery.parseJSON(data));

				options.isDecode && (data.Name = decodeURIComponent(data.Name)) // 产品名称转码

				for(var i = 0; i < objData.data.length; i++) {
					if(objData.data[i].ProductID === data.ProductID) {
						return false;
					}
				}

				$this.hide().next().show(); // 加入按钮处理

				$(templateLi(data)).appendTo(productUl[0]); // 对比栏处理

				
				objData.data.push(data); // 本地数据处理
				compare.writeData(objData);

				return false;
			})

			$('body').on('click', 'a.compare_selected', function(e) { // 取消产品对比（按钮）

				var objData = compare.readData();
				var data = $(this).prev().data('compare');
				typeof data === 'string' && (data = cQuery.parseJSON(data));
				for(var i = 0; i < objData.data.length; i++) { // 本地数据处理
					if(objData.data[i].ProductID == data.ProductID) {
						compare.removeData(objData, i);
					}
				}

				productUl.find('[data-id="'+data.ProductID+'"]').remove(); // 对比栏处理
				$(this).hide().prev().show(); // 加入按钮处理

				compareBox.show();
				compare.show(objData, true);  // 对比栏显隐标示

				return false;
			})


			begin.click(function(e) { // 对比跳转按钮

				var data = compare.readData().data,
						productIDs = [];
				if(data.length > 1) {
					for(var i = 0; i < data.length; i++) {
						productIDs.push(data[i].ProductID)
					}
					window.open('/Booking/ProductComparisonDetail.aspx?ProductIDs=' + cQuery.stringifyJSON(productIDs) + '&SalesCity=' + options.SalesCity + '&IsDetail=true')
				}
				return false;

			})  

		},
		readData: function() {
			var strData = localStorage.getItem('GV_compare') || '{}';
			var objData = cQuery.parseJSON(strData);

			objData.data = objData.data || [];
			objData.visible = objData.visible || false;

			return objData;
		},
		removeData: function(objData, i) {
			objData.data.splice(i,1);
			compare.writeData(objData)
		},
		show: function(objData , bool) {
			objData.visible = bool;
			compare.writeData(objData)
		},
		writeData: function(objData) {
			var strData = cQuery.stringifyJSON(objData)
			localStorage.setItem('GV_compare', strData)
		},
		ajaxInit: function() {	// 初始化对比按钮
			var objData = compare.readData();
			for(var i = 0; i < objData.data.length; i++) {
				$('a.compare_in').each(function() {
					var data = $(this).data('compare');
					typeof data === 'string' && (data = cQuery.parseJSON(data));
					if(objData.data[i].ProductID == data.ProductID) {
						$(this).hide().next().show();
					}
				})
			}
		}
	}

	module.exports = {
		init: compare.init,
		ajaxInit: compare.ajaxInit
	}

})