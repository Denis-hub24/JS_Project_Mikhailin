(function ymapsInit(e) { var n = this, t = { ns: {}, supports: {}, env: e }; t.performance = { now: n.performance && n.performance.now ? n.performance.now.bind(n.performance) : function () { return Date.now() } }, t.count = function (e) { function n() { r.push(arguments) } var t = { exports: {} }, r = (t.exports, []), o = null, i = function () { (o || n).apply(null, arguments) }; return i.provideImplementation = function (e) { if (o) throw new Error("ym.count: implementation was already provided."); o = e(r) }, t.exports = i, t.exports }(), t.vow = t.ns.vow = function (e) { var t, r = { exports: {} }; r.exports; return function (e) { var n, o = function () { var n = [], t = function (e) { return n.push(e), 1 === n.length }, r = function () { var e = n, t = 0, r = n.length; for (n = []; t < r;)e[t++]() }; if ("function" == typeof setImmediate) return function (e) { t(e) && setImmediate(r) }; if ("object" == typeof process && process.nextTick) return function (e) { t(e) && process.nextTick(r) }; var o = e.MutationObserver || e.WebKitMutationObserver; if (o) { var i = 1, s = document.createTextNode(""); return new o(r).observe(s, { characterData: !0 }), function (e) { t(e) && (s.data = i *= -1) } } if (e.postMessage) { var a = !0; if (e.attachEvent) { var u = function () { a = !1 }; e.attachEvent("onmessage", u), e.postMessage("__checkAsync", "*"), e.detachEvent("onmessage", u) } if (a) { var c = "__promise" + Math.random() + "_" + new Date, l = function (e) { e.data === c && (e.stopPropagation && e.stopPropagation(), r()) }; return e.addEventListener ? e.addEventListener("message", l, !0) : e.attachEvent("onmessage", l), function (n) { t(n) && e.postMessage(c, "*") } } } var f = e.document; if ("onreadystatechange" in f.createElement("script")) { var d = function () { var e = f.createElement("script"); e.onreadystatechange = function () { e.parentNode.removeChild(e), e = e.onreadystatechange = null, r() }, (f.documentElement || f.body).appendChild(e) }; return function (e) { t(e) && d() } } return function (e) { t(e) && setTimeout(r, 0) } }(), i = function (e) { o(function () { throw e }) }, s = function (e) { return "function" == typeof e }, a = function (e) { return null !== e && "object" == typeof e }, u = Object.prototype.toString, c = Array.isArray || function (e) { return "[object Array]" === u.call(e) }, l = function (e) { for (var n = [], t = 0, r = e.length; t < r;)n.push(t++); return n }, f = Object.keys || function (e) { var n = []; for (var t in e) e.hasOwnProperty(t) && n.push(t); return n }, d = function (e) { var n = function (n) { this.name = e, this.message = n }; return n.prototype = new Error, n }, p = function (e, n) { return function (t) { e.call(this, t, n) } }, v = function () { this._promise = new m }; v.prototype = { promise: function () { return this._promise }, resolve: function (e) { this._promise.isResolved() || this._promise._resolve(e) }, reject: function (e) { this._promise.isResolved() || (_.isPromise(e) ? (e = e.then(function (e) { var n = _.defer(); return n.reject(e), n.promise() }), this._promise._resolve(e)) : this._promise._reject(e)) }, notify: function (e) { this._promise.isResolved() || this._promise._notify(e) } }; var h = { PENDING: 0, RESOLVED: 1, FULFILLED: 2, REJECTED: 3 }, m = function (e) { if (this._value = n, this._status = h.PENDING, this._fulfilledCallbacks = [], this._rejectedCallbacks = [], this._progressCallbacks = [], e) { var t = this, r = e.length; e(function (e) { t.isResolved() || t._resolve(e) }, r > 1 ? function (e) { t.isResolved() || t._reject(e) } : n, r > 2 ? function (e) { t.isResolved() || t._notify(e) } : n) } }; m.prototype = { valueOf: function () { return this._value }, isResolved: function () { return this._status !== h.PENDING }, isFulfilled: function () { return this._status === h.FULFILLED }, isRejected: function () { return this._status === h.REJECTED }, then: function (e, n, t, r) { var o = new v; return this._addCallbacks(o, e, n, t, r), o.promise() }, "catch": function (e, t) { return this.then(n, e, t) }, fail: function (e, t) { return this.then(n, e, t) }, always: function (e, n) { var t = this, r = function () { return e.call(this, t) }; return this.then(r, r, n) }, progress: function (e, t) { return this.then(n, n, e, t) }, spread: function (e, n, t) { return this.then(function (n) { return e.apply(this, n) }, n, t) }, done: function (e, n, t, r) { this.then(e, n, t, r).fail(i) }, delay: function (e) { var n, t = this.then(function (t) { var r = new v; return n = setTimeout(function () { r.resolve(t) }, e), r.promise() }); return t.always(function () { clearTimeout(n) }), t }, timeout: function (e) { var n = new v, t = setTimeout(function () { n.reject(new _.TimedOutError("timed out")) }, e); return this.then(function (e) { n.resolve(e) }, function (e) { n.reject(e) }), n.promise().always(function () { clearTimeout(t) }), n.promise() }, _vow: !0, _resolve: function (e) { if (!(this._status > h.RESOLVED)) { if (e === this) return void this._reject(TypeError("Can't resolve promise with itself")); if (this._status = h.RESOLVED, e && e._vow) return void (e.isFulfilled() ? this._fulfill(e.valueOf()) : e.isRejected() ? this._reject(e.valueOf()) : e.then(this._fulfill, this._reject, this._notify, this)); if (a(e) || s(e)) { var n; try { n = e.then } catch (t) { return void this._reject(t) } if (s(n)) { var r = this, o = !1; try { n.call(e, function (e) { o || (o = !0, r._resolve(e)) }, function (e) { o || (o = !0, r._reject(e)) }, function (e) { r._notify(e) }) } catch (t) { o || this._reject(t) } return } } this._fulfill(e) } }, _fulfill: function (e) { this._status > h.RESOLVED || (this._status = h.FULFILLED, this._value = e, this._callCallbacks(this._fulfilledCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n) }, _reject: function (e) { this._status > h.RESOLVED || (this._status = h.REJECTED, this._value = e, this._callCallbacks(this._rejectedCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n) }, _notify: function (e) { this._callCallbacks(this._progressCallbacks, e) }, _addCallbacks: function (e, t, r, o, i) { r && !s(r) ? (i = r, r = n) : o && !s(o) && (i = o, o = n); var a; this.isRejected() || (a = { defer: e, fn: s(t) ? t : n, ctx: i }, this.isFulfilled() ? this._callCallbacks([a], this._value) : this._fulfilledCallbacks.push(a)), this.isFulfilled() || (a = { defer: e, fn: r, ctx: i }, this.isRejected() ? this._callCallbacks([a], this._value) : this._rejectedCallbacks.push(a)), this._status <= h.RESOLVED && this._progressCallbacks.push({ defer: e, fn: o, ctx: i }) }, _callCallbacks: function (e, n) { var t = e.length; if (t) { var r = this.isResolved(), i = this.isFulfilled(), s = this.isRejected(); o(function () { for (var o, a, u, c = 0; c < t;)if (o = e[c++], a = o.defer, u = o.fn) { var l, f = o.ctx; try { l = f ? u.call(f, n) : u(n) } catch (d) { a.reject(d); continue } r ? a.resolve(l) : a.notify(l) } else i ? a.resolve(n) : s ? a.reject(n) : a.notify(n) }) } } }; var y = { cast: function (e) { return _.cast(e) }, all: function (e) { return _.all(e) }, race: function (e) { return _.anyResolved(e) }, resolve: function (e) { return _.resolve(e) }, reject: function (e) { return _.reject(e) } }; for (var g in y) y.hasOwnProperty(g) && (m[g] = y[g]); var _ = { Deferred: v, Promise: m, defer: function () { return new v }, when: function (e, n, t, r, o) { return _.cast(e).then(n, t, r, o) }, fail: function (e, t, r) { return _.when(e, n, t, r) }, always: function (e, n, t) { return _.when(e).always(n, t) }, progress: function (e, n, t) { return _.when(e).progress(n, t) }, spread: function (e, n, t, r) { return _.when(e).spread(n, t, r) }, done: function (e, n, t, r, o) { _.when(e).done(n, t, r, o) }, isPromise: function (e) { return a(e) && s(e.then) }, cast: function (e) { return e && e._vow ? e : _.resolve(e) }, valueOf: function (e) { return e && s(e.valueOf) ? e.valueOf() : e }, isFulfilled: function (e) { return !e || !s(e.isFulfilled) || e.isFulfilled() }, isRejected: function (e) { return !(!e || !s(e.isRejected)) && e.isRejected() }, isResolved: function (e) { return !e || !s(e.isResolved) || e.isResolved() }, resolve: function (e) { var n = _.defer(); return n.resolve(e), n.promise() }, fulfill: function (e) { var n = _.defer(), t = n.promise(); return n.resolve(e), t.isFulfilled() ? t : t.then(null, function (e) { return e }) }, reject: function (e) { var n = _.defer(); return n.reject(e), n.promise() }, invoke: function (n, t) { var r, o = Math.max(arguments.length - 1, 0); if (o) { r = Array(o); for (var i = 0; i < o;)r[i++] = arguments[i] } try { return _.resolve(r ? n.apply(e, r) : n.call(e)) } catch (s) { return _.reject(s) } }, all: function (e) { var n = new v, t = c(e), r = t ? l(e) : f(e), o = r.length, i = t ? [] : {}; if (!o) return n.resolve(i), n.promise(); var s = o; return _._forEach(e, function (e, t) { i[r[t]] = e, --s || n.resolve(i) }, n.reject, n.notify, n, r), n.promise() }, allResolved: function (e) { var n = new v, t = c(e), r = t ? l(e) : f(e), o = r.length, i = t ? [] : {}; if (!o) return n.resolve(i), n.promise(); var s = function () { --o || n.resolve(e) }; return _._forEach(e, s, s, n.notify, n, r), n.promise() }, allPatiently: function (e) { return _.allResolved(e).then(function () { var n, t, r, o, i = c(e), s = i ? l(e) : f(e), a = s.length, u = 0; if (!a) return i ? [] : {}; for (; u < a;)r = s[u++], o = e[r], _.isRejected(o) ? (n || (n = i ? [] : {}), i ? n.push(o.valueOf()) : n[r] = o.valueOf()) : n || ((t || (t = i ? [] : {}))[r] = _.valueOf(o)); if (n) throw n; return t }) }, any: function (e) { var n = new v, t = e.length; if (!t) return n.reject(Error()), n.promise(); var r, o = 0; return _._forEach(e, n.resolve, function (e) { o || (r = e), ++o === t && n.reject(r) }, n.notify, n), n.promise() }, anyResolved: function (e) { var n = new v, t = e.length; return t ? (_._forEach(e, n.resolve, n.reject, n.notify, n), n.promise()) : (n.reject(Error()), n.promise()) }, delay: function (e, n) { return _.resolve(e).delay(n) }, timeout: function (e, n) { return _.resolve(e).timeout(n) }, _forEach: function (e, n, t, r, o, i) { for (var s = i ? i.length : e.length, a = 0; a < s;)_.when(e[i ? i[a] : a], p(n, a), t, r, o), ++a }, TimedOutError: d("TimedOut") }; _.__nextTick__ = o; var E = !0; "object" == typeof r && "object" == typeof r.exports && (r.exports = _, E = !1), "object" == typeof modules && s(modules.define) && (modules.define("vow", function (e) { e(_) }), E = !1), "function" == typeof t && (t(function (e, n, t) { t.exports = _ }), E = !1), E && (e.vow = _) }("undefined" != typeof window ? window : n), r.exports }(), t.utils = function (e) { function n(n) { return e[n] } var t = { exports: {} }, r = t.exports, o = n("vow"), i = Object.prototype.hasOwnProperty; return r.nextTick = o.__nextTick__, o.__nextTick__ = void 0, r.isArray = Array.isArray ? Array.isArray : function (e) { return "[object Array]" === Object.prototype.toString.call(e) }, r.extend = Object.assign ? Object.assign : function (e) { for (var n = 1, t = arguments.length; n < t; n++) { var r = arguments[n]; if (null != r) for (var o in r) i.call(r, o) && (e[o] = r[o]) } return e }, r.accessDeep = function (e, n) { for (var t = n.split("."), r = 0; r < t.length - 1; r++) { var o = t[r]; e[o] = e[o] || {}, e = e[o] } return { parent: e, name: t[t.length - 1] } }, r.createPackage = function (e, n, t) { var o = r.registerImports({}, e, n); return t && (o.__expand = { depends: e, imports: n }), o }, r.registerImports = function (e, n, t) { for (var o = 0; o < n.length; o++)if (t[o].__expand) r.registerImports(e, t[o].__expand.depends, t[o].__expand.imports); else { var i = r.accessDeep(e, n[o]); i.parent[i.name] = t[o] } return e }, t.exports }({ vow: t.vow }); var r = t.env.namespace ? t.utils.accessDeep(n, t.env.namespace) : null; r && r.parent && r.parent[r.name] && r.parent[r.name].modules && r.parent[r.name].ready && console.error("(Yandex Maps JS API): api is already enabled on this page with same namespace."), function () { function e(e) { return "undefined" == typeof f[e] ? f[e] = n(e) : f[e] } function n(e) { return r(e) || r(d + i(e)) || r(t.env.browser.cssPrefix + i(e)) } function r(e) { return "undefined" != typeof o().style[e] ? e : null } function o() { return u || (u = document.createElement("div")) } function i(e) { return e ? e.substr(0, 1).toUpperCase() + e.substr(1) : e } function s(n) { var t = e(n); return t && t != n && (t = "-" + d + "-" + n), t } function a(n) { return c[n] && e("transitionProperty") ? s(c[n]) : null } var u, c = { transform: "transform", opacity: "opacity", transitionTimingFunction: "transition-timing-function", userSelect: "user-select", height: "height" }, l = {}, f = {}, d = t.env.browser.cssPrefix.toLowerCase(); t.supports.css = { checkProperty: e, checkTransitionProperty: function (e) { return "undefined" == typeof l[e] ? l[e] = a(e) : l[e] }, checkTransitionAvailability: a } }(), t.supports.csp = { isSupported: "undefined" != typeof Blob && "undefined" != typeof URL, isNonceSupported: t.env.browser.name && t.env.browser.version ? !(t.env.browser.name.search("Safari") != -1 && parseInt(t.env.browser.version) < 10) : null }, function () { function e() { if (!window.WebGLRenderingContext) return !1; var e = { "Samsung Internet": !0, AndroidBrowser: !0 }, n = "Webkit" == t.env.browser.engine && +t.env.browser.engineVersion < 537; return !n && !e[t.env.browser.name] } function n() { if (!e()) return null; var n, t; try { var r = document.createElement("canvas"); t = r.getContext(n = "webgl", o), t || (t = r.getContext(n = "experimental-webgl", o), t || (n = null)) } catch (i) { n = null } return n ? { contextName: n, context: t } : null } function r(e, n) { e.width = 226, e.height = 256, n.fillStyle = "#fff", n.fillRect(0, 0, 150, 150), n.globalCompositeOperation = "xor", n.fillStyle = "#f00", n.fillRect(10, 10, 100, 100), n.fillStyle = "#0f0", n.fillRect(50, 50, 100, 100); for (var t = n.getImageData(49, 49, 2, 2), r = [], o = 0; o < 16; o++)r.push(t.data[o]); return "0x0x0x0x0x0x0x0x0x0x0x0x0x255x0x255" == r.join("x") } var o = { failIfMajorPerformanceCaveat: !0, antialias: !1 }, i = {}; t.supports.graphics = { hasSvg: function () { return "svg" in i || (i.svg = document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), i.svg }, hasCanvas: function () { if (!("canvas" in i)) { var e = document.createElement("canvas"), n = "getContext" in e ? e.getContext("2d") : null; i.canvas = !!n && r(e, n) } return i.canvas }, hasWebGl: function () { return "webgl" in i || (i.webgl = n()), i.webgl }, redetect: function () { i = {} }, getWebGlContextName: function () { return i.webgl && i.webgl.contextName } } }(), function () { function e() { var e = !0; "MacOS" == t.env.browser.osFamily && /^10\.[0-8](\.|$)/.test(t.env.browser.osVersion) && (e = !1, n("OldMac")); var i = ["requestAnimationFrame", "Worker", "URL", "Blob", "XMLHttpRequest", "Set", "Map", "WebAssembly"]; i.forEach(function (t) { window[t] || (e = !1, n(t)) }), "function" != typeof Math.trunc && (e = !1, n("MathTrunc")); var s = t.supports.graphics.hasWebGl(); if (!s || "webgl" !== s.contextName) return n("hasWebGl"), !1; var a = s.context; 0 == a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS) && (e = !1, n("MAX_VERTEX_TEXTURE_IMAGE_UNITS")), a.getExtension("OES_vertex_array_object") || (e = !1, n("OES_vertex_array_object")), a.getExtension("OES_standard_derivatives") || (e = !1, n("OES_standard_derivatives")); var u = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT); if (u && 0 != u.precision || (e = !1, n("highp")), !r()) { var c = o(); e = !1, t.count("error", { path: ["vectorEngine.drawPointsError", t.env.browser.platform, t.env.browser.name, c.vendor, c.renderer].join("."), share: 1 }) } return e } function n(e) { var n = o(); t.count("error", { path: ["vectorEngine.reasonsVectorNotSupported", e, t.env.browser.platform, t.env.browser.name, n.vendor, n.renderer].join("."), share: .1 }) } function r() { var e = document.createElement("canvas"); e.width = 1, e.height = 1; var n = e.getContext("webgl", { alpha: !1, depth: !1, antialias: !1 }), t = n.createShader(n.VERTEX_SHADER); n.shaderSource(t, "#version 100\nattribute vec2 p;\nvoid main() {\n    gl_Position = vec4(p,0,1);\n    gl_PointSize = 1.0;\n}"), n.compileShader(t); var r = n.createShader(n.FRAGMENT_SHADER); n.shaderSource(r, "#version 100\nvoid main() {\n    gl_FragColor = vec4(1, 0, 0, 1);\n}"), n.compileShader(r); var o = n.createProgram(); n.attachShader(o, t), n.attachShader(o, r), n.bindAttribLocation(o, 0, "p"), n.linkProgram(o); var i = n.createBuffer(); n.bindBuffer(n.ARRAY_BUFFER, i), n.bufferData(n.ARRAY_BUFFER, new Float32Array([0, 0]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0), n.clearColor(0, 1, 0, 1), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(o), n.drawArrays(n.POINTS, 0, 1); var s = new Uint8Array(4); return n.readPixels(0, 0, 1, 1, n.RGBA, n.UNSIGNED_BYTE, s), 255 === s[0] } function o() { var e = {}, n = t.supports.graphics.hasWebGl(); if (!n) return e; var r = n.context, o = r.getExtension("WEBGL_debug_renderer_info"); return o && (e.vendor = r.getParameter(o.UNMASKED_VENDOR_WEBGL).replace(/\W/g, "_"), e.renderer = r.getParameter(o.UNMASKED_RENDERER_WEBGL).replace(/\W/g, "_")), e } var i; t.supports.vector = { isSupported: function () { return void 0 === i && (i = e()), i } } }(), t.supports.printPatchNeeded = !t.supports.css.checkProperty("printColorAdjust"), t.logger = function (e) { function n(e, n) { var r = ""; return t.env.debug && (r += "(" + e + "): "), r += n } var r = { exports: {} }, o = (r.exports, "Yandex Maps JS API"); return r.exports = { assert: function (e, r) { e || t.env.debug && console.log(n(o, r)) }, log: function (e) { t.env.debug && console.log(n(o, e)) }, notice: function (e) { t.env.debug && console.info(n(o, e)) }, warning: function (e) { t.env.debug && console.warn(n(o, e)) }, error: function (e) { console.error(n(o, e)) }, exception: function (e, t) { throw new Error(n(e, t)) } }, r.exports }(), function () { var e = t.env.browser; e.documentMode = document.documentMode, e.isIE = "MSIE" == e.name || "IEMobile" == e.name, e.isEdge = "Edge" == e.engine, e.isChromium = e.base && "chromium" == e.base.toLocaleLowerCase(), e.isSafari = "Safari" == e.name; var n = "Edge" == e.engine || "MSIE" == e.name && e.osVersion > 6.1 || "IEMobile" == e.name && e.engineVersion >= 6; n ? e.eventMapper = "pointer" : e.eventMapper = "touchMouse", e.androidBrokenBuild = "AndroidBrowser" == e.name && "534.30" == e.engineVersion; var r = window.devicePixelRatio || screen.deviceXDPI && screen.deviceXDPI / 96 || 1, o = "iOS" === e.osFamily || "Safari" === e.name || "WebKit" === e.engine && "Safari" === e.base; "MSIE" == e.name || "IEMobile" == e.name || "Android" == e.osFamily && "Gecko" == e.engine || o || r > 1 && r < 2 ? e.graphicsRenderEngine = "svg" : e.graphicsRenderEngine = "canvas", e.transformTransition = "Android" == e.osFamily || "iOS" == e.osFamily || "MSIE" == e.name || e.isChromium, e.css3DTransform = "WebKit" == e.engine && !("Android" == e.osFamily && parseFloat(e.osVersion) < 3) || "Gecko" == e.engine && parseInt(e.engineVersion.split(".")[0]) >= 10, e.unsupported = "OperaMini" == e.name }(); var o = function (e) { function n(n) { return e[n] } function t(e) { this._config = e, this._sandbox = this._config.createSandbox(this), this._definitionsByName = Object.create(null), this._definitionsByStorage = Object.create(null), this._remoteLoadingAllowed = f.defer(), this._initialized = this._remoteLoadingAllowed.promise().then(function () { return this._loadBundle(this._config.initialBudleName) }, this) } function r(e, n, t, r, o, i, s, a, u) { this.state = e, this.alias = null, this.name = n, this.storage = t, this.key = r, this.depends = o, this.dynamicDepends = a, this.declaration = i, this.context = s, this.exports = e === m.DEFINED ? u : void 0, this.resolvingPromise = void 0, this.fetchingDeferred = void 0 } function o(e, n) { if (!e.dynamicDepends) return h; var t = []; for (var r in e.dynamicDepends) if (p.call(e.dynamicDepends, r)) for (var o = 0, i = n.length; o < i; o++) { var a = n[o]; if (void 0 !== a) { var u = e.dynamicDepends[r](a); s(u) && t.push(u) } } return t } function i(e, n, t) { return p.call(e.dynamicDepends, n) ? e.dynamicDepends[n].call(null, t) : v } function s(e) { return "string" == typeof e || u(e) } function a(e) { return e && "object" == typeof e ? e.key + "@" + e.storage : String(e) } function u(e) { return null != e && "object" == typeof e && "string" == typeof e.key && "string" == typeof e.storage } function c(e) { var n = d.isArray(e); return "object" == typeof e && !n && p.call(e, "modules") ? { modules: d.isArray(e.modules) ? e.modules : [e.modules], data: e.data } : n ? { modules: e } : { modules: [e] } } var l = { exports: {} }, f = (l.exports, n("vow")), d = n("./ym.utils"), p = Object.prototype.hasOwnProperty, v = {}, h = Object.freeze([]), m = { MENTIONED: 1, QUEUED: 2, FETCHING: 3, DECLARED: 4, RESOLVING: 5, ERROR: 6, DEFINED: 7 }; return l.exports = t, t.prototype.allowRemoteLoading = function () { this._remoteLoadingAllowed.resolve() }, t.prototype.isDefined = function (e) { return Boolean(this._findDefinition(e)) }, t.prototype.preload = function (e) { return e }, t.prototype.define = function (e, n, t, o) { var i, s, a, u; if ("object" == typeof e) { var c = e; e = c.name, s = c.storage, i = c.key, n = c.depends, t = c.declaration, o = c.context, a = c.dynamicDepends, u = c.exports } else 2 === arguments.length && (t = n, n = null); var l = new r(m.DECLARED, e, s, i, n, t, o, a, u); this._define(l) }, t.prototype.defineSync = function (e) { var n = new r(m.DEFINED, e.name, e.storage, e.key, null, null, null, null, e.module); this._define(n) }, t.prototype._define = function (e) { function n() { var n = new Error("ymaps.modules: redefinition of " + e.name); throw console.error(n), n } var t = this._definitionsByName[e.name]; if (t) { if (t.state >= m.DECLARED) return; return t.state !== m.FETCHING && n(), t.state = m.DECLARED, t.declaration = e.declaration, t.context = e.context, t.storage = e.storage, t.key = e.key, e.depends && ("function" == typeof e.depends && (e.depends = e.depends.call({ name: e.name }, this._config.dependenciesContext)), t.depends = e.depends), t.dynamicDepends = e.dynamicDepends, void (t.exports = e.exports) } "function" == typeof e.depends && (e.depends = e.depends.call({ name: e.name }, this._config.dependenciesContext)), e.depends = e.depends || h, this._definitionsByName[e.name] = e, this._saveDefinitionToStorage(e) }, t.prototype._resolve = function (e, n) { if (!e.dynamicDepends) { if (e.state === m.DEFINED) return f.resolve(e.exports); if (e.state === m.ERROR) return f.reject(e.exports) } e.state < m.RESOLVING && !e.resolvingPromise && (e.resolvingPromise = this._resolveCore(e, n).always(function (n) { return e.resolvingPromise = void 0, n })); var t = o(e, [n]); return f.all([e.resolvingPromise, this._require(t, n)]).then(function () { return e.state === m.DEFINED ? f.resolve(e.exports) : f.reject(e.exports) }) }, t.prototype._resolveCore = function (e, n) { return this._fetchModule(e, n).then(function () { return e.state = m.RESOLVING, this._require(e.depends, n) }, this).then(function (n) { function t(n, t) { e.state === m.RESOLVING && (e.state = t ? m.ERROR : m.DEFINED, e.exports = t || n), o && o.resolve(), t && console.warn("ymaps.modules: provide(undefined, error) is deprecated and will be removed, throw instead. Module `" + e.name + "`.") } var r, o; t.async = function (n) { e.state === m.RESOLVING && (r = n.then(function (e) { t(e) }, function (e) { t(void 0, e) })) }, t.provide = t, t.provideAsync = t.async, t.dynamicDepends = e.dynamicDepends ? { getValue: function (n, t) { var r = i(e, n, t); return r === v ? f.reject(new Error("ymaps.modules: dynamic dependency `" + n + "` is not declared.")) : s(r) ? this._require([r], t) : f.resolve([r]) }.bind(this), getValueSync: function (n, t) { var r = i(e, n, t); if (!s(r)) return r; var o = this._findDefinition(r); return o ? this._requireSingleSync(o, t) : void 0 }.bind(this) } : null; var a = e.context || { name: e.name, depends: e.depends }; try { e.declaration.apply(a, [t].concat(n)) } catch (u) { return e.state = m.ERROR, void (e.exports = u) } return r ? r : e.state !== m.DEFINED && e.state !== m.ERROR ? (console.warn("ymaps.modules: asynchronous provide is deprecated and will be removed. Module `" + e.name + "`."), o = f.defer(), o.promise()) : void 0 }, this) }, t.prototype.require = function (e, n, t, r) { var o = "object" == typeof e && !d.isArray(e), i = 1 === arguments.length; o && (n = e.successCallback, t = e.errorCallback, r = e.context, i = !n && !t), e = c(e); var s = this._require(e.modules, e.data); return i ? s : void s.spread(n, t, r) }, t.prototype.requireSync = function (e) { if (e = c(e), 1 !== e.modules.length) throw new Error("ymaps.modules: only one module can be required synchronously."); var n = this._findDefinition(e.modules[0]); return n && this._requireSingleSync(n, e.data) }, t.prototype._requireSingleSync = function (e, n) { for (var t = o(e, [n]), r = 0, i = t.length; r < i; r++) { var s = this._findDefinition(t[r]); if (!s || !this._requireSingleSync(s, n)) return } return e.state === m.DEFINED ? e.exports : void 0 }, t.prototype._require = function (e, n) { var t = e.map(function (e) { return this._requireSingle(e, n) }, this); return f.all(t) }, t.prototype._requireSingle = function (e, n) { var t = this._findDefinition(e); return t ? this._resolve(t, n) : this._initialized.then(function () { var t = this._findDefinition(e); return t ? this._resolve(t, n) : f.reject(new Error("ymaps.modules: module `" + a(e) + "` is not defined.")) }, this) }, t.prototype._findDefinition = function (e) { if ("undefined" != typeof e) return "string" == typeof e ? this._definitionsByName[e] : this._definitionsByStorage[e.storage] && this._definitionsByStorage[e.storage][e.key] }, t.prototype._saveDefinitionToStorage = function (e, n) { if (e.key && e.storage) { n = n || { key: e.key, storage: e.storage }; for (var t = d.isArray(n.key) ? n.key : [n.key], r = 0, o = t.length; r < o; r++)this._definitionsByStorage[n.storage] = this._definitionsByStorage[n.storage] || {}, this._definitionsByStorage[n.storage][t[r]] = e } }, t.prototype._fetchModule = function (e) { return e.state >= m.DECLARED ? f.resolve() : this._loadFullBundle() }, t.prototype._loadFullBundle = function () { if (!this._fullBundlePromise) { for (var e in this._definitionsByName) this._definitionsByName[e].state === m.MENTIONED && (this._definitionsByName[e].state = m.FETCHING); this._fullBundlePromise = this._loadBundle("full") } return this._fullBundlePromise }, t.prototype._loadBundle = function (e) { return this._config.fetchBundle(e).then(function (e) { function n() { return f.delay().then(function () { var e = o.splice(0, i); if (e.forEach(function (e) { e(t) }), o.length > 0) return n() }) } e.missingModules.forEach(function (e) { var n = new r(m.MENTIONED, e, (void 0), (void 0), [], null, null, (void 0)); this._definitionsByName[e] = n }, this); var t = this._sandbox, o = e.modules, i = 400; return n() }, this)["catch"](function (n) { throw console.error('ymaps: Failed to bundle "' + e + '".' + (n ? n.stack || n.message || "" : "")), n }) }, t.prototype._loadModulesMap = function () { return this._config.fetchMap().spread(function (e, n) { this._processLoadedMap(e), n() }, this) }, l.exports }({ vow: t.vow, "./ym.utils": t.utils }), i = t.env.server.url + "/" + t.env.server.path.replace(/\/$/, "") + "/images/"; t.modules = new o({ dependenciesContext: t, initialBudleName: t.env.preload.bundle, fetchBundle: function (e) { var r = ("__ymaps_" + t.env.namespace + "_" + Date.now()).replace(/\W/g, "_"); n[r] = t.ns; var o = document.createElement("script"); o.src = t.env.bundles.BASE + t.env.bundles[e], o.setAttribute("data-ymaps-api-ns", r), o.setAttribute("data-ymaps-api-version", "2.1.79"), o.async = !0; var i = t.vow.defer(); return o.onerror = i.reject.bind(i), t.ns.__provideBundle = i.resolve.bind(i), document.head.appendChild(o), i.promise().always(function (e) { return delete n[r], e }) }, createSandbox: function (e) { var n = Object.create(e); n.importImages = function (e) { return { get: function (n) { return i + e[n].src } } }; var r = t.utils.extend({}, t, { modules: n }), o = {}; return Object.defineProperty(r, "__mock__", { get: function () { return t.ns.__mock__ || o }, configurable: !1 }), r } }), t.ns.load = function (e, n, r, o) { return "function" == typeof e ? n ? t.ns.ready(["package.full"], e, n) : t.ns.ready(["package.full"], e) : ("string" == typeof e && (e = [e]), t.ns.ready.apply(this, arguments)) }, function () { function e(e) { return function () { console.warn("{NS}.modules.{FN} is not a public API and will be removed from {NS}.modules.".replace(/\{NS\}/g, t.env.namespace).replace(/\{FN\}/g, e)); var n = t.modules[e].apply(t.modules, arguments); return n === t.modules ? t.ns.modules : n } } t.ns.modules = { require: function () { return t.modules.require.apply(t.modules, arguments) }, isDefined: function () { return t.modules.isDefined.apply(t.modules, arguments) }, requireSync: function () { return t.modules.requireSync.apply(t.modules, arguments) }, define: function (e, n, r, o) { return t.modules.define.apply(t.modules, arguments), t.ns.modules }, defineSync: e("defineSync"), getDefinition: e("getDefinition"), getState: e("getState"), setOptions: e("setOptions"), flush: e("flush"), nextTick: e("nextTick"), watchResolving: e("watchResolving"), __modules: t.modules } }(), function (e) { function n() { c && (c = !1); var e = {}; arguments.length && (1 != arguments.length || "object" != typeof arguments[0] || arguments[0].length ? "function" != typeof arguments[0] ? (e.require = "string" == typeof arguments[0] ? [arguments[0]] : arguments[0], e.successCallback = arguments[1], e.errorCallback = arguments[2] && "function" == typeof arguments[2] ? arguments[2] : null, e.context = arguments[2] && "object" == typeof arguments[2] ? arguments[2] : arguments[3]) : (e.successCallback = arguments[0], e.errorCallback = arguments[1] && "function" == typeof arguments[1] ? arguments[1] : null, e.context = arguments[1] && "object" == typeof arguments[1] ? arguments[1] : arguments[2]) : e = arguments[0]); var n = e.require || [], r = i.all([t.modules.require(n), a, u]).spread(function (e) { return t.utils.registerImports(t.ns, n, e), t.ns }); return r.then(e.successCallback && function (n) { setTimeout(e.successCallback.bind(e.context), 0, n) }, e.errorCallback && function (n) { setTimeout(e.errorCallback.bind(e.context), 0, n) }), r } function r(n, t) { if (n) { var r = o(e, n); r && setTimeout(function () { r.method.call(r.context, t) }) } } function o(e, n) { var t = e; n = n.split("."); for (var r = 0, o = n.length - 1; r < o; r++)if (t = t[n[r]], !t) return; return { method: t[n[o]], context: t } } var i = t.vow, s = [].concat(["package.system"], t.env.preload.load.split(",").filter(Boolean)), a = t.modules.require(s).then(function (e) { t.utils.registerImports(t.ns, s, e), r(t.env.preload.onLoad, t.ns) }, function (e) { return r(t.env.preload.onError, e), i.reject(e) }), u = "complete" === document.readyState || "interactive" === document.readyState ? i.resolve() : new i.Promise(function (e) { document.addEventListener("DOMContentLoaded", e, !1), document.addEventListener("load", e, !1) }); t.ns.ready = n; var c = !0 }(this), t.env.server.params.csp && !t.supports.csp.isSupported && t.logger.warning("CSP is not suported in this browser"), t.modules.define("vectorEngine.loadEngine", ["vow", "Hotspot", "Monitor", "collection.Item", "event.Manager", "hotspot.layer.Hint", "hotspot.layer.optionMapper", "interactivityModel.EventController", "interactivityModel.layer", "option.Manager", "poi.BalloonManager", "util.shapeFactory"], function (e, n) { function r() { var e = n.defer(), r = document.createElement("script"); return r.onload = e.resolve.bind(e), r.onerror = e.reject.bind(e), r.src = t.env.hosts.vectorIndex.replace("{{version}}", t.env.vectorVersion), t.env.vectorEngineFileName && (r.src = r.src.replace("vector.min.js", t.env.vectorEngineFileName)), document.head.insertAdjacentElement("afterbegin", r), e.promise()["catch"](function () { return n.reject(new Error("Failed to load vector engine")) }) } if ("ymaps" !== t.env.namespace) throw new Error("Vector supports only `ymaps` namespace."); if (null == t.env.vectorVersion) throw new Error("No vector version."); var o = null; e(function () { return o = o || r() }) }), t.modules.define("vectorEngine.preload", [], function (e) { t.supports.vector.isSupported() && t.modules.require(["vectorEngine.loadEngine"]).spread(function (e) { e() }), e({}) }), t.modules.allowRemoteLoading(), r && (r.parent[r.name] = t.ns), t.env.hasValidApiKey || (t.env.apikey = void 0, "undefined" != typeof t.env.hasValidApiKey && console.warn("(Yandex Maps JS API): Invalid API key")) })({ "vectorVersion": "5.21.0", "vectorVersionTimestamp": 1645183360586, "flags": [], "server": { "url": "https://api-maps.yandex.ru/2.1.79", "path": "build/release", "params": { "mode": "release", "ns": "ymaps", "csp": null }, "version": "2.1" }, "preload": { "load": "package.full", "bundle": "full" }, "mode": "release", "debug": false, "namespace": "ymaps", "enterprise": false, "hasApiKeyParam": false, "yandexMapDisableAdverts": false, "browser": { "name": "Chrome", "version": "98.0.4758.102", "base": "Chromium", "engine": "WebKit", "engineVersion": "537.36", "osName": "Windows 10", "osFamily": "Windows", "osVersion": "10.0", "isMobile": false, "isTablet": false, "multiTouch": false, "platform": "Desktop", "cssPrefix": "Webkit" }, "lang": "ru_RU", "languageCode": "ru", "countryCode": "RU", "hosts": { "api": { "main": "https://api-maps.yandex.ru/", "ua": "https://yandex.ru/legal/maps_termsofuse/?lang={{lang}}", "maps": "https://yandex.ru/maps/", "statCounter": "https://yandex.ru/clck/", "services": { "coverage": "https://api-maps.yandex.ru/services/coverage/", "geocode": "https://geocode-maps.yandex.ru/", "geoxml": "https://api-maps.yandex.ru/services/geoxml/", "inception": "https://api-maps.yandex.ru/services/inception/", "panoramaLocate": "https://api-maps.yandex.ru/services/panoramas/", "search": "https://api-maps.yandex.ru/services/search/", "suggest": "https://suggest-maps.yandex.ru/", "regions": "https://api-maps.yandex.ru/services/regions/", "route": "https://api-maps.yandex.ru/services/route/", "traffic": "https://api-maps.yandex.ru/services/traffic/" } }, "layers": { "map": "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&%c&%l", "mapj": "https://core-renderer-tiles.maps.yandex.net/tiles?l=mapj&%c&%l&experimental_disable_toponym_hotspots=true", "sat": "https://core-sat.maps.yandex.net/tiles?l=sat&%c&%l", "skl": "https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&%c&%l", "sklj": "https://core-renderer-tiles.maps.yandex.net/tiles?l=sklj&%c&%l", "stv": "https://0%d.core-stv-renderer.maps.yandex.net/2.x/tiles?l=stv&%c&v=%v&%l&format=png", "sta": "https://0%d.core-stv-renderer.maps.yandex.net/2.x/tiles?l=sta&%c&v=%v&%l&format=png", "staHotspot": "https://core-stv-renderer.maps.yandex.net/2.x/tiles?l=stj&%c&v=%v&format=js", "staHotspotKey": "%c&l=stj&tm=%v", "carparks": "https://core-carparks-renderer-lots.maps.yandex.net/" }, "metro_RU": "https://yandex.ru/metro/", "metro_UA": "https://yandex.ua/metro/", "metro_BY": "https://yandex.by/metro/", "metro_US": "https://yandex.com/metro/", "traffic": "https://core-jams-rdr-cache.maps.yandex.net/", "trafficInfo": "https://core-jams-info.maps.yandex.net/", "trafficArchive": "https://core-jams-rdr-hist.maps.yandex.net/", "roadEventsRenderer": "https://core-road-events-renderer.maps.yandex.net/", "vectorIndex": "https://yastatic.net/s3/mapsapi-v3/vector/{{version}}/out/vector.min.js", "vectorTiles": "https://core-renderer-tiles.maps.yandex.net/vmap2/tiles?lang={{lang}}&x={{x}}&y={{y}}&z={{z}}&zmin={{zmin}}&zmax={{zmax}}&v={{version}}", "vectorImages": "https://core-renderer-tiles.maps.yandex.net/vmap2/icons?id={{id}}&scale={{scale}}", "vectorMeshes": "https://core-renderer-tiles.maps.yandex.net/vmap2/meshes?id={{id}}", "vectorGlyphs": "https://core-renderer-tiles.maps.yandex.net/vmap2/glyphs?lang={{lang}}&font_id={{fontId}}&range={{range}}", "indoorTiles": "https://core-renderer-tiles.maps.yandex.net/", "panoramasTiles": "https://pano.maps.yandex.net/%s/%z.%x.%y", "taxiRouteInfo": "https://taxi-routeinfo.taxi.yandex.net/taxi_info?clid=yamaps&apikey=f6d7c076e16e4d53a928961595e76215&rll={rll}" }, "layers": { "map": { "version": "22.02.18-0-b220203150200", "scaled": true, "hotspotZoomRange": [1, 23], "hotspotExcludeByTags": ["admin"] }, "skl": { "version": "22.02.18-0-b220203150200", "scaled": true, "hotspotZoomRange": [1, 23], "hotspotExcludeByTags": ["admin"] }, "sat": { "version": "3.942.0" }, "sta": { "version": "2022.02.17.18.14-1_22.02.18-0-10533" }, "stv": { "version": "2022.02.17.18.14-1_22.02.18-0-10533" }, "trf": { "version": "1645183320", "scaled": true }, "trfe": { "version": "", "scaled": true, "hotspotZoomRange": [0, 21] }, "carparks": { "version": "", "scaled": true } }, "geolocation": { "longitude": 38.22584, "latitude": 55.567326, "isHighAccuracy": false, "span": { "longitude": 0.176259, "latitude": 0.130209 } }, "token": "6af22f9ba84455358d01d03b21803142", "distribution": {}, "version": "2.1.79", "majorVersion": "2.1", "cssPrefix": "ymaps-2-1-79-", "tag": "2.1.79-36", "coordinatesOrder": "latlong", "taxiInceptionBboxes": [[[56.222595495837346, 28.318534432616705], [60.6841007136798, 33.679862557616836]], [[52.491280779553044, 32.998710213867184], [66.22945422739838, 60.178885995117206]], [[43.5135061217809, 38.38201099511703], [47.556747187256654, 40.00798755761699]], [[54.90279398957107, 60.00310474511678], [57.80455013208442, 66.22136646386686]], [[54.482777526319616, 71.53874927636684], [56.974052764326366, 94.96160083886683]], [[50.475003858253864, 36.24501496093741], [52.745370952398034, 48.37941437499998]], [[48.00105582471142, 43.6772659374999], [49.196048317842866, 45.3911331249999]], [[42.99758363858955, 131.81233673828095], [43.42949289893052, 132.39873200195285]], [[48.341853999370194, 134.93863373535092], [48.634885237261244, 135.20436554687436]], [[52.182556294509006, 103.96680145996015], [52.44850855030791, 104.60400849121018]], [[43.384444182677676, 39.825184393367394], [43.53262442321664, 40.00723128362619]], [[43.5979698518094, 39.905264425715906], [43.71163893715756, 40.29253249212216]], [[51.507196330069355, 54.598325886182714], [52.052357122860414, 55.784849323682764]]], "bundles": { "panoramas": "/release/panoramas-ad8733a9b66345ddb75cd435de451ddc3f20fde2.js", "full": "/release/full-6341f0c1e121ed8c4cbf1c6d8dc350380d538a9a.js", "BASE": "https://yastatic.net/s3/front-maps-static/maps-front-jsapi-v2-1/2.1.79-36/build" } }, null)