(function(f, h) {
    function l(a) {
        return c.isWindow(a) ? a: 9 === a.nodeType ? a.defaultView || a.parentWindow: !1
    }
    function p(a) {
        if (!fa[a]) {
            var b = s.body,
            e = c("<" + a + ">").appendTo(b),
            d = e.css("display");
            e.remove();
            if ("none" === d || "" === d) K || (K = s.createElement("iframe"), K.frameBorder = K.width = K.height = 0),
            b.appendChild(K),
            N && K.createElement || (N = (K.contentWindow || K.contentDocument).document, N.write(("CSS1Compat" === s.compatMode ? "<!doctype html>": "") + "<html><body>"), N.close()),
            e = N.createElement(a),
            N.body.appendChild(e),
            d = c.css(e, "display"),
            b.removeChild(K);
            fa[a] = d
        }
        return fa[a]
    }
    function q(a, b) {
        var e = {};
        c.each(pa.concat.apply([], pa.slice(0, b)),
        function() {
            e[this] = a
        });
        return e
    }
    function y() {
        Z = h
    }
    function w() {
        setTimeout(y, 0);
        return Z = c.now()
    }
    function v() {
        try {
            return new f.XMLHttpRequest
        } catch(a) {}
    }
    function t(a, b, e, d) {
        if (c.isArray(b)) c.each(b,
        function(b, g) {
            e || ab.test(a) ? d(a, g) : t(a + "[" + ("object" == typeof g || c.isArray(g) ? b: "") + "]", g, e, d)
        });
        else if (e || null == b || "object" != typeof b) d(a, b);
        else for (var g in b) t(a + "[" + g + "]", b[g], e, d)
    }
    function E(a, b) {
        var e, d, g = c.ajaxSettings.flatOptions || {};
        for (e in b) b[e] !== h && ((g[e] ? a: d || (d = {}))[e] = b[e]);
        d && c.extend(!0, a, d)
    }
    function r(a, b, c, d, g, k) {
        g = g || b.dataTypes[0];
        k = k || {};
        k[g] = !0;
        g = a[g];
        for (var m = 0,
        G = g ? g.length: 0, f = a === ga, n; m < G && (f || !n); m++) n = g[m](b, c, d),
        "string" == typeof n && (!f || k[n] ? n = h: (b.dataTypes.unshift(n), n = r(a, b, c, d, n, k))); ! f && n || k["*"] || (n = r(a, b, c, d, "*", k));
        return n
    }
    function A(a) {
        return function(b, e) {
            "string" != typeof b && (e = b, b = "*");
            if (c.isFunction(e)) for (var d = b.toLowerCase().split(qa), g = 0, k = d.length, m, h; g < k; g++) m = d[g],
            (h = /^\+/.test(m)) && (m = m.substr(1) || "*"),
            m = a[m] = a[m] || [],
            m[h ? "unshift": "push"](e)
        }
    }
    function D(a, b, e) {
        var d = "width" === b ? a.offsetWidth: a.offsetHeight,
        g = "width" === b ? bb: cb,
        k = 0,
        m = g.length;
        if (0 < d) {
            if ("border" !== e) for (; k < m; k++) e || (d -= parseFloat(c.css(a, "padding" + g[k])) || 0),
            "margin" === e ? d += parseFloat(c.css(a, e + g[k])) || 0 : d -= parseFloat(c.css(a, "border" + g[k] + "Width")) || 0;
            return d + "px"
        }
        d = Q(a, b, b);
        if (0 > d || null == d) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (e) for (; k < m; k++) d += parseFloat(c.css(a, "padding" + g[k])) || 0,
        "padding" !== e && (d += parseFloat(c.css(a, "border" + g[k] + "Width")) || 0),
        "margin" === e && (d += parseFloat(c.css(a, e + g[k])) || 0);
        return d + "px"
    }
    function F(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(db, "/*$0*/"));
        b.parentNode && b.parentNode.removeChild(b)
    }
    function W(a) {
        var b = (a.nodeName || "").toLowerCase();
        "input" === b ? L(a) : "script" !== b && "undefined" != typeof a.getElementsByTagName && c.grep(a.getElementsByTagName("input"), L)
    }
    function L(a) {
        if ("checkbox" === a.type || "radio" === a.type) a.defaultChecked = a.checked
    }
    function aa(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }
    function ra(a, b) {
        var e;
        if (1 === b.nodeType) {
            b.clearAttributes && b.clearAttributes();
            b.mergeAttributes && b.mergeAttributes(a);
            e = b.nodeName.toLowerCase();
            if ("object" === e) b.outerHTML = a.outerHTML;
            else if ("input" !== e || "checkbox" !== a.type && "radio" !== a.type) if ("option" === e) b.selected = a.defaultSelected;
            else {
                if ("input" === e || "textarea" === e) b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked),
            b.value !== a.value && (b.value = a.value);
            b.removeAttribute(c.expando)
        }
    }
    function sa(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var e, d, g;
            d = c._data(a);
            var k = c._data(b, d),
            m = d.events;
            if (m) for (e in delete k.handle, k.events = {},
            m) for (d = 0, g = m[e].length; d < g; d++) c.event.add(b, e + (m[e][d].namespace ? ".": "") + m[e][d].namespace, m[e][d], m[e][d].data);
            k.data && (k.data = c.extend({},
            k.data))
        }
    }
    function ta(a) {
        var b = ua.split("|");
        a = a.createDocumentFragment();
        if (a.createElement) for (; b.length;) a.createElement(b.pop());
        return a
    }
    function va(a, b, e) {
        b = b || 0;
        if (c.isFunction(b)) return c.grep(a,
        function(a, c) {
            return !! b.call(a, c, a) === e
        });
        if (b.nodeType) return c.grep(a,
        function(a, c) {
            return a === b === e
        });
        if ("string" == typeof b) {
            var d = c.grep(a,
            function(a) {
                return 1 === a.nodeType
            });
            if (eb.test(b)) return c.filter(b, d, !e);
            b = c.filter(b, d)
        }
        return c.grep(a,
        function(a, d) {
            return 0 <= c.inArray(a, b) === e
        })
    }
    function ba() {
        return ! 0
    }
    function O() {
        return ! 1
    }
    function wa(a, b, e) {
        var d = b + "defer",
        g = b + "queue",
        k = b + "mark",
        m = c._data(a, d); ! m || "queue" !== e && c._data(a, g) || "mark" !== e && c._data(a, k) || setTimeout(function() {
            c._data(a, g) || c._data(a, k) || (c.removeData(a, d, !0), m.fire())
        },
        0)
    }
    function ha(a) {
        for (var b in a) if (("data" !== b || !c.isEmptyObject(a[b])) && "toJSON" !== b) return ! 1;
        return ! 0
    }
    function xa(a, b, e) {
        if (e === h && 1 === a.nodeType) if (e = "data-" + b.replace(fb, "-$1").toLowerCase(), e = a.getAttribute(e), "string" == typeof e) {
            try {
                e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null: c.isNumeric(e) ? parseFloat(e) : gb.test(e) ? c.parseJSON(e) : e
            } catch(d) {}
            c.data(a, b, e)
        } else e = h;
        return e
    }
    function hb(a) {
        var b = ya[a] = {},
        c,
        d;
        a = a.split(/\s+/);
        c = 0;
        for (d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var s = f.document,
    ib = f.navigator,
    jb = f.location,
    c = function() {
        function a() {
            if (!b.isReady) {
                try {
                    s.documentElement.doScroll("left")
                } catch(c) {
                    setTimeout(a, 1);
                    return
                }
                b.ready()
            }
        }
        var b = function(a, c) {
            return new b.fn.init(a, c, g)
        },
        c = f.jQuery,
        d = f.$,
        g,
        k = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        m = /\S/,
        G = /^\s+/,
        B = /\s+$/,
        n = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        l = /^[\],:{}\s]*$/,
        u = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        H = /(?:^|:|,)(?:\s*\[)+/g,
        t = /(webkit)[ \/]([\w.]+)/,
        r = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        q = /(msie) ([\w.]+)/,
        v = /(mozilla)(?:.*? rv:([\w.]+))?/,
        y = /-([a-z]|[0-9])/ig,
        w = /^-ms-/,
        z = function(a, b) {
            return (b + "").toUpperCase()
        },
        A = ib.userAgent,
        C,
        R,
        lb = Object.prototype.toString,
        ia = Object.prototype.hasOwnProperty,
        ja = Array.prototype.push,
        Y = Array.prototype.slice,
        Aa = String.prototype.trim,
        Ba = Array.prototype.indexOf,
        Ca = {};
        b.fn = b.prototype = {
            constructor: b,
            init: function(a, c, e) {
                var d, g;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a,
                this.length = 1,
                this;
                if ("body" === a && !c && s.body) return this.context = s,
                this[0] = s.body,
                this.selector = a,
                this.length = 1,
                this;
                if ("string" == typeof a) {
                    "<" !== a.charAt(0) || ">" !== a.charAt(a.length - 1) || 3 > a.length ? d = k.exec(a) : d = [null, a, null];
                    if (d && (d[1] || !c)) {
                        if (d[1]) return g = (c = c instanceof b ? c[0] : c) ? c.ownerDocument || c: s,
                        (e = n.exec(a)) ? b.isPlainObject(c) ? (a = [s.createElement(e[1])], b.fn.attr.call(a, c, !0)) : a = [g.createElement(e[1])] : (e = b.buildFragment([d[1]], [g]), a = (e.cacheable ? b.clone(e.fragment) : e.fragment).childNodes),
                        b.merge(this, a);
                        if ((c = s.getElementById(d[2])) && c.parentNode) {
                            if (c.id !== d[2]) return e.find(a);
                            this.length = 1;
                            this[0] = c
                        }
                        this.context = s;
                        this.selector = a;
                        return this
                    }
                    return ! c || c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
                }
                if (b.isFunction(a)) return e.ready(a);
                a.selector !== h && (this.selector = a.selector, this.context = a.context);
                return b.makeArray(a, this)
            },
            selector: "",
            jquery: "1.7.1",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return Y.call(this, 0)
            },
            get: function(a) {
                return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
            },
            pushStack: function(a, c, e) {
                var d = this.constructor();
                b.isArray(a) ? ja.apply(d, a) : b.merge(d, a);
                d.prevObject = this;
                d.context = this.context;
                "find" === c ? d.selector = this.selector + (this.selector ? " ": "") + e: c && (d.selector = this.selector + "." + c + "(" + e + ")");
                return d
            },
            each: function(a, c) {
                return b.each(this, a, c)
            },
            ready: function(a) {
                b.bindReady();
                C.add(a);
                return this
            },
            eq: function(a) {
                a = +a;
                return - 1 === a ? this.slice(a) : this.slice(a, a + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq( - 1)
            },
            slice: function() {
                return this.pushStack(Y.apply(this, arguments), "slice", Y.call(arguments).join(","))
            },
            map: function(a) {
                return this.pushStack(b.map(this,
                function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: ja,
            sort: [].sort,
            splice: [].splice
        };
        b.fn.init.prototype = b.fn;
        b.extend = b.fn.extend = function() {
            var a, c, e, d, g, k, C = arguments[0] || {},
            m = 1,
            R = arguments.length,
            G = !1;
            "boolean" == typeof C && (G = C, C = arguments[1] || {},
            m = 2);
            "object" != typeof C && !b.isFunction(C) && (C = {});
            for (R === m && (C = this, --m); m < R; m++) if (null != (a = arguments[m])) for (c in a) e = C[c],
            d = a[c],
            C !== d && (G && d && (b.isPlainObject(d) || (g = b.isArray(d))) ? (g ? (g = !1, k = e && b.isArray(e) ? e: []) : k = e && b.isPlainObject(e) ? e: {},
            C[c] = b.extend(G, k, d)) : d !== h && (C[c] = d));
            return C
        };
        b.extend({
            noConflict: function(a) {
                f.$ === b && (f.$ = d);
                a && f.jQuery === b && (f.jQuery = c);
                return b
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? b.readyWait++:b.ready(!0)
            },
            ready: function(a) {
                if (!0 === a && !--b.readyWait || !0 !== a && !b.isReady) {
                    if (!s.body) return setTimeout(b.ready, 1);
                    b.isReady = !0; ! 0 !== a && 0 < --b.readyWait || (C.fireWith(s, [b]), b.fn.trigger && b(s).trigger("ready").off("ready"))
                }
            },
            bindReady: function() {
                if (!C) {
                    C = b.Callbacks("once memory");
                    if ("complete" === s.readyState) return setTimeout(b.ready, 1);
                    if (s.addEventListener) s.addEventListener("DOMContentLoaded", R, !1),
                    f.addEventListener("load", b.ready, !1);
                    else if (s.attachEvent) {
                        s.attachEvent("onreadystatechange", R);
                        f.attachEvent("onload", b.ready);
                        var c = !1;
                        try {
                            c = null == f.frameElement
                        } catch(e) {}
                        s.documentElement.doScroll && c && a()
                    }
                }
            },
            isFunction: function(a) {
                return "function" === b.type(a)
            },
            isArray: Array.isArray ||
            function(a) {
                return "array" === b.type(a)
            },
            isWindow: function(a) {
                return a && "object" == typeof a && "setInterval" in a
            },
            isNumeric: function(a) {
                return ! isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return null == a ? String(a) : Ca[lb.call(a)] || "object"
            },
            isPlainObject: function(a) {
                if (!a || "object" !== b.type(a) || a.nodeType || b.isWindow(a)) return ! 1;
                try {
                    if (a.constructor && !ia.call(a, "constructor") && !ia.call(a.constructor.prototype, "isPrototypeOf")) return ! 1
                } catch(c) {
                    return ! 1
                }
                for (var e in a);
                return e === h || ia.call(a, e)
            },
            isEmptyObject: function(a) {
                for (var b in a) return ! 1;
                return ! 0
            },
            error: function(a) {
                throw Error(a);
            },
            parseJSON: function(a) {
                if ("string" != typeof a || !a) return null;
                a = b.trim(a);
                if (f.JSON && f.JSON.parse) return f.JSON.parse(a);
                if (l.test(a.replace(u, "@").replace(p, "]").replace(H, ""))) return (new Function("return " + a))();
                b.error("Invalid JSON: " + a)
            },
            parseXML: function(a) {
                var c, e;
                try {
                    f.DOMParser ? (e = new DOMParser, c = e.parseFromString(a, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a))
                } catch(d) {
                    c = h
                }
                c && c.documentElement && !c.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + a);
                return c
            },
            noop: function() {},
            globalEval: function(a) {
                a && m.test(a) && (f.execScript ||
                function(a) {
                    f.eval.call(f, a)
                })(a)
            },
            camelCase: function(a) {
                return a.replace(w, "ms-").replace(y, z)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            },
            each: function(a, c, e) {
                var d, g = 0,
                k = a.length,
                C = k === h || b.isFunction(a);
                if (e) if (C) for (d in a) {
                    if (!1 === c.apply(a[d], e)) break
                } else for (; g < k && !1 !== c.apply(a[g++], e););
                else if (C) for (d in a) {
                    if (!1 === c.call(a[d], d, a[d])) break
                } else for (; g < k && !1 !== c.call(a[g], g, a[g++]););
                return a
            },
            trim: Aa ?
            function(a) {
                return null == a ? "": Aa.call(a)
            }: function(a) {
                return null == a ? "": (a + "").replace(G, "").replace(B, "")
            },
            makeArray: function(a, c) {
                var e = c || [];
                if (null != a) {
                    var d = b.type(a);
                    null == a.length || "string" === d || "function" === d || "regexp" === d || b.isWindow(a) ? ja.call(e, a) : b.merge(e, a)
                }
                return e
            },
            inArray: function(a, b, c) {
                var e;
                if (b) {
                    if (Ba) return Ba.call(b, a, c);
                    e = b.length;
                    for (c = c ? 0 > c ? Math.max(0, e + c) : c: 0; c < e; c++) if (c in b && b[c] === a) return c
                }
                return - 1
            },
            merge: function(a, b) {
                var c = a.length,
                e = 0;
                if ("number" == typeof b.length) for (var d = b.length; e < d; e++) a[c++] = b[e];
                else for (; b[e] !== h;) a[c++] = b[e++];
                a.length = c;
                return a
            },
            grep: function(a, b, c) {
                var e = [],
                d;
                c = !!c;
                for (var g = 0,
                k = a.length; g < k; g++) d = !!b(a[g], g),
                c !== d && e.push(a[g]);
                return e
            },
            map: function(a, c, e) {
                var d, g, k = [],
                C = 0,
                m = a.length;
                if (a instanceof b || m !== h && "number" == typeof m && (0 < m && a[0] && a[m - 1] || 0 === m || b.isArray(a))) for (; C < m; C++) d = c(a[C], C, e),
                null != d && (k[k.length] = d);
                else for (g in a) d = c(a[g], g, e),
                null != d && (k[k.length] = d);
                return k.concat.apply([], k)
            },
            guid: 1,
            proxy: function(a, c) {
                if ("string" == typeof c) {
                    var e = a[c];
                    c = a;
                    a = e
                }
                if (!b.isFunction(a)) return h;
                var d = Y.call(arguments, 2),
                e = function() {
                    return a.apply(c, d.concat(Y.call(arguments)))
                };
                e.guid = a.guid = a.guid || e.guid || b.guid++;
                return e
            },
            access: function(a, c, e, d, g, k) {
                var C = a.length;
                if ("object" == typeof c) {
                    for (var m in c) b.access(a, m, c[m], d, g, e);
                    return a
                }
                if (e !== h) {
                    d = !k && d && b.isFunction(e);
                    for (m = 0; m < C; m++) g(a[m], c, d ? e.call(a[m], m, g(a[m], c)) : e, k);
                    return a
                }
                return C ? g(a[0], c) : h
            },
            now: function() {
                return (new Date).getTime()
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                a = t.exec(a) || r.exec(a) || q.exec(a) || 0 > a.indexOf("compatible") && v.exec(a) || [];
                return {
                    browser: a[1] || "",
                    version: a[2] || "0"
                }
            },
            sub: function() {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }
                b.extend(!0, a, this);
                a.superclass = this;
                a.fn = a.prototype = this();
                a.fn.constructor = a;
                a.sub = this.sub;
                a.fn.init = function(e, d) {
                    d && d instanceof b && !(d instanceof a) && (d = a(d));
                    return b.fn.init.call(this, e, d, c)
                };
                a.fn.init.prototype = a.fn;
                var c = a(s);
                return a
            },
            browser: {}
        });
        b.each("Boolean Number String Function Array Date RegExp Object".split(" "),
        function(a, b) {
            Ca["[object " + b + "]"] = b.toLowerCase()
        });
        A = b.uaMatch(A);
        A.browser && (b.browser[A.browser] = !0, b.browser.version = A.version);
        b.browser.webkit && (b.browser.safari = !0);
        m.test("\u00a0") && (G = /^[\s\xA0]+/, B = /[\s\xA0]+$/);
        g = b(s);
        s.addEventListener ? R = function() {
            s.removeEventListener("DOMContentLoaded", R, !1);
            b.ready()
        }: s.attachEvent && (R = function() {
            "complete" === s.readyState && (s.detachEvent("onreadystatechange", R), b.ready())
        });
        return b
    } (),
    ya = {};
    c.Callbacks = function(a) {
        a = a ? ya[a] || hb(a) : {};
        var b = [],
        e = [],
        d,
        g,
        k,
        m,
        G,
        f = function(e) {
            var d, g, k, m;
            d = 0;
            for (g = e.length; d < g; d++) k = e[d],
            m = c.type(k),
            "array" === m ? f(k) : "function" !== m || a.unique && l.has(k) || b.push(k)
        },
        n = function(c, h) {
            h = h || [];
            d = !a.memory || [c, h];
            g = !0;
            G = k || 0;
            k = 0;
            for (m = b.length; b && G < m; G++) if (!1 === b[G].apply(c, h) && a.stopOnFalse) {
                d = !0;
                break
            }
            g = !1;
            b && (a.once ? !0 === d ? l.disable() : b = [] : e && e.length && (d = e.shift(), l.fireWith(d[0], d[1])))
        },
        l = {
            add: function() {
                if (b) {
                    var a = b.length;
                    f(arguments);
                    g ? m = b.length: d && !0 !== d && (k = a, n(d[0], d[1]))
                }
                return this
            },
            remove: function() {
                if (b) for (var c = arguments,
                e = 0,
                d = c.length; e < d; e++) for (var k = 0; k < b.length && (c[e] !== b[k] || (g && k <= m && (m--, k <= G && G--), b.splice(k--, 1), !a.unique)); k++);
                return this
            },
            has: function(a) {
                if (b) for (var c = 0,
                e = b.length; c < e; c++) if (a === b[c]) return ! 0;
                return ! 1
            },
            empty: function() {
                b = [];
                return this
            },
            disable: function() {
                b = e = d = h;
                return this
            },
            disabled: function() {
                return ! b
            },
            lock: function() {
                e = h;
                d && !0 !== d || l.disable();
                return this
            },
            locked: function() {
                return ! e
            },
            fireWith: function(b, c) {
                e && (g ? a.once || e.push([b, c]) : (!a.once || !d) && n(b, c));
                return this
            },
            fire: function() {
                l.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !! d
            }
        };
        return l
    };
    var ka = [].slice;
    c.extend({
        Deferred: function(a) {
            var b = c.Callbacks("once memory"),
            e = c.Callbacks("once memory"),
            d = c.Callbacks("memory"),
            g = "pending",
            k = {
                resolve: b,
                reject: e,
                notify: d
            },
            m = {
                done: b.add,
                fail: e.add,
                progress: d.add,
                state: function() {
                    return g
                },
                isResolved: b.fired,
                isRejected: e.fired,
                then: function(a, b, c) {
                    h.done(a).fail(b).progress(c);
                    return this
                },
                always: function() {
                    h.done.apply(h, arguments).fail.apply(h, arguments);
                    return this
                },
                pipe: function(a, b, e) {
                    return c.Deferred(function(d) {
                        c.each({
                            done: [a, "resolve"],
                            fail: [b, "reject"],
                            progress: [e, "notify"]
                        },
                        function(a, b) {
                            var e = b[0],
                            g = b[1],
                            k;
                            c.isFunction(e) ? h[a](function() { (k = e.apply(this, arguments)) && c.isFunction(k.promise) ? k.promise().then(d.resolve, d.reject, d.notify) : d[g + "With"](this === h ? d: this, [k])
                            }) : h[a](d[g])
                        })
                    }).promise()
                },
                promise: function(a) {
                    if (null == a) a = m;
                    else for (var b in m) a[b] = m[b];
                    return a
                }
            },
            h = m.promise({}),
            f;
            for (f in k) h[f] = k[f].fire,
            h[f + "With"] = k[f].fireWith;
            h.done(function() {
                g = "resolved"
            },
            e.disable, d.lock).fail(function() {
                g = "rejected"
            },
            b.disable, d.lock);
            a && a.call(h, h);
            return h
        },
        when: function(a) {
            function b(a) {
                return function(b) {
                    m[a] = 1 < arguments.length ? ka.call(arguments, 0) : b;
                    f.notifyWith(n, m)
                }
            }
            function e(a) {
                return function(b) {
                    d[a] = 1 < arguments.length ? ka.call(arguments, 0) : b; --h || f.resolveWith(f, d)
                }
            }
            var d = ka.call(arguments, 0),
            g = 0,
            k = d.length,
            m = Array(k),
            h = k,
            f = 1 >= k && a && c.isFunction(a.promise) ? a: c.Deferred(),
            n = f.promise();
            if (1 < k) {
                for (; g < k; g++) d[g] && d[g].promise && c.isFunction(d[g].promise) ? d[g].promise().then(e(g), f.reject, b(g)) : --h;
                h || f.resolveWith(f, d)
            } else f !== a && f.resolveWith(f, k ? [a] : []);
            return n
        }
    });
    c.support = function() {
        var a, b, e, d, g, k, m, h, B, n = s.createElement("div");
        n.setAttribute("className", "t");
        n.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        b = n.getElementsByTagName("*");
        e = n.getElementsByTagName("a")[0];
        if (!b || !b.length || !e) return {};
        d = s.createElement("select");
        g = d.appendChild(s.createElement("option"));
        b = n.getElementsByTagName("input")[0];
        a = {
            leadingWhitespace: 3 === n.firstChild.nodeType,
            tbody: !n.getElementsByTagName("tbody").length,
            htmlSerialize: !!n.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: "/a" === e.getAttribute("href"),
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: "on" === b.value,
            optSelected: g.selected,
            getSetAttribute: "t" !== n.className,
            enctype: !!s.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== s.createElement("nav").cloneNode(!0).outerHTML,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        };
        b.checked = !0;
        a.noCloneChecked = b.cloneNode(!0).checked;
        d.disabled = !0;
        a.optDisabled = !g.disabled;
        try {
            delete n.test
        } catch(l) {
            a.deleteExpando = !1
        } ! n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick",
        function() {
            a.noCloneEvent = !1
        }), n.cloneNode(!0).fireEvent("onclick"));
        b = s.createElement("input");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = "t" === b.value;
        b.setAttribute("checked", "checked");
        n.appendChild(b);
        e = s.createDocumentFragment();
        e.appendChild(n.lastChild);
        a.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked;
        a.appendChecked = b.checked;
        e.removeChild(b);
        e.appendChild(n);
        n.innerHTML = "";
        f.getComputedStyle && (k = s.createElement("div"), k.style.width = "0", k.style.marginRight = "0", n.style.width = "2px", n.appendChild(k), a.reliableMarginRight = 0 === (parseInt((f.getComputedStyle(k, null) || {
            marginRight: 0
        }).marginRight, 10) || 0));
        if (n.attachEvent) for (h in {
            submit: 1,
            change: 1,
            focusin: 1
        }) k = "on" + h,
        (B = k in n) || (n.setAttribute(k, "return;"), B = "function" == typeof n[k]),
        a[h + "Bubbles"] = B;
        e.removeChild(n);
        e = d = g = k = n = b = null;
        c(function() {
            var b, e, d, g, k, h = s.getElementsByTagName("body")[0]; ! h || (b = s.createElement("div"), b.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(b, h.firstChild), n = s.createElement("div"), b.appendChild(n), n.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", m = n.getElementsByTagName("td"), B = 0 === m[0].offsetHeight, m[0].style.display = "", m[1].style.display = "none", a.reliableHiddenOffsets = B && 0 === m[0].offsetHeight, n.innerHTML = "", n.style.width = n.style.paddingLeft = "1px", c.boxModel = a.boxModel = 2 === n.offsetWidth, "undefined" != typeof n.style.zoom && (n.style.display = "inline", n.style.zoom = 1, a.inlineBlockNeedsLayout = 2 === n.offsetWidth, n.style.display = "", n.innerHTML = "<div style='width:4px;'></div>", a.shrinkWrapBlocks = 2 !== n.offsetWidth), n.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;visibility:hidden;border:0;", n.innerHTML = "<div style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;'><div></div></div><table style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", e = n.firstChild, d = e.firstChild, g = e.nextSibling.firstChild.firstChild, k = {
                doesNotAddBorder: 5 !== d.offsetTop,
                doesAddBorderForTableAndCells: 5 === g.offsetTop
            },
            d.style.position = "fixed", d.style.top = "20px", k.fixedPosition = 20 === d.offsetTop || 15 === d.offsetTop, d.style.position = d.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", k.subtractsBorderForOverflowNotVisible = -5 === d.offsetTop, k.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, h.removeChild(b), n = null, c.extend(a, k))
        });
        return a
    } ();
    var gb = /^(?:\{.*\}|\[.*\])$/,
    fb = /([A-Z])/g;
    c.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
            return !! a && !ha(a)
        },
        data: function(a, b, e, d) {
            if (c.acceptData(a)) {
                var g, k;
                g = c.expando;
                var m = "string" == typeof b,
                f = a.nodeType,
                B = f ? c.cache: a,
                n = f ? a[g] : a[g] && g,
                l = "events" === b;
                if (n && B[n] && (l || d || B[n].data) || !m || e !== h) {
                    n || (f ? a[g] = n = ++c.uuid: n = g);
                    B[n] || (B[n] = {},
                    f || (B[n].toJSON = c.noop));
                    if ("object" == typeof b || "function" == typeof b) d ? B[n] = c.extend(B[n], b) : B[n].data = c.extend(B[n].data, b);
                    a = g = B[n];
                    d || (g.data || (g.data = {}), g = g.data);
                    e !== h && (g[c.camelCase(b)] = e);
                    if (l && !g[b]) return a.events;
                    m ? (k = g[b], null == k && (k = g[c.camelCase(b)])) : k = g;
                    return k
                }
            }
        },
        removeData: function(a, b, e) {
            if (c.acceptData(a)) {
                var d, g, k, m = c.expando,
                h = a.nodeType,
                f = h ? c.cache: a,
                n = h ? a[m] : m;
                if (f[n]) {
                    if (b && (d = e ? f[n] : f[n].data)) {
                        c.isArray(b) || (b in d ? b = [b] : (b = c.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        g = 0;
                        for (k = b.length; g < k; g++) delete d[b[g]];
                        if (! (e ? ha: c.isEmptyObject)(d)) return
                    }
                    if (!e && (delete f[n].data, !ha(f[n]))) return;
                    c.support.deleteExpando || !f.setInterval ? delete f[n] : f[n] = null;
                    h && (c.support.deleteExpando ? delete a[m] : a.removeAttribute ? a.removeAttribute(m) : a[m] = null)
                }
            }
        },
        _data: function(a, b, e) {
            return c.data(a, b, e, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = c.noData[a.nodeName.toLowerCase()];
                if (b) return ! 0 !== b && a.getAttribute("classid") === b
            }
            return ! 0
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var e, d, g, k = null;
            if ("undefined" == typeof a) {
                if (this.length && (k = c.data(this[0]), 1 === this[0].nodeType && !c._data(this[0], "parsedAttrs"))) {
                    d = this[0].attributes;
                    for (var m = 0,
                    f = d.length; m < f; m++) g = d[m].name,
                    0 === g.indexOf("data-") && (g = c.camelCase(g.substring(5)), xa(this[0], g, k[g]));
                    c._data(this[0], "parsedAttrs", !0)
                }
                return k
            }
            if ("object" == typeof a) return this.each(function() {
                c.data(this, a)
            });
            e = a.split(".");
            e[1] = e[1] ? "." + e[1] : "";
            return b === h ? (k = this.triggerHandler("getData" + e[1] + "!", [e[0]]), k === h && this.length && (k = c.data(this[0], a), k = xa(this[0], a, k)), k === h && e[1] ? this.data(e[0]) : k) : this.each(function() {
                var d = c(this),
                g = [e[0], b];
                d.triggerHandler("setData" + e[1] + "!", g);
                c.data(this, a, b);
                d.triggerHandler("changeData" + e[1] + "!", g)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", c._data(a, b, (c._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, e) { ! 0 !== a && (e = b, b = a, a = !1);
            if (b) {
                e = e || "fx";
                var d = e + "mark"; (a = a ? 0 : (c._data(b, d) || 1) - 1) ? c._data(b, d, a) : (c.removeData(b, d, !0), wa(b, e, "mark"))
            }
        },
        queue: function(a, b, e) {
            var d;
            if (a) return b = (b || "fx") + "queue",
            d = c._data(a, b),
            e && (!d || c.isArray(e) ? d = c._data(a, b, c.makeArray(e)) : d.push(e)),
            d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var e = c.queue(a, b),
            d = e.shift(),
            g = {};
            "inprogress" === d && (d = e.shift());
            d && ("fx" === b && e.unshift("inprogress"), c._data(a, b + ".run", g), d.call(a,
            function() {
                c.dequeue(a, b)
            },
            g));
            e.length || (c.removeData(a, b + "queue " + b + ".run", !0), wa(a, b, "queue"))
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            "string" != typeof a && (b = a, a = "fx");
            return b === h ? c.queue(this[0], a) : this.each(function() {
                var e = c.queue(this, a, b);
                "fx" === a && "inprogress" !== e[0] && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = c.fx ? c.fx.speeds[a] || a: a;
            return this.queue(b || "fx",
            function(b, c) {
                var g = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(g)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            function e() {--m || d.resolveWith(g, [g])
            }
            "string" != typeof a && (a = h);
            a = a || "fx";
            for (var d = c.Deferred(), g = this, k = g.length, m = 1, f = a + "defer", l = a + "queue", n = a + "mark", p; k--;) if (p = c.data(g[k], f, h, !0) || (c.data(g[k], l, h, !0) || c.data(g[k], n, h, !0)) && c.data(g[k], f, c.Callbacks("once memory"), !0)) m++,
            p.add(e);
            e();
            return d.promise()
        }
    });
    var Da = /[\n\t\r]/g,
    ca = /\s+/,
    mb = /\r/g,
    nb = /^(?:button|input)$/i,
    ob = /^(?:button|input|object|select|textarea)$/i,
    pb = /^a(?:rea)?$/i,
    Ea = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    Fa = c.support.getSetAttribute,
    M, Ga, Ha;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, a, b, !0, c.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return c.access(this, a, b, !0, c.prop)
        },
        removeProp: function(a) {
            a = c.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = h,
                    delete this[a]
                } catch(b) {}
            })
        },
        addClass: function(a) {
            var b, e, d, g, k, m, h;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a) for (b = a.split(ca), e = 0, d = this.length; e < d; e++) if (g = this[e], 1 === g.nodeType) if (g.className || 1 !== b.length) {
                k = " " + g.className + " ";
                m = 0;
                for (h = b.length; m < h; m++)~k.indexOf(" " + b[m] + " ") || (k += b[m] + " ");
                g.className = c.trim(k)
            } else g.className = a;
            return this
        },
        removeClass: function(a) {
            var b, e, d, g, k, m, f;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a || a === h) for (b = (a || "").split(ca), e = 0, d = this.length; e < d; e++) if (g = this[e], 1 === g.nodeType && g.className) if (a) {
                k = (" " + g.className + " ").replace(Da, " ");
                m = 0;
                for (f = b.length; m < f; m++) k = k.replace(" " + b[m] + " ", " ");
                g.className = c.trim(k)
            } else g.className = "";
            return this
        },
        toggleClass: function(a, b) {
            var e = typeof a,
            d = "boolean" == typeof b;
            return c.isFunction(a) ? this.each(function(e) {
                c(this).toggleClass(a.call(this, e, this.className, b), b)
            }) : this.each(function() {
                if ("string" === e) for (var g, k = 0,
                m = c(this), h = b, f = a.split(ca); g = f[k++];) h = d ? h: !m.hasClass(g),
                m[h ? "addClass": "removeClass"](g);
                else if ("undefined" === e || "boolean" === e) this.className && c._data(this, "__className__", this.className),
                this.className = this.className || !1 === a ? "": c._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0,
            c = this.length; b < c; b++) if (1 === this[b].nodeType && -1 < (" " + this[b].className + " ").replace(Da, " ").indexOf(a)) return ! 0;
            return ! 1
        },
        val: function(a) {
            var b, e, d, g = this[0];
            if (arguments.length) return d = c.isFunction(a),
            this.each(function(e) {
                var g = c(this),
                f;
                1 === this.nodeType && (d ? f = a.call(this, e, g.val()) : f = a, null == f ? f = "": "number" == typeof f ? f += "": c.isArray(f) && (f = c.map(f,
                function(a) {
                    return null == a ? "": a + ""
                })), b = c.valHooks[this.nodeName.toLowerCase()] || c.valHooks[this.type], b && "set" in b && b.set(this, f, "value") !== h || (this.value = f))
            });
            if (g) {
                if ((b = c.valHooks[g.nodeName.toLowerCase()] || c.valHooks[g.type]) && "get" in b && (e = b.get(g, "value")) !== h) return e;
                e = g.value;
                return "string" == typeof e ? e.replace(mb, "") : null == e ? "": e
            }
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return ! b || b.specified ? a.value: a.text
                }
            },
            select: {
                get: function(a) {
                    var b, e, d = a.selectedIndex,
                    g = [],
                    k = a.options,
                    m = "select-one" === a.type;
                    if (0 > d) return null;
                    a = m ? d: 0;
                    for (e = m ? d + 1 : k.length; a < e; a++) if (b = k[a], b.selected && !((c.support.optDisabled ? b.disabled: null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode, "optgroup"))) {
                        b = c(b).val();
                        if (m) return b;
                        g.push(b)
                    }
                    return m && !g.length && k.length ? c(k[d]).val() : g
                },
                set: function(a, b) {
                    var e = c.makeArray(b);
                    c(a).find("option").each(function() {
                        this.selected = 0 <= c.inArray(c(this).val(), e)
                    });
                    e.length || (a.selectedIndex = -1);
                    return e
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, b, e, d) {
            var g, k, m = a.nodeType;
            if (a && 3 !== m && 8 !== m && 2 !== m) {
                if (d && b in c.attrFn) return c(a)[b](e);
                if ("undefined" == typeof a.getAttribute) return c.prop(a, b, e); (d = 1 !== m || !c.isXMLDoc(a)) && (b = b.toLowerCase(), k = c.attrHooks[b] || (Ea.test(b) ? Ga: M));
                if (e !== h) {
                    if (null === e) {
                        c.removeAttr(a, b);
                        return
                    }
                    if (k && "set" in k && d && (g = k.set(a, e, b)) !== h) return g;
                    a.setAttribute(b, "" + e);
                    return e
                }
                if (k && "get" in k && d && null !== (g = k.get(a, b))) return g;
                g = a.getAttribute(b);
                return null === g ? h: g
            }
        },
        removeAttr: function(a, b) {
            var e, d, g, k, m = 0;
            if (b && 1 === a.nodeType) for (d = b.toLowerCase().split(ca), k = d.length; m < k; m++)(g = d[m]) && (e = c.propFix[g] || g, c.attr(a, g, ""), a.removeAttribute(Fa ? g: e), Ea.test(g) && e in a && (a[e] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (nb.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
                    else if (!c.support.radioValue && "radio" === b && c.nodeName(a, "input")) {
                        var e = a.value;
                        a.setAttribute("type", b);
                        e && (a.value = e);
                        return b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return M && c.nodeName(a, "button") ? M.get(a, b) : b in a ? a.value: null
                },
                set: function(a, b, e) {
                    if (M && c.nodeName(a, "button")) return M.set(a, b, e);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, e) {
            var d, g, k;
            k = a.nodeType;
            if (a && 3 !== k && 8 !== k && 2 !== k) return (k = 1 !== k || !c.isXMLDoc(a)) && (b = c.propFix[b] || b, g = c.propHooks[b]),
            e !== h ? g && "set" in g && (d = g.set(a, e, b)) !== h ? d: a[b] = e: g && "get" in g && null !== (d = g.get(a, b)) ? d: a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : ob.test(a.nodeName) || pb.test(a.nodeName) && a.href ? 0 : h
                }
            }
        }
    });
    c.attrHooks.tabindex = c.propHooks.tabIndex;
    Ga = {
        get: function(a, b) {
            var e, d = c.prop(a, b);
            return ! 0 === d || "boolean" != typeof d && (e = a.getAttributeNode(b)) && !1 !== e.nodeValue ? b.toLowerCase() : h
        },
        set: function(a, b, e) {
            var d; ! 1 === b ? c.removeAttr(a, e) : (d = c.propFix[e] || e, d in a && (a[d] = !0), a.setAttribute(e, e.toLowerCase()));
            return e
        }
    };
    Fa || (Ha = {
        name: !0,
        id: !0
    },
    M = c.valHooks.button = {
        get: function(a, b) {
            var c;
            return (c = a.getAttributeNode(b)) && (Ha[b] ? "" !== c.nodeValue: c.specified) ? c.nodeValue: h
        },
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            d || (d = s.createAttribute(c), a.setAttributeNode(d));
            return d.nodeValue = b + ""
        }
    },
    c.attrHooks.tabindex.set = M.set, c.each(["width", "height"],
    function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            set: function(a, c) {
                if ("" === c) return a.setAttribute(b, "auto"),
                c
            }
        })
    }), c.attrHooks.contenteditable = {
        get: M.get,
        set: function(a, b, c) {
            "" === b && (b = "false");
            M.set(a, b, c)
        }
    });
    c.support.hrefNormalized || c.each(["href", "src", "width", "height"],
    function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            get: function(a) {
                a = a.getAttribute(b, 2);
                return null === a ? h: a
            }
        })
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || h
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    });
    c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, {
        get: function(a) {
            a = a.parentNode;
            a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex);
            return null
        }
    }));
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.support.checkOn || c.each(["radio", "checkbox"],
    function() {
        c.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on": a.value
            }
        }
    });
    c.each(["radio", "checkbox"],
    function() {
        c.valHooks[this] = c.extend(c.valHooks[this], {
            set: function(a, b) {
                if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b)
            }
        })
    });
    var la = /^(?:textarea|input|select)$/i,
    Ia = /^([^\.]*)?(?:\.(.+))?$/,
    qb = /\bhover(\.\S+)?\b/,
    rb = /^key/,
    sb = /^(?:mouse|contextmenu)|click/,
    Ja = /^(?:focusinfocus|focusoutblur)$/,
    tb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
    ub = function(a) { (a = tb.exec(a)) && (a[1] = (a[1] || "").toLowerCase(), a[3] = a[3] && RegExp("(?:^|\\s)" + a[3] + "(?:\\s|$)"));
        return a
    },
    Ka = function(a) {
        return c.event.special.hover ? a: a.replace(qb, "mouseenter$1 mouseleave$1")
    };
    c.event = {
        add: function(a, b, e, d, g) {
            var k, m, f, l, n, p, u, s, H;
            if (3 !== a.nodeType && 8 !== a.nodeType && b && e && (k = c._data(a))) {
                e.handler && (u = e, e = u.handler);
                e.guid || (e.guid = c.guid++); (f = k.events) || (k.events = f = {}); (m = k.handle) || (k.handle = m = function(a) {
                    return "undefined" == typeof c || a && c.event.triggered === a.type ? h: c.event.dispatch.apply(m.elem, arguments)
                },
                m.elem = a);
                b = c.trim(Ka(b)).split(" ");
                for (k = 0; k < b.length; k++) l = Ia.exec(b[k]) || [],
                n = l[1],
                p = (l[2] || "").split(".").sort(),
                H = c.event.special[n] || {},
                n = (g ? H.delegateType: H.bindType) || n,
                H = c.event.special[n] || {},
                l = c.extend({
                    type: n,
                    origType: l[1],
                    data: d,
                    handler: e,
                    guid: e.guid,
                    selector: g,
                    quick: ub(g),
                    namespace: p.join(".")
                },
                u),
                s = f[n],
                s || (s = f[n] = [], s.delegateCount = 0, H.setup && !1 !== H.setup.call(a, d, p, m) || (a.addEventListener ? a.addEventListener(n, m, !1) : a.attachEvent && a.attachEvent("on" + n, m))),
                H.add && (H.add.call(a, l), l.handler.guid || (l.handler.guid = e.guid)),
                g ? s.splice(s.delegateCount++, 0, l) : s.push(l),
                c.event.global[n] = !0;
                a = null
            }
        },
        global: {},
        remove: function(a, b, e, d, g) {
            var k = c.hasData(a) && c._data(a),
            m,
            f,
            h,
            n,
            l,
            u,
            p,
            s,
            t,
            r,
            q;
            if (k && (p = k.events)) {
                b = c.trim(Ka(b || "")).split(" ");
                for (m = 0; m < b.length; m++) if (f = Ia.exec(b[m]) || [], h = n = f[1], f = f[2], h) {
                    s = c.event.special[h] || {};
                    h = (d ? s.delegateType: s.bindType) || h;
                    r = p[h] || [];
                    l = r.length;
                    f = f ? RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (u = 0; u < r.length; u++) q = r[u],
                    !g && n !== q.origType || e && e.guid !== q.guid || f && !f.test(q.namespace) || d && !(d === q.selector || "**" === d && q.selector) || (r.splice(u--, 1), q.selector && r.delegateCount--, !s.remove || s.remove.call(a, q));
                    0 === r.length && l !== r.length && ((!s.teardown || !1 === s.teardown.call(a, f)) && c.removeEvent(a, h, k.handle), delete p[h])
                } else for (h in p) c.event.remove(a, h + b[m], e, d, !0);
                c.isEmptyObject(p) && (t = k.handle, t && (t.elem = null), c.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(a, b, e, d) {
            if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                var g = a.type || a,
                k = [],
                m,
                l,
                B,
                n,
                p,
                u;
                if (!Ja.test(g + c.event.triggered) && (0 <= g.indexOf("!") && (g = g.slice(0, -1), m = !0), 0 <= g.indexOf(".") && (k = g.split("."), g = k.shift(), k.sort()), e && !c.event.customEvent[g] || c.event.global[g])) if (a = "object" == typeof a ? a[c.expando] ? a: new c.Event(g, a) : new c.Event(g), a.type = g, a.isTrigger = !0, a.exclusive = m, a.namespace = k.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + k.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, m = 0 > g.indexOf(":") ? "on" + g: "", e) {
                    if (a.result = h, a.target || (a.target = e), b = null != b ? c.makeArray(b) : [], b.unshift(a), n = c.event.special[g] || {},
                    !n.trigger || !1 !== n.trigger.apply(e, b)) {
                        u = [[e, n.bindType || g]];
                        if (!d && !n.noBubble && !c.isWindow(e)) {
                            l = n.delegateType || g;
                            k = Ja.test(l + g) ? e: e.parentNode;
                            for (B = null; k; k = k.parentNode) u.push([k, l]),
                            B = k;
                            B && B === e.ownerDocument && u.push([B.defaultView || B.parentWindow || f, l])
                        }
                        for (l = 0; l < u.length && !a.isPropagationStopped(); l++) k = u[l][0],
                        a.type = u[l][1],
                        (p = (c._data(k, "events") || {})[a.type] && c._data(k, "handle")) && p.apply(k, b),
                        (p = m && k[m]) && c.acceptData(k) && !1 === p.apply(k, b) && a.preventDefault();
                        a.type = g;
                        d || a.isDefaultPrevented() || n._default && !1 !== n._default.apply(e.ownerDocument, b) || "click" === g && c.nodeName(e, "a") || c.acceptData(e) && m && e[g] && ("focus" !== g && "blur" !== g || 0 !== a.target.offsetWidth) && !c.isWindow(e) && (B = e[m], B && (e[m] = null), c.event.triggered = g, e[g](), c.event.triggered = h, B && (e[m] = B));
                        return a.result
                    }
                } else for (l in e = c.cache, e) e[l].events && e[l].events[g] && c.event.trigger(a, b, e[l].handle.elem, !0)
            }
        },
        dispatch: function(a) {
            a = c.event.fix(a || f.event);
            var b = (c._data(this, "events") || {})[a.type] || [],
            e = b.delegateCount,
            d = [].slice.call(arguments, 0),
            g = !a.exclusive && !a.namespace,
            k = [],
            m,
            l,
            p,
            n,
            s,
            u,
            r;
            d[0] = a;
            a.delegateTarget = this;
            if (e && !(a.target.disabled || a.button && "click" === a.type)) for (p = c(this), p.context = this.ownerDocument || this, l = a.target; l != this; l = l.parentNode || this) {
                s = {};
                u = [];
                p[0] = l;
                for (m = 0; m < e; m++) {
                    n = b[m];
                    r = n.selector;
                    if (s[r] === h) {
                        var H = s,
                        t = r,
                        q;
                        if (n.quick) {
                            q = n.quick;
                            var v = l.attributes || {};
                            q = (!q[1] || l.nodeName.toLowerCase() === q[1]) && (!q[2] || (v.id || {}).value === q[2]) && (!q[3] || q[3].test((v["class"] || {}).value))
                        } else q = p.is(r);
                        H[t] = q
                    }
                    s[r] && u.push(n)
                }
                u.length && k.push({
                    elem: l,
                    matches: u
                })
            }
            b.length > e && k.push({
                elem: this,
                matches: b.slice(e)
            });
            for (m = 0; m < k.length && !a.isPropagationStopped(); m++) for (e = k[m], a.currentTarget = e.elem, b = 0; b < e.matches.length && !a.isImmediatePropagationStopped(); b++) if (n = e.matches[b], g || !a.namespace && !n.namespace || a.namespace_re && a.namespace_re.test(n.namespace)) a.data = n.data,
            a.handleObj = n,
            n = ((c.event.special[n.origType] || {}).handle || n.handler).apply(e.elem, d),
            n !== h && (a.result = n, !1 === n && (a.preventDefault(), a.stopPropagation()));
            return a.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                null == a.which && (a.which = null != b.charCode ? b.charCode: b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, g, k = b.button,
                m = b.fromElement;
                null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || s, d = c.documentElement, g = c.body, a.pageX = b.clientX + (d && d.scrollLeft || g && g.scrollLeft || 0) - (d && d.clientLeft || g && g.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || g && g.scrollTop || 0) - (d && d.clientTop || g && g.clientTop || 0)); ! a.relatedTarget && m && (a.relatedTarget = m === a.target ? b.toElement: m); ! a.which && k !== h && (a.which = k & 1 ? 1 : k & 2 ? 3 : k & 4 ? 2 : 0);
                return a
            }
        },
        fix: function(a) {
            if (a[c.expando]) return a;
            var b, e, d = a,
            g = c.event.fixHooks[a.type] || {},
            k = g.props ? this.props.concat(g.props) : this.props;
            a = c.Event(d);
            for (b = k.length; b;) e = k[--b],
            a[e] = d[e];
            a.target || (a.target = d.srcElement || s);
            3 === a.target.nodeType && (a.target = a.target.parentNode);
            a.metaKey === h && (a.metaKey = a.ctrlKey);
            return g.filter ? g.filter(a, d) : a
        },
        special: {
            ready: {
                setup: c.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, e) {
                    c.isWindow(this) && (this.onbeforeunload = e)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, e, d) {
            a = c.extend(new c.Event, e, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() && e.preventDefault()
        }
    };
    c.event.handle = c.event.dispatch;
    c.removeEvent = s.removeEventListener ?
    function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }: function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    };
    c.Event = function(a, b) {
        if (! (this instanceof c.Event)) return new c.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? ba: O) : this.type = a;
        b && c.extend(this, b);
        this.timeStamp = a && a.timeStamp || c.now();
        this[c.expando] = !0
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = ba;
            var a = this.originalEvent; ! a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = ba;
            var a = this.originalEvent; ! a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = ba;
            this.stopPropagation()
        },
        isDefaultPrevented: O,
        isPropagationStopped: O,
        isImmediatePropagationStopped: O
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var d = a.relatedTarget,
                g = a.handleObj,
                k;
                if (!d || d !== this && !c.contains(this, d)) a.type = g.origType,
                k = g.handler.apply(this, arguments),
                a.type = b;
                return k
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function() {
            if (c.nodeName(this, "form")) return ! 1;
            c.event.add(this, "click._submit keypress._submit",
            function(a) {
                a = a.target; (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form: h) && !a._submit_attached && (c.event.add(a, "submit._submit",
                function(a) {
                    this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0)
                }), a._submit_attached = !0)
            })
        },
        teardown: function() {
            if (c.nodeName(this, "form")) return ! 1;
            c.event.remove(this, "._submit")
        }
    });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            if (la.test(this.nodeName)) {
                if ("checkbox" === this.type || "radio" === this.type) c.event.add(this, "propertychange._change",
                function(a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }),
                c.event.add(this, "click._change",
                function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, c.event.simulate("change", this, a, !0))
                });
                return ! 1
            }
            c.event.add(this, "beforeactivate._change",
            function(a) {
                a = a.target;
                la.test(a.nodeName) && !a._change_attached && (c.event.add(a, "change._change",
                function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && c.event.simulate("change", this.parentNode, a, !0)
                }), a._change_attached = !0)
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            c.event.remove(this, "._change");
            return la.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(a, b) {
        var e = 0,
        d = function(a) {
            c.event.simulate(b, a.target, c.event.fix(a), !0)
        };
        c.event.special[b] = {
            setup: function() {
                0 === e++&&s.addEventListener(a, d, !0)
            },
            teardown: function() {
                0 === --e && s.removeEventListener(a, d, !0)
            }
        }
    });
    c.fn.extend({
        on: function(a, b, e, d, g) {
            var k, m;
            if ("object" == typeof a) {
                "string" != typeof b && (e = b, b = h);
                for (m in a) this.on(m, b, e, a[m], g);
                return this
            }
            null == e && null == d ? (d = b, e = b = h) : null == d && ("string" == typeof b ? (d = e, e = h) : (d = e, e = b, b = h));
            if (!1 === d) d = O;
            else if (!d) return this;
            1 === g && (k = d, d = function(a) {
                c().off(a);
                return k.apply(this, arguments)
            },
            d.guid = k.guid || (k.guid = c.guid++));
            return this.each(function() {
                c.event.add(this, a, d, e, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function(a, b, e) {
            if (a && a.preventDefault && a.handleObj) {
                var d = a.handleObj;
                c(a.delegateTarget).off(d.namespace ? d.type + "." + d.namespace: d.type, d.selector, d.handler);
                return this
            }
            if ("object" == typeof a) {
                for (d in a) this.off(d, b, a[d]);
                return this
            }
            if (!1 === b || "function" == typeof b) e = b,
            b = h; ! 1 === e && (e = O);
            return this.each(function() {
                c.event.remove(this, a, e, b)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, e) {
            c(this.context).on(a, this.selector, b, e);
            return this
        },
        die: function(a, b) {
            c(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 == arguments.length ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return c.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments,
            e = a.guid || c.guid++,
            d = 0,
            g = function(e) {
                var g = (c._data(this, "lastToggle" + a.guid) || 0) % d;
                c._data(this, "lastToggle" + a.guid, g + 1);
                e.preventDefault();
                return b[g].apply(this, arguments) || !1
            };
            for (g.guid = e; d < b.length;) b[d++].guid = e;
            return this.click(g)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(a, b) {
        c.fn[b] = function(a, c) {
            null == c && (c = a, a = null);
            return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
        };
        c.attrFn && (c.attrFn[b] = !0);
        rb.test(b) && (c.event.fixHooks[b] = c.event.keyHooks);
        sb.test(b) && (c.event.fixHooks[b] = c.event.mouseHooks)
    }); (function() {
        function a(a, b, c, e, g, k) {
            g = 0;
            for (var m = e.length; g < m; g++) {
                var f = e[g];
                if (f) {
                    for (var h = !1,
                    f = f[a]; f;) {
                        if (f[d] === c) {
                            h = e[f.sizset];
                            break
                        }
                        if (1 === f.nodeType) if (k || (f[d] = c, f.sizset = g), "string" != typeof b) {
                            if (f === b) {
                                h = !0;
                                break
                            }
                        } else if (0 < u.filter(b, [f]).length) {
                            h = f;
                            break
                        }
                        f = f[a]
                    }
                    e[g] = h
                }
            }
        }
        function b(a, b, c, e, g, k) {
            g = 0;
            for (var m = e.length; g < m; g++) {
                var f = e[g];
                if (f) {
                    for (var h = !1,
                    f = f[a]; f;) {
                        if (f[d] === c) {
                            h = e[f.sizset];
                            break
                        }
                        1 === f.nodeType && !k && (f[d] = c, f.sizset = g);
                        if (f.nodeName.toLowerCase() === b) {
                            h = f;
                            break
                        }
                        f = f[a]
                    }
                    e[g] = h
                }
            }
        }
        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        d = "sizcache" + (Math.random() + "").replace(".", ""),
        g = 0,
        k = Object.prototype.toString,
        m = !1,
        f = !0,
        l = /\\/g,
        n = /\r\n/g,
        p = /\W/; [0, 0].sort(function() {
            f = !1;
            return 0
        });
        var u = function(a, b, c, d) {
            c = c || [];
            var g = b = b || s;
            if (1 !== b.nodeType && 9 !== b.nodeType) return [];
            if (!a || "string" != typeof a) return c;
            var f, m, h, l, n, G, p = !0,
            B = u.isXML(b),
            q = [],
            v = a;
            do
            if (e.exec(""), f = e.exec(v)) if (v = f[3], q.push(f[1]), f[2]) {
                l = f[3];
                break
            }
            while (f);
            if (1 < q.length && t.exec(a)) if (2 === q.length && r.relative[q[0]]) m = E(q[0] + q[1], b, d);
            else for (m = r.relative[q[0]] ? [b] : u(q.shift(), b); q.length;) a = q.shift(),
            r.relative[a] && (a += q.shift()),
            m = E(a, m, d);
            else if (!d && 1 < q.length && 9 === b.nodeType && !B && r.match.ID.test(q[0]) && !r.match.ID.test(q[q.length - 1]) && (n = u.find(q.shift(), b, B), b = n.expr ? u.filter(n.expr, n.set)[0] : n.set[0]), b) for (n = d ? {
                expr: q.pop(),
                set: A(d)
            }: u.find(q.pop(), 1 !== q.length || "~" !== q[0] && "+" !== q[0] || !b.parentNode ? b: b.parentNode, B), m = n.expr ? u.filter(n.expr, n.set) : n.set, 0 < q.length ? h = A(m) : p = !1; q.length;) f = G = q.pop(),
            r.relative[G] ? f = q.pop() : G = "",
            null == f && (f = b),
            r.relative[G](h, f, B);
            else h = [];
            h || (h = m);
            h || u.error(G || a);
            if ("[object Array]" === k.call(h)) if (p) if (b && 1 === b.nodeType) for (a = 0; null != h[a]; a++) h[a] && (!0 === h[a] || 1 === h[a].nodeType && u.contains(b, h[a])) && c.push(m[a]);
            else for (a = 0; null != h[a]; a++) h[a] && 1 === h[a].nodeType && c.push(m[a]);
            else c.push.apply(c, h);
            else A(h, c);
            l && (u(l, g, c, d), u.uniqueSort(c));
            return c
        };
        u.uniqueSort = function(a) {
            if (D && (m = f, a.sort(D), m)) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
            return a
        };
        u.matches = function(a, b) {
            return u(a, null, null, b)
        };
        u.matchesSelector = function(a, b) {
            return 0 < u(b, null, null, [a]).length
        };
        u.find = function(a, b, c) {
            var e, d, g, k, f, m;
            if (!a) return [];
            d = 0;
            for (g = r.order.length; d < g; d++) if (f = r.order[d], k = r.leftMatch[f].exec(a)) if (m = k[1], k.splice(1, 1), "\\" !== m.substr(m.length - 1) && (k[1] = (k[1] || "").replace(l, ""), e = r.find[f](k, b, c), null != e)) {
                a = a.replace(r.match[f], "");
                break
            }
            e || (e = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : []);
            return {
                set: e,
                expr: a
            }
        };
        u.filter = function(a, b, c, e) {
            for (var d, g, k, f, m, l, n, G, p = a,
            q = [], s = b, B = b && b[0] && u.isXML(b[0]); a && b.length;) {
                for (k in r.filter) if (null != (d = r.leftMatch[k].exec(a)) && d[2] && (l = r.filter[k], m = d[1], g = !1, d.splice(1, 1), "\\" !== m.substr(m.length - 1))) {
                    s === q && (q = []);
                    if (r.preFilter[k]) if (d = r.preFilter[k](d, s, c, q, e, B), !d) g = f = !0;
                    else if (!0 === d) continue;
                    if (d) for (n = 0; null != (m = s[n]); n++) m && (f = l(m, d, n, s), G = e ^ f, c && null != f ? G ? g = !0 : s[n] = !1 : G && (q.push(m), g = !0));
                    if (f !== h) {
                        c || (s = q);
                        a = a.replace(r.match[k], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === p) if (null == g) u.error(a);
                else break;
                p = a
            }
            return s
        };
        u.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        };
        var q = u.getText = function(a) {
            var b, c;
            b = a.nodeType;
            var d = "";
            if (b) if (1 === b || 9 === b) {
                if ("string" == typeof a.textContent) return a.textContent;
                if ("string" == typeof a.innerText) return a.innerText.replace(n, "");
                for (a = a.firstChild; a; a = a.nextSibling) d += q(a)
            } else {
                if (3 === b || 4 === b) return a.nodeValue
            } else for (b = 0; c = a[b]; b++) 8 !== c.nodeType && (d += q(c));
            return d
        },
        r = u.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href")
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = "string" == typeof b,
                    d = c && !p.test(b),
                    c = c && !d;
                    d && (b = b.toLowerCase());
                    for (var d = 0,
                    e = a.length,
                    g; d < e; d++) if (g = a[d]) {
                        for (; (g = g.previousSibling) && 1 !== g.nodeType;);
                        a[d] = c || g && g.nodeName.toLowerCase() === b ? g || !1 : g === b
                    }
                    c && u.filter(b, a, !0)
                },
                ">": function(a, b) {
                    var c, d = "string" == typeof b,
                    e = 0,
                    g = a.length;
                    if (d && !p.test(b)) for (b = b.toLowerCase(); e < g; e++) {
                        if (c = a[e]) c = c.parentNode,
                        a[e] = c.nodeName.toLowerCase() === b ? c: !1
                    } else {
                        for (; e < g; e++)(c = a[e]) && (a[e] = d ? c.parentNode: c.parentNode === b);
                        d && u.filter(b, a, !0)
                    }
                },
                "": function(c, d, e) {
                    var k, f = g++,
                    m = a;
                    "string" == typeof d && !p.test(d) && (d = d.toLowerCase(), k = d, m = b);
                    m("parentNode", d, f, c, k, e)
                },
                "~": function(c, d, e) {
                    var k, f = g++,
                    m = a;
                    "string" == typeof d && !p.test(d) && (d = d.toLowerCase(), k = d, m = b);
                    m("previousSibling", d, f, c, k, e)
                }
            },
            find: {
                ID: function(a, b, c) {
                    if ("undefined" != typeof b.getElementById && !c) return (a = b.getElementById(a[1])) && a.parentNode ? [a] : []
                },
                NAME: function(a, b) {
                    if ("undefined" != typeof b.getElementsByName) {
                        for (var c = [], d = b.getElementsByName(a[1]), e = 0, g = d.length; e < g; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return 0 === c.length ? null: c
                    }
                },
                TAG: function(a, b) {
                    if ("undefined" != typeof b.getElementsByTagName) return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, g) {
                    a = " " + a[1].replace(l, "") + " ";
                    if (g) return a;
                    g = 0;
                    for (var k; null != (k = b[g]); g++) k && (e ^ (k.className && 0 <= (" " + k.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a)) ? c || d.push(k) : c && (b[g] = !1));
                    return ! 1
                },
                ID: function(a) {
                    return a[1].replace(l, "")
                },
                TAG: function(a, b) {
                    return a[1].replace(l, "").toLowerCase()
                },
                CHILD: function(a) {
                    if ("nth" === a[1]) {
                        a[2] || u.error(a[0]);
                        a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0;
                        a[3] = b[3] - 0
                    } else a[2] && u.error(a[0]);
                    a[0] = g++;
                    return a
                },
                ATTR: function(a, b, c, d, e, g) {
                    b = a[1] = a[1].replace(l, ""); ! g && r.attrMap[b] && (a[1] = r.attrMap[b]);
                    a[4] = (a[4] || a[5] || "").replace(l, "");
                    "~=" === a[2] && (a[4] = " " + a[4] + " ");
                    return a
                },
                PSEUDO: function(a, b, c, d, g) {
                    if ("not" === a[1]) if (1 < (e.exec(a[3]) || "").length || /^\w/.test(a[3])) a[3] = u(a[3], null, null, b);
                    else return a = u.filter(a[3], b, c, 1 ^ g),
                    c || d.push.apply(d, a),
                    !1;
                    else if (r.match.POS.test(a[0]) || r.match.CHILD.test(a[0])) return ! 0;
                    return a
                },
                POS: function(a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function(a) {
                    return ! 1 === a.disabled && "hidden" !== a.type
                },
                disabled: function(a) {
                    return ! 0 === a.disabled
                },
                checked: function(a) {
                    return ! 0 === a.checked
                },
                selected: function(a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return ! 0 === a.selected
                },
                parent: function(a) {
                    return !! a.firstChild
                },
                empty: function(a) {
                    return ! a.firstChild
                },
                has: function(a, b, c) {
                    return !! u(c[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                text: function(a) {
                    var b = a.getAttribute("type"),
                    c = a.type;
                    return "input" === a.nodeName.toLowerCase() && "text" === c && (b === c || null === b)
                },
                radio: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "radio" === a.type
                },
                checkbox: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type
                },
                file: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "file" === a.type
                },
                password: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "password" === a.type
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "submit" === a.type
                },
                image: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "image" === a.type
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "reset" === a.type
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b) {
                    return 0 === b
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1
                },
                even: function(a, b) {
                    return 0 === b % 2
                },
                odd: function(a, b) {
                    return 1 === b % 2
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1],
                    g = r.filters[e];
                    if (g) return g(a, c, b, d);
                    if ("contains" === e) return 0 <= (a.textContent || a.innerText || q([a]) || "").indexOf(b[3]);
                    if ("not" === e) {
                        b = b[3];
                        c = 0;
                        for (d = b.length; c < d; c++) if (b[c] === a) return ! 1;
                        return ! 0
                    }
                    u.error(e)
                },
                CHILD: function(a, b) {
                    var c, e, g, k, m, f;
                    c = b[1];
                    f = a;
                    switch (c) {
                    case "only":
                    case "first":
                        for (; f = f.previousSibling;) if (1 === f.nodeType) return ! 1;
                        if ("first" === c) return ! 0;
                        f = a;
                    case "last":
                        for (; f = f.nextSibling;) if (1 === f.nodeType) return ! 1;
                        return ! 0;
                    case "nth":
                        c = b[2];
                        e = b[3];
                        if (1 === c && 0 === e) return ! 0;
                        g = b[0];
                        if ((k = a.parentNode) && (k[d] !== g || !a.nodeIndex)) {
                            m = 0;
                            for (f = k.firstChild; f; f = f.nextSibling) 1 === f.nodeType && (f.nodeIndex = ++m);
                            k[d] = g
                        }
                        f = a.nodeIndex - e;
                        return 0 === c ? 0 === f: 0 === f % c && 0 <= f / c
                    }
                },
                ID: function(a, b) {
                    return 1 === a.nodeType && a.getAttribute("id") === b
                },
                TAG: function(a, b) {
                    return "*" === b && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === b
                },
                CLASS: function(a, b) {
                    return - 1 < (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b)
                },
                ATTR: function(a, b) {
                    var c = b[1],
                    c = u.attr ? u.attr(a, c) : r.attrHandle[c] ? r.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c),
                    d = c + "",
                    e = b[2],
                    g = b[4];
                    return null == c ? "!=" === e: !e && u.attr ? null != c: "=" === e ? d === g: "*=" === e ? 0 <= d.indexOf(g) : "~=" === e ? 0 <= (" " + d + " ").indexOf(g) : g ? "!=" === e ? d !== g: "^=" === e ? 0 === d.indexOf(g) : "$=" === e ? d.substr(d.length - g.length) === g: "|=" === e ? d === g || d.substr(0, g.length + 1) === g + "-": !1 : d && !1 !== c
                },
                POS: function(a, b, c, d) {
                    var e = r.setFilters[b[2]];
                    if (e) return e(a, c, b, d)
                }
            }
        },
        t = r.match.POS,
        v = function(a, b) {
            return "\\" + (b - 0 + 1)
        },
        y;
        for (y in r.match) r.match[y] = RegExp(r.match[y].source + /(?![^\[]*\])(?![^\(]*\))/.source),
        r.leftMatch[y] = RegExp(/(^(?:.|\r|\n)*?)/.source + r.match[y].source.replace(/\\(\d+)/g, v));
        var A = function(a, b) {
            a = Array.prototype.slice.call(a, 0);
            return b ? (b.push.apply(b, a), b) : a
        };
        try {
            Array.prototype.slice.call(s.documentElement.childNodes, 0)[0].nodeType
        } catch(w) {
            A = function(a, b) {
                var c = 0,
                d = b || [];
                if ("[object Array]" === k.call(a)) Array.prototype.push.apply(d, a);
                else if ("number" == typeof a.length) for (var e = a.length; c < e; c++) d.push(a[c]);
                else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var D, z;
        s.documentElement.compareDocumentPosition ? D = function(a, b) {
            return a === b ? (m = !0, 0) : a.compareDocumentPosition && b.compareDocumentPosition ? a.compareDocumentPosition(b) & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
        }: (D = function(a, b) {
            if (a === b) return m = !0,
            0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
            g = [];
            c = a.parentNode;
            d = b.parentNode;
            var k = c;
            if (c === d) return z(a, b);
            if (!c) return - 1;
            if (!d) return 1;
            for (; k;) e.unshift(k),
            k = k.parentNode;
            for (k = d; k;) g.unshift(k),
            k = k.parentNode;
            c = e.length;
            d = g.length;
            for (k = 0; k < c && k < d; k++) if (e[k] !== g[k]) return z(e[k], g[k]);
            return k === c ? z(a, g[k], -1) : z(e[k], b, 1)
        },
        z = function(a, b, c) {
            if (a === b) return c;
            for (a = a.nextSibling; a;) {
                if (a === b) return - 1;
                a = a.nextSibling
            }
            return 1
        }); (function() {
            var a = s.createElement("div"),
            b = "script" + (new Date).getTime(),
            c = s.documentElement;
            a.innerHTML = "<a name='" + b + "'/>";
            c.insertBefore(a, c.firstChild);
            s.getElementById(b) && (r.find.ID = function(a, b, c) {
                if ("undefined" != typeof b.getElementById && !c) return (b = b.getElementById(a[1])) ? b.id === a[1] || "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id").nodeValue === a[1] ? [b] : h: []
            },
            r.filter.ID = function(a, b) {
                var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                return 1 === a.nodeType && c && c.nodeValue === b
            });
            c.removeChild(a);
            c = a = null
        })(); (function() {
            var a = s.createElement("div");
            a.appendChild(s.createComment(""));
            0 < a.getElementsByTagName("*").length && (r.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if ("*" === a[1]) {
                    for (var d = [], e = 0; c[e]; e++) 1 === c[e].nodeType && d.push(c[e]);
                    c = d
                }
                return c
            });
            a.innerHTML = "<a href='#'></a>";
            a.firstChild && "undefined" != typeof a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (r.attrHandle.href = function(a) {
                return a.getAttribute("href", 2)
            });
            a = null
        })();
        s.querySelectorAll &&
        function() {
            var a = u,
            b = s.createElement("div");
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
                u = function(b, c, d, e) {
                    c = c || s;
                    if (!e && !u.isXML(c)) {
                        var g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (g && (1 === c.nodeType || 9 === c.nodeType)) {
                            if (g[1]) return A(c.getElementsByTagName(b), d);
                            if (g[2] && r.find.CLASS && c.getElementsByClassName) return A(c.getElementsByClassName(g[2]), d)
                        }
                        if (9 === c.nodeType) {
                            if ("body" === b && c.body) return A([c.body], d);
                            if (g && g[3]) {
                                var k = c.getElementById(g[3]);
                                if (!k || !k.parentNode) return A([], d);
                                if (k.id === g[3]) return A([k], d)
                            }
                            try {
                                return A(c.querySelectorAll(b), d)
                            } catch(f) {}
                        } else if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                            var g = c,
                            m = (k = c.getAttribute("id")) || "__sizzle__",
                            h = c.parentNode,
                            l = /^\s*[+~]/.test(b);
                            k ? m = m.replace(/'/g, "\\$&") : c.setAttribute("id", m);
                            l && h && (c = c.parentNode);
                            try {
                                if (!l || h) return A(c.querySelectorAll("[id='" + m + "'] " + b), d)
                            } catch(n) {} finally {
                                k || g.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, c, d, e)
                };
                for (var c in a) u[c] = a[c];
                b = null
            }
        } (); (function() {
            var a = s.documentElement,
            b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var c = !b.call(s.createElement("div"), "div"),
                d = !1;
                try {
                    b.call(s.documentElement, "[test!='']:sizzle")
                } catch(e) {
                    d = !0
                }
                u.matchesSelector = function(a, e) {
                    e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!u.isXML(a)) try {
                        if (d || !r.match.PSEUDO.test(e) && !/!=/.test(e)) {
                            var g = b.call(a, e);
                            if (g || !c || a.document && 11 !== a.document.nodeType) return g
                        }
                    } catch(k) {}
                    return 0 < u(e, null, null, [a]).length
                }
            }
        })(); (function() {
            var a = s.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length && (a.lastChild.className = "e", 1 !== a.getElementsByClassName("e").length && (r.order.splice(1, 0, "CLASS"), r.find.CLASS = function(a, b, c) {
                if ("undefined" != typeof b.getElementsByClassName && !c) return b.getElementsByClassName(a[1])
            },
            a = null))
        })();
        s.documentElement.contains ? u.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        }: s.documentElement.compareDocumentPosition ? u.contains = function(a, b) {
            return !! (a.compareDocumentPosition(b) & 16)
        }: u.contains = function() {
            return ! 1
        };
        u.isXML = function(a) {
            return (a = (a ? a.ownerDocument || a: 0).documentElement) ? "HTML" !== a.nodeName: !1
        };
        var E = function(a, b, c) {
            var d, e = [],
            g = "";
            for (b = b.nodeType ? [b] : b; d = r.match.PSEUDO.exec(a);) g += d[0],
            a = a.replace(r.match.PSEUDO, "");
            a = r.relative[a] ? a + "*": a;
            d = 0;
            for (var k = b.length; d < k; d++) u(a, b[d], e, c);
            return u.filter(g, e)
        };
        u.attr = c.attr;
        u.selectors.attrMap = {};
        c.find = u;
        c.expr = u.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = u.uniqueSort;
        c.text = u.getText;
        c.isXMLDoc = u.isXML;
        c.contains = u.contains
    })();
    var vb = /Until$/,
    wb = /^(?:parents|prevUntil|prevAll)/,
    xb = /,/,
    eb = /^.[^:#\[\.,]*$/,
    yb = Array.prototype.slice,
    La = c.expr.match.POS,
    zb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    c.fn.extend({
        find: function(a) {
            var b = this,
            e, d;
            if ("string" != typeof a) return c(a).filter(function() {
                e = 0;
                for (d = b.length; e < d; e++) if (c.contains(b[e], this)) return ! 0
            });
            var g = this.pushStack("", "find", a),
            k,
            f,
            h;
            e = 0;
            for (d = this.length; e < d; e++) if (k = g.length, c.find(a, this[e], g), 0 < e) for (f = k; f < g.length; f++) for (h = 0; h < k; h++) if (g[h] === g[f]) {
                g.splice(f--, 1);
                break
            }
            return g
        },
        has: function(a) {
            var b = c(a);
            return this.filter(function() {
                for (var a = 0,
                d = b.length; a < d; a++) if (c.contains(this, b[a])) return ! 0
            })
        },
        not: function(a) {
            return this.pushStack(va(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(va(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !! a && ("string" == typeof a ? La.test(a) ? 0 <= c(a, this.context).index(this[0]) : 0 < c.filter(a, this).length: 0 < this.filter(a).length)
        },
        closest: function(a, b) {
            var e = [],
            d,
            g,
            k = this[0];
            if (c.isArray(a)) {
                for (g = 1; k && k.ownerDocument && k !== b;) {
                    for (d = 0; d < a.length; d++) c(k).is(a[d]) && e.push({
                        selector: a[d],
                        elem: k,
                        level: g
                    });
                    k = k.parentNode;
                    g++
                }
                return e
            }
            var f = La.test(a) || "string" != typeof a ? c(a, b || this.context) : 0;
            d = 0;
            for (g = this.length; d < g; d++) for (k = this[d]; k;) {
                if (f ? -1 < f.index(k) : c.find.matchesSelector(k, a)) {
                    e.push(k);
                    break
                }
                k = k.parentNode;
                if (!k || !k.ownerDocument || k === b || 11 === k.nodeType) break
            }
            e = 1 < e.length ? c.unique(e) : e;
            return this.pushStack(e, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length: -1
        },
        add: function(a, b) {
            var e = "string" == typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
            d = c.merge(this.get(), e);
            return this.pushStack(e[0] && e[0].parentNode && 11 !== e[0].parentNode.nodeType && d[0] && d[0].parentNode && 11 !== d[0].parentNode.nodeType ? c.unique(d) : d)
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a: null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, e) {
            return c.dir(a, "parentNode", e)
        },
        next: function(a) {
            return c.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return c.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, e) {
            return c.dir(a, "nextSibling", e)
        },
        prevUntil: function(a, b, e) {
            return c.dir(a, "previousSibling", e)
        },
        siblings: function(a) {
            return c.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: c.makeArray(a.childNodes)
        }
    },
    function(a, b) {
        c.fn[a] = function(e, d) {
            var g = c.map(this, b, e);
            vb.test(a) || (d = e);
            d && "string" == typeof d && (g = c.filter(d, g));
            g = 1 < this.length && !zb[a] ? c.unique(g) : g; (1 < this.length || xb.test(d)) && wb.test(a) && (g = g.reverse());
            return this.pushStack(g, a, yb.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, e) {
            e && (a = ":not(" + a + ")");
            return 1 === b.length ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        },
        dir: function(a, b, e) {
            var d = [];
            for (a = a[b]; a && 9 !== a.nodeType && (e === h || 1 !== a.nodeType || !c(a).is(e));) 1 === a.nodeType && d.push(a),
            a = a[b];
            return d
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            for (d = 0; a && (1 !== a.nodeType || ++d !== b); a = a[c]);
            return a
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var ua = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Ab = / jQuery\d+="(?:\d+|null)"/g,
    ma = /^\s+/,
    Ma = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    Na = /<([\w:]+)/,
    Bb = /<tbody/i,
    Cb = /<|&#?\w+;/,
    Db = /<(?:script|style)/i,
    Eb = /<(?:script|object|embed|option|style)/i,
    Oa = RegExp("<(?:" + ua + ")", "i"),
    Pa = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Fb = /\/(java|ecma)script/i,
    db = /^\s*<!(?:\[CDATA\[|\-\-)/,
    J = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    },
    Qa = ta(s);
    J.optgroup = J.option;
    J.tbody = J.tfoot = J.colgroup = J.caption = J.thead;
    J.th = J.td;
    c.support.htmlSerialize || (J._default = [1, "div<div>", "</div>"]);
    c.fn.extend({
        text: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                var e = c(this);
                e.text(a.call(this, b, e.text()))
            }) : "object" != typeof a && a !== h ? this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a)) : c.text(this)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = c(this),
                e = b.contents();
                e.length ? e.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(e) {
                c(this).wrapAll(b ? a.call(this, e) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0,
            function(a) {
                1 === this.nodeType && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0,
            function(a) {
                1 === this.nodeType && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
            function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
            function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c.clean(arguments));
                return a
            }
        },
        remove: function(a, b) {
            for (var e = 0,
            d; null != (d = this[e]); e++) if (!a || c.filter(a, [d]).length) ! b && 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")), c.cleanData([d])),
            d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a = 0,
            b; null != (b = this[a]); a++) for (1 === b.nodeType && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(a, b) {
            a = null == a ? !1 : a;
            b = null == b ? a: b;
            return this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            if (a === h) return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(Ab, "") : null;
            if ("string" != typeof a || Db.test(a) || !c.support.leadingWhitespace && ma.test(a) || J[(Na.exec(a) || ["", ""])[1].toLowerCase()]) c.isFunction(a) ? this.each(function(b) {
                var d = c(this);
                d.html(a.call(this, b, d.html()))
            }) : this.empty().append(a);
            else {
                a = a.replace(Ma, "<$1></$2>");
                try {
                    for (var b = 0,
                    e = this.length; b < e; b++) 1 === this[b].nodeType && (c.cleanData(this[b].getElementsByTagName("*")), this[b].innerHTML = a)
                } catch(d) {
                    this.empty().append(a)
                }
            }
            return this
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (c.isFunction(a)) return this.each(function(b) {
                    var e = c(this),
                    d = e.html();
                    e.replaceWith(a.call(this, b, d))
                });
                "string" != typeof a && (a = c(a).detach());
                return this.each(function() {
                    var b = this.nextSibling,
                    e = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(e).append(a)
                })
            }
            return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, e) {
            var d, g, k, f = a[0],
            l = [];
            if (!c.support.checkClone && 3 === arguments.length && "string" == typeof f && Pa.test(f)) return this.each(function() {
                c(this).domManip(a, b, e, !0)
            });
            if (c.isFunction(f)) return this.each(function(d) {
                var g = c(this);
                a[0] = f.call(this, d, b ? g.html() : h);
                g.domManip(a, b, e)
            });
            if (this[0]) {
                k = f && f.parentNode;
                c.support.parentNode && k && 11 === k.nodeType && k.childNodes.length === this.length ? d = {
                    fragment: k
                }: d = c.buildFragment(a, this, l);
                k = d.fragment;
                1 === k.childNodes.length ? g = k = k.firstChild: g = k.firstChild;
                if (g) {
                    b = b && c.nodeName(g, "tr");
                    g = 0;
                    for (var p = this.length,
                    n = p - 1; g < p; g++) e.call(b ? c.nodeName(this[g], "table") ? this[g].getElementsByTagName("tbody")[0] || this[g].appendChild(this[g].ownerDocument.createElement("tbody")) : this[g] : this[g], d.cacheable || 1 < p && g < n ? c.clone(k, !0, !0) : k)
                }
                l.length && c.each(l, F)
            }
            return this
        }
    });
    c.buildFragment = function(a, b, e) {
        var d, g, k, f, h = a[0];
        b && b[0] && (f = b[0].ownerDocument || b[0]);
        f.createDocumentFragment || (f = s);
        1 === a.length && "string" == typeof h && 512 > h.length && f === s && "<" === h.charAt(0) && !Eb.test(h) && (c.support.checkClone || !Pa.test(h)) && (c.support.html5Clone || !Oa.test(h)) && (g = !0, k = c.fragments[h], k && 1 !== k && (d = k));
        d || (d = f.createDocumentFragment(), c.clean(a, f, d, e));
        g && (c.fragments[h] = k ? d: 1);
        return {
            fragment: d,
            cacheable: g
        }
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(a, b) {
        c.fn[a] = function(e) {
            var d = [];
            e = c(e);
            var g = 1 === this.length && this[0].parentNode;
            if (g && 11 === g.nodeType && 1 === g.childNodes.length && 1 === e.length) return e[b](this[0]),
            this;
            for (var g = 0,
            k = e.length; g < k; g++) {
                var f = (0 < g ? this.clone(!0) : this).get();
                c(e[g])[b](f);
                d = d.concat(f)
            }
            return this.pushStack(d, a, e.selector)
        }
    });
    c.extend({
        clone: function(a, b, e) {
            var d, g, k;
            c.support.html5Clone || !Oa.test("<" + a.nodeName) ? d = a.cloneNode(!0) : (d = s.createElement("div"), Qa.appendChild(d), d.innerHTML = a.outerHTML, d = d.firstChild);
            var f = d;
            if (! (c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a))) for (ra(a, f), d = aa(a), g = aa(f), k = 0; d[k]; ++k) g[k] && ra(d[k], g[k]);
            if (b && (sa(a, f), e)) for (d = aa(a), g = aa(f), k = 0; d[k]; ++k) sa(d[k], g[k]);
            return f
        },
        clean: function(a, b, e, d) {
            b = b || s;
            "undefined" == typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || s);
            for (var g = [], k, f = 0, h; null != (h = a[f]); f++) if ("number" == typeof h && (h += ""), h) {
                if ("string" == typeof h) if (Cb.test(h)) {
                    h = h.replace(Ma, "<$1></$2>");
                    k = (Na.exec(h) || ["", ""])[1].toLowerCase();
                    var l = J[k] || J._default,
                    n = l[0],
                    p = b.createElement("div");
                    b === s ? Qa.appendChild(p) : ta(b).appendChild(p);
                    for (p.innerHTML = l[1] + h + l[2]; n--;) p = p.lastChild;
                    if (!c.support.tbody) for (n = Bb.test(h), l = "table" !== k || n ? "<table>" !== l[1] || n ? [] : p.childNodes: p.firstChild && p.firstChild.childNodes, k = l.length - 1; 0 <= k; --k) c.nodeName(l[k], "tbody") && !l[k].childNodes.length && l[k].parentNode.removeChild(l[k]); ! c.support.leadingWhitespace && ma.test(h) && p.insertBefore(b.createTextNode(ma.exec(h)[0]), p.firstChild);
                    h = p.childNodes
                } else h = b.createTextNode(h);
                var r;
                if (!c.support.appendChecked) if (h[0] && "number" == typeof(r = h.length)) for (k = 0; k < r; k++) W(h[k]);
                else W(h);
                h.nodeType ? g.push(h) : g = c.merge(g, h)
            }
            if (e) for (a = function(a) {
                return ! a.type || Fb.test(a.type)
            },
            f = 0; g[f]; f++) ! d || !c.nodeName(g[f], "script") || g[f].type && "text/javascript" !== g[f].type.toLowerCase() ? (1 === g[f].nodeType && (b = c.grep(g[f].getElementsByTagName("script"), a), g.splice.apply(g, [f + 1, 0].concat(b))), e.appendChild(g[f])) : d.push(g[f].parentNode ? g[f].parentNode.removeChild(g[f]) : g[f]);
            return g
        },
        cleanData: function(a) {
            for (var b, e, d = c.cache,
            g = c.event.special,
            k = c.support.deleteExpando,
            f = 0,
            h; null != (h = a[f]); f++) if (!h.nodeName || !c.noData[h.nodeName.toLowerCase()]) if (e = h[c.expando]) {
                if ((b = d[e]) && b.events) {
                    for (var l in b.events) g[l] ? c.event.remove(h, l) : c.removeEvent(h, l, b.handle);
                    b.handle && (b.handle.elem = null)
                }
                k ? delete h[c.expando] : h.removeAttribute && h.removeAttribute(c.expando);
                delete d[e]
            }
        }
    });
    var na = /alpha\([^)]*\)/i,
    Gb = /opacity=([^)]*)/,
    Hb = /([A-Z]|^ms)/g,
    Ra = /^-?\d+(?:px)?$/i,
    Ib = /^-?\d/,
    Jb = /^([\-+])=([\-+.\de]+)/,
    Kb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    bb = ["Left", "Right"],
    cb = ["Top", "Bottom"],
    Q,
    Sa,
    Ta;
    c.fn.css = function(a, b) {
        return 2 === arguments.length && b === h ? this: c.access(this, a, b, !0,
        function(a, b, g) {
            return g !== h ? c.style(a, b, g) : c.css(a, b)
        })
    };
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Q(a, "opacity", "opacity");
                        return "" === c ? "1": c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(a, b, e, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var g, k = c.camelCase(b),
                f = a.style,
                l = c.cssHooks[k];
                b = c.cssProps[k] || k;
                if (e === h) return l && "get" in l && (g = l.get(a, !1, d)) !== h ? g: f[b];
                d = typeof e;
                "string" === d && (g = Jb.exec(e)) && (e = +(g[1] + 1) * +g[2] + parseFloat(c.css(a, b)), d = "number");
                if (! (null == e || "number" === d && isNaN(e) || ("number" === d && !c.cssNumber[k] && (e += "px"), l && "set" in l && (e = l.set(a, e)) === h))) try {
                    f[b] = e
                } catch(p) {}
            }
        },
        css: function(a, b, e) {
            var d, g;
            b = c.camelCase(b);
            g = c.cssHooks[b];
            b = c.cssProps[b] || b;
            "cssFloat" === b && (b = "float");
            if (g && "get" in g && (d = g.get(a, !0, e)) !== h) return d;
            if (Q) return Q(a, b)
        },
        swap: function(a, b, c) {
            var d = {},
            g;
            for (g in b) d[g] = a.style[g],
            a.style[g] = b[g];
            c.call(a);
            for (g in b) a.style[g] = d[g]
        }
    });
    c.curCSS = c.css;
    c.each(["height", "width"],
    function(a, b) {
        c.cssHooks[b] = {
            get: function(a, d, g) {
                var k;
                if (d) {
                    if (0 !== a.offsetWidth) return D(a, b, g);
                    c.swap(a, Kb,
                    function() {
                        k = D(a, b, g)
                    });
                    return k
                }
            },
            set: function(a, b) {
                if (!Ra.test(b)) return b;
                b = parseFloat(b);
                if (0 <= b) return b + "px"
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return Gb.test((b && a.currentStyle ? a.currentStyle.filter: a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "": b ? "1": ""
        },
        set: function(a, b) {
            var e = a.style,
            d = a.currentStyle,
            g = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")": "",
            k = d && d.filter || e.filter || "";
            e.zoom = 1;
            if (1 <= b && "" === c.trim(k.replace(na, "")) && (e.removeAttribute("filter"), d && !d.filter)) return;
            e.filter = na.test(k) ? k.replace(na, g) : k + " " + g
        }
    });
    c(function() {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function(a, b) {
                var e;
                c.swap(a, {
                    display: "inline-block"
                },
                function() {
                    b ? e = Q(a, "margin-right", "marginRight") : e = a.style.marginRight
                });
                return e
            }
        })
    });
    s.defaultView && s.defaultView.getComputedStyle && (Sa = function(a, b) {
        var e, d, g;
        b = b.replace(Hb, "-$1").toLowerCase(); (d = a.ownerDocument.defaultView) && (g = d.getComputedStyle(a, null)) && (e = g.getPropertyValue(b), "" === e && !c.contains(a.ownerDocument.documentElement, a) && (e = c.style(a, b)));
        return e
    });
    s.documentElement.currentStyle && (Ta = function(a, b) {
        var c, d, g, k = a.currentStyle && a.currentStyle[b],
        f = a.style;
        null === k && f && (g = f[b]) && (k = g); ! Ra.test(k) && Ib.test(k) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = "fontSize" === b ? "1em": k || 0, k = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d));
        return "" === k ? "auto": k
    });
    Q = Sa || Ta;
    c.expr && c.expr.filters && (c.expr.filters.hidden = function(a) {
        var b = a.offsetHeight;
        return 0 === a.offsetWidth && 0 === b || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || c.css(a, "display"))
    },
    c.expr.filters.visible = function(a) {
        return ! c.expr.filters.hidden(a)
    });
    var Lb = /%20/g,
    ab = /\[\]$/,
    Ua = /\r?\n/g,
    Mb = /#.*$/,
    Nb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    Ob = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    Pb = /^(?:GET|HEAD)$/,
    Qb = /^\/\//,
    Va = /\?/,
    Rb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    Sb = /^(?:select|textarea)/i,
    qa = /\s+/,
    Tb = /([?&])_=[^&]*/,
    Wa = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
    Xa = c.fn.load,
    ga = {},
    Ya = {},
    S, P, Za = ["*/"] + ["*"];
    try {
        S = jb.href
    } catch(Zb) {
        S = s.createElement("a"),
        S.href = "",
        S = S.href
    }
    P = Wa.exec(S.toLowerCase()) || [];
    c.fn.extend({
        load: function(a, b, e) {
            if ("string" != typeof a && Xa) return Xa.apply(this, arguments);
            if (!this.length) return this;
            var d = a.indexOf(" ");
            if (0 <= d) {
                var g = a.slice(d, a.length);
                a = a.slice(0, d)
            }
            d = "GET";
            b && (c.isFunction(b) ? (e = b, b = h) : "object" == typeof b && (b = c.param(b, c.ajaxSettings.traditional), d = "POST"));
            var k = this;
            c.ajax({
                url: a,
                type: d,
                dataType: "html",
                data: b,
                complete: function(a, b, d) {
                    d = a.responseText;
                    a.isResolved() && (a.done(function(a) {
                        d = a
                    }), k.html(g ? c("<div>").append(d.replace(Rb, "")).find(g) : d));
                    e && k.each(e, [d, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Sb.test(this.nodeName) || Ob.test(this.type))
            }).map(function(a, b) {
                var e = c(this).val();
                return null == e ? null: c.isArray(e) ? c.map(e,
                function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(Ua, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: e.replace(Ua, "\r\n")
                }
            }).get()
        }
    });
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
    function(a, b) {
        c.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    c.each(["get", "post"],
    function(a, b) {
        c[b] = function(a, d, g, k) {
            c.isFunction(d) && (k = k || g, g = d, d = h);
            return c.ajax({
                type: b,
                url: a,
                data: d,
                success: g,
                dataType: k
            })
        }
    });
    c.extend({
        getScript: function(a, b) {
            return c.get(a, h, b, "script")
        },
        getJSON: function(a, b, e) {
            return c.get(a, b, e, "json")
        },
        ajaxSetup: function(a, b) {
            b ? E(a, c.ajaxSettings) : (b = a, a = c.ajaxSettings);
            E(a, b);
            return a
        },
        ajaxSettings: {
            url: S,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(P[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Za
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": f.String,
                "text html": !0,
                "text json": c.parseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: A(ga),
        ajaxTransport: A(Ya),
        ajax: function(a, b) {
            function e(a, b, e, r) {
                if (2 !== D) {
                    D = 2;
                    y && clearTimeout(y);
                    A = h;
                    t = r || "";
                    z.readyState = 0 < a ? 4 : 0;
                    var q, s, u;
                    r = b;
                    if (e) {
                        var v = d,
                        w = z,
                        C = v.contents,
                        H = v.dataTypes,
                        za = v.responseFields,
                        F, I, L, J;
                        for (I in za) I in e && (w[za[I]] = e[I]);
                        for (;
                        "*" === H[0];) H.shift(),
                        F === h && (F = v.mimeType || w.getResponseHeader("content-type"));
                        if (F) for (I in C) if (C[I] && C[I].test(F)) {
                            H.unshift(I);
                            break
                        }
                        if (H[0] in e) L = H[0];
                        else {
                            for (I in e) {
                                if (!H[0] || v.converters[I + " " + H[0]]) {
                                    L = I;
                                    break
                                }
                                J || (J = I)
                            }
                            L = L || J
                        }
                        L ? (L !== H[0] && H.unshift(L), e = e[L]) : e = void 0
                    } else e = h;
                    if (200 <= a && 300 > a || 304 === a) {
                        if (d.ifModified) {
                            if (F = z.getResponseHeader("Last-Modified")) c.lastModified[n] = F;
                            if (F = z.getResponseHeader("Etag")) c.etag[n] = F
                        }
                        if (304 === a) r = "notmodified",
                        q = !0;
                        else try {
                            F = d;
                            F.dataFilter && (e = F.dataFilter(e, F.dataType));
                            var W = F.dataTypes;
                            I = {};
                            var K, M, S = W.length,
                            P, T = W[0],
                            N,
                            Q,
                            U,
                            V,
                            O;
                            for (K = 1; K < S; K++) {
                                if (1 === K) for (M in F.converters)"string" == typeof M && (I[M.toLowerCase()] = F.converters[M]);
                                N = T;
                                T = W[K];
                                if ("*" === T) T = N;
                                else if ("*" !== N && N !== T) {
                                    Q = N + " " + T;
                                    U = I[Q] || I["* " + T];
                                    if (!U) for (V in O = h, I) if (P = V.split(" "), P[0] === N || "*" === P[0]) if (O = I[P[1] + " " + T]) {
                                        V = I[V]; ! 0 === V ? U = O: !0 === O && (U = V);
                                        break
                                    }
                                    U || O || c.error("No conversion from " + Q.replace(" ", " to ")); ! 0 !== U && (e = U ? U(e) : O(V(e)))
                                }
                            }
                            s = e;
                            r = "success";
                            q = !0
                        } catch(kb) {
                            r = "parsererror",
                            u = kb
                        }
                    } else if (u = r, !r || a) r = "error",
                    0 > a && (a = 0);
                    z.status = a;
                    z.statusText = "" + (b || r);
                    q ? f.resolveWith(g, [s, r, z]) : f.rejectWith(g, [z, r, u]);
                    z.statusCode(p);
                    p = h;
                    E && k.trigger("ajax" + (q ? "Success": "Error"), [z, d, q ? s: u]);
                    l.fireWith(g, [z, r]);
                    E && (k.trigger("ajaxComplete", [z, d]), --c.active || c.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (b = a, a = h);
            b = b || {};
            var d = c.ajaxSetup({},
            b),
            g = d.context || d,
            k = g !== d && (g.nodeType || g instanceof c) ? c(g) : c.event,
            f = c.Deferred(),
            l = c.Callbacks("once memory"),
            p = d.statusCode || {},
            n,
            q = {},
            s = {},
            t,
            v,
            A,
            y,
            w,
            D = 0,
            E,
            F,
            z = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!D) {
                        var c = a.toLowerCase();
                        a = s[c] = s[c] || a;
                        q[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return 2 === D ? t: null
                },
                getResponseHeader: function(a) {
                    var b;
                    if (2 === D) {
                        if (!v) for (v = {}; b = Nb.exec(t);) v[b[1].toLowerCase()] = b[2];
                        b = v[a.toLowerCase()]
                    }
                    return b === h ? null: b
                },
                overrideMimeType: function(a) {
                    D || (d.mimeType = a);
                    return this
                },
                abort: function(a) {
                    a = a || "abort";
                    A && A.abort(a);
                    e(0, a);
                    return this
                }
            };
            f.promise(z);
            z.success = z.done;
            z.error = z.fail;
            z.complete = l.add;
            z.statusCode = function(a) {
                if (a) {
                    var b;
                    if (2 > D) for (b in a) p[b] = [p[b], a[b]];
                    else b = a[z.status],
                    z.then(b, b)
                }
                return this
            };
            d.url = ((a || d.url) + "").replace(Mb, "").replace(Qb, P[1] + "//");
            d.dataTypes = c.trim(d.dataType || "*").toLowerCase().split(qa);
            null == d.crossDomain && (w = Wa.exec(d.url.toLowerCase()), d.crossDomain = !(!w || w[1] == P[1] && w[2] == P[2] && (w[3] || ("http:" === w[1] ? 80 : 443)) == (P[3] || ("http:" === P[1] ? 80 : 443))));
            d.data && d.processData && "string" != typeof d.data && (d.data = c.param(d.data, d.traditional));
            r(ga, d, b, z);
            if (2 === D) return ! 1;
            E = d.global;
            d.type = d.type.toUpperCase();
            d.hasContent = !Pb.test(d.type);
            E && 0 === c.active++&&c.event.trigger("ajaxStart");
            if (!d.hasContent && (d.data && (d.url += (Va.test(d.url) ? "&": "?") + d.data, delete d.data), n = d.url, !1 === d.cache)) {
                w = c.now();
                var L = d.url.replace(Tb, "$1_=" + w);
                d.url = L + (L === d.url ? (Va.test(d.url) ? "&": "?") + "_=" + w: "")
            } (d.data && d.hasContent && !1 !== d.contentType || b.contentType) && z.setRequestHeader("Content-Type", d.contentType);
            d.ifModified && (n = n || d.url, c.lastModified[n] && z.setRequestHeader("If-Modified-Since", c.lastModified[n]), c.etag[n] && z.setRequestHeader("If-None-Match", c.etag[n]));
            z.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Za + "; q=0.01": "") : d.accepts["*"]);
            for (F in d.headers) z.setRequestHeader(F, d.headers[F]);
            if (d.beforeSend && (!1 === d.beforeSend.call(g, z, d) || 2 === D)) return z.abort(),
            !1;
            for (F in {
                success: 1,
                error: 1,
                complete: 1
            }) z[F](d[F]);
            if (A = r(Ya, d, b, z)) {
                z.readyState = 1;
                E && k.trigger("ajaxSend", [z, d]);
                d.async && 0 < d.timeout && (y = setTimeout(function() {
                    z.abort("timeout")
                },
                d.timeout));
                try {
                    D = 1,
                    A.send(q, e)
                } catch(C) {
                    if (2 > D) e( - 1, C);
                    else throw C;
                }
            } else e( - 1, "No Transport");
            return z
        },
        param: function(a, b) {
            var e = [],
            d = function(a, b) {
                b = c.isFunction(b) ? b() : b;
                e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            b === h && (b = c.ajaxSettings.traditional);
            if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a,
            function() {
                d(this.name, this.value)
            });
            else for (var g in a) t(g, a[g], b, d);
            return e.join("&").replace(Lb, "+")
        }
    });
    c.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Ub = c.now(),
    da = /(\=)\?(&|$)|\?\?/i;
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return c.expando + "_" + Ub++
        }
    });
    c.ajaxPrefilter("json jsonp",
    function(a, b, e) {
        b = "application/x-www-form-urlencoded" === a.contentType && "string" == typeof a.data;
        if ("jsonp" === a.dataTypes[0] || !1 !== a.jsonp && (da.test(a.url) || b && da.test(a.data))) {
            var d, g = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
            k = f[g],
            h = a.url,
            l = a.data,
            p = "$1" + g + "$2"; ! 1 !== a.jsonp && (h = h.replace(da, p), a.url === h && (b && (l = l.replace(da, p)), a.data === l && (h += (/\?/.test(h) ? "&": "?") + a.jsonp + "=" + g)));
            a.url = h;
            a.data = l;
            f[g] = function(a) {
                d = [a]
            };
            e.always(function() {
                f[g] = k;
                d && c.isFunction(k) && f[g](d[0])
            });
            a.converters["script json"] = function() {
                d || c.error(g + " was not called");
                return d[0]
            };
            a.dataTypes[0] = "json";
            return "script"
        }
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                c.globalEval(a);
                return a
            }
        }
    });
    c.ajaxPrefilter("script",
    function(a) {
        a.cache === h && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    c.ajaxTransport("script",
    function(a) {
        if (a.crossDomain) {
            var b, c = s.head || s.getElementsByTagName("head")[0] || s.documentElement;
            return {
                send: function(d, g) {
                    b = s.createElement("script");
                    b.async = "async";
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, d) {
                        if (d || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null,
                        c && b.parentNode && c.removeChild(b),
                        b = h,
                        d || g(200, "success")
                    };
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(0, 1)
                }
            }
        }
    });
    var oa = f.ActiveXObject ?
    function() {
        for (var a in X) X[a](0, 1)
    }: !1,
    Vb = 0,
    X;
    c.ajaxSettings.xhr = f.ActiveXObject ?
    function() {
        var a;
        if (! (a = !this.isLocal && v())) a: {
            try {
                a = new f.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch(b) {}
            a = void 0
        }
        return a
    }: v; (function(a) {
        c.extend(c.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        })
    })(c.ajaxSettings.xhr());
    c.support.ajax && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(e, d) {
                    var g = a.xhr(),
                    k,
                    m;
                    a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async);
                    if (a.xhrFields) for (m in a.xhrFields) g[m] = a.xhrFields[m];
                    a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
                    a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (m in e) g.setRequestHeader(m, e[m])
                    } catch(l) {}
                    g.send(a.hasContent && a.data || null);
                    b = function(e, f) {
                        var m, l, p, r, q;
                        try {
                            if (b && (f || 4 === g.readyState)) if (b = h, k && (g.onreadystatechange = c.noop, oa && delete X[k]), f) 4 !== g.readyState && g.abort();
                            else {
                                m = g.status;
                                p = g.getAllResponseHeaders();
                                r = {}; (q = g.responseXML) && q.documentElement && (r.xml = q);
                                r.text = g.responseText;
                                try {
                                    l = g.statusText
                                } catch(s) {
                                    l = ""
                                }
                                m || !a.isLocal || a.crossDomain ? 1223 === m && (m = 204) : m = r.text ? 200 : 404
                            }
                        } catch(t) {
                            f || d( - 1, t)
                        }
                        r && d(m, l, r, p)
                    };
                    a.async && 4 !== g.readyState ? (k = ++Vb, oa && (X || (X = {},
                    c(f).unload(oa)), X[k] = b), g.onreadystatechange = b) : b()
                },
                abort: function() {
                    b && b(0, 1)
                }
            }
        }
    });
    var fa = {},
    K, N, Wb = /^(?:toggle|show|hide)$/,
    Xb = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
    ea, pa = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
    Z;
    c.fn.extend({
        show: function(a, b, e) {
            var d;
            if (a || 0 === a) return this.animate(q("show", 3), a, b, e);
            b = 0;
            for (e = this.length; b < e; b++) a = this[b],
            a.style && (d = a.style.display, !c._data(a, "olddisplay") && "none" === d && (d = a.style.display = ""), "" === d && "none" === c.css(a, "display") && c._data(a, "olddisplay", p(a.nodeName)));
            for (b = 0; b < e; b++) if (a = this[b], a.style && (d = a.style.display, "" === d || "none" === d)) a.style.display = c._data(a, "olddisplay") || "";
            return this
        },
        hide: function(a, b, e) {
            if (a || 0 === a) return this.animate(q("hide", 3), a, b, e);
            var d;
            b = 0;
            for (e = this.length; b < e; b++) a = this[b],
            a.style && (d = c.css(a, "display"), "none" !== d && !c._data(a, "olddisplay") && c._data(a, "olddisplay", d));
            for (b = 0; b < e; b++) this[b].style && (this[b].style.display = "none");
            return this
        },
        _toggle: c.fn.toggle,
        toggle: function(a, b, e) {
            var d = "boolean" == typeof a;
            c.isFunction(a) && c.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || d ? this.each(function() {
                var b = d ? a: c(this).is(":hidden");
                c(this)[b ? "show": "hide"]()
            }) : this.animate(q("toggle", 3), a, b, e);
            return this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            },
            a, c, d)
        },
        animate: function(a, b, e, d) {
            function g() { ! 1 === k.queue && c._mark(this);
                var b = c.extend({},
                k),
                d = 1 === this.nodeType,
                e = d && c(this).is(":hidden"),
                g,
                f,
                h,
                l,
                r,
                q,
                s,
                t;
                b.animatedProperties = {};
                for (h in a) {
                    g = c.camelCase(h);
                    h !== g && (a[g] = a[h], delete a[h]);
                    f = a[g];
                    c.isArray(f) ? (b.animatedProperties[g] = f[1], f = a[g] = f[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if ("hide" === f && e || "show" === f && !e) return b.complete.call(this);
                    d && ("height" === g || "width" === g) && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === c.css(this, "display") && "none" === c.css(this, "float") && (c.support.inlineBlockNeedsLayout && "inline" !== p(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
                }
                null != b.overflow && (this.style.overflow = "hidden");
                for (h in a) d = new c.fx(this, b, h),
                f = a[h],
                Wb.test(f) ? (t = c._data(this, "toggle" + h) || ("toggle" === f ? e ? "show": "hide": 0), t ? (c._data(this, "toggle" + h, "show" === t ? "hide": "show"), d[t]()) : d[f]()) : (l = Xb.exec(f), r = d.cur(), l ? (q = parseFloat(l[2]), s = l[3] || (c.cssNumber[h] ? "": "px"), "px" !== s && (c.style(this, h, (q || 1) + s), r *= (q || 1) / d.cur(), c.style(this, h, r + s)), l[1] && (q = ("-=" === l[1] ? -1 : 1) * q + r), d.custom(r, q, s)) : d.custom(r, f, ""));
                return ! 0
            }
            var k = c.speed(b, e, d);
            if (c.isEmptyObject(a)) return this.each(k.complete, [!1]);
            a = c.extend({},
            a);
            return ! 1 === k.queue ? this.each(g) : this.queue(k.queue, g)
        },
        stop: function(a, b, e) {
            "string" != typeof a && (e = b, b = a, a = h);
            b && !1 !== a && this.queue(a || "fx", []);
            return this.each(function() {
                var b, g = !1,
                k = c.timers,
                f = c._data(this);
                e || c._unmark(!0, this);
                if (null == a) for (b in f) {
                    if (f[b] && f[b].stop && b.indexOf(".run") === b.length - 4) {
                        var h = f[b];
                        c.removeData(this, b, !0);
                        h.stop(e)
                    }
                } else f[b = a + ".run"] && f[b].stop && (f = f[b], c.removeData(this, b, !0), f.stop(e));
                for (b = k.length; b--;) k[b].elem !== this || null != a && k[b].queue !== a || (e ? k[b](!0) : k[b].saveState(), g = !0, k.splice(b, 1));
                e && g || c.dequeue(this, a)
            })
        }
    });
    c.each({
        slideDown: q("show", 1),
        slideUp: q("hide", 1),
        slideToggle: q("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(a, b) {
        c.fn[a] = function(a, c, g) {
            return this.animate(b, a, c, g)
        }
    });
    c.extend({
        speed: function(a, b, e) {
            var d = a && "object" == typeof a ? c.extend({},
            a) : {
                complete: e || !e && b || c.isFunction(a) && a,
                duration: a,
                easing: e && b || b && !c.isFunction(b) && b
            };
            d.duration = c.fx.off ? 0 : "number" == typeof d.duration ? d.duration: d.duration in c.fx.speeds ? c.fx.speeds[d.duration] : c.fx.speeds._default;
            if (null == d.queue || !0 === d.queue) d.queue = "fx";
            d.old = d.complete;
            d.complete = function(a) {
                c.isFunction(d.old) && d.old.call(this);
                d.queue ? c.dequeue(this, d.queue) : !1 !== a && c._unmark(this)
            };
            return d
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return ( - Math.cos(a * Math.PI) / 2 + 0.5) * d + c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b;
            this.elem = a;
            this.prop = c;
            b.orig = b.orig || {}
        }
    });
    c.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this); (c.fx.step[this.prop] || c.fx.step._default)(this)
        },
        cur: function() {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
            var a, b = c.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b: 0 : a
        },
        custom: function(a, b, e) {
            function d(a) {
                return g.step(a)
            }
            var g = this,
            f = c.fx;
            this.startTime = Z || w();
            this.end = b;
            this.now = this.start = a;
            this.pos = this.state = 0;
            this.unit = e || this.unit || (c.cssNumber[this.prop] ? "": "px");
            d.queue = this.options.queue;
            d.elem = this.elem;
            d.saveState = function() {
                g.options.hide && c._data(g.elem, "fxshow" + g.prop) === h && c._data(g.elem, "fxshow" + g.prop, g.start)
            };
            d() && c.timers.push(d) && !ea && (ea = setInterval(f.tick, f.interval))
        },
        show: function() {
            var a = c._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || c.style(this.elem, this.prop);
            this.options.show = !0;
            a !== h ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur());
            c(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = c._data(this.elem, "fxshow" + this.prop) || c.style(this.elem, this.prop);
            this.options.hide = !0;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, e, d = Z || w(),
            g = !0,
            f = this.elem,
            h = this.options;
            if (a || d >= h.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                h.animatedProperties[this.prop] = !0;
                for (b in h.animatedProperties) ! 0 !== h.animatedProperties[b] && (g = !1);
                if (g) {
                    null != h.overflow && !c.support.shrinkWrapBlocks && c.each(["", "X", "Y"],
                    function(a, b) {
                        f.style["overflow" + b] = h.overflow[a]
                    });
                    h.hide && c(f).hide();
                    if (h.hide || h.show) for (b in h.animatedProperties) c.style(f, b, h.orig[b]),
                    c.removeData(f, "fxshow" + b, !0),
                    c.removeData(f, "toggle" + b, !0); (a = h.complete) && (h.complete = !1, a.call(f))
                }
                return ! 1
            }
            Infinity == h.duration ? this.now = d: (e = d - this.startTime, this.state = e / h.duration, this.pos = c.easing[h.animatedProperties[this.prop]](this.state, e, 0, 1, h.duration), this.now = this.start + (this.end - this.start) * this.pos);
            this.update();
            return ! 0
        }
    };
    c.extend(c.fx, {
        tick: function() {
            for (var a, b = c.timers,
            e = 0; e < b.length; e++) a = b[e],
            !a() && b[e] === a && b.splice(e--, 1);
            b.length || c.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(ea);
            ea = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                c.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit: a.elem[a.prop] = a.now
            }
        }
    });
    c.each(["width", "height"],
    function(a, b) {
        c.fx.step[b] = function(a) {
            c.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    });
    c.expr && c.expr.filters && (c.expr.filters.animated = function(a) {
        return c.grep(c.timers,
        function(b) {
            return a === b.elem
        }).length
    });
    var Yb = /^t(?:able|d|h)$/i,
    $a = /^(?:body|html)$/i;
    "getBoundingClientRect" in s.documentElement ? c.fn.offset = function(a) {
        var b = this[0],
        e;
        if (a) return this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        try {
            e = b.getBoundingClientRect()
        } catch(d) {}
        var g = b.ownerDocument,
        f = g.documentElement;
        if (!e || !c.contains(f, b)) return e ? {
            top: e.top,
            left: e.left
        }: {
            top: 0,
            left: 0
        };
        b = g.body;
        g = l(g);
        return {
            top: e.top + (g.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0),
            left: e.left + (g.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)
        }
    }: c.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        var e, d = b.offsetParent,
        g = b.ownerDocument,
        f = g.documentElement,
        h = g.body;
        e = (g = g.defaultView) ? g.getComputedStyle(b, null) : b.currentStyle;
        for (var l = b.offsetTop,
        r = b.offsetLeft; (b = b.parentNode) && (b !== h && b !== f) && (!c.support.fixedPosition || "fixed" !== e.position);) e = g ? g.getComputedStyle(b, null) : b.currentStyle,
        l -= b.scrollTop,
        r -= b.scrollLeft,
        b === d && (l += b.offsetTop, r += b.offsetLeft, c.support.doesNotAddBorder && (!c.support.doesAddBorderForTableAndCells || !Yb.test(b.nodeName)) && (l += parseFloat(e.borderTopWidth) || 0, r += parseFloat(e.borderLeftWidth) || 0), d = b.offsetParent),
        c.support.subtractsBorderForOverflowNotVisible && "visible" !== e.overflow && (l += parseFloat(e.borderTopWidth) || 0, r += parseFloat(e.borderLeftWidth) || 0);
        if ("relative" === e.position || "static" === e.position) l += h.offsetTop,
        r += h.offsetLeft;
        c.support.fixedPosition && "fixed" === e.position && (l += Math.max(f.scrollTop, h.scrollTop), r += Math.max(f.scrollLeft, h.scrollLeft));
        return {
            top: l,
            left: r
        }
    };
    c.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
            e = a.offsetLeft;
            c.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(c.css(a, "marginTop")) || 0, e += parseFloat(c.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: e
            }
        },
        setOffset: function(a, b, e) {
            var d = c.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var g = c(a),
            f = g.offset(),
            h = c.css(a, "top"),
            l = c.css(a, "left"),
            r = {},
            n = {},
            p,
            q; ("absolute" === d || "fixed" === d) && -1 < c.inArray("auto", [h, l]) ? (n = g.position(), p = n.top, q = n.left) : (p = parseFloat(h) || 0, q = parseFloat(l) || 0);
            c.isFunction(b) && (b = b.call(a, e, f));
            null != b.top && (r.top = b.top - f.top + p);
            null != b.left && (r.left = b.left - f.left + q);
            "using" in b ? b.using.call(a, r) : g.css(r)
        }
    };
    c.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
            b = this.offsetParent(),
            e = this.offset(),
            d = $a.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            }: b.offset();
            e.top -= parseFloat(c.css(a, "marginTop")) || 0;
            e.left -= parseFloat(c.css(a, "marginLeft")) || 0;
            d.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
            d.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: e.top - d.top,
                left: e.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || s.body; a && !$a.test(a.nodeName) && "static" === c.css(a, "position");) a = a.offsetParent;
                return a
            })
        }
    });
    c.each(["Left", "Top"],
    function(a, b) {
        var e = "scroll" + b;
        c.fn[e] = function(b) {
            var g, f;
            return b === h ? (g = this[0], g ? (f = l(g)) ? "pageXOffset" in f ? f[a ? "pageYOffset": "pageXOffset"] : c.support.boxModel && f.document.documentElement[e] || f.document.body[e] : g[e] : null) : this.each(function() { (f = l(this)) ? f.scrollTo(a ? c(f).scrollLeft() : b, a ? b: c(f).scrollTop()) : this[e] = b
            })
        }
    });
    c.each(["Height", "Width"],
    function(a, b) {
        var e = b.toLowerCase();
        c.fn["inner" + b] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(c.css(a, e, "padding")) : this[e]() : null
        };
        c.fn["outer" + b] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(c.css(b, e, a ? "margin": "border")) : this[e]() : null
        };
        c.fn[e] = function(a) {
            var g = this[0];
            if (!g) return null == a ? null: this;
            if (c.isFunction(a)) return this.each(function(b) {
                var g = c(this);
                g[e](a.call(this, b, g[e]()))
            });
            if (c.isWindow(g)) {
                var f = g.document.documentElement["client" + b],
                l = g.document.body;
                return "CSS1Compat" === g.document.compatMode && f || l && l["client" + b] || f
            }
            return 9 === g.nodeType ? Math.max(g.documentElement["client" + b], g.body["scroll" + b], g.documentElement["scroll" + b], g.body["offset" + b], g.documentElement["offset" + b]) : a === h ? (g = c.css(g, e), f = parseFloat(g), c.isNumeric(f) ? f: g) : this.css(e, "string" == typeof a ? a: a + "px")
        }
    });
    f.jQuery = f.$ = c;
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [],
    function() {
        return c
    })
})(window); (function(f) {
    f = this[f] = this && this[f] || {};
    f.throttle = function(f, l, p) {
        var q, y, w, v = null,
        t = 0;
        p || (p = {});
        var E = function() {
            t = !1 === p.leading ? 0 : new Date;
            v = null;
            w = f.apply(q, y)
        };
        return function() {
            var r = new Date;
            t || !1 !== p.leading || (t = r);
            var A = l - (r - t);
            q = this;
            y = arguments;
            0 >= A ? (clearTimeout(v), v = null, t = r, w = f.apply(q, y)) : v || !1 === p.trailing || (v = setTimeout(E, A));
            return w
        }
    };
    f.debounce = function(f, l, p) {
        var q = null;
        l = l || 100;
        return function() {
            var y = this,
            w = arguments;
            q ? clearTimeout(q) : p && f.apply(y, w);
            q = setTimeout(function() {
                p || f.apply(y, w);
                q = null
            },
            l)
        }
    };
    f.xssFilter = function(f) {
        if (void 0 == f) return f;
        f = f.replace(/</g, "&lt;", f);
        return f = f.replace(/>/g, "&gt;", f)
    };
    f.ismoblie = "ontouchstart" in document.documentElement
})("GS");
var doTime = {
    debug: !1,
    time: null,
    s: "",
    e: "",
    begin: function() {
        var f = new Date;
        this.s = x = f.getTime();
        this.log("\u5f00\u59cb : " + f.toLocaleTimeString())
    },
    end: function() {
        var f = new Date;
        this.e = x = f.getTime();
        this.log("\u7ed3\u675f : " + f.toLocaleTimeString())
    },
    cal: function() {
        this.log("\u8fd0\u884c\u65f6\u95f4:" + (this.e - this.s) + "\u6beb\u79d2")
    },
    log: function(f) {
        this.debug && console.log(f)
    }
};
function gs_ga(f, h) {
    try {
        $.isArray(_gaq) && _gaq.push(["_tarckEvent", f, h])
    } catch(l) {
        console.log("ga.js is no fund")
    }
}
function OpenWindow(f) {
    window.open(f)
}
$(function() { (function(f) {
        var h = f("#gsNotice"),
        l = null;
        if (GS.ismoblie) {
            var p = 0;
            h.on("click",
            function() {
                0 === p++%2 ? (f(this).children(".glistbox").show(), f(this).children(0).addClass("ico_linkcurrent")) : (f(this).children(0).removeClass("ico_linkcurrent"), f(this).children(".glistbox").fadeOut("slow"));
                return ! 1
            })
        } else h.hover(function() {
            f(this).children(".glistbox").show();
            f(this).children(0).addClass("ico_linkcurrent");
            window.clearTimeout(l)
        },
        function() {
            f(this).children(0).removeClass("ico_linkcurrent");
            var h = f(this);
            l = window.setTimeout(function() {
                h.children(".glistbox").fadeOut("slow")
            },
            500)
        }),
        h.find("li").hover(function() {
            f(this).addClass("current")
        },
        function() {
            f(this).removeClass("current")
        }),
        h.find("a").click(function() {
            h.children(".glistbox").hide()
        })
    })(jQuery)
}); (function(f) {
    f.fn.gsrollnotice = function(h) {
        var l = f(this),
        p = null,
        q = 0,
        y = 0,
        w = 0;
        h = f.extend({
            item: "ul li",
            time: 3E3
        },
        h);
        l.find(h.item).hide().eq(0).show();
        w = l.find(h.item).length;
        1 < w && (l.hover(function() {
            q = 1
        },
        function() {
            q = 0
        }), p = window.setInterval(function() {
            if (0 == q) {
                y++;
                var f = y;
                l.find("li").hide().eq(f).fadeIn();
                w - 1 == y && (y = -1)
            }
        },
        h.time));
        l.find(".close").on("click",
        function() {
            l.css({
                visibility: "hidden"
            });
            window.clearInterval(p)
        })
    };
    f(function() {
        f("#gs_affiche").gsrollnotice()
    })
})(jQuery);
gs_ua = function() {
    var f = window,
    h = document,
    l = navigator,
    h = "undefined" != typeof h.getElementById && "undefined" != typeof h.getElementsByTagName && "undefined" != typeof h.createElement,
    p = l.userAgent.toLowerCase(),
    q = l.platform.toLowerCase(),
    y = q ? /win/.test(q) : /win/.test(p),
    q = q ? /mac/.test(q) : /mac/.test(p),
    p = /webkit/.test(p) ? parseFloat(p.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
    w = !+"\v1",
    v = [0, 0, 0],
    t = null;
    if ("undefined" != typeof l.plugins && "object" == typeof l.plugins["Shockwave Flash"]) ! (t = l.plugins["Shockwave Flash"].description) || "undefined" != typeof l.mimeTypes && l.mimeTypes["application/x-shockwave-flash"] && !l.mimeTypes["application/x-shockwave-flash"].enabledPlugin || (plugin = !0, w = !1, t = t.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), v[0] = parseInt(t.replace(/^(.*)\..*$/, "$1"), 10), v[1] = parseInt(t.replace(/^.*\.(.*)\s.*$/, "$1"), 10), v[2] = /[a-zA-Z]/.test(t) ? parseInt(t.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
    else if ("undefined" != typeof f.ActiveXObject) try {
        var E = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        E && (t = E.GetVariable("$version")) && (w = !0, t = t.split(" ")[1].split(","), v = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)])
    } catch(r) {}
    return {
        w3: h,
        pv: v,
        wk: p,
        ie: w,
        win: y,
        mac: q
    }
} ();
jQuery.sug = function(f, h) {
    this.params = f;
    this.element = h;
    this.defaultnotice = this.params.defaultValue || this.element.attr("default_notice") || "";
    this.defaultvalue = {};
    this.sugContents = function() {};
    this.addbox();
    this.sgtContainer = jQuery("#hKwordCon");
    this.sgtListcon = jQuery("#hKwordCon ul");
    this.setDefault();
    this.element.bind("focus", jQuery.proxy(this.inputFocus, this));
    this.element.bind("keydown", jQuery.proxy(this.onKeydown, this));
    this.element.bind("click",
    function(f) {
        f.stopPropagation()
    });
    jQuery(document).bind("click", jQuery.proxy(this.inputBlur, this));
    this.element.bind("contextmenu", jQuery.proxy(this.inputFocus, this));
    var l = this;
    $(window).resize(function() {
        l.setOffset(l.element, l.sgtContainer)
    })
};
jQuery.sug.prototype = {
    oCache: {},
    gos: 0,
    oldValue: "",
    isHide: !0,
    onTime: !1,
    kCode: {
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        ESC: 27
    },
    sgthtml: '<div id="hKwordCon" class="search-box"><ul></ul></div>',
    addToCache: function(f, h) {
        this.oCache[f] = [];
        this.oCache[f] = h
    },
    checkCache: function(f) {
        if (this.oCache[f]) return ! 0
    },
    getSuggestions: function(f) {
        this.oldValue = f;
        if ("" != f && f != this.defaultnotice) {
            var h = this; ! 0 == this.checkCache(f) ? this.displayResults(this.oCache[f]) : jQuery.getJSON(this.params.addressUrl + "?Jsoncallback=?", {
                keyword: escape(f)
            },
            function(l) {
                jQuery.proxy(h.displayResults(l), h);
                jQuery.proxy(h.addToCache(f, l), h)
            })
        } else jQuery.proxy(this.displayResults(this.defaultvalue), this)
    },
    displayResults: function(f) {
        this.clean();
        "" != this.element.val() && this.element.val() != this.defaultnotice && -10 != f.success ? (f = this.sugContents(f), this.sgtListcon.append(f), this.setOffset(this.element, this.sgtContainer), this.sgtContainer.show()) : (this.clearTime(), this.sgtContainer.hide())
    },
    inputFocus: function() {
        if (this.element.val() == this.defaultnotice || "" == this.element.val()) this.element.val(""),
        this.element.removeClass("sgtgray").addClass("sgtblack");
        this.params.isShow && (this.clearTime(), this.setTime())
    },
    inputBlur: function() {
        if (this.element.val() == this.defaultnotice || "" == this.element.val()) this.element.removeClass("sgtblack").addClass("sgtgray"),
        this.element.val(this.defaultnotice);
        this.sgtContainer.hide();
        this.clearTime()
    },
    onKeydown: function(f) {
        switch (f.keyCode) {
        case this.kCode.UP:
            return f = this.sgtListcon.find("a"),
            1 < f.length ? (this.gos--, -1 == this.gos && (this.gos = f.length - 1), this.selected(f.eq(this.gos))) : 1 == f.length && this.selected(f.eq(0)),
            !1;
        case this.kCode.DOWN:
            return f = this.sgtListcon.find("a"),
            1 < f.length ? (this.gos++, 1 != this.gos || this.sgtListcon.find("a").hasClass("current") || (this.gos = 0), this.gos == f.length && (this.gos = 0), this.selected(f.eq(this.gos))) : (f.length = 1) && this.selected(f.eq(0)),
            !1;
        case this.kCode.ENTER:
            return this.params.isShow || this.params.callBack(),
            this.element.val() == this.oldValue && (this.sgtListcon.find("a").hasClass("current") ? window.location.href = this.sgtListcon.find("a").eq(this.gos).attr("href") : this.params.callBack(), this.clearTime(), this.oldValue = this.element.val(), this.sgtContainer.hide()),
            !1;
        case this.kCode.ESC:
            return this.element.val(""),
            this.sgtContainer.hide(),
            !1;
        default:
            this.params.isShow && this.setTime()
        }
    },
    selected: function(f) {
        this.sgtListcon.find("a").removeClass("current");
        f.addClass("current")
    },
    clean: function() {
        this.gos = 0;
        this.sgtListcon.html("")
    },
    setOffset: function(f, h) {
        var l = f.offset(),
        p = f.outerHeight();
        h.css({
            top: l.top + p,
            left: l.left - 32.8
        })
    },
    setDefault: function() {
        "" == this.element.val() && (this.element.val(this.defaultnotice), this.element.removeClass("sgtblack").addClass("sgtgray"))
    },
    addCss: function(f) {
        var h = document.createElement("link");
        f = {
            type: "text/css",
            href: f,
            rel: "stylesheet"
        };
        for (var l in f) h[l] = f[l];
        jQuery("head").append(h)
    },
    addbox: function() {
        jQuery("body").append(this.sgthtml)
    },
    checkValue: function() {
        this.element.val() != this.oldValue && jQuery.proxy(this.getSuggestions(this.element.val()), this);
        this.params.isShow && (this.clearTime(), this.setTime())
    },
    setTime: function() {
        this.timeOut = setTimeout(jQuery.proxy(this.checkValue, this), 200);
        this.onTime = !0
    },
    clearTime: function() {
        0 != this.timeOut && clearTimeout(this.timeOut);
        this.onTime = !1
    }
};
jQuery.fn.fastSuggest = function(f) {
    f = new jQuery.sug(f, jQuery(this));
    f.defaultvalue = {};
    f.sugContents = function(f) {
        var l = "",
        p = GS.xssFilter(this.element.val()),
        q = "icon_des icon_attr icon_rest icon_shop icon_amus icon_attr_list".split(" ");
        if (f.List) {
            var y = f.List,
            w = y.length,
            v = 0;
            if (0 != w) {
                for (; v < w; v++) {
                    var t = [],
                    E = y[v],
                    r = E.Name,
                    A = parseInt(E.Type, 10),
                    D = E.Url,
                    A = 101 <= A ? A - 96 : A - 1,
                    A = q[A],
                    r = r || "";
                    matchName = r.match(RegExp(p, "i"));
                    r = r.replace(matchName, '<span class="keyword">' + matchName + "</span>");
                    null != E.DestName && "" != E.DestName && (r += "\uff0c" + E.DestName);
                    t.push("<li>");
                    t.push('\t<a href="http://you.ctrip.com' + D + '">');
                    t.push('\t\t<i class="' + A + '"></i>');
                    t.push(r);
                    t.push("\t</a>");
                    t.push("</li>");
                    l += t.join("")
                }
                l += '<li class="divider"></li>'
            }
        }
        f.TravelsUrl && (t = [], t.push("<li>"), t.push('\t<a href="http://you.ctrip.com' + f.TravelsUrl + '">'), t.push('\t\t\u641c\u7d22 \u201c<span class="keyword text_flow">' + p + "</span>\u201d \u7684\u76f8\u5173\u6e38\u8bb0"), t.push("\t</a>"), t.push("</li>"), l += t.join(""));
        f.QAUrl && (t = [], t.push("<li>"), t.push('\t<a href="http://you.ctrip.com' + f.QAUrl + '">'), t.push('\t\t\u641c\u7d22 \u201c<span class="keyword text_flow">' + p + "</span>\u201d \u7684\u76f8\u5173\u95ee\u7b54"), t.push("\t</a>"), t.push("</li>"), l += t.join(""));
        f.SearchUrl && (t = [], t.push('<li class="divider"></li>'), t.push("<li>"), t.push('\t<a href="http://you.ctrip.com' + f.SearchUrl + '">'), t.push('\t\t\u641c\u7d22 \u201c<span class="keyword text_flow">' + p + "</span>\u201d \u66f4\u591a\u76f8\u5173\u5185\u5bb9"), t.push("\t</a>"), t.push("</li>"), l += t.join(""));
        return l
    }
};
$(function() {
    function f() {
        var f = $("#gsSearch").val() || "";
        "\u641c\u7d22\u57ce\u5e02\u3001\u666f\u70b9\u3001\u6e38\u8bb0\u3001\u95ee\u7b54\u3001\u7528\u6237" == f && (f = "");
        "" != f && (window.location.href = "http://you.ctrip.com/SearchSite/?query=" + escape(f))
    }
    jQuery(".gs-search-2 .btn-search").click(function() {
        f();
        return ! 1
    });
    jQuery("#gsSearch").placeholder();
    jQuery("#gsSearch").attr("autocomplete", "off");
    jQuery("#gsSearch").fastSuggest({
        isShow: !0,
        addressUrl: "http://you.ctrip.com/SearchSite/Service/Tip2",
        callBack: function() {
            f()
        }
    })
});
$(function() {
    jQuery(".gs-nav li").eq(6).append('<span class="gs_newicon"></span>');
    0 < $(".gs-nav li").children(".gstips_supcount").length && $(".gs-nav li").children(".gstips_supcount").wrap("<span class='tipsbox_outer'></span>")
}); (function(f) {
    f.fn.FooterSeoScroll = function(h) {
        function l() {
            p.scrollLeft() >= q.outerWidth() / 2 || p.scrollLeft() >= q.outerWidth() - p.innerWidth() ? p.scrollLeft(0) : p.scrollLeft(p.scrollLeft() + w)
        }
        h = f.extend({
            speed: 1
        },
        h);
        var p = f(this),
        q = f(p).find("ul"),
        y = f(q).find("li");
        if (! (y.outerWidth() * y.length < p.innerWidth())) {
            y.clone().appendTo(q);
            y = f(q).find("li");
            q.css("width", y.outerWidth() * y.length);
            var w = 1,
            v = h.speed,
            t = setInterval(l, v);
            q.hover(function() {
                clearInterval(t)
            },
            function() {
                t = setInterval(l, v)
            })
        }
    }
})(jQuery);
$(function() {
    $(".footerseo .seojs2line .more").toggle(function() {
        $(this).html("-\u6536\u8d77");
        $(this).parent().next(".seojscon").css("height", "auto")
    },
    function() {
        $(this).html("+\u66f4\u591a");
        $(this).parent().next(".seojscon").css("height", "36px")
    });
    $(".footerseo .seojs3line .more").toggle(function() {
        $(this).html("-\u6536\u8d77");
        $(this).parent().next(".seojscon").css("height", "auto")
    },
    function() {
        $(this).html("+\u66f4\u591a");
        $(this).parent().next(".seojscon").css("height", "54px")
    });
    0 < $("#footerseo_marquee").length && $("#footerseo_marquee").FooterSeoScroll({
        speed: 20
    })
});
$(function() {
    1025 > window.screen.width && $("#gs_operate_right_fix").hide();
    $(".ico_linkpbox").attr("href", "javascritp:;")
}); (function(f) {
    f(function() {
        f("body").append('<div id="gsn_alert_box" class="gsn-layer" style="display:none">        <a class="close" href="javascript:$.popupbox.close()"></a>        <div class="gsn-form">        <h3 style="color: #0066CC;font-weight: normal; line-height: 2em; margin: 0;"></h3>        <div class="gsn-inputbox gsn-buttonbox" style="text-align: right;"><a class="gsn-btn-2" href="javascript:$.popupbox.close()">\u786e\u5b9a</a></div>        </div>')
    });
    var h = null;
    f.extend({
        gs_alert: function(l) {
            l = f.extend({
                text: "\u9ed8\u8ba4\u63d0\u793a\u6587\u5b57",
                id: "gsn_alert_box",
                width: "300",
                zindex: 140,
                callback: "",
                hasCloseBtn: !0,
                hasDetermineBtn: !0,
                time: 0
            },
            l);
            f("#" + l.id).css({
                width: l.width
            });
            var p = f("#" + l.id);
            clearTimeout(h);
            p.find("h3").html(l.text);
            l.hasCloseBtn ? p.find("a.close").show() : p.find("a.close").hide();
            l.hasDetermineBtn ? p.find(".gsn-inputbox").show() : p.find(".gsn-inputbox").hide();
            l.time && (h = setTimeout(function() {
                f.popupbox.close()
            },
            l.time));
            f.popupbox.show({
                id: l.id,
                zIndex: l.zindex,
                callback: l.callback
            })
        }
    });
    f.extend({
        popupbox: {
            openID: "",
            position: "",
            mt: "",
            parentIsLoad: !0,
            init: function(h, p) {
                void 0 == h && (h = "gs_box");
                this.parentIsLoad && (f('<div id="' + h + '"></div>').appendTo("body"), f('<div class="gs_SHUCOVER_V1 gs_hide" id="gs_SHUCOVER_V1" style="z-index:' + p + '"><iframe class="gs_SHUCOVER_IFRAME_V1" id="gs_SHUCOVER_IFRAME_V1" src="about:blank"></iframe></div>').appendTo("body"), this.parentIsLoad = !1)
            },
            show: function(h) {
                var p = {
                    overlay: {
                        color: "#fff",
                        opacity: 0.5
                    },
                    position: "fixed",
                    zIndex: 140,
                    ani: ["500", "slow", "fast"],
                    mt: "200px",
                    layerContainer: "gs_LAYER_PARENT_FRAME_V1"
                },
                p = f.extend(p, h);
                if (!document.getElementById(p.id)) return alert("noid:" + p.id),
                !1;
                this.init(p.layerContainer, p.zIndex);
                this.position = p.position;
                this.mt = p.mt;
                this.ani = p.ani;
                this.openID = h.id;
                this.setpos(f("#" + this.openID), p.zIndex);
                this.is6FIX("100%");
                f("#" + this.openID).prependTo(f("#" + p.layerContainer));
                f("#" + this.openID).show(p.ani[0]);
                f("#gs_SHUCOVER_V1").css({
                    "background-color": p.overlay.color,
                    opacity: p.overlay.opacity
                }).show();
                "function" === typeof h.callback && h.callback()
            },
            setpos: function(f, h) {
                f.addClass("gs_LAYER_PARENT_V1");
                var q = f.outerHeight(),
                y = f.outerWidth();
                f.css({
                    "margin-left": -1 * (y / 2),
                    "margin-top": -1 * (q / 2),
                    "z-index": h + 1
                }); (q > (0 == document.body.clientHeight ? document.body.clientHeight: document.documentElement.clientHeight) || "absolute" === this.position) && f.css({
                    top: this.mt,
                    position: "absolute",
                    marginTop: "0"
                })
            },
            close: function(l) {
                if ("" == this.openID) return ! 1;
                clearTimeout(h);
                f("#" + this.openID).hide(this.ani[1]);
                f("#" + this.openID).removeClass("gs_LAYER_PARENT_V1");
                f("#gs_SHUCOVER_V1").hide(this.ani[2]);
                this.is6FIX("auto");
                "function" === typeof l && l()
            },
            is6FIX: function(h) {
                f.browser.msie && "6.0" == f.browser.version && (f("html").css({
                    height: h
                }), f("body").css({
                    height: h,
                    backgroundImage: "url(about:blank)",
                    backgroundAttachment: "fixed"
                }))
            }
        }
    })
})(jQuery);
$(function() { (!$.browser.msie || "6.0" != $.browser.version) && 1024 < window.screen.width && ($("body").append($('<div id="gs_feedback_gotop"><div class="side_fixed">\t\t    <a class="to_top" title="\u56de\u5230\u9876\u7aef" href="javascript:;" id="gotop2" style="visibility: visible;">&nbsp;</a>\t\t    <a target="_blank" class="c_fq" href="http://accounts.ctrip.com/MyCtrip/Community/CommunityAdvice.aspx?productType=16">\u53cd\u9988\u5efa\u8bae</a>\t        </div></div>')), $("#gotop2").on("click",
    function() {
        $("html, body").animate({
            scrollTop: 0
        })
    }), $(window).scroll(function() {
        100 < $(this).scrollTop() ? $("#gotop2").fadeIn() : $("#gotop2").fadeOut()
    }))
}); (function(f) {
    var h = function() {
        function f(h, l) {
            if (ud_browser.IE6) for (var p = document.getElementsByTagName("select"), q = h ? "visible": "hidden", t = 0; t < p.length; t++) {
                var v;
                if (! (v = h)) {
                    for (v = p[t]; v && v != l;) v = v.parentNode;
                    v = v != l
                }
                v && p[t].currentStyle.visibility != q && (p[t].style.visibility = q)
            }
        }
        function p() {
            if (v) {
                var f = {
                    docWidth: document.documentElement.scrollWidth,
                    docHeight: document.documentElement.scrollHeight,
                    winWidth: document.documentElement.clientWidth,
                    winHeight: document.documentElement.clientHeight,
                    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
                    scrollTop: document.documentElement.scrollTop || document.body.scrollTop
                };
                f.docWidth = Math.max(f.docWidth, f.winWidth);
                f.docHeight = Math.max(f.docHeight, f.winHeight);
                ud_support.testIEZoom();
                f.left = 0;
                f.top = 0;
                f.width = Math.max(f.docWidth, f.winWidth);
                f.height = Math.max(f.docHeight, f.winHeight);
                q(w, f);
                var l = {
                    left: (f.winWidth - v.offsetWidth >> 1) + f.scrollLeft + (h.adjustX || 0),
                    top: (f.winHeight - v.offsetHeight >> 1) + f.scrollTop + (h.adjustY || 0)
                };
                l.left < f.scrollLeft && (l.left = f.scrollLeft);
                l.top < f.scrollTop && (l.top = f.scrollTop);
                q(v, l)
            }
        }
        function q(f, h) {
            var l = f.style;
            l.left = (h.left || 0) + "px";
            l.top = (h.top || 0) + "px";
            "width" in h && (l.width = h.width + "px");
            "height" in h && (l.height = h.height + "px")
        }
        function y(f, h) {
            if (f && (f.style.visibility = "visible", !h)) {
                if (/lepad/.test(navigator.userAgent)) var l = f.getBoundingClientRect(),
                p = -l.width - 100 + "px",
                l = -l.height - 100 + "px";
                else var p = -f.offsetWidth - 100 + "px",
                l = -f.offsetHeight - 100 + "px";
                f.style.left = p;
                f.style.top = l;
                try {
                    var q = f.getElementById("gs_initMaskiframe");
                    q.style.left = p;
                    q.style.top = l
                } catch(t) {}
            }
        }
        var w = null,
        v = null,
        t = !1,
        E = {
            onresize: null,
            onscroll: null
        };
        return function(q, A) {
            w || (maskif = document.createElement("iframe"), maskif.src = "about:blank", maskif.setAttribute("id", "gs_initMaskiframe"), maskif.style.cssText = "position:absolute;width:100%;height:100%;border:none;filter:alpha(opacity=0);opacity:0;left:0;top:0;z-index:-1", w = document.createElement("div"), w.appendChild(maskif), w.style.cssText = "background-color:#000;border:none;position:absolute;visibility:hidden;opacity:0.5;filter:alpha(opacity=50)", document.body.appendChild(w), h.mask = w);
            t = !!A;
            var D;
            if (q) {
                v && y(v, !1);
                v = q[0];
                var F = v.style;
                F.position = "absolute";
                F.left = "-10000px";
                F.top = "-10000px";
                F.visibility = "visible";
                F.display = "block";
                F.zIndex = 100;
                p();
                w.style.zIndex = h.zIndexBack || 1500;
                v.style.zIndex = h.zIndexFore || 2E3;
                y(v, !0);
                y(w, !0);
                f(!1, q);
                if (!t) for (D in E) E[D] = window[D],
                window[D] = p
            } else if (y(v, !1), y(w, !1), f(!0), v = null, !t) for (D in E) window[D] = E[D],
            E[D] = null
        }
    } ();
    ud_browser = function(f) {
        var h = /opera/.test(f),
        q = /chrome/.test(f),
        y = /webkit/.test(f),
        w = !q && /safari/.test(f),
        v = !h && /msie/.test(f),
        t = v && /msie 7/.test(f),
        E = v && /msie 8/.test(f),
        r = v && /msie 9/.test(f),
        A = v && !t && !E && !r,
        D = !y && /gecko/.test(f);
        f = D && /rv:1\.8/.test(f);
        return {
            IE: v,
            IE6: A,
            IE7: t,
            IE8: E,
            IE9: r,
            Moz: D,
            FF2: f,
            Opera: h,
            Safari: w,
            WebKit: y,
            Chrome: q
        }
    } (navigator.userAgent.toLowerCase());
    ud_support = {
        testIEZoom: function() {
            if (!ud_browser.IE7) return 1;
            var f = ud_support.zoomTester;
            if (!f) {
                var f = document.body,
                f = ud_status.container || f,
                h = document.createElement("div");
                h.style.cssText = "position:absolute;left:-10000px;top:-10000px;width:100px;height:100px;";
                f.appendChild(h);
                f = this.zoomTester = h
            }
            f = f.getBoundingClientRect();
            return (f.right - f.left) / 100 || 1
        },
        zoomTester: null
    };
    ud_status = new
    function() {
        this.container = window.document.getElementById("jsContainer")
    };
    f(function() {
        f("body").on("click", ".a_popup_login",
        function() {
            __SSO_booking(this.id, 0);
            return ! 1
        })
    });
    window.maskShow = h;
    f.fn.mask = function() {
        h(f(this), !0)
    };
    f.fn.unmask = function() {
        h(null, !0)
    }
})(window.jQuery); (function(f) {
    f.fn.LpPopupBox = function(h) {
        function l() {
            if (h.isSetPos) {
                var l = f("#popup_win", h.istop.document),
                p = f(h.istop),
                w = p.scrollTop(),
                v = (p.width() - l.width()) / 2 - h.boxBorder,
                t = f.browser.msie && "6.0" == f.browser.version ? (p.height() - l.height()) / 2 - h.boxBorder + w: (p.height() - l.height()) / 2 - h.boxBorder;
                l.css({
                    left: v + "px",
                    top: t + "px"
                });
                f.browser.msie && "6.0" == f.browser.version && (f("#popup_win_bg", h.istop.document).height(f(h.istop.document).height()), f(h.istop).scroll(function() {
                    l.css({
                        top: p.scrollTop() + (t - w) + "px"
                    })
                }))
            }
        }
        h = f.extend({
            boxHtml: '<div class="popup_win" id="popup_win"> <a href="javascript:;" class="popup_win_close" id="popup_win_close">X</a><div class="popup_loading">\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u5019...</div></div>',
            boxBg: '<div class="popup_win_bg" id="popup_win_bg"></div>',
            outurl: "",
            boxBorder: 5,
            type: "ajax",
            appendTo: "body",
            autoDisplay: !1,
            isBack: !0,
            isSetPos: !0,
            istop: window != top ? window.top: window
        },
        h);
        var p = this;
        this.showBox = function() {
            f("#popup_win", h.istop.document).remove();
            f("#popup_win_bg", h.istop.document).remove();
            f(h.appendTo, h.istop.document).append(f(h.boxBg + "" + h.boxHtml, h.istop.document));
            l();
            this.load()
        };
        this.load = function() {
            switch (h.type) {
            case "ajax":
                f.ajax({
                    url:
                    h.outurl,
                    dataType: "html",
                    cache: !1,
                    success: function(f) {
                        p.appendContent(f)
                    }
                });
                break;
            case "iframe":
                h = f.extend(h, {
                    width: h.width || "",
                    height: h.height || ""
                });
                this.appendContent('<iframe src="' + h.outurl + '" id="LpPopupIframe" height="' + h.height + '" width="' + h.width + '"></iframe>');
                break;
            case "innerhtml":
                "object" == typeof h.outurl ? this.appendContent(h.outurl.html()) : this.appendContent(h.outurl)
            }
        };
        this.closeBox = function() {
            f("#popup_win_close", h.istop.document).click(function() {
                if (h.autoDisplay && h.isBack) return document.referrer && /lvping(.*)\.com/.test(document.referrer) && 1 < history.length ? history.back() : location.href = "/",
                !1;
                f("#popup_win_bg", h.istop.document).remove();
                f("#popup_win", h.istop.document).remove();
                "function" === typeof h.callafter && h.callafter.call(p)
            })
        };
        this.appendContent = function(p) {
            f(h.boxHtml, h.istop.document).append(p).replaceAll(f("#popup_win", h.istop.document));
            f(".popup_loading", h.istop.document).remove();
            l();
            this.closeBox()
        };
        this.inte = function() {
            h.autoDisplay && (p.showBox(), h.callback && h.callback(f(this)));
            f(this).live("click",
            function(l) {
                if (!f.fn.LpPopupBox.display.undis) return h.callbefore && h.callbefore(f(this), h),
                p.showBox(),
                h.callback && h.callback(f(this)),
                !1
            });
            f(window).resize(function() {
                l()
            })
        };
        f.fn.LpPopupBox.outerClose = function() {
            f("#popup_win_bg", h.istop.document).remove();
            f("#popup_win", h.istop.document).remove();
            "function" === typeof h.callafter && h.callafter.call(p)
        };
        this.inte()
    };
    f.fn.LpPopupBox.display = {
        undis: !1
    }
})(jQuery); (function() {
    for (var f = document.getElementsByTagName("script") || [], h = /_bfa\.min\.js/i, l = 0; l < f.length; l++) if (h.test(f[l].src)) return;
    if (! (window.$_bf || window.$LAB || window.CtripJsLoader)) {
        f = new Date;
        h = "?v=" + f.getFullYear() + f.getMonth() + "_" + f.getDate() + ".js";
        f = document.createElement("script");
        f.type = "text/javascript";
        f.charset = "utf-8";
        f.async = !0;
        try {
            var p = "https:" == document.location.protocol
        } catch(q) {
            p = "https:" == document.URL.match(/[^:]+/) + ":"
        }
        f.src = p ? "https://s.c-ctrip.com/_bfa.min.js" + h: "http://webresource.c-ctrip.com/code/ubt/_bfa.min.js" + h;
        p = document.getElementsByTagName("script")[0];
        p.parentNode.insertBefore(f, p)
    }
})();

/* 2014-06-03 14:46:16 chenwp */
