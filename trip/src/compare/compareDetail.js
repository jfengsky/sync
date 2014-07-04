/**
 * @Author : hbmu
 * @Date   : 2014/03/26
 * @Desc   : 产品对比详细页
 */

define(function(require, exports, module) {

	require('http://webresource.c-ctrip.com/code/cquery/mod/calendar-3.0.js');
	var $ = require('jquery');

	(function() {
		// 获取url中的参数
		var urlStr = location.search.substr(1),
	  		arrQuery = urlStr.split("&"),
	  		ajaxData = {};

	  for(var i = 0, len = arrQuery.length; i < len; i ++) {
	  	var flag = arrQuery[i].split("=");
	    ajaxData[flag[0]] = flag[1];
	  }

		var tpl = require('../tpl/compare/compareDetail.html.js'),
				tpl1 = require('../tpl/compare/traffic.html.js'),
				// tpl2 = '{{#if flight}}\
				// 					<i class="icon_plane"></i>飞机&nbsp;\
				// 				{{/if}}\
				// 				{{#if bus}}\
				// 					<i class="icon_bus"></i>巴士&nbsp;\
				// 				{{/if}}\
				// 				{{#if ship}}\
				// 					<i class="icon_ship"></i>邮轮&nbsp;\
				// 				{{/if}}\
				// 				{{#if train}}\
				// 					<i class="icon_train"></i>火车&nbsp;\
				// 				{{/if}}',
				template = Handlebars.compile(tpl),
				template1 = Handlebars.compile(tpl1);
				// template2 = Handlebars.compile(tpl2)

		Handlebars.registerHelper('help1', function(i) {
		  return i+2;
		});
		Handlebars.registerHelper('help4', function(total, days) {
			if(days) {
				return '<dfn>¥</dfn><strong>' + Math.ceil(total/days) + '</strong>起/天\n'
			}else {
				return '日均价';
			}
		});
		Handlebars.registerHelper('help5', function(content) {
		  return content.replace(/[\r\n]/g, "").replace(/[\']/g, "\\'")
		});
		Handlebars.registerHelper('help6', function(Url, RecommendRatings, CommentUsers) {
		  if(RecommendRatings !== null) {
		  	return '<a href="' + Url + '#yhdp" target="_blank"><span class="comment">' + RecommendRatings + '</span>分</a><a href="' + Url + '#yhdp" target="_blank" class="base_txtdiv">' + CommentUsers + '人点评</a>'
		  }else {
		  	return '--'	
		  }
		});
		Handlebars.registerHelper('helpList1', function(list) {
			var height = 0,
					result = '',
					listLen = list.length;
			for(var i = 0; i < listLen; i++) {
				if(list[i].TourDinnersInfo.TourDinnersInfo.length > height) {
					height = list[i].TourDinnersInfo.TourDinnersInfo.length
				}
			}
			for(var i = 0; i < height; i++) {
				result = result + '<tr><th>第'+ (i+1) +'天</th>';

				for(var j = 0; j < listLen; j++) {
					var flag = '';
					if(list[j].TourDinnersInfo.TourDinnersInfo[i]) {
						var breakFast = list[j].TourDinnersInfo.TourDinnersInfo[i].BreakFast,
								lunch = list[j].TourDinnersInfo.TourDinnersInfo[i].Lunch,
								supper = list[j].TourDinnersInfo.TourDinnersInfo[i].Supper;

						breakFast = breakFast ? '早餐：' + breakFast : '';
						lunch = lunch ? '午餐：' + lunch : '';
						supper = supper ? '晚餐：' + supper : '';
						flag = breakFast + lunch + supper;
					}else {
						flag ='';
					}
					result = result + '<td class="td' + (j+2) + '">' + flag + '<br></td>';
				}
				result = result + '</tr>';
			}

			return result;
		});
		Handlebars.registerHelper('helpList3', function(list) {
			var height = 0,
					result = '', l
					listLen = list.length;

			for(var i = 0; i < listLen; i++) {
				if(list[i].TourHotelsInfo.length > height) {
					height = list[i].TourHotelsInfo.length
				}
			}

			for(var i = 0; i < height; i++) {  // 循环tr
				result = result + '<tr><th>第'+ (i+1) +'天</th>';

				for(var j = 0; j < listLen; j++) {  // 循环 td
					var flag = '',
							orFlag;
					if(list[j].TourHotelsInfo[i] && list[j].TourHotelsInfo[i].Hotels.length > 0) {
						for(var k = 0, len = list[j].TourHotelsInfo[i].Hotels.length; k < len; k++) { // 循环 td 中的列表
							orFlag = k === 0 ? '' : '或';
							if(list[j].TourHotelsInfo[i].Hotels[k].URL) {
								flag = flag + orFlag + '<span data-id="' + list[j].TourHotelsInfo[i].Hotels[k].HotelID + '"><a href="' + list[j].TourHotelsInfo[i].Hotels[k].URL + '" target="_blank">' + list[j].TourHotelsInfo[i].Hotels[k].Name + '</a></span><br />';
							}else {
								flag = flag + orFlag + '<span data-id="' + list[j].TourHotelsInfo[i].Hotels[k].HotelID + '">' + list[j].TourHotelsInfo[i].Hotels[k].Name + '</span><br />';
							}
						}
					}
					result = result + '<td class="td' + (j+2) + '">' + flag + '</td>'
				}
				result = result + '</tr>'
			}

			return result;
		});
		Handlebars.registerHelper('helpList2', function(list) {
			var height = 0,
					result = '',
					listLen = list.length;

			for(var i = 0; i < listLen; i++) {
				if(list[i].TourScenicsInfo.length > height) {
					height = list[i].TourScenicsInfo.length
				}
			}

			for(var i = 0; i < height; i++) {  // 循环tr
				result = result + '<tr><th>第'+ (i+1) +'天</th>';
				for(var j = 0; j < listLen; j++) {  // 循环 td
					var flag = '',
							orFlag,
							isFirst = 0;
						if(list[j].TourScenicsInfo[i] && list[j].TourScenicsInfo[i].Scenics.length > 0) {
							for(var k = 0, len = list[j].TourScenicsInfo[i].Scenics.length; k < len; k++) { // 循环 td 中的列表
								if(list[j].TourScenicsInfo[i].Scenics[k].Name) {
									isFirst++;
									orFlag = isFirst === 1 ? '' : list[j].TourScenicsInfo[i].Scenics[k].OrFlag ? ']、[' : ' 或 ';
									if(list[j].TourScenicsInfo[i].Scenics[k].URL) {
										flag = flag + orFlag + '<a href="' + list[j].TourScenicsInfo[i].Scenics[k].URL + '" target="_blank">' + list[j].TourScenicsInfo[i].Scenics[k].Name + '</a>';
									}else {
										flag = flag + orFlag + list[j].TourScenicsInfo[i].Scenics[k].Name;	
									}
								}
							}
						}
					flag !== '' && (flag = '[' + flag + ']');
					result = result + '<td class="td' + (j+2) + '">' + flag + '</td>';
				}
				result = result + '</tr>'
			}

			return result;
		});
		Handlebars.registerHelper('helpList4', function(list) {
			var result = '',
					listLen = list.length;

			for(var i = 0; i < listLen; i++) {  // 循环 td
				var flag = '',
						orFlag,
						isFirst = 0;
				for(var j = 0, len = list[i].TourShoppingInfo.Shoppings.length; j < len; j++) { // 循环 td 中的列表
					for(var k = 0, len = list[i].TourShoppingInfo.Shoppings[j].length; k < len; k++) { // 循环 Shoppings
						if(list[i].TourShoppingInfo.Shoppings[j].Scenics[k].Name) {
							isFirst++;
							orFlag = isFirst === 1 ? '' : list[i].TourShoppingInfo.Shoppings[j].Scenics[k].OrFlag ? ']、[' : ' 或 ';
							if(list[i].TourShoppingInfo.Shoppings[j].Scenics[k].URL) {
								flag = flag + orFlag + '<a href="' + list[i].TourShoppingInfo.Shoppings[j].Scenics[k].URL + '" target="_blank">' + list[i].TourShoppingInfo.Shoppings[j].Scenics[k].Name + '</a>';
							}else {
								flag = flag + orFlag + list[j].TourScenicsInfo[i].Scenics[k].Name;	
							}
						}
					}
					flag !== '' && (flag = '[' + flag + ']<br />');
					flag = flag + list[i].TourShoppingInfo.Shoppings[j].ProductsOnSale + '<br />';
				}
				result = result + '<td class="td' + (i+2) + '">' + flag + '</td>';
			}

			return result;
		});

		$.ajax({  
			url: '/Booking/Ajax/Comparison/ProductComparison.ashx',
			type: 'POST',
			dataType: 'json',
			data: {
				ProductIDs: ajaxData.ProductIDs,
				SalesCity: ajaxData.SalesCity,
				IsDetail: true
			},
			success: function(data) {
				var initData = data.data,
						len = initData && initData.length,
						starsHotel = [],
						parent = $('.vacation_bd');

				// loading移除
				parent.children('.detail_loading').remove();

				// 接口数据错误
				if(data.errno === 0) {
					parent.append(template({list: initData}));
				}else {
					parent.append('<div class="sr-nosearchresult"><i></i>很抱歉，当前页面数据加载错误，请点击<a href="javascript: location.reload()">“刷新”</a>重新加载</div>');
					return;
				};


				// 对比产品栏fixed
				var product = $('.product_box'),
						productTop = product.offset().top,
						isIE6 = 'undefined' == typeof (document.body.style.maxHeight),
						timer;
				$(window).on('scroll resize', function() {
					if($(document).scrollTop() > productTop) {
						product.css({'position': 'fixed', 'z-index': 99, 'top': 0})
						if(isIE6) { // fixed兼容IE6
							product.css('position','absolute');
							timer && clearTimeout(timer);
							timer = setTimeout(function() {
								product.css('top', $(document).scrollTop())
							}, 200);
						}
					}else {
						product.attr('style', '')
					}
				})

				// 城市切换
				$('.product_city').find('.city').click(function() {
					var $this = $(this),
							content = $(this).parent().children('.link_wrap');
					if(content.length) {
						if(content.is(':hidden')) {
							$(this).addClass('city_spread')
							content.show();
						}else {
							$(this).removeClass('city_spread')
							content.hide();
						}
					}
				}).end().on('click', '.link_wrap a', function() {
					var $this = $(this),
							parent = $this.parent(),
							StartCityId = $this.data('id'),
							ProductID = parent.data('productid'),
							EffectDate = parent.data('effectdate'),
							ExpireDate = parent.data('expiredate');

					$.ajax({  
						url: '/Booking/Ajax/Comparison/ChangeStartCity.ashx',
						type: 'POST',
						dataType: 'json',
						data: {
							ProductID: ProductID,
							SalesCity: ajaxData.SalesCity,
							StartCity: StartCityId
						},
						success: function(data) {
							var index = $this.closest('td').index('td'),
									data = data.data,
									comDom = function(selector) {
										return $(selector).children('td').eq(index)
									},
									dom1 = comDom('#city'),
									dom2 = comDom('#price'),
									dom3 = comDom('#departure'),
									dom4 = comDom('#recommend'),
									dom5 = comDom('#dayPrice'),
									dom6 = comDom('#feeInfo');

							$this.parent().hide().prev().removeClass('city_spread');


							dom1.find('.city').html($this.html()+'<b></b>');
							dom1.find('.link_wrap').html('');
							if(data.OtherDepartureCities) {
								for(var i = 0; i < data.OtherDepartureCities.length; i++) {
									dom1.find('.link_wrap').append('<a href="javascript:void(0);" data-id="'+data.OtherDepartureCities[i].ID+'">'+data.OtherDepartureCities[i].Name+'</a>')
								}
							}

							if(data.MinPrice) {
								dom2.children('.base_price').html('<dfn>¥</dfn><strong>' + data.MinPrice + '</strong>起');
								if(initData[index].Days) {
									dom5.children('.base_price').html('<dfn>¥</dfn><strong>' + Math.ceil(data.MinPrice/initData[index].Days) + '</strong>起/天\n')
								}else {
									dom5.children('.base_price').html('日均价')
								}
							}else {
								dom2.children('.base_price').html('<strong>实时计价</strong>')
								dom5.children('.base_price').html('实时计价')
							}
							dom2.children('.base_txtdiv').remove();
							if(data.MinPriceRemark) {
								dom2.append('<span class="base_txtdiv" data-role="jmp" data-params="{options:{type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_pkg_title\', content:{txt0:\'' + data.MinPriceRemark.replace(/[\r\n]/g, "").replace(/[\']/g, "\\'") + '\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\',showArrow:false}}">起价说明</span>');
							}

							dom3.html(data.DepartureDays);
							dom4.html('');
							for(var i = 0; i < data.ProductRecommends.length; i++) {
								dom4.append(data.ProductRecommends[i].DescDetail);
							}

							dom6.html('');
							for(var i = 0; i < data.FeeInfos.length; i++) {
									dom6.append(data.FeeInfos[i].TitleName + '<br />');
								for(var j = 0; j < data.FeeInfos[i].PkgDescEntitys.length; j++) {
									dom6.append(data.FeeInfos[i].PkgDescEntitys[j].Detail + '<br />');
								}
							}

							// 日历和交通
							var singleData = {
								ProductID: ProductID,
								DepartureCityID: StartCityId,
								MinPrice: data.MinPrice,
								EffectDate: EffectDate,
								ExpireDate: ExpireDate,
								SalesCityID: ajaxData.SalesCity
							};

							calendarAjax(singleData, index, initData);
						}
					});
				}).mouseleave(function() {
					$(this).find('.city').removeClass('city_spread');
					$(this).children('.link_wrap').hide();
				})


				// tip
				cQuery.mod.load('jmp','1.0',function(){
		    	var ins = cQuery(document).regMod('jmp','1.0',{cc:2});     
		    });


				// 折叠栏
				$('.btn_open').click(function(){
					var content = $(this).nextAll('div');
					if(content.is(':visible')) {
						content.slideUp();
						$(this).removeClass().addClass('btn_close')
					}else {
						content.slideDown();
						$(this).removeClass().addClass('btn_open')
					}
				})

				// 酒店星级
				$('#hotel').find('td span').each(function() { // 遍历酒店DOM，获取酒店ID
					var flag = true;
					for(var i = 0, len = starsHotel.length; i < len; i++) {
						if(starsHotel[i] === $(this).data('id')) {
							flag = false;
							break;
						}
					}
					flag &&	starsHotel.push($(this).data('id'));
				})
				$.ajax({// 请求数据，添加星级到酒店对应的酒店DOM中
					url: '/Booking/Ajax/Comparison/GetHotelStarInfo.ashx',
					type: 'POST',
					dataType: 'json',
					data: {
						HotelIDs : starsHotel.join()
					},
					success: function(data) {
						var data = data.data;
						$('#hotel').find('td span').each(function(){
							for(var i = 0, len = data.length; i < len; i++) {
								if($(this).data('id') === data[i].HotelID) {
									var className = data[i].IsStarLicence ? 'hotel_star_' : 'hotel_hollow_'
									$(this).after('<i class="' + className + + data[i].Star + '"></i>')
									break;
								}
							}
						})
					}
				});

				// 移除酒店、旅游景点、推荐活动、购物、用餐栏目为空的情况
				var showShopping = showActivities = showDinners = showScenics = showHotels = false;
				for(var i = 0; i < len; i++) {
					showShopping === false && initData[i].TourShoppingInfo.ShopTimes && (showShopping = true); // 购物
					showActivities === false && initData[i].TourSelfChargeActivitiesInfo.SelfChargeActivities.length && (showActivities = true); // 推荐活动
					showDinners === false && initData[i].TourDinnersInfo.TourDinnersInfo.length && (showDinners = true); // 用餐
					showScenics === false && initData[i].TourScenicsInfo.length && (showScenics = true); // 旅游景点
					showHotels === false && initData[i].TourHotelsInfo.length && (showHotels = true); // 酒店
				};
				!showShopping && $('#shopping').hide();
				!showActivities && $('#activitie').hide();
				!showDinners && $('#dinner').hide();
				!showScenics && $('#scenic').hide();
				!showHotels && $('#hotel').hide();


				// 日历和交通初始化
				for(var i = 0; i < len; i++) {
					var singleData = {
						ProductID: initData[i].ProductID,
						DepartureCityID: initData[i].ProductDepartureCityID,
						MinPrice: initData[i].MinPrice,
						EffectDate: initData[i].EffectDate,
						ExpireDate: initData[i].ExpireDate,
						SalesCityID: ajaxData.SalesCity
					};
					calendarAjax(singleData, i, initData);
				}
				
			},
			error: function() {
				var parent = $('.vacation_bd');
				parent.children('.detail_loading').remove();
				parent.append('<div class="sr-nosearchresult"><i></i>很抱歉，当前页面数据加载错误，请点击<a href="javascript: location.reload()">“刷新”</a>重新加载</div>');
			}
		})


		// 日历AJAX
		function calendarAjax(singleData, i, initData) {
			!function(i){ // 锁住i
				$.ajax({  // 日历接口
					url: '/Booking/Ajax/DetailNew/Calendar.ashx',
					type: 'POST',
					dataType: 'json',
					data: {
						ProductID: singleData.ProductID,
						StartCity: singleData.DepartureCityID,
						SalesCity: singleData.SalesCityID,
						MinPrice: singleData.MinPrice,
						EffectDate: singleData.EffectDate,
						ExpireDate: singleData.ExpireDate
					},
					success: function(data) {
						var data = data.calendar.bigCalendar;
						
						if(data && data.availableDate.length > 0) {
							singleData.DepartureDate = data.availableDate[0].Date;
							// 日历控件
							$('#starttime'+i).val(singleData.DepartureDate); // 初始化可用日期第一天
							cQuery('#starttime'+i).regMod("calendar", "3.0", {
				        options: {
			            step: 2,
	                minDate: data.dateRange[0],
	                maxDate: data.dateRange[1],
	                prohibit: data.prohibitDate.split('|')
				        },
				        listeners: {
			            onChange: function (input, value) {
			            	singleData.DepartureDate = value;
			              trafficAjax(singleData, i, initData);
			            }
				        }
					    });
					  }else {
					  	$('#starttime'+i).removeAttr('style');
					  }
					    
						trafficAjax(singleData, i, initData);						

					}
				});
			}(i)
			
		}


		// 交通模块
		function trafficAjax(singleData, i, initData) {
			!function(i){ // 锁住i
				$.ajax({
		      url: '/Booking/Handler2/NewGroupDetail/ResourceSearch.ashx',
		      type: 'POST',
		      dataType: 'json',
		      data: {
		      	query: cQuery.stringifyJSON({
		      		"ProductID": singleData.ProductID,
		      		"SalesCityID": singleData.SalesCityID,
		      		"DepartureCityID": singleData.DepartureCityID,
		      		"DepartureDate": singleData.DepartureDate,
		      		"AdultQuantity": 2,
		      		"ChildQuantity": 0,
		      		"ResourceCategory": 0,
		      		"ChosedResource": null,
		      		"GUID": "",
		      		"DefaultRecommendType": "Recommend",
		      		"ResourceInfoOption": null
		      	})
		      },
		      success: function(data) {
		      	if(data.data === null) {
		      		return;
		      	}

		      	var data = data.data,
		      			targetDom = $('#traffic').find('tr'),
								FlightInfos = data.FlightInfos,
								SingleResources = data.SingleResources,
								flightUrl,
								busInfos = [],
								trainInfos = [],
								shipInfos = [],
								tourFlightsInfo = [],
								getData = function(type) {
						      if (type != '') {
				            var valueObj = {},
				              	valueList = $$.module.jmpInfo.array.CraftType.match(new RegExp('@(' + type + '\\|[^@]*\\|[^@]*\\|\\d*\\|\\d*)@', 'i'));
				            if (!valueList || valueList == null) {
				              return {};
				            }
				            valueList = valueList[1].split('|');
				            for (var i = 0, len = valueList.length; i < len; i++) {
				              valueObj['txt' + i] = valueList[i];
				            }
				          	return valueObj;
				          }
				          return {};
		            },
		            formatDate = function(num) {
									return num > 9 ? num : '0' + num;
								},
		            handler = function() {
		            	var isChangeTrain = false,
		            			isChangeFlight = false,
		            			flagDate,
		            			date;

		            	// 航班详细信息handler
		            	for(var j = 0; j < FlightInfos.length; j++) {
		            		isChangeFlight === false && FlightInfos[j].HasMoreFlights && (isChangeFlight = true);
				    				for(var k = 0; k < FlightInfos[j].Flights.length; k++) {
				    					for(var m = 0; m < FlightInfos[j].Flights[k].FlightDetails.length; m++) {
			    							FlightInfos[j].Flights[k].FlightDetails[m].PlaneTypeDtail = getData(FlightInfos[j].Flights[k].FlightDetails[m].Aircraft);
			    						}
				    				}
				    			}
				    			// 其他交通信息handler
				    			for(var j = 0; j < SingleResources.length; j++) {
				    				var SingleResource = SingleResources[j],
				    						CategoryID = SingleResource.CategoryID;
				    				if(CategoryID == 20) {
								  		busInfos.push(SingleResource);
								  	}else if(CategoryID == 21) {
								  		shipInfos.push(SingleResource);
								  	}else if(CategoryID == 19) {
								  		trainInfos.push(SingleResource);
								  		isChangeTrain === false && SingleResource.TotalCount > 1 && (isChangeTrain = true);
								  	}
				    			}
				    			// 结构化飞机信息handler
				    			if(!(busInfos.length || shipInfos.length || trainInfos.length || FlightInfos.length)) {
					    			tourFlightsInfo = initData[i].TourFlightsInfo;
					    			flagDate = new Date(singleData.DepartureDate).getTime();
					    			for (var j = 0; j < tourFlightsInfo.length; j++) {
					    				date = new Date(flagDate + (tourFlightsInfo[j].OrderDay - 1) * 86400000);
					    				for (var k = 0; k < tourFlightsInfo[j].Flights.length; k++) {
						    				tourFlightsInfo[j].Flights[k].DepartDate = date.getFullYear() + '-' + formatDate(date.getMonth()+1) + '-' + formatDate(date.getDate());
						    			};
					    			};
				    			}
				    			// DOM handler
				    			targetDom.eq(0).children().eq(i+1).html('').append(initData[i].Transportation);
					    		targetDom.eq(1).children().eq(i+1).html('').append(template1({
					    			bus: busInfos,
					    			ship: shipInfos,
					    			train: trainInfos,
					    			FlightInfos: FlightInfos,
					    			TourFlightsInfo: tourFlightsInfo,
					    			isChangeTrain: isChangeTrain,
					    			isChangeFlight: isChangeFlight
					    		}));
		            };

		        $$ = { // 为了获取航班详细信息定义全局变量
              module: {
                jmpInfo: {
                  array: {}
                }
              }
            };

						// 获取航班详细信息		
						if($$.module.jmpInfo.array.CraftType) {
		    			handler();
						}else {
				      flightUrl ="http://webresource.c-ctrip.com/code/js/resource/jmpinfo_tuna/CraftType_" + cQuery.config("charset") + ".js";
		          $.getScript(flightUrl, function() {
			    			handler();
		          });
						}

		      }
		    });
			}(i)
			
		}

	})()
	
})