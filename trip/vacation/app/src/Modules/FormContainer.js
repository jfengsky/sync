define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');
	var util = require('./form_util');

	var canNew = false;
	var caches = [];

	/**
	* @event error({Array}errorComps)
	*/
	var Container = inherit({
		/**
		* @param {jqNode} node
		* @param {Object} InputClassList
		*/
	    __constructor: function (options) {
	        if (!canNew) throw "Please use FormContainer.get().";
			this.options = _.extend({}, options);
			this.node = options.node;
			this.dom = options.node[0];
			// 如果在这里遍历每一种类型，必然会把所有类型的JS文件都加载进来
			// 所以放到实例化时传递进来
			this.InputClassList = options.InputClassList;
			
			this._initComponents();
		},
		_initComponents: function(){
			this.components = {};
			_.each(this.node.find('input,select,textarea'), _.bind(function(dom){
				var type = util.getType(dom);
				// 首字母大写
				var KlassName = type.replace(/^\w/,function(m){return m.toUpperCase()});
				var KlassTipName = (dom.nodeName.toLowerCase()==='input' ? "Input" : "") + KlassName;
				var Klass = this.InputClassList[KlassName];
				if(!Klass) throw "[" + KlassTipName + "] was used but not required.";
				if(!Klass.get || typeof Klass.get !== 'function') throw "[" + KlassTipName + "] do not have the get() method";
				var component = Klass.get({
					node: $(dom)
				});
				//if(_.indexOf(this.components, component) == -1) this.components.push(component);
				this.components[component.name] = component;
			}, this));
			// component 会把相同 name 的 input（如 radio）合并为一个并返回
			_.each(this.components, _.bind(function(component){
				component.on('change', _.bind(this.onComponentChange, this, component));
				component.on('error', _.bind(this.onComponentError, this, component));
				component.on('error-fixed', _.bind(this.onComponentErrorFix, this, component));
			}, this));
		},
		/**
		* @example setValue("gender", "male");
		* @example setValue({gender: "male", age: 20})
		*/
		setValue: function(name, value){
			var values;
			if(value){
				values = {};
				values[name] = value;
			}
			else{
				values = name;
			}
			
			_.each(values, _.bind(function(value, name){
				var comp = this.components[name];
				comp && comp.setValue(value);
			}, this));
			return this;
		},
		getValue: function(){
			var values = {};
			_.each(this.components, function(comp){
				values[comp.name] = comp.getValue();
			});
			return values;
		},
		getError: function(){
			var errorComp = _.filter(this.components, function(comp){ return !_.isEmpty(comp.$error)});
			return errorComp;
		},
		validate: function(){
			_.invoke(this.components, 'validate');
			validate = _.every(this.components, function(component){ return _.isEmpty(component.$error) });
			if(!validate) this.emit('error', this.getError());
			return validate;
		},
		getComponentByName: function(name){
			return this.components[name];
		},
		onComponentChange: function(component, value){
			this.emit('component-change', component, value);
		},
		onComponentError: function(component, $error){
			this.emit('component-error', component, $error);
		},
		onComponentErrorFix: function(component){
			this.emit('component-error-fixed', component);
		}
	}, {
	    /**
		* @param {jqNode} node
		* @param {Object} InputClassList
		*/
	    get: function (options) {
	        canNew = true;
	        var container = _.find(caches, function (container) { return container.dom == options.node[0] }) || new Container(options);
	        canNew = false;
	        return container;
	    }
	});
	EventEmitter.mixTo(Container);

	module.exports = Container;
});