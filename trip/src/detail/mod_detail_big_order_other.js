//团队游详情页，预定订单，酒店部分
define(function (require, exports, module) {
    var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		inherit = require("../../../lib/inherit"),
		util = require('./mod_util'),
		EventEmitter = require("Modules/EventEmitter");

    var Selector = require('../Modules/SelectBase');
    var IDetailPageOrderComponent = require('../Interface/IDetailPageOrderComponent');

    /*
    * @interface implements IDetailPageOrderComponent
    * 
    * @event 'select-click'()
    * @event 'changed-total-price'(totalPrice, oldPrice)
    * @event 'height-changed'(this)
    *
    * @method getTotalPrice()
    * 
    */
    var OtherBase = inherit({
        /*
        * @param {jQueryNode} nodeWrap
        * @param {Object} data
        */
        __constructor: function (options) {
            this.options = _.extend({}, options);
            //this.name = options.name;
            var nodeWrap = this.node = options.nodeWrap;
            this.select = new Selector({
                nodeWrap: nodeWrap.find('.num_input_wrap')
            });
            var nodeWrap = options.nodeWrap;

            this.nodePrice = nodeWrap.find('.js-ctrip-price');
            this.nodeIconFree = nodeWrap.find('.free_gift');
            this.nodeTotalPrice = nodeWrap.find('.js-total-price');
            this.nodeOriginalPrice = nodeWrap.find('.js-original-price');
            this.nodeSelected = nodeWrap.find('.col_07 .room_selected');
            this.nodeBtnSelect = nodeWrap.find('.col_btn a');

            this.isSelected = !this.nodeSelected.is(':hidden');
            //this._currentUnitPrice

            _.bindAll(this, 'onSelectClick');
            this.nodeBtnSelect.on('click', this.onSelectClick);


            //是否点击标题后有提示
            var nextNode = nodeWrap.next();
            if (nextNode && nextNode.hasClass('js-intro')) {
                this.nodeTitle = nodeWrap.find('.js-product-name');
                this.nodeTip = nextNode;
                this.nodeTipBtnClose = nextNode.find('.flod_btn');
                this.isTipShown = !nextNode.is(':hidden');

                var bindedHandler = _.bind(this.onTitleClick, this);
                this.nodeTitle.on('click', bindedHandler);
                this.nodeTipBtnClose.on('click', bindedHandler);
            }
        },
        switchSelectedMark: function (select) {
            this.isSelected = select;
            this.nodeSelected[select ? 'show' : 'hide']();
            return this;
        },
        switchIconFree: function (show) {
            this.nodeIconFree[show ? 'show' : 'hide']();
            return this;
        },
        getTotalPrice: function () {
            return this._currentTotalPrice;
        },
        getResourceId: function () {
            return this.node.data('resource-id');
        },
        getSegmentId: function () {
            return this.node.data('segment-id');
        },
        setTotalPrice: function (count) {
            var totalPrice = util.decimal(this._currentUnitPrice * count, 2);
            var prevPrice = this._currentTotalPrice;
            // _currentTotalPrice 会在实例初始化时设置
            if (totalPrice != prevPrice) {
                var prevTotalPriceHtml = this.nodeTotalPrice.html(),
                //prevHtml = this.nodePrice.html(),
                //prevOriginalHtml = this.nodeOriginalPrice.html(),
                // 有可能为负数：'<def>￥</def> -30'
					reg = /-*\d+/;
                //单价不需要改
                //this.nodePrice.length && this.nodePrice.html(util.getMoneyHtml(totalPrice));
                //市场价不需要改
                //this.nodeOriginalPrice.length && this.nodeOriginalPrice.html(util.getMoneyHtml(this._currentMarketPrice * count));
                var moneyShown = totalPrice == 0 ? '--' : util.getMoneyHtml(totalPrice);
                this.nodeTotalPrice.length && this.nodeTotalPrice.html(moneyShown); //(prevTotalPriceHtml.replace(reg, totalPrice));
                this._currentTotalPrice = totalPrice;

                this.emit('changed-total-price', totalPrice, prevPrice);
            }
            return this;
        },
        onSelectClick: function (e) {
            this.emit('select-click');
        },
        onTitleClick: function (e) {
            var show = this.isTipShown = !this.isTipShown;
            if (show) {
                this.node.addClass('no_border');
                this.nodeTip.show();
            }
            else {
                this.node.removeClass('no_border');
                this.nodeTip.hide();
            }
            this.emit('height-changed', this);
        }
    });
    EventEmitter.mixTo(OtherBase);

    var OtherSingal = inherit(OtherBase, {
        /*
        * @param {jQueryNode} nodeWrap
        * @param {Object} data
        * @param {String} name
        */
        __constructor: function (options) {
            this.__base(options);

            var nodeWrap = this.options.nodeWrap;
            this._currentUnitPrice = options.data.Price;
            this._currentTotalPrice = util.decimal(this.getCurrentCount() * this._currentUnitPrice, 2);
        },
        getCurrentCount: function () {
            return this.options.data.Count;
        }
    });

    /*
    * 
    */
    var OtherOptional = inherit(OtherBase, {
        /*
        * @param {jQueryNode} nodeWrap
        * @param {Object} data
        */
        __constructor: function (options) {
            this.__base(options);

            var nodeWrap = this.options.nodeWrap;

            var nodeDateSelect = nodeWrap.find('.use_date .date_input_wrap');
            if (nodeDateSelect.length) {
                this.dateSelect = new Selector({
                    nodeWrap: nodeDateSelect
                });
            }

            var nodeCountSelect = nodeWrap.find('.room_num .num_input_wrap');
            if (nodeCountSelect.find('input').length) {
                this.countSelect = new Selector({
                    nodeWrap: nodeCountSelect
                });
            }

            _.bindAll(this, 'onDateChange', 'onCountChange');
            this.dateSelect && this.dateSelect.on('change', this.onDateChange);
            this.countSelect && this.countSelect.on('change', this.onCountChange);

            this.setCurrentInventory();
            this._currentTotalPrice = util.decimal(this.getCurrentCount() * this._currentUnitPrice, 2);
        },
        getCurrentCount: function () {
            return parseInt(this.countSelect ? this.countSelect.getValue() : this.node.find('.col_05 .num_input_wrap').text());
        },
        getCurrentDate: function () {
            return $.trim(this.dateSelect ? this.dateSelect.getValue() : this.node.data('only-date'));
        },
        getCurrentInventory: function () {
            if (!this._currentInventory) {
                this.setCurrentInventory();
            }
            return this._currentInventory;
        },
        setCurrentInventory: function (date) {
            date = date || this.getCurrentDate();
            this._currentInventory = _.find(this.options.data.Inventory, function (inven) {
                return util.isSameDay(inven.Date, date);
            });
            this.switchIconFree(this._currentInventory.Price == 0);
            this.setUnitPrice(this._currentInventory.Price, this._currentInventory.MarketPrice);
            // 其实没必要在改变日期的时候，让数量变回之前选择的数量
            //this.countSelect.setValue(this._currentInventory.DefaultQuantity.toString());

            return this;
        },
        setUnitPrice: function (price, marketPrice) {
            var prevPrice = this._currentUnitPrice;

            if (prevPrice !== price) {
                this._currentUnitPrice = price;
                this._currentMarketPrice = marketPrice;

                // undefined 时是初始化
                if (prevPrice !== undefined) {
                    this.setTotalPrice(this.getCurrentCount());
                }
            }

            return this;
        },
        onDateChange: function (date) {
            this.setCurrentInventory(date);
        },
        onCountChange: function (count) {
            count = parseInt(count);
            //			if (this._currentInventory.DefaultQuantity != count) {
            //				this._currentInventory.DefaultQuantity = count;
            this.setTotalPrice(count);

            this.switchSelectedMark(count > 0);
            //}
        }
    });

    exports.OtherSingal = OtherSingal;
    exports.OtherOptional = OtherOptional;

});