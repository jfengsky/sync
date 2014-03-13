//详情页-费用包含-预定须知-签证/签注
define(function (require, exports, module) {
    var $ = require("../../../lib/jquery.js"),
		_ = require("../../../lib/underscore.js"),
		EventEmitter = require("Modules/EventEmitter"),
		util = require('./mod_util');

    var TplExt = GV.app.detail.data.TplExt;
    var apiGet_moneyContain_orderNeedKnow_visa = GV.app.detail.api.apiGet_moneyContain_orderNeedKnow_visa;

    var tplOrderNeedknow = Handlebars.compile(require('tpl/detail/order_needknow.html.js')),
    //tplMoneyContain = Handlebars.compile(require('tpl/detail/money_contain.html.js')),
		tplVisa = Handlebars.compile(require('tpl/detail/visa.html.js')),
        tplMoneyContain = Handlebars.compile(require('tpl/detail/order_money_contain.html.js'));

    function visaTableInit(nodeVisa) {
        //1. 切换国家
        var countryTab = nodeVisa.find('.detail_visa_list'),
			countryWraps = nodeVisa.find('.js-visa-table-wrap');
        if (countryTab.length) {
            countryTab.on('click', 'a', function (e) {
                var currentDom = $(e.currentTarget);
                currentDom.addClass('current').siblings().removeClass('current');
                countryWraps.hide();
                countryWraps.eq(currentDom.index()).show().addClass('current')
            });
        }

        //2. 切换签证ID
        var visaIdTabs = $('.detail_visa_tips a');
        visaIdTabs.on('click', function (e) {
            var currentDom = $(e.currentTarget),
				visaContents = currentDom.parents('.js-visa-table-wrap').find('.detail_visa_content').hide();
            visaContents.eq(currentDom.index()).show();
            currentDom.addClass('current').siblings().removeClass('current');
        });

        //3. 签证类型切换
        var visaTypeTabs = $('.js-visa-table-wrap .visa_type  a');
        visaTypeTabs.on('click', function (e) {
            var currentDom = $(e.currentTarget),
				visaTypeContents = currentDom.parents('.detail_visa_content').find('.visa_list').hide();
            visaTypeContents.eq(currentDom.index()).show();
            currentDom.addClass('current').siblings().removeClass('current');
        });
    }

    GV.ready(function () {
        var detail = GV.app.detail;
        var nodeOrderNeedKnowWrap = $('#js_order_needknow'),
			nodeVisaWrap = $('#js_visa');
        $.ajax({
            //type:'GET',
            type: 'POST',
            url: apiGet_moneyContain_orderNeedKnow_visa,
            data: {
                ProductID: detail.data.ProductID,
                StartCity: detail.data.StartCityID,
                SalesCity: detail.data.SalesCity
            }
        })
		.done(function (json) {
		    if (_.isString(json)) json = $.parseJSON(json);
		    if (json.errno === 0) {
		        //1. 预定须知
		        if (json.data.OrderingNeedToKnowInfo) {
		            var html = tplOrderNeedknow(json.data.OrderingNeedToKnowInfo);
		            nodeOrderNeedKnowWrap.html(html).show();
		            GV.emit('is-exists', { type: 'order_needknow' });
		        }
		        else {
		            //nodeOrderNeedKnowWrap.remove();
		            GV.emit('not-exists', { type: 'order_needknow' });
		        }

		        ///////////// 处理 VISA 数据 start
		        //先处理一遍VisaCountryInfos数据，目前是以VisaID为单位的数组（一个国家可能有多个VisaID）
		        //变为：以【国家】为key，value为数组，每个数组项为 VisaID 为单位的。
		        //同时，合并后国家只有一个，且为【中国】，则为【台湾】
		        //VisaCountryInfos:[
		        //	[
		        //		//这里的数组项跟原来的相同
		        //		{
		        //			Country:'中国', VisaID: 1,...
		        //		},
		        //		{
		        //			Country:'中国', VisaID: 2,...
		        //		},...
		        //	],
		        //	[
		        //		{
		        //			Country:'韩国', VisaID: 6,...
		        //		}
		        //	]
		        //]
		        var visaInfoData = json.data.VisaInfo;
		        if (visaInfoData) {
		            //如果一个VisaClientTypes下的VisaStuffs=null或者length<=0则，这个VisaClientTypes不用显示。
		            _.each(visaInfoData.VisaCountryInfos, function (country) {
		                // 删除那些 visaClientType.VisaStuffs isEmpty 的 visaClientType
		                country.VisaClientTypes = _.filter(country.VisaClientTypes, function (visaClientType) {
		                    return !_.isEmpty(visaClientType.VisaStuffs);
		                });
		            });
		            //['中国','韩国']
		            visaInfoData.VisaCountries = _.uniq(_.pluck(visaInfoData.VisaCountryInfos, 'Country'));
		            visaInfoData.VisaCountryInfos = _.values(_.groupBy(visaInfoData.VisaCountryInfos, 'Country'));
		            //console.log(visaInfoData.VisaCountryInfos);
		            visaInfoData.IsTaiWan = (visaInfoData.VisaCountries.length === 1 && visaInfoData.VisaCountries[0] === '中国');
		            // 目前来看只有台湾的逻辑不显示 country tab 这块
		            visaInfoData.IsCountryTabShow = !visaInfoData.IsTaiWan;
		            _.each(visaInfoData.VisaCountryInfos, function (countryArr) {
		                _.each(countryArr, function (country) {
		                    country.Name = visaInfoData.IsTaiWan ? country.Name : country.ResourceName;
		                });
		            });
		            // 肯定会显示
		            visaInfoData.IsVisaTabShow = true; //!visaInfoData.IsTaiWan;
		            visaInfoData.IsVisaNoteShow = !_.isEmpty(visaInfoData.VisaNote) && !_.isEmpty(visaInfoData.VisaContainDetails);
		            visaInfoData.IsAgencyNoteShow = !_.isEmpty(visaInfoData.AgencyNote) && !_.isEmpty(visaInfoData.AgencyContainDetail);
		            visaInfoData.IsVisaCountryShow = !_.isEmpty(visaInfoData.VisaCountryInfos);

		            visaInfoData.IsVisaNoteShowBorder = visaInfoData.IsAgencyNoteShow || visaInfoData.IsVisaCountryShow;
		            visaInfoData.IsAgencyNoteShowBorder = visaInfoData.IsVisaCountryShow;
		            //console.log(visaInfoData.isTaiWan, window.aa=visaInfoData.VisaCountries);
		            ///////////// 处理 VISA 数据 end

		            //2. 签证/签注
		            nodeVisaWrap.html(tplVisa(visaInfoData)).show();
		            GV.emit('is-exists', { type: 'visa' });
		        }
		        else {
		            //nodeVisaWrap.remove();
		            GV.emit('not-exists', { type: 'visa' });
		        }
		        //3. 费用包含
		        var FeeInfos = json.data.FeeInfos;
		        var Activities = json.data.Activities;//自费活动
		        //var moneyContainData = (!_.isEmpty(FeeInfos) && !_.isEmpty(FeeInfos[0].PkgDescEntitys))
		        FeeInfos = (!util.isEmpty(FeeInfos) && _.filter(FeeInfos, function (fee) { return !util.isEmpty(fee.PkgDescEntitys) }).length)
										? FeeInfos //tplMoneyContain({ FeeInfos: FeeInfos })
										: '';
		        if (FeeInfos || Activities) {
		            GV.emit('is-exists', { type: 'expense' });
		            var html = tplMoneyContain({
		                FeeInfos: FeeInfos,
                        Activities: Activities,
		                isInDetailInfoBox: true
		            });
		            $('#js_expense').html(html).show();
		        }
		        else {
		            GV.emit('not-exists', { type: 'expense' });
		        }
		        GV.emit('money-contain-loaded', FeeInfos);
		        GV.emit('html-added-to-dom', { type: 'needknow_visa' });

		        visaTableInit(nodeVisaWrap);
		    }
		    else {
		        nodeOrderNeedKnowWrap.remove();
		        nodeVisaWrap.remove();
		    }
		})
		.fail(function () {
		    nodeOrderNeedKnowWrap.remove();
		    nodeVisaWrap.remove();
		});
    });

});
