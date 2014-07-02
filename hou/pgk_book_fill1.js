/*! lastmodify: 2014-07-02 18:06:23 */
/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-1.10.2.min.map
//@ SEAJS by plu@ctrip.com  20131101
*/
define("jquery",[],function (require, exports, module) {(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t
}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);});
;
/*! lastmodify: 2013-12-06 13:04:52 */
define("data/addr_data",[],function (require, exports) { exports.addr_data = { "北京": { "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"] }, "上海": { "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"] }, "天津": { "天津市": ["红桥区", "和平区", "河北区", "河东区", "南开区", "河西区", "西青区", "东丽区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "滨海新区", "蓟县"] }, "重庆": { "重庆市": ["沙坪坝区", "渝北区", "江北区", "九龙坡区", "大渡口区", "南岸区", "巴南区", "渝中区", "涪陵区", "万州区", "黔江区", "北碚区", "长寿区", "江津区", "合川区", "永川区", "南川区", "綦江区", "潼南县", "铜梁县", "大足区", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "埑江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "西阳土家族苗族自治县", "彭水苗族土家族自治县"] }, "浙江省": { "杭州市": [], "宁波市": [], "温州市": [], "嘉兴市": [], "湖州市": [], "绍兴市": [], "金华市": [], "衢州市": [], "舟山市": [], "台州市": [], "丽水市": [] }, "江苏省": { "南京市": [], "无锡市": [], "徐州市": [], "常州市": [], "苏州市": [], "南通市": [], "连云港市": [], "淮安市": [], "盐城市": [], "扬州市": [], "镇江市": [], "泰州市": [], "宿迁市": [] }, "四川省": { "成都市": [], "绵阳市": [], "自贡市": [], "攀枝花市": [], "泸州市": [], "德阳市": [], "广元市": [], "遂宁市": [], "内江市": [], "乐山市": [], "资阳市": [], "宜宾市": [], "南充市": [], "达州市": [], "雅安市": [], "阿坝藏族羌族自治州": [], "甘孜藏族自治州": [], "凉山彝族自治州": [], "广安市": [], "巴中市": [], "眉山市": [] }, "河北省": { "石家庄市": [], "唐山市": [], "秦皇岛市": [], "邯郸市": [], "邢台市": [], "保定市": [], "张家口市": [], "承德市": [], "沧州市": [], "廊坊市": [], "衡水市": [] }, "山西省": { "太原市": [], "大同市": [], "阳泉市": [], "长治市": [], "晋城市": [], "朔州市": [], "晋中市": [], "运城市": [], "忻州市": [], "临汾市": [], "吕梁市": [] }, "辽宁省": { "沈阳市": [], "大连市": [], "鞍山市": [], "抚顺市": [], "本溪市": [], "丹东市": [], "锦州市": [], "营口市": [], "阜新市": [], "辽阳市": [], "盘锦市": [], "铁岭市": [], "朝阳市": [], "葫芦岛市": [], "营口": [] }, "吉林省": { "长春市": [], "吉林市": [], "四平市": [], "辽源市": [], "通化市": [], "白山市": [], "松原市": [], "白城市": [], "延边朝鲜族自治州": [] }, "黑龙江省": { "哈尔滨市": [], "齐齐哈尔市": [], "鸡西市": [], "鹤岗市": [], "双鸭山市": [], "大庆市": [], "伊春市": [], "佳木斯市": [], "七台河市": [], "牡丹江市": [], "黑河市": [], "绥化市": [], "大兴安岭地区": [], "黑龙江垦区": [] }, "安徽省": { "合肥市": [], "芜湖市": [], "蚌埠市": [], "淮南市": [], "马鞍山市": [], "淮北市": [], "铜陵市": [], "安庆市": [], "黄山市": [], "滁州市": [], "阜阳市": [], "宿州市": [], "六安市": [], "亳州市": [], "宣城市": [], "池州市": [] }, "福建省": { "福州市": [], "厦门市": [], "莆田市": [], "三明市": [], "泉州市": [], "漳州市": [], "南平市": [], "龙岩市": [], "宁德市": [] }, "江西省": { "南昌市": [], "景德镇市": [], "萍乡市": [], "九江市": [], "新余市": [], "鹰潭市": [], "赣州市": [], "吉安市": [], "宜春市": [], "抚州市": [], "上饶市": [] }, "山东省": { "济南市": [], "青岛市": [], "淄博市": [], "枣庄市": [], "东营市": [], "烟台市": [], "潍坊市": [], "济宁市": [], "泰安市": [], "威海市": [], "日照市": [], "莱芜市": [], "临沂市": [], "德州市": [], "聊城市": [], "滨州市": [], "荷泽市": [] }, "河南省": { "郑州市": [], "开封市": [], "洛阳市": [], "平顶山市": [], "安阳市": [], "鹤壁市": [], "新乡市": [], "焦作市": [], "濮阳市": [], "许昌市": [], "漯河市": [], "三门峡市": [], "南阳市": [], "商丘市": [], "信阳市": [], "周口市": [], "驻马店市": [], "济源市": [] }, "湖北省": { "武汉市": [], "黄石市": [], "十堰市": [], "宜昌市": [], "襄阳市": [], "鄂州市": [], "荆门市": [], "孝感市": [], "荆州市": [], "黄冈市": [], "咸宁市": [], "随州市": [], "恩施土家族苗族自治州": [], "仙桃市": [], "潜江市": [], "天门市": [], "神农架林区": [] }, "湖南省": { "长沙市": [], "株洲市": [], "湘潭市": [], "衡阳市": [], "邵阳市": [], "岳阳市": [], "常德市": [], "张家界市": [], "益阳市": [], "郴州市": [], "永州市": [], "怀化市": [], "娄底市": [], "湘西土家族苗族自治州": [] }, "广东省": { "广州市": ["荔湾区", "越秀区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区", "花都区", "南沙区", "萝岗区", "增城市", "从化市"], "深圳市": ["罗湖区", "福田区", "南山区", "宝安区", "龙岗区", "盐田区"], "韶关市": [], "珠海市": [], "汕头市": [], "佛山市": [], "江门市": [], "湛江市": [], "茂名市": [], "肇庆市": [], "惠州市": [], "梅州市": [], "汕尾市": [], "河源市": [], "阳江市": [], "清远市": [], "东莞市": [], "中山市": [], "潮州市": [], "揭阳市": [], "云浮市": [] }, "贵州省": { "贵阳市": [], "六盘水市": [], "遵义市": [], "安顺市": [], "铜仁地区": [], "黔西南布依族苗族自治州": [], "毕节地区": [], "黔东南苗族侗族自治州": [], "黔南布依族苗族自治州": [] }, "云南省": { "昆明市": [], "曲靖市": [], "玉溪市": [], "保山市": [], "昭通市": [], "丽江市": [], "普洱市": [], "临沧市": [], "德宏傣族景颇族自治州": [], "怒江僳僳族自治州": [], "迪庆藏族自治州": [], "大理白族自治州": [], "楚雄彝族自治州": [], "红河哈尼族彝族自治州": [], "文山壮族苗族自治州": [], "西双版纳傣族自治州": [] }, "海南省": { "海口市": [], "三亚市": [], "三沙市": [] }, "陕西省": { "西安市": [], "铜川市": [], "宝鸡市": [], "咸阳市": [], "渭南市": [], "延安市": [], "汉中市": [], "榆林市": [], "安康市": [], "商洛市": [] }, "甘肃省": { "兰州市": [], "嘉峪关市": [], "金昌市": [], "白银市": [], "天水市": [], "武威市": [], "张掖市": [], "平凉市": [], "酒泉市": [], "庆阳市": [], "定西市": [], "陇南市": [], "临夏回族自治州": [], "甘南藏族自治州": [] }, "青海省": { "西宁市": [], "海东市": [], "海北藏族自治州": [], "黄南藏族自治州": [], "海南藏族自治州": [], "果洛藏族自治州": [], "玉树藏族自治州": [], "海西蒙古族藏族自治州": [] }, "西藏自治区": { "拉萨市": [], "昌都地区": [], "山南地区": [], "日喀则地区": [], "那曲地区": [], "阿里地区": [], "林芝地区": [] }, "内蒙古自治区": { "呼和浩特市": [], "包头市": [], "乌海市": [], "赤峰市": [], "通辽市": [], "鄂尔多斯市": [], "呼伦贝尔市": [], "巴彦淖尔市": [], "乌兰察布市": [], "兴安盟": [], "锡林郭勒盟": [], "阿拉善盟": [] }, "广西壮族自治区": { "南宁市": [], "柳州市": [], "桂林市": [], "梧州市": [], "北海市": [], "防城港市": [], "钦州市": [], "贵港市": [], "玉林市": [], "百色市": [], "贺州市": [], "河池市": [], "来宾市": [], "崇左市": [] }, "宁夏回族自治区": { "银川市": [], "石嘴山市": [], "吴忠市": [], "固原市": [], "中卫市": [] }, "新疆维吾尔自治区": { "乌鲁木齐市": [], "克拉玛依市": [], "吐鲁番地区": [], "哈密地区": [], "昌吉回族自治州": [], "博尔塔拉蒙古自治州": [], "巴音郭楞蒙古自治州": [], "阿克苏地区": [], "克孜勒苏柯尔克孜自治州": [], "喀什地区": [], "和田地区": [], "伊犁哈萨克自治州": [], "塔城地区": [], "阿勒泰地区": []}} });;
/*
* @Author xhjin
* @CreateDate  2013/10/17
* @Desc  地址联动
<div id="test1" data-address-value='上海市,上海市,黄浦区'>
</div>
seajs.use('..../address.js', function(main) {
main.init({id:"#test1",type:"panel"});
});

1,赋值
data-address-value 有值的时候 会进行初始化
main.set("#test1","上海市,上海市,黄浦区",","); 

2,取值
main.get("#test1",","); //默认返回 组合 上海,上海市,黄浦区
获取data-address-value 直接返回中间带逗号

*/

define("public/address",["jquery","data/addr_data"],function (require, exports, module) {
    var $ = require('jquery');
    var my_addr_data = require("../data/addr_data");
    function address(options, interfaces, parent) {
        //预先处理
        if (typeof options == "string") options = { target: options }
        if (typeof options.target == "string") options.target = document.getElementById(options.target);
        var defaults = { placeholder: "" }, opt = this.options = options, self = this;
        this.parent = opt.parent = parent || opt.parent;
        this.target = opt.target;
        if (this.parent) this.parent.list.push(this);
        this.list = [];
        this.interfaces = this._interfaces(interfaces);
        for (var i in defaults) opt[i] = opt[i] || opt[i];
        address.list.push(this);
    }
    address.prototype = {
        constructor: address,
        init: function () {
            this.change(true); //默认值清空
            this.trigger("init");
            this.fire("init");
        },
        change: function (change) {//默认值
            change = change || (this.data ? false : true), dv = this.options.value;
            if (change) {
                this.data = this.get(); this.value = "";
                this.filter = this.data[1];
                this.data = this.data[0];
            }
            if (this.data.length < 1) this.value = "";
            else if (this.data.length == 1) {
                this.value = this.data[0].value;
            }
            else if (dv) {
                for (var i = 0, len = this.data.length; i < len; i++) {
                    if (this.data[i].value == dv) { this.value = dv; break; }
                };
            }
            this.trigger("draw", [this.data, this.filter, change]);
            if (this.value) this.fire("change", [true]); //如果有选中的值 继续往下走
        },
        clear: function () {
            this.value = ""; this.data = null, this.filter = [];
            this.trigger("draw", [[], [], true]);
            this.fire("clear");
        },
        show: function (only) {
            if (only !== false) address.hide(); if (!this.data) return;
            if (this.data.length < 2) return this.fire("show");
            this.trigger("show");
        },
        hide: function () {
            this.trigger("hide");
        },
        "set": function (value, show) {
            value = value || "";
            this.hide();
            if (value != this.value) {
                this.value = value;
                this.fire("clear");
                this.change();
                if (show) this.fire("show");
            }
            this.trigger("set", [value]);
            return this;
        },
        fire: function (type, p) {
            for (var i = 0, len = this.list.length; i < len; i++) {
                this.list[i][type].call(this.list[i], p);
            };
        },
        trigger: function (type, p) {
            return this.interfaces[type] && this.interfaces[type].apply(this, p || []);
        },
        _interfaces: function (interfaces) {//定义必须要实现的接口
            var f = {
                init: function () { throw new Error('init:方法未定义'); },
                draw: function () { throw new Error('draw:方法未定义'); },
                show: function () { throw new Error('show:方法未定义'); },
                hide: function () { throw new Error('hide:方法未定义'); },
                "set": function () { throw new Error('set:方法未定义'); }
            };
            for (var i in interfaces) f[i] = interfaces[i];
            return f;
        },
        "get": function () {
            var list = [], p = this.parent;
            while (p) {
                list.unshift(p.value || "");
                p = p.parent;
            };
            return address.get.apply(address, list || []);
        }
    }
    address.add = function (options, interfaces, parent) {
        return new address(options, interfaces, parent);
    }
    address.init = function () {
        for (var i = 0, len = this.list.length; i < len; i++) {
            var o = this.list[i];
            if (o._is_init) continue; o._is_init = true;
            if (!o.parent) o.init();
            o.options.value = ""; //默认值清空
        };
    }
    address.list = [];
    address.hide = function () {
        this.trigger("hide");
    }
    address.trigger = function (type, p) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            var o = this.list[i]; o && o[type] && o[type].apply(o, p || []);
        };
    }
    address.get = function () {//返回标准的list[{text:value}]
        var data = this.data(), result = [[], []];
        for (var i = 0, len = arguments.length; i < len; i++) {
            result[1].unshift({ text: arguments[i], value: arguments[i] });
            if ((!data) || data instanceof Array) {
                data = null;
                break;
            }
            if (!data[arguments[i]]) {
                data = null;
                break;
            }
            data = data[arguments[i]];
        }
        data = data || {};
        if (data instanceof Array) {
            for (var i = 0, len = data.length; i < len; i++) result[0].push({ text: data[i], value: data[i] });
        }
        else {
            for (var k in data) {
                if (!data.hasOwnProperty(k)) continue;
                result[0].push({ text: k, value: k });
            }
        }
        return result;
    }
    address.data = function () { return my_addr_data.addr_data || []; }
    address.writeCSS = function (id, css) {
        css += " ";
        var styleE = document.getElementById(id), styleSheet;
        var styleSheets = document.styleSheets;
        for (var i = styleSheets.length - 1; i > -1; i--) {
            var st = styleSheets[i];
            if ((st.ownerNode && st.ownerNode.id == id) || st.id == id) styleSheet = styleSheets[i];
        }
        if (!(styleE || styleSheet)) {
            var head = document.getElementsByTagName("head")[0];
            styleE = document.createElement("style");
            styleE.setAttribute("type", "text/css");
            styleE.setAttribute("id", id);
            styleE.setAttribute("media", "screen");
            head.appendChild(styleE);
            styleSheet = document.styleSheets[document.styleSheets.length - 1];
        }
        if (styleSheet && document.createStyleSheet) styleSheet.cssText = css;
        else if (styleE && document.getBoxObjectFor) styleE.innerHTML = css;
        else {
            var cns = styleE.childNodes;
            for (var i = cns.length - 1; i > -1; i--) {
                cns[i].parentNode.removeChild(cns[i]);
            }
            styleE.appendChild(document.createTextNode(css));
        }
    };

    var $c = $;
    var handler = {
        init: function (options) {
            var $content = $(options.id), oc = (options.type == "select") ? this.select : this.panel;
            $content.html(oc.templete).addClass("v_address"); ;
            var $cs = $content.children();
            var $o1 = address.add({ target: $cs.eq(0), placeholder: "选择省" }, oc.interfaces);
            var $o2 = address.add({ target: $cs.eq(1), placeholder: "选择市" }, oc.interfaces, $o1);
            var $o3 = address.add({ target: $cs.eq(2), placeholder: "选择区" }, oc.interfaces, $o2);
            address.init();
            $content.data("address", [$o1, $o2, $o3]);

            $(document).off(".address").on("click.address", function () {
                address.hide();
            });
            if (options.type == "panel") {
                address.writeCSS("addressStyle", [
					".v_address{font-size: 12px;}",
					".v_address a{color: #0066cc;text-decoration: none;}",
					".v_address .m_item{float: left;padding-right: 5px;}",
					".v_address .ico_drop{padding-right: 15px;background-position: right -736px;cursor: pointer;display: inline-block;background-position: 0 -9999em;background-repeat: no-repeat;}",
					".v_address .m_input {height: 18px;padding-left: 3px;margin-right: 5px;line-height: 18px;border: 1px solid #b4b4b4;box-shadow: 1px 1px 3px #ddd inset;vertical-align: middle;font-family: Arial;}",
					".v_address .m_input:focus{background-color:#F1F9FF;border-color:#5D9DE5 #67A1E2 #67A1E2 #5D9DE5;box-shadow:1px 1px 3px #D0DEE6 inset;}",
					".v_address .w02{width: 110px;}",
					".v_address .m_address_box {border: 1px solid #999;padding: 10px;background-color: #fff;width: 400px; position: absolute; font-size: 9pt; z-index: 9999;}",
					".v_address .m_address_bd{max-height:300px;min-height:1px;overflow-y:auto;*zoom:1;}",
					".v_address .m_address_bd a{float:left;width:27%;*width:26.5%;margin-right:3%;padding:0 1.4%;border:1px solid #fff;line-height:22px;*zoom:1;overflow:hidden;height:25px}",
					".v_address .m_address_bd a:hover{background-color:#E8F4FF;border-color:#acccef;text-decoration:none;}",
					".clearfix:{zoom: 1;}",
					'.clearfix:after {display: block;clear: both;visibility: hidden;height: 0;content: ".";overflow: hidden;}'
				].join("\r\n"));
            }

            if ($content.attr("data-address-value")) handler.set($content, $content.attr("data-address-value"), ",");

            return this;
        },
        get: function ($content, placeholder) {
            return $.map(($($content).data("address") || []), function (o) {
                return o.value;
            }).join(placeholder || "");
        },
        set: function ($content, value, placeholder) {
            if (placeholder && typeof value == "string") value = value.split(placeholder);
            if (!(value instanceof Array)) return;
            var cs = $($content).data("address") || []; if (cs.length < 1) return;
            $.map(cs, function (o, index) {
                o.set((value[index] || ""));
            });
        },
        panel: {
            templete: '<div class="m_item"><input readonly="readonly" type="text" class="m_input w02 ico_drop" ><span>省</span></div><div class="m_item"><input readonly="readonly" type="text" class="m_input w02 ico_drop" ><span>市</span></div><div class="m_item"><input  type="text" class="m_input w02 ico_drop" ><span>区</span></div>',
            interfaces: {
                "set": function (value) {
                    var $p = $(this.target.parent());
                    $p.attr("data-address-value", handler.get($p, ","));
                },
                hide: function () {
                    this.selection && this.selection.hide();
                },
                show: function () {
                    this.selection && this.selection.show();
                }, //data 当前需要渲染的数据 filter 父级筛选条件
                draw: function (data, filter, change) {//change 表示内容是否发生改变
                    var self = this, data = data || [];
                    if (!self.target) return;
                    if (!self.selection) {
                        self.selection = $("<div class='m_address_box clearfix'></div>").appendTo($(self.target)).hide().click(function (event) {
                            var a = $(event.target);
                            if (a.is("a")) {
                                self.set(a.text(), true); //被赋值的时候 可能会触发子级的draw  寻找到下一个并且给与立即展示
                                return false;
                            }
                        });
                    }

                    var result = ["<div class='m_address_bd'>"];
                    for (var i = 0, len = data.length; i < len; i++) {
                        result.push('<a href="javascript:void(0);" title="' + data[i].text + '" style="color:' + ((data[i].value == this.value) ? "red" : "black") + ';">' + data[i].text + '</a>');
                    };
                    result.push("</div>");
                    self.selection.html(result.join(""));
                    this.target && $(this.target).children("input").val(this.value);


                    if (self.options.placeholder == "选择区") {//对选择区 做下特殊处理
                        $(self.target).show();
                        if (data.length < 1) $(self.target).hide();
                    }
                    var offset = $(self.target).offset();
                    self.selection.css({ left: offset.left, top: offset.top + 25 });
                },
                init: function () {//对象被初始化之后 调用
                    var self = this, opt = this.options;
                    if (this.target) {
                        $(this.target).click(function () {
                            self.show();
                            return false; //阻止冒泡
                        }).children("input").attr("placeholder", opt.placeholder);
                    }
                    self.hide();
                }
            }
        },
        select: {
            templete: '<select id="provice"></select><select id="city"></select><select id="area"></select>',
            interfaces: {
                "set": function (value) {//将值保存到属性内
                    var $p = $(this.target.parent());
                    $p.attr("data-address-value", handler.get($p, ","));
                },
                hide: function () { },
                show: function () { },
                draw: function (data, filter, change) {//change 表示内容是否发生改变
                    var self = this, data = data || [];
                    if (!self.target) return;
                    var result = [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        result.push('<option value="' + data[i].value + '">' + data[i].text + '</option>');
                    };
                    if (self.options.placeholder) result.unshift('<option value="">' + self.options.placeholder + '</option>');
                    $(self.target).html(result.join("")).val(this.value || "");

                    if (self.options.placeholder == "选择区") {//对选择区 做下特殊处理
                        $(self.target).show();
                        if (data.length < 1) $(self.target).hide();
                    }
                },
                init: function () {
                    var self = this, opt = this.options;
                    if (this.target) {
                        $(this.target).change(function () {
                            self.set($(this).val(), true);
                        });
                    }
                }
            }
        }
    };
    module.exports = handler;
});;
﻿//身份证校验 
define("public/IDCheck",[],function (require, exports, module) {
    var inArray = function (array, val, from) {
        var i, len;
        if (from == null) {
            from = 0;
        }
        len = array.length;
        if (from < 0) {
            from += len;
        }
        i = Math.max(from, 0);
        while (i < len) {
            if (array[i] === val) {
                return i;
            } ++i;
        }
        return -1;
    };
    var areaCode = '11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91';
    var checkId = function (idcard) {
        var reg, Y, JYM, JYM_X, S, M, M_X;
        var arr_idcard = idcard.split('');
        var _ret = true;
        if (inArray(areaCode.split('x'), idcard.substr(0, 2)) === -1) {
            _ret = false;
        }
        /*身份号码位数及格式检验*/
        switch (idcard.length) {
            case 15:
                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 400 == 0)) {
                    reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性  
                } else {
                    reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性  
                }
                if (!reg.test(idcard)) {
                    _ret = false;
                }
                break;
            case 18:
                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                    reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式  
                } else {
                    reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式  
                }
                if (reg.test(idcard)) { //测试出生日期的合法性  
                    //计算校验位  
                    S = (parseInt(arr_idcard[0]) + parseInt(arr_idcard[10])) * 7 + (parseInt(arr_idcard[1]) + parseInt(arr_idcard[11])) * 9 + (parseInt(arr_idcard[2]) + parseInt(arr_idcard[12])) * 10 + (parseInt(arr_idcard[3]) + parseInt(arr_idcard[13])) * 5 + (parseInt(arr_idcard[4]) + parseInt(arr_idcard[14])) * 8 + (parseInt(arr_idcard[5]) + parseInt(arr_idcard[15])) * 4 + (parseInt(arr_idcard[6]) + parseInt(arr_idcard[16])) * 2 + parseInt(arr_idcard[7]) * 1 + parseInt(arr_idcard[8]) * 6 + parseInt(arr_idcard[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10x98765432";
                    JYM_X = "10X98765432";
                    M = JYM.substr(Y, 1); /*判断校验位*/
                    M_X = JYM_X.substr(Y, 1); /*判断校验位*/
                    if (M != arr_idcard[17] && M_X != arr_idcard[17]) {
                        _ret = false;
                    }
                } else {
                    _ret = false;
                }
                break;
            default:
                _ret = false;
                break;
        }
        return _ret;
    }
   // exports.check = checkId;
    module.exports = checkId;
});
/**
 * 证件有效期，出生日期 日历交互模块
 */
