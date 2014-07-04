define(function(){
	return "<!--设置同行订单弹窗-->\n\
<div class=\"order_masking order_together\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\">设置同行订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
		<p class=\"grey\">为方便我们在分房时作出考虑，请认真设置您的同行订单。</p>\n\
		<p>请输入您要设置的同行订单号：</p>\n\
		<p><input type=\"text\" class=\"input_text inputSel\" name=\"along_order_num\"></p>\n\
		<p class=\"grey\">需要输入多个订单号时，中间请用逗号隔开</p>\n\
		<div class=\"btn_col\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle\"></div>\n\
	</div>\n\
</div>\n\
<!--打印订单弹窗-->\n\
<div class=\"order_masking order_print\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\">打印订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
		<p>请选择需要打印的信息：</p>\n\
		<ul class=\"basefix\">\n\
			<li data-role=\"orderInfo\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"1\">订单信息</label></li>\n\
			<li data-role=\"orderTraffic\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"2\">交通</label></li>\n\
            <li data-role=\"orderMeal\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"3\">非航班</label></li>\n\
			<li data-role=\"orderHotel\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"4\">酒店</label></li>\n\
			<li data-role=\"addProduct\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"5\">附加产品</label></li>\n\
			<li data-role=\"orderContacts\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"6\">联系人</label></li>\n\
			<li data-role=\"orderTourist\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"7\">旅客信息</label></li>\n\
			<li data-role=\"orderVisa\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"8\">签证信息</label></li>\n\
			<li data-role=\"orderDeliver\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"9\">配送信息</label></li>\n\
            <li data-role=\"orderPay\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"10\">支付/优惠信息</label></li>\n\
			<li data-role=\"orderInvoice\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"11\">发票信息</label></li>\n\
			<li data-role=\"addInfo\"><label class=\"base_label\"><input type=\"checkbox\" name=\"print_order_list\" value=\"12\">附加信息</label></li>\n\
		</ul>\n\
		<div class=\"btn_col\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle\"></div>\n\
	</div>\n\
</div>\n\
<!--取消订单弹窗-->\n\
<div class=\"order_masking\" style=\"display:none\" id=\"js_cancel_order_pop\">\n\
	<div class=\"order_masking_hd\">取消订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
		<table class=\"crosswise_tb\">\n\
			<tbody><tr>\n\
				<th style=\"width:80px;\"><strong class=\"required\">*</strong><span id=\"js_cancel_order_pop_tip\">取消原因</span></th>\n\
                <td>\n\
                    <select style=\"width:278px;\" class=\"js_cancel_order_pop_select1 js_cancel_order_pop_select1_show\">\n\
	                    <option value=\"行程不确定\">行程不确定</option>\n\
	                    <option value=\"无法按时付款\">无法按时付款</option>\n\
	                    <option value=\"价格原因\">价格原因</option>\n\
	                    <option value=\"重复预订\">重复预订</option>\n\
	                    <option value=\"材料无法按时提供\">材料无法按时提供</option>\n\
	                    <option value=\"担心不成团\">担心不成团</option>\n\
	                    <option value=\"突发事件\">突发事件</option>\n\
	                    <option value=\"其他原因\">其他原因</option>\n\
                    </select>\n\
                    <select style=\"width:278px;display:none\" class=\"js_cancel_order_pop_select1\">\n\
	                    <option value=\"价格原因\">价格原因</option>\n\
	                    <option value=\"材料无法按时提供\">材料无法按时提供</option>\n\
	                    <option value=\"突发事件\">突发事件</option>\n\
	                    <option value=\"其他原因\">其他原因</option>\n\
                    </select>\n\
                    <select style=\"width:195px;display:none\" id=\"js_cancel_order_pop_select2\">\n\
	                    <option value=\"担心灾害\">担心灾害</option>\n\
	                    <option value=\"生病/意外\">生病/意外</option>\n\
	                    <option value=\"临时有事\">临时有事</option>\n\
	                    <option value=\"自理签无法如期出签\">自理签无法如期出签</option>\n\
                    </select>\n\
                </td>\n\
			</tr>\n\
			<tr>\n\
				<th><strong class=\"required\">*</strong>联系人</th>\n\
				<td><input type=\"text\" class=\"input_text\" name=\"cancel_order_name\"></td>\n\
			</tr>\n\
			<tr>\n\
				<th><strong class=\"required\">*</strong>手机号码</th>\n\
				<td><input type=\"text\" class=\"input_text\" name=\"cancel_order_phone\"></td>\n\
			</tr>\n\
			<tr>\n\
				<th style=\"vertical-align:top;\"><strong class=\"required\" style=\"display:none\" id=\"js_cancel_order_pop_star\">*</strong>备注</th>\n\
				<td><textarea style=\"width:470px;height:100px;resize:none\" id=\"js_cancel_order_remark\"></textarea></td>\n\
			</tr>\n\
		    </tbody>\n\
        </table>\n\
        <div class=\"order_masking_content\" style=\"display:none\"><strong>您是否确认取消订单<span class=\"js_pop_orderId\"></span>，一经取消订单将无法恢复，请再次确认，谢谢！</strong></div>\n\
		<div class=\"btn_col\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle\" id=\"js_cancel_order_confirm\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle\" id=\"js_cancel_order_submit\" style=\"display:none\"><input type=\"button\" value=\"取消\" class=\"btn_cancel js_pop_close\"></div>\n\
	</div>\n\
</div>\n\
<!--联系携程弹窗-->\n\
<div class=\"order_masking\" id=\"js_service_pop\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\">联系携程<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
		<table class=\"crosswise_tb\">\n\
			<tbody><tr>\n\
				<th style=\"width:80px;\"><strong class=\"required\">*</strong>联系事宜</th>\n\
                <td>\n\
                    <select style=\"width:278px;\" id=\"js_service_pop_select1\">\n\
	                    <option value=\"咨询线路行程\">咨询线路行程</option>\n\
	                    <option value=\"咨询签证材料\">咨询签证材料</option>\n\
	                    <option value=\"订单事宜\">订单事宜</option>\n\
	                    <option value=\"其他事宜\">其他事宜</option>\n\
                    </select>\n\
                    <select style=\"width:195px;display:none\" id=\"js_service_pop_select2\">\n\
	                    <option value=\"确认付款\">确认付款</option>\n\
	                    <option value=\"修改行程\">修改行程</option>\n\
	                    <option value=\"修改资源\">修改资源</option>\n\
	                    <option value=\"修改支付方式\">修改支付方式</option>\n\
	                    <option value=\"预约配送时间\">预约配送时间</option>\n\
                    </select>\n\
                </td>\n\
			</tr>\n\
			<tr>\n\
				<th><strong class=\"required\">*</strong>联系人</th>\n\
				<td><input type=\"text\" class=\"input_text\" name=\"service_order_name\"></td>\n\
			</tr>\n\
			<tr>\n\
				<th><strong class=\"required\">*</strong>手机号码</th>\n\
				<td><input type=\"text\" class=\"input_text\" name=\"service_order_phone\"></td>\n\
			</tr>\n\
			<tr>\n\
				<th style=\"vertical-align:top;\"><strong class=\"required\" style=\"display:none\" id=\"js_service_pop_star\">*</strong>备注</th>\n\
				<td><textarea style=\"width:470px;height:100px;resize:none\" id=\"js_service_remark\"></textarea></td>\n\
			</tr>\n\
		    </tbody>\n\
        </table>\n\
		<div class=\"btn_col\"><input type=\"button\" value=\"提交\" class=\"btn_blue_middle\"><input type=\"button\" value=\"取消\" class=\"btn_cancel js_pop_close\"></div>\n\
	</div>\n\
</div>\n\
<!--请求错误提示-->\n\
<div class=\"order_masking\" id=\"js_pop_error\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\">提示<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
		<div class=\"order_masking_content\">\n\
			<i class=\"icon_warning\"></i>\n\
			<p><strong id=\"js_pop_errormsg\"></strong></p>\n\
		</div>\n\
		<div class=\"btn_col\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle js_pop_close\"></div>\n\
	</div>\n\
</div>\n\
<!--取消订单跳转到我的携程-->\n\
<div class=\"order_masking\" id=\"js_cancel_order_success\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\">取消订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
        <div class=\"order_masking_content\">\n\
			<i class=\"icon_yes\"></i>\n\
			<p><strong>您好，订单<span class=\"js_pop_orderId\"></span>取消请求已发送！请耐心等待携程确认，谢谢！</strong><br>点击这里返回&nbsp;&nbsp;<a href=\"###\">我的携程</a></p>\n\
			<p><span class=\"js_order_pop_time\">3</span>秒后页面将自动跳转到&nbsp;&nbsp;<a href=\"###\">我的携程</a></p>\n\
		</div>\n\
	</div>\n\
</div>\n\
<!--保存成功页面弹窗-->\n\
<div class=\"order_masking\" id=\"js_order_success\" style=\"display:none\">\n\
	<div class=\"order_masking_hd\"><span class=\"js_order_success_title\"></span><a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
	<div class=\"order_masking_bd\">\n\
        <div class=\"order_masking_content\">\n\
			<i class=\"icon_yes\"></i>\n\
			<p><strong>您好，订单<span class=\"js_pop_orderId\"></span><span class=\"js_order_success_txt\"></span></strong></p>\n\
		</div>\n\
        <div class=\"btn_col js_pop_close\" style=\"display:none\"><input type=\"button\" value=\"确定\" class=\"btn_blue_middle\"></div>\n\
	</div>\n\
</div>\n\
<!--jmp模板-->\n\
<div id=\"jmp_pkg_title\" style=\"display:none;\">\n\
    <div class=\"jmp_bd flt_jmp\">\n\
        <strong>${txt0}</strong>\n\
        <p>${txt1}</p>\n\
    </div>\n\
</div>\n\
<div id=\"jmp_single_title\" style=\"display:none;\">\n\
  <div class=\"jmp_bd\">\n\
    <p>${txt}</p>\n\
  </div>\n\
</div>\n\
<div id=\"jmp_craft\" style=\"display:none;\">\n\
	<table class=\"data_form\">\n\
		<tbody>\n\
			<tr>\n\
				<th style=\"width:60px;\">计划机型</th>\n\
				<th style=\"width:140px;\">机型名称</th>\n\
				<th style=\"width:40px;\">类型</th>\n\
				<th style=\"width:80px;\">最少座位数</th>\n\
				<th style=\"width:80px;\">最多座位数</th>\n\
			</tr>\n\
			<tr>\n\
				<td>\n\
                    ${txt0}\n\
                </td>\n\
                <td>\n\
                    ${txt1}\n\
                </td>\n\
                <td>\n\
                    ${txt2}\n\
                </td>\n\
                <td>\n\
                    ${txt3}\n\
                </td>\n\
                <td >\n\
                    ${txt4}\n\
                </td>\n\
			</tr>\n\
		</tbody>\n\
	</table>\n\
</div>\n\
<!-- 选择修改订单内容弹窗 -->\n\
<div class=\"order_masking\" id=\"js_order_modify\" style=\"display:none\">\n\
  <div class=\"order_masking_hd\">修改订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
  <div class=\"order_masking_bd\">\n\
    <p class=\"order_affirmtxt\">请选择您要修改的订单内容：</p>\n\
    <ul id=\"J_modifycnt\" class=\"order_modify basefix\">\n\
    </ul>\n\
    <div class=\"btn_col\">\n\
      <input type=\"button\" class=\"btn_blue_middle\" value=\"下一步\" id=\"J_orderToModify\">\n\
      <input type=\"button\" value=\"取消\" class=\"btn_cancel js_pop_close\">\n\
    </div>\n\
  </div>\n\
</div>\n\
<!-- 修改订单弹出层 -->\n\
<div class=\"order_masking\" id=\"js_modify_order_pop\" style=\"display:none\">\n\
  <div class=\"order_masking_hd\">修改订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
  <div class=\"order_masking_bd\">\n\
      <p class=\"order_affirmtxt\">请填写并确认您的联系方式，我们将尽快处理您的修改信息：</p>\n\
      <table class=\"crosswise_tb\">\n\
        <tr>\n\
          <th style=\"width:80px;\"><strong class=\"required\">*</strong>联系人</th>\n\
          <td><input type=\"text\" class=\"input_text\" id=\"J_popeditname\"></td>\n\
        </tr>\n\
        <tr>\n\
          <th><strong class=\"required\">*</strong>手机号码</th>\n\
          <td><input type=\"text\" class=\"input_text\" id=\"J_popeditmobile\"></td>\n\
        </tr>\n\
        <tr style=\"display:none\">\n\
          <th style=\"vertical-align:top\"><strong class=\"required\">*</strong>备注</th>\n\
          <td><textarea style=\"width:470px;height:100px\" id=\"J_modifyarea\"></textarea></td>\n\
        </tr>\n\
      </table>\n\
      <div class=\"btn_col\">\n\
        <input type=\"button\" class=\"btn_blue_middle\" value=\"确认\" id=\"J_ordersubmit\">\n\
        <input type=\"button\" class=\"btn_cancel js_pop_close\" value=\"取消\">\n\
      </div>\n\
  </div>\n\
</div>\n\
<!-- 修改订单成功弹层 -->\n\
<div class=\"order_masking\" id=\"js_modify_order_success\" style=\"display:none\">\n\
  <div class=\"order_masking_hd\">修改订单<a href=\"javascript:void(0);\" class=\"js_pop_close\">×</a></div>\n\
  <div class=\"order_masking_bd\">\n\
    <div class=\"order_masking_content\">\n\
      <i class=\"icon_yes\"></i>\n\
      <p>您的修改申请已经提交，工作人员会在3个工作小时内联系您，请您耐心等待，谢谢！</p>\n\
    </div>\n\
  </div>\n\
</div>\n\
"});