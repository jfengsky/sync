/**
 * @Author guow
 * @CreateDate  2014/03/15
 * @Desc 修改加载更多效果
 */

define(function (require, exports, module) {
    var $ = require('../../../lib/jquery');
    var self = this;
    var searchContainer = $('#searchResultContainer');  //对应父级框
    var originContainerClass = '.product_list02';       //初始list框class
    var btnClass = '.more_scenic_group';                //固定class
    var upClass = 'more_scenic_up';                     //收起class
    var loadText = '<div class="loading_tip"><img src="http://pic.c-ctrip.com/vacation_v1/loading_transparent.gif">正在加载，请稍候......</div>';
    var loadClass = '.loading_tip';                     //loadingClass
    var foldText = "收起线路<b></b>";                       //收起文字
    var moreText = "查看更多线路<b></b>";                   //展示文字
    var getMoreList = {
        init: function () {
            getMoreList.bind();
            getMoreList.customHandlebars();
        },
        /*
	   * 绑定点击事件
	   *当为收起的时候收起
	   *有缓存的时候不加载
	   *加载的时候获取前一input的value值传输
	   */
        bind: function () {
            searchContainer.delegate(btnClass, 'click', function (e) {
                e.preventDefault();
                var $this = $(this);
                var parent = $this.parent();
                if (parent.find(loadClass).length > 0) {
                    return false;
                }
                if ($this.hasClass(upClass)) {
                    //判断字符确认状态
                    getMoreList.foldUp(parent);
                } else {
                    if (parent.find('.product_more_list').length > 0) {
                        //有缓存直接展示
                        getMoreList.showMore(parent);
                    } else {
                        //调用接口加载
                        var data = $this.prev().val();
                        getMoreList.loadMoreResult(parent, data);
                    }
                }
            });
        },
        /*
		*tpl事件
		*逻辑根据package\Develop\Code\Booking\VacationsOnLine20140306\PresentationLayer\Vacation\UserConrtol2011\SearchResultV4\SearchProductControl.ascx
		*/
        tpl: '<ul class="product_list02 product_more_list" style="display:none;padding-top:0px;border-top:0 none;">\
				{{#each products}}\
					<li data-href="{{ProductUrl}}{{CtmTxt}}" data-c="">\
                    <div class="basefix">\
						 {{#if IsHHTravel}}\
							<div class="theme">\
								<h3><a rel="nofollow" data-href="{{ProductUrl}}{{CtmTxt}}" data-c="" href="{{ProductUrl}}{{CtmTxt}}" title="" target="_blank">【{{ProductName}}】</a></h3>\
							    {{#if ShowWifi}}<span class="label_iocn label_green" title="{{WifiDescription}}"><i class="wifi"></i>免费WiFi</span>{{/if}}\
                                {{#if ShowDv}}<span class="label_iocn label_green"><i class="dv"></i>DV旅拍</span>{{/if}}\
                                {{#if Mingpai}}<span class="label_iocn label_brown">上海名牌</span>{{/if}}\
                                {{#if Tieding}}<span class="label_iocn label_brown">铁定成团</span>{{/if}}\
							  {{#if Schedule}}<div class="product_style">班期：{{Schedule}}\</div>{{/if}}\
							</div>\
							<div class="product_prise">\
								{{#compareTo MinPrice 0}}\<span class="sr_price"><dfn>&yen;</dfn><strong>{{MinPrice}}</strong>起</span>\
								{{else}}<span class="sr_price02">实时计价</span>{{/compareTo}}\
							 </div>\
						 {{else}}\
						 <div class="theme">\
							  <h3><a rel="nofollow" data-href="{{ProductUrl}}{{CtmTxt}}" data-c="" href="{{ProductUrl}}{{CtmTxt}}" title="" target="_blank">【{{ProductNameInGroup}}】</a></h3>\
							  {{#if ShowWifi}}<span class="label_iocn label_green" title="{{WifiDescription}}"><i class="wifi"></i>免费WiFi</span>{{/if}}\
                                {{#if ShowDv}}<span class="label_iocn label_green"><i class="dv"></i>DV旅拍</span>{{/if}}\
                                {{#if Mingpai}}<span class="label_iocn label_brown">上海名牌</span>{{/if}}\
                                {{#if Tieding}}<span class="label_iocn label_brown">铁定成团</span>{{/if}}\
						</div>\
						 <div class="center">\
						  {{#if PromotionInfo}}<div class="product_favorable"><span title="{{PromotionInfo}}">{{PromotionInfo}}</span></div>{{/if}}\
							 <div class="product_abstract">{{{AddNofollowTag}}}</div>\
								 {{#if VisaAcceptedRange}}<div class="arange"><em>受理范围：</em>{{VisaAcceptedRange}}</div>{{/if}}\
								{{#judgeMice ProductType}}{{else}}\
								<div class="product_other"><div class="other_list">\
                                    {{#ifOne DepartureCityName NormalTagName}}<span class="leave_trans">\
								        {{#judgeMice ProductType}}{{else}}{{#if DepartureCityName}}<em>{{DepartureCityName}}出发</em>{{/if}}{{/judgeMice}}\
								        {{#if NormalTagName}}<em>{{NormalTagName}}</em>{{/if}}</span>\
                                    {{/ifOne}}\
                                     {{#if ProviderName}}<span class="supplier" title="{{ProviderName}}">供应商：{{#equal ProviderName "携程国旅"}}<i></i>{{/equal}}{{ProviderName}}</span>{{/if}}\
									 {{#compareTo ReviewScore 0}}<a class="comment02" data-comment={"Url":"{{ProductUrl}}{{CtmTxt}}","ProductID":"{{ProductId}}"}>点评：<em>{{ReviewScore}}</em><b class="down"></b></a>{{/compareTo}}\
                                     <span class="go_days">{{#if Schedule}}班期：{{#if Festival}}<em class="date">{{Festival}}</em>{{/if}}{{Schedule}}{{/if}}</span>\
                                </div>\
                                 {{#if ShowCalendar}}<a pid="{{ProductId}}" url="{{ProductUrl}}" begin="{{Begin}}" end="{{End}}" DepartureCityId="{{DepartureCityId}}" href="###" class="sea_schedule">查看班期<b class="down"></b></a>{{/if}}\
                                </div>{{/judgeMice}}\
						  </div>\
							<div class="product_prise">\
								{{#compareTo MinPrice 0}}<span class="sr_price"><dfn>&yen;</dfn><strong>{{MinPrice}}</strong>起</span>\
								{{else}}{{#judgeMice ProductType}}<span class="sr_price02">一团一议</span>{{else}}<span class="sr_price02">实时计价</span>{{/judgeMice}}{{/compareTo}}\
                                {{#compareTo CanCashBack 0}}<span class="sr_label03" data-params="{options:{type:\'jmp_alert\',classNames:{boxType:\'jmp_alert\'},template:\'#jmp_alert\', content:{txt:\'网上成功预订此产品，结束游玩后发表行程点评，5个工作日内可获得{{CanCashBack}}元/成人的任我游礼品卡。儿童不参与返现。\<\/br\>\<a target=_blank href=&quot;http:\/\/help\.ctrip\.com\/QuestionDetail\.aspx?questionId=1034&quot; \>行程点评返现规则\<\/a\>\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\'}}" data-role="jmp"><i>返</i>{{CanCashBack}}元</span>{{/compareTo}}\
							 </div>\
						   {{/if}}\
                        </div>\
                        {{#if ShowCalendar}}<div style="display:none;" class="calendar_top"><div class="search_calendar basefix"></div></div>{{/if}}\
						 </li>\
				{{/each}}\
			</ul>',
        /**
		*注册两个handlerbars函数
		*2.比较函数
		*1.if 多个或函数
		*/
        customHandlebars: function () {
            Handlebars.registerHelper('judgeMice', function (type, options) {
                if (type == 32768) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('compareTo', function (a, b, options) {
                a = parseFloat(a) || 0;
                b = b || 0;
                if (a > b) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('equal', function (a, b, options) {
                if (a === b) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });
            Handlebars.registerHelper('ifOne', function () {
                var args = Array.prototype.slice.call(arguments);
                var options = args.pop();
                for (var i = 0, l = args.length; i < l; i++) {
                    if (args[i]) {
                        return options.fn(this);
                    }
                }
            });
        },
        /*
		*加载效果
		*初始化加loading效果
		*/
        loadMoreResult: function (el, data) {
            $.ajax({
                type: 'post',
                url: "/Package-Booking-VacationsOnlineSiteUI/Handler2/ProductInfoSearch.ashx",
                data: { "para": data },
                dataType: 'json',
                beforeSend: function () {
                    el.find(originContainerClass).after(loadText);
                },
                // timeout : 5000,
                success: function (result) {
                    getMoreList.render(el, { "products": result });
                    // var Compare = require('../Modules/compare');
                    //Compare.ajaxInit();
                }
            });
        },
        /**
		*编译tpl
		*移除loading
		*展示更多
		*/
        render: function (el, data) {
            var html = Handlebars.compile(getMoreList.tpl)(data);
            el.find(loadClass).remove();
            el.find(originContainerClass).after(html);
            getMoreList.showMore(el);
        },
        /**
		*展示下拉效果
		*/
        showMore: function (el) {
            el.find('.product_more_list').slideDown();
            el.children(btnClass).addClass(upClass).html(foldText);
        },
        /**
		*收起效果
		*/
        foldUp: function (el) {
            el.children(btnClass).removeClass(upClass).html(moreText);
            el.find('.product_more_list').slideUp();
        }
    }

    exports.init = getMoreList.init;
});