define("order/mod_book_calendar",["jquery"],function (require, exports, module) {
    var JQ = require('jquery');
      $LAB.script({src:'http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js', charset:"utf-8"}).wait(function() {
        var CinputSelect = $('.J_uyear'),
            JinputSelect = JQ('.J_uyear'),
            Jcalcnt = JinputSelect.nextAll('.J_carduntil');

        JinputSelect.regMod('calendar', '6.0', {
          options: {
            container: "#J_carduntil",
            showAlways: false,
            step: 1,
            showWeek: false
          },
          listeners: {
            // onBeforeShow: function(){
            //   console.log('回调不能选的日期')
            // },
            onChange: function(input, value) {
              var d = value.toDate();

            }
          }
        });
      });
    
    


});
;
//=====
//create by hwmiao(hwmiao@ctrip.com)
//=====
define("order/pgk_book_fill",["jquery","public/address","public/IDCheck","order/mod_book_calendar"],function (require, exports, module) {
    var $ = require('jquery');
    var cities = require('../public/address');
    var IDCheck = require('../public/IDCheck');
    var IsTmporaryOrder = false; // 是否暂存订单

    

    window.__bfi = window.__bfi || [];
    function ubt_userblock_post(el, msg) {
        if (!el) return false;
        var ct = 'validateCount',
            count = cQuery(el).data(ct);
        !count ? cQuery(el).data(ct, 1) : cQuery(el).data(ct, count + 1);
        window.__bfi.push(['_trackUserBlock', {
            'dom': (el.id && ('id:' + el.id)) || (el.name && ('name:' + el.name)) || '',
            'value': el.value || '',
            'type': (el.tagName ? 'dom:' + el.tagName.toLowerCase() : '') + (el.type ? ':' + el.type : ''),
            'form': el.form ? ((el.form.id && ('id:' + el.form.id)) || (el.form.name && ('name:' + el.form.name))) : '',
            'message': msg || '',
            'count': cQuery(el).data(ct)
        }]);
    }
    GVdate = {
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
    var Birth = function (str, date) {
        var t = date ? GVdate.parse(date) : new Date();
        var y = t.getFullYear();
        var m = t.getMonth();
        var d = t.getDate();
        this.birth = {
            ref: t,
            baby: new Date(y - 2, m, d),
            child: new Date(y - 12, m, d),
            sixteen: new Date(y - 16, m, d),
            adult: new Date(y - 18, m, d),
            eldor: new Date(y - 70, m, d)
        };
        // this.str = str;
    };
    Birth.prototype = {
        getAge: function (str, date) {
            var birth = GVdate.parse(str),
                today = date ? new Date(date) : new Date(),
                age = today.getFullYear() - birth.getFullYear();
            if (today.getMonth() < birth.getMonth() || today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) {
                age--;
            }
            return age;
        },
        isAdult: function (str) {
            return GVdate.parse(str) < this.birth.adult;
        },
        isChild: function (str) {
            return GVdate.parse(str) > this.birth.child;
        },
        isBaby: function (str) {
            return GVdate.parse(str) > this.birth.baby;
        },
        underSixteen: function (str) {
            return GVdate.parse(str) > this.birth.sixteen;
        },
        isEldor: function (str) {
            return GVdate.parse(str) < this.birth.eldor;
        },
        laterThenDepart: function (str) {
            return GVdate.parse(str) > this.birth.ref;
        },
        laterThenToday: function (str) {
            return GVdate.parse(str) > new Date();
        }
    };
    var orderprocess = {
        config: {
            fetchUrl: ''
        },
        Reg: {
            hasCnChar: function (str) {
                return /[\u0100-\uffff]/.test(str);
            },
            isCnChar: function (str) {
                return /^[\u4e00-\u9fa5]+$/.test(str);
            },
            isEnChar: function (str) {
                return /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
            },
            isEnName: function (str) {
                return /^[^\/]+\/[^\/]+$/.test(str);
            },
            hasEnChar: function (str) {
                return /[A-Za-z]/.test(str);
            },
            checkCnName: function (str, req) {
                if(req){
                    if ('' === str || str === "证件的中文姓名")
                        return [false, "请填写中文名"];
                    if (this.isCnChar(str) && str.length === 1)
                        return [false, "中文姓名不可少于2个汉字"];
                    if (this.isEnChar(str) || this.isEnName(str))
                        return [false, "请保持姓名与证件上的姓名一致"];
                    if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
                        return [false, "中文姓名只能包含汉字（至少一个）、字母和连字符，生僻字可用拼音代替"];
                    if (this.hasEnChar(str))
                        return [true, '请确认填写的姓名与证件上姓名是否一致，生僻字可用拼音代替'];
                    if (/\u5c0f\u59d0|\u5148\u751f|\u592a\u592a|\u592b\u4eba/.test(str))
                        return [true, '您提交的姓名中含有称谓，请确认是否为您证件上的姓名'];
                }
                return [true, ];
            },
            checkEnNameNew: function (str, req) {
                if(req){
                    if ('' === str)
                        return [false, "请输入英文/拼音，如姓名为张小明，则在“姓（拼音或英文）”栏中输入Zhang；在“名（拼音或英文）”栏中输入XiaoMing"];
                    if (/[^a-zA-Z. \/'-]/.test(str))
                        return [false, "英文姓名中包含非法字符，请检查"];
                    if (!/^[a-zA-Z]/.test(str))
                        return [false, "英文的姓名必须以字母开头"];
                }
                return [true, ];
            },
            checkEnName: function (str) {
                if ('' === str)
                    return [false, "请填写英文姓名，姓名格式为姓/名，姓与名之间用 / 分隔，如Green/Jim King"];
                if (str.length < 2)
                    return [false, '英文姓名不可少于2个英文单词'];
                if (!this.isEnName(str))
                    return [false, "请填写英文姓名，姓名格式为姓/名，姓与名之间用 / 分隔，如Green/Jim King"];
                if (/[^a-zA-Z. \/'-]/.test(str))
                    return [false, "英文姓名中包含非法字符，请检查"];
                var name = str.split('/');
                if (/[^a-zA-Z]/.test(name[0]))
                    return [false, "英文的姓中只能包含字母"];
                if (!/^[a-zA-Z]/.test(name[1]))
                    return [false, "英文的名必须以字母开头"];
                return [true, ];
            },
            checkName: function (str, type, val) {
                if ('' === str)
                    return [false, '请填写姓名'];
                if (this.hasCnChar(str)) {
                    if (type == 'national' && val == '中国大陆')
                        return [false, '非中国国籍请填写英文姓名'];
                } else if (type == 'ID' && val == 1)
                    return [false, '请保持姓名与证件上的姓名一致'];
                else
                    return this.checkEnName(str);
            },
            checkPhone: function (str, type) {
                switch (type) {
                    case 'zcode':
                        if ('' === str || '区号' === str)
                            return [false, '请填写区号'];
                        if (/[^\d]/.test(str))
                            return [false, '区号仅包含数字'];
                        if (!/^0[0-9]{2,3}$/.test(str))
                            return [false, '区号必须是0开头的3或4位的数字'];
                        else
                            return [true, ];
                    case 'tphone':
                        if ('' === str || '电话号码' === str)
                            return [false, '请填写电话号码'];
                        if (/[^\d]/.test(str))
                            return [false, '请填写正确的电话号码，电话号码仅包含数字'];
                        if (str.length < 7)
                            return [false, '请填写正确的电话号码，电话号码长度7位以上'];
                        else
                            return [true, ];
                    case 'ext':
                        if ('分机号码' === str)
                            return [true, ];
                        if (/[^\d]/.test(str))
                            return [false, '分机号码必须是数字'];
                        else
                            return [true, ];
                }
            },
            checkMobile: function (str) {
                if ('' === str)
                    return [false, '请填写手机号码'];
                if (!/^0?1[34578]\d{9}$/.test(str))
                    return [false, '您填写的手机号码有误，请重新填写'];
                return [true, ]
            },
            checkEmail: function (str) {
                if ('' === str)
                    return [false, '请填写电子邮箱'];
                if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str))
                    return [false, '请输入正确的电子邮箱'];
                return [true, ]
            },
            checkIdCard: function (str, type) {
                var _name = '1@身份证|2@护照|3@学生证|4@军官证|6@驾驶证|7@回乡证|8@台胞证|10@港澳通行证|11@国际海员证|20@外国人永久居留证|21@旅行证|22@台湾通行证|23@士兵证|24@临时身份证|25@户口簿|26@警官证|99@其它';
                var _ref = {};
                $.map(_name.split('|'), function (v, k) {
                    var _ar = v.split('@');
                    _ref[+_ar[0]] = _ar[1];
                })
                if ('' === str)
                    return [false, '请填写' + _ref[type] + '号码'];
                if (type === 1) {
                    if (!IDCheck(str)) {
                        return [false, '请输入正确的' + _ref[type] + '号码'];
                    } else {
                        var checkArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                        var referArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                        var cardTemp = 0;
                        for (i = 0; i < 17; i++) {
                            cardTemp += str.substr(i, 1) * checkArray[i];
                        }
                        if (referArray[cardTemp % 11] != str.substr(17, 1)) {
                            return [false, '请输入正确的' + _ref[type] + '号码'];
                        }
                    }
                }
                if (type === 8) {
                    if (/[^A-Za-z0-9()（）]/.test(str))
                        return [false, '请填写正确的台胞证号码：号码中只能包含数字、字母或括号'];
                } else if (type === 4 || type === 13) {
                    if (/[^\u4e00-\u9fa5a-zA-Z0-9]/.test(str)) {
                        return [false, '请填写正确的军人证号码，号码中只能包含汉字、数字和字母'];
                    }
                } else {
                    if (/[^A-Za-z0-9]/.test(str))
                        return [false, "请填写正确的" + _ref[type] + "号码，号码中只能包含数字或字母"];
                }
                return [true, ];
            },
            //证件号码重复提示
            checkIdRepeat: function (type, IdNum, Rtext) {
                var IdNumber_Card1 = [];
                var repeatYes = false;
                for (i = 0; i < $("select[role='idCardType']").length; i++) {
                    if ($("select[role='idCardType']")[i].value == type && !$($("select[role='idCardType']")[i]).next().hasClass('f_error') && !$($("select[role='idCardType']")[i]).next().hasClass('inputSel')) {
                        IdNumber_Card1.push($($("select[role='idCardType']")[i]).next().val());
                    }
                }
                var number_Card1;
                for (i = 0; i < IdNumber_Card1.length; i++) {
                    number_Card1 = IdNumber_Card1[i];
                    for (j = 0; j < IdNumber_Card1.length; j++) {
                        if (number_Card1 == IdNumber_Card1[j] && i != j) {
                            repeatYes = true;
                        }
                    }
                }
                if ($(IdNum).next().hasClass('repeatNum')) {
                    $(IdNum).next().remove();
                }
                if (repeatYes) {
                    $('<span style="position:absolute;border:1px #ffb533 solid;height:26px;font:12px/2 Arial,Tahoma,simsun;background-color:#fff5d1;;line-height:26px;margin-left:7px" class="repeatNum">' + Rtext + '号码不能重复</span>').insertAfter($(IdNum));
                }
            }
        },
        data: {
            modules: {}, //对象模块
            productsPrice: 0, //票价和
            couponPrice: 0, //优惠券金额
            couponNowPrice: 0,
            postage: 0, //运费|邮费
            cache: {}, //缓存信息
            roles: {}, //需要操作的dom
            dfNational: null //默认国籍
        },
        status: {
            error: {},
            isTmpSave: false,
            isPay: false,
            errorElem: null
        },
        formData: { //submit数据
            PassengerInfos: [], //出行人
            CouponInfo: {
                IsUseCoupon: 0,
                CashBack: 0
            }, //促销
            InvoiceInfo: null, //发票
            ContactInfo: {}, //联系人
            CurrentUserUId: '', //用户uid
            DeliverInfo: {
                "DeliverType": 0,
                "AddresseeName": "",
                "ContactTel": "",
                "Address": "",
                "PostCode": ""
            },
            "OtherInfo": {
                "NoSmokingRoom": 0,
                // "NeedAdsl": 0,
                "BedDes": "",
                "Remark": ""
            }
        },
        tpl: { //模板
            payTip: '<div class="notice_box">\
                        <i></i>无需提前在携程网站付款，订单提交成功后，您可凭收到的订单确认短信至指定的售票窗口按预订价付款购票。\
                    </div>',
            linkerSug: '<div class="person_content">\
                        {{#if board}}\
                        <p>出行人</p>\
                        <div class="layoutfix">\
                            {{#each board}}\
                            <a href="###" index={{@index}}>{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}<span>{{mobileNo}}</span></a>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                        {{#if common}}\
                        <p>常用联系人</p>\
                        <div class="layoutfix">\
                            {{#each common}}\
                            <a href="###" uid="{{InfoID}}">{{ContactName}}<span>{{Moblie}}</span></a>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                    </div>',
            commoners: '<ul class="person_select">\
                {{#each collecters}}\
                    <li cid="{{clientID}}">\
                    <a href="javascript:void(0);" class="cb-item {{#if selected}}selected{{/if}}" ptype="{{ptype}}" cid="{{clientID}}" role="topContact" data-params="{id:\'{{clientID}}\',name:\'{{nameCN}}\',certificate:\'{{certificate}}\',certificate_number:\'{{certificate_number}}\',mphone:\'{{mobileNo}}\'}"><i></i><span>{{#if nameCN}}{{nameCN}}{{else}}{{#if ENFirstName}}{{ENLastName}}/{{ENFirstName}} {{ENMiddleName}}{{/if}}{{/if}}</span></a>\
                    </li>\
                {{/each}}\
              </ul>',
            traveller: '{{#each list}}\
                      <div class="product_input product_input_border layoutfix" ptype="{{#if isAdult}}1{{else}}0{{/if}}" filled="{{filled}}" index="{{clientID}}" role="youren">\
                         {{#unless @index}}\
                         <div class="warm_Tip">{{../../Reminder}}</div>\
                        {{/unless}}\
                        <h4>旅客{{#add @index 1}}{{/add}}\
                        {{#if isAdult}}\
                        <div><span class="adult">成人</span></div>\
                        {{else}}\
                        <div><span class="child">儿童</span></div>\
                        {{/if}}\
                        </h4>\
                        <ul class="input_box">\
                        {{#if UserName}}\
                            {{#with UserName}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input type="text" class="input_m cq" _cqnotice="证件的姓名" value="{{#if ../../nameCN}}{{../../nameCN}}{{else}}{{../../ENLastName}}{{#if ../../ENLastName}}/{{/if}}{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}" role="name" regex="checkName" required/>\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_1\',alignTo:\'cursor\'}}">填写说明</a>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if ChineseName}}\
                            {{#with ChineseName}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input type="text" class="input_m cq" _cqnotice="证件的中文姓名" value="{{../../nameCN}}" role="nameCN" regex="checkCnName" required/>\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_2\',alignTo:\'cursor\'}}">填写说明</a>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if EnglishName}}\
                            {{#with EnglishName}}\
                            <li class="optional">\
                                <label for="" class="product_label">{{Name}}</label>\
                                <input type="text" class="input_englishname cq" _cqnotice="姓（拼音或英文）" value="{{#if ../../ENLastName}}{{../../ENLastName}}{{/if}}" role="nameEnLast" />\
                                <input type="text" class="input_englishname input_engnomar cq" _cqnotice="名（拼音或英文）" value="{{#if ../../ENFirstName}}{{../../ENFirstName}}{{#if ../../ENMiddleName}} {{../../../ENMiddleName}}{{/if}}{{/if}}" role="nameEnFirst"  />\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}">填写说明</a>\
                                <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Nationality}}\
                            {{#with Nationality}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input mod_value="{{../../national}}" type="text" value="{{../../national}}" regex="checkNationality" role="national" class="input_m cq nationality" _cqnotice="中文/拼音" required/>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if IDType}}\
                            {{#with IDType}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <select name="" value="{{../../IDCardType}}" role="idCardType" regex="checkIdCardType">\
                                {{#each ../idOptions}}\
                                    <option {{#equal ../../IDCardType CustomerInfoItemType "selected" ""}}{{/equal}} value="{{CustomerInfoItemType}}">{{Name}}</option>\
                                {{/each}}\
                                </select>\
                                <input type="text" value="{{../../IDCardNo}}" role="idCardNo" class="input_s later cq" regex="checkIdCard" _cqnotice="证件号码" note="{{../../restrictions}}" required/>\
                                <span class="hrs" role="passportType" style={{#equal ../../IDCardType 2 "" "display:none;"}}{{/equal}}>因私护照</span>\
                                <div class="help_block"><span class="ico"></span>特别提醒：为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月。</div>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if CardValidUntil}}\
                            {{#with CardValidUntil}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <input type="number" value="{{../../IDCardTimelimitY}}" class="all_field_width cq J_uyear"  role="cardValidUntilY" _cqnotice="yyyy" style="" >&nbsp;-&nbsp;<input type="number" value="{{../../IDCardTimelimitM}}" class="all_field_width cq J_umonth" role="cardValidUntilM" _cqnotice="mm" style="" >&nbsp;-&nbsp;<input type="number" value="{{../../IDCardTimelimitD}}" role="cardValidUntilD" class="all_field_width cq J_udate"  _cqnotice="dd" >\
                                <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Sex}}\
                            {{#with Sex}}\
                             <li class="optional" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <select name="" value="{{../gender}}" role="gender" regex="checkSex" required>\
                                    <option value="-1">请选择</option>\
                                    <option {{#equal ../../gender 0 "selected" ""}}{{/equal}} value="0">男</option>\
                                    <option {{#equal ../../gender 1 "selected" ""}}{{/equal}} value="1">女</option>\
                                </select>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Birthday}}\
                        {{#with Birthday}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                              <label for="" class="product_label">{{Name}}</label>\
                              <input type="number" value="{{../../birthdayY}}" class="all_field_width cq"  role="birthdayY" _cqnotice="yyyy" style="">&nbsp;-&nbsp;<input type="number" value="{{../../birthdayM}}" class="all_field_width cq" role="birthdayM"  _cqnotice="mm" style="">&nbsp;-&nbsp;<input type="number" value="{{../../birthdayD}}" role="birthdayD" class="all_field_width cq"  _cqnotice="dd">\
                              <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                        {{/with}}\
                        {{/if}}\
                        {{#if BirthPlace}}\
                        {{#with BirthPlace}}\
                        <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                            <label for="" class="product_label">{{Name}}</label>\
                            <input type="text" value="{{../../HomePlace}}" role="birthPlace" class="input_m"/>\
                            <span class="hrs hrs2">(可稍后提供)</span>\
                        </li>\
                        {{/with}}\
                        {{/if}}\
                        {{#if CustomerType}}\
                            {{#is cutomerOptions.length \'>\' 0}}\
                            {{#with CustomerType}}\
                             <li class="optional">\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                 <select name="" value="{{../../CustomerNoType}}" role="CustomerType" required>\
                                {{#each ../cutomerOptions}}\
                                    <option {{#equal ../../CustomerNoType CustomerInfoItemType "selected" ""}}{{/equal}} value="{{CustomerInfoItemType}}">{{Name}}</option>\
                                {{/each}}\
                                </select>\
                            </li>\
                            {{/with}}\
                            {{/is}}\
                        {{/if}}\
                        {{#if ContactPhone}}\
                        {{#with ContactPhone}}\
                        <li>\
                            <label for="" class="product_label">手机号码</label>\
                            <span class="frm_required">*</span>\
                            <input type="number" class="input_m" value="{{../../mobileNo}}" role="mobileNo" class="" regex="checkMobile" required/>\
                            <span style="margin-left:10px;color:#999;">请至少输入一位出行旅客的手机号码</span>\
                        </li>\
                        {{/with}}\
                        {{/if}}\
                        </ul><div class="save_wrap">\
                            <a href="###" class="save selected" role="saveId"><i></i>保存</a>\
                            <a href="###" class="clear" role="clear">清空</a>\
                        </div>\
                   </div>\
                   {{/each}}',
            linkmanBox: '<ul class="input_box linkman_info" role="contact">\
                        <li>\
                            <label class="product_label">姓名</label>\
                            <input type="text" value="{{name}}" role="ctname"  require="1" regex="checkName" class="input_m">\
                        </li>\
                        <li>\
                            <label for="" class="product_label">手机号码</label>\
                            <input type="number" value="{{mobileNo}}" role="ctmphone" regex="checkMobile" class="input_m">\
                        </li>\
                        <li>\
                            <label for="" class="product_label">联系电话</label>\
                            <input type="number" value="" class="in_num01 " id="notice2" notice="区号" role="ctzcode" _cqnotice="区号" style="" regex="checkPhone">\
                            <input type="number" value="" class="in_num02 " id="notice3" notice="电话号码" role="cttphone" _cqnotice="电话号码" style="" regex="checkPhone">\
                            <input type="number" value="" class="in_num03 " id="notice4" notice="分机号码" role="ctext" _cqnotice="分机号码" style="" regex="checkPhone">\
                        </li>\
             <li>\
                            <label for="" class="product_label">Email</label>\
                            <input type="text" value="{{email}}" role="ctemail" require="1" regex="checkEmail" class="input_m">\
              {{#if IsVisa}}<span class="hrs">为了能够收取签证材料相关信息，请填写正确邮箱</span>{{/if}}\
                        </li>\
                        <div class="contact_remarks linkman_tel"><span>}</span>此处手机号码和联系电话至少要填一项</div>\
                     </ul><div class="clear:both"></div>',
            linkmanDf: '<ul class="input_box contact_info linkman_info">\
                        <li class="default">\
                            <a href="###" class="revise">【修改】</a>\
                            <span class="tit">姓名</span>\
                            <span>{{name}}</span>\
                            {{#if mobileNo}}\
                            <span class="tit">手机号</span>\
                            <span>{{mobileNo}}</span>\
                            {{else}}\
                            <span class="tit">联系电话</span>\
                            <span>{{telNo}}</span>\
                            {{/if}}\
                            <span class="tit">Email</span>\
                            <span>{{email}}</span>\
                        </li>\
                     </ul>',
            delivery: '<div class="delivery">\
                        <b class="tab_01"></b>\
                        <div class="tit"><a href="http://pages.ctrip.com/homepage/xuzhi.htm" target="_blank">送票范围说明&gt;&gt;</a>配送城市<strong>{{location}}</strong></div>\
                        <ul class="address_list" role="addressList">\
                            {{each address_list}}\
                                <li><label for="m4"><input type="radio" value="radio" name="radio" id="m4">{{address}}</label></li>\
                            {{each}}\
                        </ul>\
                        <div class="btn">\
                            <a class="btn_submit" href="###">使用新地址</a>\
                            <a href="###">使用其他地址</a>\
                        </div>\
                    </div>',
            coupon: '<li class="point" style="display:none">温馨提示：优惠券与限额抵用券无法同时使用</li>\
                      {{#each list}}\
                            {{#if extendPromotion}}\
                            <li class="lj_sale item">\
                                <label for="m{{@index}}">\
                                <input type="radio" class="radio" role="couponCheck" extend="1" requireCode="1" strategyID="{{DeductionStrategyID}}" PromotionID="{{PromotionID}}"  name="RadioGroup1" id="m{{@index}}">\
                                <span role="displayName">{{DisplayName}}</span></label>\
                                <span style="display:none" role="code">\
                                <input type="text" value="" class="input_sale"  role="couponCode">\
                                <input type="button" value="确定" class="btn_submit" role="checkcode">\
                                </span>\
                                &nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\
                                <div class="lj_sale_notice" role="extendDescription" style="{{#unless Description}}display:none;{{/unless}}">{{{Description}}}</div>\
                                <a href="###" role="reinput" style="display:none;">重新输入优惠代码</a>\
                            </li>\
                            {{else}}\
                                {{#if IsNeedCaptcha}}\
                                <li class="lj_sale item">\
                                    <label for="m{{@index}}">\
                                    <input type="radio" class="radio" role="couponCheck" extend="0" requireCode="1" strategyID="{{DeductionStrategyID}}" PromotionID="{{PromotionID}}"  name="RadioGroup1" id="m{{@index}}">\
                                    <span role="displayName">{{DisplayName}}</span></label>\
                                    <span style="display:none" role="code">\
                                    <input type="text" value="" class="input_sale"  role="couponCode">\
                                    <input type="button" value="确定" class="btn_submit" role="checkcode">\
                                    </span>\
                                    &nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\
                                    {{#if Description}}<div class="lj_sale_notice" role="description" style="display:none;">{{{Description}}}</div>{{/if}}\
                                    <a href="###" role="reinput" style="display:none;">重新输入优惠代码</a>\
                                </li>\
                                {{else}}\
                                <li class="lj_sale item">\
                                    <label for="m{{@index}}">\
                                    <input type="radio" class="radio" role="couponCheck" extend="0" requireCode="0" strategyID="{{DeductionStrategyID}}" reduced="{{reducedAmount}}" PromotionID="{{PromotionID}}" name="RadioGroup1" id="m{{@index}}">\
                                    <span role="displayName">{{DisplayName}}</span>\
                                    </label>&nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\<br>\
                                    {{#if Description}}<div class="lj_sale_notice" role="description" style="display:none;">{{{Description}}}</div>{{/if}}\
                                </li>\
                                {{/if}}\
                            {{/if}}\
                        {{/each}}\
                        <li><label for="m100"><input checked="checked" type="radio" class="radio" role="cancel" name="RadioGroup1" id="m100"> 不使用优惠</label></li>',
            autoCoupon: '<div id="autoCoupon_{{index}}" class="{{#if big}}sub_big_coupon{{else}}sub_coupon{{/if}}" style="position: absolute; display: none">\
                            <ul>\
                            {{#if big}}\
                                {{#each list}}\
                                <li><a href="javascript:void(0);"><span class="coupon_num">{{CouponCode}}</span><span class="coupon_tit">{{PromotionDisplayName}}</span></a></li>\
                                {{/each}}\
                            {{else}}\
                                {{#each list}}\
                                    <li><a href="javascript:void(0);">{{CouponCode}}</a></li>\
                                {{/each}}\
                            {{/if}}\
                        </div>',
            singleCoupon: '<div class="discount">\
                    <h4>优惠券</h4>\
                    {{#each list}}\
                    <div class="discount_box item">\
                        <div role="cnew">\
                            <div class="basefix">\
                                <p class="title" style="display:none">优惠提示：优惠券与限额抵用券无法同时使用</p>\
                                {{DisplayName}}\
                                <span role="code">\
                                <input type="text" class="input_width" PromotionID="{{PromotionID}}" extend="1" role="couponCode"><a role="checkcode" href="###" class="btn_normal">确定</a>\
                                </span>\
                                <span class="tip" style="color:#ff7a17" role="tip"></span>\
                            </div>\
                        </div>\
                        <div role="had" style="display:none">\
                            <div class="basefix">\
                                <p class="title" style="display:none">优惠提示：优惠券与限额抵用券无法同时使用</p>\
                                <span class="singleName">\
                                {{#if extendPromotion}}\
                                {{DisplayNameR}}\
                                {{else}}\
                                {{DisplayName}}\
                                {{/if}}\
                                </span>\
                                <span class="price" role="tip">\
                                {{#if ReducedAmount}}\
                                -<dfn>&yen;</dfn>{{ReducedAmount}}\
                                {{else}}\
                                已选择\
                                {{/if}}\
                                </span>\
                            </div>\
                            <div class="explain">{{{Description}}}</div>\
                            <div><a href="###" role="singleReInput">重新输入优惠代码</a></div>\
                        </div>\
                    </div>\
                    {{/each}}\
                </div>',
            hotelCoupon: '<div class="product_input layoutfix">\
                            <h4>酒店优惠券</h4>\
                            <ul class="input_box sale">\
                            <li><span data-role="jmp" data-params="{options:{type:\'jmp_alert\',classNames:{boxType:\'jmp_alert\'},template:\'#jmp_alert\', content:{txt:\'选择此房型提交订单，结束游玩后发表行程点评，每间夜可获得{{coupon}}元点评奖金。<br/><a href=http://help.ctrip.com/QuestionDetail.aspx?questionId=693 target=_blank>什么是国内旅游度假自由行产品点评返现？</a>\'},css:{maxWidth:\'300\'},alignTo:\'cursor\',showArrow:false}}" class="rebates"><em>返</em>{{coupon}}元</span></li>\
                            {{#if used}}\
                            <li role="having" style="display:none;"><i class="htl_icon_yes"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\
                            {{#if isRemain}}\
                            <a href="###" class="btn_red_small" role="confirm">使用消费券</a>\
                            {{else}}\
                            <a href="###" class="btn_small_disabled">使用消费券</a>\
                            {{/if}}\
                            <li role="had">您已使用消费券<span class="price_red"><dfn>¥</dfn>{{used}}</span>。<span class="point">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href="###" style="margin-left:15px;" role="cancel">取消使用</a></li>\
                            <li role="had">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\
                            <li class="point" role="had">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\
                            {{else}}\
                            <li role="having" ><i class="htl_icon_yes"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\
                            {{#if isRemain}}\
                            <a href="###" class="btn_red_small" role="confirm">使用消费券</a>\
                            {{else}}\
                            <a href="###" class="btn_small_disabled">使用消费券</a>\
                            {{/if}}\
                            </li>\
                            <li role="had" style="display:none">您已使用消费券<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>。<span class="point">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href="###" style="margin-left:15px;" role="cancel">取消使用</a></li>\
                            <li role="had" style="display:none">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\
                            <li class="point" role="had" style="display:none">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\
                            {{/if}}\
                        </ul>\
                        </div>',
            nameTips: '<div class="person_passenger" role="nameTips">\
                        {{#if clientID}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameCN}}</span>中文姓名</div>\
                        <div class="base_txtgray hand had"><span class="name">{{nameEN}}</span>英文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>中文或拼音</span>中文姓名</div>\
                        <div class="base_txtgray hand"><span>last（姓）/first（名）</span>英文姓名</div>\
                        {{/if}}\
                    </div>',
            nameCNTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameCN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameCN}}</span>中文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>中文或拼音</span>中文姓名</div>\
                        {{/if}}\
                    </div>',
            nameENTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameEN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEN}}</span>英文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>last（姓）/first（名）</span>英文姓名</div>\
                        {{/if}}\
                    </div>',
            nameEnFirstTips: '<div class="person_passenger english_passenger" role="nameTips">\
                        {{#if nameEnFirst}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEnFirst}} {{nameEnMiddle}}</span>英文名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>first name</span>英文名</div>\
                        {{/if}}\
                    </div>',
            nameEnLastTips: '<div class="person_passenger english_passenger" role="nameTips">\
                        {{#if nameEnLast}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEnLast}}</span>英文姓</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>last name</span>英文姓</div>\
                        {{/if}}\
                    </div>',
            price: '<div id="price_box_wrap" class="price_box_wrap">\
                        <ul class="price_box">\
                            <li class="total_price2"><strong>总价</strong><span class="price2"><dfn>&yen;</dfn><span role="amountTotal">{{Amount}}</span></span></li>\
                            <li>\
                            {{#if IsGroupTravel}}\
                                <div class="basefix"><span class="price_item">基本团费</span></div>\
                            {{else}}\
                                <div class="basefix"><span class="price_item">基本费用</span></div>\
                            {{/if}}\
                            {{#if AduNumber}}\
                            <div class="basefix"><span class="price_item">成人</span><strong class="price_detail"><span>{{AduNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{AduAmount}}</strong></div>\
                            {{/if}}\
                            {{#if ChildNumber}}\
                            <div class="basefix"><span class="price_item">儿童{{#if IsNoBed}}(不占床){{/if}}</span><strong class="price_detail"><span>{{ChildNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{ChildAmount}}</strong></div>\
                            {{/if}}\
                            </li>\
                            {{#if Surcharge}}\
                                <li><span class="price_item">附加费</span><strong class="price_detail"><dfn>&yen;</dfn>{{Surcharge}}</strong></li>\
                            {{/if}}\
                            {{#if TicketsTotalFree}}\
                                <li><span class="price_item">出票费</span><strong class="price_detail"><dfn>&yen;</dfn>{{TicketsTotalFree}}</strong></li>\
                            {{/if}}\
                            <li role="fright" style="{{#unless Freight}}display:none{{/unless}}"><span class="price_item">配送费</span><strong class="price_detail"><dfn>&yen;</dfn><em role="amountPostage" style="font-style:normal">{{Freight}}</em></strong></li>\
                            <li role="discount" style="{{#unless DiscountAmount}}display:none{{/unless}}"><span class="price_item">优惠<i>减</i></span><strong class="price_detail highlight">-<dfn>&yen;</dfn> <em style="font-style:normal" role="amountCoupon">{{DiscountAmount}}</em></strong></li>\
                            {{#if isTempSave}}\
                            <li class="border_none" style="position:static;"><a href="###" role="save" class="price_btn_order" id="J_tmpriceorder" style="display:none"><span><i></i></span>暂存订单</a></li>\
                            {{/if}}\
                        </ul>\
                        <div class="phone_service" id="J_tab_hot_phone" style=" display:none;"> \
                          <p>行程有疑问？懒得填信息？<br>专业客服为您提供咨询服务。</p> \
                          <p class="phone_num"><i></i><span id ="js_telTrefer"></span></p> \
                       </div> \
                        <a class="online_service" id="J_online_service" href="{{ChatUrl}}" target="_blank" style="display:none">在线客服</a>\
                </div>',
            priceCur: '<div id="price_box_wrap" class="price_box_wrap">\
                        <ul class="price_box">\
                            <li class="total_price2"><strong>总价</strong><span class="price2"><dfn>&yen;</dfn><span role="amountTotal" id="cur_Total">{{Amount}}</span></span></li>\
                            <li>\
                            {{#if IsGroupTravel}}\
                                <div class="basefix" style="display:none"><span class="price_item">基本团费</span></div>\
                            {{else}}\
                                <div class="basefix" style="display:none"><span class="price_item">基本费用</span></div>\
                            {{/if}}\
                            {{#if AduNumber}}\
                            <div class="basefix"><span class="price_item">人数</span><strong class="price_detail"><span id="cur_Per">{{#plus AduNumber ChildNumber}}{{/plus}}</span></strong></div>\
							<div class="basefix"><span class="price_item">人均</span><strong class="price_detail" style="color:#FF6600"><dfn>&yen;<strong id="tar_Num" ></strong></dfn></strong></div>\
						    {{/if}}\
                            {{#if ChildNumber}}\
                            <div class="basefix" style="display:none"><span class="price_item">儿童{{#if IsNoBed}}(不占床){{/if}}</span><strong class="price_detail"><span>{{ChildNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{ChildAmount}}</strong></div>\
                            {{/if}}\
                            </li>\
                            {{#if Surcharge}}\
                                <li style="display:none"><span class="price_item">附加费</span><strong class="price_detail"><dfn>&yen;</dfn>{{Surcharge}}</strong></li>\
                            {{/if}}\
                            {{#if TicketsTotalFree}}\
                                <li style="display:none"><span class="price_item">出票费</span><strong class="price_detail"><dfn>&yen;</dfn>{{TicketsTotalFree}}</strong></li>\
                            {{/if}}\
                            <li role="fright" style="display:none;"><span class="price_item">配送费</span><strong class="price_detail"><dfn>&yen;</dfn><em role="amountPostage" style="font-style:normal">{{Freight}}</em></strong></li>\
                            <li role="discount" style="display:none;"><span class="price_item">优惠<i>减</i></span><strong class="price_detail highlight">-<dfn>&yen;</dfn> <em style="font-style:normal" role="amountCoupon">{{DiscountAmount}}</em></strong></li>\
                            {{#if isTempSave}}\
                            <li class="border_none" style="position:static;"><a href="###" role="save" class="price_btn_order" id="J_tmpriceorder" style="display:none"><span><i></i></span>暂存订单</a></li>\
                            {{/if}}\
                        </ul>\
                        <div class="phone_service" id="J_tab_hot_phone" style=" display:none;"> \
                          <p>行程有疑问？懒得填信息？<br>专业客服为您提供咨询服务。</p> \
                          <p class="phone_num"><i></i><span id ="js_telTrefer"></span></p> \
                       </div> \
                        <a class="online_service" id="J_online_service" href="{{ChatUrl}}" target="_blank" style="display:none">在线客服</a>\
                </div>',
            invoiceBox: '<ul class="bill_box" role="invoice">\
                            <li class="point">礼品卡等消费券支付的金额不提供报销凭证</li>\
                            <li>\
                                <label for="" class="product_label">是否需要发票</label>\
                                <label for="invoice01" class="radio"><input role="selectInvo" type="radio" value="1" name="invoice" id="invoice01">是</label>\
                                <label for="invoice02" class="radio"><input role="cancelInvo" type="radio" value="0" name="invoice" checked="checked" id="invoice02">否</label>\
                                <span id="J_invoiceTip" class="point" style="display:none"></span>\
                                <li role="invoiceli" style="display:none">\
                                    <label for="" class="product_label">发票抬头</label>\
                                    <input type="text" value="{{initTitle}}" class="num01" role="getInvoice">\
                                    <span class="point">遵循税务局相关规定，发票抬头必须为个人姓名或公司名称</span>\
                                </li>\
                                <li role="invoiceli" style="display:none">\
                                    <label for="" class="product_label">发票明细</label>\
                                    <select name="" role="invoiceDetail">\
                                        {{#each Content}}\
                                           {{#if initTitle}}\
                                           <option {{#equal initContent Value "selected" ""}}{{/equal}} value="{{Key}}">{{Value}}</option>\
                                           {{else}}\
                                           <option value="{{Key}}">{{Value}}</option>\
                                           {{/if}}\
                                        {{/each}}\
                                    </select>\
                                </li>\
                            </li>\
                      </ul>',
            invoiceDf: '<ul class="input_box" style="zoom:1">\
                            <li class="point">礼品卡等消费券支付的金额不提供报销凭证</li>\
                            <li class="default">\
                                <a href="###" class="revise">【修改】</a>\
                                {{#if initTitle}}\
                                {{initTitle}} {{initContent}}\
                                {{else}}\
                                <span>不需要发票</span>\
                                {{/if}}\
                            </li>\
                        </ul>',
            deliveryDf: '<ul class="input_box">\
                            <li class="default">\
                                <a href="###" class="revise">【修改】</a>\
                                <span class="tit">{{psType}}</span>\
                                <span class="tit">送票地址</span>\
                                {{#with AddressInfo}}\
                                <span>{{#if noCity}}{{CityName}} {{../Canton}} {{/if}}{{Address}} {{#if Post}}{{Post}}{{/if}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</span>\
                                {{/with}}\
                            </li>\
                        </ul>',
            deliveryBox: '<div class="input_box" id="deliverBox">\
                            <div class="basefix">\
                                <ul id="tabs" class="tab_box layoutfix">\
                                    {{#if py}}\
                                    {{#with py}}\
                                    <li role="tab" type="4" tab="{{../../pyindex}}"><a type="4" href="###">免费平邮</a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if ps}}\
                                    {{#with ps}}\
                                    <li role="tab" type="1" tab="{{../../psindex}}"><a type="1" href="###">市内配送<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if zq}}\
                                    <li  role="tab"  type="2" tab="{{zqindex}}"><a type="2" href="###">市内自取</a></li>\
                                    {{/if}}\
                                    {{#if ems}}\
                                    {{#with ems}}\
                                    <li role="tab"  type="3"  tab="{{../../emsindex}}"><a type="3" href="###">EMS邮递<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if sf}}\
                                    {{#with sf}}\
                                    <li role="tab"  type="5"  tab="{{../../sfindex}}"><a type="5" href="###">顺丰快递<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                </ul>\
                                {{#if deliveryGoods}}\
                                <span data-role="jmp" data-params="{options:{type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_pkg_delivery\',content:{txt:\'{{deliveryGoods}}\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\',showArrow:false}}" class="distribution_list">配送清单</span>\
                                {{/if}}\
                                {{#if sf}}\
                                {{#with sf}}\
                                <span style="float:right;color:#999">携程旅游选择顺丰速运为您提供上门取件服务，保障您的签证材料安全及时到达。</span>\
                                {{/with}}\
                                {{/if}}\
                            </div>\
                            <div id="content" class="delivery_content">\
                                {{#if py}}\
                                <div class="delivery"  type="4"  style="display:none">\
                                    <b></b>\
                                    {{#if emsAddress}}\
                                    <div class="tit">\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    <div class="usual_address_mod">\
                                      <ul class="usual_address_list">\
                                        {{#each emsAddress}}\
                                        <li class="usual_address_item {{#unless @index}}usual_address_item_selected{{/unless}}">\
                                          <p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>\
                                          <p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>\
                                          <p class="address">{{Address}}</p>\
                                          <p class="code">{{Post}}</p>\
                                          <i class="ico_checked"></i>\
                                          <a href="###" class="edit"><i></i>编辑</a>\
                                          <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio4" id="py{{@index}}" class="J_hideradio">\
                                        </li>\
                                        {{/each}}\
                                      </ul>\
                                      <div class="handle_area"><a href="###"><i class="ico_more"></i>更多地址</a><a href="###"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    {{/if}}\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities_p" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if ps}}\
                                <div class="delivery" style="display:none" type="1">\
                                    <b></b>\
                                    <div class="tit">\
                                        <a href="http://pages.ctrip.com/homepage/xuzhi.htm" target="_blank">送票范围说明</a>\
                                        {{#if ps.DeliveryAmount}}<div class="postage"><span>配送费</span><dfn>¥</dfn>{{ps.DeliveryAmount}}<span>起，具体金额以预订员确认为准。</span></div>{{/if}}\
                                        配送城市<strong>{{CityName}}</strong>\
                                    </div>\
                                    <div class="usual_address_mod">\
                                      {{#if inCityAddress}}\
                                      <ul class="usual_address_list">\
                                      {{#each inCityAddress}}\
                                        <li class="usual_address_item usual_address_item_selected">\
                                        <p class="name">{{CityName}}</p>\
                                        <p class="tel">1811234678</p>\
                                        <p class="address">{{../../CityName}} {{CityName}} {{CantonName}} {{Address}}</p>\
                                        <p class="code">{{Post}}</p>\
                                        <i class="ico_checked"></i>\
                                        <a href="###" class="edit"><i></i>编辑</a>\
                                        <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio1" id="ps{{@index}}">\
                                        </li>\
                                      {{/each}}\
                                      </ul>\
                                      {{/if}}\
                                      <div class="handle_area"><a href="###"><i class="ico_more"></i>更多地址</a><a href="###"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    <div class="hide_options" style={{#if inCityAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>配送地址</th>\
                                                <td><select name="" id="" role="getCanton">\
                                                {{#each CityCanton}}\
                                                <option value="{{Key}}">{{Value}}</option>\
                                                {{/each}}\
                                                </select><span class="area">区</span><input type="text" class="input_m" id="notice15" role="getAddrDetail"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if zq}}\
                                <div class="delivery"  type="2"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        自取城市<strong>{{CityName}}</strong>\
                                    </div>\
                                    <ul class="select_address_list">\
                                      {{#if selfPickupAddr}}\
                                      {{#each selfPickupAddr}}\
                                      <li {{#unless @index}}class="cur"{{/unless}}>{{this}}<i class="ico_checked"></i><input {{equal @index 0 "checked=checked" ""}} type="radio" value="{{this}}" name="radio2" id="self{{@index}}"></li>\
                                      {{/each}}\
                                      {{/if}}\
                                    </ul>\
                                </div>\
                                {{/if}}\
                                {{#if ems}}\
                                <div class="delivery"  type="3"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        <a href="###" onclick="window.open(\'http://www.ctrip.com/Supermarket/package/EMSNote.asp\',\'\',\'status=no,menubar=no,top=20,left=20,width=600,height=400,resizable=yes,scrollbars=no\')">EMS服务说明</a>\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    <div class="usual_address_mod">\
                                      {{#if emsAddress}}\
                                      <ul class="usual_address_list">\
                                        {{#each emsAddress}}\
                                        <li class="usual_address_item usual_address_item_selected">\
                                          <p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>\
                                          <p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>\
                                          <p class="address">{{Address}}</p>\
                                          <p class="code">{{Post}}</p>\
                                          <i class="ico_checked"></i>\
                                          <a href="###" class="edit"><i></i>编辑</a>\
                                          <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio3" id="ems{{@index}}">\
                                        </li>\
                                        {{/each}}\
                                      </ul>\
                                      {{/if}}\
                                      <div class="handle_area"><a href="###"><i class="ico_more"></i>更多地址</a><a href="###"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if sf}}\
                                <div class="delivery"  type="5"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    {{#if emsAddress}}\
                                        <ul class="address_list" role="addressList" type="5">\
                                        {{#each emsAddress}}\
                                         <li {{#unless @index}}class="cur"{{/unless}}><label for="py{{@index}}"><input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio5" id="py{{@index}}"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>\
                                        {{/each}}\
                                        </ul>\
                                    <div class="btn">\
                                        <a class="btn_submit" href="###" role="new">使用新地址</a>\
                                        {{#unless hideEmsAddress}}\
                                        <a href="###" role="other">使用其他地址</a>\
                                        {{/unless}}\
                                    </div>\
                                    {{/if}}\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities_p" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                            </div>\
                        </div>',
            allAdress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup">\
                            <h3>选择您的常用地址</h3>\
                            <ul>\
                            {{#each obj}}\
                                <li><label for="alladr{{@index}}"><input index="{{InfoId}}" type="radio" value="radio" name="{{../radioName}}" id="alladr{{@index}}"> {{CityName}}  {{CantonName}} {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>\
                            {{/each}}\
                            </ul>\
                            <div class="btn">\
                                <a href="###" role="confirm" class="btn_blue_small">确认</a>\
                                <a href="###" role="close">取消</a>\
                            </div>\
                            <a href="###" role="close" class="btn_shut_popup">×</a>\
                        </div>',
            inCityAddress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup">\
                            <h3>选择您的常用地址</h3>\
                            <ul>\
                            {{#each obj}}\
                                <li><label for="alladr{{@index}}"><input index="{{InfoId}}" cantonID={{CantonID}} type="radio" value="radio" name="{{../radioName}}" id="alladr{{@index}}"> {{CityName}} {{CantonName}} {{Address}} {{Post}} </label></li>\
                            {{/each}}\
                            </ul>\
                            <div class="btn">\
                                <a href="###" role="confirm" class="btn_blue_small">确认</a>\
                                <a href="###" role="close">取消</a>\
                            </div>\
                            <a href="###" role="close" class="btn_shut_popup">×</a>\
                        </div>',
            tempSave: '<div class="book_masking" id="tempSaveMask">\
                        <h2><a href="###" alt="" role="close"></a>暂存订单</h2>\
                        <div class="book_masking_padding">\
                            <div class="book_masking_content">\
                                <i class="icon_yes"></i>\
                                <h3>您的订单已成功暂存。暂存订单号为：{{OrderId}}</h3>\
                                <div>如需完成预订，请于72小时内至“{{{Url}}}”，对此订单号进行“继续预订”操作。<br>暂存后超过72小时的订单将自动删除。<br>注意：由于暂存订单不会保留航班、酒店等资源，价格也可能发生变化，请尽快提交，完成预订</div>\
                                <div class="masking_order_btn"><a href="###" class="btn_blue_middle" role="confirm">确定</a></div>\
                            </div>\
                        </div>\
                    </div>',
            ivoiceSug: '<div class="person_bill">\
                        <p>常用发票抬头</p>\
                        {{#each list}}\
                        <div><a href="###">{{Value}}</a></div>\
                        {{/each}}\
                    </div>'
        },
        common: { //公用的函数
            parseJSON: function (str) {
                return (new Function("", "return " + str))()
                // return eval('(' + str + ')');
            },
            getRoles: function (el, val, fld) { //获取dom
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
            },
            parseCNId: function (str) { //根据身份证返回出生日期
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
            },
            isDate: function (str) {
                if (!str) return false;
                var ret = str.match(/^(\d{4})-([01]?\d)-([0123]?\d)$/);
                if (ret) {
                    var d = new Date(parseInt(ret[1], 10), parseInt(ret[2], 10) - 1, parseInt(ret[3], 10));
                    if ([d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') == str.replace(/-0/g, '-'))
                        return true;
                }
                return false;
            }
        },

        /**
        * 根据参数返回input的jquery对象
        * @param  {String} str     input上的参数值
        * @return {cQuery Obj}     [description]
        */
        _getInput: function (str) {
            var obj;
            $.each($('#linkManID input'), function (index, item) {
                if ($(item).attr('role') === str) {
                    obj = cQuery(item);
                }
            });
            return obj;
        },

        /**
        * 简单模式表单验证
        * @return {Boolean} 表单验证是否通过
        */
        _simpleFormCheck: function () {

            var self = this,
                nickName = self._getInput('ctname').value(),
                nickMobile = self._getInput('ctmphone').value(),
                nickTel = self._getInput('cttphone').value(),
                nickEmail = self._getInput('ctemail').value(),
                nickNameCheck = this.Contacter().checkName(nickName),
                nickMobileCheck = this.Contacter().checkMobile(nickMobile);
            nickEmailCheck = this.Contacter().checkEmail(nickEmail);

            // 检查名字
            if (!nickNameCheck[0]) {
                new self.validate({
                    target: self._getInput('ctname'),
                    data: nickNameCheck[1],
                    errorClass: 'f_error'
                }).show();
                // $(window).scrollTop(300);
                location.hash = "productID";
                return false;
            };

            //检查手机
            if (!nickMobileCheck[0]) {
                new self.validate({
                    target: self._getInput('ctmphone'),
                    data: nickMobileCheck[1],
                    errorClass: 'f_error'
                }).show();
                location.hash = "productID";
                return false;
            }

            //检查email
            if (!nickEmailCheck[0]) {
                new self.validate({
                    target: self._getInput('ctemail'),
                    data: nickEmailCheck[1],
                    errorClass: 'f_error'
                }).show();
                location.hash = "productID";
                return false;
            }

            return true;
        },

        events: { //绑定事件
            regNotice: function () {
                var cq = cQuery;
                cq.mod.load('notice', '1.0', function () {
                    ["#notice1", "#notice2", "#notice3", "#notice4"].each(function (o) {
                        if (!cq(o).length) {
                            return true;
                        }
                        cq(o).regMod('notice', '1.0', {
                            name: o,
                            tips: cq(o).attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                    cq('.cq').each(function (o) {
                        cq(o).regMod('notice', '1.0', {
                            name: o,
                            tips: o.attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                });
            },
            regJmp: function () {
                cQuery.mod.load('jmp', '1.0', function () {
                    var ins = cQuery(document).regMod('jmp', '1.0', {
                        cc: 2
                    });
                })
            },
            submit: function () { //提交
                var self = this;
                var vdata = self.data;
                var mod = vdata.modules;
                var text = vdata.roles.submitID.html();
                /*添加可预订检查代码*/
                var bookingTelement = '<div class="book_masking" id="js_book_masking" style="display:none">\
                                                  <h2><a href="###" alt="" id="js_book_masking_close"></a>资源信息提示</h2>\
                                                    <div class="book_masking_padding">\
                                                        <div class="book_masking_content">\
                                                            <i class="icon_no"></i>\
                                                            <h3>{{#if data}}{{data}}{{/if}}</h3>\
                                                            <div class="masking_order_btn">\
                                                            {{#if steamer}}\
                                                              <a href="javascript:void(0)" class="btn_blue_middle" id="js_book_masking_again" style="width:100px">继续预订</a>\
                                                            {{/if}}\
                                                            {{#if type}}\
                                                            <a href="javascript:void(0)" class="btn_blue_middle" id="js_book_masking_sure" style="{{#is type "===" "revert"}}width:100px;{{/is}}">\
                                                              {{#is type "===" "revert"}}重新选择资源{{/is}}\
                                                              {{#is type "===" "retry"}}重试{{/is}}\
                                                              {{#is type "===" "sure"}}确定{{/is}}\
                                                             </a>\
                                                            {{/if}}\
                                                             {{#if other}}\
                                                              <a href="javascript:void(0)" class="btn_cancel" id="js_book_masking_sure" style="font-size:14px;margin-left:24px;">看看其他房型</a>\
                                                            {{/if}}\
                                                          </div>\
                                                        </div>\
                                                    </div>\
                                                </div>',
                    bookingJsonData = {},
                    bookingDataString = "",
                    bookingHandleData = [],
                    customerInfo = [],
                   closeBooKMasking = function (pData, pMe) {
                       $("body").append(Handlebars.compile(bookingTelement)(pData));
                       cQuery("#js_book_masking").mask();
                       $("#js_book_masking").css("top", ($(window).height() - $("#js_book_masking").height()) / 2 + $(window).scrollTop() + "px");
                       /*关闭提示层*/
                       $("#js_book_masking_close").bind("click", function () {
                           clearData();
                           cQuery("#js_book_masking").unmask();
                           $("#js_book_masking").remove();
                           $(pMe).bind('click', submitFn).html(text);
                       })
                   },
                    closeBookSure = function (pType, pMe, pData, pAgain) {
                        $("#js_book_masking_sure").bind("click", function () {
                            clearData();
                            cQuery("#js_book_masking").unmask();
                            $("#js_book_masking").remove();
                            if (pType) {
                                /*重试*/
                                if (pAgain) {
                                    $(pMe).bind('click', submitFn).html(text);
                                    $(pMe).trigger("click", submitFn);
                                }
                                else {
                                    $(pMe).bind('click', submitFn).html(text);
                                }
                            }
                            else {
                                vdata.roles.submitID.unbind('click');
                                window.location.href = $("#js_prev_stop").attr("href");
                            }
                        })
                    },
                /*邮轮重试*/
                    closeBookAgain = function (pData, pMe) {
                        $("#js_book_masking_again").bind("click", function () {
                            clearData();
                            cQuery("#js_book_masking").unmask();
                            cQuery("#js_book_masking").remove();
                            bookAjax(pData, pMe);
                        });
                    },
                     bookingError = function (pType, pMe, pData, pAgain) {
                         bookingJsonData.data = "系统调整中，请重试。";
                         bookingJsonData.type = "retry";
                         closeBooKMasking(bookingJsonData, pMe);
                         closeBookSure(!0, pMe, pData, pAgain);
                     },
                /*邮轮 游客性别*/
                    showGender = function (pGender) {
                        if (pGender == 0) return "M";  /*男*/
                        if (pGender == 1) return "F";  /*女*/
                        if (pGender == -1) return "N"; /*不确定*/
                    },
                /*关闭层时清除数据*/
                    clearData = function () {
                        for (var i in bookingJsonData) {
                            bookingJsonData[i] = "";
                        }
                    },
                    bookAjax = function (pData, pMe) {
                        /*新增checkbox 如果勾选了 支付接口传人UseCorpPay=T,如果不勾选 支付接口传人 UseCorpPay=F 如果没有这个input则不传*/
                        if ($("#UseCorpPay").length) {
                            if ($("#UseCorpPay").is(":checked")) {
                                pData += "&UseCorpPay=T";
                            }
                            else {
                                pData += "&UseCorpPay=F";
                            }
                        }
                        $.ajax({
                            url: vdata.handles.bookingInfo,
                            type: 'POST',
                            /*新增加一个参数 isSkipFAVCheck = true 这个时候就不再做一次机票反查*/
                            data: pData,
                            timeout: 120000,
                            success: function (data) {
                                self.status.isPay = true;
                                data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                                if (data.errno === 0) {
                                    if (vdata.handles.Pay.length > 0) {
                                        location.href = vdata.handles.Pay;
                                    } else {
                                        $(data.data).appendTo('body').submit();
                                    }
                                } else {
                                    bookingJsonData.data = data.errmsg;
                                    bookingJsonData.type = "sure";
                                    closeBooKMasking(bookingJsonData, pMe);
                                    closeBookSure(!0, pMe, pData);
                                }
                            },
                            error: function () {
                                bookingError(!0, pMe, pData, !0);
                            }
                        });
                    };
                /*添加可预订检查代码 end*/
                var submitFn = function (event) {
                    var me = this;
                    event.preventDefault();

                    $('#linkManID a.revise').click();
                    if (!self._simpleFormCheck()) {
                        return false
                    }


                    // TODO 验证稍后提供


                    if (!vdata.isLogin) {
                        loadCheckLogin && loadCheckLogin();
                        return;
                    }
                    self.status.errorElem = null;
                    self.removeValidate();
                    $.each('Travellers|Contacter|Invoice|Delivery'.split('|'), function (k, v) {
                        mod[v].verify();
                        // if(!mod[v].verify()) return false;//去掉
                    });
                    mod.Extras.save.call(mod.Extras);
                    if ($('#agreeContract').length && !$('#agreeContract').prop('checked')) {
                        if (!self.status.errorElem) {
                            self.status.errorElem = $('#agreeContract')[0];
                            alert('请仔细阅读预订须知和重要条款，并在“我接受”一栏打勾，才能接受你的预订请求！');
                        }
                    }
                    self.formData.IsTmpOrder = 0;
                    self.formData.ProposalOrderType = IsTmporaryOrder ? 2 : 1;
                    if (self.status.errorElem) {
                        $(document).scrollTop($(self.status.errorElem).offset().top - 20);
                        return false;
                    } else {
                        $(me).html('请稍候…');
                        vdata.roles.submitID.unbind('click');
                        var passengerInfos = self.formData.PassengerInfos,
                            passengerInfosLen = passengerInfos.length,
                            bookParameter = "bookinginfo=" + cQuery.stringifyJSON(self.formData);
                        /*新增邮轮参数*/
                        for (var k = 0; k < passengerInfosLen; k++) {
                            customerInfo[k] = {
                                Nationality: passengerInfos[k].Nationality,
                                Birthday: passengerInfos[k].Birthday,
                                Gender: showGender(passengerInfos[k].Gender),
                                HomePlace: passengerInfos[k].HomePlace,
                                // NameCN: passengerInfos[k].CnName,
                                // 对中文进行escape编码防止乱码
                                NameCN: escape(passengerInfos[k].CnName),
                                FirstNameEN: passengerInfos[k].EnName.First,
                                MiddleNameEN: passengerInfos[k].EnName.Mid,
                                LastNameEN: passengerInfos[k].EnName.Last
                            }
                        }
                        $.ajax({
                            url: vdata.handles.bookingCheck,
                            data: "TmpOrderID=" + GV.app.order.vars.initData.orderid + "&productID=" + GV.app.order.vars.initData.productID + "&customerInfo=" + cQuery.stringifyJSON(customerInfo) + "&OrderType=" + GV.app.order.vars.initData.OrderType,
                            timeout: 120000,
                            type: "POST",
                            success: function (json) {
                                var jsonData = $.parseJSON(json);
                                /*根据接口的返回碰到是否传人isSkipFAVCheck*/
                                if (jsonData.isSkipFAVCheck) bookParameter += "&isSkipFAVCheck=" + jsonData.isSkipFAVCheck;
                                if (jsonData.CruiseItem && jsonData.CruiseItem.BookingID != null) bookParameter += "&BookingID=" + jsonData.CruiseItem.BookingID;
                                if (jsonData.data && jsonData.data.length > 0) {
                                    self.status.isPay = true;
                                    self.events.save.call(self, !0, self.formData.TempOrderType != 0)();
                                    if (!jsonData.CruiseItem) {
                                        /*非邮轮*/
                                        for (var i = 0, len = jsonData.data.length; i < len; i++) {
                                            if (jsonData.data[i] instanceof Array) {
                                                for (var n = 0, handleNum = jsonData.data[i].length; n < handleNum; n++) {
                                                    bookingHandleData.push(jsonData.data[i][n]);
                                                }
                                            } else {
                                                bookingHandleData.push(jsonData.data[i]);
                                            }
                                        }
                                        for (var j = 0, lens = bookingHandleData.length; j < lens; j++) {
                                            /*航班信息*/
                                            if (bookingHandleData[j].Type == 302) {
                                                var flightName = bookingHandleData[j].ResourceName.split("|");
                                                for (var k = 0, flightLen = flightName.length - 1; k < flightLen; k++) {
                                                    bookingDataString += "【航班" + flightName[k] + "】、";
                                                }
                                            }
                                                /*酒店信息*/
                                            else if (bookingHandleData[j].Type == 202) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName.replace("|", "  ") + "】、";
                                            }
                                                /*可选项信息*/
                                            else if (bookingHandleData[j].Type == 402) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName + "】、";
                                            }
                                                /*新增类型*/
                                            else if (bookingHandleData[j].Type == 101 || bookingHandleData[j].Type == 201 || bookingHandleData[j].Type == 301 || bookingHandleData[j].Type == 401 || bookingHandleData[j].Type == 102) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName + "】、";
                                            }
                                        }
                                        bookingJsonData.data = "您所选的" + bookingDataString.slice(0, bookingDataString.length - 1) + "已订完，请重新选择！";
                                        bookingJsonData.type = "revert";
                                        closeBooKMasking(bookingJsonData, me);
                                        closeBookSure();
                                        bookingDataString = "";
                                        bookingHandleData = [];
                                    }
                                    else {
                                        /*邮轮*/
                                        for (var j = 0, lens = jsonData.data.length; j < lens; j++) {
                                            if (jsonData.data[j].Type == 501) {
                                                bookingDataString += jsonData.data[j].ResourceName.split("邮轮可订检查失败:")[1];
                                                bookingJsonData.type = "revert";      /*重新选择资源*/
                                            }
                                            else if (jsonData.data[j].Type == 502) {
                                                bookingDataString += jsonData.data[j].ResourceName.split("邮轮可订检查失败:")[1];
                                                if (jsonData.CruiseItem.BookingID > 0) {
                                                    bookingJsonData.other = "other";      /*查看其他房型*/
                                                    bookingJsonData.steamer = "steamer";  /*继续预订*/
                                                }
                                                else {
                                                    bookingJsonData.type = "revert";
                                                }

                                            }
                                        }
                                        bookingJsonData.data = bookingDataString;
                                        closeBooKMasking(bookingJsonData, me);
                                        closeBookAgain(bookParameter, me);
                                        closeBookSure();
                                        bookingDataString = "";
                                    }
                                }
                                else {
                                    /*如果是邮轮还要判断errno 如果不能0 则不能领取*/
                                    if (GV.app.order.vars.initData.OrderType.indexOf("CruiseOrder") != -1) {
                                        var tipsStr = "信息填写有误，请重新核对，如仍无法提交请拨打电话10106666，由专属客服为您解决。"
                                        if (jsonData.errno != 0) {
                                            if (jsonData.CruiseItem && jsonData.CruiseItem.FailPocessPoint) {
                                                var failPocessPointStr = jsonData.CruiseItem.FailPocessPoint.split("邮轮可订检查失败:")[1];
                                                if (failPocessPointStr) {
                                                    bookingJsonData.data = failPocessPointStr;
                                                }
                                                else {
                                                    bookingJsonData.data = tipsStr;
                                                }
                                            }
                                            else {
                                                bookingJsonData.data = tipsStr;
                                            }
                                            bookingJsonData.type = "revert";
                                            closeBooKMasking(bookingJsonData, me);
                                            closeBookSure();
                                        }
                                        else {
                                            bookAjax(bookParameter, me);
                                        }
                                    }
                                        /*不是邮轮的直接预订*/
                                    else {
                                        bookAjax(bookParameter, me);
                                    }
                                }
                            },
                            error: function () {
                                bookAjax(bookParameter, me);
                            }
                        })
                    }
                }
                vdata.roles.submitID.bind('click', submitFn);
            },
            save: function (isShow, isAuto) {
                var self = this;
                var me = this;
                var mod = this.data.modules;
                var text;
                var vdata = self.data;
                var submitFn = function (el, event) {
                    $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                        mod[v].save();
                    });
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = isAuto ? 1 : 0;
                    self.formData.ProposalOrderType = 1;
                    //if (!isAuto) {
                    //self.formData.IsTmpOrder = 1;
                    //self.formData.TempOrderType = 0;
                    //}
                    if (el) {
                        if (!$(el).data('txt')) {
                            $(el).data('txt', 1);
                            text = $(el).html();
                        }
                        $(el).html('请稍候…');
                        $(el).unbind('click');
                    }
                    $.ajax({
                        url: vdata.handles.bookingInfo,
                        type: 'POST',
                        // data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
                        data: {
                            bookinginfo: cQuery.stringifyJSON(self.formData)
                        },
                        timeout: 10000,
                        success: function (data) {
                            if (isShow) return;
                            data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                            if (data.errno === 0) {
                                self.render(self.tpl.tempSave, data.data, function (dom) {
                                    $('body').append(dom);
                                    cQuery('#tempSaveMask').mask();
                                    $('#tempSaveMask').on('click', 'a[role="close"],a[role="confirm"]', function (event) {
                                        event.preventDefault();
                                        cQuery('#tempSaveMask').unmask();
                                        $('#tempSaveMask').remove();
                                        $(el).bind('click', function (event) {
                                            submitFn(this, event);
                                        }).html(text);
                                    })
                                });
                                self.status.isTmpSave = true;
                            }
                            if (data.errno === 1) {
                                alert(data.errmsg);
                                $(el).bind('click', function (event) {
                                    submitFn(this, event);
                                }).html(text);
                            }
                        },
                        error: function () {
                            if (isShow) return;
                            alert('网络超时，请重新提交');
                            $(el).bind('click', function (event) {
                                submitFn(this, event);
                            }).html(text);
                        }
                    });
                };
                $('a[role="save"]').bind('click', function (event) {
                    event.preventDefault();
                    if (!vdata.isLogin) {
                        loadCheckLogin && loadCheckLogin();
                        return;
                    }
                    vdata.EnableTemporarySave && submitFn(this, event);
                });
                return submitFn;
            },
            autoSave: function () {
                var clientSource = GV.app.order.vars.initData.ClientSource;
                if (clientSource && clientSource == "Online") {
                    var self = this;
                    var mod = this.data.modules;
                    var vdata = self.data;
                    if (!vdata.isLogin || !vdata.EnableAutoTemporarySave || vdata.isQuickLogin) return;
                    window.onbeforeunload = function (event) {
                        $(document).click(function (e) {
                            return false;
                        });
                        if (!self.status.isTmpSave && self.data.roles.travellersID.children('[filled="t"]').length && !self.status.isPay) {
                            $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                                mod[v].save();
                            });
                            self.formData.IsTmpOrder = 1;
                            self.formData.TempOrderType = 1;
                            self.formData.ProposalOrderType = 1;
                            $.ajax({
                                url: vdata.handles.bookingInfo,
                                type: 'POST',
                                async: true,
                                // data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
                                data: {
                                    bookinginfo: cQuery.stringifyJSON(self.formData)
                                },
                                timeout: 15000,
                                success: function (data) { }
                            });
                            if (cQuery.browser.isFirefox) {
                                if (confirm('您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。确定要离开本页吗？')) {
                                    history.go();
                                } else {
                                    window.setTimeout(function () {
                                        window.stop();
                                    }, 1);
                                }
                            } else {
                                return '您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。';
                            }
                        }
                    };
                }
            }
        },
        regNational: function (el) {
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
					, suggestionIpad: '\t\t\t\t<div class="city_select_lhsl">\t\t\t\t\t<p class="title"><a class="close CQ_suggestionClose" href="javascript:;">&times;</a></p><ul class="CQ_suggestionTabContainer">\t\t\t\t\t\t{{enum(key) $data.data}}\t\t\t\t\t\t\t<li class="CQ_suggestionTab"><span>${key}</span></li>\t\t\t\t\t\t{{/enum}}\t\t\t\t\t</ul>\t\t\t\t\t{{enum(key,arr) $data.data}}\t\t\t\t\t\t<div class="city_item CQ_suggestionPanel">\t\t\t\t\t\t\t{{each(i,item) arr}}\t\t\t\t\t\t\t\t<a data="${item.data}" href="javascript:void(0);">${item.display}</a>\t\t\t\t\t\t\t{{/each}}\t\t\t\t\t\t</div>\t\t\t\t\t{{/enum}}\t\t\t\t</div>\t\t\t'

                }
            });
        },
        removeValidate: function () { //除去验证提示
            var self = this;
            var _ref = self.insStatistics;
            if (!_ref) return;
            $.map(_ref, function (v, k) {
                v.hide();
            });
            $('input[role="cardValidUntilY"],input[role="cardValidUntilM"],input[role="birthdayY"],input[role="birthdayM"]', '#travellersID').removeClass('f_error');
        },
        //添加模版助手，以便模版内部能够直接将人数相加
        handlerHelp: function () {
            Handlebars.registerHelper('plus', function () {
                var args = Array.prototype.slice.call(arguments);
                var options = args.pop();
                var num = 0;
                for (var key in args) {
                    var value = parseInt(args[key]);
                    if (!isNaN(value)) {
                        num += value;
                    }
                }
                return num;
            });
            /*Handlebars.registerHelper('division', function (a,b,options) {
				var args = Array.prototype.slice.call(arguments);
				var options = args.pop();
				var num = 0;
				return Math.floor(parseInt(a)/parseInt(b));
            });*/
        },
        initEvent: function () { //初始化事件绑定
            for (var i in this.events) {
                this.events[i].call(this);
            }
        },
        initHeadbarsHelper: function () {
            Handlebars.registerHelper("equal", function (a, b, v1, v2) {
                return a == b ? v1 : v2;
            });
            Handlebars.registerHelper('add', function (a, b) {
                return a + b;
            });
        },
        toggleLoading: function (id, el) { //load加载
            var id = 'queryLoading' + (id || '');
            var loading = $('#' + id);
            if (!loading.length) {
                loading = $('<div class="query" id="' + id + '"/>').css('border', '0');
                loading.html('<img style="vertical-align: middle;" src="http://pic.c-ctrip.com/common/loading_50.gif">正在加载，请稍候…').appendTo(el);
            } else {
                loading.remove();
            }
        },
        totalPrice: function () { //计算总金额
            var data = this.data;
            var total = data.Amount - data.couponPrice - data.couponNowPrice + data.postage;
            var roles = data.roles;
            roles.amountPostage.html(data.postage);
            roles.amountCoupon.html(data.couponPrice + data.couponNowPrice);
            roles.amountTotal.html(total);
            roles.totalID.html(total);
            $('#J_totalprice').html(total);
            data.postage ? roles.fright.show() : roles.fright.hide();
            data.couponPrice + data.couponNowPrice ? roles.discount.show() : roles.discount.hide();
            // this.formData.PromotionAmount = data.couponPrice ? data.couponPrice : 0;
            return total;
        },
        render: function (tpl, data, handle, cb) {
            var Template = Handlebars.compile(tpl);
            var html = Template(data);
            typeof handle === 'function' && handle.call(this, html);
            typeof cb === 'function' && cb.call(this, html);
            return html;
        },
        fetchData: function (opts, cb) { //ajax
            var self = this;
            return $.ajax({
                type: opts.method || 'GET',
                url: opts.url || self.config.fetchUrl,
                data: opts.data,
                //cache: false,
                dataType: 'html',
                // timeout : 5000,
                success: function (data) {
                    cb.call(self, data);
                },
                error: function (msg) {
                    // alert(msg)
                }
            });
        },
        reviewPos: function () { //刷新提示位置
            this.insStatistics && $.map(this.insStatistics, function (v) { //重新计算提示的位置
                v.setPos();
            });
        },
        validate: function () { //验证提示
            var statistics = []; //记录
            var _userTrack = function () { //用户记录
                if (statistics.length) {
                    for (var i = 0; i < statistics.length; i++) {
                        ubt_userblock_post(statistics[i].params.target, statistics[i].params.data || '');
                    }
                }
            };
            var ins = function (opts) {
                var _defaults = {
                    zIndex: 999,
                    errorClass: "f_error",
                    removeErrorClass: true,
                    isFocus: false,
                    srollHeight: 0,
                    srollWidth: 0,
                    target: null,
                    $obj: null,
                    isAutoHide: false,
                    hideSpeed: 2000,
                    /**显示后调用*/
                    show: function () { },
                    /**隐藏后调用*/
                    hide: function () { },
                    /**位置*/
                    position: "rm_lm",
                    templs: {
                        tipTempl: '<div id={{tipId}} class="{{tip}}"  style="min-width:{{minWidth}}px; width:{{maxWidth}}px;_width:{{minWidth}}px; width:auto !important;max-width:{{maxWidth}}px;overflow:hidden;display:block;z-index:99;margin:0;padding:0;left:0px;top:0px;overflow:hidden;position:absolute;padding-left:16px;"><div class="{{box}} {{boxType}} {{boxArrow}}" id={{boxId}}><b class="{{arrow}}" id={{arrowId}}></b><div class={{content}} id={{contentId}}></div></div>',
                        contentTpl: '<div class="jmp_bd">{{{txt}}}</div>'
                    },
                    css: {
                        //最大宽度
                        maxWidth: "370",
                        //最小宽度
                        minWidth: "50"
                    },
                    classNames: {
                        //浮动层最外层的类
                        tip: 'book_jmpinfo',
                        //浮动层的类
                        box: 'base_jmp',
                        //浮动层类型的类
                        boxType: 'jmp_alert',
                        boxArrow: 'base_jmp_t',
                        //浮动层箭头的类
                        arrow: 'tri_l',
                        //浮动层加载时的类
                        loading: 'jmp_loading',
                        //浮动层内容的类
                        tipContent: 'jmp_content'
                    },
                    ids: {
                        boxId: "boxId",
                        arrowId: "arrowId",
                        loadingId: "loadingId",
                        contentId: "contentId"
                    },
                    /**提示内容*/
                    data: "提示信息!",
                    /**样式*/
                    styles: ".book_jmpinfo {margin: 20px;color: #666;font: 12px/2 Arial,Tahoma,simsun;-webkit-text-size-adjust: none;}.book_jmpinfo ul,li{list-style: none;}.book_jmpinfo a{color: #00c;cursor: pointer;text-decoration: none;}.book_jmpinfo a: hover{color: #f00;text-decoration: underline;}.book_jmpinfo .font16{font-size: 16px;}.book_jmpinfo .jmp_hd{height:30px; padding-left:10px; background:url(http://pic.c-ctrip.com/common/un_base_btn.png) repeat-x 0 -390px; font-size:12px; line-height:30px; color:#333;} .book_jmpinfo .jmp_hd h3{font-size: 12px;} .book_jmpinfo .jmp_bd{padding: 2px 3px!important;}  .book_jmpinfo .jmp_alert{border: 1px solid #ffb533; background: #fff5d1;} .book_jmpinfo .base_jmp b{position: absolute; width: 16px; height: 16px; background-image: url(http://pic.c-ctrip.com/common/un_jmp_tri.png); left:10px;top:24px;background-repeat: no-repeat; overflow: hidden;} .book_jmpinfo .base_jmp_t{margin-top: 8px;} .book_jmpinfo .base_jmp_r{margin-right: 8px;} .book_jmpinfo .base_jmp_b{margin-bottom: 7px;} .book_jmpinfo .base_jmp_l{margin-left: 8px;} .book_jmpinfo .base_jmp_t b{margin-top: -7px;} .book_jmpinfo .base_jmp_r b{margin-top: 10px; right: 0;} .book_jmpinfo .base_jmp_b b{bottom: -8px;} .book_jmpinfo .base_jmp_l b{margin-top: 10px; left: 9px;}  .book_jmpinfo .jmp_title .tri_b{background-position: -32px -32px;} .book_jmpinfo .jmp_alert .tri_t{background-position: -16px 0;} .book_jmpinfo .jmp_alert .tri_r{background-position: -16px -16px;} .book_jmpinfo .jmp_alert .tri_b{background-position: -16px -32px;} .book_jmpinfo .jmp_alert .tri_l{background-position: -16px -48px;} .book_jmpinfo .jmp_table .tri_t{background-position: -32px 0;}.f_error {background-color: #FFF7D9 !important; border-color: #D80000 #E50000 #E50000 #D80000 !important; border-style: solid; border-width: 1px;}"
                };
                this.params = $.extend(_defaults, opts);
                this.oid = null;
                this.timeid = null;
                this.init();
            };
            ins.prototype = {
                init: function () {
                    this.creatStyle(this.params.styles);
                    this.creatContainer();
                    this.creatContent();
                    if (orderprocess) {
                        statistics.push(this);
                        orderprocess.insStatistics = statistics;
                        _userTrack();
                    }
                },
                creatStyle: function (styles) { //加入样式
                    var doc = document;
                    if (!doc.styles) {
                        if (cQuery.browser.isIE) {
                            var styleSheet = doc.createStyleSheet();
                            styleSheet.cssText = styles;
                        } else {
                            var sty = doc.createElement('style');
                            sty.type = "text/css";
                            sty.textContent = styles;
                            doc.getElementsByTagName('head')[0].appendChild(sty)
                        }
                        doc.styles = true;
                    } else {
                        return;
                    }
                },
                uid: function () {
                    var target = this.params.target;
                    var base = 'abcdefghijklmnopqrstuvwxyz';
                    var _i = 0,
                        rd = function () {
                            return Math.random() * 26;
                        },
                        md = new Date,
                        wd = [],
                        ret;
                    for (_i = 0; _i < 5; _i++) {
                        wd.push(base.charAt(rd()));
                    }
                    ret = 'uid' + wd.join('') + md.getTime();
                    $(target).data('uid', ret);
                    return ret;
                },
                show: function (opts) {
                    var me = this;
                    var opts = $.extend(this.params, opts);
                    var pos;
                    opts.$obj = opts.$obj ? opts.$obj : opts.target;
                    if (opts.errorClass) {
                        $(opts.$obj).addClass(opts.errorClass);
                    }
                    if (opts.data) {
                        this.contentId.children().html(opts.data);
                    }
                    pos = this.getPos();
                    this.tipId.css({
                        top: pos.top,
                        left: pos.left
                    }).show();
                    this.arrowId.css({
                        top: pos.arrow.top
                    });
                    if (opts.isAutoHide) {
                        if (this.timeid) clearTimeout(this.timeid);
                        this.timeid = setTimeout($.proxy(this.hide, this), opts.hideSpeed);
                    }
                    $(opts.$obj).bind('focus', function () {
                        me.hide({
                            $obj: this
                        });
                    });
                    return this;
                },
                setPos: function (opts) {
                    var pos = this.getPos();
                    if (parseInt(this.tipId.css('top')) > 0) {
                        this.tipId.css({
                            top: pos.top,
                            left: pos.left
                        });
                        this.arrowId.css({
                            top: pos.arrow.top
                        });
                    }
                },
                hide: function (opts) {
                    var opts = $.extend(this.params, opts);
                    opts.$obj = opts.$obj ? opts.$obj : opts.target;
                    if (opts.removeErrorClass) {
                        $(opts.$obj).removeClass(opts.errorClass);
                    }
                    this.tipId.css({
                        top: '-9999em',
                        left: '-9999em'
                    });
                },
                render: function (tpl, data) {
                    var Template = Handlebars.compile(tpl);
                    return html = Template(data);
                },
                creatContainer: function () {
                    var opts = this.params;
                    var uid = this.oid || (this.oid = this.uid());
                    var oid = '#' + uid;
                    if (!$(oid).length) {
                        var bb = $('<div/>').html(this.render(opts.templs.tipTempl, {
                            tipId: uid,
                            boxId: opts.ids.boxId,
                            arrowId: opts.ids.arrowId,
                            loadingId: opts.ids.loadingId,
                            contentId: opts.ids.contentId,
                            tip: opts.classNames.tip,
                            box: opts.classNames.box,
                            boxType: opts.classNames.boxType,
                            boxArrow: opts.classNames.boxArrow,
                            arrow: opts.classNames.arrow,
                            maxWidth: opts.css.maxWidth,
                            minWidth: opts.css.minWidth,
                            minHeight: opts.css.minHeight,
                            content: opts.classNames.tipContent
                        })).children().css({
                            'top': '-9999em',
                            'left': '-9999em'
                        }).appendTo('body');

                    }
                    this.tipId = $("#" + uid);
                    this.boxId = $("#" + opts.ids.boxId, oid);
                    this.arrowId = $("#" + opts.ids.arrowId, oid);
                    this.loadingId = $("#" + opts.ids.loadingId, oid);
                    this.contentId = $("#" + opts.ids.contentId, oid);
                    // $('#'+uid)[0].style.zIndex = opts.zIndex;
                },
                creatContent: function () {
                    var opts = this.params;
                    var html = this.render(opts.templs.contentTpl, {
                        "txt": opts.data
                    });
                    this.contentId.html(html);
                },
                getPos: function () {
                    var opts = this.params;
                    var pos = opts.position.split("_")
                    var targ = {};
                    var tip = {};
                    tip.pos = {
                        width: parseInt(this.tipId[0].offsetWidth, 10),
                        height: parseInt(this.tipId[0].offsetHeight, 10)
                    }
                    targ.pos = $(opts.target).offset();
                    tip.arrow = {
                        top: (parseInt(this.tipId.outerHeight()) - parseInt(this.arrowId.outerHeight())) / 2 + 12
                    };
                    var targ_left = targ.pos.left;
                    var targ_top = targ.pos.top;
                    var targ_width = $(opts.target).width();
                    var targ_height = $(opts.target).height();
                    var tip_width = tip.pos.width;
                    var tip_height = tip.pos.height;
                    var tipDot = {
                        lm: {
                            left: targ_left,
                            top: targ_top - tip_height / 2,
                            offsetX: 0,
                            offsetY: 0
                        },
                        rm: {
                            left: targ_left - tip_width,
                            top: targ_top - tip_height / 2,
                            offsetX: 0,
                            offsetY: 0
                        }
                    }
                    var targDot = {
                        "lm": [0, targ_height / 2, "left", "Middle"],
                        "rm": [targ_width, targ_height / 2, "right", "Middle"]
                    };
                    var tp = tipDot[pos[1]];
                    var tg = targDot[pos[0]];
                    var left = tp.left + tg[0];
                    var top = tp.top + tg[1];
                    var arrow = tip.arrow;
                    var offsetX = tp.offsetX;
                    var offsetY = tp.offsetY;
                    var ret = {
                        left: left,
                        top: top,
                        arrow: tip.arrow
                    }
                    return ret;
                }
            };
            return ins;
        }(),
        hideTip: function (el, opts) {
            var opts = opts || {};
            if (el && $(el).data('valid')) {
                $(el).data('valid').hide(opts);
            }
        },
        Products: function () { //产品部分
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
                                cQuery(this).regMod('jmp', '1.0', {
                                    options: {
                                        content: getData($(this).attr('mod_jmpinfo_page')),
                                        css: {
                                            maxWidth: '460'
                                        },
                                        type: 'jmp_table',
                                        classNames: {
                                            boxType: 'jmp_table'
                                        },
                                        template: '#jmp_craft',
                                        alignTo: 'cursor',
                                        showArrow: false
                                    }
                                });
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
        },
        Coupon: function () { //优惠券
            var self = this,
                vdata = self.data,
                roles = vdata.roles,
                mod = vdata.modules,
                parseJSON = self.common.parseJSON;
            return {
                init: function () { //初始化
                    var me = this;
                    var data = me.handleData();
                    var list = data.data;
                    var tpl = self.tpl.coupon;
                    var isSingle = this.isSingle = (data.type && list.length === 1);
                    $.extend(roles, self.common.getRoles(roles.couponID));
                    if (list.length) {
                        if (isSingle) {
                            tpl = self.tpl.singleCoupon;
                        }
                        self.render(tpl, {
                            'list': list
                        }, function (dom) {
                            if (isSingle) {
                                roles.singleConponID.html(dom).show();
                                roles.couponID.children().eq(1).hide();
                            } else {
                                roles.coupon.append(dom);
                                roles.couponID.show();
                            }
                            roles.fillsetID.show();
                        }, function () {
                            me.initSelect(isSingle);
                            me.select(isSingle);
                            // 点击input，下拉框自动显示该用户已有的优惠券（执行）
                            me.auto(isSingle);
                        });
                    } else {
                        roles.couponID.children().eq(1).hide();
                        roles.fillsetID.show();
                    }
                },
                handleData: function () {
                    var me = this,
                        _ret = [],
                        _ref = vdata.initData.availablePromotion,
                        _r, type = 0,
                        _obj, oSelected = _ref ? _ref.SelectedPromotion : null,
                        reduce; //type:优惠券是否是单个且要输入框的
                    me.promotions = {};
                    if (_ref) {
                        if (!$.isEmptyObject(_ref)) {
                            if (_ref.Promotions && _ref.Promotions.length) {
                                _ret = _ref.Promotions;
                                if (_ret.length) {
                                    $.map(_ret, function (v, k) {
                                        if (v.PromotionID) {
                                            me.promotions[v.PromotionID] = v
                                            if (oSelected && oSelected.PromotionID === v.PromotionID) {
                                                reduce = Math.abs(oSelected.ReducedAmount);
                                                v.ReducedAmount = reduce ? reduce : 0;
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        if (_r = vdata.initData.availablePromotion.ExtendPromotion) {
                            if (_r.IsNeedInputExtendCouponCode) {
                                _r.extendPromotion = true;
                                if (oSelected) {
                                    if (oSelected.IsExtendPromotion) {
                                        reduce = Math.abs(oSelected.ReducedAmount);
                                        _r.ReducedAmount = reduce ? reduce : 0;
                                        _r.DisplayNameR = oSelected.DisplayName;
                                        _r.Description = oSelected.Description;
                                    }
                                }
                                _ret.push(_r);
                            };
                        }
                    }
                    _obj = {
                        data: _ret,
                        type: 0
                    };
                    if (_ret.length === 1 && _ret[0].extendPromotion) {
                        _obj.type = 1;
                    }
                    return _obj;
                },
                initSelect: function (isSingle) {
                    var oSelected = vdata.initData.availablePromotion.SelectedPromotion;
                    var current;
                    var role, reduce;
                    if (!oSelected) return;
                    reduce = Math.abs(oSelected.ReducedAmount);
                    if (isSingle) {
                        role = self.common.getRoles(roles.singleConponID);
                        role.cnew.hide();
                        role.had.show();
                    } else {
                        current = oSelected.IsExtendPromotion ? roles.coupon.find('input[extend="1"]') : roles.coupon.find('input[PromotionID="' + oSelected.PromotionID + '"]');
                        current.prop('checked', true);
                        role = self.common.getRoles(current.closest('li'));
                        role.reinput && role.reinput.show();
                        role.description && role.description.show();
                        role.tip.show().html(reduce ? '<dfn>-&yen;</dfn> <strong>' + reduce + '</strong>' : '已选择');
                    }
                    roles.amountCoupon.html(vdata.couponNowPrice = reduce);
                    self.totalPrice.call(self);
                },
                select: function (isSingle) {
                    var request;
                    var validTip;
                    var _data = {
                        TmpOrderID: self.formData.OrderId,
                        PromotionID: 0,
                        CouponCode: ''
                    };
                    var conpon = isSingle ? roles.singleConponID : roles.couponID;
                    var callback = function (amount) {
                        roles.amountCoupon.html(vdata.couponNowPrice = amount);
                        self.totalPrice.call(self); //总金额
                    };
                    var getDate = function (role, obj, noShowTip, isChecked) {
                        _data.CouponCode = '';
                        if (obj) {
                            $.extend(_data, obj);
                        }
                        request = self.fetchData({
                            url: vdata.handles.verifyPromotion,
                            data: _data
                        }, function (data) {
                            var amount, code, ref;
                            if (!request) return; //如果请求取消则停止回调
                            data = typeof data === 'string' ? parseJSON(data) : data;
                            if (data.errno != 0) {
                                role.tip.html(data.errmsg || '你输入的验证码无效').show();
                                callback(0);
                            } else {
                                ref = data.data;
                                code = obj ? obj.CouponCode : '';
                                amount = Math.abs(ref.ReducedAmount);
                                promotionID = ref.PromotionID;
                                if (amount == 0) {
                                    (role.tip && !noShowTip) && role.tip.html('已选择');
                                } else {
                                    role.tip && role.tip.html('<dfn>-&yen;</dfn> <strong>' + amount + '</strong>');
                                }
                                role.tip && role.tip.show();
                                if (isChecked) {
                                    if (isSingle) {
                                        ref.DisplayName && role.had.find('.singleName').html(ref.DisplayName)
                                        ref.Description && role.had.find('.explain').html(ref.Description)
                                        role.had.show();
                                        role.cnew.hide();
                                    } else {
                                        role.code.hide()
                                        ref.DisplayName && role.displayName.html(ref.DisplayName)
                                        ref.Description && role.extendDescription.html(ref.Description).show()
                                        role.reinput.show()
                                    }
                                }
                                callback(amount);
                            }
                        })
                    };
                    var couponCHeck = function (role, promotionid, bl) {
                        if (!bl) {
                            callback(0);
                            getDate(role, {
                                PromotionID: 0,
                                CouponCode: ''
                            }, !0);
                        }
                        role.code && role.code.show();
                        role.couponCode && role.couponCode.val('');
                        role.tip && role.tip.html('');
                        role.checkcode.unbind('click');
                        role.checkcode.bind('click', function () {
                            var _code = $.trim(role.couponCode.val());
                            if (!_code) {
                                if (validTip) {
                                    validTip.show();
                                } else {
                                    validTip = new self.validate({
                                        target: role.couponCode[0],
                                        data: '请输入验证码',
                                        errorClass: ''
                                    }).show();
                                }
                                return;
                            }
                            getDate(role, {
                                PromotionID: promotionid,
                                CouponCode: _code
                            }, null, true);
                        });
                    };
                    if (this.isSingle) {
                        var _role = self.common.getRoles(roles.singleConponID);
                        roles.singleConponID.on('click', 'a[role="singleReInput"]', function () {
                            couponCHeck(_role, 0);
                            _role.cnew.show();
                            _role.had.hide().find('.explain, .singleName').html('');
                        });
                        couponCHeck(_role, 0, !0);
                    }
                    conpon.on('click', 'input[type="radio"]', function () {
                        var _this = $(this);
                        var promotionID = _this.attr('PromotionID');
                        var strategyID = _this.attr('strategyID');
                        var parent = _this.closest('li');
                        var role = self.common.getRoles(parent);
                        var requireCode = _this.attr('requireCode') === '1';
                        if (request) {
                            request.abort();
                        }
                        if (_this.prop('checked') && _this.attr('role') !== 'cancel') {
                            role.description && role.description.show();
                            self.removeValidate();
                        }
                        var extendDescription = conpon.find('[role="extendDescription"]');
                        extendDescription && extendDescription.closest('li').find('[role="displayName"]').html("如果您有优惠代码，请输入");
                        var siblings = parent.siblings();
                        siblings.find('[role="tip"],[role="code"],[role="description"],[role="extendDescription"],[role="reinput"]').hide();
                        if (_this.attr('role') === 'cancel') {
                            callback(0);
                            getDate(role, {
                                PromotionID: 0,
                                CouponCode: ''
                            });
                            return;
                        }
                        if (requireCode) {
                            couponCHeck(role, role.couponCheck.attr('promotionid') || 0);
                        } else {
                            getDate(role, {
                                PromotionID: promotionID
                            });
                        }
                    });

                    conpon.on('click', '[role="reinput"]', function () {
                        var parent = $(this).hide().closest('li');
                        var role = self.common.getRoles(parent);
                        if (role.extendDescription) {
                            role.extendDescription.html('').hide()
                            role.displayName.html("如果您有优惠代码，请输入")
                        }
                        couponCHeck(role, role.couponCheck.attr('promotionid') || 0);
                    })
                },
                // 点击input，下拉框自动显示该用户已有的优惠券（方法）
                auto: function (isSingle) {
                    var _role = isSingle ? roles.singleConponID : roles.couponID,
                        timer,
                        reviewPosition = function () {
                            $("[id^='autoCoupon']:visible").each(function () {
                                var $this = $(this);
                                autoCouponId = $this.attr('id'),
                                promotionId = autoCouponId.substr(autoCouponId.indexOf('_') + 1);
                                input = isSingle ?
                                        _role.find('[role = "couponCode"]') :
                                        _role.find('[promotionid="' + promotionId + '"]').parent().next().children('[type="text"]'),
                                x = input.offset().left,
                                y = input.offset().top;
                                $this.css({ left: x, top: y + input.outerHeight() })
                            })
                        };
                    _role.on('click', '[role = "couponCode"]', function () {
                        var $this = $(this),
                            radio = $this.parent().prev().children('input'),
                            promotionId = radio.attr('promotionid') || '',
                            autoCoupon = $('#autoCoupon_' + promotionId),
                            productID = GV.app.order.vars.initData.productID,
                            big = promotionId ? false : true,
                            x = $this.offset().left,
                            y = $this.offset().top + $this.outerHeight();
                        // 阻止重复ajax
                        if ($this.data('requested')) {
                            autoCoupon.css({ left: x, top: y }).show();
                            return
                        };
                        // ajax请求该用户已有的优惠券
                        $.ajax({
                            url: "/booking/Handler2/UserAvailableCoupon.ashx",
                            type: 'GET',
                            dataType: 'json',
                            data: {
                                pkgId: productID,
                                promotionId: promotionId
                            },
                            success: function (data) {
                                $this.data('requested', true);
                                // 无返回数据或者返回数据为空
                                if (!data || !data.length) {
                                    return
                                }
                                self.render(self.tpl.autoCoupon, {
                                    'index': promotionId,
                                    'big': big,
                                    'list': data
                                }, function (dom) {
                                    $(dom)
                                        .appendTo('body')
                                        .css({ left: x, top: y })
                                        .show().find('li').click(function () {
                                            $this.val($(this).find('.coupon_num').html() || $(this).children().html());
                                            autoCoupon.hide();
                                            $this.next('[role = "checkcode"]').click();
                                        })
                                })
                            }
                        })
                    })
                    // 点击下拉框隐藏
                    $(document).mouseup(function () {
                        $("[id^='autoCoupon']").hide()
                    })
                    // 窗口大小变化重新定义下拉框位置
                    $(window).resize(function () {
                        timer && clearTimeout(timer);
                        timer = setTimeout(reviewPosition, 200);
                    })
                }
            }
        },
        HotelCoupon: function () { //酒店优惠
            var self = this,
                vdata = self.data,
                roles = vdata.roles;
            return {
                init: function () {
                    var me = this;
                    var data = this.handleData(vdata.initData.Coupon);
                    if (!data && $.isEmptyObject(vdata.initData.availablePromotion)) {
                        roles.couponID.hide();
                    }
                    if (!data) {
                        if (!vdata.initData.availablePromotion || vdata.modules.Coupon.isSingle) {
                            roles.couponID.hide();
                        }
                        return;
                    }
                    self.render(self.tpl.hotelCoupon, data, function (dom) {
                        var html = $(dom).appendTo(vdata.roles.couponID);
                        me.bindEvent(html, data);
                    });
                },
                handleData: function (data) {
                    if (!data) return;
                    var _ret = {
                        Amount: data.Amount,
                        CanUseAmount: data.CanUseAmount
                    };
                    var _ref = 0;
                    var __ref = 0;
                    if (data.Amount <= 0) {
                        _ret.isRemain = false;
                    } else {
                        _ret.isRemain = true;
                    }
                    $.map(data.ReturnTicketCash, function (v, k) {
                        _ref += parseInt(v.Amount);
                    });
                    data.UsedReturnCashRoomLst && $.map(data.UsedReturnCashRoomLst, function (v, k) {
                        __ref += parseInt(v.Amount);
                    })
                    _ret.coupon = _ref;
                    _ret.used = __ref;
                    _ret.remain = parseInt(data.Amount) - parseInt(data.CanUseAmount);
                    return _ret;
                },
                bindEvent: function (el, data) {
                    var role = self.common.getRoles(el);
                    role.confirm && role.confirm.click(function () {
                        role.having.hide();
                        role.had.show();
                        self.formData.CouponInfo = {
                            CashBack: data.CanUseAmount,
                            IsUseCoupon: 1
                        }
                    });
                    role.cancel && role.cancel.click(function () {
                        role.having.show();
                        role.had.hide();
                        self.formData.CouponInfo = {
                            CashBack: 0,
                            IsUseCoupon: 0
                        }
                    });
                }
            }
        },
        Travellers: function () { //出游人
            var self = this;
            var vdata = self.data;
            var roles = vdata.roles;
            var Reg = self.Reg;
            var Validate = self.validate;
            var oBirth = new Birth('', vdata.initData.departDate);
            var mod = vdata.modules;
            var Visitor = function (opts) { //旅客类
                var _defaults = {
                    element: ''
                };
                this.opts = $.extend(_defaults, opts);
                this.init();
            };
            Visitor.prototype = {
                init: function () {
                    var role = this.role = self.common.getRoles(this.opts.element);
                    this.personType = +$(this.opts.element).attr('ptype');
                    this.cid = $(this.opts.element).attr('index');
                    if (role.national) {
                        this.regNationalAddr();
                    } else {
                        this.bindEvent();
                    }
                    if (role.idCardType) {
                        this.filterInputs();
                    }
                },
                initTips: function () {

                },
                regNationalAddr: function () { //注册国籍控件
                    var role = this.role;
                    var dfNational;
                    cQuery.mod.load('address', '1.0', $.proxy(function () {
                        var me = this;
                        this.addressNational = self.regNational(role.national[0]);
                        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
                            role.national[0].readOnly = true;
                            role.national.bind('click', function () {
                                $('.CQ_suggestionTabContainer')[0].style.width = "0px";
                                setTimeout(function () {
                                    role.national[0].readOnly = false;
                                    role.national[0].focus();
                                }, 100);
                            });
                            role.national.bind('blur', function () {
                                role.national[0].readOnly = true;
                            });
                        }
                        this.addressNational.method('bind', 'change', function (event, data) { //绑定国籍事件
                            role.national.attr('mod_value', data.items[2]);
                        });
                        this.addressNational.method('bind', 'userinput', function (a, b) {
                            if (b.data) {
                                vdata.dfNational = b.data;
                            }
                            if (vdata.dfNational) {
                                dfNational = vdata.dfNational.split('|');
                                me.setNational(dfNational[1], dfNational[2]);
                                me.checkForeign(dfNational[2]);
                            }
                            me.checkNationality();
                        });
                        this.loadNationalData();
                    }, this));
                },
                loadNationalData: function () {
                    var me = this;
                    cQuery.loader.jsonp('http://webresource.c-ctrip.com/code/cquery/resource/address/flightintl/nationality_' + cQuery.config("charset") + '.js', {
                        charset: cQuery.config("charset"),
                        onload: function (data) {
                            if ($.isEmptyObject(vdata.nationalData)) {
                                me.handleNationalData(data.data, data.suggestion['']);
                                vdata.orgiNationalData = data;
                            }
                            me.initNationalData();
                            me.bindEvent();
                        }
                    })
                },
                handleNationalData: function (data, sug) {
                    var reg = new RegExp('@([^@]*\\|[^@]*\\|[^@]*)@', 'gi');
                    vdata.nationalData = {};
                    $.map(data.match(reg), function (v, k) {
                        var _ref = v.replace('@', '').replace('@', '').split('|');
                        vdata.nationalData[_ref[2]] = _ref[1];
                    });
                    $.map(sug, function (v, k) {
                        vdata.nationalData[v.data.split('|')[2]] = v.display;
                    });
                },
                initNationalData: function () {
                    var role = this.role;
                    var val = $.trim(role.national.val());
                    if (val !== '' && val !== role.national.attr('_cqnotice')) { //改变CN成中国大陆
                        role.national.val(vdata.nationalData[val]);
                    } else {
                        role.national.val('中国大陆').attr('mod_value', 'CN').removeClass('inputSel');
                    }
                    if (vdata.initData.ProductType === 3) {
                        this.addressNational.set('source', {
                            data: '@China|中国大陆|CN@',
                            suggestion: {
                                '': [{
                                    "display": "中国大陆",
                                    data: "China|中国大陆|CN",
                                    rightDisplay: 'China'
                                }]
                            }
                        })
                    }
                },
                setNationalData: function () {
                    var producttype = this.getProdctType();
                    var role = this.role;
                    if (producttype === 1 && role.national && role.idCardType) {
                        var val = role.idCardType.val();
                        if (val === '7') {
                            this.setNational('中国香港', 'HK');
                        }
                        if (val === '8') {
                            this.setNational('中国台湾', 'TW');
                        }
                        if (val === '2') {
                            this.addressNational.set('source', {
                                data: this.filterNationalData(['@HongKong|中国香港|HK', '@Macau|中国澳门|MO', '@Taiwan|中国台湾|TW']).data,
                                suggestion: {
                                    '': [{
                                        "display": "中国大陆",
                                        data: "China|中国大陆|CN",
                                        rightDisplay: 'China'
                                    }, {
                                        "display": "美国",
                                        data: "United States|美国|US",
                                        rightDisplay: 'United States'
                                    }, {
                                        "display": "英国",
                                        data: "United Kingdom|英国|GB",
                                        rightDisplay: 'United Kingdom'
                                    }, {
                                        "display": "日本",
                                        data: "Japan|日本|JP",
                                        rightDisplay: 'Japan'
                                    }, {
                                        "display": "加拿大",
                                        data: "Canada|加拿大|CA",
                                        rightDisplay: 'Canada'
                                    }, {
                                        "display": "法国",
                                        data: "France|法国|FR",
                                        rightDisplay: 'France'
                                    }, {
                                        "display": "韩国",
                                        data: "Korea,Republic of|韩国|KR",
                                        rightDisplay: 'Korea,Republic of'
                                    }, {
                                        "display": "德国",
                                        data: "Germany|德国|DE",
                                        rightDisplay: 'Germany'
                                    }]
                                }
                            });
                        } else {
                            this.addressNational.set('source', vdata.orgiNationalData);
                        }
                    }
                },
                bindEvent: function () {
                    var me = this;
                    var role = this.role;
                    var isHasEnName = role.nameEN;
                    me.setNationalData();
                    me.autoNext([role.birthdayY, role.birthdayM]).autoNext([role.cardValidUntilY, role.cardValidUntilM]);
                    $(this.opts.element).on('blur', 'input[type="text"]', function (event) {
                        var reg;
                        if (reg = $(this).attr('regex')) {
                            me[reg]($.trim( $(this).val() ), $(this).prop('required'), this);
                        }
                        if ($(this).attr('role') === 'idCardNo') {
                            Reg.checkIdRepeat($(this).prev()[0].value, this, $(this).prev().find('option:selected')[0].innerHTML);
                        }
                        if ($(this).attr('role') === 'birthPlace'){

                        }
                    })
                        .on('change', '[role="idCardType"]', function () {
                            if ($(this).next().next().hasClass('repeatNum')) {
                                $(this).next().next().remove();
                            }
                            var val = $(this).val();
                            var elem = $(this).closest('[role="youren"]');
                            var cliendID = elem.attr('index');
                            var cobj = mod.Commoners.commonersObj[cliendID];
                            var _ref;
                            var setCardDate = function (arr) {
                                if (role.cardValidUntilY) {
                                    $.map('cardValidUntilY|cardValidUntilM|cardValidUntilD'.split('|'), function (v, k) {
                                        role[v].val(arr[k]);
                                    })
                                }
                            };
                            me.filterInputs();
                            // $.map('nameEnLast|nameEnFirst|idCardNo|gender|birthdayY|birthdayM|birthdayD|national|cardValidUntilY|cardValidUntilM|cardValidUntilD|birthPlace'.split('|'), function (v, k) { //隐藏提示
                            //     role[v] && self.hideTip(role[v][0]);
                            // });
                            $('input[role="cardValidUntilY"],input[role="cardValidUntilM"]', '#travellersID').removeClass('f_error');
                            // if((val === '2' || val === '22') && me.getDest() === 32){
                            //     me.showTip(role.idCardType,'香港海关入境处规定，在香港转机到第三国（地区），可以凭护照签证或《往来台湾通行证》，和到目的地的机票可以在港合法滞留7天。',{errorClass:''});
                            // }
                            me.setNationalData();
                            self.reviewPos();
                            if (cliendID && cobj && (_ref = cobj.IDCardInfo) && _ref.length) {
                                role.idCardNo && role.idCardNo.val('');
                                setCardDate(['', '', '']);
                                $.map(_ref, function (v, k) {
                                    var lt;
                                    if (v.IDCardType == val) {
                                        v.IDCardNo && role.idCardNo && role.idCardNo.val(v.IDCardNo).removeClass('inputSel');
                                        lt = v.IDCardTimelimit ? v.IDCardTimelimit.split('-') : ['', '', ''];
                                        setCardDate(lt);
                                        return false;
                                    }
                                })
                            }
                        })
                },
                filterInputs: function () {
                    var val, role = this.role;
                    var optional = $('.optional', this.opts.element);
                    var later = $('.later', this.opts.element);
                    var me = this;
                    if (role.idCardType) {
                        val = role.idCardType.val();
                        role.idCardNo.show();
                        if (val == '1') {
                            optional.length && optional.hide();
                        } else {
                            optional.length && optional.show();
                        }
                        if (val == '100') {
                            later.length && later.hide();
                        } else {
                            // !later.hasClass('optional') && later.length && later.show();
                            later.each(function () {
                                !$(this).hasClass('optional') && $(this).show();
                            })
                        }
                        if (val === '2') {
                            role.passportType.show();
                        } else {
                            role.passportType.hide();
                        }
                    }
                },
                filterNationalData: function (arg) {
                    var source = cQuery.copy(vdata.orgiNationalData);
                    var _ret;
                    if (arg.length) {
                        $.map(arg, function (v, k) {
                            source.data = source.data.replace(v, '');
                        })
                    }
                    return source;
                },
                setNational: function (val, attr) { //设置国籍
                    this.role.national.val(val).attr('mod_value', attr).removeClass('inputSel');
                },
                /*  forForeign: function(isForeign, isHasEnName) { //是否是外宾
                var role = this.role;
                var _tpl, _obj, nameEN;
                if (isForeign) {
                role.nameCN.removeAttr('regex');
                if (!isHasEnName) {
                if (this.cid) {
                _obj = mod.Commoners.commonersObj[this.cid];
                } else {
                _obj = {
                ENFirstName: '',
                ENMiddleName: '',
                ENLastName: ''
                }
                }
                nameEN = _obj.ENFirstName ? (_obj.ENLastName + '/' + _obj.ENFirstName + ' ' + _obj.ENMiddleName) : '';
                _tpl = '<li><label for="" class="product_label">英文姓名</label><input type="text" class="input_m" value="' + nameEN + '" role="nameEN" regex="checkEnName"> <a href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}">填写说明</a></li>';
                self.render(_tpl, {}, function(dom) { //插入英文名字
                var _ref = $(dom).insertAfter(role.nameCN.closest('li'));
                role.nameEN = _ref.find('input[role="nameEN"]');
                });
                }
                } else {
                role.nameCN.attr('regex', 'checkCnName');
                if (!isHasEnName) {
                self.hideTip(role.nameEN[0]);
                role.nameEN.closest('li').remove();
                delete role.nameEN;
                }
                }
                self.reviewPos();
                },*/
                autoNext: function (el) {
                    if (el[0]) {
                        $(el).each(function (i) {
                            $(this).bind('keyup', function () {
                                if (i === 0) {
                                    if ($(this).val().length >= 4) {
                                        $(this).next().focus();
                                    }
                                } else {
                                    if ($.trim($(this).val()).length >= 2) {
                                        $(this).next().focus();
                                    }
                                }
                            });
                        });
                    }
                    return this;
                },
                hideTip: function () { //提示隐藏 
                    var tip;
                    $(this.opts.element).find('.cq').removeClass('inputSel').removeClass('f_error');
                    $.each(this.role, function (k, v) {
                        if (tip = v.data('valid')) {
                            tip.hide();
                        }
                    });
                },
                showTip: function (el, data, opts) {
                    var showItem = $(el);
                    var ovalid = showItem.data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {
                        'errorClass': 'f_error'
                    });
                    ovalid = ovalid ? ovalid.show(opts) :
                    new Validate(opts).show();
                    showItem.data('valid', ovalid);
                },
                getIdvalue: function () {
                    var role = this.role;
                    return (role.idCardType && role.idCardType.val()) || 0;
                },
                getExpiryVal: function () {
                    var role = this.role;
                    var reg = /^(\d{4})-([01]?\d)-([0123]?\d)$/;
                    var _ret = [];
                    _ret.push(role.cardValidUntilY.val(), role.cardValidUntilM.val(), role.cardValidUntilD.val());
                    return reg.test(_ret.join('-')) ? _ret.join('-') : 0;
                },
                getCardValidUntil: function () {
                    var role = this.role;
                    var t = this.getExpiryVal();
                    var cardDate;
                    if (!t || !role.idCardType) {
                        return [true, ];
                    }
                    cardDate = role.idCardType.val();
                    if (!self.common.isDate(t)) {
                        return [false, '请填写正确的证件有效期，格式：yyyy-mm-dd'];
                    }
                    var days = (GVdate.parse(t, !0) - GVdate.parse(this.opts.returnDate, !0)) / (3600 * 24 * 1000);
                    var day = GVdate.parse(t, !0) - GVdate.parse(this.opts.departDate, !0)
                    if (day <= 0) {
                        return [false, '您的证件已经过了有效期，会影响您正常登机。建议重新办理后再预订。'];
                    }
                    if (cardDate == 2 || cardDate == 22) {
                        if (days < 180) {
                            return [true, '从旅行日期计算，您的证件有效期已不足六个月，可能无法顺利出入境，建议您核实确认。'];
                        }
                        if (days < 360) {
                            return [true, '从旅行日期计算，您的证件有效期已不足一年，建议您核实确认。'];
                        }
                    }
                    return [true, ];
                },
                getAgeInfo: function (str) {
                    var _ret;
                    var role = this.role;
                    if (role.birthdayY && role.birthdayY.closest('li').css('display') !== 'none') {
                        if (!/^(\d{4})-([01]?\d)-([0123]?\d)$/.test([role.birthdayY.val(), role.birthdayM.val(), role.birthdayD.val()].join('-'))) {
                            return [true, ];
                        }
                    }
                    if (!self.common.isDate(str)) {
                        return [false, '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期'];
                    }
                    if (this.personType === 1 && oBirth.isChild(str)) {
                        return [false, '请填写成人信息'];
                    }
                    if (this.personType === 0 && !oBirth.isChild(str)) {
                        return [false, '请填写儿童信息'];
                    }
                    if (this.personType === 1 && oBirth.isEldor(str)) {
                        return [true, '出行人年龄大于70周岁，出行前需填写《健康申请表》'];
                    }
                    return [true, ];
                },
                checkIdCardType: function () {
                    var role = this.role;
                    var dest = this.getDest();
                    if (!role.national) return true;
                    var national = $.trim(role.national.val());
                    var idtype = role.idCardType.val();
                    // if(dest === 32 || dest === 33){//香港或澳门
                    //     if(national === '中国大陆' && idtype != 10 && (idtype != 10 && idtype !=　99)){
                    //         this.showTip(role.idCardType[0],'请选择港澳通行证');
                    //         return false;
                    //     }
                    // }
                    return true;
                },
                getDest: function () {
                    return vdata.initData.Dest;
                },
                getProdctType: function () {
                    return vdata.initData.ProductType;
                },
                checkName: function (str) {
                    var me = this
                    var role = this.role;
                    var bl;
                    var showTip = function () {
                        me.showTip.apply(this, [role.name[0]].concat([].slice.call(arguments, 0)));
                    };
                    if ('' === str || str === role.name.attr('_cqnotice')) {
                        showTip('请填写姓名');
                        return false;
                    } else if (Reg.hasCnChar(str)) {
                        if (role.national && (role.national.val() != 'CN' && role.national.val() != '中国大陆' && role.national.val() != '中国香港' && role.national.val() != '中国澳门' && role.national.val() != '中国台湾' && role.national.val() != '中文/拼音' && $.trim(role.national.val()) != '')) {
                            showTip('非中国国籍请输入英文姓名');
                            return false;
                        }
                        if ((me.role.national && me.checkForeign(me.role.national.attr('mod_value'))) || (this.role.idCardType && this.role.idCardType.val() == '1')) {
                            bl = Reg.checkCnName(str);
                            if (!bl[0]) {
                                showTip(bl[1]);
                                return false;
                            } else if (bl[1]) {
                                showTip(bl[1], {
                                    errorClass: ''
                                });
                            }
                        }
                        return true;
                    } else if (role.idCardType && role.idCardType.val() == 1) {
                        showTip('请保持姓名与证件上的姓名一致');
                        return false;
                    } else {
                        bl = Reg.checkEnName(str);
                        if (!bl[0]) {
                            showTip(bl[1]);
                            return false;
                        }
                        return true;
                    }
                },
                checkCnName: function (str) {
                    var me = this;
                    var nameCN = me.role.nameCN;
                    var strs = $.trim(str) === nameCN.attr('_cqnotice') ? '' : $.trim(str);
                    if ((me.role.national && me.checkForeign(me.role.national.attr('mod_value'))) || (this.role.idCardType && this.role.idCardType.val() == '1')) {
                        var bl = Reg.checkCnName(strs, $(nameCN).prop('required'));
                        if (!bl[0]) {
                            me.showTip(nameCN[0], bl[1]);
                            return false;
                        } else if (bl[1]) {
                            this.showTip(nameCN[0], bl[1], {
                                errorClass: ''
                            });
                        }
                    }
                    return true;
                },
                checkEnName: function (str) {
                    var strs = $.trim(str) === this.role.nameEN.attr('_cqnotice') ? '' : $.trim(str);
                    var bl = Reg.checkEnName(strs);
                    console.log(this);
                    if (!bl[0]) {
                        this.showTip(this.role.nameEN[0], bl[1]);
                        return false;
                    }
                    return true;
                },
                checkEnNameLast: function (str) {
                    //英文姓检测
                    var name = $.trim(str);
                    if (/[^a-zA-Z]/.test(name)) {
                        this.showTip(this.role.nameEnLast[0], [false, "英文姓只能包含字母，请检查"], { $obj: this.role.nameEnLast[0] });
                        return false;
                    }
                    return this.checkEnNameNew(name, this.role.nameEnLast);
                },
                checkEnNameFirst: function (str) {
                    //英文名检测
                    var name = $.trim(str);
                    if (/[^a-zA-Z]/.test(name)) {
                        this.showTip(this.role.nameEnFirst[0], [false, "英文名只能包含字母，请检查"], { $obj: this.role.nameEnFirst[0] });
                        return false;
                    }
                    return this.checkEnNameNew($.trim(str), this.role.nameEnFirst);
                },
                checkEnNameNew: function (str, obj, _bool) {
                    //英文单元检测
                    var role = this.role;
                    var strs = $.trim(str) === obj.attr('_cqnotice') ? '' : $.trim(str);
                    var bl = Reg.checkEnNameNew(strs, false);

                    if (!bl[0]) {
                        this.showTip(this.role.nameEnFirst[0], bl[1], { $obj: obj[0] });
                        return false;
                    }
                    return true;
                },
                checkForeign: function (str) {
                    if (!(str === "CN" || str === "HK" || str === "MO" || str === "TW")) {
                        if (this.role.idCardType && this.role.idCardType.val() != '1') {
                            this.role.nameCN && self.hideTip(this.role.nameCN[0]);
                        }
                        return false;
                    }
                    return true;
                },
                checkNationality: function (str) {
                    var role = this.role;
                    var type = this.getProdctType();
                    var national = $.trim(role.national.val());
                    if ('' === str || str === role.national.attr('_cqnotice')) {
                        this.showTip(role.national[0], '请选择旅客的国籍');
                        return false;
                    }
                    if (type === 2) { //境外产品
                        if (national === '中国香港' || national === '中国澳门') {
                            this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照前往中国大陆境外，请您携带护照和有效的回乡证办理出境手续', {
                                errorClass: ''
                            });
                        }
                        if (national === '中国台湾') {
                            this.showTip(role.national[0], '若您持有中国台湾签发的护照前往中国大陆境外，请您携带护照和有效的台胞证办理出境手续', {
                                errorClass: ''
                            });
                        }
                        if (national.indexOf('中国') === -1) {
                            this.showTip(role.national[0], '若您持有外籍护照前往中国大陆境外，请确保持有再次进入中国大陆的有效签证', {
                                errorClass: ''
                            });
                        }
                    }
                    if (type === 1) {
                        if (national === '中国香港' || national === '中国澳门') {
                            this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照在中国大陆境内旅行，请您携带护照和有效的回乡证办理登机与入住手续', {
                                errorClass: ''
                            });
                        }
                        if (national === '中国台湾') {
                            this.showTip(role.national[0], '若您持有中国台湾签发的护照在中国大陆境内旅行，请您携带护照和有效的台胞证办理登机和入住手续', {
                                errorClass: ''
                            });
                        }
                    }
                    this.checkIdCardType();
                    return true;
                },
                checkIdCard: function (str) {
                    var role = this.role;
                    var strs = str === role.idCardNo.attr('_cqnotice') ? '' : str;
                    var type = +this.getIdvalue();
                    var bl = Reg.checkIdCard(strs, type);
                    var data, tip;
                    if (!bl[0]) {
                        data = bl[1];
                    } else {
                        if (type === 1) {
                            var age = self.common.parseCNId(strs).passengerBirth;
                            tip = this.getAgeInfo(age);
                        }
                    }
                    if (data) {
                        this.showTip(role.idCardNo[0], data);
                        return false;
                    } else if (tip) {
                        if (!tip[0]) {
                            this.showTip(role.idCardNo[0], tip[1]);
                            return false;
                        } else if (tip[1]) {
                            this.showTip(role.idCardNo[0], tip[1], {
                                errorClass: ''
                            });
                        }
                    }
                    return true;
                },
                checkCardValidUntil: function (str, el) {
                    var data, target, reg;
                    var me = this;
                    var role = this.role;
                    // var index = role.cardValidUntil.index(event.target);
                    var elem = el;
                    var error = 0;
                    var index = $(elem).attr('role');
                    if ('' === str || $(elem).attr('_cqnotice') === str) {
                        data = '请填写证件有效期';
                        me.showTip(role.cardValidUntilD[0], data, {
                            $obj: elem
                        });
                        return false;
                    } else {
                        if (index === 'cardValidUntilY') {
                            reg = /^\d{4}$/;
                        }
                        if (index === 'cardValidUntilM') {
                            reg = /^(0?[1-9]|1[0-2])$/;
                        }
                        if (index === 'cardValidUntilD') {
                            reg = /^[0123]?\d$/;
                        }
                    }
                    if (reg && !reg.test(str)) {
                        data = '请填写正确的证件有效期，格式：yyyy-mm-dd';
                        error++;
                    }
                    if (data) {
                        me.showTip(role.cardValidUntilD[0], data, {
                            $obj: elem
                        });
                    } else {
                        self.hideTip(role.cardValidUntilD[0], {
                            $obj: elem
                        });
                    }
                    if (!error) {
                        var bl = this.getCardValidUntil();
                        if (bl) {
                            if (bl[0]) {
                                bl[1] && me.showTip(role.cardValidUntilD[0], bl[1], {
                                    errorClass: ''
                                });
                                self.hideTip(role.cardValidUntilY[0]);
                                self.hideTip(role.cardValidUntilM[0]);
                                role.cardValidUntilY.removeClass('f_error');
                                return true;
                            } else {
                                me.showTip(role.cardValidUntilD[0], bl[1], {
                                    $obj: role.cardValidUntilY[0],
                                    errorClass: 'f_error'
                                });
                                return false;
                            }
                        }
                    }
                    return true;
                },
                checkSex: function (str) {
                    var role = this.role;
                    if ('-1' == role.gender.val() || '' == $.trim(role.gender.val())) {
                        this.showTip(role.gender[0], '请选择性别');
                        return false;
                    }
                    return true;
                },
                checkBirthday: function (str, el) {
                    var data, target, reg;
                    var me = this;
                    var role = this.role;
                    var elem = el;
                    var index = $(elem).attr('role');
                    var error = 0;
                    if ('' === str || $(elem).attr('_cqnotice') === str) {
                        data = '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期';
                        me.showTip(role.birthdayD[0], data, {
                            $obj: elem
                        });
                        return false;
                    } else {
                        if (index === 'birthdayY') {
                            reg = /^\d{4}$/;
                        }
                        if (index === 'birthdayM') {
                            reg = /^(0?[1-9]|1[0-2])$/;
                        }
                        if (index === 'birthdayD') {
                            reg = /^[0123]?\d$/;
                        }
                    }
                    if (reg && !reg.test(str)) {
                        data = '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期';
                        error++;
                    }
                    if (data) {
                        me.showTip(role.birthdayD[0], data, {
                            $obj: elem
                        });
                    } else {
                        $(role.birthdayD).data('valid') &&
                            $(role.birthdayD).data('valid').hide({
                                $obj: elem
                            });
                    }
                    if (!error) {
                        var bl = this.getAgeInfo([role.birthdayY.val(), role.birthdayM.val(), role.birthdayD.val()].join('-'));
                        if (!bl[0]) {
                            me.showTip(role.birthdayD[0], bl[1], {
                                $obj: role.birthdayY[0]
                            });
                            return false;
                        } else if (bl[1]) {
                            me.showTip(role.birthdayD[0], bl[1], {
                                $obj: role.birthdayY[0],
                                errorClass: ''
                            });
                        } else {
                            role.birthdayY.removeClass('f_error'); //temp
                        }
                        return true;
                    }
                    return true;
                },
                checkMobile: function (str) {
                    var bl;
                    if ('' !== str) {
                        bl = Reg.checkMobile(str);
                        if (!bl[0]) {
                            this.showTip(this.role.mobileNo[0], bl[1]);
                            return false;
                        }
                    }
                    return true
                },
                // checkBirthPlace: function (str) {
                //     if ('' === str) {
                //         this.showTip(this.role.birthPlace[0], '请填写出生地');
                //         return false;
                //     }
                //     return true;
                // },
                checkMobileIsNull: function () {
                    var str = $.trim(this.role.mobileNo.val());
                    if ('' === str) {
                        this.showTip(this.role.mobileNo[0], '请至少填写一位出行人的手机号码');
                        return false;
                    }
                    return true;
                },
                linstenPickFill: function (bl) { //监听点选常用联系人
                    bl && this.filterInputs();
                    this.hideTip();
                },
                verify: function () {
                    var me = this;
                    var _ret = true;
                    var elem;
                    $.each(this.role, function (k, v) {
                        var reg, bl = true;
                        if ($(v).css('display') !== 'none' && $(v).closest('li').css('display') !== 'none') { //判断是否隐藏
                            if (reg = $(this).attr('regex')) {
                                bl = me[reg]($.trim($(this).val()), v);
                            }
                            if (!bl) {
                                _ret = false;
                                if (!elem) {
                                    elem = this;
                                }
                                // return false;
                            }
                        }
                    })
                    return [_ret, elem];
                }
            };
            return {
                init: function (arg) {
                    var me = this;
                    var data = arg.initData;
                    var customer = data.CustomerInfoTemplate && data.CustomerInfoTemplate.CustomerInfoItems;
                    if (!customer) return;
                    if (data.CustomerInfoTemplate.FillInNumberLimit && data.CustomerInfoTemplate.FillInNumberLimit.toLowerCase() === 'o' && (!vdata.ProductCategoryType || vdata.ProductCategoryType.toLowerCase() !== 'studytour')) {
                        data.aduNumber = 1;
                        data.chlidNumber = 0;
                    }
                    //if (vdata.ProductCategoryType) {
                    //    var visaType = vdata.ProductCategoryType.toLowerCase();
                    //    if (vdata.ProductCategoryType.toLowerCase() !== 'visa') {
                    //        $('.online_service').show();
                    //    }
                    //}
                    var _ref = this.handleData(data, customer);
                    var _obj = {
                        'list': _ref
                    };
                    if (data.Reminder) {
                        _obj.Reminder = data.Reminder;
                    }
                    self.render(self.tpl.traveller, _obj, function (dom) {
                        roles.travellersID.append(dom);
                    });


                    roles.fillsetID.show();
                    me.toIns();
                    me.bindEvent();
                    roles.bookInfoID.show();
                    require('./mod_book_calendar'); // 载入证件有效期，出生日期日历选择交互模块
                },
                handleHadData: function (data) {
                    var handle = function (v, arg) {
                        data[v + 'Y'] = arg[0] || '';
                        data[v + 'M'] = arg[1] || '';
                        data[v + 'D'] = arg[2] || '';
                        return data;
                    };
                    data.nameEN = data.ENLastName + '/' + data.ENFirstName + ' ' + data.ENMiddleName;
                    data = handle('birthday', data.birthday.split('-'));
                    data = handle('IDCardTimelimit', data.IDCardTimelimit.split('-'));
                    return data;
                },
                handleInfoTemplate: function (data) {
                    var _ret = {
                        idOptions: [],
                        cutomerOptions: []
                    };
                    var infoType = 'UserName|ChineseName|EnglishName|Nationality|IDType|IDNumber|CardValidUntil|Sex|Birthday|BirthPlace|ContactPhone|CustomerType';
                    $.map(infoType.split('|'), function (v, k) {
                        _ret[v] = '';
                    });
                    $.map(data, function (v, k) {
                        if (v.CustomerInfoItemModel === 1) {
                            _ret[v.CustomerInfoItemType] = v;
                        } else if (v.CustomerInfoItemModel === 2) {
                            if (v.CustomerInfoItemType == 1 && v.Note) { //身份证特殊提示
                                _ret.restrictions = v.Note;
                            }
                            if (!_ret.IDCardType) { //默认的证件类型
                                _ret.IDCardType = v.CustomerInfoItemType;
                            }
                            _ret.idOptions.push(v);

                        } else if (v.CustomerInfoItemModel === 3) {
                            //客户类型
                            if (!_ret.CustomerNoType) { //默认的证件类型
                                _ret.CustomerNoType = v.CustomerInfoItemType;
                            }
                            _ret.cutomerOptions.push(v);
                        }
                    });
                    if (_ret.idOptions.length) this.idCards = _ret.idOptions;
                    if (_ret.cutomerOptions.length) this.customerTypes = _ret.cutomerOptions;
                    return _ret;
                },
                handleData: function (data, customer) {
                    var template = this.handleInfoTemplate(customer);
                    var df = data.OrderPassengerList;
                    var adult = +data.aduNumber;
                    var child = +data.chlidNumber;
                    var _ret = [];
                    var dfData;
                    var me = this;
                    var ptype;
                    var handle = function (type) {
                        var __ret = [];
                        df && $.map(df, function (v) {
                            if (type === 'adult') {
                                if (+v.clientType) {
                                    __ret.push(me.handleHadData(v));
                                }
                            } else {
                                if (!(+v.clientType)) {
                                    __ret.push(me.handleHadData(v));
                                }
                            }
                        });
                        return __ret;
                    };
                    if (adult) {
                        dfData = handle('adult');
                        for (var _i = 0; _i < adult; _i++) {
                            if (dfData[_i]) {
                                _ret.push($.extend(cQuery.copy(template), dfData[_i], {
                                    isAdult: true,
                                    filled: 't'
                                }));
                                me.setTravellerCount(1, true);
                            } else {
                                _ret.push($.extend(cQuery.copy(template), {
                                    isAdult: true,
                                    filled: 'f'
                                }));
                            }
                        }
                    }
                    if (child) {
                        dfData = handle('child');
                        for (var _i = 0; _i < child; _i++) {
                            if (dfData[_i]) {
                                _ret.push($.extend(cQuery.copy(template), dfData[_i], {
                                    isAdult: false,
                                    filled: 't'
                                }));
                                me.setTravellerCount(0, true);
                            } else {
                                _ret.push($.extend(cQuery.copy(template), {
                                    isAdult: false,
                                    filled: 'f'
                                }));
                            }
                        }
                    }
                    return _ret;
                },
                handleBirthDay: function (person) { //确定出行人的出生日期
                    var _ret = null;
                    if (person.birthday) {
                        _ret = person.birthday;
                    } else if (person.IDCardType == 1 && person.IDCardNo) {
                        _ret = self.common.parseCNId(person.IDCardNo).passengerBirth;
                    }
                    return _ret;
                },
                linstenPickFill: function (el, bl) { //监听点选常用联系人bl:填写/清除
                    var index = roles.travellersID.children().index(el);
                    this.instances[index].linstenPickFill(bl);
                },
                bindEvent: function () {
                    var me = this;
                    var nameTips;
                    roles.travellersID.on('click', 'a[role="saveId"]', function () { //是否保存常用联系人
                        $(this).toggleClass('selected');
                    })
                        // .on('click', '[role="name"],[role="nameCN"],[role="nameEnLast"],[role="nameEnFirst"]', function (event) { //输入姓名提示/可选择中英名字
                        //     me.generateSug(this, $(this).attr('role'), nameTips);
                        // })
                        .on('click', 'a[role="clear"]', function () { //清除填写
                            me.fillClear.call(me, $(this).closest('[role="youren"]'));
                        });
                    me.fillin();
                },
                instances: [],
                // generateSug: function (el, role, nameTips) { //姓名提示
                //     nameTips && nameTips.remove();
                //     var _this = $(el);
                //     var offset = _this.offset(),
                //         height = _this.outerHeight(),
                //         id = _this.closest('[role="youren"]').attr('index'),
                //         _obj = id && mod.Commoners.commonersObj[id];
                //     var obj = _obj ? _obj : {}; //取得选定常用联系人的信息
                //     self.render(self.tpl[role + 'Tips'], obj, function (dom) {
                //         nameTips = $(dom).appendTo('body').css({
                //             'position': 'absolute',
                //             'top': offset.top + height,
                //             'left': offset.left
                //         });
                //     }, function () {
                //         nameTips.on('mousedown', '.had', function (event) {
                //             _this.val($(this).find('.name').html());
                //             nameTips.hide();
                //         });
                //         _this.bind('blur', function () {
                //             nameTips && nameTips.remove();
                //         });
                //     });
                // },
                toIns: function () {
                    var me = this;
                    roles.travellersID.children().each(function () {
                        me.instances.push(new Visitor({
                            element: this,
                            departDate: vdata.initData.departDate,
                            returnDate: vdata.initData.returnDate
                        }));
                    });
                },
                getTravellers: function () { //获取填写好的出行人
                    var _oarr = [],
                        _obj;
                    var role = self.common.getRoles(roles.travellersID[0]);
                    role.youren.each(function (idx) {
                        _obj = {}
                        if ($(this).attr('filled') === 'f')
                            return true;
                        var _this = $(this),
                            name;
                        if (_this.attr('filled') === 't') {
                            _obj.clientID = _this.attr('index') || '';
                            if (role.name) {
                                if (role.name[idx].value != $(role.name[idx]).attr('_cqnotice')) {
                                    name = role.name[idx].value;
                                } else {
                                    name = "";
                                }
                            }
                            _obj.name = name;
                            _obj.nameCN = role.nameCN && role.nameCN[idx].value || _obj.name;
                            _obj.nameEN = role.nameEN && role.nameEN[idx].value;
                            _obj.mobileNo = role.mobileNo && role.mobileNo[idx].value;
                        }
                        _oarr.push(_obj);
                    });
                    return _oarr;
                },
                fillin: function () { //手动填写订票信息
                    var roles = vdata.roles;
                    var me = this;
                    var val;
                    var isFilled = function (role) { //是否已经填充
                        for (var i in role) {
                            if (role[i].closest('li').css('display') !== 'none') {
                                val = $.trim(role[i].val());
                                if (val !== '' && role[i][0].tagName.toLowerCase() !== 'select' && val !== role[i].attr('_cqnotice')) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    roles.travellersID.on('change', 'input[type="text"]', function () {
                        var elem = $(this).closest('.product_input');
                        var role = self.common.getRoles(elem[0]);
                        var id;
                        var val = $(this).val();
                        var ptype = elem.attr('ptype');
                        this.setAttribute('value', val); //改变dom元素中value的值
                        if (isFilled(role)) {
                            if (elem.attr('filled') === 't') return;
                            elem.attr({
                                'filled': 't'
                            });
                            me.setTravellerCount(+ptype, true);
                        } else {
                            elem.attr({
                                'filled': 'f'
                            });
                            //更新常用人的选择
                            if (id = elem.attr('index')) {
                                ptype = mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
                                elem.attr({
                                    'index': ''
                                });
                                mod.Commoners && mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                                me.setTravellerCount(+ptype, false);
                            } else {
                                ptype = elem.attr('ptype');
                                me.setTravellerCount(ptype, false);
                            }
                        }
                    });
                },
                fillClear: function () { //清除填写和保存常用联系人
                    var role,
                        wrap,
                        id,
                        ptype,
                        rptype;
                    if (!arguments.length) return;
                    wrap = arguments[0];
                    if (wrap.attr('filled') === 'f') return;
                    id = wrap.attr('index'); //常用联系人id
                    rptype = ptype = wrap.attr('ptype');
                    role = self.common.getRoles(wrap);
                    for (var i in role) { //清除填写
                        if (role[i].attr('role') === 'idCardType' || role[i].attr('role') === 'CustomerType')
                            continue;
                        role[i][0].setAttribute('value', '');
                        role[i].val('')
                    }
                    wrap.attr({
                        index: '',
                        filled: 'f'
                    }); //重置填写标志
                    if (id) {
                        mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                        rptype = mod.Commoners.commonersDom && mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
                    }
                    this.linstenPickFill(wrap, !1);
                    this.setTravellerCount(+rptype, false, ptype);
                },
                setDataLayout: function () {
                    var params = 'PassengerId|Name|CnName|Nationality|Gender|Birthday|HomePlace|MobilePhone|AgeRang';
                    var subpara = 'IdCardType|IdCardNo|PassportType|IdCardValidDate|IssueDate|IssuePlace'
                    var _tbj = {
                        EnName: {
                            "First": "",
                            "Mid": "",
                            "Last": ""
                        },
                        IdCardInfo: {}
                    };
                    $.map(params.split('|'), function (v, k) {
                        if (v == 'Gender') {
                            _tbj[v] = -1;
                        } else {
                            _tbj[v] = '';
                        }
                    });
                    _tbj.Gender = -1;
                    $.map(subpara.split('|'), function (v, k) {
                        if (v == 'IdCardType') {
                            _tbj.IdCardInfo[v] = 0;
                        } else {
                            _tbj.IdCardInfo[v] = '';
                        }

                    });
                    return _tbj;
                },
                setData: function (elem, role) {
                    var role = role || self.common.getRoles(elem);
                    var uid = $(elem).attr('index');
                    var _obj = this.setDataLayout();
                    var _info;
                    _obj.PassengerId = uid ? uid : 0;
                    _obj.AgeRang = +$(elem).attr('ptype');
                    _obj.isSaveTo = role.saveId.hasClass('selected') ? 1 : 0;
                    $.each(role, function (k, v) {
                        var val;
                        if (k !== 'clear' && k !== 'saveId') {
                            val = $.trim(v.val());
                            switch (k) {
                                case 'name':
                                    var tn;
                                    _obj.Name = val === v.attr('_cqnotice') ? '' : val;
                                    if (_obj.Name) {
                                        if (Reg.hasCnChar(_obj.Name)) {
                                            _obj.CnName = _obj.Name;
                                        } else {
                                            tn = _obj.Name.split('/');
                                            if (tn.length > 1) {
                                                _obj.EnName = {
                                                    Last: tn[0],
                                                    First: tn[1] && tn[1].split(/\s+/)[0],
                                                    Mid: tn[1] && tn[1].indexOf(' ') != -1 && tn[1].substring(tn[1].indexOf(' ')) || ''
                                                };
                                            }
                                        }
                                    }
                                    break;
                                case 'nameCN':
                                    _obj.CnName = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'CustomerType':
                                    _obj.CustomerType = val;
                                    break;
                                case 'nameEN':
                                    var tname = val === v.attr('_cqnotice') ? '' : val.split('/');
                                    var mname = (tname && tname[1] && tname[1].split(/\s+/)) || '';
                                    _obj.EnName = {
                                        Last: (tname && tname[0]) || '',
                                        First: mname && mname[0],
                                        Mid: (mname && mname[1]) || ''
                                    };
                                    break;
                                case 'nameEnFirst':
                                    //提交时英文名添加
                                    var tname = val === v.attr('_cqnotice') ? '' : val;
                                    var divideIndex = tname.indexOf(' ');
                                    firstName = (divideIndex != -1 && $.trim(tname.substring(0, divideIndex))) || tname;
                                    midName = (divideIndex != -1 && $.trim(tname.substring(divideIndex)));
                                    _obj.EnName = $.extend(_obj.EnName || {}, {
                                        First: firstName || '',
                                        Mid: midName || ''
                                    });
                                    break;
                                case 'nameEnLast':
                                    //提交时英文姓添加
                                    var tname = val === v.attr('_cqnotice') ? '' : val;
                                    _obj.EnName = $.extend(_obj.EnName || {}, {
                                        Last: tname || ''
                                    });
                                    break;
                                case 'national':
                                    _obj.Nationality = val === v.attr('_cqnotice') ? '' : v.attr('mod_value');
                                    break;
                                case 'gender':
                                    _obj.Gender = val || -1;
                                    break;
                                case 'birthdayY':
                                    _obj.Birthday = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'birthdayM':
                                    _obj.Birthday += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'birthdayD':
                                    _obj.Birthday += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'birthPlace':
                                    _obj.HomePlace = val;
                                    break;
                                case 'idCardType':
                                    _obj.IdCardInfo.IdCardType = val || 0;
                                    break;
                                case 'idCardNo':
                                    _obj.IdCardInfo.IdCardNo = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'cardValidUntilY':
                                    _obj.IdCardInfo.IdCardValidDate = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'cardValidUntilM':
                                    _obj.IdCardInfo.IdCardValidDate += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'cardValidUntilD':
                                    _obj.IdCardInfo.IdCardValidDate += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'mobileNo':
                                    _obj.MobilePhone = val;
                                    break;
                            }
                        }
                    });
                    _obj.IssueDate = '1900-01-01';
                    _obj.IssuePlace = '';
                    if (_obj.IdCardInfo.IdCardType == 2) {
                        _obj.PassportType = 'P';
                    } else {
                        _obj.PassportType = '';
                    }
                    if (_obj.IdCardInfo.IdCardType == 1) {
                        if (_obj.IdCardInfo.IdCardNo.length > 14) {
                            _info = self.common.parseCNId(_obj.IdCardInfo.IdCardNo);
                            _obj.Gender = _info.passengerSex === 'F' ? 1 : 0;
                            _obj.Birthday = _info.passengerBirth;
                        } else {
                            _obj.Gender = -1;
                            _obj.Birthday = '';
                        }
                    }
                    return _obj;
                },
                verify: function () {
                    var _ret = true;
                    var mobile = false;
                    $.each(this.instances, function (k, v) {
                        var arg = v.verify();
                        if (!mobile) {
                            if (!v.role.mobileNo || v.role.mobileNo.val() != '') {
                                mobile = true;
                            }
                        }
                        if (!arg[0]) {
                            if (!self.status.errorElem)
                                self.status.errorElem = arg[1];
                            _ret = false;
                            // return false;
                        }
                    });
                    if (!mobile) {
                        this.instances[0].checkMobileIsNull();
                        if (!self.status.errorElem) {
                            self.status.errorElem = this.instances[0].role.mobileNo[0];
                        }
                        _ret = false;
                        // return false;
                    }
                    if (_ret) {
                        this.save(!0);
                    }
                    return _ret;
                },
                save: function (isSubmit) {
                    var me = this;
                    var elems = isSubmit ? roles.travellersID.children() : roles.travellersID.children('[filled="t"]');
                    self.formData.PassengerInfos.length = 0;
                    elems.each(function () {
                        self.formData.PassengerInfos.push(me.setData(this));
                    });
                },
                setTravellerCount: function (type, isAdd, add) {
                    if (isAdd) {
                        if (type == 0 || (add && add == 0))
                            this.childCount.length++;
                        else if (type == 1 || (add && add == 1))
                            this.adultCount.length++
                        this.travellerCount.length++;
                    } else {
                        if (type == 0 || (add && add == 0))
                            this.childCount.length--;
                        else if (type == 1 || (add && add == 1))
                            this.adultCount.length--
                        this.travellerCount.length--;
                    }
                },
                idCards: [],
                customerTypes: [],
                adultCount: [], //已选择成人个数
                childCount: [], //已选择儿童个数
                travellerCount: [] //已选择的旅客个数
            }
        },
        Commoners: function () { //常用联系人
            var self = this,
                vdata = self.data,
                cache = vdata.cache,
                roles = vdata.roles,
                mod = vdata.modules,
                parseJSON = self.common.parseJSON;
            return {
                commonersObj: {}, //常用联系人数据
                allCommoners: null, //原始的常用联系人
                init: function () {
                    var me = this;
                    if (!vdata.isLogin) {
                        $('#searchID').hide();
                        (mod['Contacter'] = self.Contacter.call(self)).init();
                        return;
                    }
                    self.toggleLoading('commoner', roles.commonersID[0]);
                    self.toggleLoading('contact', roles.linkManID[0]); //联系人
                    self.fetchData({
                        url: vdata.handles.getContacts
                    }, function (data) {
                        var _data, _obj, _ref;
                        data = typeof data === 'string' ? parseJSON(data) : data;
                        _data = data.data;
                        if (_data && _data.ContactLst) {
                            _ref = _data.ContactLst;
                        } else {
                            _ref = null;
                        }
                        (mod['Contacter'] = self.Contacter.call(self)).init(_ref); //调用常用联系人
                        if (!_data || !_data.PassengerLst) {
                            $('#searchID').hide();
                            roles.commonersID.hide();
                            return;
                        }
                        me.allCommoners = data.data;
                        _obj = me.handleData(_data.PassengerLst);
                        var obj = {
                            collecters: _obj
                        };
                        obj.collecters.length && self.render(self.tpl.commoners, obj, function (dom) {
                            roles.commonersID.html(dom);
                            me.bindEvent.call(me);
                            me.commonersDom = roles.commonersID.children();
                        });
                        self.toggleLoading('commoner');
                        me.search();
                    })
                },
                handleData: function (_data) { //处理数据以供渲染
                    var me = this;
                    var oBirth = new Birth('', vdata.initData.departDate);
                    var dfMan = vdata.initData.OrderPassengerList;
                    var _ref = [];
                    var age;
                    if (dfMan) {
                        $.map(dfMan, function (v, k) {
                            _ref.push(v.clientID);
                        });
                    }
                    $.map(_data, function (v, k) {
                        if (_ref.length) {
                            if ($.inArray(v.clientID, _ref) !== -1)
                                _data[k].selected = true;
                        }
                        age = me.handleBirthDay(v);
                        if (age) {
                            if (oBirth.isChild(age)) {
                                _data[k].ptype = 0;
                            } else {
                                _data[k].ptype = 1;
                            }
                        } else {
                            _data[k].ptype = 3;
                        }
                        me.commonersObj[v.clientID] = _data[k];
                    });
                    return _data;
                },
                handleBirthDay: function (person) { //确定出行人的出生日期
                    var _ret = null;
                    if (person.birthday) {
                        _ret = person.birthday;
                    } else if (person.IDCardInfo) {
                        $.each(person.IDCardInfo, function (k, v) {
                            if (v.IDCardType == 1) {
                                _ret = v.IDCardNo;
                                return false;
                            }
                        });
                        if (_ret) {
                            _ret = self.common.parseCNId(_ret).passengerBirth;
                        }
                    }
                    return _ret;
                },
                search: function () { //常用联系人搜索
                    var me = this;
                    var _obj = me.commonersObj;
                    var _lis = roles.commonersID.find('li');
                    roles.searchID.length && roles.searchID.bind('keyup', function (event) {
                        var tempObj = [];
                        var val = $.trim($(this).val()).toLowerCase();
                        var i = 0;
                        if (!val) { //恢复全部
                            _lis.show();
                            return false;
                        }
                        _lis.hide();
                        $.each(_lis, function () {
                            var _ref = _obj[$(this).attr('cid')];
                            var name = ((_ref.nameCN + (_ref.ENLastName + _ref.ENFirstName + _ref.ENMiddleName)) || '').toLowerCase();
                            if (name.indexOf(val) != -1) {
                                $(this).show();
                            }
                        });
                    });
                },
                bindEvent: function () { //点选出行人
                    var me = this;
                    if (!roles.travellersID.children().length) return;
                    roles.fillsetID.on('click', '[role="topContact"]', function (event) { //?=====
                        event.preventDefault();
                        var bl = $(this).hasClass('selected');
                        me.fillVisitor(this, bl);
                        me.commonersDom = roles.commonersID.children(); //更新常用联系人dom
                    });
                },
                checkFullNNT: function (type) { //检查人数是否已满
                    var count = mod.Travellers[type + 'Count'].length;
                    if (type === 'adult') {
                        return count >= vdata.initData.aduNumber;
                    } else if (type === 'child') {
                        return count >= vdata.initData.chlidNumber;
                    } else {
                        return count >= vdata.initData.aduNumber + vdata.initData.chlidNumber;
                    }
                },
                showTip: function (el, obj, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: obj,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                fillVisitor: function (el, bl) { //填充及清除出行人信息
                    var _this = $(el);
                    var me = this;
                    var id = $(el).attr('cid');
                    var target = $(el).children('span');
                    var abled, role, isFull = false;
                    var ptype = _this.attr('ptype');
                    var msg = ['儿童人数已满', '成人人数已满', '旅客中没有儿童', '旅客已满'];
                    var data = ptype;
                    var add;
                    if (ptype === '0') {
                        isFull = me.checkFullNNT('child');
                        if (!vdata.initData.chlidNumber) {
                            data = 2;
                        }
                    } else if (ptype === '1') {
                        isFull = me.checkFullNNT('adult');
                    } else {
                        isFull = me.checkFullNNT('traveller');
                        data = 3;
                    }
                    if (!bl) {
                        if (isFull) {
                            this.showTip(roles.commonersID[0], target[0], msg[data], {
                                errorClass: '',
                                isAutoHide: true
                            });
                            return;
                        }
                        _this.addClass('selected');
                        if (ptype !== '3') {
                            abled = roles.travellersID.find('[filled="f"][ptype="' + ptype + '"]').eq(0);
                        } else {
                            abled = roles.travellersID.find('[filled="f"]').eq(0);
                            add = abled.attr('ptype');
                        }
                        role = self.common.getRoles(abled);
                        abled.attr({
                            'index': id,
                            'filled': 't'
                        });
                        this.setValue(role, id);
                        mod.Travellers.setTravellerCount(+ptype, true, add);
                        mod.Travellers.linstenPickFill(abled, !0);
                    } else {
                        _this.removeClass('selected');
                        abled = roles.travellersID.find('[index=' + id + ']');
                        mod.Travellers.fillClear.call(mod.Travellers, abled); //清除填写及标志
                        mod.Travellers.linstenPickFill(abled, !1);
                    }
                },
                setValue: function (role, id) {
                    var me = this;
                    var limitedTime = [];
                    var obj = me.commonersObj[id];
                    var birthday = obj.birthday ? obj.birthday.split('-') : [];
                    var val = "",
                        idcard = '';
                    $.each(role, function (k, v) {
                        if (v.attr('role') === 'name') {
                            if (obj.nameCN) {
                                val = obj.nameCN;
                            } else if (obj.ENFirstName) {
                                val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
                            } else {
                                val = "";
                            }
                        } else if (v.attr('role') === 'nameEN') {
                            if (obj.ENFirstName) {
                                val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'nameEnFirst') {
                            if (obj.ENFirstName) {
                                val = obj.ENFirstName;
                                if (obj.ENMiddleName) {
                                    val += ' ' + obj.ENMiddleName
                                }
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'nameEnLast') {
                            if (obj.ENFirstName) {
                                val = obj.ENLastName;
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'national') {
                            if (obj.national) {
                                val = vdata.nationalData[obj.national];
                                v.attr('mod_value', obj.national);
                            } else {
                                val = '';
                                v.attr('mod_value', '');
                            }
                        } else if (v.attr('role') === 'idCardType') {
                            var va = v.val();
                            var ids = me.checkIdcard(id, va);
                            if (ids) {
                                v.val(va = ids.IDCardType);
                                idcard = ids.IDCardNo;
                                limitedTime = ids.IDCardTimelimit ? ids.IDCardTimelimit.split('-') : [];
                            }
                            val = va;
                        } else if (v.attr('role') === 'CustomerType') {
                            var va = v.val();
                            if (obj.CustomerType && me.checkCustomers(obj.CustomerType)) {
                                v.val(va = obj.CustomerType);
                            }
                            val = va;
                        } else if (v.attr('role') === 'idCardNo') {
                            val = idcard;
                        } else if (v.attr('role') === 'cardValidUntilY') {
                            val = limitedTime[0] || '';
                        } else if (v.attr('role') === 'cardValidUntilM') {
                            val = limitedTime[1] || '';
                        } else if (v.attr('role') === 'cardValidUntilD') {
                            val = limitedTime[2] || '';
                        } else if (v.attr('role') === 'birthdayY') {
                            val = birthday[0] || '';
                        } else if (v.attr('role') === 'birthdayM') {
                            val = birthday[1] || '';
                        } else if (v.attr('role') === 'birthdayD') {
                            val = birthday[2] || '';
                        } else if (v.attr('role') === 'birthPlace') {
                            val = obj.HomePlace !== null ? obj.HomePlace : '';
                        } else {
                            val = obj[k] !== null ? obj[k] : '';
                        }
                        v.val(val);
                        v[0].setAttribute('value', val);
                    });
                },
                checkCustomers: function (customerType) {
                    var initData = vdata.initData.CustomerInfoTemplate.CustomerInfoItems
                    for (var i = 0, len = initData.length; i < len; i++) {
                        if (initData[i].CustomerInfoItemModel === 3 && initData[i].CustomerInfoItemType == customerType) {
                            return true;
                        }
                    }
                    return false;
                },
                checkIdcard: function (id, type) {
                    var ids = this.commonersObj[id].IDCardInfo;
                    var cards = mod.Travellers.idCards;
                    var _ref = {};
                    var _ret;
                    if (!ids || !cards.length) return false;
                    $.map(cards, function (v, k) {
                        _ref[v.CustomerInfoItemType] = v;
                    });
                    if (type) {
                        $.map(ids, function (v, k) {
                            if (v.IDCardType == type) {
                                _ret = v;
                                return false;
                            }
                        })
                    } !_ret && $.map(ids, function (v, k) {
                        if (v.IDCardType in _ref) {
                            _ret = v;
                            return false;
                        }
                    })
                    return _ret;
                },
                removeCommonerSelected: function (id) { //去除常用联系人的选择
                    var commoners = this.commonersDom;
                    if (!commoners) return;
                    commoners.find('a.cb-item[cid="' + id + '"]').removeClass('selected'); //找到对应的常用联系人并取消选择
                }
            }
        },
        Contacter: function () { //联系人
            var self = this,
                vdata = self.data,
                mod = vdata.modules,
                roles = vdata.roles,
                oValidate = self.validate,
                oLinkman = vdata.initData.orderLinkMan || {},
                oBoard, isEmpty,
                Reg = self.Reg;
            return {
                init: function (data) {
                    var me = this;
                    me.commonContacters = {};
                    self.toggleLoading('contact');
                    this.commonContact = data ? data : null;
                    if (this.commonContact) {
                        $.map(this.commonContact, function (v, k) {
                            me.commonContacters[v.InfoID] = v;
                        })
                    }
                    if ($.isEmptyObject(oLinkman) && data) {
                        oLinkman = this.handleData(data);
                    }
                    if (vdata.initData.IsVisa) {
                        //添加验证邮件是否是签证页面
                        $.extend(oLinkman, { IsVisa: vdata.initData.IsVisa });
                    }
                    if (isEmpty = !$.isEmptyObject(oLinkman)) {
                        self.render(self.tpl.linkmanDf, oLinkman, function (dom) {
                            roles.linkManID.append(dom);
                        });
                        self.formData.ContactInfo = me.setData(oLinkman);
                    }
                    self.render(self.tpl.linkmanBox, oLinkman, function (dom) {
                        var tlin = $(dom).appendTo(roles.linkManID).hide();
                        !isEmpty && tlin.show();
                    });
                    $.extend(roles, self.common.getRoles(roles.linkManID));
                    this.bindEvent();
                    this.bindVerifyEvent();
                },
                handleData: function (data) {
                    var _ret = {};
                    if (data) {
                        _ret = {
                            name: data[0].ContactName || '',
                            email: data[0].Email || '',
                            mobileNo: data[0].Moblie || '',
                            telNo: data[0].Tel.replace('*', '-')
                        };
                    }
                    return _ret;
                },
                setData: function (data) {
                    return {
                        ContactName: data.name,
                        ContactEmail: data.email,
                        ContactMobile: data.mobileNo,
                        ContactTel: data.telNo
                    };
                },
                fill: function (name, email, phone, tel) {
                    var t;
                    roles.ctname[0].value = name;
                    roles.ctemail[0].value = email;
                    if (phone) {
                        roles.ctmphone[0].value = phone;
                    } else {
                        roles.ctmphone[0].value = '';
                    }
                    if (tel) {
                        t = tel.split('-');
                        roles.ctzcode[0].value = t[0];
                        roles.cttphone[0].value = t[1];
                        roles.ctext[0].value = t[2] || '';
                    } else {
                        roles.ctzcode[0].value = '';
                        roles.cttphone[0].value = '';
                        roles.ctext[0].value = '';
                    }
                },
                initSug: function () {
                    var oc = this.commonContact;
                    var ob = this.oBoard = mod.Travellers.getTravellers();
                    var oca = [],
                        sug = '',
                        _i = 0;
                    oc && $.each(oc, function (k, v) {
                        if (_i > 5) return false;
                        oca.push(v);
                        _i++;
                    });
                    if (oc || ob.length) {
                        sug = self.render(self.tpl.linkerSug, {
                            common: oca.length ? oca : '',
                            board: ob.length ? ob : ''
                        });
                    }
                    return sug;
                },
                bindEvent: function () {
                    var sugg;
                    var me = this;
                    var logTip;
                    roles.contact.on('click', 'input[role="ctname"]', function () {
                        var offset = $(this).offset();
                        var height = $(this).outerHeight();
                        var sug = me.initSug();
                        $('.person_content').remove();
                        if (sug) {
                            sugg = $(sug).appendTo('body').css({
                                'position': 'absolute',
                                'top': offset.top + height,
                                'left': offset.left,
                                'zIndex': '100'
                            });
                            sugg.on('mousedown', 'a', function (event) {
                                var uid = $(this).attr('uid');
                                var index = $(this).attr('index');
                                var ref;
                                var obj = (function () {
                                    if (uid) {
                                        ref = me.commonContacters[uid];
                                        return {
                                            name: ref.ContactName,
                                            email: ref.Email,
                                            mobileNo: ref.Moblie,
                                            tel: ref.Tel ? ref.Tel.replace('*', '-') : ''
                                        }
                                    } else {
                                        return me.oBoard[index];
                                    }
                                }());
                                var name = obj.name || obj.nameCN || obj.nameEN || '';
                                var email = obj.email || '';
                                var phone = obj.mobileNo || '';
                                var tel = obj.tel || '';
                                me.fill(name, email, phone, tel);
                            });
                            $(this).bind('blur', function () {
                                sugg && sugg.hide();
                            });
                        }
                    });
                    roles.linkManID.on('click', 'a.revise', function (event) {
                        event.preventDefault();
                        $(this).closest('ul').hide();
                        roles.contact.show();
                    });
                },
                bindVerifyEvent: function () {
                    var me = this;
                    roles.contact.on('blur', 'input[type="text"]', function () {
                        me.errTip(this);
                    });
                },
                errTip: function (el) {
                    var _el = $(el),
                        val = $.trim(_el.val()),
                        reg = _el.attr('regex'),
                        ovalid = _el.data('valid'),
                        ret = false,
                        type = reg === 'checkPhone' ? _el.attr('role').slice(2) : '';
                    bl = this[reg](val, type);
                    if (reg === 'checkMobile' && val === '')
                        return true;
                    if (reg === 'checkPhone' && val === '')
                        return true;
                    if (!bl[0]) {
                        ovalid = this.showTip(ovalid, el, bl[1]);
                    } else {
                        ovalid && ovalid.hide();
                        ret = true;
                        if (bl[1]) {
                            ovalid = this.showTip(ovalid, el, bl[1], {
                                errorClass: ''
                            });
                        }
                    }
                    _el.data('valid', ovalid);
                    return ret;
                },
                showTip: function (valid, target, data, opts) {
                    opts = opts || {};
                    return valid ? valid.show($.extend({
                        target: target,
                        data: data
                    }, opts)) :
                        new oValidate($.extend({
                            target: target,
                            data: data
                        }, opts)).show();
                },
                save: function () {
                    var role = self.common.getRoles(roles.linkManID);
                    var zcode = $.trim(role.ctzcode.val()),
                        tphone = $.trim(role.cttphone.val()),
                        ext = $.trim(role.ctext.val());
                    var tel = (function () {
                        if (zcode && zcode !== role.ctzcode.attr('_cqnotice')) {
                            tphone = (tphone && tphone !== role.cttphone.attr('_cqnotice')) ? '-' + tphone : '';
                            ext = (tphone && ext) ? '-' + ext : '';
                            return zcode + tphone + ext;
                        }
                        return '';
                    }());
                    self.formData.ContactInfo = {
                        "ContactName": role.ctname.val(),
                        "ContactMobile": role.ctmphone.val(),
                        "ContactTel": tel,
                        "ContactEmail": role.ctemail.val()
                    };
                },
                checkName: function (str) {
                    var bl;
                    if ('' === str)
                        return [false, '请填写联系人姓名'];
                    if (Reg.hasCnChar(str)) {
                        if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
                            return [false, '中文姓名只能包含汉字、字母和连字符，请检查'];
                    } else {
                        if (!Reg.isEnName(str) || /[^a-zA-Z. \/'-]/.test(str)) {
                            return [false, '请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King'];
                        }
                    }
                    return [true, ];
                },
                checkEmail: function (str) {
                    if ('' === str)
                        return [false, '请填写您的E-mail地址'];
                    if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str))
                        return [false, '请填写正确的E-mail地址，格式：a@b.c'];
                    return [true, ];
                },
                checkMobile: function (str) {
                    // if ('' === str)
                    //     return [false, '手机号码或联系电话至少选填一项'];
                    // if (!/^0?1[3458]\d{9}$/.test(str))
                    //     return [false, '您填写的手机号码有误，请重新填写'];
                    if (str === '' && ($('#notice3').val() === '')) {
                        return [false, '手机号码或联系电话至少选填一项'];
                    } else if (str && !/^0?1[34578]\d{9}$/.test(str)) {
                        return [false, '您填写的手机号码有误，请重新填写'];
                    }
                    return [true, ];
                },
                checkPhone: Reg.checkPhone,
                verify: function () {
                    var me = this;
                    var status = self.status;
                    var error = 0;
                    var _data = {};
                    var bl;
                    var ovalid;
                    var phoneVal = '';
                    var isPhoneFilled = function () {
                        var bl = false;
                        var el, val;
                        $.map(['ctzcode', 'cttphone', 'ctext'], function (v, k) {
                            el = roles[v];
                            val = $.trim(el.val());
                            if (val !== '' && val !== el.attr('_cqnotice')) {
                                bl = true;
                                return false;
                            }
                        })
                        return bl;
                    };
                    // if (roles.contact[0].style.display !== 'block') return true;
                    var elems = [roles.ctname, roles.ctemail];
                    var ext;
                    if (isPhoneFilled()) {
                        elems.push(roles.ctzcode, roles.cttphone, roles.ctext);
                        if (!!roles.ctmphone[0].value) {
                            elems.push(roles.ctmphone);
                        }
                        ext = $.trim(roles.ctext.val());
                        phoneVal = $.trim(roles.ctzcode.val()) + '-' + $.trim(roles.cttphone.val()) + (ext !== roles.ctext.attr('_cqnotice') && ext !== '' ? '-' + roles.ctext.val() : '')
                    } else {
                        elems.push(roles.ctmphone);
                    }
                    $.each(elems, function (k, v) {
                        ovalid = v.data('valid');
                        bl = me[v.attr('regex')]($.trim(v.val()), v.attr('role').slice(2));
                        if (!bl[0]) {
                            error++;
                            ovalid = me.showTip(ovalid, v[0], bl[1]);
                            if (!status.errorElem) {
                                status.errorElem = v[0];
                            }
                            v.data('valid', ovalid);
                            return false;
                        } else {
                            if (status.errorElem === v[0]) {
                                status.errorElem = null;
                            }
                            if (bl[1]) {
                                ovalid = me.showTip(ovalid, v[0], bl[1], {
                                    errorClass: ''
                                });
                                v.data('valid', ovalid);
                            }
                        }
                    });
                    if (!error) {
                        self.formData.ContactInfo = {
                            ContactName: roles.ctname.val(),
                            ContactEmail: roles.ctemail.val(),
                            ContactMobile: roles.ctmphone.val(),
                            ContactTel: phoneVal
                        };
                    }
                    return !error;
                }
            }
        },
        Price: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles;
            return {
                init: function () {
                    var data;
                    var me = this;
                    var coupon = vdata.initData.availablePromotion;
                    if (data = vdata.initData.price) {
                        vdata.Amount = data.Amount + data.DiscountAmount - parseInt(data.Freight);
                        vdata.postage = parseInt(data.Freight);
                        if (coupon && coupon.SelectedPromotion) {
                            vdata.couponPrice = data.DiscountAmount - Math.abs(parseInt(coupon.SelectedPromotion.ReducedAmount));
                        } else {
                            vdata.couponPrice = data.DiscountAmount;
                        }
                        if (data.ChildNumber) {
                            data.ChildAmount = Math.ceil(data.ChildAmount / data.ChildNumber);
                        }
                        if (data.AduNumber) {
                            data.AduAmount = Math.ceil(data.AduAmount / data.AduNumber);
                        }
                        data.isTempSave = vdata.EnableTemporarySave || !vdata.isQuickLogin ? true : false;
                        if (GV.app.order.vars.initData.OrderType.indexOf("CruiseOrder") != -1) {
                            self.render(self.tpl.priceCur, $.extend(data, {
                                ChatUrl: vdata.initData.ChatUrl
                            }), function (dom) {
                                roles.priceID.append(dom);
                                me.setPos();
                                $.extend(roles, self.common.getRoles(roles.priceID));
                                me.showTelTip();
                            });
                            var cur_Total = $("#cur_Total").html();
                            var cur_Per = $("#cur_Per").html().substr(0, 1);
                            var cur_Num = Math.ceil(parseInt(cur_Total) / parseInt(cur_Per));
                            $("#tar_Num").html(cur_Num);
                        } else {
                            self.render(self.tpl.price, $.extend(data, {
                                ChatUrl: vdata.initData.ChatUrl
                            }), function (dom) {
                                roles.priceID.append(dom);
                                me.setPos();
                                $.extend(roles, self.common.getRoles(roles.priceID));
                                me.showTelTip();
                            });
                        }
                    }
                    self.totalPrice.call(self);
                    if (GV.app.order.vars.initData.Alternative != "B") {
                        $('#J_tmpriceorder').show();
                    };
                    if (!(vdata.ProductCategoryType && vdata.ProductCategoryType.toLowerCase() === 'visa')) {
                        $('#J_online_service').show();
                    }
                },
                showTelTip: function () {
                    var initDataObject = GV.app.order.vars.initData;
                    if (initDataObject.hasOwnProperty("Hotline") && initDataObject.Hotline.length > 0) {
                        var sHotLineValue = initDataObject.Hotline;
                        if (sHotLineValue.length > 0) {
                            $("#js_telTrefer").html(sHotLineValue.toString());
                            $("#J_tab_hot_phone").show();
                        }
                    }
                },
                setPos: function () {
                    var obj = document.getElementById("price_box_wrap");
                    var getTop = function (e) {
                        var offset = e.offsetTop;
                        if (e.offsetParent != null) {
                            offset += getTop(e.offsetParent)
                        };
                        return offset;
                    }
                    var top = getTop(obj);
                    var isIE6 = /msie 6/i.test(navigator.userAgent);
                    window.onscroll = function () {
                        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        if (bodyScrollTop > top) {
                            obj.style.position = (isIE6) ? "absolute" : "fixed";
                            obj.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
                        } else {
                            obj.style.position = "static";
                        }
                    }
                }
            };
        },
        Invoice: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles,
                mod = vdata.modules;
            return {
                invoiceInfo: {
                    title: '',
                    content: ''
                },
                init: function () {
                    var me = this;
                    var data = vdata.initData.Invoice;
                    var initData = (function () { //初始化发票信息
                        var _data = vdata.initData.OrderInvoice;
                        var _ret = {};
                        if (_data) {
                            $.each(_data, function (k, v) {
                                if (v)
                                    _ret['init' + k] = v;
                            })
                        }
                        return _ret;
                    }());
                    if (!data) {
                        roles.invoiceID.hide();
                        return;
                    }
                    self.render(self.tpl.invoiceDf, initData, function (dom) {
                        roles.invoiceID.append(dom);
                    });
                    self.render(self.tpl.invoiceBox, $.extend(data, initData), function (dom) {
                        $(dom).appendTo(roles.invoiceID).hide();
                        me.role = self.common.getRoles(roles.invoiceID);
                        me.bindEvent($.isEmptyObject(initData), initData);
                    });
                },
                bindEvent: function (isNoInit, data) { //isNoInit 没有初始化数据
                    var me = this;
                    var role = this.role;
                    var myInvoices;
                    var sug;
                    roles.invoiceID.on('click', 'a.revise', function (event) {
                        event.preventDefault();
                        $(this).closest('ul').hide();
                        role.selectInvo.click();
                        role.invoice.show();
                    })
                        .on('blur', 'input[role="getInvoice"]', function () {
                            me.checkInvoiceTitle();
                        });
                    if (!isNoInit) {
                        me.invoiceInfo = {
                            title: data.initTitle,
                            content: data.initContent
                        };
                    }
                    role.selectInvo.click(function () {
                        // ie9强制再选择是按钮
                        $('#invoice01').attr('checked', true);
                        role.invoiceli.show();
                        mod.Delivery.hideTip();
                        mod.Delivery.toRender('invoice');
                        if (GV.app.order.vars.InvoiceCaption) {
                            $('#J_invoiceTip').text(GV.app.order.vars.InvoiceCaption).show();
                        }
                    });
                    role.cancelInvo.click(function () {
                        role.invoiceli.hide();
                        mod.Delivery.hideTip();
                        mod.Delivery.toRender('noInvoice');
                        me.invoiceInfo = {
                            title: '',
                            content: ''
                        };
                        role.getInvoice.data('valid') && role.getInvoice.data('valid').hide();
                        $('#J_invoiceTip').hide();
                    });
                    if (myInvoices = vdata.initData.Invoice.MyInvoices) {
                        sug = me.genarateSug(myInvoices);
                        role.getInvoice.bind('focus', function () {
                            var _this = $(this);
                            var offset = _this.offset();
                            sug.show().css({
                                top: offset.top + _this.outerHeight(),
                                left: offset.left
                            });
                            sug.find('a').bind('mousedown', function () {
                                _this.val($(this).html());
                            });
                        }).bind('blur', function () {
                            sug.hide();
                        });
                    }
                },
                genarateSug: function (data) {
                    var _ret;
                    self.render(self.tpl.ivoiceSug, {
                        list: data
                    }, function (dom) {
                        _ret = $(dom).appendTo('body').css({
                            'position': 'absolute',
                            'display': 'none'
                        });
                    });
                    return _ret;
                },
                save: function () {
                    if (!vdata.initData.Invoice) {
                        return;
                    }
                    var role = this.role;
                    var idx = role.invoiceDetail.val();
                    var detail = $.trim(role.getInvoice.val());
                    if (detail && role.selectInvo.prop('checked')) {
                        this.invoiceInfo = {
                            title: $.trim(role.getInvoice.val()),
                            content: role.invoiceDetail.find("option:selected").text()
                        };
                    }
                    self.formData.InvoiceInfo = {
                        Title: this.invoiceInfo.title,
                        Detail: this.invoiceInfo.content
                    };
                },
                showTip: function (el, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                checkInvoiceTitle: function () {
                    var el = this.role.getInvoice;
                    if (!el) {
                        return false;
                    }
                    var val = $.trim(el.val());
                    if ('' === val) {
                        this.showTip(el[0], '请填写发票抬头');
                        return false;
                    }
                    if (val === '个人' || val === '公司' || val === '待定') {
                        this.showTip(el[0], '发票抬头必须为个人姓名或者公司名称');
                        return false;
                    }
                    return true;
                },
                verify: function () {
                    var me = this;
                    if (!me.role) {
                        return true;
                    }
                    var el = me.role.getInvoice;
                    var idx;
                    if (me.role.invoice.css('display') !== 'none') {
                        if (me.role.selectInvo.prop('checked')) {
                            if (!me.checkInvoiceTitle()) {
                                if (!self.status.errorElem) {
                                    self.status.errorElem = el[0];
                                }
                                return false;
                            } else {
                                me.save();
                                return true;
                            }
                        }
                    } else {
                        me.save();
                        return true;
                    }
                }
            }
        },
        Delivery: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles
            msg = {
                recipient: '请填写收件人',
                contactTel: '请填写联系电话',
                selectCity: '请选择城市',
                detail: '请填写正确的地址',
                postage: '请填写邮编',
                contactTelErr: '请填写正确的联系电话',
                postageErr: '请填写正确的邮政编码，邮政编码格式为六位数字'
            };
            return {
                commonInCityAddr: {}, //已保存常用的地址
                commonEMSAddr: {}, //已保存常用的地址
                postage: {}, //配送方式的费用
                Cantons: {}, //配送城市的行政区
                tabType: null,
                init: function () {
                    var _data = vdata.initData.OrderInvoice; //是否默认有发票
                    _data ? this.toRender('invoice') : this.toRender('noInvoice');
                    this.bindEvent();
                },
                toRender: function (type) {
                    var me = this;
                    var data = me.handleData(vdata.initData.DeliveryReult);
                    var isEmpty = true;
                    var _initData = vdata.initData.OrderDelivery;
                    var selectTab = (_initData && me.tabType) ? me.tabType[_initData.DeliveryType] - 1 : 0;
                    var curTabType;
                    var handle = function (data) {
                        var addr = {
                            1: '市内配送',
                            2: '市内自取',
                            3: 'EMS邮递',
                            4: '免费平邮',
                            5: '顺丰配送'
                        };
                        data.psType = addr[data.DeliveryType];
                        data.Canton = (data.CantonID && me.Cantons[data.CantonID]) ? me.Cantons[data.CantonID].Value : '';
                        if (data.DeliveryType == 3) {
                            data.noCity = 0;
                        } else {
                            data.noCity = 1;
                        }
                        return data;
                    };
                    me.toCity = data.CityName || '';
                    roles.deliveryID.empty();
                    if (_initData) {
                        _initData.AddressInfo.Address = unescape(_initData.AddressInfo.Address);
                        _initData.AddressInfo.Recipient = unescape(_initData.AddressInfo.Recipient);
                        self.render(self.tpl.deliveryDf, handle(_initData), function (dom) {
                            roles.deliveryID.append(dom).parent().show();
                            isEmpty = false;
                        });
                    }
                    if (!data[type]) {
                        roles.deliveryID.parent().hide();
                        me.countPostage();
                        return;
                    } else {
                        roles.deliveryID.parent().show();
                    }
                    self.render(self.tpl.deliveryBox, $.extend(data, data[type]), function (dom) {
                        var html = $(dom).appendTo(roles.deliveryID);
                        !isEmpty && html.hide();
                        cQuery.mod.load('tab', '1.2', function () {
                            var config = {
                                options: {
                                    index: selectTab,
                                    tab: "li",
                                    panel: "#content>div",
                                    trigger: "click",
                                    save: true
                                },
                                style: {
                                    tab: ['cur', ''],
                                    panel: {
                                        display: ['block', 'none']
                                    }
                                },
                                listeners: {
                                    initEventCallback: function () {
                                        curTabType = $('li[class="cur"]', '#tabs').attr('type');
                                        me.countPostage(curTabType); //暂时
                                        cities.init({
                                            id: '#cities',
                                            type: 'select'
                                        });
                                        cities.init({
                                            id: '#cities_p',
                                            type: 'select'
                                        });
                                    }
                                }
                            };
                            var ins = cQuery('#tabs').regMod('tab', '1.2', config);
                        });
                        cQuery('.cqsy').length && cQuery('.cqsy').regMod('notice', '1.0', {
                            name: '.cqsy',
                            tips: cQuery('.cqsy').attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                    $('#content').children().each(function (i) {
                        $(this).children().eq(0).addClass('tab_0' + i);
                    });
                    
                    // 配送区块切换 除自取
                    $('#content').delegate('.usual_address_list li','click', function(){
                      var cnt = $(this).closest('ul');
                      cnt.find('li').removeClass('usual_address_item_selected');
                      cnt.find('input').prop('checked', false);
                      $(this).addClass('usual_address_item_selected');
                      $(this).find('input:radio').prop('checked', true);
                    });

                    // 自取区块切换
                    $('#content').delegate('.select_address_list li','click', function(){
                      var cnt = $(this).closest('ul');
                      cnt.find('li').removeClass('cur');
                      cnt.find('input').prop('checked', false);
                      $(this).addClass('cur');
                      $(this).find('input:radio').prop('checked', true);
                    });
                },
                countPostage: function (i) {
                    vdata.postage = i ? this.postage[i] : 0;
                    self.totalPrice();
                },
                bindEvent: function () {
                    var me = this;
                    var selected;
                    var reg;
                    var role;
                    roles.deliveryID.on('click', '[role="new"]', function (event) {
                        event.preventDefault();
                        var parent = $(this).parent();
                        var next = parent.next();
                        var prev = parent.prev();
                        var bl = prev.attr('role') === 'addressList';
                        role = self.common.getRoles('.hide_options');
                        if (bl) {
                            selected = prev.find('input:checked');
                        }
                        if (next[0].style.display !== 'none') {
                            next.hide();
                            prev.find('input:first').prop('checked', true).closest('li').addClass('cur');
                        } else {
                            next.show();
                            if (selected) {
                                selected.prop('checked', false).closest('li').removeClass('cur');
                            }
                        }
                        me.hideTip();
                    })
                        .on('click', '[role="other"]', function (event) {
                            event.preventDefault();
                            var index = +$(this).closest('.delivery').attr('type');
                            var name = $(this).closest('.delivery').attr('type');
                            var MyAddress = index == 1 ? vdata.initData.DeliveryReult.InCityDelivery.slice(3) : vdata.initData.DeliveryReult.MyEMSAddress.slice(3);
                            var tpl = index == 1 ? self.tpl.inCityAddress : self.tpl.allAdress;
                            role = self.common.getRoles('.hide_options');
                            self.render(tpl, {
                                obj: MyAddress,
                                CityName: me.toCity,
                                radioName: 'radio' + index
                            }, function (dom) {
                                var _role;
                                $(dom).appendTo('body');
                                _role = self.common.getRoles('#mask_popup');
                                cQuery('#mask_popup').mask();
                                $('#mask_popup').find('input:first').attr('checked', true);
                                _role.close.click(function (event) {
                                    event.preventDefault();
                                    cQuery('#mask_popup').unmask();
                                    $('#mask_popup').remove();
                                });
                                me.selectAddress(_role, index, 'radio' + name);
                            });
                            me.hideTip();
                        })
                        .on('click', 'a.revise', function (event) {
                            event.preventDefault();
                            $(this).closest('ul').hide().next().show();
                        }).on('click', '#cities,#cities_p', function () {
                            $(this).data('valid') && $(this).data('valid').hide();
                        })
                        .on('blur', 'input[type="text"]', function () {
                            if (reg = $(this).attr('regex')) {
                                me[reg]($.trim($(this).val()), this);
                            }
                        })
                        .on('click', 'li[role="tab"] a', function (event) {
                            event.preventDefault();
                            var tab = $(this).attr('type');
                            me.countPostage(tab);
                            self.removeValidate();
                        })
                        .on('click', 'input[type="radio"]', function () {
                            var parent = $(this).closest('div.delivery');
                            $(this).closest('li').addClass('cur').siblings().removeClass('cur');
                            parent.find('div.hide_options').hide();
                            me.hideTip();
                        });
                },
                defaultData: function () {
                    var _initData = vdata.initData.OrderDelivery;
                    if (_initData) {
                        this.setData({
                            DeliverType: _initData.DeliveryType,
                            AddresseeName: _initData.AddressInfo.Recipient || '',
                            ContactTel: _initData.AddressInfo.Mobile || _initData.AddressInfo.MobileTel || '',
                            Address: _initData.AddressInfo.Address || '',
                            PostCode: _initData.AddressInfo.Post || '',
                            CantonID: _initData.AddressInfo.CantonID || 0
                        });
                        return true;
                    }
                    return false;
                },
                hideTip: function (role) {
                    var role = role || self.common.getRoles('.hide_options');
                    !$.isEmptyObject(role) && $.each(role, function (k, v) { //清除提示
                        if ($(v).data('valid')) {
                            $(v).data('valid').hide();
                        }
                    });
                },
                selectAddress: function (_role, _i, name) {
                    var me = this;
                    var role = self.common.getRoles(roles.deliveryID);
                    var tpl1 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>';
                    var tpl2 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked">{{toCity}} {{CityName}} {{CantonName}} {{Address}} {{Post}}</label></li>';
                    var tpl = _i == 1 ? tpl2 : tpl1;
                    var address = _i == 1 ? me.commonInCityAddr : me.commonEMSAddr;
                    $('#mask_popup').on('click', 'input', function () {
                        $("input[name='radio'][checked]", '#mask_popup').attr('checked', false);
                        $(this).attr('checked', true);
                    });
                    _role.confirm.unbind('click');
                    _role.confirm.click(function (event) {
                        event.preventDefault();
                        var index = $("input[type='radio']:checked", '#mask_popup').attr('index');
                        var wrap
                        self.render(tpl, $.extend(address[index], {
                            toCity: me.toCity,
                            index: index
                        }), function (dom) {
                            wrap = $(role.addressList).filter('[type="' + _i + '"]');
                            wrap.find('li.add').remove();
                            wrap.find('input:checked').prop('checked', false);
                            wrap.prepend(dom);
                            wrap.nextAll('div.hide_options').hide();
                            wrap.find('li').first().addClass('cur').siblings().removeClass('cur');
                            cQuery('#mask_popup').unmask();
                            $('#mask_popup').remove();
                        });
                    });
                },
                handleData: function (data) {
                    var me = this;
                    var _ref = {};
                    var handle = function (data) {
                        var _ret = {};
                        $.map(data, function (v, k) {
                            switch (v.DeliveryType) {
                                case 1:
                                    _ret.ps = v;
                                    break;
                                case 2:
                                    _ret.zq = v;
                                    break;
                                case 3:
                                    _ret.ems = v;
                                    break;
                                case 4:
                                    _ret.py = v;
                                    break;
                                case 5:
                                    _ret.sf = v;
                                    break;
                            }
                            me.postage[v.DeliveryType] = v.DeliveryAmount;
                        });
                        if (_ret.py) {
                            _ret.pyindex = 1;
                            _ret.sfindex = 5;
                            if (_ret.ps) {
                                _ret.psindex = 2;
                                if (_ret.zq) {
                                    _ret.zqindex = 3;
                                    _ret.emsindex = 4;
                                }
                            } else if (_ret.zq) {
                                _ret.zqindex = 2;
                                _ret.emsindex = 3;
                            } else {
                                _ret.emsindex = 2;
                            }
                        } else {
                            if (_ret.ps) {
                                _ret.psindex = 1;
                                if (_ret.zq) {
                                    _ret.zqindex = 2;
                                    _ret.emsindex = 3;
                                }
                            } else if (_ret.zq) {
                                _ret.zqindex = 1;
                                _ret.emsindex = 2;
                            } else {
                                _ret.emsindex = 1;
                            }
                        }
                        me.tabType = {
                            1: _ret.psindex,
                            2: _ret.zqindex,
                            3: _ret.emsindex,
                            4: _ret.pyindex,
                            5: _ret.sfindex
                        };
                        return _ret;
                    };
                    var goods = function (goods) {
                        var _ret = [];
                        if (!goods || !goods.length) return null;
                        $.map(goods, function (v, k) {
                            _ret.push('<p>' + (k + 1) + '. ' + v.replace(/[\r\n]/g, "") + '</p>');
                        });
                        _ret.push('<p class="alert_info">(内容仅供参考，以实际送出物为准。)</p>');
                        return _ret.join('');
                    };
                    if (!data || !data.DeliveryInfoList) return _ref;
                    $.map(data.DeliveryInfoList, function (v, k) {
                        if (v.isHasInvoice === 1) {
                            _ref.invoice = handle(v.DeliveryType);
                            _ref.invoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
                        } else {
                            _ref.noInvoice = handle(v.DeliveryType);
                            _ref.noInvoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
                        }
                    });
                    if (data.SelfPickupAddress.length) {
                        _ref.selfPickupAddr = data.SelfPickupAddress;
                    }
                    _ref.CityName = data.CityName;
                    _ref.CityCanton = data.CityCanton || [];
                    if (data.MyEMSAddress) {
                        _ref.emsAddress = data.MyEMSAddress.slice(0, 3);
                        $.map(data.MyEMSAddress, function (v, k) {
                            me.commonEMSAddr[v.InfoId] = v;
                        });
                        if (data.MyEMSAddress.length < 4) {
                            _ref.hideEmsAddress = true;
                        }
                    }
                    if (data.InCityDelivery) {
                        _ref.inCityAddress = data.InCityDelivery.slice(0, 3);
                        $.map(data.InCityDelivery, function (v, k) {
                            me.commonInCityAddr[v.InfoId] = v;
                        });
                        if (data.InCityDelivery.length < 4) {
                            _ref.hideInCityAddress = true;
                        }
                    }
                    data.CityCanton && $.map(data.CityCanton, function (v, k) {
                        me.Cantons[v.Key] = v;
                    })
                    return _ref;
                },
                getPsAddr: function (role, isTemp) { //获取新增市内配送地址
                    // var idx = role.getCanton.val()
                    var canton = role.getCanton.find("option:selected").text();
                    var cantonID = role.getCanton.val() || 0;
                    var detail = role.getAddrDetail.val();
                    var valid = role.getAddrDetail.data('vali');
                    isTemp = isTemp || 0;
                    if (!isTemp) {
                        if ('' === $.trim(detail)) {
                            this.showTip(role.getAddrDetail[0], '请输入详细地址');
                            if (!self.status.errorElem) {
                                self.status.errorElem = role.getAddrDetail[0];
                            }
                            return false;
                        }
                        if (canton.indexOf('暂未开通') != -1) {
                            this.showTip(role.getCanton[0], '该区域尚未开通配送，请重新选择');
                            if (!self.status.errorElem) {
                                self.status.errorElem = role.getAddrDetail[0];
                            }
                            return false;
                        }
                    }
                    return [canton, detail, cantonID];
                },
                showTip: function (el, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                checkNull: function (str) {
                    return '' === str ? true : false;
                },
                checkRecipient: function (str, el) { //验证收件人
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.recipient);
                        return false;
                    }
                    return true;
                },
                checkContactTel: function (str, el) { //验证收件人电话
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.contactTel);
                        return false;
                    } else if (!/^\d{7,}$/.test(str)) {
                        this.showTip(el, msg.contactTelErr);
                        return false;
                    }
                    return true;
                },
                checkDetail: function (str, el) { //验证详细收件地址
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.detail);
                        return false;
                    }
                    return true;
                },
                checkPostage: function (str, el) { //验证邮编
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.postage);
                        return false;
                    } else if (!/^\d{6}$/.test(str)) {
                        this.showTip(el, msg.postageErr);
                        return false;
                    }
                    return true;
                },
                getEmsAddr: function (r, isTemp, isPy) { //获取新增EMS配送地址
                    var me = this;
                    var _ref = {};
                    var _ret = true;
                    var role = self.common.getRoles(r);
                    var getCities = function () {
                        return isPy ? cities.get('#cities_p') : cities.get('#cities');
                    };
                    var getVal = function () {
                        $.each(role, function (k, v) {
                            if (k != 'selectCity') {
                                _ref[k] = $(v).val();
                            } else {
                                _ref[k] = getCities();
                            }
                        });
                        return _ref;
                    };
                    isTemp = isTemp || 0;
                    if (!isTemp) {
                        $.each(role, function (k, v) {
                            var val;
                            val = k != 'selectCity' ? $.trim($(v).val()) : getCities();
                            if ('' === val) {
                                me.showTip(v, msg[k]);
                                _ret = false;
                                if (!self.status.errorElem) {
                                    self.status.errorElem = v;
                                }
                                //return false;
                            } else if (k === 'contactTel') {
                                if (!me.checkContactTel(val, v)) {
                                    _ret = false;
                                    if (!self.status.errorElem) {
                                        self.status.errorElem = v;
                                    }
                                    // return false;
                                }
                            } else if (k === 'postage') {
                                if (!me.checkPostage(val, v)) {
                                    _ret = false;
                                    if (!self.status.errorElem) {
                                        self.status.errorElem = v;
                                    }
                                    //return false;
                                }
                            }
                        });
                    }
                    return [_ret, getVal()];
                },
                setData: function (obj) { //设置要提交的配送数据
                    return self.formData.DeliverInfo = {
                        DeliverType: obj.DeliverType || 0,
                        AddresseeName: obj.AddresseeName,
                        ContactTel: obj.ContactTel,
                        Address: escape(obj.Address),
                        PostCode: obj.PostCode,
                        CantonID: obj.CantonID,
                        InfoId: obj.InfoId || 0
                    };
                },
                save: function (isSubmit) {
                    var type, which, role, id, isPy;
                    var DeliverInfo = self.formData.DeliverInfo;
                    var me = this;
                    var addr, commonInCityAddr, commonEMSAddr;
                    var _assign = function (type, name, tel, addr, post, canton, id) {
                        me.setData({
                            DeliverType: type,
                            AddresseeName: name,
                            ContactTel: tel,
                            Address: addr,
                            PostCode: post,
                            CantonID: canton,
                            InfoId: id
                        });
                    };
                    if (roles.deliveryID.parent().css('display') !== 'none') {
                        if ($('#deliverBox').css('display') !== 'block') {
                            me.defaultData();
                            return true;
                        }
                        type = $('#tabs').children('.cur').attr('type');
                        which = $('#content').children('[type="' + type + '"]');
                        role = self.common.getRoles(which);
                        if (type == 1) {
                            if (role.addressList) {
                                id = role.addressList.find('input:checked').val();
                                if (id) {
                                    commonInCityAddr = me.commonInCityAddr[id];
                                    _assign(type, commonInCityAddr.Recipient, commonInCityAddr.Mobile || commonInCityAddr.Tel, commonInCityAddr.Address, commonInCityAddr.Post, commonInCityAddr.CantonID || 0, commonInCityAddr.InfoId || 0);
                                    if (isSubmit) {
                                        return true;
                                    }
                                } else {
                                    addr = me.getPsAddr(role, !isSubmit);
                                }
                            } else {
                                addr = me.getPsAddr(role, !isSubmit);
                            }
                            if (isSubmit && !addr) return false;
                            if (addr) {
                                _assign(type, '', '', addr[1], '', addr[2] || 0, 0);
                            }
                        }
                        if (type == 2) {
                            id = role.addressList.find('input:checked').val();
                            _assign(type, '', '', id, '', 0, 0)
                        }
                        if (type == 3 || type == 4 || type == 5) {
                            isPy = type == 3 ? 0 : 1;
                            if (role.addressList) {
                                id = role.addressList.find('input:checked').val();
                                if (id) {
                                    commonEMSAddr = me.commonEMSAddr[id];
                                    _assign(type, commonEMSAddr.Recipient, commonEMSAddr.Mobile || commonEMSAddr.Tel, commonEMSAddr.CityName + commonEMSAddr.Address, commonEMSAddr.Post, 0, commonEMSAddr.InfoId || 0);
                                    if (isSubmit) {
                                        return true;
                                    }
                                } else {
                                    addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
                                }
                            } else {
                                addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
                            }
                            if (addr) {
                                var dir = addr[1];
                                if (isSubmit) {
                                    if (!addr[0]) return false;
                                }
                                _assign(type, dir.recipient, dir.contactTel, dir.selectCity + dir.detail, dir.postage, 0, 0);
                            }
                        }
                    } else {
                        _assign(0, '', '', '', '', 0, 0);
                    }
                    return true;
                },
                verify: function () {
                    this.save(!0);
                }
            }
        },
        Extras: function () {
            var self = this;
            var vdata = self.data;
            return {
                init: function () {
                    var _data = vdata.initData.OrderOther;
                    var role = this.role = self.common.getRoles(vdata.roles.extrasID);
                    var bed;
                    this.bedValue = {
                        1: '尽量安排大床',
                        2: '尽量安排双床'
                    };
                    this.bindEvent();
                    if (!_data || !this.isNull(_data)) return;
                    if (role.extrasInputs) {
                        role.extrasInputs.show();
                        role.mores.html('更多需求&lt;&lt;');
                    }
                    if (_data.NoSmokingRoom) {
                        role.noSmokingRoom && role.noSmokingRoom.prop('checked', true);
                    }
                    // if(_data.NeedAdsl){
                    //     role.needAdsl.prop('checked',true);
                    // }
                    if (_data.BedDes) {
                        bed = this.getBedVal(_data.BedDes);
                        role.selectBedDes && role.selectBedDes.prop('checked', true);
                        role.bedDes && role.bedDes.val(bed).prop('disabled', false).children('[value="' + bed + '"]').attr('selected', true);
                    }
                    if (_data.Remark) {
                        role.Remark.val(_data.Remark).show();
                    }

                },
                isNull: function (obj) {
                    var _ret = false;
                    if (!obj) return false;
                    $.each(obj, function (k, v) {
                        if (v) {
                            _ret = true;
                        }
                    });
                    return _ret;
                },
                bindEvent: function () {
                    var role = this.role;
                    role.mores && role.mores.bind('click', function () {
                        role.extrasInputs.toggle();
                        if (role.extrasInputs.css('display') !== 'none') {
                            $(this).html('更多需求&lt;&lt;')
                        } else {
                            $(this).html('更多需求&gt;&gt;')
                        }
                    });
                    role.selectBedDes && role.selectBedDes.bind('click', function () {
                        if ($(this).prop('checked')) {
                            role.bedDes.prop('disabled', false);
                        } else {
                            role.bedDes.prop('disabled', true).val('0');
                            role.bedDes.children('[value="0"]').attr('selected', true);
                        }
                    });
                    role.selectRemark && role.selectRemark.bind('click', function () {
                        role.Remark.toggle();
                    });
                },
                getBedVal: function (v) {
                    var _ret;
                    $.each(this.bedValue, function (key, val) {
                        if (v === val) {
                            _ret = key;
                            return false;
                        }
                    });
                    return _ret;
                },
                save: function () {
                    var role = this.role;
                    var OtherInfo = self.formData.OtherInfo;
                    var remark = role.Remark;
                    if (role.extrasInputs && role.extrasInputs.css('display') !== 'block') {
                        self.formData.OtherInfo = {
                            NoSmokingRoom: 0,
                            BedDes: '',
                            Remark: ''
                        };
                        return;
                    }
                    if (role.noSmokingRoom && role.noSmokingRoom.prop('checked'))
                        OtherInfo.NoSmokingRoom = 1;
                    else
                        OtherInfo.NoSmokingRoom = 0;
                    if (role.bedDes && role.bedDes.val() != 0)
                        OtherInfo.BedDes = this.bedValue[role.bedDes.val()];
                    else
                        OtherInfo.BedDes = '';
                    if (remark && remark[0].style.display != 'none' && $.trim(remark.val()) !== remark.attr('_cqnotice')) {
                        OtherInfo.Remark = remark.val();
                    } else {
                        OtherInfo.Remark = '';
                    }
                },
                verify: function () {
                    this.save();
                    return true;
                }
            }
        },
        AsyncInit: function () {
            var self = this,
                vdata = self.data;
            return {
                init: function () {
                    var module = [];
                    self.fetchData({
                        url: vdata.handles.otherInfo,
                        dataType: 'text'
                    }, function (data) {
                        data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                        vdata.roles.loadingID.remove();
                        if (data.errno) return;
                        $.extend(vdata.initData, data.data);
                        (function (args) {
                            $.map([self.Travellers, self.Commoners, self.Delivery, self.Invoice, self.Extras], function (o, i) {
                                module[args[i]] = o.call(self);
                            });
                        }('Travellers|Commoners|Delivery|Invoice|Extras'.split('|')));
                        for (var i in module) {
                            if (Object.prototype.hasOwnProperty.call(module, i)) {
                                module[i].init(vdata);
                                vdata.modules[i] = module[i];
                            }
                        }
                        self.initEvent();
                    });
                }
            }
        },
        /**
        * 根据参数返回input的jquery对象
        * @param  {String} str     input上的参数值
        * @return {cQuery Obj}     [description]
        */
        // _getInput: function (str) {
        //     var obj;
        //     $.each($('#linkManID input'), function (index, item) {
        //         if ($(item).attr('role') === str) {
        //             obj = cQuery(item);
        //         }
        //     });
        //     return obj;
        // },

        // /**
        // * 简单模式表单验证
        // * @return {Boolean} 表单验证是否通过
        // */
        // _simpleFormCheck: function () {
        //     var self = this,
        //         nickName = self._getInput('ctname').value(),
        //         nickMobile = self._getInput('ctmphone').value(),
        //         nickTel = self._getInput('cttphone').value(),
        //         nickEmail = self._getInput('ctemail').value(),
        //         nickNameCheck = this.Contacter().checkName(nickName),
        //         nickMobileCheck = this.Contacter().checkMobile(nickMobile),
        //         nickEmailCheck = this.Contacter().checkEmail(nickEmail);

        //     // 检查名字
        //     if (!nickNameCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctname'),
        //             data: nickNameCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     };

        //     //检查手机
        //     if (!nickMobileCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctmphone'),
        //             data: nickMobileCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     }

        //     //检查email
        //     if (!nickEmailCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctemail'),
        //             data: nickEmailCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     }

        //     return true;
        // },

        /**
        * 简单模式提交订单操作
        * 填写页下一步Savebookinghandler接口时，你需要给我多传一个int类型参数ProposalOrderType（如果是意向单点下一步时传2，如果是常规的点击下一步时传1）
        * @param {Number} _type 订单类型
        * @return {[type]} [description]
        * 
        */
        _paySubmit: function () {
            var self = this,
                me = this,
                mod = this.data.modules,
                text,
                vdata = self.data;

            // 异步提交意愿单订单
            $(document).undelegate('#J_paysubmit', 'click');
            $(document).delegate('#J_paysubmit', 'click', function () {
                var linkManEdit = $('#linkManID .linkman_info'),
                    linkManIsHidden = $(linkManEdit[1]).is(':hidden');

                $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                    mod[v].save();
                });

                self.formData.IsTmpOrder = 1;
                self.formData.TempOrderType = 0;
                self.formData.ProposalOrderType = 2;



                $('#linkManID a.revise').click();
                if (!self._simpleFormCheck()) {
                    return false
                };
                if (linkManIsHidden) {
                    $(linkManEdit[1]).hide();
                    $(linkManEdit[0]).show();
                }

                if (self._simpleFormCheck()) {

                    $(this).text('请稍候...');
                    $.ajax({
                        url: vdata.handles.bookingInfo,
                        type: 'POST',
                        data: {
                            // bookinginfo: cQuery.stringifyJSON(ContactInfo),
                            bookinginfo: cQuery.stringifyJSON(self.formData)
                        },
                        //data: 'bookinginfo=' + cQuery.stringifyJSON(ContactInfo),
                        timeout: 10000,
                        success: function (data) {
                            $('#J_forminfocnt').show();
                            $('#J_simplepay').hide();
                            $('#J_paysubmitSucc').show();
                        }
                    });
                }

            });
        },

        /**
         * 显示为意向单的表单
         * @return {[type]} [description]
         */
        _newForm: function () {
            $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            $('a.temporary_order').hide();

            $('#J_simplepay').show();
            $('#J_paybuttoncnt').show();
            this._paySubmit();
            IsTmporaryOrder = true;
        },

        /**
         * 显示不是意向单的表单
         * @return {[type]} [description]
         */
        _defaultForm: function () {
            // 显示原来的页面
            $('#J_simplepay').hide();
            $('#J_forminfocnt').show();
        },

        init: function () { //初始化
            var self = this;
            var vdata = self.data;

            // 根据Alternative参数显示内容 B，显示意向单内容，其它则显示原来的内容
            $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            if (GV.app.order.vars.initData.Alternative === "B") {
                // 根据IsTemporaryOrder判断是否显示追单页面 true:暂存过了，显示老的页面
                if (GV.app.order.vars.initData.IsTemporaryOrder) {
                    self._defaultForm();

                    // 显示已经预订的绿色框
                    $('#J_paysubmitSucc').show();


                    $('#J_forminfocnt .temporary_order').hide();

                } else {
                    self._newForm();
                }
            } else {

                self._defaultForm();
            }

            // $.ajax({
            //     url: '/Booking/Ajax/Order/NeedTrackOrder.aspx',
            //     type: 'get',
            //     data: {
            //         ProductID: GV.app.order.vars.initData.productID,
            //         IsQuickLogin: GV.app.order.vars.isQuickLogin,
            //         Alternative: GV.app.order.vars.initData.Alternative
            //     },
            //     cache: false,
            //     dataType: 'json',
            //     success: function (data) {
            //         $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            //         if (data.errno === 0 && data.data) {
            //             // 根据IsTemporaryOrder判断是否显示追单页面 true:暂存过了，显示老的页面
            //             if (GV.app.order.vars.initData.IsTemporaryOrder) {
            //                 self._defaultForm();

            //                 // 显示已经预订的绿色框
            //                 $('#J_paysubmitSucc').show();
            //             } else {
            //                 self._newForm();
            //             }
            //         } else {
            //             self._defaultForm();
            //         }
            //     }
            // });

            self.handlerHelp();
            return function () {
                var modules = vdata.modules;
                if (!arguments.length) return;
                $.each('loadingID|couponID|fillsetID|bookInfoID|linkManID|travellersID|commonersID|priceID|invoiceID|searchID|deliveryID|totalID|submitID|extrasID|singleConponID'.split('|'), function (k, v) {
                    vdata.roles[v] = $('#' + v);
                });
                vdata = $.extend(self.data, arguments[0].initData);
                self.initHeadbarsHelper();
                self.formData.OrderId = encodeURIComponent(vdata.initData.orderid); //订单号
                // self.formData.RequestPath = encodeURIComponent(location.pathname);
                self.formData.RequestPath = location.pathname;
                //初始化订单类型
                if (vdata.hidTemporaryAuto == 0) {
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = 0;
                    self.status.isTmpSave = true;
                } else if (vdata.hidTemporaryAuto == 1) {
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = 1;
                } else {
                    self.formData.IsTmpOrder = 0;
                    self.formData.TempOrderType = 1;
                }

                (function (args) {
                    $.map([self.Products, self.Price, self.Coupon, self.HotelCoupon, self.AsyncInit], function (o, i) {
                        modules[args[i]] = o.call(self);
                    });
                }('Products|Price|Coupon|HotelCoupon|AsyncInit'.split('|')));
                for (var i in modules) {
                    modules[i].init(vdata);
                }
                
            };
        }
    };
    exports.init = orderprocess.init.call(orderprocess);
});
