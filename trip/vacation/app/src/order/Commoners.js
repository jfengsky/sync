define(function(require){
    var $ = require('jquery');
    var Birth = require('../Modules/BirthDay');

	function Commoners() {//常用联系人
		var self = this,
			vdata = self.data,
			cache = vdata.cache,
			roles = vdata.roles,
			mod = vdata.modules,
			parseJSON = self.common.parseJSON;
		return {
			commonersObj: {}, //常用联系人数据
			allCommoners: null, //原始的常用联系人
			init: function () {
				var me = this;
				if (!vdata.isLogin) {
					$('#searchID').hide();
					(mod['Contacter'] = self.Contacter.call(self)).init();
					return;
				}
				self.toggleLoading('commoner', roles.commonersID[0]);
				self.toggleLoading('contact', roles.linkManID[0]); //联系人
				self.fetchData({ url: vdata.handles.getContacts }, function (data) {
					var _data, _obj, _ref;
					data = typeof data === 'string' ? parseJSON(data) : data;
					_data = data.data;
					if (_data && _data.ContactLst) {
						_ref = _data.ContactLst;
					} else {
						_ref = null;
					}
					(mod['Contacter'] = self.Contacter.call(self)).init(_ref); //调用常用联系人
					if (!_data || !_data.PassengerLst) {
						$('#searchID').hide();
						roles.commonersID.hide();
						return;
					}
					me.allCommoners = data.data;
					_obj = me.handleData(_data.PassengerLst);
					var obj = {
						collecters: _obj
					};
					obj.collecters.length && self.render(self.tpl.commoners, obj, function (dom) {
						roles.commonersID.html(dom);
						me.bindEvent.call(me);
						me.commonersDom = roles.commonersID.children();
					});
					self.toggleLoading('commoner');
					me.search();
				})
			},
			handleData: function (_data) {//处理数据以供渲染
				var me = this;
				var oBirth = new Birth('', vdata.initData.departDate);
				var dfMan = vdata.initData.OrderPassengerList;
				var _ref = [];
				var age;
				if (dfMan) {
					$.map(dfMan, function (v, k) {
						_ref.push(v.clientID);
					});
				}
				$.map(_data, function (v, k) {
					if (_ref.length) {
						if ($.inArray(v.clientID, _ref) !== -1)
							_data[k].selected = true;
					}
					age = me.handleBirthDay(v);
					if (age) {
						if (oBirth.isChild(age)) {
							_data[k].ptype = 0;
						} else {
							_data[k].ptype = 1;
						}
					} else {
						_data[k].ptype = 3;
					}
					me.commonersObj[v.clientID] = _data[k];
				});
				return _data;
			},
			handleBirthDay: function (person) {//确定出行人的出生日期
				var _ret = null;
				if (person.birthday) {
					_ret = person.birthday;
				} else if (person.IDCardInfo) {
					$.each(person.IDCardInfo, function (k, v) {
						if (v.IDCardType == 1) {
							_ret = v.IDCardNo;
							return false;
						}
					});
					if (_ret) {
						_ret = self.common.parseCNId(_ret).passengerBirth;
					}
				}
				return _ret;
			},
			search: function () {//常用联系人搜索
				var me = this;
				var _obj = me.commonersObj;
				var _lis = roles.commonersID.find('li');
				roles.searchID.length && roles.searchID.bind('keyup', function (event) {
					var tempObj = [];
					var val = $.trim($(this).val()).toLowerCase();
					var i = 0;
					if (!val) {//恢复全部
						_lis.show();
						return false;
					}
					_lis.hide();
					$.each(_lis, function () {
						var _ref = _obj[$(this).attr('cid')];
						var name = ((_ref.nameCN + (_ref.ENLastName + _ref.ENFirstName + _ref.ENMiddleName)) || '').toLowerCase();
						if (name.indexOf(val) != -1) {
							$(this).show();
						}
					});
				});
			},
			bindEvent: function () { //点选出行人
				var me = this;
				if (!roles.travellersID.children().length) return;
				roles.fillsetID.on('click', '[role="topContact"]', function (event) {//?=====
					event.preventDefault();
					var bl = $(this).hasClass('selected');
					me.fillVisitor(this, bl);
					me.commonersDom = roles.commonersID.children(); //更新常用联系人dom
				});
			},
			checkFullNNT: function (type) {//检查人数是否已满
				var count = mod.Travellers[type + 'Count'].length;
				if (type === 'adult') {
					return count >= vdata.initData.aduNumber;
				} else if (type === 'child') {
					return count >= vdata.initData.chlidNumber;
				} else {
					return count >= vdata.initData.aduNumber + vdata.initData.chlidNumber;
				}
			},
			showTip: function (el, obj, data, opts) {
				var ovalid = $(el).data('valid');
				opts = $.extend({ target: obj, data: data }, opts || {});
				ovalid = ovalid ? ovalid.show(opts) :
						new self.validate(opts).show();
				$(el).data('valid', ovalid);
			},
			fillVisitor: function (el, bl) {//填充及清除出行人信息
				var _this = $(el);
				var me = this;
				var id = $(el).attr('cid');
				var target = $(el).children('span');
				var abled, role, isFull = false;
				var ptype = _this.attr('ptype');
				var msg = ['儿童人数已满', '成人人数已满', '旅客中没有儿童', '旅客已满'];
				var data = ptype;
				var add;
				if (ptype === '0') {
					isFull = me.checkFullNNT('child');
					if (!vdata.initData.chlidNumber) {
						data = 2;
					}
				} else if (ptype === '1') {
					isFull = me.checkFullNNT('adult');
				} else {
					isFull = me.checkFullNNT('traveller');
					data = 3;
				}
				if (!bl) {
					if (isFull) {
						this.showTip(roles.commonersID[0], target[0], msg[data], { errorClass: '', isAutoHide: true });
						return;
					}
					_this.addClass('selected');
					if (ptype !== '3') {
						abled = roles.travellersID.find('[filled="f"][ptype="' + ptype + '"]').eq(0);
					} else {
						abled = roles.travellersID.find('[filled="f"]').eq(0);
						add = abled.attr('ptype');
					}
					role = self.common.getRoles(abled);
					abled.attr({ 'index': id, 'filled': 't' });
					this.setValue(role, id);
					mod.Travellers.setTravellerCount(+ptype, true, add);
					mod.Travellers.linstenPickFill(abled, !0);
				} else {
					_this.removeClass('selected');
					abled = roles.travellersID.find('[index=' + id + ']');
					mod.Travellers.fillClear.call(mod.Travellers, abled); //清除填写及标志
					mod.Travellers.linstenPickFill(abled, !1);
				}
			},
			setValue: function (role, id) {
				var me = this;
				var limitedTime = [];
				var obj = me.commonersObj[id];
				var birthday = obj.birthday ? obj.birthday.split('-') : [];
				var val = "", idcard = '';
				$.each(role, function (k, v) {
					if (v.attr('role') === 'name') {
						if (obj.nameCN) {
							val = obj.nameCN;
						} else if (obj.ENFirstName) {
							val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
						} else {
							val = "";
						}
					} else if (v.attr('role') === 'nameEN') {
						if (obj.ENFirstName) {
							val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
						} else {
							val = '';
						}
					} else if (v.attr('role') === 'national') {
						if (obj.national) {
							val = vdata.nationalData[obj.national];
							v.attr('mod_value', obj.national);
						} else {
							val = '';
							v.attr('mod_value', '');
						}
					} else if (v.attr('role') === 'idCardType') {
						var va = v.val();
						var ids = me.checkIdcard(id, va);
						if (ids) {
							v.val(va = ids.IDCardType);
							idcard = ids.IDCardNo;
							limitedTime = ids.IDCardTimelimit ? ids.IDCardTimelimit.split('-') : [];
						}
						val = va;
					} else if (v.attr('role') === 'idCardNo') {
						val = idcard;
					} else if (v.attr('role') === 'cardValidUntilY') {
						val = limitedTime[0] || '';
					} else if (v.attr('role') === 'cardValidUntilM') {
						val = limitedTime[1] || '';
					} else if (v.attr('role') === 'cardValidUntilD') {
						val = limitedTime[2] || '';
					} else if (v.attr('role') === 'birthdayY') {
						val = birthday[0] || '';
					} else if (v.attr('role') === 'birthdayM') {
						val = birthday[1] || '';
					} else if (v.attr('role') === 'birthdayD') {
						val = birthday[2] || '';
					} else if (v.attr('role') === 'birthPlace') {
						val = obj.HomePlace !== null ? obj.HomePlace : '';
					} else {
						val = obj[k] !== null ? obj[k] : '';
					}
					v.val(val);
					v[0].setAttribute('value', val);
				});
			},
			checkIdcard: function (id, type) {
				var ids = this.commonersObj[id].IDCardInfo;
				var cards = mod.Travellers.idCards;
				var _ref = {};
				var _ret;
				if (!ids || !cards.length) return false;
				$.map(cards, function (v, k) {
					_ref[v.CustomerInfoItemType] = v;
				});
				if (type) {
					$.map(ids, function (v, k) {
						if (v.IDCardType == type) {
							_ret = v;
							return false;
						}
					})
				}
				!_ret && $.map(ids, function (v, k) {
					if (v.IDCardType in _ref) {
						_ret = v;
						return false;
					}
				})
				return _ret;
			},
			removeCommonerSelected: function (id) {//去除常用联系人的选择
				var commoners = this.commonersDom;
				if (!commoners) return;
				commoners.find('a.cb-item[cid="' + id + '"]').removeClass('selected'); //找到对应的常用联系人并取消选择
			}
		}
	}
	return Commoners;
});