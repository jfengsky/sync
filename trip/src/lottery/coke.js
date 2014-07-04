﻿		// Generated by CoffeeScript 1.7.1

		/*
		 * 可口可乐活动js
		 */

		/*
		   * 登录
		 */
$(document).ready(function(){
	var _loginShow,CokeAjax,clickFlag=0;
	_loginShow=function(pin){
		   //backurl进行转码
		   var str="/coke/H5.html?pincode="+pin+"";	
		   var ret=encodeURIComponent(str);
		   //跳转到登录，且登录后返回
		   window.location.href = "/Package-Booking-VacationsOnlineSiteUI/loginPageAgent.aspx?BackUrl="+ret+"";
	};
	CokeAjax=function(tempCode){
		clickFlag=0;
		if (mobileCheck(tempCode)) {
			if($("#checkbox").attr("checked")){
			  $.ajax({
				type: 'post',
				url: '/Package-Booking-VacationsOnlineSiteUI/Handler2/CokaHandler.ashx',
				data: {
				  pincode: tempCode
				},
				dataType: 'json',
				success: function(_data) {	
				  if (_data.errCode == "-1") {
					_loginShow(tempCode);
				  }else{
						if (_data.errCode == "0") {
							success();
						}else{
							alert(_data.returnMsg);
						}
				  } 
				}
			  });
		  }else{
			  alert('请勾选我已知并遵守活动各项条款，参与兑换！');
			}
		}
	};
	  //"use strict";

	  /*
	   * 成功操作
	   */
	  var mobileCheck, success;
	  success = function() {
		return alert('您已成功领取优惠券，请至账户查看！');
	  };

	  /*
	   * 兑换号码长度验证
	   */
	  mobileCheck = function(_number) {
		if (_number.length!=10) {
			alert('请输入10位数兑换码')
			return false;
		}
		return true;
	  };
	  
	  $('.couponsend').bind('click', function() {
		if(clickFlag==0){ 
			clickFlag=1;
			CokeAjax($('#userphone').val())
		}
	  });
	  if($('#userphone').val()){
		$('#checkbox').attr("checked","true");
		CokeAjax($('#userphone').val());
	  }
});
