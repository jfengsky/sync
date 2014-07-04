/*
 * @class SelectBase
 * @author peic@ctrip.com
 * 
 * @doc http://www.peichao01.com/static_content/ctrip/html/SelectBase.html
 *
 * 目前比较简单
 *
 *	@method getValue()=>{String}
 *	@method setValue(value_or_index_or_optionNode, {VALUE_CHANGE_TYPE}changeType)=>{SelectBase}
 * 
 *	@event change(newValue, oldValue, {VALUE_CHANGE_TYPE}changType, {Object}Hash, {Event}domEvent)
 *	@event option-show()
 *	@event option-hide()
 *	@event invalid-value({error:'invalid xxx', ...})
 *
 */
define(function (require, exports, module) {
	var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		inherit = require("../../../lib/inherit"),
		EventEmitter = require("Modules/EventEmitter");

	var VALUE_CHANGE_TYPE = {
		INPUT: 'input',
		OPTION_CLICK: 'option_click',
		OPTION_ENTER: 'option_enter',
		INIT: 'init'
	};

	var SelectBase = inherit({
		/*
		* @param {jQueryNode} nodeWrap
		* @param {String} [classNameOptionHover = 'current']
		* @param {String} [selectorOption = 'a']
		* @param {Boolean} [onlyInOption = true] //setValue 的值必须在 option 选项中，否则发出错误事件
		* @param {RegExp} [validReg] //对setValue 的值进行正则test，为 false 则发出错误事件
		* @param {Function} [validFn(val)] // 对 setValue 的值进行验证，返回 false 则发出错误事件
		*/
		__constructor: function (options) {
			this.opt = _.extend({
				classNameOptionHover: 'current',
				selectorOption: 'a',
				onlyInOption: true
			}, options);
			var nodeWrap = options.nodeWrap;
			this.node = nodeWrap;
			this.input = nodeWrap.find('input');
			// 奇葩的HTML结构
			this.nodeB = this.input.siblings('b');
			this.optionWrap = nodeWrap.find('p');
			this.options = this.optionWrap.find(this.opt.selectorOption);

			this.value = $.trim(this.input.val());
			this.selectedOption = null;
			if (this.value != '') this.setValue(this.value, VALUE_CHANGE_TYPE.INIT);

			this.hoveredOption = null;
			this.hoveredIndex = null;
			//this.hoveredValue = null;
			this.valueChangeType = null;

			this.isOptionsShown = !this.optionWrap.is(':hidden');
			this.isFocusIn = false;
			this.isOnOptions = false;

			_.bindAll(this, 'onInputFocusin', 'onInputFocusout', 'onInputChange', 'onBClick', 'onOptionsMouseover', 'onOptionsMouseout', 'onOptionsClick');
			this.onDocKeyupBinded = _.bind(this.onDocKeyup, this);
			this.input.focus(this.onInputFocusin);
			this.input.focusout(this.onInputFocusout);
			this.input.on('change', this.onInputChange);
			this.nodeB.on('click', this.onBClick);
			this.optionWrap.on('mouseover', this.onOptionsMouseover);
			this.optionWrap.on('mouseout', this.onOptionsMouseout);
			this.optionWrap.on('click', 'a', this.onOptionsClick);
		},
		getNodeInput: function () {
			return this.input;
		},
		getValue: function () {
			return this.value;
		},
		setValue: function (value_or_index_or_optionNode, changType, domEvent) {
			var r, optionNode;
			if (changType == VALUE_CHANGE_TYPE.INPUT && !this.opt.onlyInOption) {
				r = { value: value_or_index_or_optionNode };
			}
			else {
				r = this._preprocessValueType(value_or_index_or_optionNode);
			}

			if (!r.error) {
				var oldValue = this.value;
				if (oldValue != r.value) {
					this.value = r.value;
					this.input.val(this.value);

					this.selectedOption = r.optionNode ? $(r.optionNode) : null;

					this.valueChangeType = changType;
					this.emit('change', this.value, oldValue, changType, r, domEvent);
				}
			}
			else {
				//throw 'value is Invalid.';
				this.emit('invalid-value', r);
				this.input.val(this.value);
			}

			return this;
		},
		_preprocessValueType: function (value_or_index_or_optionNode) {
			var result = {};
			if (_.isString(value_or_index_or_optionNode)) {
				result.value = value_or_index_or_optionNode;
				var option = _.find(this.options, function (option) { return $.trim($(option).text()) == result.value });
				if (option) {
					result.optionNode = option;
				}
				else {
					result.error = 'invalid value';
				}
			}
			else {
				if (_.isNumber(value_or_index_or_optionNode)) {
					var index = result.index = value_or_index_or_optionNode;
					if (index < 0 || index >= this.options.length) {
						result.error = 'invalid index';
					} else {
						result.optionNode = this.options.eq(result.index);
					}
				}
				else {
					if (_.indexOf(this.options, value_or_index_or_optionNode[0]) < 0) {
						result.error = 'invalid optionNode';
					}
					else {
						result.optionNode = value_or_index_or_optionNode;
					}
				}
				result.value = result.optionNode.text();
			}
			return result;
		},
		_setHover: function (index_or_optionNode) {
			var r = this._preprocessValueType(index_or_optionNode);
			this.hoveredIndex = r.index;
			this.hoveredOption = r.optionNode;
			r.optionNode.addClass(this.opt.classNameOptionHover).siblings().removeClass(this.opt.classNameOptionHover);

			return this;
		},
		_up: function () {
			var len = this.options.length;
			var nextIndex = this.hoveredIndex <= 0 ? (len - 1) : (this.hoveredIndex - 1);
			return this._setHover(nextIndex);
		},
		_down: function () {
			var len = this.options.length;
			var nextIndex = (this.hoveredIndex >= len - 1) ? 0 : (this.hoveredIndex + 1);
			return this._setHover(nextIndex);
		},
		_toggleOptionWrap: function (show) {
			show = _.isBoolean(show) ? show : !this.isOptionsShown;

			//避免重复执行，特别是下面的添加监听事件更要避免重复
			if (show === this.isOptionsShown) return this;

			if (this.isOptionsShown = show) {
				this.optionWrap.show();
				this._setHover(0);
				$(document).on('keyup', this.onDocKeyupBinded);

				this.emit('option-show');
				//每次显示下拉菜单，都重置这个值
				this.valueChangeType = null;
			}
			else {
				this.optionWrap.hide();
				$(document).off('keyup', this.onDocKeyupBinded);

				this.emit('option-hide');
			}
			return this;
		},
		onInputFocusin: function (e) {
			this.isFocusIn = true;

			this._toggleOptionWrap(true);
		},
		onInputFocusout: function (e) {
			this.isFocusIn = false;

			if (!this.isOnOptions) {
				this._toggleOptionWrap(false);
			}
		},
		onInputChange: function (e) {
			var val = $.trim(this.input.val());

			var error;
			if (this.opt.validReg) error = !(val.match(this.opt.validReg));
			if (this.opt.validFn) error = !(this.opt.validFn.call(this, val));

			if (error) {
				this.emit('invalid-value', val);
				this.valueChangeType = VALUE_CHANGE_TYPE.INPUT;
				this.input.val(this.value);
			}
			else {
				this.setValue(val, VALUE_CHANGE_TYPE.INPUT, e);
			}
		},
		onBClick: function () {
			this.input[0].focus();
		},
		onOptionsMouseover: function (e) {
			this.isOnOptions = true;
		},
		onOptionsMouseout: function (e) {
			this.isOnOptions = false;

			if (!this.isFocusIn) {
				this._toggleOptionWrap(false);
			}
		},
		onOptionsClick: function (e) {
			this.setValue($(e.currentTarget), VALUE_CHANGE_TYPE.OPTION_CLICK, e)._toggleOptionWrap(false);
		},
		onDocKeyup: function (e) {
			//console.log(e);
			switch (e.keyCode) {
				//enter                                                       
				case 13:
					var valueInInput = this.input.val();
					//如果已经手动更改值，则优先使用手动输入的值，而不使用下拉菜单的值
					if (this.valueChangeType !== VALUE_CHANGE_TYPE.INPUT) {
						this.setValue(this.hoveredOption, VALUE_CHANGE_TYPE.OPTION_ENTER, e);
					}
					//this._toggleOptionWrap(false);
					this.input.blur();
					break;
				//down                                                       
				case 40:
					this._down();
					break;
				//up                                                      
				case 38:
					this._up();
					break;
			}
		}
	}, {
		VALUE_CHANGE_TYPE: VALUE_CHANGE_TYPE
	});

	EventEmitter.mixTo(SelectBase);
	module.exports = SelectBase;
});