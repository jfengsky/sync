define(function (require, exports, module) {
    var $ = require('jquery');
    //重构点击事件
	SearchItemClick = {
		bindClick:function(){
		    $("#searchResultContainer").delegate("[data-href]","click",function(e){
				var $that = $(this);
				var _url = $that.attr('data-href');
			    var event = e || window.event;
			    var _target = event.target || event.srcElement;
				if ($(_target).hasClass('sea_schedule') || $(_target).parents('.sea_schedule').length || $(_target).hasClass('more_comment') || $(_target).hasClass('comment_list') || $(_target).hasClass('calendar_top') || $(_target).hasClass('search_calendar') || $(_target).hasClass('search_calendar_title') || $(_target).hasClass('comment_content') || $(_target).hasClass('compare_btn') || $(_target).hasClass('comment02') || $(_target).hasClass('more_comment_link') || $(_target).parents('.comment02').length || $(_target).parents('.more_comment').length || $(_target).parents('.compare_btn').length || $(_target).hasClass('compare_btn') || $(_target).parents('DD').length || $(_target)[0].tagName==='DO') {
					//查看班期按钮点击
					return false;
				}
				if($that.attr("data-c")==null){
					location.href = _url;
				} else if(/http:\/\//gi.test(_url)){
				    SearchItemClick.submitForm(null, _url, '', true);
				} else {
				    SearchItemClick.submitForm(null, _url, "post", true);
				}
						
				event.preventDefault();
				event.stopPropagation();
			});
		},
		_guid:1,
		getGuid: function () {
		    return SearchItemClick._guid++;
		},
		submitForm: function (pParam, pAction, pMethod, isNew) {
		 var _form = SearchItemClick.createFrom(pParam, pAction, pMethod, isNew);
            _form.submit();
            delete _form;
		},
		createFrom: function (pParam, pAction, pMethod, isNew) {
				var _form = document.createElement("FORM"),
					_inner = [],
					_guid = SearchItemClick.getGuid();
				isNew && (_form.target = "_blank");
				_form.method = pMethod || "get";
				for (var name in pParam) {
					_inner.push(['<input type="hidden" name="', name, '" id="', name, '" value="', pParam[name], '" />'].join(""));
				}
				_inner.push(['<input type="submit" name="submitBtn', _guid, '" id="submitBtn', _guid, '" value="" />'].join(""));
				_form.action = pAction;
				_form.innerHTML = _inner.join("");
				document.body.appendChild(_form);
				return _form;
		},
		init:function(){
			SearchItemClick.bindClick();
		}
	}
	
	
	module.exports = SearchItemClick;
})