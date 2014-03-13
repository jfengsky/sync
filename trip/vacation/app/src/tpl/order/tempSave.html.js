define(function(){
	return "<div class=\"book_masking\" id=\"tempSaveMask\">\n\
    <h2><a href=\"###\" alt=\"\" role=\"close\"></a>暂存订单</h2>\n\
    <div class=\"book_masking_padding\">\n\
        <div class=\"book_masking_content\">\n\
            <i class=\"icon_yes\"></i>\n\
            <h3>您的订单已成功暂存。暂存订单号为：{{OrderId}}</h3>\n\
            <div>如需完成预订，请于72小时内至“{{{Url}}}”，对此订单号进行“继续预订”操作。<br>暂存后超过72小时的订单将自动删除。<br>注意：由于暂存订单不会保留航班、酒店等资源，价格也可能发生变化，请尽快提交，完成预订</div>\n\
            <div class=\"masking_order_btn\"><a href=\"###\" class=\"btn_blue_middle\" role=\"confirm\">确定</a></div>\n\
        </div>\n\
    </div>\n\
</div>"});