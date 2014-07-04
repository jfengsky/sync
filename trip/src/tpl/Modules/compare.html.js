define(function(){
	return "<a class=\"compare_show\" href=\"###\">对比栏<s></s><b></b></a>\n\
					<div class=\"compare_fixed\" style=\"{{#unless visible}}display:none;{{/unless}}\">\n\
						<div class=\"compare_wrap\">\n\
							<ul class=\"compare_list\">\n\
								{{#each list}}\n\
								<li data-id=\"{{ProductID}}\">\n\
									<div class=\"compare_product_wrap\">\n\
										<a href=\"{{Url}}\" class=\"compare_pic\" target=\"_blank\"><img src=\"{{PicUrl}}\" alt=\"\" width=\"125\" height=\"70\"></a>\n\
										<a class=\"compare_name\" href=\"{{Url}}\" target=\"_blank\">{{Name}}</a>\n\
										<p class=\"compare_price\">\n\
											<span class=\"place\">{{ProductDepartureCity}}</span>\n\
											<span class=\"base_price\">\n\
											{{#if MinPrice}}\n\
												<dfn>¥</dfn><strong>{{MinPrice}}</strong>起\n\
											{{else}}\n\
												实时计价\n\
											{{/if}}\n\
											</span>\n\
										</p>\n\
										<a class=\"clean\" href=\"###\"></a>\n\
									</div>\n\
								</li>\n\
								{{/each}}\n\
							</ul>\n\
							<ul class=\"compare_list compare_liststep\" style=\"position:absolute; top:0; left:0;\">\n\
								<li>\n\
									<div class=\"compare_notice_wrap\">\n\
										<span class=\"compare_num\">1</span>\n\
										<p class=\"compare_notice\">最多可同时对比3条产品，您还可以继续添加</p>\n\
									</div>\n\
								</li>\n\
								<li>\n\
									<div class=\"compare_notice_wrap\">\n\
										<span class=\"compare_num\">2</span>\n\
										<p class=\"compare_notice\">最多可同时对比3条产品，您还可以继续添加</p>\n\
									</div>\n\
								</li>\n\
								<li>\n\
									<div class=\"compare_notice_wrap\">\n\
										<span class=\"compare_num\">3</span>\n\
										<p class=\"compare_notice\">最多可同时对比3条产品，您还可以继续添加</p>\n\
									</div>\n\
								</li>\n\
							</ul>\n\
							<div class=\"compare_begin\" style=\"float:right;\">\n\
								<a class=\"begin\" href=\"###\">开始对比</a>\n\
								<a class=\"clean_all\" href=\"###\">清空</a>\n\
							</div>\n\
							<a class=\"compare_hidden\" href=\"###\">隐藏对比栏</a>\n\
							<p class=\"error_notice\" style=\"display: none;\">最多能添加3条线路，请删除部分线路后再加入</p>\n\
						</div>\n\
					</div>"
});