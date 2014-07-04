define(function(require, exports, module){
	var $ = require('jquery');

	function Invoice() {
		var self = this,
			vdata = self.data,
			roles = vdata.roles,
			mod = vdata.modules;
		return {
			invoiceInfo: { title: '', content: '' },
			init: function () {
				var me = this;
				var data = vdata.initData.Invoice;
				var initData = (function () {//初始化发票信息
					var _data = vdata.initData.OrderInvoice;
					var _ret = {};
					if (_data) {
						$.each(_data, function (k, v) {
							if (v)
								_ret['init' + k] = v;
						})
					}
					return _ret;
				} ());
				if (!data) {
					roles.invoiceID.hide();
					return;
				}
				self.render(self.tpl.invoiceDf, initData, function (dom) {
					roles.invoiceID.append(dom);
				});
				self.render(self.tpl.invoiceBox, $.extend(data, initData), function (dom) {
					$(dom).appendTo(roles.invoiceID).hide();
					me.role = self.common.getRoles(roles.invoiceID);
					me.bindEvent($.isEmptyObject(initData), initData);
				});
			},
			bindEvent: function (isNoInit, data) {//isNoInit 没有初始化数据
				var me = this;
				var role = this.role;
				var myInvoices;
				var sug;
				roles.invoiceID.on('click', 'a.revise', function (event) {
					event.preventDefault();
					$(this).closest('ul').hide();
					role.selectInvo.click();
					role.invoice.show();
				})
				.on('blur', 'input[role="getInvoice"]', function () {
					me.checkInvoiceTitle();
				});
				if (!isNoInit) {
					me.invoiceInfo = {
						title: data.initTitle,
						content: data.initContent
					};
				}
				role.selectInvo.click(function () {
					role.invoiceli.show();
					mod.Delivery.hideTip();
					mod.Delivery.toRender('invoice');
				});
				role.cancelInvo.click(function () {
					role.invoiceli.hide();
					mod.Delivery.hideTip();
					mod.Delivery.toRender('noInvoice');
					me.invoiceInfo = {
						title: '',
						content: ''
					};
					role.getInvoice.data('valid') && role.getInvoice.data('valid').hide();
				});
				if (myInvoices = vdata.initData.Invoice.MyInvoices) {
					sug = me.genarateSug(myInvoices);
					role.getInvoice.bind('focus', function () {
						var _this = $(this);
						var offset = _this.offset();
						sug.show().css({
							top: offset.top + _this.outerHeight(),
							left: offset.left
						});
						sug.find('a').bind('mousedown', function () {
							_this.val($(this).html());
						});
					}).bind('blur', function () {
						sug.hide();
					});
				}
			},
			genarateSug: function (data) {
				var _ret;
				self.render(self.tpl.ivoiceSug, { list: data }, function (dom) {
					_ret = $(dom).appendTo('body').css({
						'position': 'absolute',
						'display': 'none'
					});
				});
				return _ret;
			},
			save: function () {
				if (!vdata.initData.Invoice) {
					return;
				}
				var role = this.role;
				var idx = role.invoiceDetail.val();
				var detail = $.trim(role.getInvoice.val());
				if (detail && role.selectInvo.prop('checked')) {
					this.invoiceInfo = {
						title: $.trim(role.getInvoice.val()),
						content: role.invoiceDetail.find("option:selected").text()
					};
				}
				self.formData.InvoiceInfo = {
					Title: this.invoiceInfo.title,
					Detail: this.invoiceInfo.content
				};
			},
			showTip: function (el, data, opts) {
				var ovalid = $(el).data('valid');
				opts = $.extend({ target: el, data: data }, opts || {});
				ovalid = ovalid ? ovalid.show(opts) :
						new self.validate(opts).show();
				$(el).data('valid', ovalid);
			},
			checkInvoiceTitle: function () {
				var el = this.role.getInvoice;
				if (!el) {
					return false;
				}
				var val = $.trim(el.val());
				if ('' === val) {
					this.showTip(el[0], '请填写发票抬头');
					return false;
				}
				if (val === '个人' || val === '公司' || val === '待定') {
					this.showTip(el[0], '发票抬头必须为个人姓名或者公司名称');
					return false;
				}
				return true;
			},
			verify: function () {
				var me = this;
				var el = me.role.getInvoice;
				var idx;
				if (me.role.invoice.css('display') !== 'none') {
					if (me.role.selectInvo.prop('checked')) {
						if (!me.checkInvoiceTitle()) {
							if (!self.status.errorElem) {
								self.status.errorElem = el[0];
							}
							return false;
						} else {
							me.save();
							return true;
						}
					}
				} else {
					me.save();
					return true;
				}
			}
		}
	}
	return Invoice;
});