define(function(){
    return "<div class=\"index_top_wrap basefix\"></div>\n\
            <div class=\"crumbs\"><a title=\"旅游\" href=\"/\" target=\"_blank\">旅游</a>&nbsp;&gt;&nbsp;产品对比</div>\n\
						<div class=\"product_box basefix\">\n\
						  <h2>对比产品</h2>\n\
						  <ul class=\"product_list\">\n\
								{{#each list}}\n\
						    <li>\n\
						      <a href=\"{{Url}}\" class=\"product_pic\" target=\"_blank\"><img src=\"{{PicUrl}}\" alt=\" width=\"167\" height=\"94\"><span>{{MarketingTag}}</span></a>\n\
						      <h3><a href=\"{{Url}}\" target=\"_blank\">{{Name}}</a></h3>\n\
						      <a href=\"{{Url}}\" class=\"btn_blue_big\" target=\"_blank\">查看详情</a>\n\
						    </li>\n\
						    {{/each}}\n\
						  </ul>\n\
						</div>\n\
						<div class=\"contrast_box\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>基本信息</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody><tr id=\"city\">\n\
										<th>出发地</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											<div class=\"product_city\">\n\
												{{#if OtherDepartureCities}}\n\
													<span class=\"city\">{{ProductDepartureCity}}<b></b></span>\n\
													<div class=\"link_wrap\" style=\"display:none\" data-productid=\"{{ProductID}}\" data-effectdate=\"{{EffectDate}}\" data-expiredate=\"{{ExpireDate}}\">\n\
														{{#each OtherDepartureCities}}\n\
														<a href=\"javascript:void(0);\" data-id=\"{{ID}}\">{{Name}}</a>\n\
														{{/each}}\n\
													</div>\n\
												{{else}}\n\
													<span class=\"city\">{{ProductDepartureCity}}</span>\n\
												{{/if}}\n\
											</div>\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr>\n\
										<th>出发日期</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\"><input type=\"text\" class=\"input_text\" id=\"starttime{{@index}}\" style=\"background-image: url(http://pic.c-ctrip.com/cquery/pic_sun.png); background-position: 100% 50%; background-repeat: no-repeat no-repeat;\"></td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr id=\"price\">\n\
										<th class=\"pad_top\">价格</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											<span>成人价：</span><span class=\"base_price\">\n\
											{{#if MinPrice}}\n\
												<dfn>¥</dfn><strong>{{MinPrice}}</strong>起\n\
											{{else}}\n\
												<strong>实时计价</strong>\n\
											{{/if}}\n\
											</span>\n\
											{{#if MinPriceRemark}}\n\
											<span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options:{type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_pkg_title', content:{txt0:'{{{help5 MinPriceRemark}}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor',showArrow:false}}\">起价说明</span></td>\n\
											{{/if}}\n\
										{{/each}}\n\
									</tr>\n\
									<tr id=\"departure\">\n\
										<th>出发班期</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">{{DepartureDays}}</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr>\n\
										<th class=\"pad_top\">点评</th>\n\
										{{#each list}}\n\
											<td class=\"td{{help1 @index}}\">{{{help6 Url RecommendRatings CommentUsers}}}</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr>\n\
										<th>优惠</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											{{#each DiscountInfos}}\n\
												{{#if Description}}\n\
												<div data-role=\"jmp\" data-params=\"{options:{type:'jmp_alert',classNames:{boxType:'jmp_alert'},template:'#jmp_alert', content:{txt:'{{{help5 Description}}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor'}}\">{{DisplayName}}</div>\n\
												{{else}}\n\
												<div>{{DisplayName}}</div>\n\
												{{/if}}\n\
											{{/each}}\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr id=\"recommend\" class=\"border_none\">\n\
										<th>产品经理推荐</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											{{#each ProductRecommends}}\n\
												★ {{{DescDetail}}}<br />\n\
											{{/each}}\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>费用信息</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody><tr id=\"dayPrice\">\n\
										<th>日均费用</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											<span class=\"base_price\">\n\
											{{#if MinPrice}}\n\
												{{{help4 MinPrice Days}}}\n\
											{{else}}\n\
												实时计价\n\
											{{/if}}\n\
											</span>&nbsp;&nbsp;<span>x&nbsp;&nbsp;{{Days}}</span>\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr id=\"feeInfo\" class=\"border_none\">\n\
										<th>费用包含</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											{{#each FeeInfos}}\n\
												<strong>{{TitleName}}</strong><br />\n\
												{{#each PkgDescEntitys}}\n\
													{{{Detail}}}<br />\n\
												{{/each}}\n\
											{{/each}}\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"traffic\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>交通信息</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody><tr>\n\
										<th>交通方式</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\"></td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr class=\"border_none\">\n\
										<th>交通详情</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\"></td>\n\
										{{/each}}\n\
									</tr>\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"hotel\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>酒店信息</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody>\n\
										{{{helpList3 list}}}\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"scenic\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>旅游景点</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody>\n\
									{{{helpList2 list}}}\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"activitie\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>推荐活动</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\">\n\
									<tbody>\n\
									<tr class=\"border_none\">\n\
										<th>活动项目</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">\n\
											<ul class=\"sub_list\">\n\
												{{#each TourSelfChargeActivitiesInfo.SelfChargeActivities}}\n\
												<li>\n\
													<em>{{Name}}</em>\n\
													<span>{{ReferPrice}}元/人起</span>\n\
												</li>\n\
												{{/each}}\n\
											</ul>\n\
										</td>\n\
										{{/each}}\n\
									</tr>\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"shopping\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>购物</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\"><tbody>\n\
									<tr>\n\
										<th>购物总数</th>\n\
										{{#each list}}\n\
										<td class=\"td{{help1 @index}}\">{{TourShoppingInfo.ShopTimes}}</td>\n\
										{{/each}}\n\
									</tr>\n\
									<tr class=\"border_none\">\n\
										<th>购物景点/营业产品</th>\n\
										{{{helpList4 list}}}\n\
									</tr>\n\
								</tbody></table>\n\
							</div>\n\
						</div>\n\
						<div class=\"contrast_box\" id=\"dinner\">\n\
							<a href=\"###\" class=\"btn_open\"></a>\n\
							<h2>用餐</h2>\n\
							<div class=\"contrast_cont\">\n\
								<table class=\"contrast_tb\"><tbody>\n\
									{{{helpList1 list}}}\n\
								</tbody></table>\n\
							</div>\n\
						</div>"
});