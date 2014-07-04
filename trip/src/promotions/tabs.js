/*
 * revise tabs with closure
 *
 * @author: william
 */
define(function(require, exports) {
    var $ = require("../../../lib/jquery.js");

    var tabs = (function() {
    	function _init(element, control, currentNumber) {
			var element = $(element),
				control = $(control);

			element.delegate('a', 'click', function() {
				var tabName = $(this).attr('section');
				element.trigger('change.tabs', tabName);
			});

			element.bind('change.tabs', function(e, tabName) {
				element.find('>[section]').removeClass('current');
				element.find('>[section="' + tabName +'"]').addClass('current');
			});

			element.bind('change.tabs', function(e, tabName) {
				control.find('>[section]').removeClass('current');
				control.find('>[section="' + tabName +'"]').addClass('current');
			});

			element.trigger('change.tabs', element.find('a:eq(' + currentNumber + ')').attr('section'));
    	}

    	return {
    		init: _init
    	}
    }());

    exports.init = tabs.init;
});