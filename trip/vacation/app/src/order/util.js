define(function (require, exports, module) {
    var $ = require('jquery');

	exports.parseCNId = function (str) {//根据身份证返回出生日期
		var sex, age;
		if (str.length == 15) {
			sex = parseInt(str.charAt(14), 10) % 2 ? 'M' : 'F';
			age = str.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
		} else {
			sex = parseInt(str.charAt(16), 10) % 2 ? 'M' : 'F';
			age = str.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
		}
		return {
			passengerSex: sex,
			passengerBirth: age,
			passengerNationality: '中国大陆'
		};
	};

	exports.getRoles = function (el, val, fld) { //获取dom
	    var ret, val, fld;
	    el = el || 'body';
	    fld = fld || 'role';
	    val = val ? ('=' + val) : '';
	    ret = {};
	    (el.jquery ? el : $(el)).find("[" + fld + val + "]").each(function () {
	        var key = this.getAttribute(fld);
	        var obj = ret[key] || (ret[key] = $());
	        obj.push(this);
	    });
	    return ret;
	};
	
	exports.isDate = function (str) {
		if (!str) return false;
		var ret = str.match(/^(\d{4})-([01]?\d)-([0123]?\d)$/);
		if (ret) {
			var d = new Date(parseInt(ret[1], 10), parseInt(ret[2], 10) - 1, parseInt(ret[3], 10));
			if ([d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') == str.replace(/-0/g, '-'))
				return true;
		}
		return false;
	};

	exports.render = function (tpl, data, handle, cb) {
	    if (tpl) {
	        var Template = Handlebars.compile(tpl);
	        var html = Template(data);
	        typeof handle === 'function' && handle.call(this, html);
	        typeof cb === 'function' && cb.call(this, html);
	        return html;
	    }
	    else {
	        return '';
	    }
	};

	exports.hideTip = function (el, opts) {
	    var opts = opts || {};
	    if (el && $(el).data('valid')) {
	        $(el).data('valid').hide(opts);
	    }
	};

    // 注意这里的 this 是被 bind 过的
	exports.reviewPos = function () {//刷新提示位置
	    this.insStatistics && $.map(this.insStatistics, function (v) {//重新计算提示的位置
	        v.setPos();
	    });
	};

    // 注意这里的 this 是被 bind 过的
	exports.regNational = function (el) {
	    var self = this;
	    return cQuery(el).regMod('address', '1.0', {
	        jsonpSource: 'http://webresource.c-ctrip.com/code/cquery/resource/address/flightintl/nationality_' + cQuery.config("charset") + '.js',
	        name: '.nationality',
	        isFocusNext: true,
	        template: {
	            filterInit: function (c) {
	                var d = c.find('a[data]');
	                if (d.length) {
	                    d.attr('href', '###');
	                    self.data.dfNational = d.first().attr('data'); //记录默认的国籍
	                }
	                d.bind('click', function (event) {
	                    event.preventDefault();
	                })
	            },
	            isSuggestionSelect: true,
	            suggestionInit: function (c) {
	                var me = this;
	                var d = c.find('a[data]');
	                var selectedItem = d.first().addClass('hover');
	                var selectContent = function (s) {
	                    var items = d,
                            newSelectedItem;
	                    if (!selectedItem) {
	                        newSelectedItem = items[s == 'down' ? 0 : items.length - 1];
	                    } else {
	                        newSelectedItem = items[items.indexOf(selectedItem) + (s == 'down' ? 1 : -1)];
	                        $(selectedItem).removeClass('hover');
	                        if (!newSelectedItem) {
	                            if (s == 'down')
	                                newSelectedItem = items[0];
	                            else
	                                newSelectedItem = items[items.length - 1];
	                        }
	                    }
	                    if (newSelectedItem) {
	                        $(newSelectedItem).addClass('hover');
	                        selectedItem = newSelectedItem;
	                    } else {
	                        selectedItem = undefined;
	                    }
	                };
	                var fn = function (event) {
	                    var b = event.target,
                            key = event.which,
                            s, val;
	                    if (key === 13) {
	                        s = d.filter('[class="hover"]');
	                        if (s) {
	                            self.data.dfNational = s.attr('data');
	                            val = self.data.dfNational.split('|');
	                            $(el).val(val[1]).attr('mod_value', val[2]).blur();
	                        }
	                    }
	                    if (key === 40) {
	                        selectContent('down');
	                    }
	                    if (key === 38) {
	                        selectContent('up');
	                    }
	                };
	                var initSuggest = function () {
	                    d.removeClass('hover');
	                    selectedItem = d.first().addClass('hover');
	                };
	                if (d.length) {
	                    self.data.dfNational = d.filter('[class="hover"]').attr('data'); //记录默认的国籍
	                }
	                d.bind('mouseover', function () {
	                    $(this).addClass('hover')
	                }).bind('mouseout', function () {
	                    $(this).removeClass('hover')
	                });
	                $(el).bind('blur', function () {
	                    $(c).hide();
	                }).bind('focus', function () {
	                    $(c).show();
	                    initSuggest();
	                }).bind('keyup', fn);
	            },
	            filterStyle: '.c_address_hd { height: 24px; border-color: #2C7ECF; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; padding-left: 10px; }\
                        .c_address_bd { border-color: #999999; border-style: solid; border-width: 0 1px 1px; overflow: hidden; padding:10px; }\
                        .c_address_select { width:276px; height:355px; font-family: Arial, Simsun; font-size: 12px; }\
                        .c_address_wrap { width: 276px; height:349px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #969696; background:#fff; text-align: left; }\
                        .c_address_hd { margin:-1px; }\
                        .c_address_list { margin: 0; padding: 0; height:300px; }\
                        .c_address_list label { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: center; }\
                        .c_address_list span { float: right; font: 10px/22px verdana; margin: 0; overflow: hidden; padding: 0; text-align: right; white-space: nowrap; width: 110px; }\
                        .c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: left; text-decoration: none; }\
                        .c_address_list a.hover { background: none repeat scroll 0 0 #E8F4FF; border-bottom: 1px solid #7F9DB9; border-top: 1px solid #7F9DB9; }\
                        .address_selected { background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px; }\
                        .c_address_pagebreak { line-height: 25px; margin: 0; padding: 0; text-align: center; }\
                        .c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }\
                        a.address_current { color: #000; text-decoration: none; }',
	            suggestion: '<div class="c_address_select"><div class="c_address_wrap"><div class="c_address_hd">' + '输入中英文|代码搜索或↑↓选择.' + '</div><div style="" class="c_address_list">{{enum(key,arr) data}}{{each arr}}<a href="###" title="${display}" data="${data}"><span>${rightDisplay}</span>${display}</a>{{/each}}{{/enum}}</div></div></div>',
	            suggestionStyle: '.c_address_select { width:276px; height:355px; font-family: Arial, Simsun; font-size: 12px; }.c_address_hd { height: 24px; border-color: #2C7ECF; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; text-align:center }.c_address_bd { border-color: #999999; border-style: solid; border-width: 0 1px 1px; overflow: hidden; padding:10px; }.c_address_select { width:222px; height:300px; font-family: Arial, Simsun; font-size: 12px; }.c_address_wrap { width: 276px; height:310px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #969696; background:#fff; text-align: left; } .c_address_hd { margin:-1px; }.c_address_list { margin: 0; padding: 0; height:300px; }.c_address_list span { float: right; font: 10px/22px verdana; margin: 0; overflow: hidden; padding: 0; text-align: right; white-space: nowrap; width: 110px; }.c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: left; text-decoration: none; }.c_address_list a.hover,.c_address_list a:hover { background: none repeat scroll 0 0 #E8F4FF; border-bottom: 1px solid #7F9DB9; border-top: 1px solid #7F9DB9; }.address_selected { background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px; }.c_address_pagebreak { line-height: 25px; margin: 0; padding: 0; text-align: center; }.c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }a.address_current { color: #000; text-decoration: none; }.c_address_select .ico_key, .c_address_select .ico_unkey{position: absolute;top: 1px;left: 1px;width: 34px;height: 24px;overflow: hidden;line-height: 999em;font-size: 0;content: "";background: url(http://pic.c-ctrip.com/ctripOnPad/ico_key.png) no-repeat 0 0;-webkit-transform: scale(.7);}.c_address_select .address_close {position: absolute;top: 3px;right: 4px;width: 18px;height: 19px;overflow: hidden;line-height: 999em;font-size: 0;content: "";text-indent: 99em;background: url(http://pic.c-ctrip.com/ctripOnPad/pad_address_icon.png) no-repeat -32px 0;-webkit-transform: scale(0.5);}.c_address_select .ico_unkey {background: url(http://pic.c-ctrip.com/ctripOnPad/ico_unkey.png) no-repeat 0 0;}'
	        }
	    });
	}
});