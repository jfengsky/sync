;window.replace=function(){return ''};(function(a){function l(b,a){var d=(/^\w+\:\/\//);((/^\/\/\/?/).test(b)?b=location.protocol+b:d.test(b)||"/"==b.charAt(0)||(b=(a||"")+b));return (d.test(b)?b:(("/"==b.charAt(0)?w:x))+b)}function n(b,a){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);return a}function p(b,a,d,e){b.onload=b.onreadystatechange=function(){b.readyState&&"complete"!=b.readyState&&"loaded"!=b.readyState||a[d]||(b.onload=b.onreadystatechange=null,e())};b.onerror=function(){try{var b=this.src;"undefined"==typeof window.__bfi&&(window.__bfi=
[]);window.__bfi.push(["_trackError",{message:"[Error loading script - status "+d+"]",line:0,file:b,category:"scriptload-error",framework:"cQuery_110421"}])}catch(a){}}}function u(b){b.ready=b.finished=!0;for(var a=0;a<b.finished_listeners.length;a++)b.finished_listeners[a]();b.ready_listeners=[];b.finished_listeners=[]}function H(b,a,d,e,l){setTimeout(function(){var c,f=a.real_src,h;if("item"in k){if(!k[0]){setTimeout(arguments.callee,25);return}k=k[0]}c=document.createElement("script");a.type&&
(c.type=a.type);a.charset&&(c.charset=a.charset);(l?(t?(b[m]&&q("start script preload: "+f),d.elem=c,(y?(c.preload=!0,c.onpreload=e):c.onreadystatechange=function(){"loaded"==c.readyState&&e()}),c.src=f):(l&&0==f.indexOf(w)&&b[z]?(h=new XMLHttpRequest,b[m]&&q("start script preload (xhr): "+f),h.onreadystatechange=function(){4==h.readyState&&(h.onreadystatechange=function(){},d.text=h.responseText+"\n//@ sourceURL="+f,e())},h.open("GET",f),h.send()):(b[m]&&q("start script preload (cache): "+f),c.type="text/cache-script",
p(c,d,"ready",function(){k.removeChild(c);e()}),c.src=f,k.insertBefore(c,k.firstChild)))):((A?(b[m]&&q("start script load (ordered async): "+f),c.async=!1):b[m]&&q("start script load: "+f)),p(c,d,"finished",e),c.src=f,k.insertBefore(c,k.firstChild)))},0)}function B(){function b(a,b,c){function d(){null!=g&&(g=null,u(c))}var g;f[b.src].finished||(a[v]||(f[b.src].finished=!0),g=c.elem||document.createElement("script"),b.type&&(g.type=b.type),b.charset&&(g.charset=b.charset),p(g,c,"finished",d),(c.elem?c.elem=
null:(c.text?(g.onload=g.onreadystatechange=null,g.text=c.text):g.src=b.real_src)),k.insertBefore(g,k.firstChild),c.text&&d())}function G(a,c,d,e){var g,s,h=function(){c.ready_cb(c,function(){b(a,c,g)})},n=function(){c.finished_cb(c,d)};c.src=l(c.src,a[C]);c.real_src=c.src+((a[D]?(((/\?.*$/).test(c.src)?"&_":"?_"))+~~(1E9*Math.random())+"=":""));f[c.src]||(f[c.src]={items:[],finished:!1});s=f[c.src].items;(a[v]||0==s.length?(g=s[s.length]={ready:!1,finished:!1,ready_listeners:[h],finished_listeners:[n]},H(a,
c,g,(e?function(){g.ready=!0;for(var a=0;a<g.ready_listeners.length;a++)g.ready_listeners[a]();g.ready_listeners=[]}:function(){u(g)}),e)):(g=s[0],(g.finished?n():g.finished_listeners.push(n))))}function d(){function a(b,d){g[m]&&q("script preload finished: "+b.real_src);b.ready=!0;b.exec_trigger=d;c()}function b(a,d){g[m]&&q("script execution finished: "+a.real_src);a.ready=a.finished=!0;a.exec_trigger=null;for(var f=0;f<d.scripts.length;f++)if(!d.scripts[f].finished)return;d.finished=!0;c()}function c(){for(;h<
f.length;)if("[object Function]"==Object.prototype.toString.call(f[h])){g[m]&&q("$LAB.wait() executing: "+f[h]);try{f[h++]()}catch(a){g[m]&&E("$LAB.wait() error caught: ",a)}}else{if(!f[h].finished){for(var b=f[h],d=!1,e=0;e<b.scripts.length;e++)b.scripts[e].ready&&b.scripts[e].exec_trigger&&(d=!0,b.scripts[e].exec_trigger(),b.scripts[e].exec_trigger=null);if(d)continue;break}h++}h==f.length&&(k=l=!1)}var d,g=n(e,{}),f=[],h=0,l=!1,k;d={script:function(){for(var c=0;c<arguments.length;c++){var e=arguments[c],
h=arguments[c],p=void 0;"[object Array]"==Object.prototype.toString.call(e)||(h=[e]);for(var m=0;m<h.length;m++)k&&k.scripts||f.push(k={scripts:[],finished:!0}),e=h[m],"[object Function]"==Object.prototype.toString.call(e)&&(e=e()),e&&(("[object Array]"==Object.prototype.toString.call(e)?(p=[].slice.call(e),p.unshift(m,1),[].splice.apply(h,p),m--):("string"==typeof e&&(e={src:e}),e=n(e,{ready:!1,ready_cb:a,finished:!1,finished_cb:b}),k.finished=!1,k.scripts.push(e),G(g,e,k,r&&l),l=!0,g[F]&&d.wait())))}return d},
padScript:function(){var a=(navigator.userAgent.match((/(iPad).*OS\s([\d_]+)/))?!0:!1),b=arguments;a||(b[0]="");return d.script.apply(null,b)},miniScript:function(){return d.script.apply(null,arguments)},wait:function(){if(0<arguments.length){for(var a=0;a<arguments.length;a++)f.push(arguments[a]);k=f[f.length-1]}else k=!1;c();return d}};return{script:d.script,wait:d.wait,padScript:d.padScript,miniScript:d.miniScript,setOptions:function(a){n(a,g);return d}}}var e={},r=t||I,c=[],f={},h;e[z]=!1;e[F]=!1;
e[v]=!1;e[D]=!1;e[m]=!1;e[C]="";return h={setGlobalDefaults:function(a){n(a,e);return h},setOptions:function(){return d().setOptions.apply(null,arguments)},script:function(){return d().script.apply(null,arguments)},padScript:function(){return d().padScript.apply(null,arguments)},miniScript:function(){return d().miniScript.apply(null,arguments)},wait:function(){return d().wait.apply(null,arguments)},queueScript:function(){c[c.length]={type:"script",args:[].slice.call(arguments)};return h},queueWait:function(){c[c.length]=
{type:"wait",args:[].slice.call(arguments)};return h},runQueue:function(){for(var a=h,b=c.length,d;0<=--b;)d=c.shift(),a=a[d.type].apply(null,d.args);return a},noConflict:function(){a.$LAB=J;return h},sandbox:function(){return B()}}}var J=a.$LAB,z="UseLocalXHR",F="AlwaysPreserveOrder",v="AllowDuplicates",D="CacheBust",m="Debug",C="BasePath",x=(/^[^?#]*\//).exec(location.href)[0],w=(/^\w+\:\/\/\/?[^\/]+/).exec(x)[0],k=document.head||document.getElementsByTagName("head"),K=a.opera&&"[object Opera]"==Object.prototype.toString.call(a.opera)||
"MozAppearance"in document.documentElement.style,q=function(){},E=q,r=document.createElement("script"),y="boolean"==typeof r.preload,t=y||r.readyState&&"uninitialized"==r.readyState,A=!t&&!0===r.async,I=!t&&!A&&!K;a.console&&a.console.log&&(a.console.error||(a.console.error=a.console.log),q=function(b){a.console.log(b)},E=function(b,k){a.console.error(b,k)});a.$LAB=B();(function(a,k,d){null==document.readyState&&document[a]&&(document.readyState="loading",document[a](k,d=function(){document.removeEventListener(k,
d,!1);document.readyState="complete"},!1))})("addEventListener","DOMContentLoaded")})(this);"undefined"==typeof window.__uidc_init&&(window.__uidc_init=1*new Date);
(function(){function a(){try{document.documentElement.doScroll("left"),$LAB.isReady=!0}catch(l){setTimeout(a,1)}}if(document.addEventListener)document.addEventListener("DOMContentLoaded",function(){$LAB.isReady=!0},!1),window.addEventListener("load",function(){$LAB.isLoaded=!0},!1);else if(document.attachEvent){window.attachEvent("onload",function(){$LAB.isLoaded=!0});var l;try{l=null==window.frameElement}catch(n){}document.documentElement.doScroll&&l&&setTimeout(a,1)}})();
function logTimer(){var a=document.getElementById("page_id");if(a)var l=(window.__uidc_init?new Date-window.__uidc_init:-1),n=setInterval(function(){window.UIMonitor2&&window.UIMonitor2.trackLog&&(clearInterval(n),window.UIMonitor2.trackLog(a.value,"jsfiles_complete_load",l))},30)}
(function(){for(var a=document.getElementsByTagName("script")||[],l=(/_bfa\.min\.js/i),n=0;n<a.length;n++)if(l.test(a[n].src))return;if(!window.$_bf){a=new Date;l="?v="+a.getFullYear()+a.getMonth()+"_"+a.getDate()+".js";a=document.createElement("script");a.type="text/javascript";a.charset="utf-8";a.async=!0;try{var p="https:"==document.location.protocol}catch(u){p="https:"==document.URL.match((/[^:]+/))+":"}a.src=(p?"https://s.c-ctrip.com/_bfa.min.js"+l:"http://webresource.c-ctrip.com/code/ubt/_bfa.min.js"+
l);p=document.getElementsByTagName("script")[0];p.parentNode.insertBefore(a,p)}})();