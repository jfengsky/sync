define(function(require, exports, module){
	var $ = require('jquery');

	function Delivery() {
		var self = this,
			vdata = self.data,
			roles = vdata.roles
		msg = {
			recipient: '请填写收件人',
			contactTel: '请填写联系电话',
			selectCity: '请选择城市',
			detail: '请填写正确的地址',
			postage: '请填写邮编',
			contactTelErr: '请填写正确的联系电话',
			postageErr: '请填写正确的邮政编码，邮政编码格式为六位数字'
		};
		return {
			commonInCityAddr: {}, //已保存常用的地址
			commonEMSAddr: {}, //已保存常用的地址
			postage: {}, //配送方式的费用
			Cantons: {}, //配送城市的行政区
			tabType: null,
			init: function () {
				var _data = vdata.initData.OrderInvoice; //是否默认有发票
				_data ? this.toRender('invoice') : this.toRender('noInvoice');
				this.bindEvent();
			},
			toRender: function (type) {
				var me = this;
				var data = me.handleData(vdata.initData.DeliveryReult);
				var isEmpty = true;
				var _initData = vdata.initData.OrderDelivery;
				var selectTab = (_initData && me.tabType) ? me.tabType[_initData.DeliveryType] - 1 : 0;
				var curTabType;
				var handle = function (data) {
					var addr = {
						1: '市内配送',
						2: '市内自取',
						3: 'EMS邮递',
						4: '免费平邮'
					};
					data.psType = addr[data.DeliveryType];
					data.Canton = (data.CantonID && me.Cantons[data.CantonID]) ? me.Cantons[data.CantonID].Value : '';
					if (data.DeliveryType == 3) {
						data.noCity = 0;
					} else {
						data.noCity = 1;
					}
					return data;
				};
				me.toCity = data.CityName || '';
				roles.deliveryID.empty();
				if (_initData) {
					self.render(self.tpl.deliveryDf, handle(_initData), function (dom) {
						roles.deliveryID.append(dom).parent().show();
						isEmpty = false;
					});
				}
				if (!data[type]) {
					roles.deliveryID.parent().hide();
					me.countPostage();
					return;
				} else {
					roles.deliveryID.parent().show();
				}
				self.render(self.tpl.deliveryBox, $.extend(data, data[type]), function (dom) {
					var html = $(dom).appendTo(roles.deliveryID);
					!isEmpty && html.hide();
					cQuery.mod.load('tab', '1.2', function () {
						var config = {
							options: {
								index: selectTab,
								tab: "li",
								panel: "#content>div",
								trigger: "click",
								save: true
							},
							style: {
								tab: ['cur', ''],
								panel: {
									display: ['block', 'none']
								}
							},
							listeners: {
								initEventCallback: function () {
									curTabType = $('li[class="cur"]', '#tabs').attr('type');
									me.countPostage(curTabType); //暂时
									cities.init({ id: '#cities', type: 'select' });
									cities.init({ id: '#cities_p', type: 'select' });
								}
							}
						};
						var ins = cQuery('#tabs').regMod('tab', '1.2', config);
					});
					cQuery('.cqsy').length && cQuery('.cqsy').regMod('notice', '1.0', {
						name: '.cqsy',
						tips: cQuery('.cqsy').attr('_cqnotice'),
						selClass: 'inputSel'
					}, true);
				});
				$('#content').children().each(function (i) {
					$(this).children().eq(0).addClass('tab_0' + i);
				});
			},
			countPostage: function (i) {
				vdata.postage = i ? this.postage[i] : 0;
				self.totalPrice();
			},
			bindEvent: function () {
				var me = this;
				var selected;
				var reg;
				var role;
				roles.deliveryID.on('click', '[role="new"]', function (event) {
					event.preventDefault();
					var parent = $(this).parent();
					var next = parent.next();
					var prev = parent.prev();
					var bl = prev.attr('role') === 'addressList';
					role = self.common.getRoles('.hide_options');
					if (bl) {
						selected = prev.find('input:checked');
					}
					if (next[0].style.display !== 'none') {
						next.hide();
						prev.find('input:first').prop('checked', true).closest('li').addClass('cur');
					} else {
						next.show();
						if (selected) {
							selected.prop('checked', false).closest('li').removeClass('cur');
						}
					}
					me.hideTip();
				})
				.on('click', '[role="other"]', function (event) {
					event.preventDefault();
					var index = +$(this).closest('.delivery').attr('type');
					var name = $(this).closest('.delivery').attr('type');
					var MyAddress = index == 1 ? vdata.initData.DeliveryReult.InCityDelivery.slice(3) : vdata.initData.DeliveryReult.MyEMSAddress.slice(3);
					var tpl = index == 1 ? self.tpl.inCityAddress : self.tpl.allAdress;
					role = self.common.getRoles('.hide_options');
					self.render(tpl, { obj: MyAddress, CityName: me.toCity, radioName: 'radio' + index }, function (dom) {
						var _role;
						$(dom).appendTo('body');
						_role = self.common.getRoles('#mask_popup');
						cQuery('#mask_popup').mask();
						$('#mask_popup').find('input:first').attr('checked', true);
						_role.close.click(function (event) {
							event.preventDefault();
							cQuery('#mask_popup').unmask();
							$('#mask_popup').remove();
						});
						me.selectAddress(_role, index, 'radio' + name);
					});
					me.hideTip();
				})
				.on('click', 'a.revise', function (event) {
					event.preventDefault();
					$(this).closest('ul').hide().next().show();
				}).on('click', '#cities,#cities_p', function () {
					$(this).data('valid') && $(this).data('valid').hide();
				})
				.on('blur', 'input[type="text"]', function () {
					if (reg = $(this).attr('regex')) {
						me[reg]($.trim($(this).val()), this);
					}
				})
				.on('click', 'li[role="tab"] a', function (event) {
					event.preventDefault();
					var tab = $(this).attr('type');
					me.countPostage(tab);
					self.removeValidate();
				})
				.on('click', 'input[type="radio"]', function () {
					var parent = $(this).closest('div.delivery');
					$(this).closest('li').addClass('cur').siblings().removeClass('cur');
					parent.find('div.hide_options').hide();
					me.hideTip();
				});
			},
			defaultData:function(){
				var _initData = vdata.initData.OrderDelivery;
				if(_initData){
					this.setData({
						DeliverType: _initData.DeliveryType,
						AddresseeName: _initData.AddressInfo.Recipient || '',
						ContactTel: _initData.AddressInfo.Mobile || _initData.AddressInfo.MobileTel || '',
						Address: _initData.AddressInfo.Address || '',
						PostCode: _initData.AddressInfo.Post || '',
						CantonID: _initData.AddressInfo.CantonID || 0
					});
					return true;
				}
				return false;
			},
			hideTip: function (role) {
				var role = role || self.common.getRoles('.hide_options');
				!$.isEmptyObject(role) && $.each(role, function (k, v) {//清除提示
					if ($(v).data('valid')) {
						$(v).data('valid').hide();
					}
				});
			},
			selectAddress: function (_role, _i, name) {
				var me = this;
				var role = self.common.getRoles(roles.deliveryID);
				var tpl1 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>';
				var tpl2 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked">{{toCity}} {{CityName}} {{CantonName}} {{Address}} {{Post}}</label></li>';
				var tpl = _i == 1 ? tpl2 : tpl1;
				var address = _i == 1 ? me.commonInCityAddr : me.commonEMSAddr;
				$('#mask_popup').on('click', 'input', function () {
					$("input[name='radio'][checked]", '#mask_popup').attr('checked', false);
					$(this).attr('checked', true);
				});
				_role.confirm.unbind('click');
				_role.confirm.click(function (event) {
					event.preventDefault();
					var index = $("input[type='radio']:checked", '#mask_popup').attr('index');
					var wrap
					self.render(tpl, $.extend(address[index], { toCity: me.toCity, index: index }), function (dom) {
						wrap = $(role.addressList).filter('[type="' + _i + '"]');
						wrap.find('li.add').remove();
						wrap.find('input:checked').prop('checked', false);
						wrap.prepend(dom);
						wrap.nextAll('div.hide_options').hide();
						wrap.find('li').first().addClass('cur').siblings().removeClass('cur');
						cQuery('#mask_popup').unmask();
						$('#mask_popup').remove();
					});
				});
			},
			handleData: function (data) {
				var me = this;
				var _ref = {};
				var handle = function (data) {
					var _ret = {};
					$.map(data, function (v, k) {
						switch (v.DeliveryType) {
							case 1:
								_ret.ps = v;
								break;
							case 2:
								_ret.zq = v;
								break;
							case 3:
								_ret.ems = v;
								break;
							case 4:
								_ret.py = v;
						}
						me.postage[v.DeliveryType] = v.DeliveryAmount;
					});
					if (_ret.py) {
						_ret.pyindex = 1;
						if (_ret.ps) {
							_ret.psindex = 2;
							if(_ret.zq){
								_ret.zqindex = 3;
								_ret.emsindex = 4;
							}
						}else if(_ret.zq){
							_ret.zqindex = 2;
							_ret.emsindex = 3;
						} else {
							_ret.emsindex = 2;
						}
					} else {
						if(_ret.ps){
							_ret.psindex = 1;
							if(_ret.zq){
								_ret.zqindex = 2;
								_ret.emsindex = 3;
							}
						}else if (_ret.zq) {
							_ret.zqindex = 1;
							_ret.emsindex = 2;
						} else {
							_ret.emsindex = 1;
						}
					}
					me.tabType = {
						1: _ret.psindex,
						2: _ret.zqindex,
						3: _ret.emsindex,
						4:_ret.pyindex
					};
					return _ret;
				};
				var goods = function (goods) {
					var _ret = [];
					if (!goods || !goods.length) return null;
					$.map(goods, function (v, k) {
						_ret.push('<p>' + (k + 1) + '. ' + v.replace(/[\r\n]/g, "") + '</p>');
					});
					_ret.push('<p class="alert_info">(内容仅供参考，以实际送出物为准。)</p>');
					return _ret.join('');
				};
				if (!data || !data.DeliveryInfoList) return _ref;
				$.map(data.DeliveryInfoList, function (v, k) {
					if (v.isHasInvoice === 1) {
						_ref.invoice = handle(v.DeliveryType);
						_ref.invoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
					} else {
						_ref.noInvoice = handle(v.DeliveryType);
						_ref.noInvoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
					}
				});
				if (data.SelfPickupAddress.length) {
					_ref.selfPickupAddr = data.SelfPickupAddress;
				}
				_ref.CityName = data.CityName;
				_ref.CityCanton = data.CityCanton || [];
				if (data.MyEMSAddress) {
					_ref.emsAddress = data.MyEMSAddress.slice(0, 3);
					$.map(data.MyEMSAddress, function (v, k) {
						me.commonEMSAddr[v.InfoId] = v;
					});
					if (data.MyEMSAddress.length < 4) {
						_ref.hideEmsAddress = true;
					}
				}
				if (data.InCityDelivery) {
					_ref.inCityAddress = data.InCityDelivery.slice(0, 3);
					$.map(data.InCityDelivery, function (v, k) {
						me.commonInCityAddr[v.InfoId] = v;
					});
					if (data.InCityDelivery.length < 4) {
						_ref.hideInCityAddress = true;
					}
				}
				data.CityCanton && $.map(data.CityCanton, function (v, k) {
					me.Cantons[v.Key] = v;
				})
				return _ref;
			},
			getPsAddr: function (role, isTemp) {//获取新增市内配送地址
				// var idx = role.getCanton.val()
				var canton = role.getCanton.find("option:selected").text();
				var cantonID = role.getCanton.val() || 0;
				var detail = role.getAddrDetail.val();
				var valid = role.getAddrDetail.data('vali');
				isTemp = isTemp || 0;
				if (!isTemp) {
					if ('' === $.trim(detail)) {
						this.showTip(role.getAddrDetail[0], '请输入详细地址');
						if (!self.status.errorElem) {
							self.status.errorElem = role.getAddrDetail[0];
						}
						return false;
					}
					if (canton.indexOf('暂未开通') != -1) {
						this.showTip(role.getCanton[0], '该区域尚未开通配送，请重新选择');
						if (!self.status.errorElem) {
							self.status.errorElem = role.getAddrDetail[0];
						}
						return false;
					}
				}
				return [canton, detail, cantonID];
			},
			showTip: function (el, data, opts) {
				var ovalid = $(el).data('valid');
				opts = $.extend({ target: el, data: data }, opts || {});
				ovalid = ovalid ? ovalid.show(opts) :
						new self.validate(opts).show();
				$(el).data('valid', ovalid);
			},
			checkNull: function (str) {
				return '' === str ? true : false;
			},
			checkRecipient: function (str, el) {//验证收件人
				if (this.checkNull(str)) {
					this.showTip(el, msg.recipient);
					return false;
				}
				return true;
			},
			checkContactTel: function (str, el) {//验证收件人电话
				if (this.checkNull(str)) {
					this.showTip(el, msg.contactTel);
					return false;
				} else if (!/^\d{7,}$/.test(str)) {
					this.showTip(el, msg.contactTelErr);
					return false;
				}
				return true;
			},
			checkDetail: function (str, el) {//验证详细收件地址
				if (this.checkNull(str)) {
					this.showTip(el, msg.detail);
					return false;
				}
				return true;
			},
			checkPostage: function (str, el) {//验证邮编
				if (this.checkNull(str)) {
					this.showTip(el, msg.postage);
					return false;
				} else if (!/^\d{6}$/.test(str)) {
					this.showTip(el, msg.postageErr);
					return false;
				}
				return true;
			},
			getEmsAddr: function (r, isTemp, isPy) {//获取新增EMS配送地址
				var me = this;
				var _ref = {};
				var _ret = true;
				var role = self.common.getRoles(r);
				var getCities = function () {
					return isPy ? cities.get('#cities_p') : cities.get('#cities');
				};
				var getVal = function () {
					$.each(role, function (k, v) {
						if (k != 'selectCity') {
							_ref[k] = $(v).val();
						} else {
							_ref[k] = getCities();
						}
					});
					return _ref;
				};
				isTemp = isTemp || 0;
				if (!isTemp) {
					$.each(role, function (k, v) {
						var val;
						val = k != 'selectCity' ? $.trim($(v).val()) : getCities();
						if ('' === val) {
							me.showTip(v, msg[k]);
							_ret = false;
							if (!self.status.errorElem) {
								self.status.errorElem = v;
							}
							//return false;
						} else if (k === 'contactTel') {
							if (!me.checkContactTel(val, v)) {
								_ret = false;
								if (!self.status.errorElem) {
									self.status.errorElem = v;
								}
								// return false;
							}
						} else if (k === 'postage') {
							if (!me.checkPostage(val, v)) {
								_ret = false;
								if (!self.status.errorElem) {
									self.status.errorElem = v;
								}
								//return false;
							}
						}
					});
				}
				return [_ret, getVal()];
			},
			setData: function (obj) {//设置要提交的配送数据
				return self.formData.DeliverInfo = {
					DeliverType: obj.DeliverType || 0,
					AddresseeName: obj.AddresseeName,
					ContactTel: obj.ContactTel,
					Address: obj.Address,
					PostCode: obj.PostCode,
					CantonID: obj.CantonID,
					InfoId: obj.InfoId || 0
				};
			},
			save: function (isSubmit) {
				var type, which, role, id, isPy;
				var DeliverInfo = self.formData.DeliverInfo;
				var me = this;
				var addr, commonInCityAddr, commonEMSAddr;
				var _assign = function (type, name, tel, addr, post, canton, id) {
					me.setData({
						DeliverType: type,
						AddresseeName: name,
						ContactTel: tel,
						Address: addr,
						PostCode: post,
						CantonID: canton,
						InfoId: id
					});
				};
				if (roles.deliveryID.parent().css('display') !== 'none') {
					if($('#deliverBox').css('display')!=='block'){
						me.defaultData();
						return true;
					}
					type = $('#tabs').children('.cur').attr('type');
					which = $('#content').children('[type="' + type + '"]');
					role = self.common.getRoles(which);
					if (type == 1) {
						if (role.addressList) {
							id = role.addressList.find('input:checked').val();
							if (id) {
								commonInCityAddr = me.commonInCityAddr[id];
								_assign(type, commonInCityAddr.Recipient, commonInCityAddr.Mobile || commonInCityAddr.Tel, commonInCityAddr.Address, commonInCityAddr.Post, commonInCityAddr.CantonID || 0, commonInCityAddr.InfoId || 0);
								if (isSubmit) {
									return true;
								}
							} else {
								addr = me.getPsAddr(role, !isSubmit);
							}
						} else {
							addr = me.getPsAddr(role, !isSubmit);
						}
						if (isSubmit && !addr) return false;
						if (addr) {
							_assign(type, '', '', addr[1], '', addr[2] || 0, 0);
						}
					}
					if (type == 2) {
						id = role.addressList.find('input:checked').val();
						_assign(type, '', '', id, '', 0, 0)
					}
					if (type == 3 || type == 4) {
						isPy = type == 3 ? 0 : 1;
						if (role.addressList) {
							id = role.addressList.find('input:checked').val();
							if (id) {
								commonEMSAddr = me.commonEMSAddr[id];
								_assign(type, commonEMSAddr.Recipient, commonEMSAddr.Mobile || commonEMSAddr.Tel, commonEMSAddr.CityName + commonEMSAddr.Address, commonEMSAddr.Post, 0, commonEMSAddr.InfoId || 0);
								if (isSubmit) {
									return true;
								}
							} else {
								addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
							}
						} else {
							addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
						}
						if (addr) {
							var dir = addr[1];
							if (isSubmit) {
								if (!addr[0]) return false;
							}
							_assign(type, dir.recipient, dir.contactTel, dir.selectCity + dir.detail, dir.postage, 0, 0);
						}
					}
				} else {
					_assign(0, '', '', '', '', 0, 0);
				}
				return true;
			},
			verify: function () {
				this.save(!0);
			}
		}
	}
	return Delivery;
});