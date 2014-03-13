define(function(require, exports, module){
	return {
	    format: function (d, pad) {
	        var r;
	        if (pad == null) pad = false;
	        r = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
	        if (pad) {
	            return r.replace(/\b(\d)\b/g, '0$1');
	        } else {
	            return r;
	        }
	    },
	    parse: function (str, isUtc) {
	        var val;
	        val = Date.parse(str.replace(/-/g, '/'));
	        if (isNaN(val)) {
	            return null;
	        } else {
	            return isUtc ? val : new Date(val);
	        }
	    }
	};
});