define(function(require, exports, module){
	var $ = require('jquery');

	function Contacter() {//联系人
		var self = this,
			vdata = self.data,
			mod = vdata.modules,
			roles = vdata.roles,
			oValidate = self.validate,
			oLinkman = vdata.initData.orderLinkMan || {},
			oBoard, isEmpty,
			Reg = self.Reg;
		return {
			init: function (data) {
				var me = this;
				me.commonContacters = {};
				self.toggleLoading('contact');
				this.commonContact = data ? data : null;
				if (this.commonContact) {
					$.map(this.commonContact, function (v, k) {
						me.commonContacters[v.InfoID] = v;
					})
				}
				if ($.isEmptyObject(oLinkman) && data) {
					oLinkman = this.handleData(data);
				}
				if (isEmpty = !$.isEmptyObject(oLinkman)) {
					self.render(self.tpl.linkmanDf, oLinkman, function (dom) {
						roles.linkManID.append(dom);
					});
					self.formData.ContactInfo = me.setData(oLinkman);
				}
				self.render(self.tpl.linkmanBox, oLinkman, function (dom) {
					var tlin = $(dom).appendTo(roles.linkManID).hide();
					!isEmpty && tlin.show();
				});
				$.extend(roles, self.common.getRoles(roles.linkManID));
				this.bindEvent();
				this.bindVerifyEvent();
			},
			handleData: function (data) {
				var _ret = {};
				if (data) {
					_ret = {
						name: data[0].ContactName || '',
						email: data[0].Email || '',
						mobileNo: data[0].Moblie || '',
						telNo: data[0].Tel.replace('*', '-')
					};
				}
				return _ret;
			},
			setData: function (data) {
				return {
					ContactName: data.name,
					ContactEmail: data.email,
					ContactMobile: data.mobileNo,
					ContactTel: data.telNo
				};
			},
			fill: function (name, email, phone, tel) {
				var t;
				roles.ctname[0].value = name;
				roles.ctemail[0].value = email;
				if (phone) {
					roles.ctmphone[0].value = phone;
				} else {
					roles.ctmphone[0].value = '';
				}
				if (tel) {
					t = tel.split('-');
					roles.ctzcode[0].value = t[0];
					roles.cttphone[0].value = t[1];
					roles.ctext[0].value = t[2] || '';
				} else {
					roles.ctzcode[0].value = '';
					roles.cttphone[0].value = '';
					roles.ctext[0].value = '';
				}
			},
			initSug: function () {
				var oc = this.commonContact;
				var ob = this.oBoard = mod.Travellers.getTravellers();
				var oca = [], sug = '', _i = 0;
				oc && $.each(oc, function (k, v) {
					if (_i > 5) return false;
					oca.push(v);
					_i++;
				});
				if (oc || ob.length) {
					sug = self.render(self.tpl.linkerSug, { common: oca.length ? oca : '', board: ob.length ? ob : '' });
				}
				return sug;
			},
			bindEvent: function () {
				var sugg;
				var me = this;
				var logTip;
				roles.contact.on('click', 'input[role="ctname"]', function () {
					var offset = $(this).offset();
					var height = $(this).outerHeight();
					var sug = me.initSug();
					$('.person_content').remove();
					if (sug) {
						sugg = $(sug).appendTo('body').css({
							'position': 'absolute',
							'top': offset.top + height,
							'left': offset.left,
							'zIndex': '100'
						});
						sugg.on('mousedown', 'a', function (event) {
							var uid = $(this).attr('uid');
							var index = $(this).attr('index');
							var ref;
							var obj = (function () {
								if (uid) {
									ref = me.commonContacters[uid];
									return {
										name: ref.ContactName,
										email: ref.Email,
										mobileNo: ref.Moblie,
										tel: ref.Tel ? ref.Tel.replace('*', '-') : ''
									}
								} else {
									return me.oBoard[index];
								}
							} ());
							var name = obj.name || obj.nameCN || obj.nameEN || '';
							var email = obj.email || '';
							var phone = obj.mobileNo || '';
							var tel = obj.tel || '';
							me.fill(name, email, phone, tel);
						});
						$(this).bind('blur', function () {
							sugg && sugg.hide();
						});
					}
				});
				roles.linkManID.on('click', 'a.revise', function (event) {
					event.preventDefault();
					$(this).closest('ul').hide();
					roles.contact.show();
				});
			},
			bindVerifyEvent: function () {
				var me = this;
				roles.contact.on('blur', 'input[type="text"]', function () {
					me.errTip(this);
				});
			},
			errTip: function (el) {
				var _el = $(el),
					val = $.trim(_el.val()),
					reg = _el.attr('regex'),
					ovalid = _el.data('valid'),
					ret = false,
					type = reg === 'checkPhone' ? _el.attr('role').slice(2) : '';
				bl = this[reg](val, type);
				if (reg === 'checkMobile' && val === '')
					return true;
				if (reg === 'checkPhone' && val === '')
					return true;
				if (!bl[0]) {
					ovalid = this.showTip(ovalid, el, bl[1]);
				} else {
					ovalid && ovalid.hide();
					ret = true;
					if (bl[1]) {
						ovalid = this.showTip(ovalid, el, bl[1], { errorClass: '' });
					}
				}
				_el.data('valid', ovalid);
				return ret;
			},
			showTip: function (valid, target, data, opts) {
				opts = opts || {};
				return valid ? valid.show($.extend({ target: target, data: data }, opts)) :
								  new oValidate($.extend({ target: target, data: data }, opts)).show();
			},
			save: function () {
				var role = self.common.getRoles(roles.linkManID);
				var zcode = $.trim(role.ctzcode.val()), tphone = $.trim(role.cttphone.val()), ext = $.trim(role.ctext.val());
				var tel = (function () {
					if (zcode && zcode !== role.ctzcode.attr('_cqnotice')) {
						tphone = (tphone && tphone !== role.cttphone.attr('_cqnotice')) ? '-' + tphone : '';
						ext = (tphone && ext) ? '-' + ext : '';
						return zcode + tphone + ext;
					}
					return '';
				} ());
				self.formData.ContactInfo = {
					"ContactName": role.ctname.val(),
					"ContactMobile": role.ctmphone.val(),
					"ContactTel": tel,
					"ContactEmail": role.ctemail.val()
				};
			},
			checkName: function (str) {
				var bl;
				if ('' === str)
					return [false, '请填写联系人姓名'];
				if (Reg.hasCnChar(str)) {
					if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
						return [false, '中文姓名只能包含汉字、字母和连字符，请检查'];
				} else {
					if (!Reg.isEnName(str) || /[^a-zA-Z. \/'-]/.test(str)) {
						return [false, '请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King'];
					}
				}
				return [true, ];
			},
			checkEmail: function (str) {
				if ('' === str)
					return [false, '请填写您的E-mail地址'];
				if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str))
					return [false, '请填写正确的E-mail地址，格式：a@b.c'];
				return [true, ];
			},
			checkMobile: function (str) {
				if ('' === str)
					return [false, '手机号码或联系电话至少选填一项'];
				if (!/^0?1[3458]\d{9}$/.test(str))
					return [false, '您填写的手机号码有误，请重新填写'];
				return [true, ];
			},
			checkPhone: Reg.checkPhone,
			verify: function () {
				var me = this;
				var status = self.status;
				var error = 0;
				var _data = {};
				var bl;
				var ovalid;
				var phoneVal = '';
				var isPhoneFilled = function () {
					var bl = false;
					var el, val;
					$.map(['ctzcode', 'cttphone', 'ctext'], function (v, k) {
						el = roles[v];
						val = $.trim(el.val());
						if (val !== '' && val !== el.attr('_cqnotice')) {
							bl = true;
							return false;
						}
					})
					return bl;
				};
				if (roles.contact[0].style.display !== 'block') return true;
				var elems = [roles.ctname, roles.ctemail];
				var ext;
				if (isPhoneFilled()) {
					elems.push(roles.ctzcode, roles.cttphone, roles.ctext);
					if (!!roles.ctmphone[0].value) {
						elems.push(roles.ctmphone);
					}
					ext = $.trim(roles.ctext.val());
					phoneVal = $.trim(roles.ctzcode.val())
							   + '-'
							   + $.trim(roles.cttphone.val())
							   + (ext !== roles.ctext.attr('_cqnotice') && ext !== '' ? '-' + roles.ctext.val() : '')
				} else {
					elems.push(roles.ctmphone);
				}
				$.each(elems, function (k, v) {
					ovalid = v.data('valid');
					bl = me[v.attr('regex')]($.trim(v.val()), v.attr('role').slice(2));
					if (!bl[0]) {
						error++;
						ovalid = me.showTip(ovalid, v[0], bl[1]);
						if (!status.errorElem) {
							status.errorElem = v[0];
						}
						v.data('valid', ovalid);
						return false;
					} else {
						if (status.errorElem === v[0]) {
							status.errorElem = null;
						}
						if (bl[1]) {
							ovalid = me.showTip(ovalid, v[0], bl[1], { errorClass: '' });
							v.data('valid', ovalid);
						}
					}
				});
				if (!error) {
					self.formData.ContactInfo = {
						ContactName: roles.ctname.val(),
						ContactEmail: roles.ctemail.val(),
						ContactMobile: roles.ctmphone.val(),
						ContactTel: phoneVal
					};
				}
				return !error;
			}
		}
	}
	return Contacter;
});