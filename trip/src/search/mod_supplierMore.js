define(function (require, exports, module) {
    var $ = require('jquery');

    var MoreSupplier = {
        init: function () {
            MoreSupplier.bindClick();
        },
        bindClick: function () {
            $('#btn_more').click(function () {
                $('.product_list01 li').show();
                $('#btn_more').hide();
                $('#btn_nomore').show();
            });
        }
    }
    module.exports = MoreSupplier;
});