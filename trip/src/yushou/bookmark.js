/**
 * email 订阅功能
 * 1. 表单验证
 * 2. 异步向接口发送地址
 * 3. 返回true，显示订阅成功
 * 
 */
define(function (require, exports, module) {
    "use strict";
    var $ = require("jquery");
    function Bookmark() {
        var self = this;

        /**
        * 向服务器传用户订阅的邮件地址
        * @param  {String} _email 用户订阅的邮件地址
        * @return {[type]}        [description]
        */
        this._sendemail = function (_email) {
            $.ajax({
                type: 'post',
                url: '/Package-Booking-VacationsOnlineSiteUI/handler2/PreSaleEmailSubscribe.ashx',
                data: {
                    email: _email
                },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.error) {
                        $('#J_booksuccess').show();
                    } else {
                        alert(data.data);
                    }
                }
            });
        };

        /**
        * 邮件验证错误操作
        * @return
        */
        this._checkError = function () {
            $('#J_bookmail').addClass('input_error');
            $('#J_emailErr').show();
        };

        /**
        * 清除验证错误操作
        * @return {[type]} [description]
        */
        this._clearError = function () {
            $('#J_bookmail').removeClass('input_error');
            $('#J_emailErr').hide();
        };

        /**
        * email表单验证
        * @param {String} _email 订阅邮件
        * @return {Boolean} true or false
        */
        this._check = function (_email) {
            var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if (!emailReg.test(_email)) {
                return false;
            }
            return true;
        };
        this.init = function () {

            $("#J_bookmail").focus(self._clearError);

            // 订阅按钮
            $('#J_bookmark').click(function () {
                var email = $("#J_bookmail").val();
                if (self._check(email)) {
                    // TODO 异步发送邮件地址给后端
                    self._sendemail(email);
                } else {
                    self._checkError();
                }
            });

            // 订阅返回
            $('#J_bookback').click(function () {
                $('#J_bookmail').val('');
                $('#J_booksuccess').hide();
            });
        };
    };
    module.exports = Bookmark;
})