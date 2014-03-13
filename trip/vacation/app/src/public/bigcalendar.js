
/*
* @Author xhjin
* @CreateDate  2013/11/4
* @Desc  大日历


    
//对于当前默认业务参数说明
seajs.use('..../bigcalendar.js', function(main) {
//渲染一 返回内部对象
main.init("#calendar1",{
data:{"2013-11-02":[2389,9999,0,0,0,0],"2013-11-16":[2319,9999,0,0,0,0],"2013-11-23":[2319,9999,0,0,0,0],"2013-12-07":[2199,9999,0,0,0,0],"2013-12-21":[2199,9999,0,0,0,0]},
range:["2013-11-02","2015-09-08"],
today:"2014-12-31",
weekday: "1234567",
interfaceModel:"default", //自定义好的接口
prohibit: "2012-1-2|2013-1-1".replace(/@/g, "|"),//禁用
permit:"",//允许

refresh:function(months){//切换时候 返回数组[年,月]
alert(months);
},
select:function(date){//选中具体某个日期
alert(date);
},

//以下都是可选参数 非必要
isTeam: true,
isGroupBuy: false,
isSemiSelf: false
});
//渲染二
$("#calendar1").bigcalendar({...});


//如果要对当前已经日历重新渲染 可以下均可
main.init("#calendar1","refresh");
main.init("#calendar1",{....}).refresh();
    
$("#calendar1").bigcalendar({...},"refresh");
$("#calendar1").bigcalendar("refresh");

});

GDateLib:为含有日期操作的一些公用方法，多个类均有引用

对象继承方式
从Core 基类创建 集成Event Callback对象 =>生成GObj
    
历核心控件
由GObj 进行扩展，扩展出一个核心的GCalendarCore  控制类(Controller)以及视图类(Viewer)，
然后分别在对控制类、视图类扩建出实际的控制类(GController)以及视图类(GViewer)
之后产生大日历对象（GCalendar） 内部 组合（GController，GViewer）；
大日历扩展相关业务信息 由 接口(GInterfaceModel) 提供,
bigcalendar 方法 进行包装 提供统一的方法


//目前预设了default扩展信息实现方式
GInterfaceModel.add(key,{//key 为对应的interfaceModel模式
init:function(){
            
},
//datai:当前日期对应的data
//date 当前日期字符串
//enabled 是否可以用
//isdouble 当前是否双月显示
//data 参数中的data对象
dayView:function(datai,date,enabled,isdouble,data){
}

});

GInterfaceModel：default 需要传递的参数
    
//参数说明：
//range:["2013-11-02","2015-09-08"], //日期范围
//today:"2014-12-31",//当前日期
//weekday: "1234567",//工作日
//interfaceModel:"default", //自定义好的接口 可不传
//prohibit: ,//禁用 日期下划线划开 统一去0模式 2012-01-01=>2012-1-1
//permit:"2012-1-1|2012-2-2",//允许

// interfaceModel  如不传递默认采用 default扩展信息展示
//data 数据格式{"2012-12-12":[2389,9999,0,0,0,0] 价格,集便宜数量,集便宜人数,...}
//可选参数：
//festivalList:{"2012-12-12":"节假日"}
//festivalLogoList:{"2012-12-12":1}假期
//isGroupBuy 是否集便宜 isTeam isSemiSelf 团队游 
//ps:目前日历结构固定，如要更改，需适当更改bigcalendar 方法

*/
define(function (require, exports, module) {
	var cssPath = ''; // window["_debug_bigcalendar_css"] || "../../../../../css/comptent/bigcalendar/bigcalendar.css";
	//module.uri.replace(/^(http:\/\/.*[\/])(js[\/])/gi,function($0,$1){
	//    cssPath=$1+"css/comptent/bigcalendar/bigcalendar.css";
	//});
	var $ = require("jquery");
	cssPath && require.async(cssPath);
	Handlebars.registerHelper('compareTo', function (a, b, options) {
		if (a > b) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	var FObj = {};

	function $s2t(a) { return a };

	/**
	* 回调函数管理
	* unique memory stopOnFalse once
	*/
	FObj.Callbacks = FObj.Callbacks || (function () {
		var flagsCache = {},
            createFlags = function (flags) {
            	var object = flagsCache[flags] = {},
                    i, length;
            	flags = flags.split(/\s+/);
            	for (i = 0, length = flags.length; i < length; i++) {
            		object[flags[i]] = true;
            	}
            	return object;
            },
            handle = 1,
            Callbacks = function (flags) {
            	$.extend(this, {
            		flags: flags ? (flagsCache[flags] || createFlags(flags)) : {},
            		list: [],
            		stack: [],
            		/*memory: undefinde,
            		firing: undefinde,
            		firingStart: undefinde,
            		firingLength: undefinde,
            		firingIndex: undefinde,*/
            		needSort: false
            	});
            };
		Callbacks.prototype = {
			//排序
			sort: function () {
				this.list.sort(function (a, b) {
					return b[1] - a[1];
				});
			},
			//添加
			add: function (fn, level) {
				level = level || 0;
				var list = this.list,
                    flags = this.flags,
                    target;
				if (list && (!flags.unique || !(target = this.has(fn)))) {
					handle++;
					if (this.firing) {
						var i = this.firingIndex + 1;
						for (; i < this.firingLength; i++) {
							if (level > list[i][1]) {
								break;
							}
						}
						list.splice(i, 0, [fn, level, handle]);
						this.firingLength++;
						if (level > list[this.firingIndex][1])
							this.needSort = true;
					} else {
						var length = list.length;
						list.push([fn, level, handle]);
						if (this.memory && this.memory !== true) {
							if (length > 0 && level > list[length - 1][1])
								this.needSort = true;
							this.firingStart = length;
							this._fire(this.memory[0], this.memory[1]);
						} else {
							this.sort();
						}
					}
					return handle;
				} else if (target) {
					return target[2];
				}
				return -1;
			},
			_remove: function (index) {
				if (this.firing) {
					if (index <= this.firingLength) {
						this.firingLength--;
						if (index <= this.firingIndex) {
							this.firingIndex--;
						}
					}
				}
				this.list.splice(index, 1);
			},
			remove: function (target) {
				var list = this.list,
                    flags = this.flags;
				if (list) {
					var type = typeof target,
                        i = 0,
                        l = list.length;
					if (type === "function") {
						for (; i < l; i++) {
							if (list[i][0] === target) {
								this._remove(i);
								i--;
								l--;
								if (flags.unique) {
									break;
								}
							}
						}
					} else if (type === "number") {
						for (; i < l; i++) {
							if (list[i][2] === target) {
								this._remove(i);
								i--;
								l--;
								if (flags.unique) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			has: function (target) {
				var list = this.list;
				if (list) {
					var i = 0,
                        length = list.length,
                        type = typeof target;
					if (type === "function") {
						for (; i < length; i++) {
							if (target === list[i][0]) {
								return list[i];
							}
						}
					} else if (type === "number") {
						for (; i < length; i++) {
							if (target === list[i][2]) {
								return list[i];
							}
						}
					}
				}
				return false;
			},
			_fire: function (context, args) {
				args = args || [];
				var flags = this.flags,
                    list = this.list;
				this.memory = !flags.memory || [context, args];
				this.firing = true;
				this.firingIndex = this.firingStart || 0;
				this.firingStart = 0;
				this.firingLength = list.length;
				for (; list && this.firingIndex < this.firingLength; this.firingIndex++) {
					if (list[this.firingIndex][0].apply(context, args) === false && flags.stopOnFalse) {
						this.memory = true;
						break;
					}
				}
				this.firing = false;
				if (list) {
					if (!flags.once) {
						if (this.needSort) {
							this.sort();
							this.needSort = false;
						}
						if (this.stack && this.stack.length) {
							this.memory = this.stack.shift();
							this.fire(memory[0], memory[1]);
						}
					} else if (this.memory === true) {
						this.disable();
					} else {
						this.empty();
					}
				}
			},
			fire: function (context, args) {
				if (this.stack) {
					if (this.firing) {
						if (!this.flags.once) {
							this.stack.push([context, args]);
						}
					} else if (!(this.flags.once && this.memory)) {
						this._fire(context, args);
					}
				}
			},
			empty: function () {
				this.list = [];
			},
			disable: function () {
				this.list = this.stack = this.memory = undefined;
			},
			disabled: function () {
				return !this.list;
			}
		};
		return Callbacks;
	})();

	/**
	* 简单基类
	*/
	FObj.Core = FObj.Core || (function () {
		var initializing = false,
            fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;
		var Class = function () { };
		//类扩展
		Class.extend = function (prop) {
			var _super = this.prototype;

			initializing = true;
			var prototype = new this();
			initializing = false;

			for (var name in prop) {
				prototype[name] = typeof prop[name] === "function" &&
                typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                	return function () {
                		var tmp = this._super;
                		this._super = _super[name];
                		var ret = fn.apply(this, arguments);
                		this._super = tmp;

                		return ret;
                	};
                })(name, prop[name]) : prop[name];
			}

			function Class() {
				if (!initializing && this.init) {
					var result = this.init.apply(this, arguments);
					if (typeof result !== "undefined")
						return result;
				}
			}
			Class.prototype = prototype;
			Class.constructor = Class;
			Class.extend = arguments.callee;
			return Class;
		};
		return Class;
	})();
	/**
	* 自定义事件类
	*/
	var GObj = FObj.Event = FObj.Event || (function (Callbacks) {
		return FObj.Core.extend({
			newEvent: function (eventName, config) {
				if (!this.eventHandle)
					this.eventHandle = {};
				if (!this.events)
					this.events = {};
				//if(!this.events[eventName])
				this.events[eventName] = new Callbacks(config);
			},
			addEvent: function (eventName, fn, level) {

				if (!(this.events && this.events[eventName])) {
					this.newEvent(eventName, "");
				}
				var handle = this.events[eventName].add(fn, level);
				this.eventHandle[handle] = eventName;
				return handle;
			},
			removeEvent: function () {
				if (!this.events)
					return false;
				var eventName, handle, fn;
				if (typeof arguments[0] === "number") {
					handle = arguments[0];
					eventName = this.eventHandle[handle];
					if (this.events[eventName])
						this.events[eventName].remove(handle);
				}
				else if (typeof arguments[0] === "string" && typeof arguments[1] === "function") {
					eventName = arguments[0];
					fn = arguments[1];
					if (this.events[eventName])
						this.events[eventName].remove(fn);
				}
				else if (typeof arguments[0] === "string" && typeof arguments[1] === "number") {
					eventName = arguments[0];
					handle = arguments[1];
					if (this.events[eventName])
						this.events[eventName].remove(handle);
				}
				else if (typeof arguments[0] === "string" && typeof arguments[1] === "undefined") {
					eventName = arguments[0];
					if (this.events[eventName])
						this.events[eventName].empty();
				}
				else if (typeof arguments[0] === "undefined") {
					this.events = {};
				}
				return false;
			},
			unEvent: function (eventName) {
				if (typeof eventName === "string") {
					if (this.events[eventName])
						this.events[eventName].disable();
				} else {
					for (eventName in this.events)
						this.events[eventName].disable();
				}
			},
			triggerEvent: function (eventName) {
				if (this.events && this.events[eventName]) {
					this.events[eventName].fire(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		});
	})(FObj.Callbacks);


	//日期操作对象 
	var GDateLib = {
		compareDate: function (date1, date2) {
			date1 = this.strToDate(date1);
			date2 = this.strToDate(date2);
			return (date1 - date2) / 24 / 3600 / 1000;
		},
		addDate: function (date, addDays) {
			date = this.strToDate(date);
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + addDays * 1);
			return date;
		},
		maxDate: function (date1, date2) {//返回两个日期较晚的一个
			date1 = this.strToDate(date1);
			date2 = this.strToDate(date2);
			var date = new Date(Math.max(date1, date2));
			return date;
		},
		minDate: function (date1, date2) {//返回两个日期较早的一个
			date1 = this.strToDate(date1);
			date2 = this.strToDate(date2);
			var date = new Date(Math.min(date1, date2));
			return date;
		},
		/**
		* 将日期（日期格式或数字格式）转换为字符串
		* [format] "yyyy": 年, "mm": 月, "MM": 补0月, "dd": 日, "DD": 补0日
		*/
		dateToStr: function (date, format) {
			format = format || "yyyy-mm-dd";
			if (format === "MM-DD") {
				return (date.getMonth() + 1) + "-" + date.getDate();
			}

			if (/Date/.test(Object.prototype.toString.call(date))) {
				return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
			}
			else if (typeof string === "number") {
				date = new Date(date);
				return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
			}
			else if (this.checkDateStr(date)) {
				return date;
			}
			else {
				return null;
			}
		},
		/**
		* 将有效的日期字符串或数字转换为日期
		*/
		strToDate: function (string, format) {
			format = format || "yyyy-mm-dd";
			var date;

			if (date = this.checkDateStr(string)) {
				return new Date(date[0], date[1] - 1, date[2]);
			}
			else if (typeof string === "number") {
				return new Date(string);
			}
			else if (/Date/.test(Object.prototype.toString.call(string))) {
				return string;
			}
			else {
				return null;
			}
		},
		/**
		* 判断date是否在range范围（全包含）内
		* @returns {array} [bool, string(early-range|in-range|later-range)]
		*/
		isInDate: function (date, range) {
			date = this.strToDate(date);
			range[0] = range[0] ? this.strToDate(range[0]) : 0;
			range[1] = range[1] && range[1] !== Infinity ? this.strToDate(range[1]) : Infinity;
			if (date < range[0]) {
				return [false, "early-range"];
			}
			else if (date > range[1]) {
				return [false, "later-range"];
			}
			else {
				return [true, "in-range"];
			}
		},
		/**
		* 检测一个字符串是否是一个有效的日期字符串
		* @param {string} flag [不传/undefined：完整日期检测、"M"：年月检测、"P"：部分检测]
		*/
		checkDateStr: function (string, flag) {
			if (typeof string !== "string") return null;

			var dateComplete = /^(\d{4})\-(0?[1-9]|1[012])\-(0?[1-9]|[12]\d|3[01])$/,
                datePart = /^(\d{0-4}|\d{4}\-|\d{4}\-(0|(0?[1-9]|1[012])\-?)|\d{4}\-(0?[1-9]|1[012])\-(0|(0?[1-9]|[12]\d|3[01])))$/,
                dateYearAndMonth = /^(\d{4})\-(0?[1-9]|1[012])$/;

			function checkDate(date) {
				date = date.split("-");

				return date.length !== 3 || new Date(date[0], date[1] - 1, date[2]).getDate() == date[2];
			}

			var tmp;
			switch (flag) {
				case undefined:
					tmp = string.match(dateComplete);
					return tmp === null ? null : checkDate(string) ? [parseInt(tmp[1], 10), parseInt(tmp[2], 10), parseInt(tmp[3], 10)] : null;
				case "M":
					tmp = string.match(dateYearAndMonth);
					return tmp === null ? null : [parseInt(tmp[1], 10), parseInt(tmp[2], 10)];
				case "P":
					return datePart.test(string) && checkDate(string);
				default:
					return null;
			}
		},
		/**
		* 把年月转换为自1970年1月以来的月数
		*/
		monthToNumber: function (year, month) {
			return (year - 1970) * 12 + parseInt(month, 10) - 1;
		},
		/**
		* 把1970年1月以来的月数转换为[年,月]
		*/
		numberToMonth: function (number) {
			return [parseInt(number / 12, 10) + 1970, number % 12 + 1];
		},
		/**
		* 获取一个月的天数
		*/
		getDayNumber: function (year, month) {
			return new Date(year, month, 0).getDate();
		},
		/**
		* 获取一个月的第一天是周几（0为周日）
		*/
		getStartWeek: function (year, month) {
			return new Date(year, month - 1, 1).getDay();
		}
	}
	//日历核心控件
	var GCalendarCore = {
		//控制器
		Controller: GObj.extend({
			init: function (opts) {
				this.setOptions(opts);
			},
			setOptions: function (opts) {
				opts = $.extend({
					step: 1,
					range: [0, Infinity]
				}, opts);
				$.extend(this, opts, {
					month: 0
				});
				var _this = this;
				this.range[0] = (function (date, DateLib) {
					date = date || 0;
					if (date === 0) {
						return date;
					}
					else {
						date = DateLib.strToDate(date);
						return DateLib.monthToNumber(date.getFullYear(), date.getMonth() + 1);
					}
				})(this.range[0], this.DateLib);
				this.range[1] = (function (date, DateLib) {
					date = date || Infinity;
					if (date === Infinity) {
						return date;
					}
					else {
						date = DateLib.strToDate(date);
						return DateLib.monthToNumber(date.getFullYear(), date.getMonth() + 1);
					}
				})(this.range[1], this.DateLib);
				this.month = this.range[0];
			},
			prevMonth: function () {
				this.view(Math.max(this.month - this.step, this.range[0]));
			},
			nextMonth: function () {
				this.view(Math.min(this.month + this.step, this.range[1] - this.step + 1));
			},
			view: function (year, month) {
				if (arguments.length == 2) {
					this.month = this.DateLib.monthToNumber(year, month);
				}
				else {
					this.month = arguments[0];
				}

				var months = [this.DateLib.numberToMonth(this.month)];
				for (var i = 1; i < this.step; i++) {
					months[i] = this.DateLib.numberToMonth(this.month + i);
				}
				this.refresh(months);
			},
			refresh: function (months) {
				this.triggerEvent("change", months);
			},
			getStatus: function () {
				var status = [true, true];
				if (this.month <= this.range[0])
					status[0] = false;
				if (this.month + this.step > this.range[1])
					status[1] = false;
				return status;
			},
			DateLib: GDateLib
		}),
		//显示器
		Viewer: GObj.extend({
			init: function (opts) {
				this.setOptions(opts);
			},
			setOptions: function (opts) {
				opts = $.extend({
					today: (function () {
						var date = new Date;
						return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
					})(),
					range: [0, Infinity],
					prohibit: "",
					permit: "",
					weekday: "1234567"
				}, opts);
				$.extend(this, opts);

				this.range[0] = this.range[0] ? this.DateLib.strToDate(this.range[0]) : 0;
				this.range[1] = this.range[1] ? this.DateLib.strToDate(this.range[1]) : Infinity;
				this.prohibit = this.prohibit.replace(/\-0/g, "-");
				this.permit = this.permit.replace(/\-0/g, "-");

				var date = this.DateLib.checkDateStr(this.today);
				$.extend(this, {
					year: date[0],
					month: date[1],
					lastSelectedDate: "",
					selectedDate: ""
				});
			},
			view: function () {
				switch (arguments.length) {
					case 1:
						{
							var date;
							if (date = this.DateLib.checkDateStr(arguments[0])) {
								this.view.apply(this, date);
							}
							else if (date = this.DateLib.checkDateStr(arguments[0], "M")) {
								this.view.apply(this, date);
							}
							else {
								this.view();
							}
							break;
						}
					case 2:
						{
							this.year = arguments[0];
							this.month = arguments[1];
							this.refresh("M");
							break;
						}
					case 0:
						{
							this.lastSelectedDate = this.selectedDate;
							this.selectedDate = "";
							this.refresh("D");
							break;
						}
					case 3:
						{
							this.lastSelectedDate = this.selectedDate;
							this.selectedDate = arguments[0] + "-" + arguments[1] + "-" + arguments[2];
							this.year = arguments[0];
							this.month = arguments[1];
							this.refresh("D");
							break;
						}
				}
			},
			refresh: function (type) {
				this.triggerEvent("change", this.selectedDate);
			},
			getDateStatus: function (date) {
				if (arguments.length === 3) {
					date = arguments[0] + "-" + arguments[1] + "-" + arguments[2];
				}
				if ($.type(date) === "date" || this.DateLib.checkDateStr(date)) {
					var string = this.DateLib.dateToStr(date);
					date = this.DateLib.strToDate(date);
					var flag = this.DateLib.isInDate(date, this.range);
					if (!flag[0]) return flag;
					if (this.permit.indexOf("|" + string + "|") != -1) return [true, "permit"];
					if (this.weekday.indexOf(date.getDay() || 7) == -1) return [false, "out-weekday"];
					if (this.prohibit.indexOf("|" + string + "|") != -1) return [false, "prohibit"];
					return [true, "normal"];
				}
				else {
					return [false, "date-error"];
				}
			},
			DateLib: GDateLib
		})
	};

	//控制器类
	var GController = GCalendarCore.Controller.extend({
		init: function (opts) {
			opts = $.extend({
				node: null,
				range: ["0001-01-01", "9999-12-31"],
				needHalfView: false
			}, opts);
			this.setOptions(opts);
			var date = this.DateLib.checkDateStr(this.today);
			this.month = this.DateLib.monthToNumber(date[0], date[1]);
			this.viewNode1 && this.viewNode1.hide();
			if (this.node) this.node.removeClass("pkg_double_month");
			this.refreshStatus();
		},
		setOptions: function (opts) {
			this._super(opts);
			var as = this.node.find("a"), ps = this.node.find("p");
			$.extend(this, {
				btnPrev: as.eq(0),
				btnNext: as.eq(1),
				viewNode1: ps.eq(0),
				viewNode2: ps.eq(1)
			});
		},
		//刷新界面显示
		refresh: function (months) {
			var month = months[0];
			if (this.needHalfView) {
				if (this.getStatus()[0]) {
					this.viewNode1.hide();
					this.node.removeClass("pkg_double_month");
				} else {
					this.viewNode1.show();
					this.node.addClass("pkg_double_month");
					this.viewNode1.html(month[0] + $s2t("年") + "<br />" + month[1] + $s2t("月"));
					month = this.DateLib.numberToMonth(this.DateLib.monthToNumber(month[0], month[1]) + 1);
				}
			} else {

			}
			this.viewNode2.html(month[0] + $s2t("年") + "<br />" + month[1] + $s2t("月"));
			this.refreshStatus();
			this.triggerEvent("change", months);
		},
		//刷新按钮状态
		refreshStatus: function () {
			var _this = this, status = this.getStatus();
			this.btnPrev.attr("class", status[0] ? "pkg_circle_top" : "pkg_circle_top pkg_circle_top_disable").off("mousedown");
			this.btnNext.attr("class", status[1] ? "pkg_circle_bottom" : "pkg_circle_bottom pkg_circle_bottom_disable").off("mousedown");

			status[0] && this.btnPrev.on("mousedown", function () {//前一月
				_this.prevMonth();
			});
			status[1] && this.btnNext.on("mousedown", function () {//后一月
				_this.nextMonth();
			});
		}
	});
	//视图类
	var GViewer = GCalendarCore.Viewer.extend({
		init: function (opts) {
			opts = $.extend({
				nodeList: null,
				needHalfView: false,
				range: ["0001-01-01", "9999-12-31"],
				prohibit: "",
				weekday: "1234567",
				today: new Date(),
				ExtendInfo: null
			}, opts);
			this.setOptions(opts);
			this.bindEvents();
		},
		setOptions: function (opts) {
			this._super(opts);
		},
		bindEvents: function () {
			var nodeList = this.nodeList, _this = this;
			nodeList.off("click").on("click", function () {//通常他们属于一个对象 所以这里增加off
				if ($(this).hasClass("on")) { _this.triggerEvent("select", $(this).attr("date")); }
			});
		},
		//刷新界面显示
		refresh: function () {
			var i, l, day, dayStr, date, nodeList = this.nodeList, year = this.year, month = this.month, extendInfo, enabled,
                startWeek = this.DateLib.getStartWeek(year, month),
                dayNum = this.DateLib.getDayNumber(year, month), prop = {};
			//显示双月
			if (this.needHalfView && year == this.range[0].getFullYear() && month == this.range[0].getMonth() + 1) {
				day = Math.ceil((dayNum + startWeek) / 7) === 5 ? 15 - startWeek : 22 - startWeek;
				prop.isdouble = true;
				//显示第一个月
				for (i = 0, l = dayNum + 1; day < l; i++, day++) {
					date = [year, month, day].join("-");
					enabled = this.getDateStatus(date)[0];
					extendInfo = this.ExtendInfo.getDayView(date, enabled, prop);
					nodeList.eq(i).attr("class", extendInfo[0]).html(extendInfo[1]).attr("date", date);
				}
				//显示第二个月
				var _month = GDateLib.numberToMonth(GDateLib.monthToNumber(year, month) + 1);
				year = _month[0]; month = _month[1];

				for (day = 1; i < 42; i++, day++) {
					date = [year, month, day].join("-");
					enabled = this.getDateStatus(date)[0];
					extendInfo = this.ExtendInfo.getDayView(date, enabled, prop);
					nodeList.eq(i).attr("class", extendInfo[0]).html(extendInfo[1]).attr("date", date);
				}
			} else {//显示单月

				var start = startWeek, end = startWeek + dayNum;
				prop.isdouble = false;
				prop.indexStart = start;
				prop.indexEnd = end;

				for (i = 0, l = nodeList.length, day = 1 - startWeek; i < l; i++, day++) {
					date = new Date(year, month - 1, day);
					enabled = this.getDateStatus(date)[0];
					prop.index = 0;
					prop.day = day;
					extendInfo = this.ExtendInfo.getDayView(this.DateLib.dateToStr(date), enabled, prop);
					nodeList.eq(i).attr("class", extendInfo[0]).html(extendInfo[1]).attr("date", date);
				}
				/*
				for (i = 0; i < startWeek; i++) {
				nodeList.eq(i).attr("class", "").html("").attr("date", "");
				}
				for (l = startWeek + dayNum, day = 1; i < l; i++, day++) {
				date = [year, month, day].join("-");
				enabled = this.getDateStatus(date)[0];
				extendInfo = this.ExtendInfo.getDayView(date, enabled);
				nodeList.eq(i).attr("class", extendInfo[0]).html(extendInfo[1]).attr("date", date);
				}
				for (i = l, l = nodeList.length; i < l; i++) {
				nodeList.eq(i).attr("class", "").html("").attr("date", "");
				}*/
			}
		}
	});
	//大日历
	var GCalendar = GObj.extend({
		init: function (opts) {
			opts = $.extend({
				controlBox: null,
				dayNodeList: [],
				range: ["0001-01-01", "9999-12-31"],
				prohibit: "",
				weekday: "1234567",
				today: ""
			}, opts);
			this.setOptions(opts);
			this.refresh();
		},
		getFirstDate: function (range, opts) {
			var startDate = this.DateLib.strToDate(range[0]),
                endDate = this.DateLib.strToDate(range[1]);

			while (this.DateLib.compareDate(startDate, endDate) <= 0 && !this.getDateStatus(startDate, opts)[0]) {
				startDate = this.DateLib.addDate(startDate, 1);
			}
			return this.DateLib.dateToStr(startDate);
		},
		getDateStatus: function (date, opts) {
			opts = $.extend({
				range: [0, Infinity],
				prohibit: "",
				permit: "",
				weekday: "1234567"
			}, opts);
			if ($.type(date) === "date" || this.DateLib.checkDateStr(date)) {
				var string = this.DateLib.dateToStr(date);
				date = this.DateLib.strToDate(date);
				var flag = this.DateLib.isInDate(date, opts.range);
				if (!flag[0]) return flag;
				if (opts.permit.indexOf("|" + string + "|") != -1) return [true, "permit"];
				if (opts.weekday.indexOf(date.getDay() || 7) == -1) return [false, "out-weekday"];
				if (opts.prohibit.indexOf("|" + string + "|") != -1) return [false, "prohibit"];
				return [true, "normal"];
			}
			else {
				return [false, "date-error"];
			}
		},
		setOptions: function (opts) {
			this.options = opts = $.extend({}, this.options, opts); //重新配置参数

			opts.range[0] = this.getFirstDate(opts.range, opts);
			var needHalfView = this.needHalfView(opts.range[0], opts.today);
			//实例化控制器
			this.controller = new this.Controller({
				node: opts.controlBox,
				today: opts.today,
				range: [opts.range[0], opts.range[1]],
				needHalfView: needHalfView
			});
			//实例化显示器
			this.viewer = new this.Viewer({
				nodeList: opts.dayNodeList,
				range: opts.range,
				prohibit: opts.prohibit,
				weekday: opts.weekday,
				today: opts.today,
				needHalfView: needHalfView,
				ExtendInfo: opts.CalendarExtendInfoInterfaceModel//提供一个接口
				/*ExtendInfo: new this.CalendarExtendInfo({
				dateInfo: opts.dateInfo,
				festivalList: opts.festivalList,
				isTeam: opts.isTeam,
				isGroupBuy: opts.isGroupBuy,
				isSemiSelf: opts.isSemiSelf
				})*/
			});
			this.bindEvents(); //事件重新绑定
		},
		refresh: function () {
			this.controller.view(this.controller.month); //重新执行这个控制类 控制类触发change 会执行视图的view
			//this.viewer&&this.viewer.refresh();
		},
		bindEvents: function () {
			var _this = this;
			this.controller.addEvent("change", function (months) {//绑定翻月事件
				var month = months[0];
				_this.viewer.view(month[0], month[1]);
				_this.triggerEvent("change", months);
			});
			this.viewer.addEvent("select", function (date) {//绑定选择事件
				_this.triggerEvent("select", date);
			});
		},
		//检测是否需要半月显示
		needHalfView: function (rangeStart, today) {
			return false;
			rangeStart = rangeStart.split("-");
			today = today ? this.DateLib.strToDate(today) : new Date();
			var firstMonthLastDay = new Date(rangeStart[0], rangeStart[1], 0),
                halfMonthStart = firstMonthLastDay.getDate() - (14 + firstMonthLastDay.getDay());

			if (rangeStart[2] >= halfMonthStart) {
				if (today.getFullYear() === firstMonthLastDay.getFullYear() && today.getMonth() === firstMonthLastDay.getMonth()) {
					if (today.getDate() >= halfMonthStart) {
						return true;
					}
					else {
						return false;
					}
				}
				else {
					return true;
				}
			}
			else {
				return false;
			}
		},
		DateLib: GDateLib,
		Controller: GController,
		Viewer: GViewer
	});

	//日历扩展包
	var GCalendarExtendInfoInterface = function () {//获取日历扩展包
		return function (interfaceModel) {//返回一个生成器 根据参数生成个个扩展包
			var o = new interfaceClass();
			if (interfaceModel && typeof interfaceModel == "object");
			else if (interfaceModel == "line") interfaceModel = {};
			else interfaceModel = {};
			return o;
		};
	} ();
	var GInterfaceModel = (function () {//接口模型 CalendarExtendInfoInterfaceModel
		function interfaceClass(options) {//根据传递的对象 产生一个扩展包
			var opt = this.options = options || {};
			var data = {}, _data = opt.data || {};
			for (var k in _data) {
				data[k.replace(/\-0/g, "-")] = _data[k];
			}
			opt.data = data;
		}
		interfaceClass.prototype = {
			constructor: interfaceClass,
			dayView: function () { throw new Error('dayView(data,enabled):方法未定义'); },
			init: function () { throw new Error('init():方法未定义'); },
			getDayView: function (date, enabled, prop) {
				var opt = this.options, result = this.dayView(opt.data[date], date, enabled, prop, opt.data);
				return typeof result == "string" ? ["", result] : result;
			},
			DateLib: GDateLib
		}
		var _interfaces = {};
		return {
			create: function (obj) {//生成接口 生成器，在使用的时候 再初始化
				var o = {};
				obj = obj || {};
				return { init: function (options) {
					var $this = new interfaceClass(options);
					for (var k in obj) {
						if (obj.hasOwnProperty(k)) {
							$this[k] = obj[k];
						}
					}
					$this.init();
					return $this;
				}
				};
			},
			add: function (key, obj) {//如果存在生成全新对象
				return _interfaces[key] = this.create(obj);
			},
			get: function (obj) {//自动判断生成
				return ((typeof obj == "string" || !obj) && _interfaces[obj]) || this.create(obj);
			}
		};
	})();



	//data 数据格式
	//
	//{"2012-12-12":[2389,9999,0,0,0,0] 价格,集便宜数量,集便宜人数,...}
	//可选参数：
	//festivalList:{"2012-12-12":"节假日"}
	//festivalLogoList:{"2012-12-12":1}假期
	//isGroupBuy 是否集便宜 isTeam isSemiSelf 团队游 

	GInterfaceModel.add("default", {//增加默认接口模型
		templete: {
			dayView:
            '<a>\
                <span class="date basefix">\
                {{#if festivalLogo}}<i>' + $s2t("节") + '</i>{{/if}}\
                {{day}}\
                {{#if festival}}{{festival}}{{/if}}\
                </span>\
                {{#if enabled}}\
                <span class="team basefix">{{desc}}&nbsp;</span>\
                <span class="bigcalendar_price01">\
                    {{#compareTo price 0}}<dfn>&yen;</dfn>{{price}}' + $s2t("起") +
                    '{{else}}' + $s2t("实时计价") +
                    '{{/compareTo}}\
                </span>\
                {{/if}}\
            </a>',
			calendarList: "\
            <strong>{{month}}-{{day}}</strong>({{weekday}})\
            <span class=\"base_price\">\
                {{#compareTo price 0}}<dfn>&yen;</dfn><strong>{{price}}" + $s2t("起") + "</strong>\
                {{else}}" + $s2t("实时计价") +
                "{{/compareTo}}\
            </span>\
            {{#if isTeam}}\
            <span class=\"num_person\">{{desc}}</span>\
            {{/if}}"
		},
		init: function () {
			var opt = this.options;
			opt.festivalList = opt.festivalList || {};
			opt.festivalLogoList = opt.festivalLogoList || {};
		},
		dayView: function (datai, date, enabled, prop, data) {//data 来自外部的data对象的对应的每个枚举日期
			var opt = this.options
            , odate = $.extend({
            	enabled: enabled, price: "", desc: ""
                , date: this.DateLib.strToDate(date)
            }, datai); //创建一个新对象
			//,datai=opt.data[date];
			if (enabled) {
				if (datai) {
					odate.price = datai[0];
					var count = datai[1], peopleCount = datai[2];
					if (opt.isGroupBuy) {//集便宜
						if (count == 0) odate.enabled = false;
						if (peopleCount > 0) odate.desc = peopleCount + $s2t("人已购");
					} else if (opt.isTeam || opt.isSemiSelf) {//团队游
						if ($.type(count) == "array" && count[0] == "T") {
							odate.desc = $s2t("<em>成团</em>")
							count = count[1];
							odate.desc += $s2t("余") + ((num <= 9 && num > 0) ? (num + $s2t("位")) : $s2t("余≥10"));
						}
						if (count == -1) {
							odate.desc = "";
						} else if (count == 0) {
							odate.desc = $s2t("售完");
							//info.enabled = false;
						}
						//其他
					} else {
						if (count == 0) {
							odate.enabled = false;
						} else if (count == 1) {
							odate.desc = $s2t("余") + count + $s2t("位");
						}
					}
				}
				else {
					odate.price = 0;
				}
			}
			odate.day = odate.date.getDate();
			odate.festival = opt.festivalList[date] || "";
			odate.festivalLogo = opt.festivalLogoList[date] || "";
			var className = odate.enabled ? "on" : "";
			if (prop.isdouble) className = "bgblue " + className;
			var content = Handlebars.compile(this.templete.dayView)(odate || {});
			if (odate.desc == $s2t("售完")) {
				className += " out";
			}
			return [className, content];
		}
	});

	//GInterfaceModel.add("line",{});//增加线路接口模型

	function bigcalendar(content, options) {
		this.$content = $(content);

		options.class_prefix = options.class_prefix === undefined ? 'big' : options.class_prefix;
		options.tpl_need_wrapper = options.tpl_need_wrapper === undefined ? true : options.tpl_need_wrapper;
		options.need6tr = options.need6tr === undefined ? true : options.need6tr;

		var opt = this.options = options
		this.$content.html(this.getTemplete("initialization"));
		opt.controlBox = this.$content.find("[data-plug-bigcalendar='control']").eq(0); //控制层
		opt.dayNodeList = this.$content.find("td"); //日期显示容器
		this.init();
		this.bindEvents();

	}
	bigcalendar.prototype = {
		init: function () {
			var opt = this.options;
			opt.today = opt.today || this.format("yyyy-MM-dd", new Date());
			if (opt.range) {
				if (opt.range instanceof Array) {
					opt.range[0] = opt.range[0] || "0001-01-01";
					opt.range[1] = opt.range[1] || "9999-12-31";
				}
			}
			//获取日历扩展包 并且初始化
			//因为Viewr类中 会直接调用接口方法，并且无法传递数据源，所以在传递的时候 进行异步初始化，将数据闭包在这个接口内
			opt.CalendarExtendInfoInterfaceModel = GInterfaceModel.get(opt['interfaceModel']).init(opt);

			if (this.oCalendar) {//如果存在日历对象 则对这些参数 进行显示覆盖，不能重新生成，否则会出现 之前的addEvent丢失
				this.oCalendar.setOptions(opt);
			}
			else this.oCalendar = new this.Calendar(opt);
			this.$content.attr(opt.valueName, opt.today);
		},
		bindEvents: function () {
			var _this = this, opt = this.options;
			this.oCalendar.addEvent("change", function (months) {//绑定翻月事件
				opt.refresh && opt.refresh.call(_this, months);
			});
			this.oCalendar.addEvent("select", function (date) {//绑定选择事件
				opt.select && opt.select.call(_this, date, _this);
				_this.setValue(date);
			});
		},
		format: function (format, date) {
			format = format || "yyyy-MM-dd"; date = date || new Date();
			var o = {
				"y+": date.getFullYear(), //year
				"M+": date.getMonth() + 1, //month
				"d+": date.getDate(),    //day
				"h+": date.getHours(),   //hour
				"m+": date.getMinutes(), //minute
				"s+": date.getSeconds(), //second
				"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
				"S": date.getMilliseconds() //millisecond
			}
			for (var k in o) {
				var bReg = new RegExp("(" + k + ")");
				format = format.replace(bReg, function ($1) {
					var v = "0000" + o[k], l = v.length;
					return ($1.length > (l - 4) || k == "y+") ? v.substr(l - $1.length) : o[k];
				});
			}
			return format;
		},
		refresh: function () {
			this.init();
			this.oCalendar && this.oCalendar.refresh();
		},
		getValue: function () {
			var opt = this.options;
			return this.$content.attr(opt.valueName) || "";
		},
		setValue: function (date) {
			var opt = this.options;
			return this.$content.attr(opt.valueName, (date));
		},
		getTemplete: function (name, data) {
			var opt = this.options;
			if (data && bigcalendar.templete[name]) {
				return Handlebars.compile(bigcalendar.templete[name](opt))(data);
			}
			else if (bigcalendar.templete[name]) {
				return bigcalendar.templete[name](opt);
			}
			return "";
		},
		Calendar: GCalendar,
		constructor: bigcalendar
	};
	bigcalendar.templete = {
		"__tpl_initialization_is_compiled": false,
		"__tpl_initialization": '\
                    {{#if tpl_need_wrapper}}<div class="{{class_prefix}}calendar">{{/if}}\
                    <ul class="{{class_prefix}}calendar_num basefix"><li class="bold">六</li>\
                    <li>五</li><li>四</li><li>三</li><li>二</li><li>一</li><li class="bold">日</li>\
                    </ul>\
                    <div class="basefix">\
                    <div class="{{class_prefix}}calendar_left pkg_double_month" data-plug-bigcalendar="control">\
                    <p class="border bgblue"></p>\
                    <p></p>\
                    <a href="javascript:;" title="上一月" class="pkg_circle_top">上一月</a>\
                    <a href="javascript:;" title="下一月" class="pkg_circle_bottom">下一月</a>\
                    </div>\
                    <table class="{{class_prefix}}calendar_right">\
                    <tbody>\
                    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\
                    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\
                    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\
                    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\
                    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\
                    {{#if need6tr}}<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>{{/if}}\
                    </tbody></table></div>\
                    <div class="bigcalendar_loding" style="display:none;"><span class="loading">查询中，请稍后...</span></div>\
                    {{#if tpl_need_wrapper}}</div>{{/if}}\
                    ',
		"initialization": function (opt) {
			if (!bigcalendar.templete.__tpl_initialization_is_compiled) {
				bigcalendar.templete.__tpl_initialization_is_compiled = true;
				bigcalendar.templete.__tpl_initialization = Handlebars.compile(bigcalendar.templete.__tpl_initialization);
			}
			return bigcalendar.templete.__tpl_initialization(opt);
		}
	};
	bigcalendar.options = {//初始化参数
		core: "data-plug-bigcalendar",
		valueName: "data-bigcalendar-value"
	};

	$.fn.bigcalendar = function (opts, cmd, params) {
		var _options = bigcalendar.options;
		opts = opts || {}, _arguments = arguments;
		return this.each(function () {
			var $this = $(this), data = $this.data(_options.core), options;
			if (typeof opts == 'object') {
				options = $.extend({}, data ? data.options : _options, opts);
				if (data) data.options = options;
			}
			if (!data) $this.data(_options.core, (data = new bigcalendar(this, options)));
			if (typeof opts == 'string' && data[opts]) data[opts].apply(data, [].slice.call(_arguments, 1));
			else if (typeof cmd == 'string' && data[cmd]) data[opts].apply(data, [].slice.call(_arguments, 2));
		});
	}

	var handler = {
		init: function (content, options) {
			$(content).bigcalendar(options);
			return $(content).data(bigcalendar.options.core);
		}
	}
	exports.init = function (content, options) {
		return handler.init(content, options);
	}
	//exports.templete=bigcalendar.templete;
	exports.interfaceModel = GInterfaceModel;

});