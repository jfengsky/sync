define(function(require, exports, module){
	var $ = require('jquery');

	function Products() { //产品部分
		var self = this;
		return {
			init: function () {
				var me = this;
				me.fnToggleProductDetail();
				me.fnToggleDetailContent();
				$$ = {
					module: {
						jmpInfo: {
							array: {}
						}
					},
					fltDomestic: {}
				};
				var craftTypeUrl = "http://webresource.c-ctrip.com/code/js/resource/jmpinfo_tuna/CraftType_" + cQuery.config("charset") + ".js"
				$.getScript(craftTypeUrl, function () {
					var getData = function (page) {
						var pagevalue = "";
						if (page.match(new RegExp('=(\\w+)')) != null) {
							pagevalue = page.match(new RegExp('=(\\w+)'))[1];
						}
						page = page.indexOf('?') != -1 ? pagevalue : '';
						if (page != '') {
							var valueObj = {};
							var valueList = null;
							if ($$.module.jmpInfo.array.CraftType)
								valueList = $$.module.jmpInfo.array.CraftType.match(new RegExp('@(' + page + '\\|[^@]*\\|[^@]*\\|\\d*\\|\\d*)@', 'i'));
							if (!valueList || valueList == null) {
								return {};
							}
							valueList = valueList[1].split('|');
							for (var i = 0, len = valueList.length; i < len; i++) {
								valueObj['txt' + i] = valueList[i];
							}
							return valueObj;
						}
						return {};
					};
					cQuery.mod.load('jmp', '1.0', function () {
						$('span[mod1="jmpInfo"]', '#productID').each(function () {
							cQuery(this).regMod('jmp', '1.0', { options: { content: getData($(this).attr('mod_jmpinfo_page')), css: { maxWidth: '460' }, type: 'jmp_table', classNames: { boxType: 'jmp_table' }, template: '#jmp_craft', alignTo: 'cursor', showArrow: false} });
						});
					})
				});
			},
			/**
			* 点击隐藏明细和展开明细，显示隐藏Content按钮
			* @return {void}
			*/
			fnToggleProductDetail: function () {
				$('#base_bd .book_detail').click(function () {
					var jProduct = $(this).parent();
					var jProductContent = jProduct.find('.book_product_content');
					if (jProductContent.is(':hidden')) {
						jProductContent.show();
						$(this).html('隐藏明细<i class="close"></i>');
					} else {
						jProductContent.hide();
						$(this).html('展开明细<i class="up"></i>');
					}
					self.reviewPos(); //刷新提示位置
				});
			},
			/**
			* 点击对应的链接，显示隐藏详细内容
			* 点击所有.pack_up，找到祖先元素.hidden_content，隐藏之
			* 点击所有.show_detailed，找到相邻的tr父元素，如果内部的确有详细内容则显示/隐藏详细内容
			* @return {void} 
			*/
			fnToggleDetailContent: function () {
				$('#base_bd .pack_up').click(function () {
					var jHiddenContent = $(this).parentsUntil('td', '.hidden_content');
					jHiddenContent.hide();
					self.reviewPos(); //刷新提示位置
				});
				$('#base_bd .show_detailed').click(function () {
					var jParentTr = $(this).parents('tr:first');
					var jNextTr = jParentTr.next('tr');
					var jHiddenContent = jNextTr.find('.hidden_content');
					if (jHiddenContent.size() > 0) {
						jHiddenContent.toggle();
					}
					self.reviewPos(); //刷新提示位置
				});
			}
		};
	}
	return Products;
});