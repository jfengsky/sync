define(function (require, exports, module) {
    var $ = require('jquery');
	return { //绑定事件
		regNotice: function () {
			var cq = cQuery;
			cq.mod.load('notice', '1.0', function () {
				["#notice1", "#notice2", "#notice3", "#notice4"].each(function (o) {
					if (!cq(o).length) {
						return true;
					}
					cq(o).regMod('notice', '1.0', {
						name: o,
						tips: cq(o).attr('_cqnotice'),
						selClass: 'inputSel'
					}, true);
				});
				cq('.cq').each(function (o) {
					cq(o).regMod('notice', '1.0', {
						name: o,
						tips: o.attr('_cqnotice'),
						selClass: 'inputSel'
					}, true);
				});
			});
		},
		regJmp: function () {
			cQuery.mod.load('jmp', '1.0', function () {
				var ins = cQuery(document).regMod('jmp', '1.0', { cc: 2 });
			})
		},
		submit: function () {//提交
			var self = this;
			var vdata = self.data;
			var mod = vdata.modules;
			var text = vdata.roles.submitID.html();
			var submitFn = function (event) {
				var me = this;
				event.preventDefault();
				if (!vdata.isLogin) {
					loadCheckLogin && loadCheckLogin();
					return;
				}
				self.status.errorElem = null;
				self.removeValidate();
				$.each('Travellers|Contacter|Invoice|Delivery'.split('|'), function (k, v) {
					mod[v].verify();
					// if(!mod[v].verify()) return false;//去掉
				});
				mod.Extras.save.call(mod.Extras);
				if ($('#agreeContract').length && !$('#agreeContract').prop('checked')) {
					if (!self.status.errorElem) {
						self.status.errorElem = $('#agreeContract')[0];
						alert('请仔细阅读预订须知和重要条款，并在“我接受”一栏打勾，才能接受你的预订请求！');
					}
				}
				self.formData.IsTmpOrder = 0;
				if (self.status.errorElem) {
					$(document).scrollTop($(self.status.errorElem).offset().top - 20);
					return false;
				} else {
					$(me).html('请稍候…');
					vdata.roles.submitID.unbind('click');
					$.ajax({
						url: vdata.handles.bookingInfo,
						type: 'POST',
						data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
						timeout: 120000,
						success: function (data) {
							self.status.isPay = true;
							data = typeof data === 'string' ? self.common.parseJSON(data) : data;
							if (data.errno === 0) {
								if(vdata.handles.Pay.length>0){
									location.href = vdata.handles.Pay;
								}else{
									$(data.data).appendTo('body').submit();
								}
							} else {
								alert(data.errmsg);
								$(me).bind('click', submitFn).html(text);
							}
						},
						error: function () {
							alert('网络超时，请重新提交');
							$(me).bind('click', submitFn).html(text);
						}
					});
				}
			}
			vdata.roles.submitID.bind('click', submitFn);
		},
		save: function () {
			var self = this;
			var me = this;
			var mod = this.data.modules;
			var text;
			var vdata = self.data;
			var submitFn = function (el, event) {
				$.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
					mod[v].save();
				});
				self.formData.IsTmpOrder = 1;
				self.formData.TempOrderType = 0;
				if (!$(el).data('txt')) {
					$(el).data('txt', 1);
					text = $(el).html();
				}
				$(el).html('请稍候…');
				$(el).unbind('click');
				$.ajax({
					url: vdata.handles.bookingInfo,
					type: 'POST',
					data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
					timeout: 10000,
					success: function (data) {
						data = typeof data === 'string' ? self.common.parseJSON(data) : data;
						if (data.errno === 0) {
							self.render(self.tpl.tempSave, data.data, function (dom) {
								$('body').append(dom);
								cQuery('#tempSaveMask').mask();
								$('#tempSaveMask').on('click', 'a[role="close"],a[role="confirm"]', function (event) {
									event.preventDefault();
									cQuery('#tempSaveMask').unmask();
									$('#tempSaveMask').remove();
									$(el).bind('click', function (event) {
										submitFn(this, event);
									}).html(text);
								})
							});
							self.status.isTmpSave = true;
						}
						if (data.errno === 1) {
							alert(data.errmsg);
							$(el).bind('click', function (event) {
								submitFn(this, event);
							}).html(text);
						}
					},
					error: function () {
						alert('网络超时，请重新提交');
						$(el).bind('click', function (event) {
							submitFn(this, event);
						}).html(text);
					}
				});
			};
			$('a[role="save"]').bind('click', function (event) {
				event.preventDefault();
				if (!vdata.isLogin) {
					loadCheckLogin && loadCheckLogin();
					return;
				}
				vdata.EnableTemporarySave && submitFn(this, event);
			});
			return submitFn;
		},
		autoSave: function () {
			var self = this;
			var mod = this.data.modules;
			var vdata = self.data;
			if (!vdata.isLogin || !vdata.EnableAutoTemporarySave) return;
			window.onbeforeunload = function (event) {
				$(document).click(function (e) {
					return false;
				});
				if (!self.status.isTmpSave && self.data.roles.travellersID.children('[filled="t"]').length && !self.status.isPay) {
					$.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
						mod[v].save();
					});
					self.formData.IsTmpOrder = 1;
					self.formData.TempOrderType = 1;
					$.ajax({
						url: vdata.handles.bookingInfo,
						type: 'POST',
						async: true,
						data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
						timeout: 15000,
						success: function (data) { }
					});
					if (cQuery.browser.isFirefox) {
						if (confirm('您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。确定要离开本页吗？')) {
							history.go();
						} else {
							window.setTimeout(function () { window.stop(); }, 1);
						}
					} else {
						return '您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。';
					}
				}
			};
		}
	}
});