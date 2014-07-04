define(function(){
	return "<ul class=\"bill_box\" role=\"invoice\">\n\
      <li class=\"point\">抵用券或礼品卡等消费券支付的金额不提供报销凭证</li>\n\
      <li>\n\
          <label for=\"\" class=\"product_label\">是否需要发票</label>\n\
          <label for=\"invoice01\" class=\"radio\"><input role=\"selectInvo\" type=\"radio\" value=\"1\" name=\"invoice\" id=\"invoice01\">是</label>\n\
          <label for=\"invoice02\" class=\"radio\"><input role=\"cancelInvo\" type=\"radio\" value=\"0\" name=\"invoice\" checked=\"checked\" id=\"invoice02\">否</label>\n\
          <li role=\"invoiceli\" style=\"display:none\">\n\
              <label for=\"\" class=\"product_label\">发票抬头</label>\n\
              <input type=\"text\" value=\"{{initTitle}}\" class=\"num01\" role=\"getInvoice\">\n\
              <span class=\"point\">遵循税务局相关规定，发票抬头必须为个人姓名或公司名称</span>\n\
          </li>\n\
          <li role=\"invoiceli\" style=\"display:none\">\n\
              <label for=\"\" class=\"product_label\">发票明细</label>\n\
              <select name=\"\" role=\"invoiceDetail\">\n\
                  {{#each Content}}\n\
                     {{#if initTitle}}\n\
                     <option {{#equal initContent Value \"selected\" \"\"}}{{/equal}} value=\"{{Key}}\">{{Value}}</option>\n\
                     {{else}}\n\
                     <option value=\"{{Key}}\">{{Value}}</option>\n\
                     {{/if}}\n\
                  {{/each}}\n\
              </select>\n\
          </li>\n\
      </li>\n\
</ul>"});