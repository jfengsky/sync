define(function(require, exports, module){
	var $ = require('jquery');

	function Extras() {
		var self = this;
		var vdata = self.data;
		return {
			init: function () {
				var _data = vdata.initData.OrderOther;
				var role = this.role = self.common.getRoles(vdata.roles.extrasID);
				var bed;
				this.bedValue = {
					1: '尽量安排大床',
					2: '尽量安排双床'
				};
				this.bindEvent();
				if (!_data || !this.isNull(_data)) return;
				if(role.extrasInputs){
					role.extrasInputs.show(); 
					role.mores.html('更多需求&lt;&lt;');
				}
				if (_data.NoSmokingRoom) {
					role.noSmokingRoom && role.noSmokingRoom.prop('checked', true);
				}
				// if(_data.NeedAdsl){
				//     role.needAdsl.prop('checked',true);
				// }
				if (_data.BedDes) {
					bed = this.getBedVal(_data.BedDes);
					role.selectBedDes && role.selectBedDes.prop('checked', true);
					role.bedDes && role.bedDes.val(bed).prop('disabled', false).children('[value="' + bed + '"]').attr('selected', true);
				}
				if (_data.Remark) {
					role.Remark.val(_data.Remark).show();
				}

			},
			isNull:function(obj){
				var _ret = false;
				if(!obj) return false;
				$.each(obj,function(k,v){
					if(v){
						_ret = true;
					}
				});
				return _ret;
			},
			bindEvent: function () {
				var role = this.role;
				role.mores && role.mores.bind('click',function(){
					role.extrasInputs.toggle();
					if(role.extrasInputs.css('display') !== 'none'){
						$(this).html('更多需求&lt;&lt;')
					}else{
						$(this).html('更多需求&gt;&gt;')
					}
				});
				role.selectBedDes && role.selectBedDes.bind('click', function () {
					if ($(this).prop('checked')) {
						role.bedDes.prop('disabled', false);
					} else {
						role.bedDes.prop('disabled', true).val('0');
						role.bedDes.children('[value="0"]').attr('selected', true);
					}
				});
				role.selectRemark && role.selectRemark.bind('click', function () {
					role.Remark.toggle();
				});
			},
			getBedVal: function (v) {
				var _ret;
				$.each(this.bedValue, function (key, val) {
					if (v === val) {
						_ret = key;
						return false;
					}
				});
				return _ret;
			},
			save: function () {
				var role = this.role;
				var OtherInfo = self.formData.OtherInfo;
				var remark = role.Remark;
				if(role.extrasInputs && role.extrasInputs.css('display') !== 'block'){
					self.formData.OtherInfo={
						NoSmokingRoom : 0,
						BedDes : '',
						Remark : ''
					};
					return;
				}
				if (role.noSmokingRoom && role.noSmokingRoom.prop('checked'))
					OtherInfo.NoSmokingRoom = 1;
				else
					OtherInfo.NoSmokingRoom = 0;
				if (role.bedDes && role.bedDes.val() != 0)
					OtherInfo.BedDes = this.bedValue[role.bedDes.val()];
				else
					OtherInfo.BedDes = '';
				if (remark && remark[0].style.display != 'none' && $.trim(remark.val()) !== remark.attr('_cqnotice')) {
					OtherInfo.Remark = remark.val();
				} else {
					OtherInfo.Remark = '';
				}
			},
			verify: function () {
				this.save();
				return true;
			}
		}
	}
	return Extras;
});