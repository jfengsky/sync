define(function (require, exports, mdoule) {
    var _ = require('underscore');

	exports.slice = Array.prototype.slice;
	exports.int = function (num) {return parseInt(num, 10)};

	exports.BOOLEAN_ATTR = ['required', 'disabled', 'readonly', 'autofocus', 'checked', 'multiple'];

	var REG_IE = /MSIE (\d+\.\d+)/;
	var _ie_version;
	exports.getIE = function (){
		if(_ie_version === undefined){
			var msie = navigator.userAgent.match(REG_IE);
			_ie_version = msie && exports.int(msie[1]);
		}
		return _ie_version;
	};

	exports.getType = function(dom){
		var nodeName = dom.nodeName.toLowerCase();
		var type = nodeName === 'input' ? (dom.getAttribute('vc-type') || dom.getAttribute('type') || 'text') : nodeName;
		return type;
	};

	/** 
	 * 我真的找不到一个更好的方法来解析这一推字符串...
	 * HTML: <input id="a" class="a-b b c" height=50px width="45px" bbb="bb=" multiple required ng-repeat="id in ids" gid="a" json={"a":"a"}>
	 * dom.outerHTML: <INPUT id=a class="a-b b c" height=50 width=45 json='{"a":"a"}' gid="a" ng-repeat="id in ids" required multiple bbb="bb=">
	 */
	exports.getAttrs = function(s){
		var r = [];
		var prevAttr = [];
		// 引号
		var quote = null;
		// 转义字符 -- 手写的HTML也会有转义字符，到outerHTML阶段，已经被转义了，所以 \ 也不必特别处理
		for(var i=0,ii=s.length;i<ii;i++){
			var ch = s.charAt(i);
			if(ch == '"' || ch == "'"){
				if(!quote) quote = ch;
				else if(quote == ch) quote = null; 
				else prevAttr.push(ch);
				continue;
			}
			if(ch == ' ' && !quote){
				if(prevAttr.length) {
					r.push(prevAttr.join(''));
					prevAttr = [];
				}else prevAttr.push(ch);
			}
			else prevAttr.push(ch);
		}
		if(prevAttr.length) r.push(prevAttr.join(''));

		return _.map(r, function (attr) {
			var index = attr.indexOf('=');
			return {
				name: index >= 0 ? attr.substr(0, index) : attr,
				value: index >= 0 && attr.substr(index + 1)
			};
		});
	};

	exports.InputPartialPrototype = {
		_addError: function(name){
			this.$error[name] = true;
			return this;
		},
		_delError: function(name){
			var isPrevEmpty = _.isEmpty(this.$error), isNowEmpty;
			delete this.$error[name];
			isNowEmpty = _.isEmpty(this.$error);
			if(!isPrevEmpty && isNowEmpty){
				this.emit('error-fixed');
			}
			return this;
		},
		_delErrors: function(name1, name2){
			var names = exports.slice.apply(arguments);
			for(var i=0,ii=names.length; i<ii; i++) this._delError(names[i]);
			return this;
		},
		_dealError: function(name, validate, errorExpression){
			if(errorExpression){
				this._addError(name);
				validate = false;
			}
			else{
				this._delError(name);
			}
			return validate;
		}
	};

	// 需要被 bind
	exports._setValue = function(value){
		// checkbox 的 value 是数组
		this.prevValue = _.clone(this.currentValue);
		this.currentValue = value;
		if(this.options.autoValidateAfterError && !_.isEmpty(this.$error)){
			this.validate();
		}
		this.emit('change', value);
	};
});