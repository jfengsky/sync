define(function (require, exports, module) {
    
    var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		EventEmitter = require("Modules/EventEmitter"),
		util = require('./mod_util');
    var inherit = require("../../../lib/inherit");
    var dataManager = require('./mod_detail_dataManager');

    require('http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js');
    var tplMoneyContain = Handlebars.compile(require('tpl/detail/order_money_contain.html.js'));

    var resourceSearchDepartureDate;
    GV.on('set-resourceSearchDepartureDate', function (date) {
        resourceSearchDepartureDate = date;
    });


    //【团队游详情页】【优化】：将【产品id、日期、成人数、儿童数】作为key，value为这次返回的GUID，当下次再请求相同的【产品id、日期、成人数、儿童数】时，把之前的GUID附带到请求的参数中
    //////////////////////////////////
    //////////////////////////////////
    ///////////// GUID begin
    //////////////////////////////////
    //////////////////////////////////
    exports.GUIDManager = {
        _cache: {},
        _getKey: function (BaseInfo) {
            return BaseInfo.ProductID + '--' + util.dtdate(BaseInfo.DepartureDate) + '--' + BaseInfo.AdultNum + '--' + BaseInfo.ChildNum;
        },
        /*
		* @param {Object} BaseInfo {ProductID, DepartureDate, AdultNum, ChildNum}
		*/
        set: function (BaseInfo, GUID) {//ProductID, date, adultCount, childCount, GUID) {
            if (GUID === null) {
                delete this._cache[this._getKey(BaseInfo)];
            }
            else {
                this._cache[this._getKey(BaseInfo)] = GUID;
            }
            return this;
        },
        get: function (BaseInfo) {
            return this._cache[this._getKey(BaseInfo)];
        }
    };
    //////////////////////////////////
    //////////////////////////////////
    ///////////// GUID end
    //////////////////////////////////
    //////////////////////////////////


    //////////////////////////////////
    //////////////////////////////////
    ///////////// 费用包含 begin
    //////////////////////////////////
    //////////////////////////////////
    var moneyContainManager = exports.moneyContainManager = {
        moneyContainHTML: {},
        appendMoneyContainHTML: function(productID){
            if(this.moneyContainHTML && this.moneyContainHTML["id"+productID]){
                $("#js-money-contain").remove();
                $('#js_order .all_resource').append(this.moneyContainHTML["id"+productID]);
                $("#js-money-contain").hide();
            }
        },
        init: function (type, productID) {
            var html = tplMoneyContain({
                FeeInfos: this.FeeInfos,
                FlightContains: this.FlightContains
            });
            if(productID) this.moneyContainHTML["id"+productID] = html;
            //修复多线路情况下，点击下面的tab切换abc线路，资源框费用包含会出现多个的bug。点击资源框的多线路切换不用做此处理。 
            if(GV.app.detail.data.IsTourGroupProduct){
                if(type == "ResourceTourGroupTabChange"){
                    $("#js-money-contain").remove();            
                    $('#js_order .all_resource').append(html);
                    //$("#js-money-contain").hide();
                }
            }else{
                $('#js_order .all_resource').append(html);
            }
            GV.emit('html-added-to-dom', { type: 'fee_infos' });
        },
        setFeeInfos: function (data, type, productID) {
            this.FeeInfos = data;
            if (this.FeeInfos !== undefined/* && this.FlightContains !== undefined*/) this.init(type, productID);
        },
        setFlightContains: function (data) {
            this.FlightContains = data;
            if (this.FeeInfos !== undefined && this.FlightContains !== undefined) this.init();
        }
    };
    /*
	* @param {String | null} html
	*/
    GV.on('money-contain-loaded', function (FeeInfos, type, productID) {
        moneyContainManager.setFeeInfos(FeeInfos, type, productID);
    });
    //////////////////////////////////
    //////////////////////////////////
    ///////////// 费用包含 end
    //////////////////////////////////
    //////////////////////////////////







    //////////////////////////////////
    //////////////////////////////////
    ///////////// 保险的显示要单独处理，太蛋疼了 begin
    //////////////////////////////////
    //////////////////////////////////
    var baoxianManager = exports.baoxianManager = {
        init: function (wrapNode) {
            this.wrapNode = wrapNode;
            this.lastSingleNode = wrapNode.find('.js-single').last();
            var nodes = {};
            _.each(wrapNode.find('.js-is-baoxian'), function (dom) {
                var node = $(dom);
                var resId = node.data('resource-id');
                nodes[resId] = node;
            });
            this.nodes = nodes;
        },
        getTitleByNode: function (node) {
            return node.find('.col_01');
        },
        prependBaoxianNode: function (node) {
            // 保险是可选项的第一个，但可选项在单选项后面
            if (this.lastSingleNode.length) {
                this.lastSingleNode.after(node);
            }
            else {
                this.wrapNode.prepend(node);
            }
        },
        changeShowTypeByData: function (chosedBaoxian) {
            var shownNodes = [];
            _.each(chosedBaoxian, _.bind(function (data) {
                var node = this.nodes[data.ProductID];

                // 先全部隐藏title
                this.getTitleByNode(node).hide();

                // 没有选择此保险，隐藏
                if (data.UseCopies == 0) {
                    node.hide();
                }
                else {
                    node.show();
                    shownNodes.push(node);
                }
            }, this));
            //保证之前就在前面的节点，还在前面
            for (var i = shownNodes.length - 1; i >= 0; i--) {
                this.prependBaoxianNode(shownNodes[i]);
            }
            // 第一个节点的 title 显示，并合并 title
            if (!shownNodes.length) {
                //alert('哥啊，天天做容错处理啊，这都不该错的啊，难道你一个保险都不选择？');
                var firstNode = this.nodes[chosedBaoxian[0].ProductID];
                this.getTitleByNode(firstNode).show().attr('rowspan', 1);
            } else {
                this.getTitleByNode(shownNodes[0]).show().attr('rowspan', shownNodes.length);
            }
        }
    };
    //////////////////////////////////
    //////////////////////////////////
    ///////////// 保险的显示要单独处理，太蛋疼了 end
    //////////////////////////////////
    //////////////////////////////////





    //////////////////////////////////
    //////////////////////////////////
    ///////////// 小日历 begin
    //////////////////////////////////
    //////////////////////////////////
    var smallCalendar;
    exports.smallCalendar = smallCalendar = {
        calendar: null,
        reinit: null,
        status: 'init',
        show: function (domEvent) {
            cQuery('#js-depature-date-real').trigger('mousedown');
            //return false;
            if (!domEvent) throw '你丫不知道 cQuery 组件都脆弱的不得了吗？？赶快把 event 传递进来！！';
            domEvent.stopPropagation();
        },
        init: function (nodeOrderWrap) {
            var dateRange, bigCalendarData = dataManager.calendar.bigCalendar;

            // 如果暂时没有拿到 日历的数据，就生成一个重新初始化的函数
            // 以便于拿到日历数据后重新初始化 
            if (!bigCalendarData || !(dateRange = bigCalendarData.dateRange)) {
                this.reinit = function () {
                    this.init(nodeOrderWrap);
                    delete this.reinit;
                };
                return;
            }

            var orderDepartInputNode = nodeOrderWrap.find('#js-departure-date');
            var realInputNode = orderDepartInputNode.siblings('input');
            // <del>没有任何一个可用日期 这个值就会为空</del>
            // 压根没必要在意 value 是否为空，即便为空 cQuery 也不会报错，仅仅是没有【today】了罢了
            //
            // ------小日历的原则是：
            //    只要有日历数据了，在任何情况下都需要显示
            //
			//var date = $.trim(realInputNode.val());

            // bigCalendarData 和 bigCalendarData.dateRange 已经得到保证了，否则就会生成 reinit
            //if (date && bigCalendarData && (dateRange = bigCalendarData.dateRange)) {
                var prohibit = bigCalendarData.prohibitDate.match(/^\|(.*)\|$/);
                prohibit = prohibit ? prohibit[1].split('|') : [];
                cQuery(realInputNode[0]).regMod('calendar', '6.0', {
                    options: {
                        step: 2,
                        showWeek: false,
                        minDate: util.dtdate(dateRange[0]),
                        maxDate: util.dtdate(dateRange[1]),
                        prohibit: prohibit
                    },
                    listeners: {
                        onChange: function (input, value) {
                            if (!util.isSameDay(resourceSearchDepartureDate, value)) {
                                var availableDate = dataManager.calendar.getAvailableDate(); //DataDetail.initData.bigCalendar.availableDate;
                                var data = _.find(availableDate, function (date) {
                                    return util.isSameDay(date.Date, value);
                                });
                                // 只有 available 下的日期可点击
                                if (data) {
                                    GV.emit('calendar_day_click', data);
                                }
                                else {
                                    // 不可选，怎么提示?
                                }
                            }
                        },
                        onShow: function () {
                            //util.data.set('smallCalendar', this);
                            //util.data.set('smallCalendarShown', true);
                            smallCalendar.calendar = this;
                            smallCalendar.isShown = true;
                        }
                    }
                });
            //}
        },
        isShown: false,
        isFixed: false,
        hide: function () {
            if (this.isShown && this.calendar) {
                this.calendar.hide();
                this.isShown = false;
            }
        }
    };

    GV.on('calendar-data-inited', function () {
        // 日历数据已经初始化了，如果需要重新初始化，则执行
        smallCalendar.reinit && smallCalendar.reinit();
    });

    //var topbarFix = require('./mode_detail_orderbar_fix');
    //$(window).on('scroll', function (e) {
    GV.on('big-order-topbar-recompared', function (status, prevStatus, STATUS) {
        if (smallCalendar.isShown) {
            //if (topbarFix.getStatus() == STATUS.FIXED) {
            if (status == STATUS.FIXED || prevStatus == STATUS.FIXED) {
                //smallCalendar.switchStatus(true);
                smallCalendar.hide();
            }
            //else {
            //    smallCalendar.switchStatus(false);
            //}
        }
    });
    //});
    //////////////////////////////////
    //////////////////////////////////
    ///////////// 小日历 end
    //////////////////////////////////
    //////////////////////////////////



    //////////////////////////////////
    //////////////////////////////////
    ///////////// 最低价 begin
    //////////////////////////////////
    //////////////////////////////////
    exports.minPrice = {
        _cache:{},
        can_i_post: function (date) {
            date = util.dtdate(date);
            if (!this._cache[date]) {
                return this._cache[date] = true;
            }
            return false;
        }
    };
    //////////////////////////////////
    //////////////////////////////////
    ///////////// 最低价 end
    //////////////////////////////////
    //////////////////////////////////



    //////////////////////////////////
    //////////////////////////////////
    ///////////// 总价管理器 begin
    //////////////////////////////////
    //////////////////////////////////
    exports.TotalPrice = inherit({
        /*
		* @param {jQueryNode} nodeWrap
		* @param {Number} price
		*/
        __constructor: function (options) {
            this.options = _.extend({}, options);
            this.price = options.price;
        },
        changePrice: function (newPrice, oldPrice) {
            var price = Math.ceil(Math.ceil(this.price) - Math.ceil(oldPrice) + Math.ceil(newPrice));
            var node = this.options.nodeWrap;

            this.price = price;
            node.html(util.getMoneyHtml(price)); //(node.html().replace(/\d+/, price));
            return this;
        }
    });
    //////////////////////////////////
    //////////////////////////////////
    ///////////// 总价管理器 end
    //////////////////////////////////
    //////////////////////////////////
});