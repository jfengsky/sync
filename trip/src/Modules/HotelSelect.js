/* 
* 团队游详情页，预定订单，酒店部分
*
* @doc http://www.peichao01.com/static_content/ctrip/html/HotelSelect.html
*
* @author peic<peic@ctrip.com>
* 
*/
define(function (require, exports, module) {
	var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		inherit = require("../../../lib/inherit"),
		EventEmitter = require("Modules/EventEmitter"),
		util = require('../detail/mod_util');
	var TplExt = GV.app.detail.data.TplExt;
	var Selector = require('./SelectBase');

	var IDetailPageOrderComponent = require('../Interface/IDetailPageOrderComponent');

	//var tplRoomDetail = Handlebars.compile(require('tpl/detail/hotel_room_detail.html.js'));
	//var tplRoomList = require('tpl/detail/hotel_room_detail.html.js'); //Handlebars.compile()
	//Handlebars.registerPartial("RoomList", tplRoomList);
	tplRoomList = Handlebars.compile(require('tpl/detail/hotel_room_list.html.js'));
	var apiGetRoomDetail = GV.app.detail.api.getRoomDetail;

	// 默认选择第一个房间
	function dealHotelInfo(json) {
		json.HotelInfos[0].RoomInfos[0].Select = true;
	}

	/*
	* @event "select-click"(this)
	* @event "count-change"(this, count)
	* @event 'height-changed'(this)
	*/
	// 现在显示差价的逻辑是，永远只跟一个固定的价钱比较 --- ajax 返回的最初始的价格
	var Room = inherit({
		/*
		* @param {jqueryNode} nodeWrap
		*
		* @param {Number} compareMoney
		* */
		__constructor: function (nodeWrap, options) {
			this.options = _.extend({

			}, options);
			this.node = nodeWrap;
			this.title = nodeWrap.find('.room_name');
			this.compareMoney = options.compareMoney;
			// 酒店永远都是可选择的
			this.countSelector = new Selector({
				nodeWrap: nodeWrap.find('.room_num .num_input_wrap')
			});
			this.roomId = this.node.data('room-id');

			this.nodePrice = nodeWrap.find('.room_price');

			//			this.countSelector.on('change', function (val, old, changeType) {
			//				changeType == Selector.VALUE_CHANGE_TYPE.INPUT;
			//			});

			this.isSelected = false;
			this.isButtonMode = true;
			this.nodeSelectBtn = nodeWrap.find('.room_select_btn');
			if (!this.nodeSelectBtn.length) {
				this.isSelected = true;
				this.isButtonMode = false;
				this.nodeSelectBtn = nodeWrap.find('.room_selected');
			}

			/*
			* 此属性和 isSelected 是互斥的
			*
			* @type {Room}
			*/
			this.brotherThatSelected = null;

			this.priceEach = nodeWrap.data('price');

			var count = this.getCount(); //this.countSelector.getValue();
			if (count >= 0) this.changePriceByCount(count).showPrice();

			//this.roomDetail = null;
			//this.btnFold = null;
			this.initDetail();

			_.bindAll(this, 'toggleRoomDetail', 'onSelectBtnClick', 'onCountChange');
			this.title.on('click', this.toggleRoomDetail);
			this.nodeSelectBtn.on('click', this.onSelectBtnClick);
			this.countSelector.on('change', this.onCountChange);
		},
		// 改变要比较的价钱
		changeCompareMoney: function (money) {
			this.compareMoney = money;
			this.showPrice();
		},
		initDetail: function (data) {
			this.roomDetail = this.node.find('.room_detail_wrap'); //$(tplRoomDetail(data));
			this.btnFold = this.roomDetail.find('.flod_btn');
			//this.node.append(this.roomDetail);

			this.isDetailShown = !this.roomDetail.is(':hidden');

			this.btnFold.on('click', _.bind(this.toggleRoomDetail, this));

			return this;
		},
		getPrice: function () {
			return this.totalPrice;
		},
		// 获取单价
		getUnitPrice: function () {
			return this.priceEach;
		},
		getId: function () {
			return this.roomId;
		},
		getCount: function () {
			return util.int(this.countSelector.getValue());
		},
		/*
		* 无论是否选择 this room，都可以调用此方法
		* 
		* @param {Boolean | Room} select
		*/
		select: function (select) {
			//if (select instanceof Room) return this._setSelectedBrother(select);
			if (select instanceof Room) {
				var room = select,
					prevBrother = this.brotherThatSelected;
				select = room === this;

				this.brotherThatSelected = select ? null : room;
			}

			if (select === this.isSelected) {
				//if (prevBrother && prevBrother !== this.brotherThatSelected) {
				//if (prevBrother !== this.brotherThatSelected) {
				//	this.showPrice();
				//}
			}
			else {

				this.isSelected = select;
				this.isButtonMode = !select;

				if (select) {
					this.nodeSelectBtn.addClass('room_selected').removeClass('room_select_btn');
				} else {
					this.nodeSelectBtn.removeClass('room_selected').addClass('room_select_btn');
				}
				//this.showPrice();
			}
			this.showPrice();

			return this;
		},
		showPrice: function () {
			//TODO: 目前规则还不完全清楚，比如默认房间数为0还是空，总价 在什么情况下显示'--'或者数值
			// 先这样处理
			if (_.isNumber(this.totalPrice)) {
				var shownPrice;
				//if (this.brotherThatSelected) {
				//	//shownPrice = this.totalPrice - this.brotherThatSelected.getPrice();
				//	shownPrice = this.totalPrice - this.brotherThatSelected.getUnitPrice();
				//}
				//// 选择的就是自己
				//else {
				//	shownPrice = this.totalPrice - this.getUnitPrice();

				//}
				shownPrice = this.totalPrice - (this.compareMoney || 0);

				if (shownPrice == 0) {
					shownPrice = '--';
				}
				else {
					shownPrice = (shownPrice >= 0 ? '+' : '-') + Math.abs(util.decimal(shownPrice, 1));
				}



				this.nodePrice.html(shownPrice);
			}
			return this;
		},
		changePriceByCount: function (count) {
			this.count = parseInt(count);
			this.totalPrice = util.decimal(this.priceEach * this.count, 1);
			return this;
		},
		toggleRoomDetail: function (e) {
			this.isDetailShown = !this.isDetailShown;
			if (this.roomDetail) {
				this.roomDetail[this.isDetailShown ? 'show' : 'hide']();
			}
			else {
				$.getJSON(apiGetRoomDetail, {
					RoomId: this.roomId
				}, _.bind(this.onFetchBack, this))
			}
			this.emit('height-changed', this);
		},
		onCountChange: function (count, prevCount) {
			// 必须先改变自身的总价，才方便其他room计算差价
			this.changePriceByCount(count)
				.emit('count-change', this, util.int(count), util.int(prevCount));
		},
		onSelectBtnClick: function (e) {
			if (!this.isButtonMode) return;

			//this.select(true).emit('select-click', this);
			//if (this.countSelector.getValue() == 0) {
			// set index, 选择第一个备选值
			//this.countSelector.setValue(0);
			//alert('please select one room first.');
			//}
			//else {
			this.emit('select-click', this);
			//}
		},
		onFetchBack: function (json) {
			//var deferred = new $.Deferred();
			if (json.errno === 0) {
				this.initDetail(json.data).roomDetail[this.isDetailShown ? 'show' : 'hide']();
				//deferred.resolve();
			}
			else {
				//deferred.reject();
			}
			//return deferred;
		}
	});
	EventEmitter.mixTo(Room);

	/*
	* 
	* @interface implements IDetailPageOrderComponent
	* 
	* @event 'select-click'()
	* @event 'room-click'(room)
	* @event 'room-count-change'(room, count)
	* @event 'height-changed'(this)
	* 
	*/
	var Hotel = inherit({
		/*
		* @param {jQueryNode} nodeWrap
		* @param {Array} RoomInfos // ResourceSearch接口返回的数据
		* @param {Number} compareMoney
		* @param {Boolean} [isAllRoomLoaded = true] // 如果已经加载了，就不必ajax去加载了
		* @param {Boolean} [autoChangeWhenRoomChange=true]
		* @param {Function} [setAjaxDataWhenNeed(data)]
		*/
		__constructor: function (options) {
			this.options = _.extend({
				autoChangeWhenRoomChange: true,
				isAllRoomLoaded: true
			}, options);
			var nodeWrap = options.nodeWrap;
			this.node = nodeWrap;
			this.id = this.node.data('hotel-id');
			this.name = 'hotel';

			this.initRoomNodes(nodeWrap.find('.htl_room_list'));

			this.nodeBtnMore = nodeWrap.find('.flod_spread_btn');
			this.nodeBtnSelect = nodeWrap.find('.col_btn a');

			this.isOpened = false;

			this.initRooms();

			// 如果有多个房间，就相当于已经ajax回来了，测试时候多方一些数据，不必ajax
			//this.ajaxStatus = this.rooms.length > 1 ? 2 : 0;
			this.ajaxStatus = this.options.isAllRoomLoaded ? 2 : 0;

			_.bindAll(this, 'onMoreClick', 'onSelectClick');
			this.nodeBtnMore.on('click', 'a', this.onMoreClick);
			this.nodeBtnSelect.on('click', this.onSelectClick);
		},
		initRoomNodes: function (nodeRoomWrapper) {
			this.nodeRoomWrapper = nodeRoomWrapper;
			this.nodeRoomItems = this.nodeRoomWrapper.find('.js-room-item');
			this.nodeRoomItemFirst = this.nodeRoomItems.eq(0);
			this.nodeRoomLoading = this.nodeRoomWrapper.find('.js-room-loading');
		},
		initRooms: function () {
			this.selectedRoomBeforeReInitRoomsData = this.getSelectedRoom();
			this.rooms = [];
			var selectedRoom, compareMoney = this.options.compareMoney;
			_.each(this.nodeRoomItems, _.bind(function (roomNode) {
				var room = new Room($(roomNode), {
					compareMoney: compareMoney
				});
				this.rooms.push(room);

				if (room.isSelected) selectedRoom = room;
				room.on('select-click', _.bind(this.onRoomSelect, this));
				room.on('count-change', _.bind(this.onRoomCountChange, this));
				room.on('height-changed', _.bind(this.onRoomHeightChange, this));
			}, this));

			if (selectedRoom) this._selectRoom(selectedRoom);
			return this;
		},
		getHotelId: function () {
			return this.id;
		},
		getCompareMoney: function () {
			return this.options.compareMoney;
		},
		getSegmentNumber: function () {
			return this.node.data('segment-number');
		},
		moreBtnSwitch: function (open) {
			this.nodeBtnMore.children('a').eq(open ? 0 : 1).hide().siblings().show();
			return this;
		},
		roomsSwtich: function (open) {
			//this.nodeRoomWrapper.children('li:gt(0)')[open ? 'show' : 'hide']();
			//this.nodeRoomItems.not(this.nodeRoomItemFirst)[open ? 'show' : 'hide']();
			var selectedRoom = this.getSelectedRoom(), otherRoomNode;
			var roomStillShown = selectedRoom || this.rooms[0]; //this.nodeRoomItems.eq(0);
			//			if (selectedRoom) {
			//				otherRoomNode = this.nodeRoomItems.not(selectedRoom.node);
			//			}
			//			else {
			//				otherRoomNode = this.nodeRoomItems;
			//			}
			otherRoomNode = this.nodeRoomItems.not(roomStillShown.node);
			otherRoomNode[open ? 'show' : 'hide']();
			this.emit('height-changed', this);
			return this;
		},
		// 这些ajax数据不能依赖于自身，否则很难复用组件，要在实例中设置
		// 自身可以拿到的数据自然可以设置
		/* data format:
		{
		"ProductID": 单线路为GV.app.detail.data.ProductID,多线路为当前选择线路的ProductID
		"SegmentNumber": 1,
		"CheckInDate": "2013-12-10",
		"CheckOutDate": "2013-12-12",
		"AdultNum": 2,
		"ChildNum": 0,
		"OrderName": "Recommend",
		"OrderType": "DESC",
		"HotelList": "", //[内部设置数据]// 更多房型时 传hotel id 
		"RoomCount": 1, //[内部设置数据] //需要返回几条数据
		"HotelSearchResponseFlag": ""
		}
		*/
		setAjaxData: function (data) {
			this.ajaxData = data;
			return this;
		},
		getMoreRoomsByAjax: function () {
			this.swtichLoading(true);

			this.options.setAjaxDataWhenNeed && this.options.setAjaxDataWhenNeed.call(this);
			// 临时的假数据
			//this.ajaxData = {"ProductID":2273129,"SegmentNumber":1,"CheckInDate":"2013-12-14T00:00:00","CheckOutDate":"2013-12-15T00:00:00","AdultNum":2,"ChildNum":0,"OrderName":"Recommend","OrderType":"DESC","HotelList":"","HotelCount":5,"RoomCount":1,"HotelSearchResponseFlag":""};
			this.ajaxStatus = 1;
			var data = this.ajaxData;
			var roomSelected = this.getSelectedRoom();
			if (!data) throw 'Set the ajax data first!';

			data.HotelList = this.getHotelId(); //roomSelected.getId();
			//data.RoomCount = 3; //roomSelected.countSelector.getValue();

			$.ajax({
				type: 'GET',
				//type: 'POST',
				url: GV.app.detail.api.getMoreHotel,
				data: { query: cQuery.stringifyJSON(data) }
			})
			.done(_.bind(function (json) {
				this.swtichLoading(false);

				this.ajaxStatus = 2;
				if (_.isString(json)) json = $.parseJSON(json);
				if (json.errno == 0) {
					var prevRoom = this.options.RoomInfos,
						prevRoomIds = _.pluck(prevRoom, 'Room');
					// 剔除已经存在的房间
					json.data = _.filter(json.data, function (roomData) { return _.indexOf(prevRoomIds, roomData.Room) == -1 });
					var dataRooms = this.options.RoomInfos = prevRoom.concat(json.data);
					var newNodeRooms = $(tplRoomList({ RoomInfos: dataRooms }));
					this.nodeRoomWrapper.replaceWith(newNodeRooms);
					//this.nodeRoomWrapper = newNodeRooms;

					this.initRoomNodes(newNodeRooms);
					this.initRooms();

					this.roomsSwtich(this.isOpened);
				}
				else {
					this.ajaxRoomError(json.errmsg);
				}
			}, this))
			.fail(_.bind(function (xhr) {
				this.ajaxRoomError('网络错误，请重试');
			}, this));
		},
		ajaxRoomError: function (msg) {
			this.ajaxStatus = 0;
			var op = this.isOpened = false;
			this.roomsSwtich(op).moreBtnSwitch(op).swtichLoading(op);
			alert(msg);
		},
		getSelectedRoom: function () {
			return this.rooms && _.find(this.rooms, function (room) { return room.isSelected });
		},
		selectRoom: function (index) {
			var room = this.rooms[index];
			_.invoke(this.rooms, 'select', room);
			return this;
		},
		swtichLoading: function (show) {
			this.nodeRoomLoading[show ? 'show' : 'hide']();
			return this;
		},
		syncData: function (roomId, roomCount) {
			var roomInfo = _.find(this.options.RoomInfos, function (roomData) { return roomData.Room == roomId });
			if (roomInfo) {
				roomInfo.SelectedRoomNum = roomCount;
			}
		},
		_switch: function (open) {
			var op = this.isOpened = _.isBoolean(open) ? open : !this.isOpened;
			this.roomsSwtich(op).moreBtnSwitch(op);
			return op;
		},
		_selectRoom: function (room) {
			// 通知每一个 room ，有一个 room 被选择了
			//this.options.autoChangeWhenRoomChange && _.invoke(this.rooms, 'select', room);
			var prevSelectedRoom = this.getSelectedRoom(); // || this.selectedRoomBeforeReInitRoomsData; //_.find(this.rooms, function (room) { return room.isSelected });
			if (prevSelectedRoom === room) prevSelectedRoom = this.selectedRoomBeforeReInitRoomsData;
			_.invoke(this.rooms, 'select', room);
			this.emit('room-click', room, prevSelectedRoom);

			var prevTotalPrice = prevSelectedRoom && (prevSelectedRoom.getCount() * prevSelectedRoom.getUnitPrice());
			var nowTotalPrice = room.getCount() * room.getUnitPrice();
			this.emit('changed-total-price', nowTotalPrice, prevTotalPrice);

			return this;
		},
		onRoomCountChange: function (room, count, prevCount) {
			// 现在的逻辑，一个房间改变并不会影响其他房间的任何情况
			//_.invoke(this.rooms, 'showPrice', room);
			room.changePriceByCount(count).showPrice();
			if (room.isSelected) {
				var roomPrice = room.getUnitPrice();
				this.emit('changed-total-price', count * roomPrice, prevCount * roomPrice);
			}
			this.syncData(room.getId(), count);

			this.emit('room-count-change', room, count);
		},
		onRoomSelect: function (room) {
			this._selectRoom(room);

			//选择之后，需要折叠起来
			//this.onMoreClick();
			this._switch(false);
		},
		onRoomHeightChange: function (room) {
			this.emit('height-changed', this, room);
		},
		onSelectClick: function (e) {
			this.emit('select-click');
		},
		onMoreClick: function (e) {
			var op = this._switch(); // this.isOpened = !this.isOpened;

			// status == 1 的话，就是正在 ajax 中，如何提示再定
			if (this.ajaxStatus === 0) {
				this.getMoreRoomsByAjax();
			}
			// 只要没有加载成功，就需要切换 loading 的显示
			if (this.ajaxStatus !== 2) {
				this.swtichLoading(op);
			}
			//else {

			//}
		}
	});
	EventEmitter.mixTo(Hotel);

	module.exports = Hotel;
});