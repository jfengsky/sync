var s;
var str = "http://webresource.c-ctrip.com/ResPackageOnline/R8/js/min/sdp/detail-new.js?v=V1.0.5953.26338";
var arr = /http?:\/\/webresource.c-ctrip.com\/ResPackageOnline\/R8\/js\/min\/sdp\/(.*)\.(js.*)/.exec(str);
s = "$1 contains: " + RegExp.$1 + "\n";
s += "$2 contains: " + RegExp.$2 + "\n";
s += "$3 contains: " + RegExp.$3;
console.log(s)
console.log(arr)