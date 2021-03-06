/*
 Highcharts JS v4.1.9 (2015-10-07)

 Standalone Highcharts Framework

 License: MIT License
*/
var HighchartsAdapter = (function () {
  function o (c) {
    function a (a, b, d) { a.removeEventListener(b, d, !1) } function d (a, b, d) { d = a.HCProxiedMethods[d.toString()]; a.detachEvent('on' + b, d) } function b (b, c) { const f = b.HCEvents; let k; let h; let l; let g; if (b.removeEventListener) { k = a } else if (b.attachEvent) { k = d } else { return }c ? (h = {}, h[c] = !0) : h = f; for (g in h) { if (f[g]) { for (l = f[g].length; l--;) { k(b, g, f[g][l]) } } } }c.HCExtended || Highcharts.extend(c, {
      HCExtended: !0,
      HCEvents: {},
      bind (a, b) {
        const d = this; const c = this.HCEvents; let h; if (d.addEventListener) {
          d.addEventListener(a,
            b, !1)
        } else if (d.attachEvent) { h = function (a) { a.target = a.srcElement || window; b.call(d, a) }; if (!d.HCProxiedMethods) { d.HCProxiedMethods = {} }d.HCProxiedMethods[b.toString()] = h; d.attachEvent('on' + a, h) }c[a] === q && (c[a] = []); c[a].push(b)
      },
      unbind (c, i) { let f, k; c ? (f = this.HCEvents[c] || [], i ? (k = HighchartsAdapter.inArray(i, f), k > -1 && (f.splice(k, 1), this.HCEvents[c] = f), this.removeEventListener ? a(this, c, i) : this.attachEvent && d(this, c, i)) : (b(this, c), this.HCEvents[c] = [])) : (b(this), this.HCEvents = {}) },
      trigger (a,
        b) { const d = this.HCEvents[a] || []; const c = d.length; let h; let g; let j; g = function () { b.defaultPrevented = !0 }; for (h = 0; h < c; h++) { j = d[h]; if (b.stopped) { break } b.preventDefault = g; b.target = this; if (!b.type) { b.type = a }j.call(this, b) === !1 && b.preventDefault() } }
    }); return c
  } let q; const j = document; const p = []; const g = []; const m = {}; let n; Math.easeInOutSine = function (c, a, d, b) { return -d / 2 * (Math.cos(Math.PI * c / b) - 1) + a }; return {
    init (c) {
      if (!j.defaultView) {
        this._getStyle = function (a, d) {
          let b; return a.style[d] ? a.style[d] : (d === 'opacity' && (d = 'filter'), b = a.currentStyle[d.replace(/\-(\w)/g,
            function (a, b) { return b.toUpperCase() })], d === 'filter' && (b = b.replace(/alpha\(opacity=([0-9]+)\)/, function (a, b) { return b / 100 })), b === '' ? 1 : b)
        }, this.adapterRun = function (a, d) { const b = { width: 'clientWidth', height: 'clientHeight' }[d]; if (b) { return a.style.zoom = 1, a[b] - 2 * parseInt(HighchartsAdapter._getStyle(a, 'padding'), 10) } }
      } if (!Array.prototype.forEach) { this.each = function (a, d) { for (let b = 0, c = a.length; b < c; b++) { if (d.call(a[b], a[b], b, a) === !1) { return b } } } } if (!Array.prototype.indexOf) {
        this.inArray = function (a, d) {
          let b; let c = 0; if (d) {
            for (b =
d.length; c < b; c++) { if (d[c] === a) { return c } }
          } return -1
        }
      } if (!Array.prototype.filter) { this.grep = function (a, d) { for (var b = [], c = 0, i = a.length; c < i; c++) { d(a[c], c) && b.push(a[c]) } return b } } n = function (a, c, b) { this.options = c; this.elem = a; this.prop = b }; n.prototype = {
        update () {
          let a; a = this.paths; const d = this.elem; const b = d.element; if (m[this.prop]) { m[this.prop](this) } else { a && b ? d.attr('d', c.step(a[0], a[1], this.now, this.toD)) : d.attr ? b && d.attr(this.prop, this.now) : (a = {}, a[this.prop] = this.now + this.unit, Highcharts.css(d, a)) } this.options.step &&
this.options.step.call(this.elem, this.now, this)
        },
        custom (a, c, b) { const e = this; const i = function (a) { return e.step(a) }; let f; this.startTime = +new Date(); this.start = a; this.end = c; this.unit = b; this.now = this.start; this.pos = this.state = 0; i.elem = this.elem; if (i() && g.push(i) === 1) { i.timerId = setInterval(function () { for (f = 0; f < g.length; f++) { g[f]() || g.splice(f--, 1) }g.length || clearInterval(i.timerId) }, 13) } },
        step (a) {
          const c = +new Date(); let b; b = this.options; let e = this.elem; let i; if (e.attr && !e.element) { b = !1 } else if (a || c >= b.duration + this.startTime) {
            this.now =
this.end; this.pos = this.state = 1; this.update(); a = this.options.curAnim[this.prop] = !0; for (i in b.curAnim) { b.curAnim[i] !== !0 && (a = !1) }a && b.complete && b.complete.call(e); b = !1
          } else { e = c - this.startTime, this.state = e / b.duration, this.pos = b.easing(e, 0, 1, b.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0 } return b
        }
      }; this.animate = function (a, d, b) {
        let e; let i = ''; let f; let g; let h; if (typeof b !== 'object' || b === null) { e = arguments, b = { duration: e[2], easing: e[3], complete: e[4] } } if (typeof b.duration !== 'number') {
          b.duration =
400
        }b.easing = Math[b.easing] || Math.easeInOutSine; b.curAnim = Highcharts.extend({}, d); for (h in d) { g = new n(a, b, h), f = null, h === 'd' ? (g.paths = c.init(a, a.d, d.d), g.toD = d.d, e = 0, f = 1) : a.attr ? e = a.attr(h) : (e = parseFloat(HighchartsAdapter._getStyle(a, h)) || 0, h !== 'opacity' && (i = 'px')), f || (f = d[h]), f.match && f.match('px') && (f = f.replace(/px/g, '')), g.custom(e, f, i) }
      }
    },
    _getStyle (c, a) { return window.getComputedStyle(c, void 0).getPropertyValue(a) },
    addAnimSetter (c, a) { m[c] = a },
    getScript (c, a) {
      const d = j.getElementsByTagName('head')[0]
      const b = j.createElement('script'); b.type = 'text/javascript'; b.src = c; b.onload = a; d.appendChild(b)
    },
    inArray (c, a) { return a.indexOf ? a.indexOf(c) : p.indexOf.call(a, c) },
    adapterRun (c, a) { return parseInt(HighchartsAdapter._getStyle(c, a), 10) },
    grep (c, a) { return p.filter.call(c, a) },
    map (c, a) { for (var d = [], b = 0, e = c.length; b < e; b++) { d[b] = a.call(c[b], c[b], b, c) } return d },
    offset (c) {
      const a = document.documentElement; var c = c.getBoundingClientRect(); return {
        top: c.top + (window.pageYOffset || a.scrollTop) -
(a.clientTop || 0),
        left: c.left + (window.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
      }
    },
    addEvent (c, a, d) { o(c).bind(a, d) },
    removeEvent (c, a, d) { o(c).unbind(a, d) },
    fireEvent (c, a, d, b) { let e; j.createEvent && (c.dispatchEvent || c.fireEvent) ? (e = j.createEvent('Events'), e.initEvent(a, !0, !0), e.target = c, Highcharts.extend(e, d), c.dispatchEvent ? c.dispatchEvent(e) : c.fireEvent(a, e)) : c.HCExtended === !0 && (d = d || {}, c.trigger(a, d)); d && d.defaultPrevented && (b = null); b && b(d) },
    washMouseEvent (c) { return c },
    stop (c) { for (var a = g.length, d; a--;) { d = g[a], d.elem === c && g.splice(a, 1) } },
    each (c, a) { return Array.prototype.forEach.call(c, a) }
  }
}());
/*
 Highstock JS v2.1.9 (2015-10-07)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function () {
  function B () { let a; let b = arguments; let c; let d = {}; var e = function (a, b) { let c, d; typeof a !== 'object' && (a = {}); for (d in b) { b.hasOwnProperty(d) && (c = b[d], a[d] = c && typeof c === 'object' && Object.prototype.toString.call(c) !== '[object Array]' && d !== 'renderTo' && typeof c.nodeType !== 'number' ? e(a[d] || {}, c) : b[d]) } return a }; b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2)); c = b.length; for (a = 0; a < c; a++) { d = e(d, b[a]) } return d } function I (a, b) { return parseInt(a, b || 10) } function Ia (a) { return typeof a === 'string' } function ha (a) {
    return a &&
typeof a === 'object'
  } function Ja (a) { return Object.prototype.toString.call(a) === '[object Array]' } function ra (a) { return typeof a === 'number' } function Ka (a) { return Y.log(a) / Y.LN10 } function sa (a) { return Y.pow(10, a) } function ta (a, b) { for (let c = a.length; c--;) { if (a[c] === b) { a.splice(c, 1); break } } } function t (a) { return a !== s && a !== null } function X (a, b, c) { let d, e; if (Ia(b)) { t(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)) } else if (t(b) && ha(b)) { for (d in b) { a.setAttribute(d, b[d]) } } return e } function na (a) {
    return Ja(a)
      ? a : [a]
  } function G (a, b) { if (ya && !ea && b && b.opacity !== s) { b.filter = 'alpha(opacity=' + b.opacity * 100 + ')' }w(a.style, b) } function aa (a, b, c, d, e) { a = F.createElement(a); b && w(a, b); e && G(a, { padding: 0, border: $, margin: 0 }); c && G(a, c); d && d.appendChild(a); return a } function ia (a, b) { const c = function () { return s }; c.prototype = new a(); w(c.prototype, b); return c } function Qa (a, b) { return Array((b || 2) + 1 - String(a).length).join(0) + a } function ab (a) { return (kb && kb(a) || vb || 0) * 6e4 } function La (a, b) {
    for (var c = '{', d = !1, e, f, g, h, i, k = []; (c = a.indexOf(c)) !==
-1;) { e = a.slice(0, c); if (d) { f = e.split(':'); g = f.shift().split('.'); i = g.length; e = b; for (h = 0; h < i; h++) { e = e[g[h]] } if (f.length) { f = f.join(':'), g = /\.([0-9])/, h = N.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e !== null && (e = D.numberFormat(e, i, h.decimalPoint, f.includes(',') ? h.thousandsSep : ''))) : e = ja(f, e) } }k.push(e); a = a.slice(c + 1); c = (d = !d) ? '}' : '{' }k.push(a); return k.join('')
  } function wb (a) { return Y.pow(10, T(Y.log(a) / Y.LN10)) } function xb (a, b, c, d, e) {
    let f; let g = a; var c = p(c, 1); f = a / c; b || (b = [1, 2, 2.5, 5, 10], d === !1 && (c ===
1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c]))); for (d = 0; d < b.length; d++) { if (g = b[d], e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2) { break } } g *= c; return g
  } function yb (a, b) { const c = a.length; let d; let e; for (e = 0; e < c; e++) { a[e].ss_i = e }a.sort(function (a, c) { d = b(a, c); return d === 0 ? a.ss_i - c.ss_i : d }); for (e = 0; e < c; e++) { delete a[e].ss_i } } function Ra (a) { for (var b = a.length, c = a[0]; b--;) { a[b] < c && (c = a[b]) } return c } function Fa (a) { for (var b = a.length, c = a[0]; b--;) { a[b] > c && (c = a[b]) } return c } function Ma (a, b) {
    for (const c in a) {
      a[c] && a[c] !== b && a[c].destroy && a[c].destroy(),
      delete a[c]
    }
  } function Sa (a) { lb || (lb = aa(Ta)); a && lb.appendChild(a); lb.innerHTML = '' } function oa (a, b) { const c = 'Highcharts error #' + a + ': www.highcharts.com/errors/' + a; if (b) { throw c } U.console && console.log(c) } function la (a, b) { return parseFloat(a.toPrecision(b || 14)) } function Xa (a, b) { b.renderer.globalAnimation = p(a, b.animation) } function Nb () {
    const a = N.global; const b = a.useUTC; const c = b ? 'getUTC' : 'get'; const d = b ? 'setUTC' : 'set'; fa = a.Date || window.Date; vb = b && a.timezoneOffset; kb = b && a.getTimezoneOffset; mb = function (a, c, d, h, i, k) {
      let j; b ? (j =
fa.UTC.apply(0, arguments), j += ab(j)) : j = (new fa(a, c, p(d, 1), p(h, 0), p(i, 0), p(k, 0))).getTime(); return j
    }; zb = c + 'Minutes'; Ab = c + 'Hours'; Bb = c + 'Day'; bb = c + 'Date'; cb = c + 'Month'; db = c + 'FullYear'; Ob = d + 'Milliseconds'; Pb = d + 'Seconds'; Qb = d + 'Minutes'; Rb = d + 'Hours'; Cb = d + 'Date'; Db = d + 'Month'; Eb = d + 'FullYear'
  } function Z () {} function Ya (a, b, c, d) { this.axis = a; this.pos = b; this.type = c || ''; this.isNew = !0; !c && !d && this.addLabel() } function Sb (a, b, c, d, e) {
    const f = a.chart.inverted; this.axis = a; this.isNegative = c; this.options = b; this.x = d; this.total =
null; this.points = {}; this.stack = e; this.alignOptions = { align: b.align || (f ? c ? 'left' : 'right' : 'center'), verticalAlign: b.verticalAlign || (f ? 'middle' : c ? 'bottom' : 'top'), y: p(b.y, f ? 4 : c ? 14 : -6), x: p(b.x, f ? c ? -6 : 6 : 0) }; this.textAlign = b.textAlign || (f ? c ? 'right' : 'left' : 'center')
  } function Fb (a) {
    var b = a.options; const c = b.navigator; const d = c.enabled; var b = b.scrollbar; const e = b.enabled; const f = d ? c.height : 0; const g = e ? b.height : 0; this.handles = []; this.scrollbarButtons = []; this.elementsToDestroy = []; this.chart = a; this.setBaseSeries(); this.height = f; this.scrollbarHeight =
g; this.scrollbarEnabled = e; this.navigatorEnabled = d; this.navigatorOptions = c; this.scrollbarOptions = b; this.outlineHeight = f + g; this.init()
  } function Gb (a) { this.init(a) } let s; var F = document; var U = window; var Y = Math; const x = Y.round; var T = Y.floor; const za = Y.ceil; const v = Y.max; const E = Y.min; const Q = Y.abs; const ba = Y.cos; const ga = Y.sin; const ua = Y.PI; const pa = ua * 2 / 360; const Ga = navigator.userAgent; const Tb = U.opera; var ya = /(msie|trident|edge)/i.test(Ga) && !Tb; const nb = F.documentMode === 8; const ob = !ya && /AppleWebKit/.test(Ga); const Ua = /Firefox/.test(Ga); const eb = /(Mobile|Android|Windows Phone)/.test(Ga); let Na = 'http://www.w3.org/2000/svg'
  var ea = !!F.createElementNS && !!F.createElementNS(Na, 'svg').createSVGRect; const Yb = Ua && parseInt(Ga.split('Firefox/')[1], 10) < 4; const ma = !ea && !ya && !!F.createElement('canvas').getContext; let Va; let Za; const Ub = {}; let Hb = 0; let lb; let N; let ja; let Ib; let J; const ka = function () { return s }; const ca = []; let fb = 0; var Ta = 'div'; var $ = 'none'; const Zb = /^[0-9]+$/; const pb = ['plotTop', 'marginRight', 'marginBottom', 'plotLeft']; const $b = 'stroke-width'; let fa; let mb; let vb; let kb; let zb; let Ab; let Bb; let bb; let cb; let db; let Ob; let Pb; let Qb; let Rb; let Cb; let Db; let Eb; const K = {}; let D; D = U.Highcharts = U.Highcharts ? oa(16, !0) : {}; D.seriesTypes = K; var w = D.extend = function (a, b) {
    let c; a || (a = {}); for (c in b) {
      a[c] =
b[c]
    } return a
  }; var p = D.pick = function () { const a = arguments; let b; let c; const d = a.length; for (b = 0; b < d; b++) { if (c = a[b], c !== s && c !== null) { return c } } }; const R = D.wrap = function (a, b, c) { const d = a[b]; a[b] = function () { const a = Array.prototype.slice.call(arguments); a.unshift(d); return c.apply(this, a) } }; ja = function (a, b, c) {
    if (!t(b) || isNaN(b)) { return N.lang.invalidDate || '' } var a = p(a, '%Y-%m-%d %H:%M:%S'); var d = new fa(b - ab(b)); let e; const f = d[Ab](); const g = d[Bb](); const h = d[bb](); const i = d[cb](); const k = d[db](); const j = N.lang; const m = j.weekdays; var d = w({
      a: m[g].substr(0, 3),
      A: m[g],
      d: Qa(h),
      e: h,
      w: g,
      b: j.shortMonths[i],
      B: j.months[i],
      m: Qa(i + 1),
      y: k.toString().substr(2, 2),
      Y: k,
      H: Qa(f),
      k: f,
      I: Qa(f % 12 || 12),
      l: f % 12 || 12,
      M: Qa(d[zb]()),
      p: f < 12 ? 'AM' : 'PM',
      P: f < 12 ? 'am' : 'pm',
      S: Qa(d.getSeconds()),
      L: Qa(x(b % 1e3), 3)
    }, D.dateFormats); for (e in d) { for (;a.includes('%' + e);) { a = a.replace('%' + e, typeof d[e] === 'function' ? d[e](b) : d[e]) } } return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
  }; J = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }; D.numberFormat = function (a, b, c, d) {
    var e = N.lang; var a = +a || 0; const f = b ===
-1 ? E((a.toString().split('.')[1] || '').length, 20) : isNaN(b = Q(b)) ? 2 : b; var b = c === void 0 ? e.decimalPoint : c; var d = d === void 0 ? e.thousandsSep : d; var e = a < 0 ? '-' : ''; var c = String(I(a = Q(a).toFixed(f))); const g = c.length > 3 ? c.length % 3 : 0; return e + (g ? c.substr(0, g) + d : '') + c.substr(g).replace(/(\d{3})(?=\d)/g, '$1' + d) + (f ? b + Q(a - c).toFixed(f).slice(2) : '')
  }; Ib = {
    init (a, b, c) {
      var b = b || ''; let d = a.shift; const e = b.includes('C'); const f = e ? 7 : 3; let g; var b = b.split(' '); var c = [].concat(c); let h; let i; const k = function (a) {
        for (g = a.length; g--;) {
          a[g] === 'M' && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g +
1], a[g + 2])
        }
      }; e && (k(b), k(c)); a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6)); if (d <= c.length / f && b.length === c.length) { for (;d--;) { c = [].concat(c).splice(0, f).concat(c) } }a.shift = 0; if (b.length) { for (a = c.length; b.length < a;) { d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d) } }h && (b = b.concat(h), c = c.concat(i)); return [b, c]
    },
    step (a, b, c, d) {
      let e = []; let f = a.length; if (c === 1) { e = d } else if (f === b.length && c < 1) {
        for (;f--;) {
          d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) +
d
        }
      } else { e = b } return e
    }
  }; (function (a) {
    U.HighchartsAdapter = U.HighchartsAdapter || a && {
      init (b) {
        const c = a.fx; a.extend(a.easing, { easeOutQuad (a, b, c, g, h) { return -g * (b /= h) * (b - 2) + c } }); a.each(['cur', '_default', 'width', 'height', 'opacity'], function (b, e) { let f = c.step; let g; e === 'cur' ? f = c.prototype : e === '_default' && a.Tween && (f = a.Tween.propHooks[e], e = 'set'); (g = f[e]) && (f[e] = function (a) { let c; var a = b ? a : this; if (a.prop !== 'align') { return c = a.elem, c.attr ? c.attr(a.prop, e === 'cur' ? s : a.now) : g.apply(this, arguments) } }) }); R(a.cssHooks.opacity,
          'get', function (a, b, c) { return b.attr ? b.opacity || 0 : a.call(this, b, c) }); this.addAnimSetter('d', function (a) { const c = a.elem; let f; if (!a.started) { f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0 }c.attr('d', b.step(a.start, a.end, a.pos, c.toD)) }); this.each = Array.prototype.forEach ? function (a, b) { return Array.prototype.forEach.call(a, b) } : function (a, b) { let c; const g = a.length; for (c = 0; c < g; c++) { if (b.call(a[c], a[c], c, a) === !1) { return c } } }; a.fn.highcharts = function () {
          let a = 'Chart'; let b = arguments; let c; let g; if (this[0]) {
            Ia(b[0]) && (a = b[0],
            b = Array.prototype.slice.call(b, 1)); c = b[0]; if (c !== s) { c.chart = c.chart || {}, c.chart.renderTo = this[0], new D[a](c, b[1]), g = this }c === s && (g = ca[X(this[0], 'data-highcharts-chart')])
          } return g
        }
      },
      addAnimSetter (b, c) { a.Tween ? a.Tween.propHooks[b] = { set: c } : a.fx.step[b] = c },
      getScript: a.getScript,
      inArray: a.inArray,
      adapterRun (b, c) { return a(b)[c]() },
      grep: a.grep,
      map (a, c) { for (var d = [], e = 0, f = a.length; e < f; e++) { d[e] = c.call(a[e], a[e], e, a) } return d },
      offset (b) { return a(b).offset() },
      addEvent (b,
        c, d) { a(b).bind(c, d) },
      removeEvent (b, c, d) { const e = F.removeEventListener ? 'removeEventListener' : 'detachEvent'; F[e] && b && !b[e] && (b[e] = function () {}); a(b).unbind(c, d) },
      fireEvent (b, c, d, e) {
        const f = a.Event(c); const g = 'detached' + c; let h; !ya && d && (delete d.layerX, delete d.layerY, delete d.returnValue); w(f, d); b[c] && (b[g] = b[c], b[c] = null); a.each(['preventDefault', 'stopPropagation'], function (a, b) { const c = f[b]; f[b] = function () { try { c.call(f) } catch (a) { b === 'preventDefault' && (h = !0) } } }); a(b).trigger(f); b[g] && (b[c] = b[g],
        b[g] = null); e && !f.isDefaultPrevented() && !h && e(f)
      },
      washMouseEvent (a) { const c = a.originalEvent || a; if (c.pageX === s) { c.pageX = a.pageX, c.pageY = a.pageY } return c },
      animate (b, c, d) { const e = a(b); if (!b.style) { b.style = {} } if (c.d) { b.toD = c.d, c.d = 1 }e.stop(); c.opacity !== s && b.attr && (c.opacity += 'px'); b.hasAnim = 1; e.animate(c, d) },
      stop (b) { b.hasAnim && a(b).stop() }
    }
  })(U.jQuery); var S = U.HighchartsAdapter; let M = S || {}; S && S.init.call(S, Ib); const qb = M.adapterRun; const ac = M.getScript; const Oa = M.inArray; const o = D.each = M.each; const gb = M.grep; const bc =
M.offset; const Aa = M.map; const A = M.addEvent; const V = M.removeEvent; const O = M.fireEvent; const cc = M.washMouseEvent; const rb = M.animate; const $a = M.stop; N = {
    colors: '#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1'.split(','),
    symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
    lang: {
      loading: 'Loading...',
      months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
      shortMonths: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
      weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
      decimalPoint: '.',
      numericSymbols: 'k,M,G,T,P,E'.split(','),
      resetZoom: 'Reset zoom',
      resetZoomTitle: 'Reset zoom level 1:1',
      thousandsSep: ' '
    },
    global: { useUTC: !0, canvasToolsURL: 'http://code.highcharts.com/stock/2.1.9/modules/canvas-tools.js', VMLRadialGradientURL: 'http://code.highcharts.com/stock/2.1.9/gfx/vml-radial-gradient.png' },
    chart: {
      borderColor: '#4572A7',
      borderRadius: 0,
      defaultSeriesType: 'line',
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      backgroundColor: '#FFFFFF',
      plotBorderColor: '#C0C0C0',
      resetZoomButton: {
        theme: { zIndex: 20 },
        position: { align: 'right', x: -10, y: 10 }
      }
    },
    title: { text: 'Chart title', align: 'center', margin: 15, style: { color: '#333333', fontSize: '18px' } },
    subtitle: { text: '', align: 'center', style: { color: '#555555' } },
    plotOptions: {
      line: {
        allowPointSelect: !1,
        showCheckbox: !1,
        animation: { duration: 1e3 },
        events: {},
        lineWidth: 2,
        marker: { lineWidth: 0, radius: 4, lineColor: '#FFFFFF', states: { hover: { enabled: !0, lineWidthPlus: 1, radiusPlus: 2 }, select: { fillColor: '#FFFFFF', lineColor: '#000000', lineWidth: 2 } } },
        point: { events: {} },
        dataLabels: {
          align: 'center',
          formatter () { return this.y === null ? '' : D.numberFormat(this.y, -1) },
          style: { color: 'contrast', fontSize: '11px', fontWeight: 'bold', textShadow: '0 0 6px contrast, 0 0 3px contrast' },
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          padding: 5
        },
        cropThreshold: 300,
        pointRange: 0,
        softThreshold: !0,
        states: { hover: { lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { marker: {} } },
        stickyTracking: !0,
        turboThreshold: 1e3
      }
    },
    labels: { style: { position: 'absolute', color: '#3E576F' } },
    legend: {
      enabled: !0,
      align: 'center',
      layout: 'horizontal',
      labelFormatter () { return this.name },
      borderColor: '#909090',
      borderRadius: 0,
      navigation: { activeColor: '#274b6d', inactiveColor: '#CCC' },
      shadow: !1,
      itemStyle: { color: '#333333', fontSize: '12px', fontWeight: 'bold' },
      itemHoverStyle: { color: '#000' },
      itemHiddenStyle: { color: '#CCC' },
      itemCheckboxStyle: { position: 'absolute', width: '13px', height: '13px' },
      symbolPadding: 5,
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
      title: { style: { fontWeight: 'bold' } }
    },
    loading: {
      labelStyle: { fontWeight: 'bold', position: 'relative', top: '45%' },
      style: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.5,
        textAlign: 'center'
      }
    },
    tooltip: {
      enabled: !0,
      animation: ea,
      backgroundColor: 'rgba(249, 249, 249, .85)',
      borderWidth: 1,
      borderRadius: 3,
      dateTimeLabelFormats: { millisecond: '%A, %b %e, %H:%M:%S.%L', second: '%A, %b %e, %H:%M:%S', minute: '%A, %b %e, %H:%M', hour: '%A, %b %e, %H:%M', day: '%A, %b %e, %Y', week: 'Week from %A, %b %e, %Y', month: '%B %Y', year: '%Y' },
      footerFormat: '',
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
      shadow: !0,
      snap: eb ? 25 : 10,
      style: { color: '#333333', cursor: 'default', fontSize: '12px', padding: '8px', pointerEvents: 'none', whiteSpace: 'nowrap' }
    },
    credits: { enabled: !0, text: 'Highcharts.com', href: 'http://www.highcharts.com', position: { align: 'right', x: -10, verticalAlign: 'bottom', y: -5 }, style: { cursor: 'pointer', color: '#909090', fontSize: '9px' } }
  }; const W = N.plotOptions; var S = W.line; Nb(); const dc = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/; const ec = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/
  const fc = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/; var va = function (a) {
    let b = []; let c; let d; (function (a) { a && a.stops ? d = Aa(a.stops, function (a) { return va(a[1]) }) : (c = dc.exec(a)) ? b = [I(c[1]), I(c[2]), I(c[3]), parseFloat(c[4], 10)] : (c = ec.exec(a)) ? b = [I(c[1], 16), I(c[2], 16), I(c[3], 16), 1] : (c = fc.exec(a)) && (b = [I(c[1]), I(c[2]), I(c[3]), 1]) })(a); return {
      get (c) {
        let f; d ? (f = B(a), f.stops = [].concat(f.stops), o(d, function (a, b) { f.stops[b] = [f.stops[b][0], a.get(c)] })) : f = b && !isNaN(b[0]) ? c === 'rgb' ? 'rgb(' + b[0] + ',' +
b[1] + ',' + b[2] + ')' : c === 'a' ? b[3] : 'rgba(' + b.join(',') + ')' : a; return f
      },
      brighten (a) { if (d) { o(d, function (b) { b.brighten(a) }) } else if (ra(a) && a !== 0) { let c; for (c = 0; c < 3; c++) { b[c] += I(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255) } } return this },
      rgba: b,
      setOpacity (a) { b[3] = a; return this },
      raw: a
    }
  }; Z.prototype = {
    opacity: 1,
    textProps: 'fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow'.split(','),
    init (a, b) {
      this.element = b === 'span' ? aa(b) : F.createElementNS(Na,
        b); this.renderer = a
    },
    animate (a, b, c) { b = p(b, this.renderer.globalAnimation, !0); $a(this); if (b) { b = B(b, {}); if (c) { b.complete = c }rb(this, a, b) } else { this.attr(a, null, c) } return this },
    colorGradient (a, b, c) {
      const d = this.renderer; let e; let f; let g; let h; let i; let k; let j; let m; let l; let n; let q; let r = []; a.linearGradient ? f = 'linearGradient' : a.radialGradient && (f = 'radialGradient'); if (f) {
        g = a[f]; i = d.gradients; j = a.stops; n = c.radialReference; Ja(g) && (a[f] = g = { x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: 'userSpaceOnUse' }); f === 'radialGradient' && n && !t(g.gradientUnits) &&
(h = g, g = B(g, d.getRadialAttr(n, h), { gradientUnits: 'userSpaceOnUse' })); for (q in g) { q !== 'id' && r.push(q, g[q]) } for (q in j) { r.push(j[q]) }r = r.join(','); i[r] ? a = i[r].attr('id') : (g.id = a = 'highcharts-' + Hb++, i[r] = k = d.createElement(f).attr(g).add(d.defs), k.radAttr = h, k.stops = [], o(j, function (a) { a[1].indexOf('rgba') === 0 ? (e = va(a[1]), m = e.get('rgb'), l = e.get('a')) : (m = a[1], l = 1); a = d.createElement('stop').attr({ offset: a[0], 'stop-color': m, 'stop-opacity': l }).add(k); k.stops.push(a) })); c.setAttribute(b, 'url(' + d.url + '#' + a + ')'); c.gradient =
r
      }
    },
    applyTextShadow (a) {
      const b = this.element; let c; const d = a.includes('contrast'); const e = {}; const f = this.renderer.forExport; const g = f || b.style.textShadow !== s && !ya; if (d) { e.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill)) } if (ob || f) { e.textRendering = 'geometricPrecision' }g ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(b.getElementsByTagName('tspan')), o(a.split(/\s?,\s?/g), function (a) {
        const d = b.firstChild; let e; let f; var a = a.split(' '); e = a[a.length - 1]; (f = a[a.length - 2]) && o(c, function (a,
          c) { let g; c === 0 && (a.setAttribute('x', b.getAttribute('x')), c = b.getAttribute('y'), a.setAttribute('y', c || 0), c === null && b.setAttribute('y', 0)); g = a.cloneNode(1); X(g, { class: 'highcharts-text-shadow', fill: e, stroke: e, 'stroke-opacity': 1 / v(I(f), 3), 'stroke-width': f, 'stroke-linejoin': 'round' }); b.insertBefore(g, d) })
      }))
    },
    attr (a, b, c) {
      let d; const e = this.element; let f; let g = this; let h; typeof a === 'string' && b !== s && (d = a, a = {}, a[d] = b); if (typeof a === 'string') { g = (this[a + 'Getter'] || this._defaultGetter).call(this, a, e) } else {
        for (d in a) {
          b =
a[d]; h = !1; this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d) && (f || (this.symbolAttr(a), f = !0), h = !0); if (this.rotation && (d === 'x' || d === 'y')) { this.doTransform = !0 } h || (this[d + 'Setter'] || this._defaultSetter).call(this, b, d, e); this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b)
        } if (this.doTransform) { this.updateTransform(), this.doTransform = !1 }
      }c && c(); return g
    },
    updateShadows (a, b) {
      for (let c = this.shadows, d = c.length; d--;) {
        c[d].setAttribute(a,
          a === 'height' ? v(b - (c[d].cutHeight || 0), 0) : a === 'd' ? this.d : b)
      }
    },
    addClass (a) { const b = this.element; const c = X(b, 'class') || ''; !c.includes(a) && X(b, 'class', c + ' ' + a); return this },
    symbolAttr (a) { const b = this; o('x,y,r,start,end,width,height,innerR,anchorX,anchorY'.split(','), function (c) { b[c] = p(a[c], b[c]) }); b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) }) },
    clip (a) { return this.attr('clip-path', a ? 'url(' + this.renderer.url + '#' + a.id + ')' : $) },
    crisp (a) {
      let b; const c = {}; let d; const e =
a.strokeWidth || this.strokeWidth || 0; d = x(e) % 2 / 2; a.x = T(a.x || this.x || 0) + d; a.y = T(a.y || this.y || 0) + d; a.width = T((a.width || this.width || 0) - 2 * d); a.height = T((a.height || this.height || 0) - 2 * d); a.strokeWidth = e; for (b in a) { this[b] !== a[b] && (this[b] = c[b] = a[b]) } return c
    },
    css (a) {
      let b = this.styles; const c = {}; const d = this.element; let e; let f; let g = ''; e = !b; if (a && a.color) { a.fill = a.color } if (b) { for (f in a) { a[f] !== b[f] && (c[f] = a[f], e = !0) } } if (e) {
        e = this.textWidth = a && a.width && d.nodeName.toLowerCase() === 'text' && I(a.width) || this.textWidth; b && (a = w(b, c))
        this.styles = a; e && (ma || !ea && this.renderer.forExport) && delete a.width; if (ya && !ea) { G(this.element, a) } else { b = function (a, b) { return '-' + b.toLowerCase() }; for (f in a) { g += f.replace(/([A-Z])/g, b) + ':' + a[f] + ';' }X(d, 'style', g) }e && this.added && this.renderer.buildText(this)
      } return this
    },
    on (a, b) {
      const c = this; const d = c.element; Za && a === 'click' ? (d.ontouchstart = function (a) { c.touchEventFired = fa.now(); a.preventDefault(); b.call(d, a) }, d.onclick = function (a) {
        (!Ga.includes('Android') || fa.now() - (c.touchEventFired || 0) > 1100) &&
b.call(d, a)
      }) : d['on' + a] = b; return this
    },
    setRadialReference (a) { const b = this.renderer.gradients[this.element.gradient]; this.element.radialReference = a; b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)); return this },
    translate (a, b) { return this.attr({ translateX: a, translateY: b }) },
    invert () { this.inverted = !0; this.updateTransform(); return this },
    updateTransform () {
      let a = this.translateX || 0; let b = this.translateY || 0; const c = this.scaleX; const d = this.scaleY; const e = this.inverted; const f = this.rotation
      const g = this.element; e && (a += this.attr('width'), b += this.attr('height')); a = ['translate(' + a + ',' + b + ')']; e ? a.push('rotate(90) scale(-1,1)') : f && a.push('rotate(' + f + ' ' + (g.getAttribute('x') || 0) + ' ' + (g.getAttribute('y') || 0) + ')'); (t(c) || t(d)) && a.push('scale(' + p(c, 1) + ' ' + p(d, 1) + ')'); a.length && g.setAttribute('transform', a.join(' '))
    },
    toFront () { const a = this.element; a.parentNode.appendChild(a); return this },
    align (a, b, c) {
      let d; let e; let f; let g; const h = {}; e = this.renderer; f = e.alignedObjects; if (a) {
        if (this.alignOptions = a, this.alignByTranslate =
b, !c || Ia(c)) { this.alignTo = d = c || 'renderer', ta(f, this), f.push(this), c = null }
      } else { a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo }c = p(c, e[d], e); d = a.align; e = a.verticalAlign; f = (c.x || 0) + (a.x || 0); g = (c.y || 0) + (a.y || 0); if (d === 'right' || d === 'center') { f += (c.width - (a.width || 0)) / { right: 1, center: 2 }[d] }h[b ? 'translateX' : 'x'] = x(f); if (e === 'bottom' || e === 'middle') { g += (c.height - (a.height || 0)) / ({ bottom: 1, middle: 2 }[e] || 1) }h[b ? 'translateY' : 'y'] = x(g); this[this.placed ? 'animate' : 'attr'](h); this.placed = !0; this.alignAttr =
h; return this
    },
    getBBox (a) {
      let b; const c = this.renderer; let d; const e = this.rotation; const f = this.element; const g = this.styles; const h = e * pa; d = this.textStr; let i; const k = f.style; let j; let m; d !== s && (m = ['', e || 0, g && g.fontSize, f.style.width].join(','), m = d === '' || Zb.test(d) ? 'num:' + d.toString().length + m : d + m); m && !a && (b = c.cache[m]); if (!b) {
        if (f.namespaceURI === Na || c.forExport) {
          try {
            j = this.fakeTS && function (a) { o(f.querySelectorAll('.highcharts-text-shadow'), function (b) { b.style.display = a }) }, Ua && k.textShadow ? (i = k.textShadow, k.textShadow = '') : j && j($), b = f.getBBox
              ? w({}, f.getBBox()) : { width: f.offsetWidth, height: f.offsetHeight }, i ? k.textShadow = i : j && j('')
          } catch (l) {} if (!b || b.width < 0) { b = { width: 0, height: 0 } }
        } else { b = this.htmlGetBBox() } if (c.isSVG) { a = b.width; d = b.height; if (ya && g && g.fontSize === '11px' && d.toPrecision(3) === '16.9') { b.height = d = 14 } if (e) { b.width = Q(d * ga(h)) + Q(a * ba(h)), b.height = Q(d * ba(h)) + Q(a * ga(h)) } }m && (c.cache[m] = b)
      } return b
    },
    show (a) { return this.attr({ visibility: a ? 'inherit' : 'visible' }) },
    hide () { return this.attr({ visibility: 'hidden' }) },
    fadeOut (a) {
      const b =
this; b.animate({ opacity: 0 }, { duration: a || 150, complete () { b.attr({ y: -9999 }) } })
    },
    add (a) { const b = this.renderer; const c = this.element; let d; if (a) { this.parentGroup = a } this.parentInverted = a && a.inverted; this.textStr !== void 0 && b.buildText(this); this.added = !0; if (!a || a.handleZ || this.zIndex) { d = this.zIndexSetter() }d || (a ? a.element : b.box).appendChild(c); if (this.onAdd) { this.onAdd() } return this },
    safeRemoveChild (a) { const b = a.parentNode; b && b.removeChild(a) },
    destroy () {
      const a = this; let b = a.element || {}; const c = a.shadows
      let d = a.renderer.isSVG && b.nodeName === 'SPAN' && a.parentGroup; let e; let f; b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null; $a(a); if (a.clipPath) { a.clipPath = a.clipPath.destroy() } if (a.stops) { for (f = 0; f < a.stops.length; f++) { a.stops[f] = a.stops[f].destroy() }a.stops = null }a.safeRemoveChild(b); for (c && o(c, function (b) { a.safeRemoveChild(b) }); d && d.div && d.div.childNodes.length === 0;) { b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b }a.alignTo && ta(a.renderer.alignedObjects, a); for (e in a) { delete a[e] } return null
    },
    shadow (a, b, c) { const d = []; let e; let f; const g = this.element; let h; let i; let k; let j; if (a) { i = p(a.width, 3); k = (a.opacity || 0.15) / i; j = this.parentInverted ? '(-1,-1)' : '(' + p(a.offsetX, 1) + ', ' + p(a.offsetY, 1) + ')'; for (e = 1; e <= i; e++) { f = g.cloneNode(0); h = i * 2 + 1 - 2 * e; X(f, { isShadow: 'true', stroke: a.color || 'black', 'stroke-opacity': k * e, 'stroke-width': h, transform: 'translate' + j, fill: $ }); if (c) { X(f, 'height', v(X(f, 'height') - h, 0)), f.cutHeight = h }b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g); d.push(f) } this.shadows = d } return this },
    xGetter (a) {
      this.element.nodeName ===
'circle' && (a = { x: 'cx', y: 'cy' }[a] || a); return this._defaultGetter(a)
    },
    _defaultGetter (a) { a = p(this[a], this.element ? this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a },
    dSetter (a, b, c) { a && a.join && (a = a.join(' ')); /(NaN| {2}|^$)/.test(a) && (a = 'M 0 0'); c.setAttribute(b, a); this[b] = a },
    dashstyleSetter (a) {
      let b; if (a = a && a.toLowerCase()) {
        a = a.replace('shortdashdotdot', '3,1,1,1,1,1,').replace('shortdashdot', '3,1,1,1').replace('shortdot', '1,1,').replace('shortdash',
          '3,1,').replace('longdash', '8,3,').replace(/dot/g, '1,3,').replace('dash', '4,3,').replace(/,$/, '').split(','); for (b = a.length; b--;) { a[b] = I(a[b]) * this['stroke-width'] }a = a.join(',').replace('NaN', 'none'); this.element.setAttribute('stroke-dasharray', a)
      }
    },
    alignSetter (a) { this.element.setAttribute('text-anchor', { left: 'start', center: 'middle', right: 'end' }[a]) },
    opacitySetter (a, b, c) { this[b] = a; c.setAttribute(b, a) },
    titleSetter (a) {
      let b = this.element.getElementsByTagName('title')[0]; b ||
(b = F.createElementNS(Na, 'title'), this.element.appendChild(b)); b.appendChild(F.createTextNode(String(p(a), '').replace(/<[^>]*>/g, '')))
    },
    textSetter (a) { if (a !== this.textStr) { delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this) } },
    fillSetter (a, b, c) { typeof a === 'string' ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c) },
    visibilitySetter (a, b, c) { a === 'inherit' ? c.removeAttribute(b) : c.setAttribute(b, a) },
    zIndexSetter (a, b) {
      var c = this.renderer; let d = this.parentGroup
      var c = (d || c).element || c.box; let e; let f; const g = this.element; let h; e = this.added; let i; t(a) && (g.setAttribute(b, a), a = +a, this[b] === a && (e = !1), this[b] = a); if (e) { if ((a = this.zIndex) && d) { d.handleZ = !0 }d = c.childNodes; for (i = 0; i < d.length && !h; i++) { if (e = d[i], f = X(e, 'zIndex'), e !== g && (I(f) > a || !t(a) && t(f))) { c.insertBefore(g, e), h = !0 } }h || c.appendChild(g) } return h
    },
    _defaultSetter (a, b, c) { c.setAttribute(b, a) }
  }; Z.prototype.yGetter = Z.prototype.xGetter; Z.prototype.translateXSetter = Z.prototype.translateYSetter = Z.prototype.rotationSetter = Z.prototype.verticalAlignSetter =
Z.prototype.scaleXSetter = Z.prototype.scaleYSetter = function (a, b) { this[b] = a; this.doTransform = !0 }; Z.prototype['stroke-widthSetter'] = Z.prototype.strokeSetter = function (a, b, c) { this[b] = a; if (this.stroke && this['stroke-width']) { this.strokeWidth = this['stroke-width'], Z.prototype.fillSetter.call(this, this.stroke, 'stroke', c), c.setAttribute('stroke-width', this['stroke-width']), this.hasStroke = !0 } else if (b === 'stroke-width' && a === 0 && this.hasStroke) { c.removeAttribute('stroke'), this.hasStroke = !1 } }; const qa = function () {
    this.init.apply(this,
      arguments)
  }; qa.prototype = {
    Element: Z,
    init (a, b, c, d, e, f) {
      const g = location; let h; var d = this.createElement('svg').attr({ version: '1.1' }).css(this.getStyle(d)); h = d.element; a.appendChild(h); !a.innerHTML.includes('xmlns') && X(h, 'xmlns', Na); this.isSVG = !0; this.box = h; this.boxWrapper = d; this.alignedObjects = []; this.url = (Ua || ob) && F.getElementsByTagName('base').length ? g.href.replace(/#.*?$/, '').replace(/([\('\)])/g, '\\$1').replace(/ /g, '%20') : ''; this.createElement('desc').add().element.appendChild(F.createTextNode('Created with Highstock 2.1.9'))
      this.defs = this.createElement('defs').add(); this.allowHTML = f; this.forExport = e; this.gradients = {}; this.cache = {}; this.setSize(b, c, !1); let i; if (Ua && a.getBoundingClientRect) { this.subPixelFix = b = function () { G(a, { left: 0, top: 0 }); i = a.getBoundingClientRect(); G(a, { left: za(i.left) - i.left + 'px', top: za(i.top) - i.top + 'px' }) }, b(), A(U, 'resize', b) }
    },
    getStyle (a) { return this.style = w({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: '12px' }, a) },
    isHidden () { return !this.boxWrapper.getBBox().width },
    destroy () { const a = this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy(); Ma(this.gradients || {}); this.gradients = null; if (a) { this.defs = a.destroy() } this.subPixelFix && V(U, 'resize', this.subPixelFix); return this.alignedObjects = null },
    createElement (a) { const b = new this.Element(); b.init(this, a); return b },
    draw () {},
    getRadialAttr (a, b) { return { cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2] } },
    buildText (a) {
      for (var b = a.element, c = this, d = c.forExport, e = p(a.textStr,
          '').toString(), f = e.includes('<'), g = b.childNodes, h, i, k = X(b, 'x'), j = a.styles, m = a.textWidth, l = j && j.lineHeight, n = j && j.textShadow, q = j && j.textOverflow === 'ellipsis', r = g.length, C = m && !a.added && this.box, z = function (a) { return l ? I(l) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : j && j.fontSize || c.style.fontSize || 12, a).h }, u = function (a) { return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>') }; r--;) { b.removeChild(g[r]) }!f && !n && !q && !e.includes(' ') ? b.appendChild(F.createTextNode(u(e))) : (h = /<.*style="([^"]+)".*>/,
      i = /<.*href="(http[^"]+)".*>/, C && C.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, '<span').replace(/<\/(b|strong|i|em|a)>/g, '</span>').split(/<br.*?>/g) : [e], e[e.length - 1] === '' && e.pop(), o(e, function (e, f) {
        let g; let l = 0; var e = e.replace(/<span/g, '|||<span').replace(/<\/span>/g, '</span>|||'); g = e.split('|||'); o(g, function (e) {
          if (e !== '' || g.length === 1) {
            var n = {}; let r = F.createElementNS(Na, 'tspan'); let C; h.test(e) && (C = e.match(h)[1].replace(/(;| |^)color([ :])/,
              '$1fill$2'), X(r, 'style', C)); i.test(e) && !d && (X(r, 'onclick', 'location.href="' + e.match(i)[1] + '"'), G(r, { cursor: 'pointer' })); e = u(e.replace(/<(.|\n)*?>/g, '') || ' '); if (e !== ' ') {
              r.appendChild(F.createTextNode(e)); if (l) { n.dx = 0 } else if (f && k !== null) { n.x = k }X(r, n); b.appendChild(r); !l && f && (!ea && d && G(r, { display: 'block' }), X(r, 'dy', z(r))); if (m) {
                for (var n = e.replace(/([^\^])-/g, '$1- ').split(' '), p = g.length > 1 || f || n.length > 1 && j.whiteSpace !== 'nowrap', o, y, s, t = [], v = z(r), x = 1, w = a.rotation, B = e, E = B.length; (p || q) && (n.length ||
t.length);) {
                  a.rotation = 0, o = a.getBBox(!0), s = o.width, !ea && c.forExport && (s = c.measureSpanWidth(r.firstChild.data, a.styles)), o = s > m, y === void 0 && (y = o), q && y ? (E /= 2, B === '' || !o && E < 0.5 ? n = [] : (o && (y = !0), B = e.substring(0, B.length + (o ? -1 : 1) * za(E)), n = [B + (m > 3 ? '\u2026' : '')], r.removeChild(r.firstChild))) : !o || n.length === 1 ? (n = t, t = [], n.length && (x++, r = F.createElementNS(Na, 'tspan'), X(r, { dy: v, x: k }), C && X(r, 'style', C), b.appendChild(r)), s > m && (m = s)) : (r.removeChild(r.firstChild), t.unshift(n.pop())), n.length && r.appendChild(F.createTextNode(n.join(' ').replace(/- /g,
                    '-')))
                }y && a.attr('title', a.textStr); a.rotation = w
              }l++
            }
          }
        })
      }), C && C.removeChild(b), n && a.applyTextShadow && a.applyTextShadow(n))
    },
    getContrast (a) { a = va(a).rgba; return a[0] + a[1] + a[2] > 384 ? '#000000' : '#FFFFFF' },
    button (a, b, c, d, e, f, g, h, i) {
      const k = this.label(a, b, c, i, null, null, null, null, 'button'); let j = 0; let m; let l; let n; let q; let r; let C; var a = { x1: 0, y1: 0, x2: 0, y2: 1 }; var e = B({ 'stroke-width': 1, stroke: '#CCCCCC', fill: { linearGradient: a, stops: [[0, '#FEFEFE'], [1, '#F6F6F6']] }, r: 2, padding: 5, style: { color: 'black' } }, e); n = e.style; delete e.style
      f = B(e, { stroke: '#68A', fill: { linearGradient: a, stops: [[0, '#FFF'], [1, '#ACF']] } }, f); q = f.style; delete f.style; g = B(e, { stroke: '#68A', fill: { linearGradient: a, stops: [[0, '#9BD'], [1, '#CDF']] } }, g); r = g.style; delete g.style; h = B(e, { style: { color: '#CCC' } }, h); C = h.style; delete h.style; A(k.element, ya ? 'mouseover' : 'mouseenter', function () { j !== 3 && k.attr(f).css(q) }); A(k.element, ya ? 'mouseout' : 'mouseleave', function () { j !== 3 && (m = [e, f, g][j], l = [n, q, r][j], k.attr(m).css(l)) }); k.setState = function (a) {
        (k.state = j = a) ? a === 2 ? k.attr(g).css(r)
          : a === 3 && k.attr(h).css(C) : k.attr(e).css(n)
      }; return k.on('click', function (a) { j !== 3 && d.call(k, a) }).attr(e).css(w({ cursor: 'default' }, n))
    },
    crispLine (a, b) { a[1] === a[4] && (a[1] = a[4] = x(a[1]) - b % 2 / 2); a[2] === a[5] && (a[2] = a[5] = x(a[2]) + b % 2 / 2); return a },
    path (a) { const b = { fill: $ }; Ja(a) ? b.d = a : ha(a) && w(b, a); return this.createElement('path').attr(b) },
    circle (a, b, c) {
      a = ha(a) ? a : { x: a, y: b, r: c }; b = this.createElement('circle'); b.xSetter = function (a) { this.element.setAttribute('cx', a) }; b.ySetter = function (a) {
        this.element.setAttribute('cy',
          a)
      }; return b.attr(a)
    },
    arc (a, b, c, d, e, f) { if (ha(a)) { b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x }a = this.symbol('arc', a || 0, b || 0, c || 0, c || 0, { innerR: d || 0, start: e || 0, end: f || 0 }); a.r = c; return a },
    rect (a, b, c, d, e, f) { var e = ha(a) ? a.r : e; const g = this.createElement('rect'); var a = ha(a) ? a : a === s ? {} : { x: a, y: b, width: v(c, 0), height: v(d, 0) }; if (f !== s) { a.strokeWidth = f, a = g.crisp(a) } if (e) { a.r = e }g.rSetter = function (a) { X(this.element, { rx: a, ry: a }) }; return g.attr(a) },
    setSize (a, b, c) {
      const d = this.alignedObjects; let e = d.length
      this.width = a; this.height = b; for (this.boxWrapper[p(c, !0) ? 'animate' : 'attr']({ width: a, height: b }); e--;) { d[e].align() }
    },
    g (a) { const b = this.createElement('g'); return t(a) ? b.attr({ class: 'highcharts-' + a }) : b },
    image (a, b, c, d, e) { let f = { preserveAspectRatio: $ }; arguments.length > 1 && w(f, { x: b, y: c, width: d, height: e }); f = this.createElement('image').attr(f); f.element.setAttributeNS ? f.element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', a) : f.element.setAttribute('hc-svg-href', a); return f },
    symbol (a,
      b, c, d, e, f) {
      let g; var h = this.symbols[a]; var h = h && h(x(b), x(c), d, e, f); const i = /^url\((.*?)\)$/; let k; let j; if (h) { g = this.path(h), w(g, { symbolName: a, x: b, y: c, width: d, height: e }), f && w(g, f) } else if (i.test(a)) {
        j = function (a, b) { a.element && (a.attr({ width: b[0], height: b[1] }), a.alignByTranslate || a.translate(x((d - b[0]) / 2), x((e - b[1]) / 2))) }, k = a.match(i)[1], a = Ub[k] || f && f.width && f.height && [f.width, f.height], g = this.image(k).attr({ x: b, y: c }), g.isImg = !0, a ? j(g, a) : (g.attr({ width: 0, height: 0 }), aa('img', {
          onload () {
            this.width === 0 && (G(this, {
              position: 'absolute',
              top: '-999em'
            }), document.body.appendChild(this)); j(g, Ub[k] = [this.width, this.height]); this.parentNode && this.parentNode.removeChild(this)
          },
          src: k
        }))
      } return g
    },
    symbols: {
      circle (a, b, c, d) { const e = 0.166 * c; return ['M', a + c / 2, b, 'C', a + c + e, b, a + c + e, b + d, a + c / 2, b + d, 'C', a - e, b + d, a - e, b, a + c / 2, b, 'Z'] },
      square (a, b, c, d) { return ['M', a, b, 'L', a + c, b, a + c, b + d, a, b + d, 'Z'] },
      triangle (a, b, c, d) { return ['M', a + c / 2, b, 'L', a + c, b + d, a, b + d, 'Z'] },
      'triangle-down' (a, b, c, d) { return ['M', a, b, 'L', a + c, b, a + c / 2, b + d, 'Z'] },
      diamond (a, b, c, d) { return ['M', a + c / 2, b, 'L', a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, 'Z'] },
      arc (a, b, c, d, e) { const f = e.start; var c = e.r || c || d; var g = e.end - 0.001; var d = e.innerR; const h = e.open; const i = ba(f); const k = ga(f); const j = ba(g); var g = ga(g); var e = e.end - f < ua ? 0 : 1; return ['M', a + c * i, b + c * k, 'A', c, c, 0, e, 1, a + c * j, b + c * g, h ? 'M' : 'L', a + d * j, b + d * g, 'A', d, d, 0, e, 0, a + d * i, b + d * k, h ? '' : 'Z'] },
      callout (a, b, c, d, e) {
        const f = E(e && e.r || 0, c, d); const g = f + 6; const h = e && e.anchorX; var e = e && e.anchorY; let i; i = ['M', a + f, b, 'L', a + c - f, b, 'C', a + c, b, a + c, b, a + c, b + f, 'L', a + c, b + d - f, 'C', a + c, b + d, a + c, b + d, a + c - f,
          b + d, 'L', a + f, b + d, 'C', a, b + d, a, b + d, a, b + d - f, 'L', a, b + f, 'C', a, b, a, b, a + f, b]; h && h > c && e > b + g && e < b + d - g ? i.splice(13, 3, 'L', a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - f) : h && h < 0 && e > b + g && e < b + d - g ? i.splice(33, 3, 'L', a, e + 6, a - 6, e, a, e - 6, a, b + f) : e && e > d && h > a + g && h < a + c - g ? i.splice(23, 3, 'L', h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : e && e < 0 && h > a + g && h < a + c - g && i.splice(3, 3, 'L', h - 6, b, h, b - 6, h + 6, b, c - f, b); return i
      }
    },
    clipRect (a, b, c, d) {
      const e = 'highcharts-' + Hb++; const f = this.createElement('clipPath').attr({ id: e }).add(this.defs); var a = this.rect(a, b, c, d, 0).add(f)
      a.id = e; a.clipPath = f; a.count = 0; return a
    },
    text (a, b, c, d) { const e = ma || !ea && this.forExport; const f = {}; if (d && (this.allowHTML || !this.forExport)) { return this.html(a, b, c) } f.x = Math.round(b || 0); if (c) { f.y = Math.round(c) } if (a || a === 0) { f.text = a }a = this.createElement('text').attr(f); e && a.css({ position: 'absolute' }); if (!d) { a.xSetter = function (a, b, c) { const d = c.getElementsByTagName('tspan'); let e; const f = c.getAttribute(b); let l; for (l = 0; l < d.length; l++) { e = d[l], e.getAttribute(b) === f && e.setAttribute(b, a) }c.setAttribute(b, a) } } return a },
    fontMetrics (a,
      b) { let c; let d; var a = a || this.style.fontSize; !a && b && U.getComputedStyle && (b = b.element || b, a = (c = U.getComputedStyle(b, '')) && c.fontSize); a = /px/.test(a) ? I(a) : /em/.test(a) ? parseFloat(a) * 12 : 12; c = a < 24 ? a + 3 : x(a * 1.2); d = x(c * 0.8); return { h: c, b: d, f: a } },
    rotCorr (a, b, c) { let d = a; b && c && (d = v(d * ba(b * pa), 4)); return { x: -a / 3 * ga(b * pa), y: d } },
    label (a, b, c, d, e, f, g, h, i) {
      function k () {
        let a, b; a = q.element.style; C = (L === void 0 || Ba === void 0 || n.styles.textAlign) && t(q.textStr) && q.getBBox(); n.width = (L || C.width || 0) + 2 * u + p; n.height =
(Ba || C.height || 0) + 2 * u; D = u + l.fontMetrics(a && a.fontSize, q).b; if (A) { if (!r) { a = x(-z * u) + E, b = (h ? -D : 0) + E, n.box = r = d ? l.symbol(d, a, b, n.width, n.height, hb) : l.rect(a, b, n.width, n.height, 0, hb[$b]), r.isImg || r.attr('fill', $), r.add(n) }r.isImg || r.attr(w({ width: x(n.width), height: x(n.height) }, hb)); hb = null }
      } function j () { var a = n.styles; var a = a && a.textAlign; let b = p + u * (1 - z); let c; c = h ? 0 : D; if (t(L) && C && (a === 'center' || a === 'right')) { b += { center: 0.5, right: 1 }[a] * (L - C.width) } if (b !== q.x || c !== q.y) { q.attr('x', b), c !== s && q.attr('y', c) }q.x = b; q.y = c } function m (a,
        b) { r ? r.attr(a, b) : hb[a] = b } var l = this; var n = l.g(i); var q = l.text('', 0, 0, g).attr({ zIndex: 1 }); let r; let C; var z = 0; var u = 3; var p = 0; let L; let Ba; let v; let Jb; var E = 0; var hb = {}; let D; let A; n.onAdd = function () { q.add(n); n.attr({ text: a || a === 0 ? a : '', x: b, y: c }); r && t(e) && n.attr({ anchorX: e, anchorY: f }) }; n.widthSetter = function (a) { L = a }; n.heightSetter = function (a) { Ba = a }; n.paddingSetter = function (a) { if (t(a) && a !== u) { u = n.padding = a, j() } }; n.paddingLeftSetter = function (a) { t(a) && a !== p && (p = a, j()) }; n.alignSetter = function (a) { z = { left: 0, center: 0.5, right: 1 }[a] }; n.textSetter = function (a) {
        a !== s && q.textSetter(a)
        k(); j()
      }; n['stroke-widthSetter'] = function (a, b) { a && (A = !0); E = a % 2 / 2; m(b, a) }; n.strokeSetter = n.fillSetter = n.rSetter = function (a, b) { b === 'fill' && a && (A = !0); m(b, a) }; n.anchorXSetter = function (a, b) { e = a; m(b, x(a) - E - v) }; n.anchorYSetter = function (a, b) { f = a; m(b, a - Jb) }; n.xSetter = function (a) { n.x = a; z && (a -= z * ((L || C.width) + u)); v = x(a); n.attr('translateX', v) }; n.ySetter = function (a) { Jb = n.y = x(a); n.attr('translateY', Jb) }; const F = n.css; return w(n, {
        css (a) {
          if (a) {
            const b = {}; var a = B(a); o(n.textProps, function (c) {
              a[c] !== s && (b[c] = a[c],
              delete a[c])
            }); q.css(b)
          } return F.call(n, a)
        },
        getBBox () { return { width: C.width + 2 * u, height: C.height + 2 * u, x: C.x - u, y: C.y - u } },
        shadow (a) { r && r.shadow(a); return n },
        destroy () { V(n.element, 'mouseenter'); V(n.element, 'mouseleave'); q && (q = q.destroy()); r && (r = r.destroy()); Z.prototype.destroy.call(n); n = l = k = j = m = null }
      })
    }
  }; Va = qa; w(Z.prototype, {
    htmlCss (a) {
      let b = this.element; if (b = a && b.tagName === 'SPAN' && a.width) { delete a.width, this.textWidth = b, this.updateTransform() } if (a && a.textOverflow ===
'ellipsis') { a.whiteSpace = 'nowrap', a.overflow = 'hidden' } this.styles = w(this.styles, a); G(this.element, a); return this
    },
    htmlGetBBox () { const a = this.element; if (a.nodeName === 'text') { a.style.position = 'absolute' } return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } },
    htmlUpdateTransform () {
      if (this.added) {
        const a = this.renderer; const b = this.element; const c = this.translateX || 0; const d = this.translateY || 0; const e = this.x || 0; const f = this.y || 0; const g = this.textAlign || 'left'; const h = { left: 0, center: 0.5, right: 1 }[g]; let i = this.shadows
        const k = this.styles; G(b, { marginLeft: c, marginTop: d }); i && o(i, function (a) { G(a, { marginLeft: c + 1, marginTop: d + 1 }) }); this.inverted && o(b.childNodes, function (c) { a.invertChild(c, b) }); if (b.tagName === 'SPAN') {
          const j = this.rotation; let m; const l = I(this.textWidth); const n = [j, g, b.innerHTML, this.textWidth, this.textAlign].join(','); if (n !== this.cTT) {
            m = a.fontMetrics(b.style.fontSize).b; t(j) && this.setSpanRotation(j, h, m); i = p(this.elemWidth, b.offsetWidth); if (i > l && /[ \-]/.test(b.textContent || b.textContent)) {
              G(b, {
                width: l + 'px',
                display: 'block',
                whiteSpace: k &&
k.whiteSpace || 'normal'
              }), i = l
            } this.getSpanCorrection(i, m, h, j, g)
          }G(b, { left: e + (this.xCorr || 0) + 'px', top: f + (this.yCorr || 0) + 'px' }); if (ob) { m = b.offsetHeight } this.cTT = n
        }
      } else { this.alignOnAdd = !0 }
    },
    setSpanRotation (a, b, c) { const d = {}; const e = ya ? '-ms-transform' : ob ? '-webkit-transform' : Ua ? 'MozTransform' : Tb ? '-o-transform' : ''; d[e] = d.transform = 'rotate(' + a + 'deg)'; d[e + (Ua ? 'Origin' : '-origin')] = d.transformOrigin = b * 100 + '% ' + c + 'px'; G(this.element, d) },
    getSpanCorrection (a, b, c) { this.xCorr = -a * c; this.yCorr = -b }
  }); w(qa.prototype,
    {
      html (a, b, c) {
        const d = this.createElement('span'); const e = d.element; const f = d.renderer; d.textSetter = function (a) { a !== e.innerHTML && delete this.bBox; e.innerHTML = this.textStr = a; d.htmlUpdateTransform() }; d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function (a, b) { b === 'align' && (b = 'textAlign'); d[b] = a; d.htmlUpdateTransform() }; d.attr({ text: a, x: x(b), y: x(c) }).css({ position: 'absolute', fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); e.style.whiteSpace = 'nowrap'; d.css = d.htmlCss; if (f.isSVG) {
          d.add = function (a) {
            let b
            const c = f.box.parentNode; const k = []; if (this.parentGroup = a) {
              if (b = a.div, !b) {
                for (;a;) { k.push(a), a = a.parentGroup }o(k.reverse(), function (a) {
                  let d; let e = X(a.element, 'class'); e && (e = { className: e }); b = a.div = a.div || aa(Ta, e, { position: 'absolute', left: (a.translateX || 0) + 'px', top: (a.translateY || 0) + 'px' }, b || c); d = b.style; w(a, { translateXSetter (b, c) { d.left = b + 'px'; a[c] = b; a.doTransform = !0 }, translateYSetter (b, c) { d.top = b + 'px'; a[c] = b; a.doTransform = !0 } }); o(['opacity', 'visibility'], function (b) {
                    R(a, b + 'Setter', function (a, b,
                      c, e) { a.call(this, b, c, e); d[c] = b })
                  })
                })
              }
            } else { b = c }b.appendChild(e); d.added = !0; d.alignOnAdd && d.htmlUpdateTransform(); return d
          }
        } return d
      }
    }); let ib; if (!ea && !ma) {
    M = {
      init (a, b) { let c = ['<', b, ' filled="f" stroked="f"']; const d = ['position: ', 'absolute', ';']; const e = b === Ta; (b === 'shape' || e) && d.push('left:0;top:0;width:1px;height:1px;'); d.push('visibility: ', e ? 'hidden' : 'visible'); c.push(' style="', d.join(''), '"/>'); if (b) { c = e || b === 'span' || b === 'img' ? c.join('') : a.prepVML(c), this.element = aa(c) } this.renderer = a },
      add (a) {
        const b =
this.renderer; const c = this.element; var d = b.box; var d = a ? a.element || a : d; a && a.inverted && b.invertChild(c, d); d.appendChild(c); this.added = !0; this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(); if (this.onAdd) { this.onAdd() } return this
      },
      updateTransform: Z.prototype.htmlUpdateTransform,
      setSpanRotation () { const a = this.rotation; const b = ba(a * pa); const c = ga(a * pa); G(this.element, { filter: a ? ['progid:DXImageTransform.Microsoft.Matrix(M11=', b, ', M12=', -c, ', M21=', c, ', M22=', b, ", sizingMethod='auto expand')"].join('') : $ }) },
      getSpanCorrection (a, b, c, d, e) { const f = d ? ba(d * pa) : 1; const g = d ? ga(d * pa) : 0; const h = p(this.elemHeight, this.element.offsetHeight); let i; this.xCorr = f < 0 && -a; this.yCorr = g < 0 && -h; i = f * g < 0; this.xCorr += g * b * (i ? 1 - c : c); this.yCorr -= f * b * (d ? i ? c : 1 - c : 1); e && e !== 'left' && (this.xCorr -= a * c * (f < 0 ? -1 : 1), d && (this.yCorr -= h * c * (g < 0 ? -1 : 1)), G(this.element, { textAlign: e })) },
      pathToVML (a) {
        for (var b = a.length, c = []; b--;) {
          if (ra(a[b])) { c[b] = x(a[b] * 10) - 5 } else if (a[b] === 'Z') { c[b] = 'x' } else if (c[b] = a[b], a.isArc && (a[b] === 'wa' || a[b] === 'at')) {
            c[b + 5] ===
c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)
          }
        } return c.join(' ') || 'x'
      },
      clip (a) { const b = this; let c; a ? (c = a.members, ta(c, b), c.push(b), b.destroyClip = function () { ta(c, b) }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = { clip: nb ? 'inherit' : 'rect(auto)' }); return b.css(a) },
      css: Z.prototype.htmlCss,
      safeRemoveChild (a) { a.parentNode && Sa(a) },
      destroy () { this.destroyClip && this.destroyClip(); return Z.prototype.destroy.apply(this) },
      on (a, b) {
        this.element['on' +
a] = function () { const a = U.event; a.target = a.srcElement; b(a) }; return this
      },
      cutOffPath (a, b) { let c; var a = a.split(/[ ,]/); c = a.length; if (c === 9 || c === 11) { a[c - 4] = a[c - 2] = I(a[c - 2]) - 10 * b } return a.join(' ') },
      shadow (a, b, c) {
        const d = []; let e; const f = this.element; const g = this.renderer; let h; const i = f.style; let k; let j = f.path; let m; let l; let n; let q; j && typeof j.value !== 'string' && (j = 'x'); l = j; if (a) {
          n = p(a.width, 3); q = (a.opacity || 0.15) / n; for (e = 1; e <= 3; e++) {
            m = n * 2 + 1 - 2 * e; c && (l = this.cutOffPath(j.value, m + 0.5)); k = ['<shape isShadow="true" strokeweight="', m, '" filled="false" path="',
              l, '" coordsize="10 10" style="', f.style.cssText, '" />']; h = aa(g.prepVML(k), null, { left: I(i.left) + p(a.offsetX, 1), top: I(i.top) + p(a.offsetY, 1) }); if (c) { h.cutOff = m + 1 }k = ['<stroke color="', a.color || 'black', '" opacity="', q * e, '"/>']; aa(g.prepVML(k), null, null, h); b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f); d.push(h)
          } this.shadows = d
        } return this
      },
      updateShadows: ka,
      setAttr (a, b) { nb ? this.element[a] = b : this.element.setAttribute(a, b) },
      classSetter (a) { this.element.className = a },
      dashstyleSetter (a,
        b, c) { (c.getElementsByTagName('stroke')[0] || aa(this.renderer.prepVML(['<stroke/>']), null, null, c))[b] = a || 'solid'; this[b] = a },
      dSetter (a, b, c) { const d = this.shadows; var a = a || []; this.d = a.join && a.join(' '); c.path = a = this.pathToVML(a); if (d) { for (c = d.length; c--;) { d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a } } this.setAttr(b, a) },
      fillSetter (a, b, c) { const d = c.nodeName; if (d === 'SPAN') { c.style.color = a } else if (d !== 'IMG') { c.filled = a !== $, this.setAttr('fillcolor', this.renderer.color(a, c, b, this)) } },
      opacitySetter: ka,
      rotationSetter (a, b, c) { c = c.style; this[b] = c[b] = a; c.left = -x(ga(a * pa) + 1) + 'px'; c.top = x(ba(a * pa)) + 'px' },
      strokeSetter (a, b, c) { this.setAttr('strokecolor', this.renderer.color(a, c, b)) },
      'stroke-widthSetter' (a, b, c) { c.stroked = !!a; this[b] = a; ra(a) && (a += 'px'); this.setAttr('strokeweight', a) },
      titleSetter (a, b) { this.setAttr(b, a) },
      visibilitySetter (a, b, c) {
        a === 'inherit' && (a = 'visible'); this.shadows && o(this.shadows, function (c) { c.style[b] = a }); c.nodeName === 'DIV' && (a = a === 'hidden'
          ? '-999em' : 0, nb || (c.style[b] = a ? 'visible' : 'hidden'), b = 'top'); c.style[b] = a
      },
      xSetter (a, b, c) { this[b] = a; b === 'x' ? b = 'left' : b === 'y' && (b = 'top'); this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a },
      zIndexSetter (a, b, c) { c.style[b] = a }
    }, D.VMLElement = M = ia(Z, M), M.prototype.ySetter = M.prototype.widthSetter = M.prototype.heightSetter = M.prototype.xSetter, M = {
      Element: M,
      isIE8: Ga.includes('MSIE 8.0'),
      init (a, b, c, d) {
        let e; this.alignedObjects = []; d = this.createElement(Ta).css(w(this.getStyle(d),
          { position: 'relative' })); e = d.element; a.appendChild(d.element); this.isVML = !0; this.box = e; this.boxWrapper = d; this.cache = {}; this.setSize(b, c, !1); if (!F.namespaces.hcv) { F.namespaces.add('hcv', 'urn:schemas-microsoft-com:vml'); try { F.createStyleSheet().cssText = 'hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ' } catch (f) { F.styleSheets[0].cssText += 'hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ' } }
      },
      isHidden () { return !this.box.offsetWidth },
      clipRect (a, b, c, d) {
        const e = this.createElement(); const f = ha(a); return w(e, {
          members: [],
          count: 0,
          left: (f ? a.x : a) + 1,
          top: (f ? a.y : b) + 1,
          width: (f ? a.width : c) - 1,
          height: (f ? a.height : d) - 1,
          getCSS (a) { var b = a.element; const c = b.nodeName; var a = a.inverted; var d = this.top - (c === 'shape' ? b.offsetTop : 0); const e = this.left; var b = e + this.width; const f = d + this.height; var d = { clip: 'rect(' + x(a ? e : d) + 'px,' + x(a ? f : b) + 'px,' + x(a ? b : f) + 'px,' + x(a ? d : e) + 'px)' }; !a && nb && c === 'DIV' && w(d, { width: b + 'px', height: f + 'px' }); return d },
          updateClipping () { o(e.members, function (a) { a.element && a.css(e.getCSS(a)) }) }
        })
      },
      color (a, b, c, d) {
        const e = this; let f; const g = /^rgba/; let h; let i; var k = $; a && a.linearGradient ? i = 'gradient' : a && a.radialGradient && (i = 'pattern'); if (i) {
          let j; let m; let l = a.linearGradient || a.radialGradient; let n; let q; let r; let C; let p; let u = ''; var a = a.stops; let y; const L = []; const Ba = function () { h = ['<fill colors="' + L.join(',') + '" opacity="', r, '" o:opacity2="', q, '" type="', i, '" ', u, 'focus="100%" method="any" />']; aa(e.prepVML(h), null, null, b) }; n = a[0]; y = a[a.length - 1]; n[0] > 0 && a.unshift([0, n[1]])
          y[0] < 1 && a.push([1, y[1]]); o(a, function (a, b) { g.test(a[1]) ? (f = va(a[1]), j = f.get('rgb'), m = f.get('a')) : (j = a[1], m = 1); L.push(a[0] * 100 + '% ' + j); b ? (r = m, C = j) : (q = m, p = j) }); if (c === 'fill') {
            if (i === 'gradient') { c = l.x1 || l[0] || 0, a = l.y1 || l[1] || 0, n = l.x2 || l[2] || 0, l = l.y2 || l[3] || 0, u = 'angle="' + (90 - Y.atan((l - a) / (n - c)) * 180 / ua) + '"', Ba() } else {
              var k = l.r; let s = k * 2; let t = k * 2; let v = l.cx; let x = l.cy; const w = b.radialReference; let B; var k = function () {
                w && (B = d.getBBox(), v += (w[0] - B.x) / B.width - 0.5, x += (w[1] - B.y) / B.height - 0.5, s *= w[2] / B.width, t *= w[2] / B.height); u = 'src="' + N.global.VMLRadialGradientURL +
'" size="' + s + ',' + t + '" origin="0.5,0.5" position="' + v + ',' + x + '" color2="' + p + '" '; Ba()
              }; d.added ? k() : d.onAdd = k; k = C
            }
          } else { k = j }
        } else if (g.test(a) && b.tagName !== 'IMG') { f = va(a), h = ['<', c, ' opacity="', f.get('a'), '"/>'], aa(this.prepVML(h), null, null, b), k = f.get('rgb') } else { k = b.getElementsByTagName(c); if (k.length) { k[0].opacity = 1, k[0].type = 'solid' }k = a } return k
      },
      prepVML (a) {
        const b = this.isIE8; var a = a.join(''); b ? (a = a.replace('/>', ' xmlns="urn:schemas-microsoft-com:vml" />'), a = !a.includes('style="') ? a.replace('/>',
          ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace('<', '<hcv:'); return a
      },
      text: qa.prototype.html,
      path (a) { const b = { coordsize: '10 10' }; Ja(a) ? b.d = a : ha(a) && w(b, a); return this.createElement('shape').attr(b) },
      circle (a, b, c) { const d = this.symbol('circle'); if (ha(a)) { c = a.r, b = a.y, a = a.x }d.isCircle = !0; d.r = c; return d.attr({ x: a, y: b }) },
      g (a) {
        let b; a && (b = {
          className: 'highcharts-' + a,
          class: 'highcharts-' +
a
        }); return this.createElement(Ta).attr(b)
      },
      image (a, b, c, d, e) { const f = this.createElement('img').attr({ src: a }); arguments.length > 1 && f.attr({ x: b, y: c, width: d, height: e }); return f },
      createElement (a) { return a === 'rect' ? this.symbol(a) : qa.prototype.createElement.call(this, a) },
      invertChild (a, b) { const c = this; const d = b.style; const e = a.tagName === 'IMG' && a.style; G(a, { flip: 'x', left: I(d.width) - (e ? I(e.top) : 1), top: I(d.height) - (e ? I(e.left) : 1), rotation: -90 }); o(a.childNodes, function (b) { c.invertChild(b, a) }) },
      symbols: {
        arc (a,
          b, c, d, e) { let f = e.start; const g = e.end; const h = e.r || c || d; var c = e.innerR; var d = ba(f); const i = ga(f); const k = ba(g); const j = ga(g); if (g - f === 0) { return ['x'] } f = ['wa', a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * k, b + h * j]; e.open && !c && f.push('e', 'M', a, b); f.push('at', a - c, b - c, a + c, b + c, a + c * k, b + c * j, a + c * d, b + c * i, 'x', 'e'); f.isArc = !0; return f },
        circle (a, b, c, d, e) { e && (c = d = 2 * e.r); e && e.isCircle && (a -= c / 2, b -= d / 2); return ['wa', a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, 'e'] },
        rect (a, b, c, d, e) { return qa.prototype.symbols[!t(e) || !e.r ? 'square' : 'callout'].call(0, a, b, c, d, e) }
      }
    },
    D.VMLRenderer = ib = function () { this.init.apply(this, arguments) }, ib.prototype = B(qa.prototype, M), Va = ib
  }qa.prototype.measureSpanWidth = function (a, b) { const c = F.createElement('span'); let d; d = F.createTextNode(a); c.appendChild(d); G(c, b); this.box.appendChild(c); d = c.offsetWidth; Sa(c); return d }; let Vb; if (ma) {
    D.CanVGRenderer = M = function () { Na = 'http://www.w3.org/1999/xhtml' }, M.prototype.symbols = {}, Vb = (function () {
      function a () { const a = b.length; let d; for (d = 0; d < a; d++) { b[d]() }b = [] } var b = []; return {
        push (c, d) {
          b.length === 0 && ac(d,
            a); b.push(c)
        }
      }
    }()), Va = M
  }Ya.prototype = {
    addLabel () {
      const a = this.axis; let b = a.options; const c = a.chart; var d = a.categories; var e = a.names; const f = this.pos; const g = b.labels; var h = a.tickPositions; const i = f === h[0]; const k = f === h[h.length - 1]; var e = d ? p(d[f], e[f], f) : f; var d = this.label; var h = h.info; let j; a.isDatetimeAxis && h && (j = b.dateTimeLabelFormats[h.higherRanks[f] || h.unitName]); this.isFirst = i; this.isLast = k; b = a.labelFormatter.call({ axis: a, chart: c, isFirst: i, isLast: k, dateTimeLabelFormat: j, value: a.isLog ? la(sa(e)) : e }); t(d) ? d && d.attr({ text: b }) : (this.labelLength = (this.label =
d = t(b) && g.enabled ? c.renderer.text(b, 0, 0, g.useHTML).css(B(g.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
    },
    getLabelSize () { return this.label ? this.label.getBBox()[this.axis.horiz ? 'height' : 'width'] : 0 },
    handleOverflow (a) {
      const b = this.axis; const c = a.x; let d = b.chart.chartWidth; var e = b.chart.spacing; const f = p(b.labelLeft, E(b.pos, e[3])); var e = p(b.labelRight, v(b.pos + b.len, d - e[1])); const g = this.label; const h = this.rotation; const i = { left: 0, center: 0.5, right: 1 }[b.labelAlign]; const k = g.getBBox().width; let j = b.slotWidth; let m = 1; let l; const n =
{}; if (h) { h < 0 && c - i * k < f ? l = x(c / ba(h * pa) - f) : h > 0 && c + i * k > e && (l = x((d - c) / ba(h * pa))) } else if (d = c + (1 - i) * k, c - i * k < f ? j = a.x + j * (1 - i) - f : d > e && (j = e - a.x + j * i, m = -1), j = E(b.slotWidth, j), j < b.slotWidth && b.labelAlign === 'center' && (a.x += m * (b.slotWidth - j - i * (b.slotWidth - E(k, j)))), k > j || b.autoRotation && g.styles.width) { l = j } if (l) { n.width = l; if (!b.options.labels.style.textOverflow) { n.textOverflow = 'ellipsis' }g.css(n) }
    },
    getPosition (a, b, c, d) {
      const e = this.axis; const f = e.chart; const g = d && f.oldChartHeight || f.chartHeight; return {
        x: a ? e.translate(b +
c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
        y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
      }
    },
    getLabelPosition (a, b, c, d, e, f, g, h) { const i = this.axis; const k = i.transA; const j = i.reversed; const m = i.staggerLines; const l = i.tickRotCorr || { x: 0, y: 0 }; var c = p(e.y, l.y + (i.side === 2 ? 8 : -(c.getBBox().height / 2))); var a = a + e.x + l.x - (f && d ? f * k * (j ? -1 : 1) : 0); var b = b + c - (f && !d ? f * k * (j ? 1 : -1) : 0); m && (b += g / (h || 1) % m * (i.labelOffset / m)); return { x: a, y: x(b) } },
    getMarkPath (a,
      b, c, d, e, f) { return f.crispLine(['M', a, b, 'L', a + (e ? 0 : -c), b + (e ? c : 0)], d) },
    render (a, b, c) {
      const d = this.axis; const e = d.options; const f = d.chart.renderer; const g = d.horiz; let h = this.type; const i = this.label; let k = this.pos; const j = e.labels; let m = this.gridLine; var l = h ? h + 'Grid' : 'grid'; var n = h ? h + 'Tick' : 'tick'; const q = e[l + 'LineWidth']; const r = e[l + 'LineColor']; const C = e[l + 'LineDashStyle']; let z = e[n + 'Length']; var l = p(e[n + 'Width'], !h && d.isXAxis ? 1 : 0); const u = e[n + 'Color']; const o = e[n + 'Position']; var n = this.mark; const L = j.step; let Ba = !0; const t = d.tickmarkOffset; var v = this.getPosition(g, k, t, b); const x = v.x; var v = v.y; const w = g && x === d.pos + d.len ||
!g && v === d.pos ? -1 : 1; var c = p(c, 1); this.isActive = !0; if (q) { k = d.getPlotLinePath(k + t, q * w, b, !0); if (m === s) { m = { stroke: r, 'stroke-width': q }; if (C) { m.dashstyle = C } if (!h) { m.zIndex = 1 } if (b) { m.opacity = 0 } this.gridLine = m = q ? f.path(k).attr(m).add(d.gridGroup) : null } if (!b && m && k) { m[this.isNew ? 'attr' : 'animate']({ d: k, opacity: c }) } } if (l && z) { o === 'inside' && (z = -z), d.opposite && (z = -z), h = this.getMarkPath(x, v, z, l * w, g, f), n ? n.animate({ d: h, opacity: c }) : this.mark = f.path(h).attr({ stroke: u, 'stroke-width': l, opacity: c }).add(d.axisGroup) } if (i && !isNaN(x)) {
        i.xy =
v = this.getLabelPosition(x, v, i, g, j, t, a, L), this.isFirst && !this.isLast && !p(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(e.showLastLabel, 1) ? Ba = !1 : g && !d.isRadial && !j.step && !j.rotation && !b && c !== 0 && this.handleOverflow(v), L && a % L && (Ba = !1), Ba && !isNaN(v.y) ? (v.opacity = c, i[this.isNew ? 'attr' : 'animate'](v), this.isNew = !1) : i.attr('y', -9999)
      }
    },
    destroy () { Ma(this, this.axis) }
  }; D.PlotLineOrBand = function (a, b) { this.axis = a; if (b) { this.options = b, this.id = b.id } }; D.PlotLineOrBand.prototype = {
    render () {
      const a =
this; let b = a.axis; let c = b.horiz; let d = a.options; let e = d.label; let f = a.label; const g = d.width; let h = d.to; let i = d.from; let k = t(i) && t(h); let j = d.value; const m = d.dashStyle; let l = a.svgElem; let n = []; let q; const r = d.color; const C = d.zIndex; const p = d.events; let u = {}; const o = b.chart.renderer; b.isLog && (i = Ka(i), h = Ka(h), j = Ka(j)); if (g) { if (n = b.getPlotLinePath(j, g), u = { stroke: r, 'stroke-width': g }, m) { u.dashstyle = m } } else if (k) { n = b.getPlotBandPath(i, h, d); if (r) { u.fill = r } if (d.borderWidth) { u.stroke = d.borderColor, u['stroke-width'] = d.borderWidth } } else { return } if (t(C)) { u.zIndex = C } if (l) {
        if (n) { l.animate({ d: n }, null, l.onGetPath) } else if (l.hide(), l.onGetPath = function () { l.show() }, f) { a.label = f = f.destroy() }
      } else if (n && n.length && (a.svgElem = l = o.path(n).attr(u).add(), p)) { for (q in d = function (b) { l.on(b, function (c) { p[b].apply(a, [c]) }) }, p) { d(q) } } if (e && t(e.text) && n && n.length && b.width > 0 && b.height > 0) {
        e = B({ align: c && k && 'center', x: c ? !k && 4 : 10, verticalAlign: !c && k && 'middle', y: c ? k ? 16 : 10 : k ? 6 : -4, rotation: c && !k && 90 }, e); if (!f) { u = { align: e.textAlign || e.align, rotation: e.rotation }; if (t(C)) { u.zIndex = C }a.label = f = o.text(e.text, 0, 0, e.useHTML).attr(u).css(e.style).add() }b =
[n[1], n[4], k ? n[6] : n[1]]; k = [n[2], n[5], k ? n[7] : n[2]]; n = Ra(b); c = Ra(k); f.align(e, !1, { x: n, y: c, width: Fa(b) - n, height: Fa(k) - c }); f.show()
      } else { f && f.hide() } return a
    },
    destroy () { ta(this.axis.plotLinesAndBands, this); delete this.axis; Ma(this) }
  }; const H = D.Axis = function () { this.init.apply(this, arguments) }; H.prototype = {
    defaultOptions: {
      dateTimeLabelFormats: { millisecond: '%H:%M:%S.%L', second: '%H:%M:%S', minute: '%H:%M', hour: '%H:%M', day: '%e. %b', week: '%e. %b', month: "%b '%y", year: '%Y' },
      endOnTick: !1,
      gridLineColor: '#D8D8D8',
      labels: { enabled: !0, style: { color: '#606060', cursor: 'default', fontSize: '11px' }, x: 0, y: 15 },
      lineColor: '#C0D0E0',
      lineWidth: 1,
      minPadding: 0.01,
      maxPadding: 0.01,
      minorGridLineColor: '#E0E0E0',
      minorGridLineWidth: 1,
      minorTickColor: '#A0A0A0',
      minorTickLength: 2,
      minorTickPosition: 'outside',
      startOfWeek: 1,
      startOnTick: !1,
      tickColor: '#C0D0E0',
      tickLength: 10,
      tickmarkPlacement: 'between',
      tickPixelInterval: 100,
      tickPosition: 'outside',
      title: { align: 'middle', style: { color: '#707070' } },
      type: 'linear'
    },
    defaultYAxisOptions: {
      endOnTick: !0,
      gridLineWidth: 1,
      tickPixelInterval: 72,
      showLastLabel: !0,
      labels: { x: -8, y: 3 },
      lineWidth: 0,
      maxPadding: 0.05,
      minPadding: 0.05,
      startOnTick: !0,
      title: { rotation: 270, text: 'Values' },
      stackLabels: { enabled: !1, formatter () { return D.numberFormat(this.total, -1) }, style: B(W.line.dataLabels.style, { color: '#000000' }) }
    },
    defaultLeftAxisOptions: { labels: { x: -15, y: null }, title: { rotation: 270 } },
    defaultRightAxisOptions: { labels: { x: 15, y: null }, title: { rotation: 90 } },
    defaultBottomAxisOptions: {
      labels: { autoRotation: [-45], x: 0, y: null },
      title: { rotation: 0 }
    },
    defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0, y: -15 }, title: { rotation: 0 } },
    init (a, b) {
      const c = b.isX; this.chart = a; this.horiz = a.inverted ? !c : c; this.coll = (this.isXAxis = c) ? 'xAxis' : 'yAxis'; this.opposite = b.opposite; this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3); this.setOptions(b); var d = this.options; const e = d.type; this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter; this.userOptions = b; this.minPixelPadding = 0; this.reversed = d.reversed; this.visible =
d.visible !== !1; this.zoomEnabled = d.zoomEnabled !== !1; this.categories = d.categories || e === 'category'; this.names = this.names || []; this.isLog = e === 'logarithmic'; this.isDatetimeAxis = e === 'datetime'; this.isLinked = t(d.linkedTo); this.ticks = {}; this.labelEdge = []; this.minorTicks = {}; this.plotLinesAndBands = []; this.alternateBands = {}; this.len = 0; this.minRange = this.userMinRange = d.minRange || d.maxZoom; this.range = d.range; this.offset = d.offset || 0; this.stacks = {}; this.oldStacks = {}; this.stacksTouched = 0; this.min = this.max = null; this.crosshair =
p(d.crosshair, na(a.options.tooltip.crosshairs)[c ? 0 : 1], !1); let f; var d = this.options.events; Oa(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this)); this.series = this.series || []; if (a.inverted && c && this.reversed === s) { this.reversed = !0 } this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine; for (f in d) { A(this, f, d[f]) } if (this.isLog) { this.val2lin = Ka, this.lin2val = sa }
    },
    setOptions (a) {
      this.options = B(this.defaultOptions, this.isXAxis
        ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], B(N[this.coll], a))
    },
    defaultLabelFormatter () {
      var a = this.axis; const b = this.value; let c = a.categories; const d = this.dateTimeLabelFormat; const e = N.lang.numericSymbols; let f = e && e.length; let g; const h = a.options.labels.format; var a = a.isLog ? b : a.tickInterval; if (h) { g = La(h, this) } else if (c) { g = b } else if (d) { g = ja(d, b) } else if (f && a >= 1e3) {
        for (;f-- && g === s;) {
          c = 1e3 ** (f + 1), a >= c && b * 10 % c === 0 && e[f] !==
null && (g = D.numberFormat(b / c, -1) + e[f])
        }
      }g === s && (g = Q(b) >= 1e4 ? D.numberFormat(b, -1) : D.numberFormat(b, -1, s, '')); return g
    },
    getSeriesExtremes () {
      const a = this; const b = a.chart; a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.threshold = null; a.softThreshold = !a.isXAxis; a.buildStacks && a.buildStacks(); o(a.series, function (c) {
        if (c.visible || !b.options.chart.ignoreHiddenSeries) {
          let d = c.options; let e = d.threshold; let f; a.hasVisibleSeries = !0; a.isLog && e <= 0 && (e = null); if (a.isXAxis) {
            if (d = c.xData, d.length) {
              a.dataMin = E(p(a.dataMin, d[0]),
                Ra(d)), a.dataMax = v(p(a.dataMax, d[0]), Fa(d))
            }
          } else { c.getExtremes(); f = c.dataMax; c = c.dataMin; if (t(c) && t(f)) { a.dataMin = E(p(a.dataMin, c), c), a.dataMax = v(p(a.dataMax, f), f) } if (t(e)) { a.threshold = e } if (!d.softThreshold || a.isLog) { a.softThreshold = !1 } }
        }
      })
    },
    translate (a, b, c, d, e, f) {
      const g = this.linkedParent || this; let h = 1; let i = 0; let k = d ? g.oldTransA : g.transA; var d = d ? g.oldMin : g.min; const j = g.minPixelPadding; var e = (g.doPostTranslate || g.isLog && e) && g.lin2val; if (!k) { k = g.transA } if (c) { h *= -1, i = g.len }g.reversed && (h *= -1, i -= h * (g.sector || g.len)); b ? (a =
a * h + i, a -= j, a = a / k + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), f === 'between' && (f = 0.5), a = h * (a - d) * k + i + h * j + (ra(f) ? k * f * g.pointRange : 0)); return a
    },
    toPixels (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) },
    toValue (a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) },
    getPlotLinePath (a, b, c, d, e) {
      const f = this.chart; const g = this.left; const h = this.top; let i; let k; const j = c && f.oldChartHeight || f.chartHeight; const m = c && f.oldChartWidth || f.chartWidth; let l; i = this.transB; const n = function (a, b, c) {
        if (a <
b || a > c) { d ? a = E(v(b, a), c) : l = !0 } return a
      }; var e = p(e, this.translate(a, null, null, c)); var a = c = x(e + i); i = k = x(j - e - i); isNaN(e) ? l = !0 : this.horiz ? (i = h, k = j - this.bottom, a = c = n(a, g, g + this.width)) : (a = g, c = m - this.right, i = k = n(i, h, h + this.height)); return l && !d ? null : f.renderer.crispLine(['M', a, i, 'L', c, k], b || 1)
    },
    getLinearTickPositions (a, b, c) { let d; const e = la(T(b / a) * a); const f = la(za(c / a) * a); const g = []; if (b === c && ra(b)) { return [b] } for (b = e; b <= f;) { g.push(b); b = la(b + a); if (b === d) { break } d = b } return g },
    getMinorTickPositions () {
      const a = this.options
      let b = this.tickPositions; const c = this.minorTickInterval; let d = []; let e; var f = this.pointRangePadding || 0; e = this.min - f; var f = this.max + f; const g = f - e; if (g && g / c < this.len / 3) { if (this.isLog) { f = b.length; for (e = 1; e < f; e++) { d = d.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0)) } } else if (this.isDatetimeAxis && a.minorTickInterval === 'auto') { d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, f, a.startOfWeek)) } else { for (b = e + (b[0] - e) % c; b <= f; b += c) { d.push(b) } } }d.length !== 0 && this.trimTicks(d, a.startOnTick, a.endOnTick); return d
    },
    adjustForMinRange () {
      const a =
this.options; let b = this.min; let c = this.max; let d; const e = this.dataMax - this.dataMin >= this.minRange; let f; let g; let h; let i; let k; let j; if (this.isXAxis && this.minRange === s && !this.isLog) { t(a.min) || t(a.max) ? this.minRange = null : (o(this.series, function (a) { i = a.xData; for (g = k = a.xIncrement ? 1 : i.length - 1; g > 0; g--) { if (h = i[g] - i[g - 1], f === s || h < f) { f = h } } }), this.minRange = E(f * 5, this.dataMax - this.dataMin)) } if (c - b < this.minRange) {
        j = this.minRange; d = (j - c + b) / 2; d = [b - d, p(a.min, b - d)]; if (e) { d[2] = this.dataMin }b = Fa(d); c = [b + j, p(a.max, b + j)]; if (e) { c[2] = this.dataMax }c = Ra(c); c - b < j && (d[0] =
c - j, d[1] = p(a.min, c - j), b = Fa(d))
      } this.min = b; this.max = c
    },
    setAxisTranslation (a) {
      const b = this; const c = b.max - b.min; let d = b.axisPointRange || 0; let e; let f = 0; let g = 0; let h = b.linkedParent; const i = !!b.categories; let k = b.transA; const j = b.isXAxis; if (j || i || d) {
        if (h ? (f = h.minPointOffset, g = h.pointRangePadding) : o(b.series, function (a) { const c = i ? 1 : j ? a.pointRange : b.axisPointRange || 0; const h = a.options.pointPlacement; const k = a.closestPointRange; d = v(d, c); b.single || (f = v(f, Ia(h) ? 0 : c / 2), g = v(g, h === 'on' ? 0 : c)); !a.noSharedTooltip && t(k) && (e = t(e) ? E(e, k) : k) }), h = b.ordinalSlope && e
          ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = E(d, c), j) { b.closestPointRange = e }
      } if (a) { b.oldTransA = k }b.translationSlope = b.transA = k = b.len / (c + g || 1); b.transB = b.horiz ? b.left : b.bottom; b.minPixelPadding = k * f
    },
    minFromRange () { return this.max - this.range },
    setTickInterval (a) {
      const b = this; let c = b.chart; const d = b.options; const e = b.isLog; const f = b.isDatetimeAxis; const g = b.isXAxis; const h = b.isLinked; let i = d.maxPadding; let k = d.minPadding; let j = d.tickInterval; const m = d.tickPixelInterval; const l = b.categories; let n = b.threshold; const q = b.softThreshold
      let r; let C; let z; let u; !f && !l && !h && this.getTickAmount(); z = p(b.userMin, d.min); u = p(b.userMax, d.max); h ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = p(c.min, c.dataMin), b.max = p(c.max, c.dataMax), d.type !== b.linkedParent.options.type && oa(11, 1)) : (!q && t(n) && (b.dataMin >= n ? (r = n, k = 0) : b.dataMax <= n && (C = n, i = 0)), b.min = p(z, r, b.dataMin), b.max = p(u, C, b.dataMax)); if (e) { !a && E(b.min, p(b.dataMin, b.min)) <= 0 && oa(10, 1), b.min = la(Ka(b.min), 15), b.max = la(Ka(b.max), 15) } if (b.range && t(b.max)) {
        b.userMin = b.min = z = v(b.min,
          b.minFromRange()), b.userMax = u = b.max, b.range = null
      }b.beforePadding && b.beforePadding(); b.adjustForMinRange(); if (!l && !b.axisPointRange && !b.usePercentage && !h && t(b.min) && t(b.max) && (c = b.max - b.min)) { !t(z) && k && (b.min -= c * k), !t(u) && i && (b.max += c * i) } if (ra(d.floor)) { b.min = v(b.min, d.floor) } if (ra(d.ceiling)) { b.max = E(b.max, d.ceiling) } if (q && t(b.dataMin)) { if (n = n || 0, !t(z) && b.min < n && b.dataMin >= n) { b.min = n } else if (!t(u) && b.max > n && b.dataMax <= n) { b.max = n } } b.tickInterval = b.min === b.max || b.min === void 0 || b.max === void 0 ? 1 : h && !j && m ===
b.linkedParent.options.tickPixelInterval ? j = b.linkedParent.tickInterval : p(j, this.tickAmount ? (b.max - b.min) / v(this.tickAmount - 1, 1) : void 0, l ? 1 : (b.max - b.min) * m / v(b.len, m)); g && !a && o(b.series, function (a) { a.processData(b.min !== b.oldMin || b.max !== b.oldMax) }); b.setAxisTranslation(!0); b.beforeSetTickPositions && b.beforeSetTickPositions(); if (b.postProcessTickInterval) { b.tickInterval = b.postProcessTickInterval(b.tickInterval) } if (b.pointRange) { b.tickInterval = v(b.pointRange, b.tickInterval) }a = p(d.minTickInterval, b.isDatetimeAxis &&
b.closestPointRange); if (!j && b.tickInterval < a) { b.tickInterval = a } if (!f && !e && !j) { b.tickInterval = xb(b.tickInterval, null, wb(b.tickInterval), p(d.allowDecimals, !(b.tickInterval > 0.5 && b.tickInterval < 5 && b.max > 1e3 && b.max < 9999)), !!this.tickAmount) } if (!this.tickAmount && this.len) { b.tickInterval = b.unsquish() } this.setTickPositions()
    },
    setTickPositions () {
      const a = this.options; let b; const c = a.tickPositions; let d = a.tickPositioner; const e = a.startOnTick; const f = a.endOnTick; let g; this.tickmarkOffset = this.categories && a.tickmarkPlacement === 'between' &&
this.tickInterval === 1 ? 0.5 : 0; this.minorTickInterval = a.minorTickInterval === 'auto' && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval; this.tickPositions = b = c && c.slice(); if (!b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length >
this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max])))) { this.tickPositions = b = d } if (!this.isLinked) { this.trimTicks(b, e, f), this.min === this.max && t(this.min) && !this.tickAmount && (g = !0, this.min -= 0.5, this.max += 0.5), this.single = g, !c && !d && this.adjustTickAmount() }
    },
    trimTicks (a, b, c) { const d = a[0]; const e = a[a.length - 1]; const f = this.minPointOffset || 0; b ? this.min = d : this.min - f > d && a.shift(); c ? this.max = e : this.max + f < e && a.pop(); a.length === 0 && t(d) && a.push((e + d) / 2) },
    getTickAmount () {
      const a =
{}; let b; const c = this.options; let d = c.tickAmount; const e = c.tickPixelInterval; !t(c.tickInterval) && this.len < e && !this.isRadial && !this.isLog && c.startOnTick && c.endOnTick && (d = 2); !d && this.chart.options.chart.alignTicks !== !1 && c.alignTicks !== !1 && (o(this.chart[this.coll], function (c) { var d = c.options; const e = c.horiz; var d = [e ? d.left : d.top, e ? d.width : d.height, d.pane].join(','); c.series.length && (a[d] ? b = !0 : a[d] = 1) }), b && (d = za(this.len / e) + 1)); if (d < 4) { this.finalTickAmt = d, d = 5 } this.tickAmount = d
    },
    adjustTickAmount () {
      let a = this.tickInterval; const b =
this.tickPositions; let c = this.tickAmount; const d = this.finalTickAmt; const e = b && b.length; if (e < c) { for (;b.length < c;) { b.push(la(b[b.length - 1] + a)) } this.transA *= (e - 1) / (c - 1); this.max = b[b.length - 1] } else { e > c && (this.tickInterval *= 2, this.setTickPositions()) } if (t(d)) { for (a = c = b.length; a--;) { (d === 3 && a % 2 === 1 || d <= 2 && a > 0 && a < c - 1) && b.splice(a, 1) } this.finalTickAmt = s }
    },
    setScale () {
      let a, b; this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize(); b = this.len !== this.oldAxisLength; o(this.series, function (b) {
        if (b.isDirtyData ||
b.isDirty || b.xAxis.isDirty) { a = !0 }
      }); if (b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) { if (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, !this.isDirty) { this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax } } else { this.cleanStacks && this.cleanStacks() }
    },
    setExtremes (a, b, c, d, e) {
      const f = this; const g = f.chart; var c = p(c, !0); o(f.series, function (a) { delete a.kdTree })
      e = w(e, { min: a, max: b }); O(f, 'setExtremes', e, function () { f.userMin = a; f.userMax = b; f.eventArgs = e; c && g.redraw(d) })
    },
    zoom (a, b) { const c = this.dataMin; const d = this.dataMax; var e = this.options; const f = E(c, p(e.min, c)); var e = v(d, p(e.max, d)); this.allowZoomOutside || (t(c) && a <= f && (a = f), t(d) && b >= e && (b = e)); this.displayBtn = a !== s || b !== s; this.setExtremes(a, b, !1, s, { trigger: 'zoom' }); return !0 },
    setAxisSize () {
      const a = this.chart; var b = this.options; var c = b.offsetLeft || 0; const d = this.horiz; const e = p(b.width, a.plotWidth - c + (b.offsetRight || 0)); let f = p(b.height,
        a.plotHeight); let g = p(b.top, a.plotTop); var b = p(b.left, a.plotLeft + c); var c = /%$/; c.test(f) && (f = parseFloat(f) / 100 * a.plotHeight); c.test(g) && (g = parseFloat(g) / 100 * a.plotHeight + a.plotTop); this.left = b; this.top = g; this.width = e; this.height = f; this.bottom = a.chartHeight - f - g; this.right = a.chartWidth - e - b; this.len = v(d ? e : f, 0); this.pos = d ? b : g
    },
    getExtremes () { const a = this.isLog; return { min: a ? la(sa(this.min)) : this.min, max: a ? la(sa(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } },
    getThreshold (a) { var b = this.isLog; const c = b ? sa(this.min) : this.min; var b = b ? sa(this.max) : this.max; a === null ? a = b < 0 ? b : c : c > a ? a = c : b < a && (a = b); return this.translate(a, 0, 1, 0, 1) },
    autoLabelAlign (a) { a = (p(a, 0) - this.side * 90 + 720) % 360; return a > 15 && a < 165 ? 'right' : a > 195 && a < 345 ? 'left' : 'center' },
    unsquish () {
      const a = this.ticks; const b = this.options.labels; const c = this.horiz; const d = this.tickInterval; let e = d; const f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d); let g; const h = b.rotation; const i = this.chart.renderer.fontMetrics(b.style.fontSize,
        a[0] && a[0].label); let k; let j = Number.MAX_VALUE; let m; const l = function (a) { a /= f || 1; a = a > 1 ? za(a) : 1; return a * d }; c ? (m = !b.staggerLines && !b.step && (t(h) ? [h] : f < p(b.autoRotationLimit, 80) && b.autoRotation)) && o(m, function (a) { let b; if (a === h || a && a >= -90 && a <= 90) { k = l(Q(i.h / ga(pa * a))), b = k + Q(a / 360), b < j && (j = b, g = a, e = k) } }) : b.step || (e = l(i.h)); this.autoRotation = m; this.labelRotation = p(g, h); return e
    },
    renderUnsquish () {
      const a = this.chart; const b = a.renderer; const c = this.tickPositions; const d = this.ticks; const e = this.options.labels; const f = this.horiz; var g = a.margin; var h = this.categories
        ? c.length : c.length - 1; let i = this.slotWidth = f && !e.step && !e.rotation && (this.staggerLines || 1) * a.plotWidth / h || !f && (g[3] && g[3] - a.spacing[3] || a.chartWidth * 0.33); let k = v(1, x(i - 2 * (e.padding || 5))); const j = {}; var g = b.fontMetrics(e.style.fontSize, d[0] && d[0].label); var h = e.style.textOverflow; let m; let l = 0; if (!Ia(e.rotation)) { j.rotation = e.rotation || 0 } if (this.autoRotation) { o(c, function (a) { if ((a = d[a]) && a.labelLength > l) { l = a.labelLength } }), l > k && l > g.h ? j.rotation = this.labelRotation : this.labelRotation = 0 } else if (i && (m = { width: k + 'px' }, !h)) {
        m.textOverflow =
'clip'; for (i = c.length; !f && i--;) { if (k = c[i], k = d[k].label) { if (k.styles.textOverflow === 'ellipsis' && k.css({ textOverflow: 'clip' }), k.getBBox().height > this.len / c.length - (g.h - g.f)) { k.specCss = { textOverflow: 'ellipsis' } } } }
      } if (j.rotation && (m = { width: (l > a.chartHeight * 0.5 ? a.chartHeight * 0.33 : a.chartHeight) + 'px' }, !h)) { m.textOverflow = 'ellipsis' } this.labelAlign = j.align = e.align || this.autoLabelAlign(this.labelRotation); o(c, function (a) {
        const b = (a = d[a]) && a.label; if (b) {
          b.attr(j), m && b.css(B(m, b.specCss)), delete b.specCss, a.rotation =
j.rotation
        }
      }); this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, this.side === 2)
    },
    hasData () { return this.hasVisibleSeries || t(this.min) && t(this.max) && !!this.tickPositions },
    getOffset () {
      const a = this; var b = a.chart; let c = b.renderer; let d = a.options; const e = a.tickPositions; const f = a.ticks; let g = a.horiz; const h = a.side; const i = b.inverted ? [1, 0, 3, 2][h] : h; let k; let j; let m = 0; let l; let n = 0; const q = d.title; const r = d.labels; let C = 0; const z = b.axisOffset; var b = b.clipOffset; const u = [-1, 1, 1, -1][h]; let y; const L = a.axisParent; k = a.hasData(); a.showAxis = j = k || p(d.showEmpty, !0); a.staggerLines = a.horiz && r.staggerLines
      if (!a.axisGroup) { a.gridGroup = c.g('grid').attr({ zIndex: d.gridZIndex || 1 }).add(L), a.axisGroup = c.g('axis').attr({ zIndex: d.zIndex || 2 }).add(L), a.labelGroup = c.g('axis-labels').attr({ zIndex: r.zIndex || 7 }).addClass('highcharts-' + a.coll.toLowerCase() + '-labels').add(L) } if (k || a.isLinked) {
        if (o(e, function (b) { f[b] ? f[b].addLabel() : f[b] = new Ya(a, b) }), a.renderUnsquish(), o(e, function (b) { if (h === 0 || h === 2 || { 1: 'left', 3: 'right' }[h] === a.labelAlign) { C = v(f[b].getLabelSize(), C) } }), a.staggerLines) {
          C *= a.staggerLines, a.labelOffset =
C
        }
      } else { for (y in f) { f[y].destroy(), delete f[y] } } if (q && q.text && q.enabled !== !1) { if (!a.axisTitle) { a.axisTitle = c.text(q.text, 0, 0, q.useHTML).attr({ zIndex: 7, rotation: q.rotation || 0, align: q.textAlign || { low: 'left', middle: 'center', high: 'right' }[q.align] }).addClass('highcharts-' + this.coll.toLowerCase() + '-title').css(q.style).add(a.axisGroup), a.axisTitle.isNew = !0 } if (j) { m = a.axisTitle.getBBox()[g ? 'height' : 'width'], l = q.offset, n = t(l) ? 0 : p(q.margin, g ? 5 : 10) }a.axisTitle[j ? 'show' : 'hide']() }a.offset = u * p(d.offset, z[h]); a.tickRotCorr =
a.tickRotCorr || { x: 0, y: 0 }; c = h === 2 ? a.tickRotCorr.y : 0; g = C + n + (C && u * (g ? p(r.y, a.tickRotCorr.y + 8) : r.x) - c); a.axisTitleMargin = p(l, g); z[h] = v(z[h], a.axisTitleMargin + m + u * a.offset, g); d = d.offset ? 0 : T(d.lineWidth / 2) * 2; b[i] = v(b[i], d)
    },
    getLinePath (a) {
      const b = this.chart; const c = this.opposite; var d = this.offset; const e = this.horiz; const f = this.left + (c ? this.width : 0) + d; var d = b.chartHeight - this.bottom - (c ? this.height : 0) + d; c && (a *= -1); return b.renderer.crispLine(['M', e ? this.left : f, e ? d : this.top, 'L', e ? b.chartWidth - this.right : f, e ? d : b.chartHeight -
this.bottom], a)
    },
    getTitlePosition () { const a = this.horiz; var b = this.left; const c = this.top; var d = this.len; const e = this.options.title; const f = a ? b : c; const g = this.opposite; const h = this.offset; const i = e.x || 0; const k = e.y || 0; const j = I(e.style.fontSize || 12); var d = { low: f + (a ? 0 : d), middle: f + d / 2, high: f + (a ? d : 0) }[e.align]; var b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? j : 0); return { x: a ? d + i : b + (g ? this.width : 0) + h + i, y: a ? b + k - (g ? this.height : 0) + h : d + k } },
    render () {
      const a = this; const b = a.chart; const c = b.renderer; const d = a.options; const e = a.isLog; const f = a.isLinked; const g = a.tickPositions
      const h = a.axisTitle; const i = a.ticks; const k = a.minorTicks; const j = a.alternateBands; const m = d.stackLabels; const l = d.alternateGridColor; const n = a.tickmarkOffset; const q = d.lineWidth; let r; const C = b.hasRendered && t(a.oldMin) && !isNaN(a.oldMin); const p = a.showAxis; const u = c.globalAnimation; let y; let L; a.labelEdge.length = 0; a.overlap = !1; o([i, k, j], function (a) { for (const b in a) { a[b].isActive = !1 } }); if (a.hasData() || f) {
        a.minorTickInterval && !a.categories && o(a.getMinorTickPositions(), function (b) { k[b] || (k[b] = new Ya(a, b, 'minor')); C && k[b].isNew && k[b].render(null, !0); k[b].render(null, !1, 1) }); if (g.length &&
(o(g, function (b, c) { if (!f || b >= a.min && b <= a.max) { i[b] || (i[b] = new Ya(a, b)), C && i[b].isNew && i[b].render(c, !0, 0.1), i[b].render(c) } }), n && (a.min === 0 || a.single))) { i[-1] || (i[-1] = new Ya(a, -1, null, !0)), i[-1].render(-1) }l && o(g, function (b, c) { L = g[c + 1] !== s ? g[c + 1] + n : a.max - n; if (c % 2 === 0 && b < a.max && L <= a.max - n) { j[b] || (j[b] = new D.PlotLineOrBand(a)), y = b + n, j[b].options = { from: e ? sa(y) : y, to: e ? sa(L) : L, color: l }, j[b].render(), j[b].isActive = !0 } }); if (!a._addedPlotLB) {
          o((d.plotLines || []).concat(d.plotBands || []), function (b) { a.addPlotBandOrLine(b) }),
          a._addedPlotLB = !0
        }
      }o([i, k, j], function (a) { let c; let d; const e = []; const f = u ? u.duration || 500 : 0; const g = function () { for (d = e.length; d--;) { a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]) } }; for (c in a) { if (!a[c].isActive) { a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c) } }a === j || !b.hasRendered || !f ? g() : f && setTimeout(g, f) }); if (q) { r = a.getLinePath(q), a.axisLine ? a.axisLine.animate({ d: r }) : a.axisLine = c.path(r).attr({ stroke: d.lineColor, 'stroke-width': q, zIndex: 7 }).add(a.axisGroup), a.axisLine[p ? 'show' : 'hide']() } if (h && p) {
        h[h.isNew ? 'attr'
          : 'animate'](a.getTitlePosition()), h.isNew = !1
      }m && m.enabled && a.renderStackTotals(); a.isDirty = !1
    },
    redraw () { this.visible && (this.render(), o(this.plotLinesAndBands, function (a) { a.render() })); o(this.series, function (a) { a.isDirty = !0 }) },
    destroy (a) {
      const b = this; const c = b.stacks; let d; const e = b.plotLinesAndBands; a || V(b); for (d in c) { Ma(c[d]), c[d] = null }o([b.ticks, b.minorTicks, b.alternateBands], function (a) { Ma(a) }); for (a = e.length; a--;) { e[a].destroy() }o('stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup'.split(','),
        function (a) { b[a] && (b[a] = b[a].destroy()) }); this.cross && this.cross.destroy()
    },
    drawCrosshair (a, b) {
      let c; const d = this.crosshair; let e = d.animation; if (!this.crosshair || (t(b) || !p(this.crosshair.snap, !0)) === !1 || b && b.series && b.series[this.coll] !== this) { this.hideCrosshair() } else if (p(d.snap, !0) ? t(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : p(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null,
        null, c) || null, c === null) { this.hideCrosshair() } else if (this.cross) { this.cross.attr({ visibility: 'visible' })[e ? 'animate' : 'attr']({ d: c }, e) } else { e = this.categories && !this.isRadial; e = { 'stroke-width': d.width || (e ? this.transA : 1), stroke: d.color || (e ? 'rgba(155,200,255,0.2)' : '#C0C0C0'), zIndex: d.zIndex || 2 }; if (d.dashStyle) { e.dashstyle = d.dashStyle } this.cross = this.chart.renderer.path(c).attr(e).add() }
    },
    hideCrosshair () { this.cross && this.cross.hide() }
  }; w(H.prototype, {
    getPlotBandPath (a, b) {
      const c = this.getPlotLinePath(b,
        null, null, !0); let d = this.getPlotLinePath(a, null, null, !0); d && c && d.toString() !== c.toString() ? d.push(c[4], c[5], c[1], c[2]) : d = null; return d
    },
    addPlotBand (a) { return this.addPlotBandOrLine(a, 'plotBands') },
    addPlotLine (a) { return this.addPlotBandOrLine(a, 'plotLines') },
    addPlotBandOrLine (a, b) { const c = (new D.PlotLineOrBand(this, a)).render(); const d = this.userOptions; c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)); return c },
    removePlotBandOrLine (a) {
      for (var b = this.plotLinesAndBands,
        c = this.options, d = this.userOptions, e = b.length; e--;) { b[e].id === a && b[e].destroy() }o([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function (b) { for (e = b.length; e--;) { b[e].id === a && ta(b, b[e]) } })
    }
  }); H.prototype.getTimeTicks = function (a, b, c, d) {
    const e = []; const f = {}; const g = N.global.useUTC; let h; let i = new fa(b - ab(b)); const k = a.unitRange; const j = a.count; if (t(b)) {
      i[Ob](k >= J.second ? 0 : j * T(i.getMilliseconds() / j)); if (k >= J.second) { i[Pb](k >= J.minute ? 0 : j * T(i.getSeconds() / j)) } if (k >= J.minute) { i[Qb](k >= J.hour ? 0 : j * T(i[zb]() / j)) } if (k >= J.hour) {
        i[Rb](k >=
J.day ? 0 : j * T(i[Ab]() / j))
      } if (k >= J.day) { i[Cb](k >= J.month ? 1 : j * T(i[bb]() / j)) }k >= J.month && (i[Db](k >= J.year ? 0 : j * T(i[cb]() / j)), h = i[db]()); k >= J.year && (h -= h % j, i[Eb](h)); if (k === J.week) { i[Cb](i[bb]() - i[Bb]() + p(d, 1)) }b = 1; if (vb || kb) { i = i.getTime(), i = new fa(i + ab(i)) }h = i[db](); for (var d = i.getTime(), m = i[cb](), l = i[bb](), n = (J.day + (g ? ab(i) : i.getTimezoneOffset() * 6e4)) % J.day; d < c;) { e.push(d), k === J.year ? d = mb(h + b * j, 0) : k === J.month ? d = mb(h, m + b * j) : !g && (k === J.day || k === J.week) ? d = mb(h, m, l + b * j * (k === J.day ? 1 : 7)) : d += k * j, b++ }e.push(d); o(gb(e,
        function (a) { return k <= J.hour && a % J.day === n }), function (a) { f[a] = 'day' })
    }e.info = w(a, { higherRanks: f, totalRange: k * j }); return e
  }; H.prototype.normalizeTimeTickInterval = function (a, b) {
    let c = b || [['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ['second', [1, 2, 5, 10, 15, 30]], ['minute', [1, 2, 5, 10, 15, 30]], ['hour', [1, 2, 3, 4, 6, 8, 12]], ['day', [1, 2]], ['week', [1, 2]], ['month', [1, 2, 3, 4, 6]], ['year', null]]; let d = c[c.length - 1]; let e = J[d[0]]; let f = d[1]; let g; for (g = 0; g < c.length; g++) {
      if (d = c[g], e = J[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + J[c[g + 1][0]]) /
2) { break }
    } e === J.year && a < 5 * e && (f = [1, 2, 5]); c = xb(a / e, f, d[0] === 'year' ? v(wb(a / e), 1) : 1); return { unitRange: e, count: c, unitName: d[0] }
  }; H.prototype.getLogTickPositions = function (a, b, c, d) {
    var e = this.options; var f = this.len; let g = []; if (!d) { this._minorAutoInterval = null } if (a >= 0.5) { a = x(a), g = this.getLinearTickPositions(a, b, c) } else if (a >= 0.08) {
      for (var f = T(b), h, i, k, j, m, e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !m; f++) {
        i = e.length; for (h = 0; h < i && !m; h++) {
          k = Ka(sa(f) * e[h]), k > b && (!d || j <= c) && j !== s && g.push(j), j > c && (m = !0),
          j = k
        }
      }
    } else if (b = sa(b), c = sa(c), a = e[d ? 'minorTickInterval' : 'tickInterval'], a = p(a === 'auto' ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = xb(a, null, wb(a)), g = Aa(this.getLinearTickPositions(a, b, c), Ka), !d) { this._minorAutoInterval = a / 5 } if (!d) { this.tickInterval = a } return g
  }; const Kb = D.Tooltip = function () { this.init.apply(this, arguments) }; Kb.prototype = {
    init (a, b) {
      const c = b.borderWidth; const d = b.style; const e = I(d.padding); this.chart = a; this.options = b; this.crosshairs =
[]; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.label = a.renderer.label('', 0, 0, b.shape || 'callout', null, null, b.useHTML, null, 'tooltip').attr({ padding: e, fill: b.backgroundColor, 'stroke-width': c, r: b.borderRadius, zIndex: 8 }).css(d).css({ padding: 0 }).add().attr({ y: -9999 }); ma || this.label.shadow(b.shadow); this.shared = b.shared
    },
    destroy () { if (this.label) { this.label = this.label.destroy() } clearTimeout(this.hideTimer); clearTimeout(this.tooltipTimeout) },
    move (a, b, c, d) {
      const e = this; const f = e.now; const g = e.options.animation !==
!1 && !e.isHidden && (Q(a - f.x) > 1 || Q(b - f.y) > 1); const h = e.followPointer || e.len > 1; w(f, { x: g ? (2 * f.x + a) / 3 : a, y: g ? (f.y + b) / 2 : b, anchorX: h ? s : g ? (2 * f.anchorX + c) / 3 : c, anchorY: h ? s : g ? (f.anchorY + d) / 2 : d }); e.label.attr(f); if (g) { clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { e && e.move(a, b, c, d) }, 32) }
    },
    hide (a) { const b = this; clearTimeout(this.hideTimer); if (!this.isHidden) { this.hideTimer = setTimeout(function () { b.label.fadeOut(); b.isHidden = !0 }, p(a, this.options.hideDelay, 500)) } },
    getAnchor (a, b) {
      let c
      const d = this.chart; const e = d.inverted; const f = d.plotTop; const g = d.plotLeft; let h = 0; let i = 0; let k; let j; var a = na(a); c = a[0].tooltipPos; this.followPointer && b && (b.chartX === s && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]); c || (o(a, function (a) { k = a.series.yAxis; j = a.series.xAxis; h += a.plotX + (!e && j ? j.left - g : 0); i += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && k ? k.top - f : 0) }), h /= a.length, i /= a.length, c = [e ? d.plotWidth - i : h, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - h : i]); return Aa(c, x)
    },
    getPosition (a, b, c) {
      const d = this.chart
      const e = this.distance; const f = {}; const g = c.h || 0; let h; let i = ['y', d.chartHeight, b, c.plotY + d.plotTop, d.plotTop, d.plotTop + d.plotHeight]; let k = ['x', d.chartWidth, a, c.plotX + d.plotLeft, d.plotLeft, d.plotLeft + d.plotWidth]; const j = p(c.ttBelow, d.inverted && !c.negative || !d.inverted && c.negative); const m = function (a, b, c, d, h, i) { const k = c < d - e; const l = d + e + c < b; const m = d - e - c; d += e; if (j && l) { f[a] = d } else if (!j && k) { f[a] = m } else if (k) { f[a] = E(i - c, m - g < 0 ? m : m - g) } else if (l) { f[a] = v(h, d + g + c > b ? d : d + g) } else { return !1 } }; const l = function (a, b, c, d) {
        if (d < e || d > b - e) { return !1 } else {
          f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d -
c / 2
        }
      }; const n = function (a) { const b = i; i = k; k = b; h = a }; var q = function () { m.apply(0, i) !== !1 ? l.apply(0, k) === !1 && !h && (n(!0), q()) : h ? f.x = f.y = 0 : (n(!0), q()) }; (d.inverted || this.len > 1) && n(); q(); return f
    },
    defaultFormatter (a) { const b = this.points || na(this); let c; c = [a.tooltipFooterHeaderFormatter(b[0])]; c = c.concat(a.bodyFormatter(b)); c.push(a.tooltipFooterHeaderFormatter(b[0], !0)); return c.join('') },
    refresh (a, b) {
      const c = this.chart; const d = this.label; const e = this.options; let f; let g; let h; var i = {}; let k; const j = []; k = e.formatter || this.defaultFormatter; var i =
c.hoverPoints; let m; const l = this.shared; clearTimeout(this.hideTimer); this.followPointer = na(a)[0].series.tooltipOptions.followPointer; h = this.getAnchor(a, b); f = h[0]; g = h[1]; l && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, i && o(i, function (a) { a.setState() }), o(a, function (a) { a.setState('hover'); j.push(a.getLabelConfig()) }), i = { x: a[0].category, y: a[0].y }, i.points = j, this.len = j.length, a = a[0]) : i = a.getLabelConfig(); k = k.call(i, this); i = a.series; this.distance = p(i.tooltipOptions.distance, 16); k === !1 ? this.hide() : (this.isHidden &&
($a(d), d.attr('opacity', 1).show()), d.attr({ text: k }), m = e.borderColor || a.color || i.color || '#606060', d.attr({ stroke: m }), this.updatePosition({ plotX: f, plotY: g, negative: a.negative, ttBelow: a.ttBelow, h: h[2] || 0 }), this.isHidden = !1); O(c, 'tooltipRefresh', { text: k, x: f + c.plotLeft, y: g + c.plotTop, borderColor: m })
    },
    updatePosition (a) { const b = this.chart; var c = this.label; var c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a); this.move(x(c.x), x(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop) },
    getXDateFormat (a,
      b, c) { let d; var b = b.dateTimeLabelFormats; const e = c && c.closestPointRange; let f; const g = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }; let h; let i = 'millisecond'; if (e) { h = ja('%m-%d %H:%M:%S.%L', a.x); for (f in J) { if (e === J.week && +ja('%w', a.x) === c.options.startOfWeek && h.substr(6) === '00:00:00.000') { f = 'week'; break } else if (J[f] > e) { f = i; break } else if (g[f] && h.substr(g[f]) !== '01-01 00:00:00.000'.substr(g[f])) { break } f !== 'week' && (i = f) }f && (d = b[f]) } else { d = b.day } return d || b.year },
    tooltipFooterHeaderFormatter (a, b) {
      var c = b ? 'footer' : 'header'
      const d = a.series; const e = d.tooltipOptions; let f = e.xDateFormat; const g = d.xAxis; const h = g && g.options.type === 'datetime' && ra(a.key); var c = e[c + 'Format']; h && !f && (f = this.getXDateFormat(a, e, g)); h && f && (c = c.replace('{point.key}', '{point.key:' + f + '}')); return La(c, { point: a, series: d })
    },
    bodyFormatter (a) { return Aa(a, function (a) { const c = a.series.tooltipOptions; return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat) }) }
  }; let wa; Za = F.documentElement.ontouchstart !== s; const Wa = D.Pointer = function (a, b) { this.init(a, b) }; Wa.prototype =
{
  init (a, b) { var c = b.chart; const d = c.events; let e = ma ? '' : c.zoomType; var c = a.inverted; let f; this.options = b; this.chart = a; this.zoomX = f = /x/.test(e); this.zoomY = e = /y/.test(e); this.zoomHor = f && !c || e && c; this.zoomVert = e && !c || f && c; this.hasZoom = f || e; this.runChartClick = d && !!d.click; this.pinchDown = []; this.lastValidTouch = {}; if (D.Tooltip && b.tooltip.enabled) { a.tooltip = new Kb(a, b.tooltip), this.followTouchMove = p(b.tooltip.followTouchMove, !0) } this.setDOMEvents() },
  normalize (a, b) {
    let c; let d; var a = a || window.event; var a = cc(a); if (!a.target) {
      a.target =
a.srcElement
    }d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a; if (!b) { this.chartPosition = b = bc(this.chart.container) } d.pageX === s ? (c = v(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top); return w(a, { chartX: x(c), chartY: x(d) })
  },
  getCoordinates (a) { const b = { xAxis: [], yAxis: [] }; o(this.chart.axes, function (c) { b[c.isXAxis ? 'xAxis' : 'yAxis'].push({ axis: c, value: c.toValue(a[c.horiz ? 'chartX' : 'chartY']) }) }); return b },
  runPointActions (a) {
    const b = this.chart; let c = b.series; const d = b.tooltip
    const e = d ? d.shared : !1; const f = b.hoverPoint; const g = b.hoverSeries; let h; let i = Number.MAX_VALUE; let k; let j; const m = []; let l; let n; if (!e && !g) { for (h = 0; h < c.length; h++) { if (c[h].directTouch || !c[h].options.stickyTracking) { c = [] } } }g && (e ? g.noSharedTooltip : g.directTouch) && f ? l = f : (o(c, function (b) { k = b.noSharedTooltip && e; j = !e && b.directTouch; b.visible && !k && !j && p(b.options.enableMouseTracking, !0) && (n = b.searchPoint(a, !k && b.kdDimensions === 1)) && m.push(n) }), o(m, function (a) { if (a && typeof a.dist === 'number' && a.dist < i) { i = a.dist, l = a } })); if (l && (l !== this.prevKDPoint || d && d.isHidden)) {
      if (e &&
!l.series.noSharedTooltip) { for (h = m.length; h--;) { (m[h].clientX !== l.clientX || m[h].series.noSharedTooltip) && m.splice(h, 1) }m.length && d && d.refresh(m, a); o(m, function (b) { b.onMouseOver(a, b !== (g && g.directTouch && f || l)) }) } else if (d && d.refresh(l, a), !g || !g.directTouch) { l.onMouseOver(a) } this.prevKDPoint = l
    } else { c = g && g.tooltipOptions.followPointer, d && c && !d.isHidden && (c = d.getAnchor([{}], a), d.updatePosition({ plotX: c[0], plotY: c[1] })) } if (d && !this._onDocumentMouseMove) {
      this._onDocumentMouseMove = function (a) { if (ca[wa]) { ca[wa].pointer.onDocumentMouseMove(a) } },
      A(F, 'mousemove', this._onDocumentMouseMove)
    } o(b.axes, function (b) { b.drawCrosshair(a, p(l, f)) })
  },
  reset (a, b) {
    const c = this.chart; const d = c.hoverSeries; const e = c.hoverPoint; const f = c.hoverPoints; const g = c.tooltip; const h = g && g.shared ? f : e; (a = a && g && h) && na(h)[0].plotX === s && (a = !1); if (a) { g.refresh(h), e && (e.setState(e.state, !0), o(c.axes, function (a) { p(a.options.crosshair && a.options.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair() })) } else {
      if (e) { e.onMouseOut() }f && o(f, function (a) { a.setState() }); if (d) { d.onMouseOut() }g && g.hide(b)
      if (this._onDocumentMouseMove) { V(F, 'mousemove', this._onDocumentMouseMove), this._onDocumentMouseMove = null }o(c.axes, function (a) { a.hideCrosshair() }); this.hoverX = c.hoverPoints = c.hoverPoint = null
    }
  },
  scaleGroups (a, b) { const c = this.chart; let d; o(c.series, function (e) { d = a || e.getPlotBox(); e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d)) }); c.clipRect.attr(b || c.clipBox) },
  dragStart (a) {
    const b =
this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX = this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY
  },
  drag (a) {
    const b = this.chart; const c = b.options.chart; let d = a.chartX; let e = a.chartY; const f = this.zoomHor; const g = this.zoomVert; const h = b.plotLeft; const i = b.plotTop; const k = b.plotWidth; const j = b.plotHeight; let m; let l = this.selectionMarker; const n = this.mouseDownX; const q = this.mouseDownY; const r = c.panKey && a[c.panKey + 'Key']; if (!l || !l.touch) {
      if (d < h ? d = h : d > h + k && (d = h + k), e < i ? e = i : e > i + j && (e = i + j), this.hasDragged = Math.sqrt((n - d) ** 2 + (q - e) ** 2), this.hasDragged >
10) { m = b.isInsidePlot(n - h, q - i); if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && m && !r && !l) { this.selectionMarker = l = b.renderer.rect(h, i, f ? 1 : k, g ? 1 : j, 0).attr({ fill: c.selectionMarkerFill || 'rgba(69,114,167,0.25)', zIndex: 7 }).add() } l && f && (d -= n, l.attr({ width: Q(d), x: (d > 0 ? 0 : d) + n })); l && g && (d = e - q, l.attr({ height: Q(d), y: (d > 0 ? 0 : d) + q })); m && !l && c.panning && b.pan(a, c.panning) }
    }
  },
  drop (a) {
    const b = this; const c = this.chart; const d = this.hasPinched; if (this.selectionMarker) {
      const e = {
        xAxis: [],
        yAxis: [],
        originalEvent: a.originalEvent ||
a
      }; const f = this.selectionMarker; const g = f.attr ? f.attr('x') : f.x; const h = f.attr ? f.attr('y') : f.y; const i = f.attr ? f.attr('width') : f.width; const k = f.attr ? f.attr('height') : f.height; let j; if (this.hasDragged || d) { o(c.axes, function (c) { if (c.zoomEnabled && t(c.min) && (d || b[{ xAxis: 'zoomX', yAxis: 'zoomY' }[c.coll]])) { var f = c.horiz; const n = a.type === 'touchend' ? c.minPixelPadding : 0; const q = c.toValue((f ? g : h) + n); var f = c.toValue((f ? g + i : h + k) - n); e[c.coll].push({ axis: c, min: E(q, f), max: v(q, f) }); j = !0 } }), j && O(c, 'selection', e, function (a) { c.zoom(w(a, d ? { animation: !1 } : null)) }) } this.selectionMarker =
this.selectionMarker.destroy(); d && this.scaleGroups()
    } if (c) { G(c.container, { cursor: c._cursor }), c.cancelClick = this.hasDragged > 10, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [] }
  },
  onContainerMouseDown (a) { a = this.normalize(a); a.preventDefault && a.preventDefault(); this.dragStart(a) },
  onDocumentMouseUp (a) { ca[wa] && ca[wa].pointer.drop(a) },
  onDocumentMouseMove (a) {
    const b = this.chart; const c = this.chartPosition; var a = this.normalize(a, c); c && !this.inClass(a.target, 'highcharts-tracker') &&
!b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset()
  },
  onContainerMouseLeave () { const a = ca[wa]; if (a) { a.pointer.reset(), a.pointer.chartPosition = null } },
  onContainerMouseMove (a) { const b = this.chart; wa = b.index; a = this.normalize(a); a.returnValue = !1; b.mouseIsDown === 'mousedown' && this.drag(a); (this.inClass(a.target, 'highcharts-tracker') || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a) },
  inClass (a, b) {
    for (var c; a;) {
      if (c = X(a, 'class')) { if (c.includes(b)) { return !0 } else if (c.includes('highcharts-container')) { return !1 } } a = a.parentNode
    }
  },
  onTrackerMouseOut (a) { const b = this.chart.hoverSeries; var a = a.relatedTarget || a.toElement; if (b && !b.options.stickyTracking && !this.inClass(a, 'highcharts-tooltip') && !this.inClass(a, 'highcharts-series-' + b.index)) { b.onMouseOut() } },
  onContainerClick (a) {
    const b = this.chart; const c = b.hoverPoint; const d = b.plotLeft; const e = b.plotTop; var a = this.normalize(a); a.originalEvent = a; b.cancelClick || (c && this.inClass(a.target, 'highcharts-tracker') ? (O(c.series,
      'click', w(a, { point: c })), b.hoverPoint && c.firePointEvent('click', a)) : (w(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && O(b, 'click', a)))
  },
  setDOMEvents () {
    const a = this; const b = a.chart.container; b.onmousedown = function (b) { a.onContainerMouseDown(b) }; b.onmousemove = function (b) { a.onContainerMouseMove(b) }; b.onclick = function (b) { a.onContainerClick(b) }; A(b, 'mouseleave', a.onContainerMouseLeave); fb === 1 && A(F, 'mouseup', a.onDocumentMouseUp); if (Za) {
      b.ontouchstart = function (b) { a.onContainerTouchStart(b) },
      b.ontouchmove = function (b) { a.onContainerTouchMove(b) }, fb === 1 && A(F, 'touchend', a.onDocumentTouchEnd)
    }
  },
  destroy () { let a; V(this.chart.container, 'mouseleave', this.onContainerMouseLeave); fb || (V(F, 'mouseup', this.onDocumentMouseUp), V(F, 'touchend', this.onDocumentTouchEnd)); clearInterval(this.tooltipTimeout); for (a in this) { this[a] = null } }
}; w(D.Pointer.prototype, {
    pinchTranslate (a, b, c, d, e, f) {
      (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f); (this.zoomVert || this.pinchVert) &&
this.pinchTranslateDirection(!1, a, b, c, d, e, f)
    },
    pinchTranslateDirection (a, b, c, d, e, f, g, h) {
      const i = this.chart; const k = a ? 'x' : 'y'; const j = a ? 'X' : 'Y'; const m = 'chart' + j; const l = a ? 'width' : 'height'; const n = i['plot' + (a ? 'Left' : 'Top')]; let q; let r; let C = h || 1; const p = i.inverted; const o = i.bounds[a ? 'h' : 'v']; const y = b.length === 1; const L = b[0][m]; let s = c[0][m]; const v = !y && b[1][m]; let t = !y && c[1][m]; let x; var c = function () { !y && Q(L - v) > 20 && (C = h || Q(s - t) / Q(L - v)); r = (n - s) / C + L; q = i['plot' + (a ? 'Width' : 'Height')] / C }; c(); b = r; b < o.min ? (b = o.min, x = !0) : b + q > o.max && (b = o.max - q, x = !0); x ? (s -= 0.8 * (s - g[k][0]), y || (t -= 0.8 * (t -
g[k][1])), c()) : g[k] = [s, t]; p || (f[k] = r - n, f[l] = q); f = p ? 1 / C : C; e[l] = q; e[k] = b; d[p ? a ? 'scaleY' : 'scaleX' : 'scale' + j] = C; d['translate' + j] = f * n + (s - f * L)
    },
    pinch (a) {
      const b = this; const c = b.chart; const d = b.pinchDown; const e = a.touches; const f = e.length; const g = b.lastValidTouch; const h = b.hasZoom; let i = b.selectionMarker; const k = {}; const j = f === 1 && (b.inClass(a.target, 'highcharts-tracker') && c.runTrackerClick || b.runChartClick); const m = {}; if (f > 1) { b.initiated = !0 }h && b.initiated && !j && a.preventDefault(); Aa(e, function (a) { return b.normalize(a) }); if (a.type === 'touchstart') {
        o(e, function (a,
          b) { d[b] = { chartX: a.chartX, chartY: a.chartY } }), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], o(c.axes, function (a) { if (a.zoomEnabled) { const b = c.bounds[a.horiz ? 'h' : 'v']; const d = a.minPixelPadding; var e = a.toPixels(p(a.options.min, a.dataMin)); const f = a.toPixels(p(a.options.max, a.dataMax)); const g = E(e, f); var e = v(e, f); b.min = E(a.pos, g - d); b.max = v(a.pos + a.len, e + d) } }), b.res = !0
      } else if (d.length) {
        if (!i) { b.selectionMarker = i = w({ destroy: ka, touch: !0 }, c.plotBox) }b.pinchTranslate(d, e, k, i, m, g); b.hasPinched = h; b.scaleGroups(k,
          m); if (!h && b.followTouchMove && f === 1) { this.runPointActions(b.normalize(a)) } else if (b.res) { b.res = !1, this.reset(!1, 0) }
      }
    },
    touch (a, b) { const c = this.chart; wa = c.index; a.touches.length === 1 ? (a = this.normalize(a), c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) && !c.openMenu ? (b && this.runPointActions(a), this.pinch(a)) : b && this.reset()) : a.touches.length === 2 && this.pinch(a) },
    onContainerTouchStart (a) { this.touch(a, !0) },
    onContainerTouchMove (a) { this.touch(a) },
    onDocumentTouchEnd (a) {
      ca[wa] &&
ca[wa].pointer.drop(a)
    }
  }); if (U.PointerEvent || U.MSPointerEvent) {
    const Ca = {}; const Lb = !!U.PointerEvent; const gc = function () { let a; const b = []; b.item = function (a) { return this[a] }; for (a in Ca) { Ca.hasOwnProperty(a) && b.push({ pageX: Ca[a].pageX, pageY: Ca[a].pageY, target: Ca[a].target }) } return b }; const Mb = function (a, b, c, d) { a = a.originalEvent || a; if ((a.pointerType === 'touch' || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && ca[wa]) { d(a), d = ca[wa].pointer, d[b]({ type: c, target: a.currentTarget, preventDefault: ka, touches: gc() }) } }; w(Wa.prototype, {
      onContainerPointerDown (a) {
        Mb(a,
          'onContainerTouchStart', 'touchstart', function (a) { Ca[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } })
      },
      onContainerPointerMove (a) { Mb(a, 'onContainerTouchMove', 'touchmove', function (a) { Ca[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; if (!Ca[a.pointerId].target) { Ca[a.pointerId].target = a.currentTarget } }) },
      onDocumentPointerUp (a) { Mb(a, 'onDocumentTouchEnd', 'touchend', function (a) { delete Ca[a.pointerId] }) },
      batchMSEvents (a) {
        a(this.chart.container, Lb ? 'pointerdown' : 'MSPointerDown',
          this.onContainerPointerDown); a(this.chart.container, Lb ? 'pointermove' : 'MSPointerMove', this.onContainerPointerMove); a(F, Lb ? 'pointerup' : 'MSPointerUp', this.onDocumentPointerUp)
      }
    }); R(Wa.prototype, 'init', function (a, b, c) { a.call(this, b, c); this.hasZoom && G(b.container, { '-ms-touch-action': $, 'touch-action': $ }) }); R(Wa.prototype, 'setDOMEvents', function (a) { a.apply(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A) }); R(Wa.prototype, 'destroy', function (a) { this.batchMSEvents(V); a.call(this) })
  } const sb =
D.Legend = function (a, b) { this.init(a, b) }; sb.prototype = {
    init (a, b) { const c = this; let d = b.itemStyle; const e = b.itemMarginTop || 0; this.options = b; if (b.enabled) { c.itemStyle = d, c.itemHiddenStyle = B(d, b.itemHiddenStyle), c.itemMarginTop = e, c.padding = d = p(b.padding, 8), c.initialItemX = d, c.initialItemY = d - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = p(b.symbolWidth, 16), c.pages = [], c.render(), A(c.chart, 'endResize', function () { c.positionCheckboxes() }) } },
    colorizeItem (a, b) {
      var c = this.options; let d = a.legendItem; const e =
a.legendLine; const f = a.legendSymbol; var g = this.itemHiddenStyle.color; var c = b ? c.itemStyle.color : g; const h = b ? a.legendColor || a.color || '#CCC' : g; var g = a.options && a.options.marker; const i = { fill: h }; let k; d && d.css({ fill: c, color: c }); e && e.attr({ stroke: h }); if (f) { if (g && f.isMarker) { for (k in i.stroke = h, g = a.convertAttribs(g), g) { d = g[k], d !== s && (i[k] = d) } }f.attr(i) }
    },
    positionItem (a) {
      var b = this.options; const c = b.symbolPadding; var b = !b.rtl; var d = a._legendItemPos; const e = d[0]; var d = d[1]; const f = a.checkbox; (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4,
        d); if (f) { f.x = e, f.y = d }
    },
    destroyItem (a) { const b = a.checkbox; o(['legendItem', 'legendLine', 'legendSymbol', 'legendGroup'], function (b) { a[b] && (a[b] = a[b].destroy()) }); b && Sa(a.checkbox) },
    destroy () { const a = this.group; const b = this.box; if (b) { this.box = b.destroy() } if (a) { this.group = a.destroy() } },
    positionCheckboxes (a) {
      const b = this.group.alignAttr; let c; const d = this.clipHeight || this.legendHeight; if (b) {
        c = b.translateY, o(this.allItems, function (e) {
          const f = e.checkbox; let g; f && (g = c + f.y + (a || 0) + 3, G(f, {
            left: b.translateX + e.checkboxOffset +
f.x - 20 + 'px',
            top: g + 'px',
            display: g > c - 6 && g < c + d - 6 ? '' : $
          }))
        })
      }
    },
    renderTitle () { let a = this.padding; const b = this.options.title; let c = 0; if (b.text) { if (!this.title) { this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, 'legend-title').attr({ zIndex: 1 }).css(b.style).add(this.group) } a = this.title.getBBox(); c = a.height; this.offsetWidth = a.width; this.contentGroup.attr({ translateY: c }) } this.titleHeight = c },
    setText (a) {
      const b = this.options; a.legendItem.attr({
        text: b.labelFormat ? La(b.labelFormat,
          a) : b.labelFormatter.call(a)
      })
    },
    renderItem (a) {
      const b = this.chart; let c = b.renderer; const d = this.options; const e = d.layout === 'horizontal'; let f = this.symbolWidth; let g = d.symbolPadding; const h = this.itemStyle; const i = this.itemHiddenStyle; const k = this.padding; const j = e ? p(d.itemDistance, 20) : 0; const m = !d.rtl; const l = d.width; const n = d.itemMarginBottom || 0; const q = this.itemMarginTop; const r = this.initialItemX; let C = a.legendItem; const o = a.series && a.series.drawLegendSymbol ? a.series : a; var u = o.options; var u = this.createCheckboxForItem && u && u.showCheckbox; const y = d.useHTML; if (!C) {
        a.legendGroup = c.g('legend-item').attr({ zIndex: 1 }).add(this.scrollGroup)
        a.legendItem = C = c.text('', m ? f + g : -g, this.baseline || 0, y).css(B(a.visible ? h : i)).attr({ align: m ? 'left' : 'right', zIndex: 2 }).add(a.legendGroup); if (!this.baseline) { this.fontMetrics = c.fontMetrics(h.fontSize, C), this.baseline = this.fontMetrics.f + 3 + q, C.attr('y', this.baseline) } o.drawLegendSymbol(this, a); this.setItemEvents && this.setItemEvents(a, C, y, h, i); this.colorizeItem(a, a.visible); u && this.createCheckboxForItem(a)
      } this.setText(a); c = C.getBBox(); f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + j + (u ? 20
        : 0); this.itemHeight = g = x(a.legendItemHeight || c.height); if (e && this.itemX - r + f > (l || b.chartWidth - 2 * k - r - d.x)) { this.itemX = r, this.itemY += q + this.lastLineHeight + n, this.lastLineHeight = 0 } this.maxItemWidth = v(this.maxItemWidth, f); this.lastItemY = q + this.itemY + n; this.lastLineHeight = v(g, this.lastLineHeight); a._legendItemPos = [this.itemX, this.itemY]; e ? this.itemX += f : (this.itemY += q + g + n, this.lastLineHeight = g); this.offsetWidth = l || v((e ? this.itemX - r - j : f) + k, this.offsetWidth)
    },
    getAllItems () {
      let a = []; o(this.chart.series,
        function (b) { const c = b.options; if (p(c.showInLegend, !t(c.linkedTo) ? s : !1, !0)) { a = a.concat(b.legendItems || (c.legendType === 'point' ? b.data : b)) } }); return a
    },
    adjustMargins (a, b) {
      const c = this.chart; const d = this.options; const e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0); this.display && !d.floating && o([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, g) {
        f.test(e) && !t(a[g]) && (c[pb[g]] = v(c[pb[g]], c.legend[(g + 1) % 2 ? 'legendHeight' : 'legendWidth'] + [1, -1, -1, 1][g] * d[g % 2 ? 'x' : 'y'] + p(d.margin,
          12) + b[g]))
      })
    },
    render () {
      const a = this; const b = a.chart; const c = b.renderer; let d = a.group; let e; let f; let g; let h; let i = a.box; const k = a.options; const j = a.padding; const m = k.borderWidth; const l = k.backgroundColor; a.itemX = a.initialItemX; a.itemY = a.initialItemY; a.offsetWidth = 0; a.lastItemY = 0; if (!d) { a.group = d = c.g('legend').attr({ zIndex: 7 }).add(), a.contentGroup = c.g().attr({ zIndex: 1 }).add(d), a.scrollGroup = c.g().add(a.contentGroup) }a.renderTitle(); e = a.getAllItems(); yb(e, function (a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) })
      k.reversed && e.reverse(); a.allItems = e; a.display = f = !!e.length; a.lastLineHeight = 0; o(e, function (b) { a.renderItem(b) }); g = (k.width || a.offsetWidth) + j; h = a.lastItemY + a.lastLineHeight + a.titleHeight; h = a.handleOverflow(h); h += j; if (m || l) { if (i) { if (g > 0 && h > 0) { i[i.isNew ? 'attr' : 'animate'](i.crisp({ width: g, height: h })), i.isNew = !1 } } else { a.box = i = c.rect(0, 0, g, h, k.borderRadius, m || 0).attr({ stroke: k.borderColor, 'stroke-width': m || 0, fill: l || $ }).add(d).shadow(k.shadow), i.isNew = !0 }i[f ? 'show' : 'hide']() }a.legendWidth = g; a.legendHeight =
h; o(e, function (b) { a.positionItem(b) }); f && d.align(w({ width: g, height: h }, k), !0, 'spacingBox'); b.isResizing || this.positionCheckboxes()
    },
    handleOverflow (a) {
      const b = this; const c = this.chart; const d = c.renderer; const e = this.options; var f = e.y; var f = c.spacingBox.height + (e.verticalAlign === 'top' ? -f : f) - this.padding; const g = e.maxHeight; let h; let i = this.clipRect; const k = e.navigation; const j = p(k.animation, !0); const m = k.arrowSize || 12; let l = this.nav; const n = this.pages; const q = this.padding; let r; const C = this.allItems; const z = function (a) {
        i.attr({ height: a }); if (b.contentGroup.div) {
          b.contentGroup.div.style.clip =
'rect(' + q + 'px,9999px,' + (q + a) + 'px,0)'
        }
      }; e.layout === 'horizontal' && (f /= 2); g && (f = E(f, g)); n.length = 0; if (a > f) {
        this.clipHeight = h = v(f - 20 - this.titleHeight - q, 0); this.currentPage = p(this.currentPage, 1); this.fullHeight = a; o(C, function (a, b) { const c = a._legendItemPos[1]; const d = x(a.legendItem.getBBox().height); let e = n.length; if (!e || c - n[e - 1] > h && (r || c) !== n[e - 1]) { n.push(r || c), e++ }b === C.length - 1 && c + d - n[e - 1] > h && n.push(c); c !== r && (r = c) }); if (!i) { i = b.clipRect = d.clipRect(0, q, 9999, 0), b.contentGroup.clip(i) }z(h); if (!l) {
          this.nav = l = d.g().attr({ zIndex: 1 }).add(this.group),
          this.up = d.symbol('triangle', 0, 0, m, m).on('click', function () { b.scroll(-1, j) }).add(l), this.pager = d.text('', 15, 10).css(k.style).add(l), this.down = d.symbol('triangle-down', 0, 0, m, m).on('click', function () { b.scroll(1, j) }).add(l)
        } b.scroll(0); a = f
      } else if (l) { z(c.chartHeight), l.hide(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0 } return a
    },
    scroll (a, b) {
      let c = this.pages; const d = c.length; let e = this.currentPage + a; const f = this.clipHeight; var g = this.options.navigation; const h = g.activeColor; var g = g.inactiveColor; const i = this.pager; const k =
this.padding; e > d && (e = d); if (e > 0) { b !== s && Xa(b, this.chart), this.nav.attr({ translateX: k, translateY: f + this.padding + 7 + this.titleHeight, visibility: 'visible' }), this.up.attr({ fill: e === 1 ? g : h }).css({ cursor: e === 1 ? 'default' : 'pointer' }), i.attr({ text: e + '/' + d }), this.down.attr({ x: 18 + this.pager.getBBox().width, fill: e === d ? g : h }).css({ cursor: e === d ? 'default' : 'pointer' }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: c }), this.currentPage = e, this.positionCheckboxes(c) }
    }
  }; M = D.LegendSymbolMixin = {
    drawRectangle (a,
      b) { const c = a.options.symbolHeight || a.fontMetrics.f; b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({ zIndex: 3 }).add(b.legendGroup) },
    drawLineMarker (a) {
      let b = this.options; const c = b.marker; let d; d = a.symbolWidth; const e = this.chart.renderer; const f = this.legendGroup; var a = a.baseline - x(a.fontMetrics.b * 0.3); let g; if (b.lineWidth) { g = { 'stroke-width': b.lineWidth }; if (b.dashStyle) { g.dashstyle = b.dashStyle } this.legendLine = e.path(['M', 0, a, 'L', d, a]).attr(g).add(f) } if (c && c.enabled !==
!1) { b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0 }
    }
  }; (/Trident\/7\.0/.test(Ga) || Ua) && R(sb.prototype, 'positionItem', function (a, b) { const c = this; const d = function () { b._legendItemPos && a.call(c, b) }; d(); setTimeout(d) }); const Ha = D.Chart = function () { this.init.apply(this, arguments) }; Ha.prototype = {
    callbacks: [],
    init (a, b) {
      let c; let d = a.series; a.series = null; c = B(N, a); c.series = a.series = d; this.userOptions = a; d = c.chart; this.margin = this.splashArray('margin', d); this.spacing = this.splashArray('spacing',
        d); const e = d.events; this.bounds = { h: {}, v: {} }; this.callback = b; this.isResizing = 0; this.options = c; this.axes = []; this.series = []; this.hasCartesianSeries = d.showAxes; const f = this; let g; f.index = ca.length; ca.push(f); fb++; d.reflow !== !1 && A(f, 'load', function () { f.initReflow() }); if (e) { for (g in e) { A(f, g, e[g]) } }f.xAxis = []; f.yAxis = []; f.animation = ma ? !1 : p(d.animation, !0); f.pointCount = f.colorCounter = f.symbolCounter = 0; f.firstRender()
    },
    initSeries (a) {
      let b = this.options.chart; (b = K[a.type || b.type || b.defaultSeriesType]) || oa(17,
        !0); b = new b(); b.init(this, a); return b
    },
    isInsidePlot (a, b, c) { const d = c ? b : a; var a = c ? a : b; return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight },
    redraw (a) {
      const b = this.axes; const c = this.series; const d = this.pointer; const e = this.legend; let f = this.isDirtyLegend; let g; let h; const i = this.hasCartesianSeries; let k = this.isDirtyBox; const j = c.length; let m = j; const l = this.renderer; const n = l.isHidden(); const q = []; Xa(a, this); n && this.cloneRenderTo(); for (this.layOutTitles(); m--;) { if (a = c[m], a.options.stacking && (g = !0, a.isDirty)) { h = !0; break } } if (h) {
        for (m = j; m--;) {
          if (a = c[m], a.options.stacking) {
            a.isDirty =
!0
          }
        }
      }o(c, function (a) { a.isDirty && a.options.legendType === 'point' && (a.updateTotals && a.updateTotals(), f = !0) }); if (f && e.options.enabled) { e.render(), this.isDirtyLegend = !1 }g && this.getStacks(); if (i && !this.isResizing) { this.maxTicks = null, o(b, function (a) { a.setScale() }) } this.getMargins(); i && (o(b, function (a) { a.isDirty && (k = !0) }), o(b, function (a) { const b = a.min + ',' + a.max; if (a.extKey !== b) { a.extKey = b, q.push(function () { O(a, 'afterSetExtremes', w(a.eventArgs, a.getExtremes())); delete a.eventArgs }) }(k || g) && a.redraw() })); k && this.drawChartBox()
      o(c, function (a) { a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw() }); d && d.reset(!0); l.draw(); O(this, 'redraw'); n && this.cloneRenderTo(!0); o(q, function (a) { a.call() })
    },
    get (a) { let b = this.axes; const c = this.series; let d; let e; for (d = 0; d < b.length; d++) { if (b[d].options.id === a) { return b[d] } } for (d = 0; d < c.length; d++) { if (c[d].options.id === a) { return c[d] } } for (d = 0; d < c.length; d++) { e = c[d].points || []; for (b = 0; b < e.length; b++) { if (e[b].id === a) { return e[b] } } } return null },
    getAxes () {
      const a = this; var b = this.options; let c = b.xAxis = na(b.xAxis ||
{}); var b = b.yAxis = na(b.yAxis || {}); o(c, function (a, b) { a.index = b; a.isX = !0 }); o(b, function (a, b) { a.index = b }); c = c.concat(b); o(c, function (b) { new H(a, b) })
    },
    getSelectedPoints () { let a = []; o(this.series, function (b) { a = a.concat(gb(b.points || [], function (a) { return a.selected })) }); return a },
    getSelectedSeries () { return gb(this.series, function (a) { return a.selected }) },
    setTitle (a, b, c) {
      let g; const d = this; let e = d.options; let f; f = e.title = B(e.title, a); g = e.subtitle = B(e.subtitle, b), e = g; o([['title', a, f], ['subtitle',
        b, e]], function (a) { const b = a[0]; let c = d[b]; const e = a[1]; var a = a[2]; c && e && (d[b] = c = c.destroy()); a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, class: 'highcharts-' + b, zIndex: a.zIndex || 4 }).css(a.style).add()) }); d.layOutTitles(c)
    },
    layOutTitles (a) {
      let b = 0; let c = this.title; const d = this.subtitle; var e = this.options; const f = e.title; var e = e.subtitle; const g = this.renderer; const h = this.spacingBox.width - 44; if (c && (c.css({ width: (f.width || h) + 'px' }).align(w({ y: g.fontMetrics(f.style.fontSize, c).b - 3 }, f), !1, 'spacingBox'), !f.floating &&
!f.verticalAlign)) { b = c.getBBox().height }d && (d.css({ width: (e.width || h) + 'px' }).align(w({ y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b }, e), !1, 'spacingBox'), !e.floating && !e.verticalAlign && (b = za(b + d.getBBox().height))); c = this.titleOffset !== b; this.titleOffset = b; if (!this.isDirtyBox && c) { this.isDirtyBox = c, this.hasRendered && p(a, !0) && this.isDirtyBox && this.redraw() }
    },
    getChartSize () {
      var a = this.options.chart; const b = a.width; var a = a.height; const c = this.renderToClone || this.renderTo; if (!t(b)) {
        this.containerWidth = qb(c,
          'width')
      } if (!t(a)) { this.containerHeight = qb(c, 'height') } this.chartWidth = v(0, b || this.containerWidth || 600); this.chartHeight = v(0, p(a, this.containerHeight > 19 ? this.containerHeight : 400))
    },
    cloneRenderTo (a) {
      let b = this.renderToClone; const c = this.container; a ? b && (this.renderTo.appendChild(c), Sa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), G(b, { position: 'absolute', top: '-9999px', display: 'block' }), b.style.setProperty &&
b.style.setProperty('display', 'block', 'important'), F.body.appendChild(b), c && b.appendChild(c))
    },
    getContainer () {
      let a; const b = this.options; const c = b.chart; let d; let e; let f; this.renderTo = a = c.renderTo; f = 'highcharts-' + Hb++; if (Ia(a)) { this.renderTo = a = F.getElementById(a) } a || oa(13, !0); d = I(X(a, 'data-highcharts-chart')); !isNaN(d) && ca[d] && ca[d].hasRendered && ca[d].destroy(); X(a, 'data-highcharts-chart', this.index); a.innerHTML = ''; !c.skipClone && !a.offsetWidth && this.cloneRenderTo(); this.getChartSize(); d = this.chartWidth; e = this.chartHeight
      this.container = a = aa(Ta, { className: 'highcharts-container' + (c.className ? ' ' + c.className : ''), id: f }, w({ position: 'relative', overflow: 'hidden', width: d + 'px', height: e + 'px', textAlign: 'left', lineHeight: 'normal', zIndex: 0, '-webkit-tap-highlight-color': 'rgba(0,0,0,0)' }, c.style), this.renderToClone || a); this._cursor = a.style.cursor; this.renderer = new (D[c.renderer] || Va)(a, d, e, c.style, c.forExport, b.exporting && b.exporting.allowHTML); ma && this.renderer.create(this, a, d, e); this.renderer.chartIndex = this.index
    },
    getMargins (a) {
      const b =
this.spacing; const c = this.margin; const d = this.titleOffset; this.resetMargins(); if (d && !t(c[0])) { this.plotTop = v(this.plotTop, d + this.options.title.margin + b[0]) } this.legend.adjustMargins(c, b); this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin); this.extraTopMargin && (this.plotTop += this.extraTopMargin); a || this.getAxisMargins()
    },
    getAxisMargins () {
      const a = this; const b = a.axisOffset = [0, 0, 0, 0]; const c = a.margin; a.hasCartesianSeries && o(a.axes, function (a) { a.visible && a.getOffset() }); o(pb, function (d, e) {
        t(c[e]) || (a[d] +=
b[e])
      }); a.setChartSize()
    },
    reflow (a) { const b = this; var c = b.options.chart; var d = b.renderTo; const e = c.width || qb(d, 'width'); const f = c.height || qb(d, 'height'); var c = a ? a.target : U; var d = function () { if (b.container) { b.setSize(e, f, !1), b.hasUserSize = null } }; if (!b.hasUserSize && !b.isPrinting && e && f && (c === U || c === F)) { if (e !== b.containerWidth || f !== b.containerHeight) { clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d() }b.containerWidth = e; b.containerHeight = f } },
    initReflow () {
      const a = this; const b = function (b) { a.reflow(b) }; A(U, 'resize',
        b); A(a, 'destroy', function () { V(U, 'resize', b) })
    },
    setSize (a, b, c) {
      const d = this; let e; let f; let g; const h = d.renderer; d.isResizing += 1; g = function () { d && O(d, 'endResize', null, function () { d.isResizing -= 1 }) }; Xa(c, d); d.oldChartHeight = d.chartHeight; d.oldChartWidth = d.chartWidth; if (t(a)) { d.chartWidth = e = v(0, x(a)), d.hasUserSize = !!e } if (t(b)) { d.chartHeight = f = v(0, x(b)) }a = h.globalAnimation; (a ? rb : G)(d.container, { width: e + 'px', height: f + 'px' }, a); d.setChartSize(!0); h.setSize(e, f, c); d.maxTicks = null; o(d.axes, function (a) { a.isDirty = !0; a.setScale() })
      o(d.series, function (a) { a.isDirty = !0 }); d.isDirtyLegend = !0; d.isDirtyBox = !0; d.layOutTitles(); d.getMargins(); d.redraw(c); d.oldChartHeight = null; O(d, 'resize'); a = h.globalAnimation; a === !1 ? g() : setTimeout(g, a && a.duration || 500)
    },
    setChartSize (a) {
      let b = this.inverted; let c = this.renderer; let d = this.chartWidth; const e = this.chartHeight; const f = this.options.chart; const g = this.spacing; const h = this.clipOffset; let i; let k; let j; let m; this.plotLeft = i = x(this.plotLeft); this.plotTop = k = x(this.plotTop); this.plotWidth = j = v(0, x(d - i - this.marginRight)); this.plotHeight =
m = v(0, x(e - k - this.marginBottom)); this.plotSizeX = b ? m : j; this.plotSizeY = b ? j : m; this.plotBorderWidth = f.plotBorderWidth || 0; this.spacingBox = c.spacingBox = { x: g[3], y: g[0], width: d - g[3] - g[1], height: e - g[0] - g[2] }; this.plotBox = c.plotBox = { x: i, y: k, width: j, height: m }; d = 2 * T(this.plotBorderWidth / 2); b = za(v(d, h[3]) / 2); c = za(v(d, h[0]) / 2); this.clipBox = { x: b, y: c, width: T(this.plotSizeX - v(d, h[1]) / 2 - b), height: v(0, T(this.plotSizeY - v(d, h[2]) / 2 - c)) }; a || o(this.axes, function (a) { a.setAxisSize(); a.setAxisTranslation() })
    },
    resetMargins () {
      const a =
this; o(pb, function (b, c) { a[b] = p(a.margin[c], a.spacing[c]) }); a.axisOffset = [0, 0, 0, 0]; a.clipOffset = [0, 0, 0, 0]
    },
    drawChartBox () {
      const a = this.options.chart; const b = this.renderer; const c = this.chartWidth; const d = this.chartHeight; let e = this.chartBackground; const f = this.plotBackground; const g = this.plotBorder; const h = this.plotBGImage; const i = a.borderWidth || 0; const k = a.backgroundColor; const j = a.plotBackgroundColor; const m = a.plotBackgroundImage; const l = a.plotBorderWidth || 0; let n; const q = this.plotLeft; const r = this.plotTop; const p = this.plotWidth; const o = this.plotHeight; const u = this.plotBox; const y = this.clipRect; const s =
this.clipBox; n = i + (a.shadow ? 8 : 0); if (i || k) { if (e) { e.animate(e.crisp({ width: c - n, height: d - n })) } else { e = { fill: k || $ }; if (i) { e.stroke = a.borderColor, e['stroke-width'] = i } this.chartBackground = b.rect(n / 2, n / 2, c - n, d - n, a.borderRadius, i).attr(e).addClass('highcharts-background').add().shadow(a.shadow) } } if (j) { f ? f.animate(u) : this.plotBackground = b.rect(q, r, p, o, 0).attr({ fill: j }).add().shadow(a.plotShadow) } if (m) { h ? h.animate(u) : this.plotBGImage = b.image(m, q, r, p, o).add() }y ? y.animate({ width: s.width, height: s.height }) : this.clipRect =
b.clipRect(s); if (l) { g ? g.animate(g.crisp({ x: q, y: r, width: p, height: o, strokeWidth: -l })) : this.plotBorder = b.rect(q, r, p, o, 0, -l).attr({ stroke: a.plotBorderColor, 'stroke-width': l, fill: $, zIndex: 1 }).add() } this.isDirtyBox = !1
    },
    propFromSeries () { const a = this; const b = a.options.chart; let c; const d = a.options.series; let e; let f; o(['inverted', 'angular', 'polar'], function (g) { c = K[b.type || b.defaultSeriesType]; f = a[g] || b[g] || c && c.prototype[g]; for (e = d && d.length; !f && e--;) { (c = K[d[e].type]) && c.prototype[g] && (f = !0) }a[g] = f }) },
    linkSeries () {
      const a =
this; const b = a.series; o(b, function (a) { a.linkedSeries.length = 0 }); o(b, function (b) { let d = b.options.linkedTo; if (Ia(d) && (d = d === ':previous' ? a.series[b.index - 1] : a.get(d))) { d.linkedSeries.push(b), b.linkedParent = d, b.visible = p(b.options.visible, d.options.visible, b.visible) } })
    },
    renderSeries () { o(this.series, function (a) { a.translate(); a.render() }) },
    renderLabels () {
      const a = this; const b = a.options.labels; b.items && o(b.items, function (c) {
        const d = w(b.style, c.style); const e = I(d.left) + a.plotLeft; const f = I(d.top) + a.plotTop + 12; delete d.left
        delete d.top; a.renderer.text(c.html, e, f).attr({ zIndex: 2 }).css(d).add()
      })
    },
    render () {
      const a = this.axes; const b = this.renderer; const c = this.options; let d; let e; let f; let g; this.setTitle(); this.legend = new sb(this, c.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); d = this.plotWidth; e = this.plotHeight -= 13; o(a, function (a) { a.setScale() }); this.getAxisMargins(); f = d / this.plotWidth > 1.1; g = e / this.plotHeight > 1.1; if (f || g) {
        this.maxTicks = null, o(a, function (a) { (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0) }),
        this.getMargins()
      } this.drawChartBox(); this.hasCartesianSeries && o(a, function (a) { a.visible && a.render() }); if (!this.seriesGroup) { this.seriesGroup = b.g('series-group').attr({ zIndex: 3 }).add() } this.renderSeries(); this.renderLabels(); this.showCredits(c.credits); this.hasRendered = !0
    },
    showCredits (a) { if (a.enabled && !this.credits) { this.credits = this.renderer.text(a.text, 0, 0).on('click', function () { if (a.href) { location.href = a.href } }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position) } },
    destroy () {
      const a = this; const b = a.axes; const c = a.series; const d = a.container; let e; const f = d && d.parentNode; O(a, 'destroy'); ca[a.index] = s; fb--; a.renderTo.removeAttribute('data-highcharts-chart'); V(a); for (e = b.length; e--;) { b[e] = b[e].destroy() } for (e = c.length; e--;) { c[e] = c[e].destroy() }o('title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer'.split(','), function (b) { const c = a[b]; c && c.destroy && (a[b] = c.destroy()) }); if (d) {
        d.innerHTML =
'', V(d), f && Sa(d)
      } for (e in a) { delete a[e] }
    },
    isReadyToRender () { const a = this; return !ea && U == U.top && F.readyState !== 'complete' || ma && !U.canvg ? (ma ? Vb.push(function () { a.firstRender() }, a.options.global.canvasToolsURL) : F.attachEvent('onreadystatechange', function () { F.detachEvent('onreadystatechange', a.firstRender); F.readyState === 'complete' && a.firstRender() }), !1) : !0 },
    firstRender () {
      const a = this; const b = a.options; const c = a.callback; if (a.isReadyToRender()) {
        a.getContainer(); O(a, 'init'); a.resetMargins(); a.setChartSize()
        a.propFromSeries(); a.getAxes(); o(b.series || [], function (b) { a.initSeries(b) }); a.linkSeries(); O(a, 'beforeRender'); if (D.Pointer) { a.pointer = new Wa(a, b) }a.render(); a.renderer.draw(); c && c.apply(a, [a]); o(a.callbacks, function (b) { a.index !== s && b.apply(a, [a]) }); O(a, 'load'); a.cloneRenderTo(!0)
      }
    },
    splashArray (a, b) { var c = b[a]; var c = ha(c) ? c : [c, c, c, c]; return [p(b[a + 'Top'], c[0]), p(b[a + 'Right'], c[1]), p(b[a + 'Bottom'], c[2]), p(b[a + 'Left'], c[3])] }
  }; const hc = D.CenteredSeriesMixin = {
    getCenter () {
      let a = this.options
      var b = this.chart; const c = 2 * (a.slicedOffset || 0); const d = b.plotWidth - 2 * c; var b = b.plotHeight - 2 * c; var e = a.center; var e = [p(e[0], '50%'), p(e[1], '50%'), a.size || '100%', a.innerSize || 0]; const f = E(d, b); let g; let h; for (g = 0; g < 4; ++g) { h = e[g], a = g < 2 || g === 2 && /%$/.test(h), e[g] = (/%$/.test(h) ? [d, b, f, e[2]][g] * parseFloat(h) / 100 : parseFloat(h)) + (a ? c : 0) }e[3] > e[2] && (e[3] = e[2]); return e
    }
  }; const Da = function () {}; Da.prototype = {
    init (a, b, c) {
      this.series = a; this.color = a.color; this.applyOptions(b, c); this.pointAttr = {}; if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors,
      this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length)) { a.colorCounter = 0 }a.chart.pointCount++; return this
    },
    applyOptions (a, b) { const c = this.series; const d = c.options.pointValKey || c.pointValKey; var a = Da.prototype.optionsToObject.call(this, a); w(this, a); this.options = this.options ? w(this.options, a) : a; if (d) { this.y = this[d] } if (this.x === s && c) { this.x = b === s ? c.autoIncrement() : b } return this },
    optionsToObject (a) {
      let b = {}; let c = this.series; const d = c.options.keys; const e = d || c.pointArrayMap || ['y']; const f = e.length; let g = 0; let h =
0; if (typeof a === 'number' || a === null) { b[e[0]] = a } else if (Ja(a)) { if (!d && a.length > f) { c = typeof a[0]; if (c === 'string') { b.name = a[0] } else if (c === 'number') { b.x = a[0] }g++ } for (;h < f;) { if (!d || a[g] !== void 0) { b[e[h]] = a[g] }g++; h++ } } else if (typeof a === 'object') { b = a; if (a.dataLabels) { c._hasPointLabels = !0 } if (a.marker) { c._hasPointMarkers = !0 } } return b
    },
    destroy () {
      const a = this.series.chart; const b = a.hoverPoints; let c; a.pointCount--; if (b && (this.setState(), ta(b, this), !b.length)) { a.hoverPoints = null } if (this === a.hoverPoint) { this.onMouseOut() }
      if (this.graphic || this.dataLabel) { V(this), this.destroyElements() } this.legendItem && a.legend.destroyItem(this); for (c in this) { this[c] = null }
    },
    destroyElements () { for (var a = ['graphic', 'dataLabel', 'dataLabelUpper', 'connector', 'shadowGroup'], b, c = 6; c--;) { b = a[c], this[b] && (this[b] = this[b].destroy()) } },
    getLabelConfig () { return { x: this.category, y: this.y, color: this.color, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal } },
    tooltipFormatter (a) {
      const b =
this.series; const c = b.tooltipOptions; const d = p(c.valueDecimals, ''); const e = c.valuePrefix || ''; const f = c.valueSuffix || ''; o(b.pointArrayMap || ['y'], function (b) { b = '{point.' + b; if (e || f) { a = a.replace(b + '}', e + b + '}' + f) }a = a.replace(b + '}', b + ':,.' + d + 'f}') }); return La(a, { point: this, series: this.series })
    },
    firePointEvent (a, b, c) {
      const d = this; const e = this.series.options; (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(); a === 'click' && e.allowPointSelect && (c = function (a) {
        d.select && d.select(null, a.ctrlKey ||
a.metaKey || a.shiftKey)
      }); O(this, a, b, c)
    },
    visible: !0
  }; const P = D.Series = function () {}; P.prototype = {
    isCartesian: !0,
    type: 'line',
    pointClass: Da,
    sorted: !0,
    requireSorting: !0,
    pointAttrToOptions: { stroke: 'lineColor', 'stroke-width': 'lineWidth', fill: 'fillColor', r: 'radius' },
    directTouch: !1,
    axisTypes: ['xAxis', 'yAxis'],
    colorCounter: 0,
    parallelArrays: ['x', 'y'],
    init (a, b) {
      const c = this; let d; let e; const f = a.series; const g = function (a, b) { return p(a.options.index, a._i) - p(b.options.index, b._i) }; c.chart = a; c.options = b = c.setOptions(b); c.linkedSeries =
[]; c.bindAxes(); w(c, { name: b.name, state: '', pointAttr: {}, visible: b.visible !== !1, selected: b.selected === !0 }); if (ma) { b.animation = !1 }e = b.events; for (d in e) { A(c, d, e[d]) } if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) { a.runTrackerClick = !0 }c.getColor(); c.getSymbol(); o(c.parallelArrays, function (a) { c[a + 'Data'] = [] }); c.setData(b.data, !1); if (c.isCartesian) { a.hasCartesianSeries = !0 }f.push(c); c._i = f.length - 1; yb(f, g); this.yAxis && yb(this.yAxis.series, g); o(f, function (a, b) {
        a.index = b; a.name =
a.name || 'Series ' + (b + 1)
      })
    },
    bindAxes () { const a = this; const b = a.options; const c = a.chart; let d; o(a.axisTypes || [], function (e) { o(c[e], function (c) { d = c.options; if (b[e] === d.index || b[e] !== s && b[e] === d.id || b[e] === s && d.index === 0) { c.series.push(a), a[e] = c, c.isDirty = !0 } }); !a[e] && a.optionalAxis !== e && oa(18, !0) }) },
    updateParallelArrays (a, b) {
      const c = a.series; const d = arguments; o(c.parallelArrays, typeof b === 'number' ? function (d) { const f = d === 'y' && c.toYData ? c.toYData(a) : a[d]; c[d + 'Data'][b] = f } : function (a) {
        Array.prototype[b].apply(c[a +
'Data'], Array.prototype.slice.call(d, 2))
      })
    },
    autoIncrement () { let a = this.options; var b = this.xIncrement; let c; const d = a.pointIntervalUnit; var b = p(b, a.pointStart, 0); this.pointInterval = c = p(this.pointInterval, a.pointInterval, 1); if (d === 'month' || d === 'year') { a = new fa(b), a = d === 'month' ? +a[Db](a[cb]() + c) : +a[Eb](a[db]() + c), c = a - b } this.xIncrement = b + c; return b },
    getSegments () {
      let a = -1; let b = []; let c; const d = this.points; const e = d.length; if (e) {
        if (this.options.connectNulls) { for (c = e; c--;) { d[c].y === null && d.splice(c, 1) }d.length && (b = [d]) } else {
          o(d,
            function (c, g) { c.y === null ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1)) })
        }
      } this.segments = b
    },
    setOptions (a) {
      var b = this.chart; let c = b.options.plotOptions; var b = b.userOptions || {}; const d = b.plotOptions || {}; const e = c[this.type]; this.userOptions = a; c = B(e, c.series, a); this.tooltipOptions = B(N.tooltip, N.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip); e.marker === null && delete c.marker; this.zoneAxis = c.zoneAxis; a = this.zones = (c.zones || []).slice()
      if ((c.negativeColor || c.negativeFillColor) && !c.zones) { a.push({ value: c[this.zoneAxis + 'Threshold'] || c.threshold || 0, color: c.negativeColor, fillColor: c.negativeFillColor }) }a.length && t(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor }); return c
    },
    getCyclic (a, b, c) { const d = this.userOptions; const e = '_' + a + 'Index'; const f = a + 'Counter'; b || (t(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]); this[a] = b },
    getColor () {
      this.options.colorByPoint ? this.options.color = null : this.getCyclic('color',
        this.options.color || W[this.type].color, this.chart.options.colors)
    },
    getSymbol () { const a = this.options.marker; this.getCyclic('symbol', a.symbol, this.chart.options.symbols); if (/^url/.test(this.symbol)) { a.radius = 0 } },
    drawLegendSymbol: M.drawLineMarker,
    setData (a, b, c, d) {
      const e = this; const f = e.points; const g = f && f.length || 0; let h; const i = e.options; const k = e.chart; let j = null; const m = e.xAxis; let l = m && !!m.categories; const n = i.turboThreshold; const q = this.xData; const r = this.yData; const C = (h = e.pointArrayMap) && h.length; var a = a || []; h = a.length; b = p(b, !0); if (d !== !1 && h && g === h &&
!e.cropped && !e.hasGroupedData && e.visible) { o(a, function (a, b) { f[b].update && f[b].update(a, !1, null, !1) }) } else {
        e.xIncrement = null; e.pointRange = l ? 1 : i.pointRange; e.colorCounter = 0; o(this.parallelArrays, function (a) { e[a + 'Data'].length = 0 }); if (n && h > n) { for (c = 0; j === null && c < h;) { j = a[c], c++ } if (ra(j)) { l = p(i.pointStart, 0); j = p(i.pointInterval, 1); for (c = 0; c < h; c++) { q[c] = l, r[c] = a[c], l += j }e.xIncrement = l } else if (Ja(j)) { if (C) { for (c = 0; c < h; c++) { j = a[c], q[c] = j[0], r[c] = j.slice(1, C + 1) } } else { for (c = 0; c < h; c++) { j = a[c], q[c] = j[0], r[c] = j[1] } } } else { oa(12) } } else {
          for (c =
0; c < h; c++) { if (a[c] !== s && (j = { series: e }, e.pointClass.prototype.applyOptions.apply(j, [a[c]]), e.updateParallelArrays(j, c), l && t(j.name))) { m.names[j.x] = j.name } }
        }Ia(r[0]) && oa(14, !0); e.data = []; e.options.data = a; for (c = g; c--;) { f[c] && f[c].destroy && f[c].destroy() } if (m) { m.minRange = m.userMinRange }e.isDirty = e.isDirtyData = k.isDirtyBox = !0; c = !1
      }i.legendType === 'point' && (this.processData(), this.generatePoints()); b && k.redraw(c)
    },
    processData (a) {
      let b = this.xData; let c = this.yData; let d = b.length; let e; e = 0; let f; let g; const h = this.xAxis; let i; const k =
this.options; i = k.cropThreshold; const j = this.getExtremesFromAll || k.getExtremesFromAll; const m = this.isCartesian; let l; let n; if (m && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) { return !1 } if (h) { a = h.getExtremes(), l = a.min, n = a.max } if (m && this.sorted && !j && (!i || d > i || this.forceCrop)) { if (b[d - 1] < l || b[0] > n) { b = [], c = [] } else if (b[0] < l || b[d - 1] > n) { e = this.cropData(this.xData, this.yData, l, n), b = e.xData, c = e.yData, e = e.start, f = !0 } } for (i = b.length - 1; i >= 0; i--) { d = b[i] - b[i - 1], d > 0 && (g === s || d < g) ? g = d : d < 0 && this.requireSorting && oa(15) } this.cropped =
f; this.cropStart = e; this.processedXData = b; this.processedYData = c; if (k.pointRange === null) { this.pointRange = g || 1 } this.closestPointRange = g
    },
    cropData (a, b, c, d) { const e = a.length; let f = 0; let g = e; const h = p(this.cropShoulder, 1); let i; for (i = 0; i < e; i++) { if (a[i] >= c) { f = v(0, i - h); break } } for (;i < e; i++) { if (a[i] > d) { g = i + h; break } } return { xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g } },
    generatePoints () {
      const a = this.options.data; let b = this.data; let c; const d = this.processedXData; const e = this.processedYData; const f = this.pointClass; const g = d.length; const h = this.cropStart ||
0; let i; const k = this.hasGroupedData; let j; const m = []; let l; if (!b && !k) { b = [], b.length = a.length, b = this.data = b } for (l = 0; l < g; l++) { i = h + l, k ? m[l] = (new f()).init(this, [d[l]].concat(na(e[l]))) : (b[i] ? j = b[i] : a[i] !== s && (b[i] = j = (new f()).init(this, a[i], d[l])), m[l] = j), m[l].index = i } if (b && (g !== (c = b.length) || k)) { for (l = 0; l < c; l++) { if (l === h && !k && (l += g), b[l]) { b[l].destroyElements(), b[l].plotX = s } } } this.data = b; this.points = m
    },
    getExtremes (a) {
      const b = this.yAxis; const c = this.processedXData; let d; const e = []; let f = 0; d = this.xAxis.getExtremes(); const g = d.min; const h = d.max; let i; let k; let j; let m; var a = a ||
this.stackedYData || this.processedYData; d = a.length; for (m = 0; m < d; m++) { if (k = c[m], j = a[m], i = j !== null && j !== s && (!b.isLog || j.length || j > 0), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[m + 1] || k) >= g && (c[m - 1] || k) <= h, i && k) { if (i = j.length) { for (;i--;) { j[i] !== null && (e[f++] = j[i]) } } else { e[f++] = j } } } this.dataMin = Ra(e); this.dataMax = Fa(e)
    },
    translate () {
      this.processedXData || this.processData(); this.generatePoints(); for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis,
        f = this.points, g = f.length, h = !!this.modifyValue, i = a.pointPlacement, k = i === 'between' || ra(i), j = a.threshold, m = a.startFromThreshold ? j : 0, l, n, q, r, o = Number.MAX_VALUE, a = 0; a < g; a++) {
        const z = f[a]; const u = z.x; let y = z.y; n = z.low; let L = b && e.stacks[(this.negStacks && y < (m ? 0 : j) ? '-' : '') + this.stackKey]; if (e.isLog && y !== null && y <= 0) { z.y = y = null, oa(10) }z.plotX = l = E(v(-1e5, c.translate(u, 0, 0, 0, 1, i, this.type === 'flags')), 1e5); if (b && this.visible && L && L[u]) {
          r = this.getStackIndicator(r, u, this.index), L = L[u], y = L.points[r.key], n = y[0], y = y[1], n === m && (n =
p(j, e.min)), e.isLog && n <= 0 && (n = null), z.total = z.stackTotal = L.total, z.percentage = L.total && z.y / L.total * 100, z.stackY = y, L.setOffset(this.pointXOffset || 0, this.barW || 0)
        }z.yBottom = t(n) ? e.translate(n, 0, 1, 0, 1) : null; h && (y = this.modifyValue(y, z)); z.plotY = n = typeof y === 'number' && y !== Infinity ? E(v(-1e5, e.translate(y, 0, 1, 0, 1)), 1e5) : s; z.isInside = n !== s && n >= 0 && n <= e.len && l >= 0 && l <= c.len; z.clientX = k ? c.translate(u, 0, 0, 0, 1) : l; z.negative = z.y < (j || 0); z.category = d && d[z.x] !== s ? d[z.x] : z.x; a && (o = E(o, Q(l - q))); q = l
      } this.closestPointRangePx =
o; this.getSegments()
    },
    setClip (a) {
      const b = this.chart; const c = this.options; const d = b.renderer; const e = b.inverted; const f = this.clipBox; const g = f || b.clipBox; const h = this.sharedClipKey || ['_sharedClip', a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(','); let i = b[h]; let k = b[h + 'm']; if (!i) { if (a) { g.width = 0, b[h + 'm'] = k = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight) }b[h] = i = d.clipRect(g) }a && (i.count += 1); if (c.clip !== !1) { this.group.clip(a || f ? i : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = h } a || (i.count -= 1,
      i.count <= 0 && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + 'm'] && (b[h + 'm'] = b[h + 'm'].destroy())))
    },
    animate (a) { const b = this.chart; let c = this.options.animation; let d; if (c && !ha(c)) { c = W[this.type].animation }a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({ width: b.plotSizeX }, c), b[d + 'm'] && b[d + 'm'].animate({ width: b.plotSizeX + 99 }, c), this.animate = null) },
    afterAnimate () { this.setClip(); O(this, 'afterAnimate') },
    drawPoints () {
      let a; const b = this.points; const c = this.chart; let d; let e; let f; let g; let h; let i; let k; let j; const m = this.options.marker
      const l = this.pointAttr['']; let n; let q; let r; const o = this.markerGroup; const z = p(m.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * m.radius); if (m.enabled !== !1 || this._hasPointMarkers) {
        for (f = b.length; f--;) {
          if (g = b[f], d = T(g.plotX), e = g.plotY, j = g.graphic, n = g.marker || {}, q = !!g.marker, a = z && n.enabled === s || n.enabled, r = g.isInside, a && e !== s && !isNaN(e) && g.y !== null) {
            if (a = g.pointAttr[g.selected ? 'select' : ''] || l, h = a.r, i = p(n.symbol, this.symbol), k = i.indexOf('url') === 0, j) {
              j[r ? 'show' : 'hide'](!0).animate(w({ x: d - h, y: e - h }, j.symbolName ? {
                width: 2 * h,
                height: 2 *
h
              } : {}))
            } else if (r && (h > 0 || k)) { g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, q ? n : m).attr(a).add(o) }
          } else if (j) { g.graphic = j.destroy() }
        }
      }
    },
    convertAttribs (a, b, c, d) { const e = this.pointAttrToOptions; let f; let g; const h = {}; var a = a || {}; var b = b || {}; var c = c || {}; var d = d || {}; for (f in e) { g = e[f], h[f] = p(a[g], b[f], c[f], d[f]) } return h },
    getAttribs () {
      const a = this; const b = a.options; let c = W[a.type].marker ? b.marker : b; let d = c.states; const e = d.hover; let f; let g = a.color; const h = a.options.negativeColor; f = { stroke: g, fill: g }; const i = a.points || []; let k; let j; const m = []; const l = a.pointAttrToOptions; k = a.hasPointSpecificOptions
      const n = c.lineColor; const q = c.fillColor; j = b.turboThreshold; const r = a.zones; const C = a.zoneAxis || 'y'; let z; b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : (e.color = e.color || va(e.color || g).brighten(e.brightness).get(), e.negativeColor = e.negativeColor || va(e.negativeColor || h).brighten(e.brightness).get()); m[''] = a.convertAttribs(c, f); o(['hover', 'select'], function (b) { m[b] = a.convertAttribs(d[b], m['']) }); a.pointAttr = m; g = i.length; if (!j || g < j || k) {
        for (;g--;) {
          j = i[g]; if ((c = j.options &&
j.options.marker || j.options) && c.enabled === !1) { c.radius = 0 } if (r.length) { k = 0; for (f = r[k]; j[C] >= f.value;) { f = r[++k] }j.color = j.fillColor = p(f.color, a.color) }k = b.colorByPoint || j.color; if (j.options) { for (z in l) { t(c[l[z]]) && (k = !0) } } if (k) {
            c = c || {}; k = []; d = c.states || {}; f = d.hover = d.hover || {}; if (!b.marker || j.negative && !f.fillColor && !e.fillColor) { f[a.pointAttrToOptions.fill] = f.color || !j.options.color && e[j.negative && h ? 'negativeColor' : 'color'] || va(j.color).brighten(f.brightness || e.brightness).get() }f = { color: j.color }; if (!q) {
              f.fillColor =
j.color
            } if (!n) { f.lineColor = j.color }c.hasOwnProperty('color') && !c.color && delete c.color; k[''] = a.convertAttribs(w(f, c), m['']); k.hover = a.convertAttribs(d.hover, m.hover, k['']); k.select = a.convertAttribs(d.select, m.select, k[''])
          } else { k = m }j.pointAttr = k
        }
      }
    },
    destroy () {
      const a = this; const b = a.chart; const c = /AppleWebKit\/533/.test(Ga); let d; const e = a.data || []; let f; let g; let h; O(a, 'destroy'); V(a); o(a.axisTypes || [], function (b) { if (h = a[b]) { ta(h.series, a), h.isDirty = h.forceRedraw = !0 } }); a.legendItem && a.chart.legend.destroyItem(a); for (d = e.length; d--;) {
        (f =
e[d]) && f.destroy && f.destroy()
      }a.points = null; clearTimeout(a.animationTimeout); for (g in a) { a[g] instanceof Z && !a[g].survive && (d = c && g === 'group' ? 'hide' : 'destroy', a[g][d]()) } if (b.hoverSeries === a) { b.hoverSeries = null }ta(b.series, a); for (g in a) { delete a[g] }
    },
    getSegmentPath (a) {
      const b = this; const c = []; const d = b.options.step; o(a, function (e, f) {
        const g = e.plotX; const h = e.plotY; let i; b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? 'L' : 'M'), d && f && (i = a[f - 1], d === 'right' ? c.push(i.plotX, h, 'L') : d === 'center' ? c.push((i.plotX +
g) / 2, i.plotY, 'L', (i.plotX + g) / 2, h, 'L') : c.push(g, i.plotY, 'L')), c.push(e.plotX, e.plotY))
      }); return c
    },
    getGraphPath () { const a = this; let b = []; let c; const d = []; o(a.segments, function (e) { c = a.getSegmentPath(e); e.length > 1 ? b = b.concat(c) : d.push(e[0]) }); a.singlePoints = d; return a.graphPath = b },
    drawGraph () {
      const a = this; const b = this.options; const c = [['graph', b.lineColor || this.color, b.dashStyle]]; const d = b.lineWidth; const e = b.linecap !== 'square'; const f = this.getGraphPath(); const g = this.fillGraph && this.color || $; o(this.zones, function (d, e) {
        c.push(['zoneGraph' +
e, d.color || a.color, d.dashStyle || b.dashStyle])
      }); o(c, function (c, i) { const k = c[0]; let j = a[k]; if (j) { j.animate({ d: f }) } else if ((d || g) && f.length) { j = { stroke: c[1], 'stroke-width': d, fill: g, zIndex: 1 }, c[2] ? j.dashstyle = c[2] : e && (j['stroke-linecap'] = j['stroke-linejoin'] = 'round'), a[k] = a.chart.renderer.path(f).attr(j).add(a.group).shadow(i < 2 && b.shadow) } })
    },
    applyZones () {
      const a = this; const b = this.chart; const c = b.renderer; const d = this.zones; let e; let f; const g = this.clips || []; let h; const i = this.graph; const k = this.area; const j = v(b.chartWidth, b.chartHeight); const m = this[(this.zoneAxis ||
'y') + 'Axis']; let l; const n = m.reversed; const q = b.inverted; const r = m.horiz; let C; let z; let u; let y = !1; if (d.length && (i || k) && m.min !== s) {
        i && i.hide(), k && k.hide(), l = m.getExtremes(), o(d, function (d, o) {
          e = n ? r ? b.plotWidth : 0 : r ? 0 : m.toPixels(l.min); e = E(v(p(f, e), 0), j); f = E(v(x(m.toPixels(p(d.value, l.max), !0)), 0), j); y && (e = f = m.toPixels(l.max)); C = Math.abs(e - f); z = E(e, f); u = v(e, f); if (m.isXAxis) { if (h = { x: q ? u : z, y: 0, width: C, height: j }, !r) { h.x = b.plotHeight - h.x } } else if (h = { x: 0, y: q ? u : z, width: j, height: C }, r) { h.y = b.plotWidth - h.y }b.inverted && c.isVML && (h = m.isXAxis ? {
            x: 0,
            y: n
              ? z : u,
            height: h.width,
            width: b.chartWidth
          } : { x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight }); g[o] ? g[o].animate(h) : (g[o] = c.clipRect(h), i && a['zoneGraph' + o].clip(g[o]), k && a['zoneArea' + o].clip(g[o])); y = d.value > l.max
        }), this.clips = g
      }
    },
    invertGroups () {
      function a () { const a = { width: b.yAxis.len, height: b.xAxis.len }; o(['group', 'markerGroup'], function (c) { b[c] && b[c].attr(a).invert() }) } var b = this; const c = b.chart; if (b.xAxis) {
        A(c, 'resize', a), A(b, 'destroy', function () { V(c, 'resize', a) }), a(), b.invertGroups =
a
      }
    },
    plotGroup (a, b, c, d, e) { let f = this[a]; const g = !f; g && (this[a] = f = this.chart.renderer.g(b).attr({ visibility: c, zIndex: d || 0.1 }).add(e), f.addClass('highcharts-series-' + this.index)); f[g ? 'attr' : 'animate'](this.getPlotBox()); return f },
    getPlotBox () { const a = this.chart; let b = this.xAxis; let c = this.yAxis; if (a.inverted) { b = c, c = this.xAxis } return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 } },
    render () {
      const a = this; const b = a.chart; let c; const d = a.options; const e = (c = d.animation) && !!a.animate && b.renderer.isSVG &&
p(c.duration, 500) || 0; const f = a.visible ? 'visible' : 'hidden'; const g = d.zIndex; const h = a.hasRendered; const i = b.seriesGroup; c = a.plotGroup('group', 'series', f, g, i); a.markerGroup = a.plotGroup('markerGroup', 'markers', f, g, i); e && a.animate(!0); a.getAttribs(); c.inverted = a.isCartesian ? b.inverted : !1; a.drawGraph && (a.drawGraph(), a.applyZones()); o(a.points, function (a) { a.redraw && a.redraw() }); a.drawDataLabels && a.drawDataLabels(); a.visible && a.drawPoints(); a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker(); b.inverted && a.invertGroups()
      d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect); e && a.animate(); if (!h) { e ? a.animationTimeout = setTimeout(function () { a.afterAnimate() }, e) : a.afterAnimate() }a.isDirty = a.isDirtyData = !1; a.hasRendered = !0
    },
    redraw () {
      const a = this.chart; const b = this.isDirtyData; const c = this.isDirty; const d = this.group; const e = this.xAxis; const f = this.yAxis; d && (a.inverted && d.attr({ width: a.plotWidth, height: a.plotHeight }), d.animate({ translateX: p(e && e.left, a.plotLeft), translateY: p(f && f.top, a.plotTop) })); this.translate(); this.render(); b && O(this, 'updatedData');
      (c || b) && delete this.kdTree
    },
    kdDimensions: 1,
    kdAxisArray: ['clientX', 'plotY'],
    searchPoint (a, b) { const c = this.xAxis; const d = this.yAxis; const e = this.chart.inverted; return this.searchKDTree({ clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos }, b) },
    buildKDTree () {
      function a (b, d, g) { let h, i; if (i = b && b.length) { return h = c.kdAxisArray[d % g], b.sort(function (a, b) { return a[h] - b[h] }), i = Math.floor(i / 2), { point: b[i], left: a(b.slice(0, i), d + 1, g), right: a(b.slice(i + 1), d + 1, g) } } } function b () {
        const b =
gb(c.points || [], function (a) { return a.y !== null }); c.kdTree = a(b, d, d)
      } var c = this; var d = c.kdDimensions; delete c.kdTree; c.options.kdSync ? b() : setTimeout(b)
    },
    searchKDTree (a, b) {
      function c (a, b, k, j) {
        const m = b.point; let l = d.kdAxisArray[k % j]; let n; let q; let r = m; q = t(a[e]) && t(m[e]) ? (a[e] - m[e]) ** 2 : null; n = t(a[f]) && t(m[f]) ? (a[f] - m[f]) ** 2 : null; n = (q || 0) + (n || 0); m.dist = t(n) ? Math.sqrt(n) : Number.MAX_VALUE; m.distX = t(q) ? Math.sqrt(q) : Number.MAX_VALUE; l = a[l] - m[l]; n = l < 0 ? 'left' : 'right'; q = l < 0 ? 'right' : 'left'; b[n] && (n = c(a, b[n],
          k + 1, j), r = n[g] < r[g] ? n : m); b[q] && Math.sqrt(l * l) < r[g] && (a = c(a, b[q], k + 1, j), r = a[g] < r[g] ? a : r); return r
      } var d = this; var e = this.kdAxisArray[0]; var f = this.kdAxisArray[1]; var g = b ? 'distX' : 'dist'; this.kdTree || this.buildKDTree(); if (this.kdTree) { return c(a, this.kdTree, this.kdDimensions, this.kdDimensions) }
    }
  }; Sb.prototype = {
    destroy () { Ma(this, this.axis) },
    render (a) {
      const b = this.options; var c = b.format; var c = c ? La(c, this) : b.formatter.call(this); this.label ? this.label.attr({ text: c, visibility: 'hidden' }) : this.label = this.axis.chart.renderer.text(c,
        null, null, b.useHTML).css(b.style).attr({ align: this.textAlign, rotation: b.rotation, visibility: 'hidden' }).add(a)
    },
    setOffset (a, b) {
      var c = this.axis; const d = c.chart; let e = d.inverted; var f = c.reversed; var f = this.isNegative && !f || !this.isNegative && f; const g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1); var c = c.translate(0); var c = Q(g - c); const h = d.xAxis[0].translate(this.x) + a; const i = d.plotHeight; var f = { x: e ? f ? g : g - c : h, y: e ? i - h - b : f ? i - g - c : i - g, width: e ? c : b, height: e ? b : c }; if (e = this.label) {
        e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop ===
!1 || d.isInsidePlot(f.x, f.y) ? 'show' : 'hide'](!0)
      }
    }
  }; Ha.prototype.getStacks = function () { const a = this; o(a.yAxis, function (a) { if (a.stacks && a.hasVisibleSeries) { a.oldStacks = a.stacks } }); o(a.series, function (b) { if (b.options.stacking && (b.visible === !0 || a.options.chart.ignoreHiddenSeries === !1)) { b.stackKey = b.type + p(b.options.stack, '') } }) }; H.prototype.buildStacks = function () {
    const a = this.series; const b = p(this.options.reversedStacks, !0); let c = a.length; if (!this.isXAxis) {
      for (this.usePercentage = !1; c--;) { a[b ? c : a.length - c - 1].setStackedPoints() }
      if (this.usePercentage) { for (c = 0; c < a.length; c++) { a[c].setPercentStacks() } }
    }
  }; H.prototype.renderStackTotals = function () { let a = this.chart; const b = a.renderer; const c = this.stacks; let d; let e; let f = this.stackTotalGroup; if (!f) { this.stackTotalGroup = f = b.g('stack-labels').attr({ visibility: 'visible', zIndex: 6 }).add() } f.translate(a.plotLeft, a.plotTop); for (d in c) { for (e in a = c[d], a) { a[e].render(f) } } }; H.prototype.resetStacks = function () {
    const a = this.stacks; let b; let c; if (!this.isXAxis) {
      for (b in a) {
        for (c in a[b]) {
          a[b][c].touched < this.stacksTouched ? (a[b][c].destroy(),
          delete a[b][c]) : (a[b][c].total = null, a[b][c].cum = 0)
        }
      }
    }
  }; H.prototype.cleanStacks = function () { let a, b, c; if (!this.isXAxis) { if (this.oldStacks) { a = this.stacks = this.oldStacks } for (b in a) { for (c in a[b]) { a[b][c].cum = a[b][c].total } } } }; P.prototype.setStackedPoints = function () {
    if (this.options.stacking && !(this.visible !== !0 && this.chart.options.chart.ignoreHiddenSeries !== !1)) {
      const a = this.processedXData; const b = this.processedYData; const c = []; const d = b.length; var e = this.options; const f = e.threshold; const g = e.startFromThreshold ? f : 0; const h = e.stack; var e = e.stacking; const i = this.stackKey
      const k = '-' + i; const j = this.negStacks; const m = this.yAxis; const l = m.stacks; const n = m.oldStacks; let q; let r; let o; let z; let u; let y; let s; m.stacksTouched += 1; for (u = 0; u < d; u++) {
        y = a[u]; s = b[u]; q = this.getStackIndicator(q, y, this.index); z = q.key; o = (r = j && s < (g ? 0 : f)) ? k : i; l[o] || (l[o] = {}); if (!l[o][y]) { n[o] && n[o][y] ? (l[o][y] = n[o][y], l[o][y].total = null) : l[o][y] = new Sb(m, m.options.stackLabels, r, y, h) }o = l[o][y]; o.points[z] = [p(o.cum, g)]; o.touched = m.stacksTouched; e === 'percent' ? (r = r ? i : k, j && l[r] && l[r][y] ? (r = l[r][y], o.total = r.total = v(r.total, o.total) + Q(s) || 0) : o.total = la(o.total + (Q(s) ||
0))) : o.total = la(o.total + (s || 0)); o.cum = p(o.cum, g) + (s || 0); o.points[z].push(o.cum); c[u] = o.cum
      } if (e === 'percent') { m.usePercentage = !0 } this.stackedYData = c; m.oldStacks = {}
    }
  }; P.prototype.setPercentStacks = function () { const a = this; const b = a.stackKey; const c = a.yAxis.stacks; const d = a.processedXData; let e; o([b, '-' + b], function (b) { let f; for (var g = d.length, h, i; g--;) { if (h = d[g], e = a.getStackIndicator(e, h, a.index), f = (i = c[b] && c[b][h]) && i.points[e.key], h = f) { i = i.total ? 100 / i.total : 0, h[0] = la(h[0] * i), h[1] = la(h[1] * i), a.stackedYData[g] = h[1] } } }) }; P.prototype.getStackIndicator =
function (a, b, c) { !t(a) || a.x !== b ? a = { x: b, index: 0 } : a.index++; a.key = [c, b, a.index].join(','); return a }; w(Ha.prototype, {
    addSeries (a, b, c) { let d; const e = this; a && (b = p(b, !0), O(e, 'addSeries', { options: a }, function () { d = e.initSeries(a); e.isDirtyLegend = !0; e.linkSeries(); b && e.redraw(c) })); return d },
    addAxis (a, b, c, d) { const e = b ? 'xAxis' : 'yAxis'; const f = this.options; new H(this, B(a, { index: this[e].length, isX: b })); f[e] = na(f[e] || {}); f[e].push(a); p(c, !0) && this.redraw(d) },
    showLoading (a) {
      const b = this; const c = b.options; let d =
b.loadingDiv; const e = c.loading; const f = function () { d && G(d, { left: b.plotLeft + 'px', top: b.plotTop + 'px', width: b.plotWidth + 'px', height: b.plotHeight + 'px' }) }; if (!d) { b.loadingDiv = d = aa(Ta, { className: 'highcharts-loading' }, w(e.style, { zIndex: 10, display: $ }), b.container), b.loadingSpan = aa('span', null, e.labelStyle, d), A(b, 'redraw', f) }b.loadingSpan.innerHTML = a || c.lang.loading; if (!b.loadingShown) { G(d, { opacity: 0, display: '' }), rb(d, { opacity: e.style.opacity }, { duration: e.showDuration || 0 }), b.loadingShown = !0 }f()
    },
    hideLoading () {
      const a =
this.options; const b = this.loadingDiv; b && rb(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete () { G(b, { display: $ }) } }); this.loadingShown = !1
    }
  }); w(Da.prototype, {
    update (a, b, c, d) {
      function e () {
        f.applyOptions(a); if (f.y === null && h) { f.graphic = h.destroy() } if (ha(a) && !Ja(a)) { f.redraw = function () { if (h && h.element && a && a.marker && a.marker.symbol) { f.graphic = h.destroy() } if (a && a.dataLabels && f.dataLabel) { f.dataLabel = f.dataLabel.destroy() }f.redraw = null } }i = f.index; g.updateParallelArrays(f, i); if (m && f.name) {
          m[f.x] =
f.name
        }j.data[i] = f.options; g.isDirty = g.isDirtyData = !0; if (!g.fixedBox && g.hasCartesianSeries) { k.isDirtyBox = !0 } if (j.legendType === 'point') { k.isDirtyLegend = !0 }b && k.redraw(c)
      } var f = this; var g = f.series; var h = f.graphic; let i; var k = g.chart; var j = g.options; var m = g.xAxis && g.xAxis.names; var b = p(b, !0); d === !1 ? e() : f.firePointEvent('update', { options: a }, e)
    },
    remove (a, b) { this.series.removePoint(Oa(this, this.series.data), a, b) }
  }); w(P.prototype, {
    addPoint (a, b, c, d) {
      const e = this; const f = e.options; const g = e.data; var h = e.graph; let i = e.area; const k = e.chart; const j = e.xAxis &&
e.xAxis.names; const m = h && h.shift || 0; let l = ['graph', 'area']; var h = f.data; let n; const q = e.xData; Xa(d, k); if (c) { for (d = e.zones.length; d--;) { l.push('zoneGraph' + d, 'zoneArea' + d) }o(l, function (a) { if (e[a]) { e[a].shift = m + (f.step ? 2 : 1) } }) } if (i) { i.isArea = !0 }b = p(b, !0); i = { series: e }; e.pointClass.prototype.applyOptions.apply(i, [a]); l = i.x; d = q.length; if (e.requireSorting && l < q[d - 1]) { for (n = !0; d && q[d - 1] > l;) { d-- } }e.updateParallelArrays(i, 'splice', d, 0, 0); e.updateParallelArrays(i, d); if (j && i.name) { j[l] = i.name }h.splice(d, 0, a); n && (e.data.splice(d, 0, null), e.processData())
      f.legendType === 'point' && e.generatePoints(); c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), e.updateParallelArrays(i, 'shift'), h.shift())); e.isDirty = !0; e.isDirtyData = !0; b && (e.getAttribs(), k.redraw())
    },
    removePoint (a, b, c) {
      const d = this; const e = d.data; const f = e[a]; const g = d.points; const h = d.chart; const i = function () { e.length === g.length && g.splice(a, 1); e.splice(a, 1); d.options.data.splice(a, 1); d.updateParallelArrays(f || { series: d }, 'splice', a, 1); f && f.destroy(); d.isDirty = !0; d.isDirtyData = !0; b && h.redraw() }; Xa(c, h); b = p(b, !0); f ? f.firePointEvent('remove',
        null, i) : i()
    },
    remove (a, b) { const c = this; const d = c.chart; var a = p(a, !0); if (!c.isRemoving) { c.isRemoving = !0, O(c, 'remove', null, function () { c.destroy(); d.isDirtyLegend = d.isDirtyBox = !0; d.linkSeries(); a && d.redraw(b) }) }c.isRemoving = !1 },
    update (a, b) {
      const c = this; const d = this.chart; const e = this.userOptions; const f = this.type; const g = K[f].prototype; const h = ['group', 'markerGroup', 'dataLabelsGroup']; let i; if (a.type && a.type !== f || a.zIndex !== void 0) { h.length = 0 }o(h, function (a) { h[a] = c[a]; delete c[a] }); a = B(e, { animation: !1, index: this.index, pointStart: this.xData[0] },
        { data: this.options.data }, a); this.remove(!1); for (i in g) { this[i] = s } w(this, K[a.type || f].prototype); o(h, function (a) { c[a] = h[a] }); this.init(d, a); d.linkSeries(); p(b, !0) && d.redraw(!1)
    }
  }); w(H.prototype, {
    update (a, b) { const c = this.chart; var a = c.options[this.coll][this.options.index] = B(this.userOptions, a); this.destroy(!0); this._addedPlotLB = this.chart._labelPanes = s; this.init(c, w(a, { events: s })); c.isDirtyBox = !0; p(b, !0) && c.redraw() },
    remove (a) {
      for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) {
        d[e] &&
d[e].remove(!1)
      }ta(b.axes, this); ta(b[c], this); b.options[c].splice(this.options.index, 1); o(b[c], function (a, b) { a.options.index = b }); this.destroy(); b.isDirtyBox = !0; p(a, !0) && b.redraw()
    },
    setTitle (a, b) { this.update({ title: a }, b) },
    setCategories (a, b) { this.update({ categories: a }, b) }
  }); let Ea = ia(P); K.line = Ea; W.area = B(S, { softThreshold: !1, threshold: 0 }); let xa = ia(P, {
    type: 'area',
    getSegments () {
      const a = this; let b = []; const c = []; const d = []; const e = this.xAxis; const f = this.yAxis; const g = f.stacks[this.stackKey]; const h = {}; let i; let k; const j = this.points
      const m = this.options.connectNulls; let l; let n; let q; if (this.options.stacking && !this.cropped) { for (n = 0; n < j.length; n++) { h[j[n].x] = j[n] } for (q in g) { g[q].total !== null && d.push(+q) }d.sort(function (a, b) { return a - b }); o(d, function (b) { let d = null; let j; if (!m || h[b] && h[b].y !== null) { if (h[b]) { c.push(h[b]) } else { for (n = a.index; n <= f.series.length; n++) { if (l = a.getStackIndicator(null, b, n), j = g[b].points[l.key]) { d = j[1]; break } }i = e.translate(b); k = f.getThreshold(d); c.push({ y: null, plotX: i, clientX: i, plotY: k, yBottom: k, onMouseOver: ka }) } } }); c.length && b.push(c) } else {
        P.prototype.getSegments.call(this),
        b = this.segments
      } this.segments = b
    },
    getSegmentPath (a) { const b = P.prototype.getSegmentPath.call(this, a); const c = [].concat(b); let d; const e = this.options; d = b.length; const f = this.yAxis.getThreshold(e.threshold); let g; d === 3 && c.push('L', b[1], b[2]); if (e.stacking && !this.closedStacks) { for (d = a.length - 1; d >= 0; d--) { g = p(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g) } } else { this.closeSegment(c, a, f) } this.areaPath = this.areaPath.concat(c); return b },
    closeSegment (a, b, c) {
      a.push('L', b[b.length - 1].plotX,
        c, 'L', b[0].plotX, c)
    },
    drawGraph () { this.areaPath = []; P.prototype.drawGraph.apply(this); const a = this; const b = this.areaPath; const c = this.options; const d = [['area', this.color, c.fillColor]]; o(this.zones, function (b, f) { d.push(['zoneArea' + f, b.color || a.color, b.fillColor || c.fillColor]) }); o(d, function (d) { const f = d[0]; const g = a[f]; g ? g.animate({ d: b }) : a[f] = a.chart.renderer.path(b).attr({ fill: p(d[2], va(d[1]).setOpacity(p(c.fillOpacity, 0.75)).get()), zIndex: 0 }).add(a.group) }) },
    drawLegendSymbol: M.drawRectangle
  }); K.area = xa; W.spline = B(S)
  Ea = ia(P, {
    type: 'spline',
    getPointSpline (a, b, c) {
      const d = b.plotX; const e = b.plotY; const f = a[c - 1]; var g = a[c + 1]; let h; let i; let k; let j; if (f && g) { a = f.plotY; k = g.plotX; var g = g.plotY; let m; h = (1.5 * d + f.plotX) / 2.5; i = (1.5 * e + a) / 2.5; k = (1.5 * d + k) / 2.5; j = (1.5 * e + g) / 2.5; m = (j - i) * (k - d) / (k - h) + e - j; i += m; j += m; i > a && i > e ? (i = v(a, e), j = 2 * e - i) : i < a && i < e && (i = E(a, e), j = 2 * e - i); j > g && j > e ? (j = v(g, e), i = 2 * e - j) : j < g && j < e && (j = E(g, e), i = 2 * e - j); b.rightContX = k; b.rightContY = j }c ? (b = ['C', f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e], f.rightContX = f.rightContY = null) : b = ['M',
        d, e]; return b
    }
  }); K.spline = Ea; W.areaspline = B(W.area); xa = xa.prototype; Ea = ia(Ea, { type: 'areaspline', closedStacks: !0, getSegmentPath: xa.getSegmentPath, closeSegment: xa.closeSegment, drawGraph: xa.drawGraph, drawLegendSymbol: M.drawRectangle }); K.areaspline = Ea; W.column = B(S, {
    borderColor: '#FFFFFF',
    borderRadius: 0,
    groupPadding: 0.2,
    marker: null,
    pointPadding: 0.1,
    minPointLength: 0,
    cropThreshold: 50,
    pointRange: null,
    states: { hover: { brightness: 0.1, shadow: !1, halo: !1 }, select: { color: '#C0C0C0', borderColor: '#000000', shadow: !1 } },
    dataLabels: { align: null, verticalAlign: null, y: null },
    softThreshold: !1,
    startFromThreshold: !0,
    stickyTracking: !1,
    tooltip: { distance: 6 },
    threshold: 0
  }); Ea = ia(P, {
    type: 'column',
    pointAttrToOptions: { stroke: 'borderColor', fill: 'color', r: 'borderRadius' },
    cropShoulder: 0,
    directTouch: !0,
    trackerGroups: ['group', 'dataLabelsGroup'],
    negStacks: !0,
    init () { P.prototype.init.apply(this, arguments); const a = this; const b = a.chart; b.hasRendered && o(b.series, function (b) { if (b.type === a.type) { b.isDirty = !0 } }) },
    getColumnMetrics () {
      const a =
this; var b = a.options; const c = a.xAxis; const d = a.yAxis; const e = c.reversed; let f; const g = {}; let h; let i = 0; b.grouping === !1 ? i = 1 : o(a.chart.series, function (b) { const c = b.options; const e = b.yAxis; if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos) { c.stacking ? (f = b.stackKey, g[f] === s && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h } }); const k = E(Q(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len); const j = k * b.groupPadding; const m = (k - 2 * j) / i; var b = E(b.maxPointWidth || c.len, p(b.pointWidth, m * (1 - 2 * b.pointPadding))); return a.columnMetrics =
{ width: b, offset: (m - b) / 2 + (j + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * m - k / 2) * (e ? -1 : 1) }
    },
    crispCol (a, b, c, d) { const e = this.chart; var f = this.borderWidth; let g = -(f % 2 ? 0.5 : 0); var f = f % 2 ? 0.5 : 1; e.inverted && e.renderer.isVML && (f += 1); c = Math.round(a + c) + g; a = Math.round(a) + g; c -= a; g = Q(b) <= 0.5; d = Math.round(b + d) + f; b = Math.round(b) + f; d -= b; g && (b -= 1, d += 1); return { x: a, y: b, width: c, height: d } },
    translate () {
      const a = this; const b = a.chart; const c = a.options; const d = a.borderWidth = p(c.borderWidth, a.closestPointRange * a.xAxis.transA < 2 ? 0 : 1); const e = a.yAxis
      let f = a.translatedThreshold = e.getThreshold(c.threshold); const g = p(c.minPointLength, 5); const h = a.getColumnMetrics(); const i = h.width; let k = a.barW = v(i, 1 + 2 * d); const j = a.pointXOffset = h.offset; b.inverted && (f -= 0.5); c.pointPadding && (k = za(k)); P.prototype.translate.apply(a); o(a.points, function (c) {
        const d = E(p(c.yBottom, f), 9e4); var h = 999 + Q(d); var h = E(v(-h, c.plotY), e.len + h); const q = c.plotX + j; const r = k; let o = E(h, d); let z; let u = v(h, d) - o; Q(u) < g && g && (u = g, z = !e.reversed && !c.negative || e.reversed && c.negative, o = Q(o - f) > g ? d - g : f - (z ? g : 0)); c.barX = q; c.pointWidth = i; c.tooltipPos = b.inverted
          ? [e.len + e.pos - b.plotLeft - h, a.xAxis.len - q - r / 2, u] : [q + r / 2, h + e.pos - b.plotTop, u]; c.shapeType = 'rect'; c.shapeArgs = a.crispCol(q, o, r, u)
      })
    },
    getSymbol: ka,
    drawLegendSymbol: M.drawRectangle,
    drawGraph: ka,
    drawPoints () {
      const a = this; const b = this.chart; const c = a.options; const d = b.renderer; const e = c.animationLimit || 250; let f; let g; o(a.points, function (h) {
        let i = h.plotY; const k = h.graphic; if (i !== s && !isNaN(i) && h.y !== null) {
          f = h.shapeArgs, i = t(a.borderWidth) ? { 'stroke-width': a.borderWidth } : {}, g = h.pointAttr[h.selected ? 'select' : ''] || a.pointAttr[''], k ? ($a(k), k.attr(i)[b.pointCount <
e ? 'animate' : 'attr'](B(f))) : h.graphic = d[h.shapeType](f).attr(i).attr(g).add(h.group || a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius)
        } else if (k) { h.graphic = k.destroy() }
      })
    },
    animate (a) { const b = this.yAxis; const c = this.options; const d = this.chart.inverted; const e = {}; if (ea) { a ? (e.scaleY = 0.001, a = E(b.pos + b.len, v(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? 'translateX' : 'translateY'] = b.pos, this.group.animate(e, this.options.animation), this.animate = null) } },
    remove () { const a = this; const b = a.chart; b.hasRendered && o(b.series, function (b) { if (b.type === a.type) { b.isDirty = !0 } }); P.prototype.remove.apply(a, arguments) }
  }); K.column = Ea; W.bar = B(W.column); xa = ia(Ea, { type: 'bar', inverted: !0 }); K.bar = xa; W.scatter = B(S, { lineWidth: 0, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">\u25CF</span> <span style="font-size: 10px;"> {series.name}</span><br/>', pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>' } }); xa = ia(P, {
    type: 'scatter',
    sorted: !1,
    requireSorting: !1,
    noSharedTooltip: !0,
    trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
    takeOrdinalPosition: !1,
    kdDimensions: 2,
    drawGraph () { this.options.lineWidth && P.prototype.drawGraph.call(this) }
  }); K.scatter = xa; W.pie = B(S, {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    center: [null, null],
    clip: !1,
    colorByPoint: !0,
    dataLabels: { distance: 30, enabled: !0, formatter () { return this.y === null ? void 0 : this.point.name }, x: 0 },
    ignoreHiddenPoint: !0,
    legendType: 'point',
    marker: null,
    size: null,
    showInLegend: !1,
    slicedOffset: 10,
    states: { hover: { brightness: 0.1, shadow: !1 } },
    stickyTracking: !1,
    tooltip: { followPointer: !0 }
  }); S = {
    type: 'pie',
    isCartesian: !1,
    pointClass: ia(Da, {
      init () { Da.prototype.init.apply(this, arguments); const a = this; let b; a.name = p(a.name, 'Slice'); b = function (b) { a.slice(b.type === 'select') }; A(a, 'select', b); A(a, 'unselect', b); return a },
      setVisible (a, b) {
        const c = this; const d = c.series; const e = d.chart; const f = d.options.ignoreHiddenPoint; var b = p(b, f); if (a !== c.visible) {
          c.visible = c.options.visible = a = a === s ? !c.visible : a; d.options.data[Oa(c, d.data)] =
c.options; o(['graphic', 'dataLabel', 'connector', 'shadowGroup'], function (b) { if (c[b]) { c[b][a ? 'show' : 'hide'](!0) } }); c.legendItem && e.legend.colorizeItem(c, a); !a && c.state === 'hover' && c.setState(''); if (f) { d.isDirty = !0 }b && e.redraw()
        }
      },
      slice (a, b, c) { const d = this.series; Xa(c, d.chart); p(b, !0); this.sliced = this.options.sliced = a = t(a) ? a : !this.sliced; d.options.data[Oa(this, d.data)] = this.options; a = a ? this.slicedTranslation : { translateX: 0, translateY: 0 }; this.graphic.animate(a); this.shadowGroup && this.shadowGroup.animate(a) },
      haloPath (a) { const b = this.shapeArgs; const c = this.series.chart; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, { innerR: this.shapeArgs.r, start: b.start, end: b.end }) }
    }),
    requireSorting: !1,
    directTouch: !0,
    noSharedTooltip: !0,
    trackerGroups: ['group', 'dataLabelsGroup'],
    axisTypes: [],
    pointAttrToOptions: { stroke: 'borderColor', 'stroke-width': 'borderWidth', fill: 'color' },
    animate (a) {
      const b = this; const c = b.points; const d = b.startAngleRad; if (!a) {
        o(c, function (a) {
          const c =
a.graphic; const g = a.shapeArgs; c && (c.attr({ r: a.startR || b.center[3] / 2, start: d, end: d }), c.animate({ r: g.r, start: g.start, end: g.end }, b.options.animation))
        }), b.animate = null
      }
    },
    updateTotals () { let a; let b = 0; const c = this.points; const d = c.length; let e; const f = this.options.ignoreHiddenPoint; for (a = 0; a < d; a++) { e = c[a], b += f && !e.visible ? 0 : e.y } this.total = b; for (a = 0; a < d; a++) { e = c[a], e.percentage = b > 0 && (e.visible || !f) ? e.y / b * 100 : 0, e.total = b } },
    generatePoints () { P.prototype.generatePoints.call(this); this.updateTotals() },
    translate (a) {
      this.generatePoints()
      let b = 0; var c = this.options; const d = c.slicedOffset; let e = d + c.borderWidth; let f; let g; let h; var i = c.startAngle || 0; const k = this.startAngleRad = ua / 180 * (i - 90); var i = (this.endAngleRad = ua / 180 * (p(c.endAngle, i + 360) - 90)) - k; const j = this.points; const m = c.dataLabels.distance; var c = c.ignoreHiddenPoint; let l; const n = j.length; let q; if (!a) { this.center = a = this.getCenter() } this.getX = function (b, c) { h = Y.asin(E((b - a[1]) / (a[2] / 2 + m), 1)); return a[0] + (c ? -1 : 1) * ba(h) * (a[2] / 2 + m) }; for (l = 0; l < n; l++) {
        q = j[l]; f = k + b * i; if (!c || q.visible) { b += q.percentage / 100 }g = k + b * i; q.shapeType = 'arc'; q.shapeArgs = {
          x: a[0],
          y: a[1],
          r: a[2] / 2,
          innerR: a[3] / 2,
          start: x(f * 1e3) / 1e3,
          end: x(g * 1e3) / 1e3
        }; h = (g + f) / 2; h > 1.5 * ua ? h -= 2 * ua : h < -ua / 2 && (h += 2 * ua); q.slicedTranslation = { translateX: x(ba(h) * d), translateY: x(ga(h) * d) }; f = ba(h) * a[2] / 2; g = ga(h) * a[2] / 2; q.tooltipPos = [a[0] + f * 0.7, a[1] + g * 0.7]; q.half = h < -ua / 2 || h > ua / 2 ? 1 : 0; q.angle = h; e = E(e, m / 2); q.labelPos = [a[0] + f + ba(h) * m, a[1] + g + ga(h) * m, a[0] + f + ba(h) * e, a[1] + g + ga(h) * e, a[0] + f, a[1] + g, m < 0 ? 'center' : q.half ? 'right' : 'left', h]
      }
    },
    drawGraph: null,
    drawPoints () {
      const a = this; const b = a.chart.renderer; let c; let d; const e = a.options.shadow
      let f; let g; let h; if (e && !a.shadowGroup) { a.shadowGroup = b.g('shadow').add(a.group) }o(a.points, function (i) {
        if (i.y !== null) {
          d = i.graphic; g = i.shapeArgs; f = i.shadowGroup; if (e && !f) { f = i.shadowGroup = b.g('shadow').add(a.shadowGroup) }c = i.sliced ? i.slicedTranslation : { translateX: 0, translateY: 0 }; f && f.attr(c); if (d) { d.setRadialReference(a.center).animate(w(g, c)) } else {
            h = { 'stroke-linejoin': 'round' }; if (!i.visible) { h.visibility = 'hidden' }i.graphic = d = b[i.shapeType](g).setRadialReference(a.center).attr(i.pointAttr[i.selected ? 'select' : '']).attr(h).attr(c).add(a.group).shadow(e,
              f)
          }
        }
      })
    },
    searchPoint: ka,
    sortByAngle (a, b) { a.sort(function (a, d) { return a.angle !== void 0 && (d.angle - a.angle) * b }) },
    drawLegendSymbol: M.drawRectangle,
    getCenter: hc.getCenter,
    getSymbol: ka
  }; S = ia(P, S); K.pie = S; P.prototype.drawDataLabels = function () {
    const a = this; const b = a.options; const c = b.cursor; let d = b.dataLabels; const e = a.points; let f; let g; const h = a.hasRendered || 0; let i; let k; const j = a.chart.renderer; if (d.enabled || a._hasPointLabels) {
      a.dlProcessOptions && a.dlProcessOptions(d), k = a.plotGroup('dataLabelsGroup', 'data-labels', d.defer ? 'hidden' : 'visible', d.zIndex ||
6), p(d.defer, !0) && (k.attr({ opacity: +h }), h || A(a, 'afterAnimate', function () { a.visible && k.show(); k[b.animation ? 'animate' : 'attr']({ opacity: 1 }, { duration: 200 }) })), g = d, o(e, function (e) {
        let h; let n = e.dataLabel; let q; let r; const o = e.connector; let z = !0; let u; const y = {}; f = e.dlOptions || e.options && e.options.dataLabels; h = p(f && f.enabled, g.enabled); if (n && !h) { e.dataLabel = n.destroy() } else if (h) {
          d = B(g, f); u = d.style; h = d.rotation; q = e.getLabelConfig(); i = d.format ? La(d.format, q) : d.formatter.call(q, d); u.color = p(d.color, u.color, a.color, 'black'); if (n) {
            if (t(i)) {
              n.attr({ text: i }),
              z = !1
            } else if (e.dataLabel = n = n.destroy(), o) { e.connector = o.destroy() }
          } else if (t(i)) { n = { fill: d.backgroundColor, stroke: d.borderColor, 'stroke-width': d.borderWidth, r: d.borderRadius || 0, rotation: h, padding: d.padding, zIndex: 1 }; if (u.color === 'contrast') { y.color = d.inside || d.distance < 0 || b.stacking ? j.getContrast(e.color || a.color) : '#000000' } if (c) { y.cursor = c } for (r in n) { n[r] === s && delete n[r] }n = e.dataLabel = j[h ? 'text' : 'label'](i, 0, -999, d.shape, null, null, d.useHTML).attr(n).css(w(u, y)).add(k).shadow(d.shadow) }n && a.alignDataLabel(e,
            n, d, null, z)
        }
      })
    }
  }; P.prototype.alignDataLabel = function (a, b, c, d, e) {
    const f = this.chart; let g = f.inverted; const h = p(a.plotX, -999); const i = p(a.plotY, -999); const k = b.getBBox(); const j = f.renderer.fontMetrics(c.style.fontSize).b; let m = this.visible && (a.series.forceDL || f.isInsidePlot(h, x(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)); if (m) {
      d = w({ x: g ? f.plotWidth - i : h, y: x(g ? f.plotHeight - h : i), width: 0, height: 0 }, d), w(c, { width: k.width, height: k.height }), c.rotation ? (a = f.renderer.rotCorr(j, c.rotation), b[e ? 'attr' : 'animate']({
        x: d.x + c.x + d.width / 2 + a.x,
        y: d.y + c.y + d.height / 2
      }).attr({ align: c.align })) : (b.align(c, null, d), g = b.alignAttr, p(c.overflow, 'justify') === 'justify' ? this.justifyDataLabel(b, c, g, k, d, e) : p(c.crop, !0) && (m = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + k.width, g.y + k.height)), c.shape && b.attr({ anchorX: a.plotX, anchorY: a.plotY }))
    } if (!m) { $a(b), b.attr({ y: -999 }), b.placed = !1 }
  }; P.prototype.justifyDataLabel = function (a, b, c, d, e, f) {
    const g = this.chart; const h = b.align; const i = b.verticalAlign; let k; let j; const m = a.box ? 0 : a.padding || 0; k = c.x + m; if (k < 0) {
      h === 'right' ? b.align = 'left' : b.x = -k, j =
!0
    }k = c.x + d.width - m; if (k > g.plotWidth) { h === 'left' ? b.align = 'right' : b.x = g.plotWidth - k, j = !0 }k = c.y + m; if (k < 0) { i === 'bottom' ? b.verticalAlign = 'top' : b.y = -k, j = !0 }k = c.y + d.height - m; if (k > g.plotHeight) { i === 'top' ? b.verticalAlign = 'bottom' : b.y = g.plotHeight - k, j = !0 } if (j) { a.placed = !f, a.align(b, null, e) }
  }; if (K.pie) {
    K.pie.prototype.drawDataLabels = function () {
      const a = this; let b = a.data; let c; const d = a.chart; const e = a.options.dataLabels; const f = p(e.connectorPadding, 10); const g = p(e.connectorWidth, 1); const h = d.plotWidth; const i = d.plotHeight; let k; let j; const m = p(e.softConnector, !0); const l = e.distance
      const n = a.center; const q = n[2] / 2; const r = n[1]; const C = l > 0; let z; let u; let y; const s = [[], []]; let t; let w; let B; let D; let A; const F = [0, 0, 0, 0]; const K = function (a, b) { return b.y - a.y }; if (a.visible && (e.enabled || a._hasPointLabels)) {
        P.prototype.drawDataLabels.apply(a); o(b, function (a) { a.dataLabel && a.visible && s[a.half].push(a) }); for (D = 2; D--;) {
          const I = []; const M = []; const H = s[D]; let G = H.length; var J; if (G) {
            a.sortByAngle(H, D - 0.5); for (A = b = 0; !b && H[A];) { b = H[A] && H[A].dataLabel && (H[A].dataLabel.getBBox().height || 21), A++ } if (l > 0) {
              u = E(r + q + l, d.plotHeight); for (A = v(0, r - q - l); A <= u; A += b) { I.push(A) }u = I.length; if (G > u) {
                c = [].concat(H)
                c.sort(K); for (A = G; A--;) { c[A].rank = A } for (A = G; A--;) { H[A].rank >= u && H.splice(A, 1) }G = H.length
              } for (A = 0; A < G; A++) { c = H[A]; y = c.labelPos; c = 9999; var O, N; for (N = 0; N < u; N++) { O = Q(I[N] - y[1]), O < c && (c = O, J = N) } if (J < A && I[A] !== null) { J = A } else { for (u < G - A + J && I[A] !== null && (J = u - G + A); I[J] === null;) { J++ } }M.push({ i: J, y: I[J] }); I[J] = null }M.sort(K)
            } for (A = 0; A < G; A++) {
              c = H[A]; y = c.labelPos; z = c.dataLabel; B = c.visible === !1 ? 'hidden' : 'inherit'; c = y[1]; if (l > 0) { if (u = M.pop(), J = u.i, w = u.y, c > w && I[J + 1] !== null || c < w && I[J - 1] !== null) { w = E(v(0, c), d.plotHeight) } } else {
                w =
c
              }t = e.justify ? n[0] + (D ? -1 : 1) * (q + l) : a.getX(w === r - q - l || w === r + q + l ? c : w, D); z._attr = { visibility: B, align: y[6] }; z._pos = { x: t + e.x + ({ left: f, right: -f }[y[6]] || 0), y: w + e.y - 10 }; z.connX = t; z.connY = w; if (this.options.size === null) { u = z.width, t - u < f ? F[3] = v(x(u - t + f), F[3]) : t + u > h - f && (F[1] = v(x(t + u - h + f), F[1])), w - b / 2 < 0 ? F[0] = v(x(-w + b / 2), F[0]) : w + b / 2 > i && (F[2] = v(x(w + b / 2 - i), F[2])) }
            }
          }
        } if (Fa(F) === 0 || this.verifyDataLabelOverflow(F)) {
          this.placeDataLabels(), C && g && o(this.points, function (b) {
            k = b.connector; y = b.labelPos; if ((z = b.dataLabel) && z._pos &&
b.visible) { B = z._attr.visibility, t = z.connX, w = z.connY, j = m ? ['M', t + (y[6] === 'left' ? 5 : -5), w, 'C', t, w, 2 * y[2] - y[4], 2 * y[3] - y[5], y[2], y[3], 'L', y[4], y[5]] : ['M', t + (y[6] === 'left' ? 5 : -5), w, 'L', y[2], y[3], 'L', y[4], y[5]], k ? (k.animate({ d: j }), k.attr('visibility', B)) : b.connector = k = a.chart.renderer.path(j).attr({ 'stroke-width': g, stroke: e.connectorColor || b.color || '#606060', visibility: B }).add(a.dataLabelsGroup) } else if (k) { b.connector = k.destroy() }
          })
        }
      }
    }, K.pie.prototype.placeDataLabels = function () {
      o(this.points, function (a) {
        const b =
a.dataLabel; if (b && a.visible) { (a = b._pos) ? (b.attr(b._attr), b[b.moved ? 'animate' : 'attr'](a), b.moved = !0) : b && b.attr({ y: -999 }) }
      })
    }, K.pie.prototype.alignDataLabel = ka, K.pie.prototype.verifyDataLabelOverflow = function (a) {
      const b = this.center; const c = this.options; const d = c.center; const e = c.minSize || 80; let f = e; let g; d[0] !== null ? f = v(b[2] - v(a[1], a[3]), e) : (f = v(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2); d[1] !== null ? f = v(E(f, b[2] - v(a[0], a[2])), e) : (f = v(E(f, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2); f < b[2] ? (b[2] = f, b[3] = Math.min(/%$/.test(c.innerSize || 0)
        ? f * parseFloat(c.innerSize || 0) / 100 : parseFloat(c.innerSize || 0), f), this.translate(b), o(this.points, function (a) { if (a.dataLabel) { a.dataLabel._pos = null } }), this.drawDataLabels && this.drawDataLabels()) : g = !0; return g
    }
  } if (K.column) {
    K.column.prototype.alignDataLabel = function (a, b, c, d, e) {
      const f = this.chart.inverted; const g = a.series; const h = a.dlBox || a.shapeArgs; const i = p(a.below, a.plotY > p(this.translatedThreshold, g.yAxis.len)); const k = p(c.inside, !!this.options.stacking); if (h && (d = B(h), f && (d = {
        x: g.yAxis.len - d.y - d.height,
        y: g.xAxis.len - d.x - d.width,
        width: d.height,
        height: d.width
      }), !k)) { f ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0) }c.align = p(c.align, !f || k ? 'center' : i ? 'right' : 'left'); c.verticalAlign = p(c.verticalAlign, f || k ? 'middle' : i ? 'top' : 'bottom'); P.prototype.alignDataLabel.call(this, a, b, c, d, e)
    }
  }(function (a) {
    const b = a.Chart; const c = a.each; const d = a.pick; const e = HighchartsAdapter.addEvent; b.prototype.callbacks.push(function (a) {
      function b () {
        const e = []; c(a.series, function (a) {
          const b = a.options.dataLabels; const f = a.dataLabelCollections || ['dataLabel']; (b.enabled ||
a._hasPointLabels) && !b.allowOverlap && a.visible && c(f, function (b) { c(a.points, function (a) { if (a[b]) { a[b].labelrank = d(a.labelrank, a.shapeArgs && a.shapeArgs.height), e.push(a[b]) } }) })
        }); a.hideOverlappingLabels(e)
      }b(); e(a, 'redraw', b)
    }); b.prototype.hideOverlappingLabels = function (a) {
      const b = a.length; let d; let e; let k; let j; let m; let l; let n; for (e = 0; e < b; e++) { if (d = a[e]) { d.oldOpacity = d.opacity, d.newOpacity = 1 } }a.sort(function (a, b) { return (b.labelrank || 0) - (a.labelrank || 0) }); for (e = 0; e < b; e++) {
        k = a[e]; for (d = e + 1; d < b; ++d) {
          if (j = a[d], k && j && k.placed && j.placed &&
k.newOpacity !== 0 && j.newOpacity !== 0 && (m = k.alignAttr, l = j.alignAttr, n = 2 * (k.box ? 0 : k.padding), m = !(l.x > m.x + (k.width - n) || l.x + (j.width - n) < m.x || l.y > m.y + (k.height - n) || l.y + (j.height - n) < m.y))) { (k.labelrank < j.labelrank ? k : j).newOpacity = 0 }
        }
      }c(a, function (a) { let b, c; if (a) { c = a.newOpacity; if (a.oldOpacity !== c && a.placed) { c ? a.show(!0) : b = function () { a.hide() }, a.alignAttr.opacity = c, a[a.isOld ? 'animate' : 'attr'](a.alignAttr, null, b) }a.isOld = !0 } })
    }
  })(D); const jb = D.TrackerMixin = {
    drawTrackerPoint () {
      const a = this; const b = a.chart; const c = b.pointer
      const d = a.options.cursor; const e = d && { cursor: d }; const f = function (a) { for (var c = a.target, d; c && !d;) { d = c.point, c = c.parentNode } if (d !== s && d !== b.hoverPoint) { d.onMouseOver(a) } }; o(a.points, function (a) { if (a.graphic) { a.graphic.element.point = a } if (a.dataLabel) { a.dataLabel.element.point = a } }); if (!a._hasTracking) { o(a.trackerGroups, function (b) { if (a[b] && (a[b].addClass('highcharts-tracker').on('mouseover', f).on('mouseout', function (a) { c.onTrackerMouseOut(a) }).css(e), Za)) { a[b].on('touchstart', f) } }), a._hasTracking = !0 }
    },
    drawTrackerGraph () {
      const a =
this; const b = a.options; const c = b.trackByArea; const d = [].concat(c ? a.areaPath : a.graphPath); let e = d.length; const f = a.chart; const g = f.pointer; const h = f.renderer; const i = f.options.tooltip.snap; const k = a.tracker; var j = b.cursor; const m = j && { cursor: j }; var j = a.singlePoints; let l; const n = function () { if (f.hoverSeries !== a) { a.onMouseOver() } }; const q = 'rgba(192,192,192,' + (ea ? 1.0e-4 : 0.002) + ')'; if (e && !c) { for (l = e + 1; l--;) { d[l] === 'M' && d.splice(l + 1, 0, d[l + 1] - i, d[l + 2], 'L'), (l && d[l] === 'M' || l === e) && d.splice(l, 0, 'L', d[l - 2] + i, d[l - 1]) } } for (l = 0; l < j.length; l++) { e = j[l], d.push('M', e.plotX - i, e.plotY, 'L', e.plotX + i, e.plotY) }
      k ? k.attr({ d }) : (a.tracker = h.path(d).attr({ 'stroke-linejoin': 'round', visibility: a.visible ? 'visible' : 'hidden', stroke: q, fill: c ? q : $, 'stroke-width': b.lineWidth + (c ? 0 : 2 * i), zIndex: 2 }).add(a.group), o([a.tracker, a.markerGroup], function (a) { a.addClass('highcharts-tracker').on('mouseover', n).on('mouseout', function (a) { g.onTrackerMouseOut(a) }).css(m); if (Za) { a.on('touchstart', n) } }))
    }
  }; if (K.column) { Ea.prototype.drawTracker = jb.drawTrackerPoint } if (K.pie) { K.pie.prototype.drawTracker = jb.drawTrackerPoint } if (K.scatter) {
    xa.prototype.drawTracker =
jb.drawTrackerPoint
  }w(sb.prototype, {
    setItemEvents (a, b, c, d, e) { const f = this; (c ? b : a.legendGroup).on('mouseover', function () { a.setState('hover'); b.css(f.options.itemHoverStyle) }).on('mouseout', function () { b.css(a.visible ? d : e); a.setState() }).on('click', function (b) { const c = function () { a.setVisible && a.setVisible() }; var b = { browserEvent: b }; a.firePointEvent ? a.firePointEvent('legendItemClick', b, c) : O(a, 'legendItemClick', b, c) }) },
    createCheckboxForItem (a) {
      a.checkbox = aa('input', {
        type: 'checkbox',
        checked: a.selected,
        defaultChecked: a.selected
      }, this.options.itemCheckboxStyle, this.chart.container); A(a.checkbox, 'click', function (b) { O(a.series || a, 'checkboxClick', { checked: b.target.checked, item: a }, function () { a.select() }) })
    }
  }); N.legend.itemStyle.cursor = 'pointer'; w(Ha.prototype, {
    showResetZoom () {
      const a = this; const b = N.lang; const c = a.options.chart.resetZoomButton; const d = c.theme; const e = d.states; const f = c.relativeTo === 'chart' ? null : 'plotBox'; this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () { a.zoomOut() }, d, e && e.hover).attr({
        align: c.position.align,
        title: b.resetZoomTitle
      }).add().align(c.position, !1, f)
    },
    zoomOut () { const a = this; O(a, 'selection', { resetSelection: !0 }, function () { a.zoom() }) },
    zoom (a) {
      let b; const c = this.pointer; let d = !1; let e; !a || a.resetSelection ? o(this.axes, function (a) { b = a.zoom() }) : o(a.xAxis.concat(a.yAxis), function (a) { const e = a.axis; const h = e.isXAxis; if (c[h ? 'zoomX' : 'zoomY'] || c[h ? 'pinchX' : 'pinchY']) { b = e.zoom(a.min, a.max), e.displayBtn && (d = !0) } }); e = this.resetZoomButton; if (d && !e) { this.showResetZoom() } else if (!d && ha(e)) { this.resetZoomButton = e.destroy() }
      b && this.redraw(p(this.options.chart.animation, a && a.animation, this.pointCount < 100))
    },
    pan (a, b) {
      const c = this; const d = c.hoverPoints; let e; d && o(d, function (a) { a.setState() }); o(b === 'xy' ? [1, 0] : [1], function (b) {
        const d = a[b ? 'chartX' : 'chartY']; const h = c[b ? 'xAxis' : 'yAxis'][0]; var i = c[b ? 'mouseDownX' : 'mouseDownY']; var k = (h.pointRange || 0) / 2; const j = h.getExtremes(); const m = h.toValue(i - d, !0) + k; var k = h.toValue(i + c[b ? 'plotWidth' : 'plotHeight'] - d, !0) - k; var i = i > d; if (h.series.length && (i || m > E(j.dataMin, j.min)) && (!i || k < v(j.dataMax, j.max))) {
          h.setExtremes(m, k, !1,
            !1, { trigger: 'pan' }), e = !0
        }c[b ? 'mouseDownX' : 'mouseDownY'] = d
      }); e && c.redraw(!1); G(c.container, { cursor: 'move' })
    }
  }); w(Da.prototype, {
    select (a, b) {
      const c = this; const d = c.series; const e = d.chart; var a = p(a, !c.selected); c.firePointEvent(a ? 'select' : 'unselect', { accumulate: b }, function () {
        c.selected = c.options.selected = a; d.options.data[Oa(c, d.data)] = c.options; c.setState(a && 'select'); b || o(e.getSelectedPoints(), function (a) {
          if (a.selected && a !== c) {
            a.selected = a.options.selected = !1, d.options.data[Oa(a, d.data)] = a.options, a.setState(''),
            a.firePointEvent('unselect')
          }
        })
      })
    },
    onMouseOver (a, b) { const c = this.series; const d = c.chart; const e = d.tooltip; const f = d.hoverPoint; if (d.hoverSeries !== c) { c.onMouseOver() } if (f && f !== this) { f.onMouseOut() } if (this.series && (this.firePointEvent('mouseOver'), e && (!e.shared || c.noSharedTooltip) && e.refresh(this, a), this.setState('hover'), !b)) { d.hoverPoint = this } },
    onMouseOut () { const a = this.series.chart; const b = a.hoverPoints; this.firePointEvent('mouseOut'); if (!b || Oa(this, b) === -1) { this.setState(), a.hoverPoint = null } },
    importEvents () {
      if (!this.hasImportedEvents) {
        const a =
B(this.series.options.point, this.options).events; let b; this.events = a; for (b in a) { A(this, b, a[b]) } this.hasImportedEvents = !0
      }
    },
    setState (a, b) {
      let c = T(this.plotX); const d = this.plotY; const e = this.series; const f = e.options.states; let g = W[e.type].marker && e.options.marker; const h = g && !g.enabled; const i = g && g.states[a]; const k = i && i.enabled === !1; let j = e.stateMarkerGraphic; let m = this.marker || {}; const l = e.chart; let n = e.halo; let q; var a = a || ''; q = this.pointAttr[a] || e.pointAttr[a]; if (!(a === this.state && !b || this.selected && a !== 'select' || f[a] && f[a].enabled === !1 || a && (k || h && i.enabled ===
!1) || a && m.states && m.states[a] && m.states[a].enabled === !1)) {
        if (this.graphic) { g = g && this.graphic.symbolName && q.r, this.graphic.attr(B(q, g ? { x: c - g, y: d - g, width: 2 * g, height: 2 * g } : {})), j && j.hide() } else { if (a && i) { if (g = i.radius, m = m.symbol || e.symbol, j && j.currentSymbol !== m && (j = j.destroy()), j) { j[b ? 'animate' : 'attr']({ x: c - g, y: d - g }) } else if (m) { e.stateMarkerGraphic = j = l.renderer.symbol(m, c - g, d - g, 2 * g, 2 * g).attr(q).add(e.markerGroup), j.currentSymbol = m } } if (j) { j[a && l.isInsidePlot(c, d, l.inverted) ? 'show' : 'hide'](), j.element.point = this } } if ((c =
f[a] && f[a].halo) && c.size) { if (!n) { e.halo = n = l.renderer.path().add(l.seriesGroup) }n.attr(w({ fill: va(this.color || e.color).setOpacity(c.opacity).get() }, c.attributes))[b ? 'animate' : 'attr']({ d: this.haloPath(c.size) }) } else { n && n.attr({ d: [] }) } this.state = a
      }
    },
    haloPath (a) { const b = this.series; const c = b.chart; const d = b.getPlotBox(); const e = c.inverted; return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, a * 2, a * 2) }
  }); w(P.prototype, {
    onMouseOver () {
      const a =
this.chart; const b = a.hoverSeries; if (b && b !== this) { b.onMouseOut() } this.options.events.mouseOver && O(this, 'mouseOver'); this.setState('hover'); a.hoverSeries = this
    },
    onMouseOut () { const a = this.options; const b = this.chart; const c = b.tooltip; const d = b.hoverPoint; b.hoverSeries = null; if (d) { d.onMouseOut() } this && a.events.mouseOut && O(this, 'mouseOut'); c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide(); this.setState() },
    setState (a) {
      var b = this.options; const c = this.graph; const d = b.states; let e = b.lineWidth; var b = 0; var a = a || ''; if (this.state !==
a && (this.state = a, !(d[a] && d[a].enabled === !1) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle))) { a = { 'stroke-width': e }; for (c.attr(a); this['zoneGraph' + b];) { this['zoneGraph' + b].attr(a), b += 1 } }
    },
    setVisible (a, b) {
      const c = this; const d = c.chart; const e = c.legendItem; let f; const g = d.options.chart.ignoreHiddenSeries; const h = c.visible; f = (c.visible = a = c.userOptions.visible = a === s ? !h : a) ? 'show' : 'hide'; o(['group', 'dataLabelsGroup', 'markerGroup', 'tracker'], function (a) { if (c[a]) { c[a][f]() } }); if (d.hoverSeries === c || (d.hoverPoint &&
d.hoverPoint.series) === c) { c.onMouseOut() }e && d.legend.colorizeItem(c, a); c.isDirty = !0; c.options.stacking && o(d.series, function (a) { if (a.options.stacking && a.visible) { a.isDirty = !0 } }); o(c.linkedSeries, function (b) { b.setVisible(a, !1) }); if (g) { d.isDirtyBox = !0 }b !== !1 && d.redraw(); O(c, f)
    },
    show () { this.setVisible(!0) },
    hide () { this.setVisible(!1) },
    select (a) { this.selected = a = a === s ? !this.selected : a; if (this.checkbox) { this.checkbox.checked = a } O(this, a ? 'select' : 'unselect') },
    drawTracker: jb.drawTrackerGraph
  })
  R(P.prototype, 'init', function (a) { let b; a.apply(this, Array.prototype.slice.call(arguments, 1)); (b = this.xAxis) && b.options.ordinal && A(this, 'updatedData', function () { delete b.ordinalIndex }) }); R(H.prototype, 'getTimeTicks', function (a, b, c, d, e, f, g, h) {
    let i = 0; var k = 0; let j; const m = {}; let l; let n; let q; let r = []; let o = -Number.MAX_VALUE; const p = this.options.tickPixelInterval; if (!this.options.ordinal && !this.options.breaks || !f || f.length < 3 || c === s) { return a.call(this, b, c, d, e) } for (n = f.length; k < n; k++) {
      q = k && f[k - 1] > d; f[k] < c && (i = k); if (k === n - 1 || f[k + 1] - f[k] > g * 5 ||
q) { if (f[k] > o) { for (j = a.call(this, b, f[i], f[k], e); j.length && j[0] <= o;) { j.shift() }j.length && (o = j[j.length - 1]); r = r.concat(j) }i = k + 1 } if (q) { break }
    }a = j.info; if (h && a.unitRange <= J.hour) { k = r.length - 1; for (i = 1; i < k; i++) { ja('%d', r[i]) !== ja('%d', r[i - 1]) && (m[r[i]] = 'day', l = !0) }l && (m[r[0]] = 'day'); a.higherRanks = m }r.info = a; if (h && t(p)) {
      var h = a = r.length; var k = []; let u; for (l = []; h--;) { i = this.translate(r[h]), u && (l[h] = u - i), k[h] = u = i }l.sort(); l = l[T(l.length / 2)]; l < p * 0.6 && (l = null); h = r[a - 1] > d ? a - 1 : a; for (u = void 0; h--;) {
        i = k[h], d = u - i, u && d < p * 0.8 && (l ===
null || d < l * 0.8) ? (m[r[h]] && !m[r[h + 1]] ? (d = h + 1, u = i) : d = h, r.splice(d, 1)) : u = i
      }
    } return r
  }); w(H.prototype, {
    beforeSetTickPositions () {
      let a; let b = []; let c = !1; let d; let e = this.getExtremes(); const f = e.min; let g = e.max; let h; const i = this.isXAxis && !!this.options.breaks; if ((e = this.options.ordinal) || i) {
        o(this.series, function (c, d) { if (c.visible !== !1 && (c.takeOrdinalPosition !== !1 || i)) { if (b = b.concat(c.processedXData), a = b.length, b.sort(function (a, b) { return a - b }), a) { for (d = a - 1; d--;) { b[d] === b[d + 1] && b.splice(d, 1) } } } }); a = b.length; if (a > 2) {
          d = b[1] - b[0]; for (h = a -
1; h-- && !c;) { b[h + 1] - b[h] !== d && (c = !0) } if (!this.options.keepOrdinalPadding && (b[0] - f > d || g - b[b.length - 1] > d)) { c = !0 }
        }c ? (this.ordinalPositions = b, d = this.val2lin(v(f, b[0]), !0), h = v(this.val2lin(E(g, b[b.length - 1]), !0), 1), this.ordinalSlope = g = (g - f) / (h - d), this.ordinalOffset = f - d * g) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = s
      } this.doPostTranslate = e && c || i; this.groupIntervalFactor = null
    },
    val2lin (a, b) {
      let c = this.ordinalPositions; if (c) {
        const d = c.length; let e; let f; for (e = d; e--;) { if (c[e] === a) { f = e; break } } for (e =
d - 1; e--;) { if (a > c[e] || e === 0) { c = (a - c[e]) / (c[e + 1] - c[e]); f = e + c; break } } return b ? f : this.ordinalSlope * (f || 0) + this.ordinalOffset
      } else { return a }
    },
    lin2val (a, b) { const c = this.ordinalPositions; if (c) { let d = this.ordinalSlope; const e = this.ordinalOffset; let f = c.length - 1; let g; let h; if (b) { a < 0 ? a = c[0] : a > f ? a = c[f] : (f = T(a), h = a - f) } else { for (;f--;) { if (g = d * f + e, a >= g) { d = d * (f + 1) + e; h = (a - g) / (d - g); break } } } return h !== s && c[f] !== s ? c[f] + (h ? h * (c[f + 1] - c[f]) : 0) : a } else { return a } },
    getExtendedPositions () {
      const a = this.chart; const b = this.series[0].currentDataGrouping
      let c = this.ordinalIndex; const d = b ? b.count + b.unitName : 'raw'; const e = this.getExtremes(); let f; let g; if (!c) { c = this.ordinalIndex = {} } if (!c[d]) {
        f = { series: [], getExtremes () { return { min: e.dataMin, max: e.dataMax } }, options: { ordinal: !0 }, val2lin: H.prototype.val2lin }, o(this.series, function (c) { g = { xAxis: f, xData: c.xData, chart: a, destroyGroupedData: ka }; g.options = { dataGrouping: b ? { enabled: !0, forced: !0, approximation: 'open', units: [[b.unitName, [b.count]]] } : { enabled: !1 } }; c.processData.apply(g); f.series.push(g) }), this.beforeSetTickPositions.apply(f),
        c[d] = f.ordinalPositions
      } return c[d]
    },
    getGroupIntervalFactor (a, b, c) { let d = 0; var c = c.processedXData; const e = c.length; const f = []; let g = this.groupIntervalFactor; if (!g) { for (;d < e - 1; d++) { f[d] = c[d + 1] - c[d] }f.sort(function (a, b) { return a - b }); d = f[T(e / 2)]; a = v(a, c[0]); b = E(b, c[e - 1]); this.groupIntervalFactor = g = e * d / (b - a) } return g },
    postProcessTickInterval (a) { const b = this.ordinalSlope; return b ? this.options.breaks ? this.closestPointRange : a / (b / this.closestPointRange) : a }
  }); R(Ha.prototype, 'pan', function (a, b) {
    const c = this.xAxis[0]
    const d = b.chartX; let e = !1; if (c.options.ordinal && c.series.length) {
      var f = this.mouseDownX; const g = c.getExtremes(); const h = g.dataMax; const i = g.min; const k = g.max; let j = this.hoverPoints; var m = c.closestPointRange; var f = (f - d) / (c.translationSlope * (c.ordinalSlope || m)); let l = { ordinalPositions: c.getExtendedPositions() }; var m = c.lin2val; const n = c.val2lin; let q; if (l.ordinalPositions) {
        if (Q(f) > 1) {
          j && o(j, function (a) { a.setState() }), f < 0 ? (j = l, q = c.ordinalPositions ? c : l) : (j = c.ordinalPositions ? c : l, q = l), l = q.ordinalPositions, h > l[l.length - 1] && l.push(h), this.fixedRange = k - i, f = c.toFixedRange(null,
            null, m.apply(j, [n.apply(j, [i, !0]) + f, !0]), m.apply(q, [n.apply(q, [k, !0]) + f, !0])), f.min >= E(g.dataMin, i) && f.max <= v(h, k) && c.setExtremes(f.min, f.max, !0, !1, { trigger: 'pan' }), this.mouseDownX = d, G(this.container, { cursor: 'move' })
        }
      } else { e = !0 }
    } else { e = !0 }e && a.apply(this, Array.prototype.slice.call(arguments, 1))
  }); R(P.prototype, 'getSegments', function (a) {
    let b; const c = this.options.gapSize; const d = this.xAxis; a.apply(this, Array.prototype.slice.call(arguments, 1)); if (c) {
      b = this.segments, o(b, function (a, f) {
        for (let g = a.length - 1; g--;) {
          if (a[g].x <
d.min && a[g + 1].x > d.max) { b.length = 0; break } else { a[g + 1].x - a[g].x > d.closestPointRange * c && b.splice(f + 1, 0, a.splice(g + 1, a.length - g)) }
        }
      })
    }
  }); (function (a) {
    function b () { return Array.prototype.slice.call(arguments, 1) } const c = a.pick; const d = a.wrap; const e = a.extend; const f = HighchartsAdapter.fireEvent; const g = a.Axis; const h = a.Series; e(g.prototype, {
      isInBreak (a, b) { var c = a.repeat || Infinity; const d = a.from; const e = a.to - a.from; var c = b >= d ? (b - d) % c : c - (d - b) % c; return a.inclusive ? c <= e : c < e && c !== 0 },
      isInAnyBreak (a, b) {
        const d = this.options.breaks; let e = d && d.length; let f
        let g; let h; if (e) { for (;e--;) { this.isInBreak(d[e], a) && (f = !0, g || (g = c(d[e].showPoints, this.isXAxis ? !1 : !0))) } h = f && b ? f && !g : f } return h
      }
    }); d(g.prototype, 'setTickPositions', function (a) { a.apply(this, Array.prototype.slice.call(arguments, 1)); if (this.options.breaks) { const b = this.tickPositions; const c = this.tickPositions.info; const d = []; let e; for (e = 0; e < b.length; e++) { this.isInAnyBreak(b[e]) || d.push(b[e]) } this.tickPositions = d; this.tickPositions.info = c } }); d(g.prototype, 'init', function (a, b, c) {
      if (c.breaks && c.breaks.length) { c.ordinal = !1 }a.call(this,
        b, c); if (this.options.breaks) {
        const d = this; d.doPostTranslate = !0; this.val2lin = function (a) { let b = a; let c; let e; for (e = 0; e < d.breakArray.length; e++) { if (c = d.breakArray[e], c.to <= a) { b -= c.len } else if (c.from >= a) { break } else if (d.isInBreak(c, a)) { b -= a - c.from; break } } return b }; this.lin2val = function (a) { let b, c; for (c = 0; c < d.breakArray.length; c++) { if (b = d.breakArray[c], b.from >= a) { break } else { b.to < a ? a += b.len : d.isInBreak(b, a) && (a += b.len) } } return a }; this.setExtremes = function (a, b, c, d, e) {
          for (;this.isInAnyBreak(a);) { a -= this.closestPointRange }
          for (;this.isInAnyBreak(b);) { b -= this.closestPointRange }g.prototype.setExtremes.call(this, a, b, c, d, e)
        }; this.setAxisTranslation = function (a) {
          g.prototype.setAxisTranslation.call(this, a); let b = d.options.breaks; var a = []; const c = []; let e = 0; let h; let i; let j = d.userMin || d.min; let k = d.userMax || d.max; let o; let p; for (p in b) { i = b[p], h = i.repeat || Infinity, d.isInBreak(i, j) && (j += i.to % h - j % h), d.isInBreak(i, k) && (k -= k % h - i.from % h) } for (p in b) {
            i = b[p]; o = i.from; for (h = i.repeat || Infinity; o - h > j;) { o -= h } for (;o < j;) { o += h } for (;o < k; o += h) {
              a.push({ value: o, move: 'in' }), a.push({
                value: o +
(i.to - i.from),
                move: 'out',
                size: i.breakSize
              })
            }
          }a.sort(function (a, b) { return a.value === b.value ? (a.move === 'in' ? 0 : 1) - (b.move === 'in' ? 0 : 1) : a.value - b.value }); b = 0; o = j; for (p in a) { i = a[p]; b += i.move === 'in' ? 1 : -1; if (b === 1 && i.move === 'in') { o = i.value }b === 0 && (c.push({ from: o, to: i.value, len: i.value - o - (i.size || 0) }), e += i.value - o - (i.size || 0)) }d.breakArray = c; f(d, 'afterBreaks'); d.transA *= (k - d.min) / (k - j - e); d.min = j; d.max = k
        }
      }
    }); d(h.prototype, 'generatePoints', function (a) {
      a.apply(this, b(arguments)); const c = this.xAxis; const d = this.yAxis
      const e = this.points; let f; let g = e.length; const h = this.options.connectNulls; let o; if (c && d && (c.options.breaks || d.options.breaks)) { for (;g--;) { if (f = e[g], o = f.y === null && h === !1, !o && (c.isInAnyBreak(f.x, !0) || d.isInAnyBreak(f.y, !0))) { e.splice(g, 1), this.data[g] && this.data[g].destroyElements() } } }
    }); d(a.seriesTypes.column.prototype, 'drawPoints', function (a) {
      a.apply(this); var a = this.points; const b = this.yAxis; const d = b.breakArray || []; const e = c(this.options.threshold, b.min); let g; let h; let q; let o; let p; let s; for (o = 0; o < a.length; o++) {
        h = a[o]; s = h.stackY || h.y; for (p = 0; p < d.length; p++) {
          q = d[p]
          g = !1; if (e < q.from && s > q.to || e > q.from && s < q.from) { g = 'pointBreak' } else if (e < q.from && s > q.from && s < q.to || e > q.from && s > q.to && s < q.from) { g = 'pointInBreak' }g && f(b, g, { point: h, brk: q })
        }
      }
    })
  })(D); const da = P.prototype; var S = Kb.prototype; const ic = da.processData; const jc = da.generatePoints; const kc = da.destroy; const lc = S.tooltipFooterHeaderFormatter; const mc = {
    approximation: 'average',
    groupPixelWidth: 2,
    dateTimeLabelFormats: {
      millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
      second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
      minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
      hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
      day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
      week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
      month: ['%B %Y', '%B', '-%B %Y'],
      year: ['%Y', '%Y', '-%Y']
    }
  }; const Wb = {
    line: {},
    spline: {},
    area: {},
    areaspline: {},
    column: { approximation: 'sum', groupPixelWidth: 10 },
    arearange: { approximation: 'range' },
    areasplinerange: { approximation: 'range' },
    columnrange: { approximation: 'range', groupPixelWidth: 10 },
    candlestick: {
      approximation: 'ohlc',
      groupPixelWidth: 10
    },
    ohlc: { approximation: 'ohlc', groupPixelWidth: 5 }
  }; const Xb = [['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ['second', [1, 2, 5, 10, 15, 30]], ['minute', [1, 2, 5, 10, 15, 30]], ['hour', [1, 2, 3, 4, 6, 8, 12]], ['day', [1]], ['week', [1]], ['month', [1, 3, 6]], ['year', null]]; var Pa = {
    sum (a) { let b = a.length; let c; if (!b && a.hasNulls) { c = null } else if (b) { for (c = 0; b--;) { c += a[b] } } return c },
    average (a) { const b = a.length; var a = Pa.sum(a); typeof a === 'number' && b && (a /= b); return a },
    open (a) {
      return a.length ? a[0] : a.hasNulls ? null
        : s
    },
    high (a) { return a.length ? Fa(a) : a.hasNulls ? null : s },
    low (a) { return a.length ? Ra(a) : a.hasNulls ? null : s },
    close (a) { return a.length ? a[a.length - 1] : a.hasNulls ? null : s },
    ohlc (a, b, c, d) { a = Pa.open(a); b = Pa.high(b); c = Pa.low(c); d = Pa.close(d); if (typeof a === 'number' || typeof b === 'number' || typeof c === 'number' || typeof d === 'number') { return [a, b, c, d] } },
    range (a, b) { a = Pa.low(a); b = Pa.high(b); if (typeof a === 'number' || typeof b === 'number') { return [a, b] } }
  }; da.groupData = function (a, b, c, d) {
    const e =
this.data; const f = this.options.data; const g = []; const h = []; const i = a.length; let k; let j; const m = !!b; const l = [[], [], [], []]; var d = typeof d === 'function' ? d : Pa[d]; const n = this.pointArrayMap; const q = n && n.length; let o; for (o = 0; o <= i; o++) { if (a[o] >= c[0]) { break } } for (;o <= i; o++) {
      for (;c[1] !== s && a[o] >= c[1] || o === i;) { if (k = c.shift(), j = d.apply(0, l), j !== s && (g.push(k), h.push(j)), l[0] = [], l[1] = [], l[2] = [], l[3] = [], o === i) { break } } if (o === i) { break } if (n) {
        k = this.cropStart + o; k = e && e[k] || this.pointClass.prototype.applyOptions.apply({ series: this }, [f[k]]); var p; for (j = 0; j < q; j++) {
          if (p = k[n[j]], typeof p === 'number') { l[j].push(p) } else if (p === null) { l[j].hasNulls = !0 }
        }
      } else if (k = m ? b[o] : null, typeof k === 'number') { l[0].push(k) } else if (k === null) { l[0].hasNulls = !0 }
    } return [g, h]
  }; da.processData = function () {
    var a = this.chart; const b = this.options; let c = b.dataGrouping; var d = this.allowDG !== !1 && c && p(c.enabled, a.options._stock); let e; this.forceCrop = d; this.groupPixelWidth = null; this.hasProcessed = !0; if (ic.apply(this, arguments) !== !1 && d) {
      this.destroyGroupedData(); var f = this.processedXData; var g = this.processedYData; var h = a.plotSizeX; var a = this.xAxis; var i = a.options.ordinal; var k = this.groupPixelWidth =
a.getGroupPixelWidth && a.getGroupPixelWidth(); var d = this.pointRange; if (k) {
        e = !0; this.points = null; var j = a.getExtremes(); var d = j.min; var j = j.max; var i = i && a.getGroupIntervalFactor(d, j, this) || 1; var h = k * (j - d) / h * i; var k = a.getTimeTicks(a.normalizeTimeTickInterval(h, c.units || Xb), d, j, a.options.startOfWeek, f, this.closestPointRange); var g = da.groupData.apply(this, [f, g, k, c.approximation]); var f = g[0]; var g = g[1]; if (c.smoothed) { c = f.length - 1; for (f[c] = Math.min(f[c], j); c-- && c > 0;) { f[c] += h / 2 }f[0] = Math.max(f[0], d) } this.currentDataGrouping = k.info; if (b.pointRange ===
null) { this.pointRange = k.info.totalRange } this.closestPointRange = k.info.totalRange; if (t(f[0]) && f[0] < a.dataMin) { if (a.min === a.dataMin) { a.min = f[0] }a.dataMin = f[0] } this.processedXData = f; this.processedYData = g
      } else { this.currentDataGrouping = null, this.pointRange = d } this.hasGroupedData = e
    }
  }; da.destroyGroupedData = function () { const a = this.groupedData; o(a || [], function (b, c) { b && (a[c] = b.destroy ? b.destroy() : null) }); this.groupedData = null }; da.generatePoints = function () {
    jc.apply(this); this.destroyGroupedData(); this.groupedData =
this.hasGroupedData ? this.points : null
  }; S.tooltipFooterHeaderFormatter = function (a, b) { let c = a.series; let d = c.tooltipOptions; let e = c.options.dataGrouping; let f = d.xDateFormat; let g; let h = c.xAxis; h && h.options.type === 'datetime' && e && ra(a.key) ? (c = c.currentDataGrouping, e = e.dateTimeLabelFormats, c ? (h = e[c.unitName], c.count === 1 ? f = h[0] : (f = h[1], g = h[2])) : !f && e && (f = this.getXDateFormat(a, d, h)), f = ja(f, a.key), g && (f += ja(g, a.key + c.totalRange - 1)), d = d[(b ? 'footer' : 'header') + 'Format'].replace('{point.key}', f)) : d = lc.call(this, a, b); return d }; da.destroy =
function () { for (let a = this.groupedData || [], b = a.length; b--;) { a[b] && a[b].destroy() }kc.apply(this) }; R(da, 'setOptions', function (a, b) { const c = a.call(this, b); const d = this.type; const e = this.chart.options.plotOptions; let f = W[d].dataGrouping; if (Wb[d]) { f || (f = B(mc, Wb[d])), c.dataGrouping = B(f, e.series && e.series.dataGrouping, e[d].dataGrouping, b.dataGrouping) } if (this.chart.options._stock) { this.requireSorting = !0 } return c }); R(H.prototype, 'setScale', function (a) { a.call(this); o(this.series, function (a) { a.hasProcessed = !1 }) }); H.prototype.getGroupPixelWidth =
function () { const a = this.series; let b = a.length; let c; let d = 0; let e = !1; let f; for (c = b; c--;) { (f = a[c].options.dataGrouping) && (d = v(d, f.groupPixelWidth)) } for (c = b; c--;) { if ((f = a[c].options.dataGrouping) && a[c].hasProcessed) { if (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && f.forced) { e = !0 } } } return e ? d : 0 }; H.prototype.setDataGrouping = function (a, b) {
    let c; var b = p(b, !0); a || (a = { forced: !1, units: null }); if (this instanceof H) { for (c = this.series.length; c--;) { this.series[c].update({ dataGrouping: a }, !1) } } else {
      o(this.chart.options.series,
        function (b) { b.dataGrouping = a }, !1)
    }b && this.chart.redraw()
  }; W.ohlc = B(W.column, { lineWidth: 1, tooltip: { pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' }, states: { hover: { lineWidth: 3 } }, threshold: null }); S = ia(K.column, {
    type: 'ohlc',
    pointArrayMap: ['open', 'high', 'low', 'close'],
    toYData (a) { return [a.open, a.high, a.low, a.close] },
    pointValKey: 'high',
    pointAttrToOptions: {
      stroke: 'color',
      'stroke-width': 'lineWidth'
    },
    upColorProp: 'stroke',
    getAttribs () { K.column.prototype.getAttribs.apply(this, arguments); var a = this.options; const b = a.states; var a = a.upColor || this.color; const c = B(this.pointAttr); const d = this.upColorProp; c[''][d] = a; c.hover[d] = b.hover.upColor || a; c.select[d] = b.select.upColor || a; o(this.points, function (a) { if (a.open < a.close && !a.options.color) { a.pointAttr = c } }) },
    translate () {
      const a = this.yAxis; K.column.prototype.translate.apply(this); o(this.points, function (b) {
        if (b.open !== null) {
          b.plotOpen =
a.translate(b.open, 0, 1, 0, 1)
        } if (b.close !== null) { b.plotClose = a.translate(b.close, 0, 1, 0, 1) }
      })
    },
    drawPoints () {
      const a = this; const b = a.chart; let c; let d; let e; let f; let g; let h; let i; let k; o(a.points, function (j) {
        if (j.plotY !== s) {
          i = j.graphic, c = j.pointAttr[j.selected ? 'selected' : ''] || a.pointAttr[''], f = c['stroke-width'] % 2 / 2, k = x(j.plotX) - f, g = x(j.shapeArgs.width / 2), h = ['M', k, x(j.yBottom), 'L', k, x(j.plotY)], j.open !== null && (d = x(j.plotOpen) + f, h.push('M', k, d, 'L', k - g, d)), j.close !== null && (e = x(j.plotClose) + f, h.push('M', k, e, 'L', k + g, e)), i ? i.attr(c).animate({ d: h })
            : j.graphic = b.renderer.path(h).attr(c).add(a.group)
        }
      })
    },
    animate: null
  }); K.ohlc = S; W.candlestick = B(W.column, { lineColor: 'black', lineWidth: 1, states: { hover: { lineWidth: 2 } }, tooltip: W.ohlc.tooltip, threshold: null, upColor: 'white' }); S = ia(S, {
    type: 'candlestick',
    pointAttrToOptions: { fill: 'color', stroke: 'lineColor', 'stroke-width': 'lineWidth' },
    upColorProp: 'fill',
    getAttribs () {
      K.ohlc.prototype.getAttribs.apply(this, arguments); const a = this.options; const b = a.states; let c = a.upLineColor || a.lineColor; const d = b.hover.upLineColor || c; const e =
b.select.upLineColor || c; o(this.points, function (a) { if (a.open < a.close) { if (a.lineColor) { a.pointAttr = B(a.pointAttr), c = a.lineColor }a.pointAttr[''].stroke = c; a.pointAttr.hover.stroke = d; a.pointAttr.select.stroke = e } })
    },
    drawPoints () {
      const a = this; const b = a.chart; let c; const d = a.pointAttr['']; let e; let f; let g; let h; let i; let k; let j; let m; let l; let n; let q; o(a.points, function (o) {
        l = o.graphic; if (o.plotY !== s) {
          c = o.pointAttr[o.selected ? 'selected' : ''] || d, j = c['stroke-width'] % 2 / 2, m = x(o.plotX) - j, e = o.plotOpen, f = o.plotClose, g = Y.min(e, f), h = Y.max(e, f), q = x(o.shapeArgs.width /
2), i = x(g) !== x(o.plotY), k = h !== o.yBottom, g = x(g) + j, h = x(h) + j, n = ['M', m - q, h, 'L', m - q, g, 'L', m + q, g, 'L', m + q, h, 'Z', 'M', m, g, 'L', m, i ? x(o.plotY) : g, 'M', m, h, 'L', m, k ? x(o.yBottom) : h], l ? l.attr(c).animate({ d: n }) : o.graphic = b.renderer.path(n).attr(c).add(a.group).shadow(a.options.shadow)
        }
      })
    }
  }); K.candlestick = S; const tb = qa.prototype.symbols; W.flags = B(W.column, {
    fillColor: 'white',
    lineWidth: 1,
    pointRange: 0,
    shape: 'flag',
    stackDistance: 12,
    states: { hover: { lineColor: 'black', fillColor: '#FCFFC5' } },
    style: {
      fontSize: '11px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    tooltip: { pointFormat: '{point.text}<br/>' },
    threshold: null,
    y: -30
  }); K.flags = ia(K.column, {
    type: 'flags',
    sorted: !1,
    noSharedTooltip: !0,
    allowDG: !1,
    takeOrdinalPosition: !1,
    trackerGroups: ['markerGroup'],
    forceCrop: !0,
    init: P.prototype.init,
    pointAttrToOptions: { fill: 'fillColor', stroke: 'color', 'stroke-width': 'lineWidth', r: 'radius' },
    translate () {
      K.column.prototype.translate.apply(this); const a = this.chart; const b = this.points; let c = b.length - 1; let d; let e; var f = this.options.onSeries; var f = (d = f && a.get(f)) && d.options.step
      const g = d && d.points; let h = g && g.length; const i = this.xAxis; const k = i.getExtremes(); let j; let m; let l; if (d && d.visible && h) { d = d.currentDataGrouping; m = g[h - 1].x + (d ? d.totalRange : 0); for (b.sort(function (a, b) { return a.x - b.x }); h-- && b[c];) { if (d = b[c], j = g[h], j.x <= d.x && j.plotY !== s) { if (d.x <= m) { d.plotY = j.plotY, j.x < d.x && !f && (l = g[h + 1]) && l.plotY !== s && (d.plotY += (d.x - j.x) / (l.x - j.x) * (l.plotY - j.plotY)) }c--; h++; if (c < 0) { break } } } }o(b, function (c, d) {
        let f; if (c.plotY === s) {
          c.x >= k.min && c.x <= k.max ? c.plotY = a.chartHeight - i.bottom - (i.opposite ? i.height : 0) + i.offset - a.plotTop
            : c.shapeArgs = {}
        } if ((e = b[d - 1]) && e.plotX === c.plotX) { if (e.stackIndex === s) { e.stackIndex = 0 }f = e.stackIndex + 1 }c.stackIndex = f
      })
    },
    drawPoints () {
      let a; const b = this.pointAttr['']; const c = this.points; const d = this.chart.renderer; let e; let f; const g = this.options; const h = g.y; let i; let k; let j; let m; let l; let n; for (k = c.length; k--;) {
        if (j = c[k], a = j.plotX > this.xAxis.len, e = j.plotX, e > 0 && (e -= p(j.lineWidth, g.lineWidth) % 2), m = j.stackIndex, i = j.options.shape || g.shape, f = j.plotY, f !== s && (f = j.plotY + h - (m !== s && m * g.stackDistance)), l = m ? s : j.plotX, n = m ? s : j.plotY, m = j.graphic, f !== s && e >= 0 && !a) {
          a =
j.pointAttr[j.selected ? 'select' : ''] || b, m ? m.attr({ x: e, y: f, r: a.r, anchorX: l, anchorY: n }) : j.graphic = d.label(j.options.title || g.title || 'A', e, f, i, l, n, g.useHTML).css(B(g.style, j.style)).attr(a).attr({ align: i === 'flag' ? 'left' : 'center', width: g.width, height: g.height }).add(this.markerGroup).shadow(g.shadow), j.tooltipPos = [e, f]
        } else if (m) { j.graphic = m.destroy() }
      }
    },
    drawTracker () {
      const a = this.points; jb.drawTrackerPoint.apply(this); o(a, function (b) {
        const c = b.graphic; c && A(c.element, 'mouseover', function () {
          if (b.stackIndex >
0 && !b.raised) { b._y = c.y, c.attr({ y: b._y - 8 }), b.raised = !0 }o(a, function (a) { if (a !== b && a.raised && a.graphic) { a.graphic.attr({ y: a._y }), a.raised = !1 } })
        })
      })
    },
    animate: ka,
    buildKDTree: ka,
    setClip: ka
  }); tb.flag = function (a, b, c, d, e) { return ['M', e && e.anchorX || a, e && e.anchorY || b, 'L', a, b + d, a, b, a + c, b, a + c, b + d, a, b + d, 'Z'] }; o(['circle', 'square'], function (a) { tb[a + 'pin'] = function (b, c, d, e, f) { const g = f && f.anchorX; var f = f && f.anchorY; a === 'circle' && e > d && (b -= x((e - d) / 2), d = e); b = tb[a](b, c, d, e); g && f && b.push('M', g, c > f ? c : c + e, 'L', g, f); return b } }); Va ===
D.VMLRenderer && o(['flag', 'circlepin', 'squarepin'], function (a) { ib.prototype.symbols[a] = tb[a] }); var S = [].concat(Xb); const ub = function (a) { const b = gb(arguments, function (a) { return typeof a === 'number' }); if (b.length) { return Math[a].apply(0, b) } }; S[4] = ['day', [1, 2, 3, 4]]; S[5] = ['week', [1, 2, 3]]; w(N, {
    navigator: {
      handles: { backgroundColor: '#ebe7e8', borderColor: '#b2b1b6' },
      height: 40,
      margin: 25,
      maskFill: 'rgba(128,179,236,0.3)',
      maskInside: !0,
      outlineColor: '#b2b1b6',
      outlineWidth: 1,
      series: {
        type: K.areaspline === s ? 'line' : 'areaspline',
        color: '#4572A7',
        compare: null,
        fillOpacity: 0.05,
        dataGrouping: { approximation: 'average', enabled: !0, groupPixelWidth: 2, smoothed: !0, units: S },
        dataLabels: { enabled: !1, zIndex: 2 },
        id: 'highcharts-navigator-series',
        lineColor: null,
        lineWidth: 1,
        marker: { enabled: !1 },
        pointRange: 0,
        shadow: !1,
        threshold: null
      },
      xAxis: { tickWidth: 0, lineWidth: 0, gridLineColor: '#EEE', gridLineWidth: 1, tickPixelInterval: 200, labels: { align: 'left', style: { color: '#888' }, x: 3, y: -4 }, crosshair: !1 },
      yAxis: {
        gridLineWidth: 0,
        startOnTick: !1,
        endOnTick: !1,
        minPadding: 0.1,
        maxPadding: 0.1,
        labels: { enabled: !1 },
        crosshair: !1,
        title: { text: null },
        tickWidth: 0
      }
    },
    scrollbar: { height: eb ? 20 : 14, barBackgroundColor: '#bfc8d1', barBorderRadius: 0, barBorderWidth: 1, barBorderColor: '#bfc8d1', buttonArrowColor: '#666', buttonBackgroundColor: '#ebe7e8', buttonBorderColor: '#bbb', buttonBorderRadius: 0, buttonBorderWidth: 1, minWidth: 6, rifleColor: '#666', trackBackgroundColor: '#eeeeee', trackBorderColor: '#eeeeee', trackBorderWidth: 1, liveRedraw: ea && !eb }
  }); Fb.prototype = {
    drawHandle (a, b) {
      const c = this.chart
      const d = c.renderer; const e = this.elementsToDestroy; const f = this.handles; var g = this.navigatorOptions.handles; var g = { fill: g.backgroundColor, stroke: g.borderColor, 'stroke-width': 1 }; let h; this.rendered || (f[b] = d.g('navigator-handle-' + ['left', 'right'][b]).css({ cursor: 'ew-resize' }).attr({ zIndex: 4 - b }).add(), h = d.rect(-4.5, 0, 9, 16, 0, 1).attr(g).add(f[b]), e.push(h), h = d.path(['M', -1.5, 4, 'L', -1.5, 12, 'M', 0.5, 4, 'L', 0.5, 12]).attr(g).add(f[b]), e.push(h)); f[b][c.isResizing ? 'animate' : 'attr']({
        translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(a,
          10),
        translateY: this.top + this.height / 2 - 8
      })
    },
    drawScrollbarButton (a) {
      const b = this.chart.renderer; const c = this.elementsToDestroy; const d = this.scrollbarButtons; const e = this.scrollbarHeight; const f = this.scrollbarOptions; let g; this.rendered || (d[a] = b.g().add(this.scrollbarGroup), g = b.rect(-0.5, -0.5, e + 1, e + 1, f.buttonBorderRadius, f.buttonBorderWidth).attr({ stroke: f.buttonBorderColor, 'stroke-width': f.buttonBorderWidth, fill: f.buttonBackgroundColor }).add(d[a]), c.push(g), g = b.path(['M', e / 2 + (a ? -1 : 1), e / 2 - 3, 'L', e / 2 + (a ? -1 : 1), e / 2 + 3, e / 2 + (a
        ? 2 : -2), e / 2]).attr({ fill: f.buttonArrowColor }).add(d[a]), c.push(g)); a && d[a].attr({ translateX: this.scrollerWidth - e })
    },
    render (a, b, c, d) {
      let e = this.chart; const f = e.renderer; let g; let h; let i; let k; let j = this.scrollbarGroup; var m = this.navigatorGroup; let l = this.scrollbar; var m = this.xAxis; let n = this.scrollbarTrack; const o = this.scrollbarHeight; const r = this.scrollbarEnabled; const s = this.navigatorOptions; const z = this.scrollbarOptions; let u = z.minWidth; const y = this.height; const w = this.top; const A = this.navigatorEnabled; const B = s.outlineWidth; const D = B / 2; let F = 0; const I = this.outlineHeight; const J = z.barBorderRadius; const H = z.barBorderWidth
      const G = w + D; let K; if (t(a) && !isNaN(a)) {
        this.navigatorLeft = g = p(m.left, e.plotLeft + o); this.navigatorWidth = h = p(m.len, e.plotWidth - 2 * o); this.scrollerLeft = i = g - o; this.scrollerWidth = k = k = h + 2 * o; m.getExtremes && (K = this.getUnionExtremes(!0)) && (K.dataMin !== m.min || K.dataMax !== m.max) && m.setExtremes(K.dataMin, K.dataMax, !0, !1); c = p(c, m.translate(a)); d = p(d, m.translate(b)); if (isNaN(c) || Q(c) === Infinity) { c = 0, d = k } if (!(m.translate(d, !0) - m.translate(c, !0) < e.xAxis[0].minRange)) {
          this.zoomedMax = E(v(c, d, 0), h); this.zoomedMin = v(this.fixedWidth
            ? this.zoomedMax - this.fixedWidth : E(c, d), 0); this.range = this.zoomedMax - this.zoomedMin; c = x(this.zoomedMax); b = x(this.zoomedMin); a = c - b; if (!this.rendered) {
            if (A) { this.navigatorGroup = m = f.g('navigator').attr({ zIndex: 3 }).add(), this.leftShade = f.rect().attr({ fill: s.maskFill }).add(m), s.maskInside ? this.leftShade.css({ cursor: 'ew-resize ' }) : this.rightShade = f.rect().attr({ fill: s.maskFill }).add(m), this.outline = f.path().attr({ 'stroke-width': B, stroke: s.outlineColor }).add(m) } if (r) {
              this.scrollbarGroup = j = f.g('scrollbar').add(),
              l = z.trackBorderWidth, this.scrollbarTrack = n = f.rect().attr({ x: 0, y: -l % 2 / 2, fill: z.trackBackgroundColor, stroke: z.trackBorderColor, 'stroke-width': l, r: z.trackBorderRadius || 0, height: o }).add(j), this.scrollbar = l = f.rect().attr({ y: -H % 2 / 2, height: o, fill: z.barBackgroundColor, stroke: z.barBorderColor, 'stroke-width': H, r: J }).add(j), this.scrollbarRifles = f.path().attr({ stroke: z.rifleColor, 'stroke-width': 1 }).add(j)
            }
          }e = e.isResizing ? 'animate' : 'attr'; if (A) {
            this.leftShade[e](s.maskInside ? { x: g + b, y: w, width: c - b, height: y } : {
              x: g,
              y: w,
              width: b,
              height: y
            }); if (this.rightShade) { this.rightShade[e]({ x: g + c, y: w, width: h - c, height: y }) } this.outline[e]({ d: ['M', i, G, 'L', g + b - D, G, g + b - D, G + I, 'L', g + c - D, G + I, 'L', g + c - D, G, i + k, G].concat(s.maskInside ? ['M', g + b + D, G, 'L', g + c - D, G] : []) }); this.drawHandle(b + D, 0); this.drawHandle(c + D, 1)
          } if (r && j) {
            this.drawScrollbarButton(0), this.drawScrollbarButton(1), j[e]({ translateX: i, translateY: x(G + y) }), n[e]({ width: k }), g = o + b, h = a - H, h < u && (F = (u - h) / 2, h = u, g -= F), this.scrollbarPad = F, l[e]({ x: T(g) + H % 2 / 2, width: h }), u = o + b + a / 2 - 0.5, this.scrollbarRifles.attr({
              visibility: a >
12 ? 'visible' : 'hidden'
            })[e]({ d: ['M', u - 3, o / 4, 'L', u - 3, 2 * o / 3, 'M', u, o / 4, 'L', u, 2 * o / 3, 'M', u + 3, o / 4, 'L', u + 3, 2 * o / 3] })
          } this.scrollbarPad = F; this.rendered = !0
        }
      }
    },
    addEvents () { const a = this.chart.container; const b = this.mouseDownHandler; const c = this.mouseMoveHandler; const d = this.mouseUpHandler; let e; e = [[a, 'mousedown', b], [a, 'mousemove', c], [document, 'mouseup', d]]; Za && e.push([a, 'touchstart', b], [a, 'touchmove', c], [document, 'touchend', d]); o(e, function (a) { A.apply(null, a) }); this._events = e },
    removeEvents () {
      o(this._events, function (a) {
        V.apply(null,
          a)
      }); this._events = s; this.navigatorEnabled && this.baseSeries && V(this.baseSeries, 'updatedData', this.updatedDataHandler)
    },
    init () {
      const a = this; const b = a.chart; let c; let d; const e = a.scrollbarHeight; const f = a.navigatorOptions; const g = a.height; let h = a.top; let i; let k; const j = a.baseSeries; a.mouseDownHandler = function (d) {
        var d = b.pointer.normalize(d); let e = a.zoomedMin; let f = a.zoomedMax; let h = a.top; const j = a.scrollbarHeight; const k = a.scrollerLeft; const l = a.scrollerWidth; const m = a.navigatorLeft; const o = a.navigatorWidth; const p = a.scrollbarPad; const s = a.range; const t = d.chartX; const v = d.chartY; var d = b.xAxis[0]; let w; const x = eb ? 10 : 7; if (v >
h && v < h + g + j) {
          if ((h = !a.scrollbarEnabled || v < h + g) && Y.abs(t - e - m) < x) { a.grabbedLeft = !0, a.otherHandlePos = f, a.fixedExtreme = d.max, b.fixedRange = null } else if (h && Y.abs(t - f - m) < x) { a.grabbedRight = !0, a.otherHandlePos = e, a.fixedExtreme = d.min, b.fixedRange = null } else if (t > m + e - p && t < m + f + p) { a.grabbedCenter = t, a.fixedWidth = s, i = t - e } else if (t > k && t < k + l) {
            f = h ? t - m - s / 2 : t < m ? e - s * 0.2 : t > k + l - j ? e + s * 0.2 : t < m + e ? e - s : f; if (f < 0) { f = 0 } else if (f + s >= o) { f = o - s, w = a.getUnionExtremes().dataMax } if (f !== e) {
              a.fixedWidth = s, e = c.toFixedRange(f, f + s, null, w), d.setExtremes(e.min,
                e.max, !0, !1, { trigger: 'navigator' })
            }
          }
        }
      }; a.mouseMoveHandler = function (c) {
        const d = a.scrollbarHeight; const e = a.navigatorLeft; const f = a.navigatorWidth; const g = a.scrollerLeft; const h = a.scrollerWidth; const j = a.range; let l; if (c.pageX !== 0) {
          c = b.pointer.normalize(c), l = c.chartX, l < e ? l = e : l > g + h - d && (l = g + h - d), a.grabbedLeft ? (k = !0, a.render(0, 0, l - e, a.otherHandlePos)) : a.grabbedRight ? (k = !0, a.render(0, 0, a.otherHandlePos, l - e)) : a.grabbedCenter && (k = !0, l < i ? l = i : l > f + i - j && (l = f + i - j), a.render(0, 0, l - i, l - i + j)), k && a.scrollbarOptions.liveRedraw && setTimeout(function () { a.mouseUpHandler(c) },
            0)
        }
      }; a.mouseUpHandler = function (d) { let e, f; if (k) { if (a.zoomedMin === a.otherHandlePos) { e = a.fixedExtreme } else if (a.zoomedMax === a.otherHandlePos) { f = a.fixedExtreme }e = c.toFixedRange(a.zoomedMin, a.zoomedMax, e, f); b.xAxis[0].setExtremes(e.min, e.max, !0, !1, { trigger: 'navigator', triggerOp: 'navigator-drag', DOMEvent: d }) } if (d.type !== 'mousemove') { a.grabbedLeft = a.grabbedRight = a.grabbedCenter = a.fixedWidth = a.fixedExtreme = a.otherHandlePos = k = i = null } }; const m = b.xAxis.length; const l = b.yAxis.length; b.extraBottomMargin = a.outlineHeight + f.margin
      a.navigatorEnabled ? (a.xAxis = c = new H(b, B({ breaks: j && j.xAxis.options.breaks, ordinal: j && j.xAxis.options.ordinal }, f.xAxis, { id: 'navigator-x-axis', isX: !0, type: 'datetime', index: m, height: g, offset: 0, offsetLeft: e, offsetRight: -e, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1 })), a.yAxis = d = new H(b, B(f.yAxis, { id: 'navigator-y-axis', alignTicks: !1, height: g, offset: 0, index: l, zoomEnabled: !1 })), j || f.series.data ? a.addBaseSeries() : b.series.length === 0 && R(b, 'redraw', function (c,
        d) { if (b.series.length > 0 && !a.series) { a.setBaseSeries(), b.redraw = c }c.call(b, d) })) : a.xAxis = c = { translate (a, c) { var d = b.xAxis[0]; const f = d.getExtremes(); const g = b.plotWidth - 2 * e; const h = ub('min', d.options.min, f.dataMin); var d = ub('max', d.options.max, f.dataMax) - h; return c ? a * d / g + h : g * (a - h) / d }, toFixedRange: H.prototype.toFixedRange }; R(b, 'getMargins', function (b) {
        const e = this.legend; const f = e.options; b.apply(this, [].slice.call(arguments, 1)); a.top = h = a.navigatorOptions.top || this.chartHeight - a.height - a.scrollbarHeight - this.spacing[2] - (f.verticalAlign ===
'bottom' && f.enabled && !f.floating ? e.legendHeight + p(f.margin, 10) : 0); if (c && d) { c.options.top = d.options.top = h, c.setAxisSize(), d.setAxisSize() }
      }); a.addEvents()
    },
    getUnionExtremes (a) { const b = this.chart.xAxis[0]; const c = this.xAxis; const d = c.options; const e = b.options; let f; if (!a || b.dataMin !== null) { f = { dataMin: p(d && d.min, ub('min', e.min, b.dataMin, c.dataMin)), dataMax: p(d && d.max, ub('max', e.max, b.dataMax, c.dataMax)) } } return f },
    setBaseSeries (a) {
      const b = this.chart; var a = a || b.options.navigator.baseSeries; this.series && this.series.remove()
      this.baseSeries = b.series[a] || typeof a === 'string' && b.get(a) || b.series[0]; this.xAxis && this.addBaseSeries()
    },
    addBaseSeries () {
      const a = this.baseSeries; let b = a ? a.options : {}; const c = b.data; const d = this.navigatorOptions.series; let e; e = d.data; this.hasNavigatorData = !!e; b = B(b, d, { enableMouseTracking: !1, group: 'nav', padXAxis: !1, xAxis: 'navigator-x-axis', yAxis: 'navigator-y-axis', name: 'Navigator', showInLegend: !1, isInternal: !0, visible: !0 }); b.data = e || c; this.series = this.chart.initSeries(b); if (a && this.navigatorOptions.adaptToUpdatedData !==
!1) { A(a, 'updatedData', this.updatedDataHandler), a.userOptions.events = w(a.userOptions.event, { updatedData: this.updatedDataHandler }) }
    },
    updatedDataHandler () {
      const a = this.chart.scroller; const b = a.baseSeries; const c = b.xAxis; var d = c.getExtremes(); const e = d.min; const f = d.max; const g = d.dataMin; var d = d.dataMax; const h = f - e; let i; let k; let j; let m; let l; const n = a.series; i = n.xData; const o = !!c.setExtremes; k = f >= i[i.length - 1] - (this.closestPointRange || 0); i = e <= g; if (!a.hasNavigatorData) { n.options.pointStart = b.xData[0], n.setData(b.options.data, !1), l = !0 }i && (m = g, j = m + h); k && (j = d, i || (m = v(j -
h, n.xData[0]))); o && (i || k) ? isNaN(m) || c.setExtremes(m, j, !0, !1, { trigger: 'updatedData' }) : (l && this.chart.redraw(!1), a.render(v(e, g), E(f, d)))
    },
    destroy () {
      this.removeEvents(); o([this.xAxis, this.yAxis, this.leftShade, this.rightShade, this.outline, this.scrollbarTrack, this.scrollbarRifles, this.scrollbarGroup, this.scrollbar], function (a) { a && a.destroy && a.destroy() }); this.xAxis = this.yAxis = this.leftShade = this.rightShade = this.outline = this.scrollbarTrack = this.scrollbarRifles = this.scrollbarGroup = this.scrollbar =
null; o([this.scrollbarButtons, this.handles, this.elementsToDestroy], function (a) { Ma(a) })
    }
  }; D.Scroller = Fb; R(H.prototype, 'zoom', function (a, b, c) { let d = this.chart; var e = d.options; const f = e.chart.zoomType; const g = e.navigator; var e = e.rangeSelector; let h; if (this.isXAxis && (g && g.enabled || e && e.enabled)) { if (f === 'x') { d.resetZoomButton = 'blocked' } else if (f === 'y') { h = !1 } else if (f === 'xy') { d = this.previousZoom, t(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom) } } return h !== s ? h : a.call(this, b, c) }); R(Ha.prototype,
    'init', function (a, b, c) { A(this, 'beforeRender', function () { const a = this.options; if (a.navigator.enabled || a.scrollbar.enabled) { this.scroller = new Fb(this) } }); a.call(this, b, c) }); R(P.prototype, 'addPoint', function (a, b, c, d, e) { const f = this.options.turboThreshold; f && this.xData.length > f && ha(b) && !Ja(b) && this.chart.scroller && oa(20, !0); a.call(this, b, c, d, e) }); w(N, {
    rangeSelector: {
      buttonTheme: {
        width: 28,
        height: 18,
        fill: '#f7f7f7',
        padding: 2,
        r: 0,
        'stroke-width': 0,
        style: { color: '#444', cursor: 'pointer', fontWeight: 'normal' },
        zIndex: 7,
        states: { hover: { fill: '#e7e7e7' }, select: { fill: '#e7f0f9', style: { color: 'black', fontWeight: 'bold' } } }
      },
      height: 35,
      inputPosition: { align: 'right' },
      labelStyle: { color: '#666' }
    }
  }); N.lang = B(N.lang, { rangeSelectorZoom: 'Zoom', rangeSelectorFrom: 'From', rangeSelectorTo: 'To' }); Gb.prototype = {
    clickButton (a, b) {
      const c = this; const d = c.selected; const e = c.chart; const f = c.buttons; const g = c.buttonOptions[a]; const h = e.xAxis[0]; var i = e.scroller && e.scroller.getUnionExtremes() || h || {}; let k = i.dataMin; let j = i.dataMax; let m; let l = h && x(E(h.max, p(j, h.max))); let n = g.type; let q; var i = g._range
      let r; let t; let w; const u = g.dataGrouping; if (!(k === null || j === null || a === c.selected)) {
        e.fixedRange = i; if (u) { this.forcedDataGrouping = !0, H.prototype.setDataGrouping.call(h || { chart: this.chart }, u, !1) } if (n === 'month' || n === 'year') { if (h) { if (n = { range: g, max: l, dataMin: k, dataMax: j }, m = h.minFromRange.call(n), typeof n.newMax === 'number') { l = n.newMax } } else { i = g } } else if (i) { m = v(l - i, k), l = E(m + i, j) } else if (n === 'ytd') {
          if (h) {
            if (j === s) { k = Number.MAX_VALUE, j = Number.MIN_VALUE, o(e.series, function (a) { a = a.xData; k = E(a[0], k); j = v(a[a.length - 1], j) }), b = !1 }l = new fa(j)
            m = l.getFullYear(); m = r = v(k || 0, fa.UTC(m, 0, 1)); l = l.getTime(); l = E(j || l, l)
          } else { A(e, 'beforeRender', function () { c.clickButton(a) }); return }
        } else { n === 'all' && h && (m = k, l = j) }f[d] && f[d].setState(0); f[a] && f[a].setState(2); h ? (h.setExtremes(m, l, p(b, 1), 0, { trigger: 'rangeSelectorButton', rangeSelectorButton: g }), c.setSelected(a)) : (q = e.options.xAxis[0], w = q.range, q.range = i, t = q.min, q.min = r, c.setSelected(a), A(e, 'load', function () { q.range = w; q.min = t }))
      }
    },
    setSelected (a) { this.selected = this.options.selected = a },
    defaultButtons: [{
      type: 'month',
      count: 1,
      text: '1m'
    }, { type: 'month', count: 3, text: '3m' }, { type: 'month', count: 6, text: '6m' }, { type: 'ytd', text: 'YTD' }, { type: 'year', count: 1, text: '1y' }, { type: 'all', text: 'All' }],
    init (a) {
      const b = this; const c = a.options.rangeSelector; const d = c.buttons || [].concat(b.defaultButtons); const e = c.selected; const f = b.blurInputs = function () { const a = b.minInput; const c = b.maxInput; a && a.blur && O(a, 'blur'); c && c.blur && O(c, 'blur') }; b.chart = a; b.options = c; b.buttons = []; a.extraTopMargin = c.height; b.buttonOptions = d; A(a.container, 'mousedown', f); A(a, 'resize', f)
      o(d, b.computeButtonRange); e !== s && d[e] && this.clickButton(e, !1); A(a, 'load', function () { A(a.xAxis[0], 'setExtremes', function (c) { this.max - this.min !== a.fixedRange && c.trigger !== 'rangeSelectorButton' && c.trigger !== 'updatedData' && b.forcedDataGrouping && this.setDataGrouping(!1, !1) }); A(a.xAxis[0], 'afterSetExtremes', function () { b.updateButtonStates(!0) }) })
    },
    updateButtonStates (a) {
      const b = this; const c = this.chart; const d = c.xAxis[0]; const e = c.scroller && c.scroller.getUnionExtremes() || d; const f = e.dataMin; const g = e.dataMax; const h = b.selected; const i = b.options.allButtonsEnabled
      const k = b.buttons; a && c.fixedRange !== x(d.max - d.min) && (k[h] && k[h].setState(0), b.setSelected(null)); o(b.buttonOptions, function (a, e) {
        const l = x(d.max - d.min); var n = a._range; const o = a.type; const p = a.count || 1; const s = n > g - f; const t = n < d.minRange; const u = a.type === 'all' && d.max - d.min >= g - f && k[e].state !== 2; const v = a.type === 'ytd' && ja('%Y', f) === ja('%Y', g); const w = c.renderer.forExport && e === h; var n = n === l; if ((o === 'month' || o === 'year') && l >= { month: 28, year: 365 }[o] * 864e5 * p && l <= { month: 31, year: 366 }[o] * 864e5 * p) { n = !0 }w || n && e !== h ? (b.setSelected(e), k[e].setState(2)) : !i && (s || t || u || v) ? k[e].setState(3)
          : k[e].state === 3 && k[e].setState(0)
      })
    },
    computeButtonRange (a) { const b = a.type; const c = a.count || 1; const d = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 }; if (d[b]) { a._range = d[b] * c } else if (b === 'month' || b === 'year') { a._range = { month: 30, year: 365 }[b] * 864e5 * c } },
    setInputValue (a, b) {
      const c = this.chart.options.rangeSelector; if (t(b)) { this[a + 'Input'].HCTime = b } this[a + 'Input'].value = ja(c.inputEditDateFormat || '%Y-%m-%d', this[a + 'Input'].HCTime); this[a + 'DateBox'].attr({
        text: ja(c.inputDateFormat || '%b %e, %Y',
          this[a + 'Input'].HCTime)
      })
    },
    showInput (a) { const b = this.inputGroup; const c = this[a + 'DateBox']; G(this[a + 'Input'], { left: b.translateX + c.x + 'px', top: b.translateY + 'px', width: c.width - 2 + 'px', height: c.height - 2 + 'px', border: '2px solid silver' }) },
    hideInput (a) { G(this[a + 'Input'], { border: 0, width: '1px', height: '1px' }); this.setInputValue(a) },
    drawInput (a) {
      const b = this; const c = b.chart; const d = c.renderer.style; let e = c.renderer; const f = c.options.rangeSelector; const g = b.div; const h = a === 'min'; let i; let k; const j = this.inputGroup; this[a + 'Label'] = k = e.label(N.lang[h
        ? 'rangeSelectorFrom' : 'rangeSelectorTo'], this.inputGroup.offset).attr({ padding: 2 }).css(B(d, f.labelStyle)).add(j); j.offset += k.width + 5; this[a + 'DateBox'] = e = e.label('', j.offset).attr({ padding: 2, width: f.inputBoxWidth || 90, height: f.inputBoxHeight || 17, stroke: f.inputBoxBorderColor || 'silver', 'stroke-width': 1 }).css(B({ textAlign: 'center', color: '#444' }, d, f.inputStyle)).on('click', function () { b.showInput(a); b[a + 'Input'].focus() }).add(j); j.offset += e.width + (h ? 10 : 0); this[a + 'Input'] = i = aa('input', {
        name: a,
        className: 'highcharts-range-selector',
        type: 'text'
      }, w({ position: 'absolute', border: 0, width: '1px', height: '1px', padding: 0, textAlign: 'center', fontSize: d.fontSize, fontFamily: d.fontFamily, top: c.plotTop + 'px' }, f.inputStyle), g); i.onfocus = function () { b.showInput(a) }; i.onblur = function () { b.hideInput(a) }; i.onchange = function () {
        const a = i.value; let d = (f.inputDateParser || fa.parse)(a); const e = c.xAxis[0]; const g = e.dataMin; const j = e.dataMax; isNaN(d) && (d = a.split('-'), d = fa.UTC(I(d[0]), I(d[1]) - 1, I(d[2]))); isNaN(d) || (N.global.useUTC || (d += (new fa()).getTimezoneOffset() * 6e4), h ? d > b.maxInput.HCTime
          ? d = s : d < g && (d = g) : d < b.minInput.HCTime ? d = s : d > j && (d = j), d !== s && c.xAxis[0].setExtremes(h ? d : e.min, h ? e.max : d, s, s, { trigger: 'rangeSelectorInput' }))
      }
    },
    getPosition () { var a = this.chart; const b = a.options.rangeSelector; var a = p((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height); return { buttonTop: a, inputTop: a - 10 } },
    render (a, b) {
      const c = this; let d = c.chart; const e = d.renderer; const f = d.container; var g = d.options; const h = g.exporting && g.navigation && g.navigation.buttonOptions; const i = g.rangeSelector; const k = c.buttons; var g = N.lang; var j = c.div; var j = c.inputGroup
      const m = i.buttonTheme; const l = i.buttonPosition || {}; const n = i.inputEnabled; const q = m && m.states; const r = d.plotLeft; let s; const v = this.getPosition(); let u = c.group; const y = c.rendered; if (!y && (c.group = u = e.g('range-selector-buttons').add(), c.zoomText = e.text(g.rangeSelectorZoom, p(l.x, r), 15).css(i.labelStyle).add(u), s = p(l.x, r) + c.zoomText.getBBox().width + 5, o(c.buttonOptions, function (a, b) {
        k[b] = e.button(a.text, s, 0, function () { c.clickButton(b); c.isActive = !0 }, m, q && q.hover, q && q.select, q && q.disabled).css({ textAlign: 'center' }).add(u); s += k[b].width + p(i.buttonSpacing,
          5); c.selected === b && k[b].setState(2)
      }), c.updateButtonStates(), n !== !1)) { c.div = j = aa('div', null, { position: 'relative', height: 0, zIndex: 1 }), f.parentNode.insertBefore(j, f), c.inputGroup = j = e.g('input-group').add(), j.offset = 0, c.drawInput('min'), c.drawInput('max') }u[y ? 'animate' : 'attr']({ translateY: v.buttonTop }); n !== !1 && (j.align(w({ y: v.inputTop, width: j.offset, x: h && v.inputTop < (h.y || 0) + h.height - d.spacing[0] ? -40 : 0 }, i.inputPosition), !0, d.spacingBox), t(n) || (d = u.getBBox(), j[j.translateX < d.x + d.width + 10 ? 'hide' : 'show']()),
      c.setInputValue('min', a), c.setInputValue('max', b)); c.rendered = !0
    },
    destroy () { const a = this.minInput; const b = this.maxInput; const c = this.chart; const d = this.blurInputs; let e; V(c.container, 'mousedown', d); V(c, 'resize', d); Ma(this.buttons); if (a) { a.onfocus = a.onblur = a.onchange = null } if (b) { b.onfocus = b.onblur = b.onchange = null } for (e in this) { this[e] && e !== 'chart' && (this[e].destroy ? this[e].destroy() : this[e].nodeType && Sa(this[e])), this[e] = null } }
  }; H.prototype.toFixedRange = function (a, b, c, d) {
    const e = this.chart && this.chart.fixedRange; var a = p(c,
      this.translate(a, !0)); var b = p(d, this.translate(b, !0)); var c = e && (b - a) / e; c > 0.7 && c < 1.3 && (d ? a = b - e : b = a + e); return { min: a, max: b }
  }; H.prototype.minFromRange = function () {
    const a = this.range; const b = { month: 'Month', year: 'FullYear' }[a.type]; let c; const d = this.max; let e; let f; const g = function (a, c) { const d = new fa(a); d['set' + b](d['get' + b]() + c); return d.getTime() - a }; typeof a === 'number' ? (c = this.max - a, f = a) : c = d + g(d, -a.count); e = p(this.dataMin, Number.MIN_VALUE); isNaN(c) && (c = e); if (c <= e) { c = e, f === void 0 && (f = g(c, a.count)), this.newMax = E(c + f, this.dataMax) }isNaN(d) && (c =
void 0); return c
  }; R(Ha.prototype, 'init', function (a, b, c) { A(this, 'init', function () { if (this.options.rangeSelector.enabled) { this.rangeSelector = new Gb(this) } }); a.call(this, b, c) }); D.RangeSelector = Gb; Ha.prototype.callbacks.push(function (a) {
    function b () { f = a.xAxis[0].getExtremes(); g.render(f.min, f.max) } function c () { f = a.xAxis[0].getExtremes(); isNaN(f.min) || h.render(f.min, f.max) } function d (a) { a.triggerOp !== 'navigator-drag' && g.render(a.min, a.max) } function e (a) { h.render(a.min, a.max) } let f; var g = a.scroller; var h = a.rangeSelector
    g && (A(a.xAxis[0], 'afterSetExtremes', d), R(a, 'drawChartBox', function (a) { const c = this.isDirtyBox; a.call(this); c && b() }), b()); h && (A(a.xAxis[0], 'afterSetExtremes', e), A(a, 'resize', c), c()); A(a, 'destroy', function () { g && V(a.xAxis[0], 'afterSetExtremes', d); h && (V(a, 'resize', c), V(a.xAxis[0], 'afterSetExtremes', e)) })
  }); D.StockChart = function (a, b) {
    const c = a.series; let d; const e = p(a.navigator && a.navigator.enabled, !0) ? { startOnTick: !1, endOnTick: !1 } : null; const f = { marker: { enabled: !1, radius: 2 } }; const g = { shadow: !1, borderWidth: 0 }; a.xAxis = Aa(na(a.xAxis ||
{}), function (a) { return B({ minPadding: 0, maxPadding: 0, ordinal: !0, title: { text: null }, labels: { overflow: 'justify' }, showLastLabel: !0 }, a, { type: 'datetime', categories: null }, e) }); a.yAxis = Aa(na(a.yAxis || {}), function (a) { d = p(a.opposite, !0); return B({ labels: { y: -2 }, opposite: d, showLastLabel: !1, title: { text: null } }, a) }); a.series = null; a = B({
      chart: { panning: !0, pinchType: 'x' },
      navigator: { enabled: !0 },
      scrollbar: { enabled: !0 },
      rangeSelector: { enabled: !0 },
      title: { text: null, style: { fontSize: '16px' } },
      tooltip: { shared: !0, crosshairs: !0 },
      legend: { enabled: !1 },
      plotOptions: { line: f, spline: f, area: f, areaspline: f, arearange: f, areasplinerange: f, column: g, columnrange: g, candlestick: g, ohlc: g }
    }, a, { _stock: !0, chart: { inverted: !1 } }); a.series = c; return new Ha(a, b)
  }; R(Wa.prototype, 'init', function (a, b, c) { const d = c.chart.pinchType || ''; a.call(this, b, c); this.pinchX = this.pinchHor = d.includes('x'); this.pinchY = this.pinchVert = d.includes('y'); this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert }); R(H.prototype, 'autoLabelAlign', function (a) {
    var b = this.chart
    let c = this.options; var b = b._labelPanes = b._labelPanes || {}; const d = this.options.labels; if (this.chart.options._stock && this.coll === 'yAxis' && (c = c.top + ',' + c.height, !b[c] && d.enabled)) { if (d.x === 15) { d.x = 0 } if (d.align === void 0) { d.align = 'right' }b[c] = 1; return 'right' } return a.call(this, [].slice.call(arguments, 1))
  }); R(H.prototype, 'getPlotLinePath', function (a, b, c, d, e, f) {
    const g = this; const h = this.isLinked && !this.series ? this.linkedParent.series : this.series; const i = g.chart; const k = i.renderer; const j = g.left; const m = g.top; let l; let n; let q; let r; const s = []; let w = []; let u; if (g.coll === 'colorAxis') {
      return a.apply(this,
        [].slice.call(arguments, 1))
    } w = g.isXAxis ? t(g.options.yAxis) ? [i.yAxis[g.options.yAxis]] : Aa(h, function (a) { return a.yAxis }) : t(g.options.xAxis) ? [i.xAxis[g.options.xAxis]] : Aa(h, function (a) { return a.xAxis }); o(g.isXAxis ? i.yAxis : i.xAxis, function (a) { if (t(a.options.id) ? !a.options.id.includes('navigator') : 1) { var b = a.isXAxis ? 'yAxis' : 'xAxis'; var b = t(a.options[b]) ? i[b][a.options[b]] : i[b][0]; g === b && w.push(a) } }); u = w.length ? [] : [g.isXAxis ? i.yAxis[0] : i.xAxis[0]]; o(w, function (a) { Oa(a, u) === -1 && u.push(a) }); f = p(f, g.translate(b,
      null, null, d)); isNaN(f) || (g.horiz ? o(u, function (a) { let b; n = a.pos; r = n + a.len; l = q = x(f + g.transB); if (l < j || l > j + g.width) { e ? l = q = E(v(j, l), j + g.width) : b = !0 }b || s.push('M', l, n, 'L', q, r) }) : o(u, function (a) { let b; l = a.pos; q = l + a.len; n = r = x(m + g.height - f); if (n < m || n > m + g.height) { e ? n = r = E(v(m, n), g.top + g.height) : b = !0 }b || s.push('M', l, n, 'L', q, r) })); return s.length > 0 ? k.crispPolyLine(s, c || 1) : null
  }); H.prototype.getPlotBandPath = function (a, b) {
    const c = this.getPlotLinePath(b, null, null, !0); const d = this.getPlotLinePath(a, null, null, !0); let e = []; let f; if (d &&
c && d.toString() !== c.toString()) { for (f = 0; f < d.length; f += 6) { e.push('M', d[f + 1], d[f + 2], 'L', d[f + 4], d[f + 5], c[f + 4], c[f + 5], c[f + 1], c[f + 2]) } } else { e = null } return e
  }; qa.prototype.crispPolyLine = function (a, b) { let c; for (c = 0; c < a.length; c += 6) { a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = x(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = x(a[c + 2]) + b % 2 / 2) } return a }; if (Va === D.VMLRenderer) { ib.prototype.crispPolyLine = qa.prototype.crispPolyLine }R(H.prototype, 'hideCrosshair', function (a, b) {
    a.call(this, b); t(this.crossLabelArray) && (t(b) ? this.crossLabelArray[b] &&
this.crossLabelArray[b].hide() : o(this.crossLabelArray, function (a) { a.hide() }))
  }); R(H.prototype, 'drawCrosshair', function (a, b, c) {
    let d, e; a.call(this, b, c); if (t(this.crosshair.label) && this.crosshair.label.enabled && t(c)) {
      var a = this.chart; const f = this.options.crosshair.label; const g = this.isXAxis ? 'x' : 'y'; var b = this.horiz; const h = this.opposite; const i = this.left; const k = this.top; let j = this.crossLabel; let m; let l; let n = f.format; let o = ''; if (!j) {
        j = this.crossLabel = a.renderer.label().attr({
          align: f.align || (b ? 'center' : h ? this.labelAlign === 'right' ? 'right' : 'left' : this.labelAlign ===
'left' ? 'left' : 'center'),
          zIndex: 12,
          height: b ? 16 : s,
          fill: f.backgroundColor || this.series[0] && this.series[0].color || 'gray',
          padding: p(f.padding, 2),
          stroke: f.borderColor || null,
          'stroke-width': f.borderWidth || 0
        }).css(w({ color: 'white', fontWeight: 'normal', fontSize: '11px', textAlign: 'center' }, f.style)).add()
      }b ? (m = c.plotX + i, l = k + (h ? 0 : this.height)) : (m = h ? this.width + i : 0, l = c.plotY + k); if (l < k || l > k + this.height) { this.hideCrosshair() } else {
        !n && !f.formatter && (this.isDatetimeAxis && (o = '%b %d, %Y'), n = '{value' + (o ? ':' + o : '') + '}'); j.attr({
          text: n
            ? La(n, { value: c[g] }) : f.formatter.call(this, c[g]),
          x: m,
          y: l,
          visibility: 'visible'
        }); c = j.getBBox(); if (b) { if (this.options.tickPosition === 'inside' && !h || this.options.tickPosition !== 'inside' && h) { l = j.y - c.height } } else { l = j.y - c.height / 2 }b ? (d = i - c.x, e = i + this.width - c.x) : (d = this.labelAlign === 'left' ? i : 0, e = this.labelAlign === 'right' ? i + this.width : a.chartWidth); j.translateX < d && (m += d - j.translateX); j.translateX + c.width >= e && (m -= j.translateX + c.width - e); j.attr({ x: m, y: l, visibility: 'visible' })
      }
    }
  }); const nc = da.init; const oc = da.processData
  const pc = Da.prototype.tooltipFormatter; da.init = function () { nc.apply(this, arguments); this.setCompare(this.options.compare) }; da.setCompare = function (a) { this.modifyValue = a === 'value' || a === 'percent' ? function (b, c) { const d = this.compareValue; if (b !== s && (b = a === 'value' ? b - d : b = 100 * (b / d) - 100, c)) { c.change = b } return b } : null; if (this.chart.hasRendered) { this.isDirty = !0 } }; da.processData = function () {
    let a = 0; let b; let c; let d; oc.apply(this, arguments); if (this.xAxis && this.processedYData) {
      b = this.processedXData; c = this.processedYData; for (d = c.length; a <
d; a++) { if (typeof c[a] === 'number' && b[a] >= this.xAxis.min) { this.compareValue = c[a]; break } }
    }
  }; R(da, 'getExtremes', function (a) { a.apply(this, [].slice.call(arguments, 1)); if (this.modifyValue) { this.dataMax = this.modifyValue(this.dataMax), this.dataMin = this.modifyValue(this.dataMin) } }); H.prototype.setCompare = function (a, b) { this.isXAxis || (o(this.series, function (b) { b.setCompare(a) }), p(b, !0) && this.chart.redraw()) }; Da.prototype.tooltipFormatter = function (a) {
    a = a.replace('{point.change}', (this.change > 0 ? '+' : '') + D.numberFormat(this.change,
      p(this.series.tooltipOptions.changeDecimals, 2))); return pc.apply(this, [a])
  }; R(P.prototype, 'render', function (a) { if (this.chart.options._stock && this.xAxis) { !this.clipBox && this.animate ? (this.clipBox = B(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] && ($a(this.chart[this.sharedClipKey]), this.chart[this.sharedClipKey].attr({ width: this.xAxis.len, height: this.yAxis.len })) }a.call(this) }); w(D, {
    Color: va,
    Point: Da,
    Tick: Ya,
    Renderer: Va,
    SVGElement: Z,
    SVGRenderer: qa,
    arrayMin: Ra,
    arrayMax: Fa,
    charts: ca,
    dateFormat: ja,
    error: oa,
    format: La,
    pathAnim: Ib,
    getOptions () { return N },
    hasBidiBug: Yb,
    isTouchDevice: eb,
    setOptions (a) { N = B(!0, N, a); Nb(); return N },
    addEvent: A,
    removeEvent: V,
    createElement: aa,
    discardElement: Sa,
    css: G,
    each: o,
    map: Aa,
    merge: B,
    splat: na,
    extendClass: ia,
    pInt: I,
    svg: ea,
    canvas: ma,
    vml: !ea && !ma,
    product: 'Highstock',
    version: '2.1.9'
  })
})();
/*
 Highcharts JS v4.1.9 (2015-10-07)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (n, G) {
  function L (a, b, c) { this.init.call(this, a, b, c) } const Q = n.arrayMin; const R = n.arrayMax; const s = n.each; const I = n.extend; const t = n.merge; const S = n.map; const o = n.pick; const B = n.pInt; const p = n.getOptions().plotOptions; const i = n.seriesTypes; const u = n.extendClass; const M = n.splat; const r = n.wrap; const N = n.Axis; var z = n.Tick; const J = n.Point; const T = n.Pointer; const U = n.CenteredSeriesMixin; let A = n.TrackerMixin; const w = n.Series; const y = Math; const E = y.round; const C = y.floor; const O = y.max; const V = n.Color; const v = function () {}; I(L.prototype, {
    init (a, b, c) {
      const d = this; const e = d.defaultOptions; d.chart = b; d.options = a = t(e, b.angular ? { background: {} } : void 0,
        a); (a = a.background) && s([].concat(M(a)).reverse(), function (a) { const b = a.backgroundColor; const k = c.userOptions; var a = t(d.defaultBackgroundOptions, a); if (b) { a.backgroundColor = b }a.color = a.backgroundColor; c.options.plotBands.unshift(a); k.plotBands = k.plotBands || []; k.plotBands !== c.options.plotBands && k.plotBands.unshift(a) })
    },
    defaultOptions: { center: ['50%', '50%'], size: '85%', startAngle: 0 },
    defaultBackgroundOptions: {
      shape: 'circle',
      borderWidth: 1,
      borderColor: 'silver',
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [[0,
          '#FFF'], [1, '#DDD']]
      },
      from: -Number.MAX_VALUE,
      innerRadius: 0,
      to: Number.MAX_VALUE,
      outerRadius: '105%'
    }
  }); const H = N.prototype; var z = z.prototype; const W = { getOffset: v, redraw () { this.isDirty = !1 }, render () { this.isDirty = !1 }, setScale: v, setCategories: v, setTitle: v }; const P = {
    isRadial: !0,
    defaultRadialGaugeOptions: {
      labels: { align: 'center', x: 0, y: null },
      minorGridLineWidth: 0,
      minorTickInterval: 'auto',
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickWidth: 1,
      tickLength: 10,
      tickPosition: 'inside',
      tickWidth: 2,
      title: { rotation: 0 },
      zIndex: 2
    },
    defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 },
    defaultRadialYOptions: { gridLineInterpolation: 'circle', labels: { align: 'right', x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } },
    setOptions (a) { a = this.options = t(this.defaultOptions, this.defaultRadialOptions, a); if (!a.plotBands) { a.plotBands = [] } },
    getOffset () {
      H.getOffset.call(this); this.chart.axisOffset[this.side] = 0; this.center = this.pane.center =
U.getCenter.call(this.pane)
    },
    getLinePath (a, b) { const c = this.center; var b = o(b, c[2] / 2 - this.offset); return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) },
    setAxisTranslation () {
      H.setAxisTranslation.call(this); if (this.center) {
        this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset
          : 0
      }
    },
    beforeSetTickPositions () { this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0) },
    setAxisSize () { H.setAxisSize.call(this); if (this.isRadial) { this.center = this.pane.center = n.CenteredSeriesMixin.getCenter.call(this.pane); if (this.isCircular) { this.sector = this.endAngleRad - this.startAngleRad } this.len = this.width = this.height = this.center[2] * o(this.sector, 1) / 2 } },
    getPosition (a, b) {
      return this.postTranslate(this.isCircular ? this.translate(a) : 0, o(this.isCircular
        ? b : this.translate(a), this.center[2] / 2) - this.offset)
    },
    postTranslate (a, b) { const c = this.chart; const d = this.center; var a = this.startAngleRad + a; return { x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b } },
    getPlotBandPath (a, b, c) {
      let d = this.center; const e = this.startAngleRad; const f = d[2] / 2; let h = [o(c.outerRadius, '100%'), c.innerRadius, o(c.thickness, 10)]; const k = /%$/; let g; const j = this.isCircular; this.options.gridLineInterpolation === 'polygon' ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (a = Math.max(a, this.min),
      b = Math.min(b, this.max), j || (h[0] = this.translate(a), h[1] = this.translate(b)), h = S(h, function (a) { k.test(a) && (a = B(a, 10) * f / 100); return a }), c.shape === 'circle' || !j ? (a = -Math.PI / 2, b = Math.PI * 1.5, g = !0) : (a = e + this.translate(a), b = e + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], h[0], h[0], { start: Math.min(a, b), end: Math.max(a, b), innerR: o(h[1], h[0] - h[2]), open: g })); return d
    },
    getPlotLinePath (a, b) {
      const c = this; let d = c.center; const e = c.chart; const f = c.getPosition(a); let h; let k; let g; c.isCircular ? g = ['M', d[0] +
e.plotLeft, d[1] + e.plotTop, 'L', f.x, f.y] : c.options.gridLineInterpolation === 'circle' ? (a = c.translate(a)) && (g = c.getLinePath(0, a)) : (s(e.xAxis, function (a) { a.pane === c.pane && (h = a) }), g = [], a = c.translate(a), d = h.tickPositions, h.autoConnect && (d = d.concat([d[0]])), b && (d = [].concat(d).reverse()), s(d, function (f, b) { k = h.getPosition(f, a); g.push(b ? 'L' : 'M', k.x, k.y) })); return g
    },
    getTitlePosition () {
      const a = this.center; const b = this.chart; const c = this.options.title; return {
        x: b.plotLeft + a[0] + (c.x || 0),
        y: b.plotTop + a[1] - {
          high: 0.5,
          middle: 0.25,
          low: 0
        }[c.align] * a[2] + (c.y || 0)
      }
    }
  }; r(H, 'init', function (a, b, c) {
    let l; const d = b.angular; const e = b.polar; const f = c.isX; const h = d && f; let k; let g; g = b.options; let j = c.pane || 0; if (d) { if (I(this, h ? W : P), k = !f) { this.defaultRadialOptions = this.defaultRadialGaugeOptions } } else if (e) { I(this, P), this.defaultRadialOptions = (k = f) ? this.defaultRadialXOptions : t(this.defaultYAxisOptions, this.defaultRadialYOptions) }a.call(this, b, c); if (!h && (d || e)) {
      a = this.options; if (!b.panes) { b.panes = [] } this.pane = (l = b.panes[j] = b.panes[j] || new L(M(g.pane)[j], b, this), j = l); j = j.options
      b.inverted = !1; g.chart.zoomType = null; this.startAngleRad = b = (j.startAngle - 90) * Math.PI / 180; this.endAngleRad = g = (o(j.endAngle, j.startAngle + 360) - 90) * Math.PI / 180; this.offset = a.offset || 0; if ((this.isCircular = k) && c.max === G && g - b === 2 * Math.PI) { this.autoConnect = !0 }
    }
  }); r(z, 'getPosition', function (a, b, c, d, e) { const f = this.axis; return f.getPosition ? f.getPosition(c) : a.call(this, b, c, d, e) }); r(z, 'getLabelPosition', function (a, b, c, d, e, f, h, k, g) {
    const j = this.axis; let m = f.y; let l = 20; let i = f.align; const x = (j.translate(this.pos) + j.startAngleRad + Math.PI /
2) / Math.PI * 180 % 360; j.isRadial ? (a = j.getPosition(this.pos, j.center[2] / 2 + o(f.distance, -25)), f.rotation === 'auto' ? d.attr({ rotation: x }) : m === null && (m = j.chart.renderer.fontMetrics(d.styles.fontSize).b - d.getBBox().height / 2), i === null && (j.isCircular ? (this.label.getBBox().width > j.len * j.tickInterval / (j.max - j.min) && (l = 0), i = x > l && x < 180 - l ? 'left' : x > 180 + l && x < 360 - l ? 'right' : 'center') : i = 'center', d.attr({ align: i })), a.x += f.x, a.y += m) : a = a.call(this, b, c, d, e, f, h, k, g); return a
  }); r(z, 'getMarkPath', function (a, b, c, d, e, f, h) {
    const k =
this.axis; k.isRadial ? (a = k.getPosition(this.pos, k.center[2] / 2 + d), b = ['M', b, c, 'L', a.x, a.y]) : b = a.call(this, b, c, d, e, f, h); return b
  }); p.arearange = t(p.area, { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1 } } }); i.arearange = u(i.area, {
    type: 'arearange',
    pointArrayMap: ['low', 'high'],
    dataLabelCollections: ['dataLabel', 'dataLabelUpper'],
    toYData (a) { return [a.low, a.high] },
    pointValKey: 'low',
    deferTranslatePolar: !0,
    highToXY (a) { const b = this.chart; const c = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh); a.plotHighX = c.x - b.plotLeft; a.plotHigh = c.y - b.plotTop },
    getSegments () { const a = this; s(a.points, function (b) { if (!a.options.connectNulls && (b.low === null || b.high === null)) { b.y = null } else if (b.low === null && b.high !== null) { b.y = b.high } }); w.prototype.getSegments.call(this) },
    translate () { const a = this; const b = a.yAxis; i.area.prototype.translate.apply(a); s(a.points, function (a) { const d = a.low; const e = a.high; const f = a.plotY; e === null && d === null ? a.y = null : d === null ? (a.plotLow = a.plotY = null, a.plotHigh = b.translate(e, 0, 1, 0, 1)) : e === null ? (a.plotLow = f, a.plotHigh = null) : (a.plotLow = f, a.plotHigh = b.translate(e, 0, 1, 0, 1)) }); this.chart.polar && s(this.points, function (b) { a.highToXY(b) }) },
    getSegmentPath (a) {
      let b; let c = []; let d = a.length; const e = w.prototype.getSegmentPath; let f; let h; h = this.options; let k = h.step; for (b = HighchartsAdapter.grep(a,
        function (a) { return a.plotLow !== null }); d--;) { f = a[d], f.plotHigh !== null && c.push({ plotX: f.plotHighX || f.plotX, plotY: f.plotHigh }) }a = e.call(this, b); if (k) { k === !0 && (k = 'left'), h.step = { left: 'right', center: 'center', right: 'left' }[k] }c = e.call(this, c); h.step = k; h = [].concat(a, c); this.chart.polar || (c[0] = 'L'); this.areaPath = this.areaPath.concat(a, c); return h
    },
    drawDataLabels () {
      const a = this.data; const b = a.length; let c; const d = []; const e = w.prototype; const f = this.options.dataLabels; const h = f.align; const k = f.inside; let g; let j; const m = this.chart.inverted; if (f.enabled ||
this._hasPointLabels) {
        for (c = b; c--;) { if (g = a[c]) { if (j = k ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.y = g.high, g._plotY = g.plotY, g.plotY = g.plotHigh, d[c] = g.dataLabel, g.dataLabel = g.dataLabelUpper, g.below = j, m) { if (!h) { f.align = j ? 'right' : 'left' }f.x = f.xHigh } else { f.y = f.yHigh } } } e.drawDataLabels && e.drawDataLabels.apply(this, arguments); for (c = b; c--;) {
          if (g = a[c]) {
            if (j = k ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.dataLabelUpper = g.dataLabel, g.dataLabel = d[c], g.y = g.low, g.plotY = g._plotY, g.below = !j, m) {
              if (!h) { f.align = j ? 'left' : 'right' }
              f.x = f.xLow
            } else { f.y = f.yLow }
          }
        } e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
      }f.align = h
    },
    alignDataLabel () { i.column.prototype.alignDataLabel.apply(this, arguments) },
    setStackedPoints: v,
    getSymbol: v,
    drawPoints: v
  }); p.areasplinerange = t(p.arearange); i.areasplinerange = u(i.arearange, { type: 'areasplinerange', getPointSpline: i.spline.prototype.getPointSpline }); (function () {
    const a = i.column.prototype; p.columnrange = t(p.column, p.arearange, { lineWidth: 1, pointRange: null }); i.columnrange = u(i.arearange, {
      type: 'columnrange',
      translate () { const b = this; const c = b.yAxis; let d; a.translate.apply(b); s(b.points, function (a) { const f = a.shapeArgs; let h = b.options.minPointLength; let k; a.tooltipPos = null; a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1); a.plotLow = a.plotY; k = d; a = a.plotY - d; Math.abs(a) < h ? (h -= a, a += h, k -= h / 2) : a < 0 && (a *= -1, k -= a); f.height = a; f.y = k }) },
      directTouch: !0,
      trackerGroups: ['group', 'dataLabelsGroup'],
      drawGraph: v,
      crispCol: a.crispCol,
      pointAttrToOptions: a.pointAttrToOptions,
      drawPoints: a.drawPoints,
      drawTracker: a.drawTracker,
      animate: a.animate,
      getColumnMetrics: a.getColumnMetrics
    })
  })()
  p.gauge = t(p.line, { dataLabels: { enabled: !0, defer: !1, y: 15, borderWidth: 1, borderColor: 'silver', borderRadius: 3, crop: !1, verticalAlign: 'top', zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: '' }, showInLegend: !1 }); A = {
    type: 'gauge',
    pointClass: u(J, { setState (a) { this.state = a } }),
    angular: !0,
    drawGraph: v,
    fixedBox: !0,
    forceDL: !0,
    trackerGroups: ['group', 'dataLabelsGroup'],
    translate () {
      const a = this.yAxis; const b = this.options; const c = a.center; this.generatePoints(); s(this.points, function (d) {
        const e = t(b.dial, d.dial); const f = B(o(e.radius,
          80)) * c[2] / 200; const h = B(o(e.baseLength, 70)) * f / 100; const k = B(o(e.rearLength, 10)) * f / 100; const g = e.baseWidth || 3; const j = e.topWidth || 1; let m = b.overshoot; let l = a.startAngleRad + a.translate(d.y, null, null, null, !0); m && typeof m === 'number' ? (m = m / 180 * Math.PI, l = Math.max(a.startAngleRad - m, Math.min(a.endAngleRad + m, l))) : b.wrap === !1 && (l = Math.max(a.startAngleRad, Math.min(a.endAngleRad, l))); l = l * 180 / Math.PI; d.shapeType = 'path'; d.shapeArgs = { d: e.path || ['M', -k, -g / 2, 'L', h, -g / 2, f, -j / 2, f, j / 2, h, g / 2, -k, g / 2, 'z'], translateX: c[0], translateY: c[1], rotation: l }; d.plotX =
c[0]; d.plotY = c[1]
      })
    },
    drawPoints () {
      const a = this; const b = a.yAxis.center; const c = a.pivot; const d = a.options; const e = d.pivot; const f = a.chart.renderer; s(a.points, function (b) { const c = b.graphic; const g = b.shapeArgs; const e = g.d; const m = t(d.dial, b.dial); c ? (c.animate(g), g.d = e) : b.graphic = f[b.shapeType](g).attr({ stroke: m.borderColor || 'none', 'stroke-width': m.borderWidth || 0, fill: m.backgroundColor || 'black', rotation: g.rotation }).add(a.group) }); c ? c.animate({ translateX: b[0], translateY: b[1] }) : a.pivot = f.circle(0, 0, o(e.radius, 5)).attr({
        'stroke-width': e.borderWidth ||
0,
        stroke: e.borderColor || 'silver',
        fill: e.backgroundColor || 'black'
      }).translate(b[0], b[1]).add(a.group)
    },
    animate (a) { const b = this; if (!a) { s(b.points, function (a) { const d = a.graphic; d && (d.attr({ rotation: b.yAxis.startAngleRad * 180 / Math.PI }), d.animate({ rotation: a.shapeArgs.rotation }, b.options.animation)) }), b.animate = null } },
    render () { this.group = this.plotGroup('group', 'series', this.visible ? 'visible' : 'hidden', this.options.zIndex, this.chart.seriesGroup); w.prototype.render.call(this); this.group.clip(this.chart.clipRect) },
    setData (a, b) { w.prototype.setData.call(this, a, !1); this.processData(); this.generatePoints(); o(b, !0) && this.chart.redraw() },
    drawTracker: A && A.drawTrackerPoint
  }; i.gauge = u(i.line, A); p.boxplot = t(p.column, {
    fillColor: '#FFFFFF',
    lineWidth: 1,
    medianWidth: 2,
    states: { hover: { brightness: -0.3 } },
    threshold: null,
    tooltip: { pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' },
    whiskerLength: '50%',
    whiskerWidth: 2
  }); i.boxplot = u(i.column, {
    type: 'boxplot',
    pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
    toYData (a) { return [a.low, a.q1, a.median, a.q3, a.high] },
    pointValKey: 'high',
    pointAttrToOptions: { fill: 'fillColor', stroke: 'color', 'stroke-width': 'lineWidth' },
    drawDataLabels: v,
    translate () { const a = this.yAxis; const b = this.pointArrayMap; i.column.prototype.translate.apply(this); s(this.points, function (c) { s(b, function (b) { c[b] !== null && (c[b + 'Plot'] = a.translate(c[b], 0, 1, 0, 1)) }) }) },
    drawPoints () {
      const a =
this; const b = a.options; const c = a.chart.renderer; let d; let e; let f; let h; let k; let g; let j; let m; let l; let i; let x; let n; let K; let p; let t; let r; let v; let u; let w; let y; let B; let A; const z = a.doQuartiles !== !1; let F; const D = a.options.whiskerLength; s(a.points, function (q) {
        l = q.graphic; B = q.shapeArgs; x = {}; p = {}; r = {}; A = q.color || a.color; if (q.plotY !== G) {
          if (d = q.pointAttr[q.selected ? 'selected' : ''], v = B.width, u = C(B.x), w = u + v, y = E(v / 2), e = C(z ? q.q1Plot : q.lowPlot), f = C(z ? q.q3Plot : q.lowPlot), h = C(q.highPlot), k = C(q.lowPlot), x.stroke = q.stemColor || b.stemColor || A, x['stroke-width'] = o(q.stemWidth, b.stemWidth, b.lineWidth), x.dashstyle = q.stemDashStyle ||
b.stemDashStyle, p.stroke = q.whiskerColor || b.whiskerColor || A, p['stroke-width'] = o(q.whiskerWidth, b.whiskerWidth, b.lineWidth), r.stroke = q.medianColor || b.medianColor || A, r['stroke-width'] = o(q.medianWidth, b.medianWidth, b.lineWidth), j = x['stroke-width'] % 2 / 2, m = u + y + j, i = ['M', m, f, 'L', m, h, 'M', m, e, 'L', m, k], z && (j = d['stroke-width'] % 2 / 2, m = C(m) + j, e = C(e) + j, f = C(f) + j, u += j, w += j, n = ['M', u, f, 'L', u, e, 'L', w, e, 'L', w, f, 'L', u, f, 'z']), D && (j = p['stroke-width'] % 2 / 2, h += j, k += j, F = /%$/.test(D) ? y * parseFloat(D) / 100 : D / 2, K = ['M', m - F, h, 'L', m +
F, h, 'M', m - F, k, 'L', m + F, k]), j = r['stroke-width'] % 2 / 2, g = E(q.medianPlot) + j, t = ['M', u, g, 'L', w, g], l) { q.stem.animate({ d: i }), D && q.whiskers.animate({ d: K }), z && q.box.animate({ d: n }), q.medianShape.animate({ d: t }) } else { q.graphic = l = c.g().add(a.group); q.stem = c.path(i).attr(x).add(l); if (D) { q.whiskers = c.path(K).attr(p).add(l) } if (z) { q.box = c.path(n).attr(d).add(l) }q.medianShape = c.path(t).attr(r).add(l) }
        }
      })
    },
    setStackedPoints: v
  }); p.errorbar = t(p.boxplot, {
    color: '#000000',
    grouping: !1,
    linkedTo: ':previous',
    tooltip: { pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
    whiskerWidth: null
  }); i.errorbar = u(i.boxplot, { type: 'errorbar', pointArrayMap: ['low', 'high'], toYData (a) { return [a.low, a.high] }, pointValKey: 'high', doQuartiles: !1, drawDataLabels: i.arearange ? i.arearange.prototype.drawDataLabels : v, getColumnMetrics () { return this.linkedParent && this.linkedParent.columnMetrics || i.column.prototype.getColumnMetrics.call(this) } }); p.waterfall = t(p.column, { lineWidth: 1, lineColor: '#333', dashStyle: 'dot', borderColor: '#333', dataLabels: { inside: !0 }, states: { hover: { lineWidthPlus: 0 } } })
  i.waterfall = u(i.column, {
    type: 'waterfall',
    upColorProp: 'fill',
    pointValKey: 'y',
    translate () {
      let a = this.options; const b = this.yAxis; let c; let d; let e; let f; let h; let k; let g; let j; let m; const l = a.threshold; const X = a.stacking; i.column.prototype.translate.apply(this); g = j = l; d = this.points; for (c = 0, a = d.length; c < a; c++) {
        e = d[c]; k = this.processedYData[c]; f = e.shapeArgs; m = (h = X && b.stacks[(this.negStacks && k < l ? '-' : '') + this.stackKey]) ? h[e.x].points[this.index + ',' + c] : [0, k]; if (e.isSum) { e.y = k } else if (e.isIntermediateSum) { e.y = k - j }h = O(g, g + e.y) + m[0]; f.y = b.translate(h, 0, 1)
        if (e.isSum) { f.y = b.translate(m[1], 0, 1), f.height = Math.min(b.translate(m[0], 0, 1), b.len) - f.y } else if (e.isIntermediateSum) { f.y = b.translate(m[1], 0, 1), f.height = Math.min(b.translate(j, 0, 1), b.len) - f.y, j = m[1] } else { if (g !== 0) { f.height = k > 0 ? b.translate(g, 0, 1) - f.y : b.translate(g, 0, 1) - b.translate(g - k, 0, 1) }g += k }f.height < 0 && (f.y += f.height, f.height *= -1); e.plotY = f.y = E(f.y) - this.borderWidth % 2 / 2; f.height = O(E(f.height), 0.001); e.yBottom = f.y + f.height; f = e.plotY + (e.negative ? f.height : 0); this.chart.inverted ? e.tooltipPos[0] = b.len -
f : e.tooltipPos[1] = f
      }
    },
    processData (a) { const b = this.yData; const c = this.options.data; let d; const e = b.length; let f; let h; let k; let g; let j; let m; h = f = k = g = this.options.threshold || 0; for (m = 0; m < e; m++) { j = b[m], d = c && c[m] ? c[m] : {}, j === 'sum' || d.isSum ? b[m] = h : j === 'intermediateSum' || d.isIntermediateSum ? b[m] = f : (h += j, f += j), k = Math.min(h, k), g = Math.max(h, g) }w.prototype.processData.call(this, a); this.dataMin = k; this.dataMax = g },
    toYData (a) { if (a.isSum) { return a.x === 0 ? null : 'sum' } else if (a.isIntermediateSum) { return a.x === 0 ? null : 'intermediateSum' } return a.y },
    getAttribs () { i.column.prototype.getAttribs.apply(this, arguments); const a = this; var b = a.options; const c = b.states; const d = b.upColor || a.color; var b = n.Color(d).brighten(0.1).get(); const e = t(a.pointAttr); const f = a.upColorProp; e[''][f] = d; e.hover[f] = c.hover.upColor || b; e.select[f] = c.select.upColor || d; s(a.points, function (f) { if (!f.options.color) { f.y > 0 ? (f.pointAttr = e, f.color = d) : f.pointAttr = a.pointAttr } }) },
    getGraphPath () {
      const a = this.data; const b = a.length; const c = E(this.options.lineWidth + this.borderWidth) % 2 / 2; let d = []; let e; let f; let h; for (h = 1; h < b; h++) {
        f = a[h].shapeArgs,
        e = a[h - 1].shapeArgs, f = ['M', e.x + e.width, e.y + c, 'L', f.x, e.y + c], a[h - 1].y < 0 && (f[2] += e.height, f[5] += e.height), d = d.concat(f)
      } return d
    },
    getExtremes: v,
    drawGraph: w.prototype.drawGraph
  }); p.polygon = t(p.scatter, { marker: { enabled: !1 } }); i.polygon = u(i.scatter, { type: 'polygon', fillGraph: !0, getSegmentPath (a) { return w.prototype.getSegmentPath.call(this, a).concat('z') }, drawGraph: w.prototype.drawGraph, drawLegendSymbol: n.LegendSymbolMixin.drawRectangle }); p.bubble = t(p.scatter, {
    dataLabels: {
      formatter () { return this.point.z },
      inside: !0,
      verticalAlign: 'middle'
    },
    marker: { lineColor: null, lineWidth: 1 },
    minSize: 8,
    maxSize: '20%',
    softThreshold: !1,
    states: { hover: { halo: { size: 5 } } },
    tooltip: { pointFormat: '({point.x}, {point.y}), Size: {point.z}' },
    turboThreshold: 0,
    zThreshold: 0,
    zoneAxis: 'z'
  }); A = u(J, { haloPath () { return J.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size) }, ttBelow: !1 }); i.bubble = u(i.scatter, {
    type: 'bubble',
    pointClass: A,
    pointArrayMap: ['y', 'z'],
    parallelArrays: ['x', 'y', 'z'],
    trackerGroups: ['group',
      'dataLabelsGroup'],
    bubblePadding: !0,
    zoneAxis: 'z',
    pointAttrToOptions: { stroke: 'lineColor', 'stroke-width': 'lineWidth', fill: 'fillColor' },
    applyOpacity (a) { const b = this.options.marker; const c = o(b.fillOpacity, 0.5); var a = a || b.fillColor || this.color; c !== 1 && (a = V(a).setOpacity(c).get('rgba')); return a },
    convertAttribs () { const a = w.prototype.convertAttribs.apply(this, arguments); a.fill = this.applyOpacity(a.fill); return a },
    getRadii (a, b, c, d) {
      let e; let f; let h; const k = this.zData; const g = []; const j = this.options; const m = j.sizeBy !== 'width'
      const l = j.zThreshold; const i = b - a; for (f = 0, e = k.length; f < e; f++) { h = k[f], j.sizeByAbsoluteValue && (h = Math.abs(h - l), b = Math.max(b - l, Math.abs(a - l)), a = 0), h === null ? h = null : h < a ? h = c / 2 - 1 : (h = i > 0 ? (h - a) / i : 0.5, m && h >= 0 && (h = Math.sqrt(h)), h = y.ceil(c + h * (d - c)) / 2), g.push(h) } this.radii = g
    },
    animate (a) { const b = this.options.animation; if (!a) { s(this.points, function (a) { const d = a.graphic; var a = a.shapeArgs; d && a && (d.attr('r', 1), d.animate({ r: a.r }, b)) }), this.animate = null } },
    translate () {
      let a; const b = this.data; let c; let d; const e = this.radii; i.scatter.prototype.translate.call(this)
      for (a = b.length; a--;) { c = b[a], d = e ? e[a] : 0, typeof d === 'number' && d >= this.minPxSize / 2 ? (c.shapeType = 'circle', c.shapeArgs = { x: c.plotX, y: c.plotY, r: d }, c.dlBox = { x: c.plotX - d, y: c.plotY - d, width: 2 * d, height: 2 * d }) : c.shapeArgs = c.plotY = c.dlBox = G }
    },
    drawLegendSymbol (a, b) { const c = B(a.itemStyle.fontSize) / 2; b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({ zIndex: 3 }).add(b.legendGroup); b.legendSymbol.isMarker = !0 },
    drawPoints: i.column.prototype.drawPoints,
    alignDataLabel: i.column.prototype.alignDataLabel,
    buildKDTree: v,
    applyZones: v
  }); N.prototype.beforePadding = function () {
    const a = this; const b = this.len; const c = this.chart; let d = 0; let e = b; const f = this.isXAxis; const h = f ? 'xData' : 'yData'; const k = this.min; const g = {}; const j = y.min(c.plotWidth, c.plotHeight); let m = Number.MAX_VALUE; let l = -Number.MAX_VALUE; const i = this.max - k; let x = b / i; const n = []; s(this.series, function (b) {
      const h = b.options; if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries)) {
        if (a.allowZoomOutside = !0, n.push(b), f) {
          s(['minSize', 'maxSize'], function (a) { var b = h[a]; const f = /%$/.test(b); var b = B(b); g[a] = f ? j * b / 100 : b }), b.minPxSize =
g.minSize, b.maxPxSize = g.maxSize, b = b.zData, b.length && (m = o(h.zMin, y.min(m, y.max(Q(b), h.displayNegative === !1 ? h.zThreshold : -Number.MAX_VALUE))), l = o(h.zMax, y.max(l, R(b))))
        }
      }
    }); s(n, function (a) { const b = a[h]; let c = b.length; let g; f && a.getRadii(m, l, a.minPxSize, a.maxPxSize); if (i > 0) { for (;c--;) { typeof b[c] === 'number' && (g = a.radii[c], d = Math.min((b[c] - k) * x - g, d), e = Math.max((b[c] - k) * x + g, e)) } } }); n.length && i > 0 && !this.isLog && (e -= b, x *= (b + d - e) / b, s([['min', 'userMin', d], ['max', 'userMax', e]], function (b) {
      o(a.options[b[0]], a[b[1]]) === G && (a[b[0]] +=
b[2] / x)
    }))
  }; (function () {
    function a (a, b, c) { a.call(this, b, c); if (this.chart.polar) { this.closeSegment = function (a) { const b = this.xAxis.center; a.push('L', b[0], b[1]) }, this.closedStacks = !0 } } function b (a, b) {
      let c = this.chart; let g = this.options.animation; const d = this.group; const e = this.markerGroup; const l = this.xAxis.center; const i = c.plotLeft; const n = c.plotTop; if (c.polar) {
        if (c.renderer.isSVG) {
          g === !0 && (g = {}), b ? (c = { translateX: l[0] + i, translateY: l[1] + n, scaleX: 0.001, scaleY: 0.001 }, d.attr(c), e && e.attr(c)) : (c = { translateX: i, translateY: n, scaleX: 1, scaleY: 1 },
          d.animate(c, g), e && e.animate(c, g), this.animate = null)
        }
      } else { a.call(this, b) }
    } const c = w.prototype; const d = T.prototype; let e; c.searchPointByAngle = function (a) { const b = this.chart; const c = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop) * (-180 / Math.PI) }) }; r(c, 'buildKDTree', function (a) { if (this.chart.polar) { this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.kdDimensions = 2 } a.apply(this) }); c.toXY = function (a) {
      let b; let c = this.chart; const g = a.plotX; b = a.plotY; a.rectPlotX =
g; a.rectPlotY = b; b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b); a.plotX = a.polarPlotX = b.x - c.plotLeft; a.plotY = a.polarPlotY = b.y - c.plotTop; this.kdByAngle ? (c = (g / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, c < 0 && (c += 360), a.clientX = c) : a.clientX = a.plotX
    }; i.area && r(i.area.prototype, 'init', a); i.areaspline && r(i.areaspline.prototype, 'init', a); i.spline && r(i.spline.prototype, 'getPointSpline', function (a, b, c, g) {
      let d, e, l, i, n, p, o; if (this.chart.polar) {
        d = c.plotX; e = c.plotY; a = b[g - 1]; l = b[g + 1]; this.connectEnds &&
(a || (a = b[b.length - 2]), l || (l = b[1])); if (a && l) { i = a.plotX, n = a.plotY, b = l.plotX, p = l.plotY, i = (1.5 * d + i) / 2.5, n = (1.5 * e + n) / 2.5, l = (1.5 * d + b) / 2.5, o = (1.5 * e + p) / 2.5, b = Math.sqrt((i - d) ** 2 + (n - e) ** 2), p = Math.sqrt((l - d) ** 2 + (o - e) ** 2), i = Math.atan2(n - e, i - d), n = Math.atan2(o - e, l - d), o = Math.PI / 2 + (i + n) / 2, Math.abs(i - o) > Math.PI / 2 && (o -= Math.PI), i = d + Math.cos(o) * b, n = e + Math.sin(o) * b, l = d + Math.cos(Math.PI + o) * p, o = e + Math.sin(Math.PI + o) * p, c.rightContX = l, c.rightContY = o }g ? (c = ['C', a.rightContX || a.plotX, a.rightContY ||
a.plotY, i || d, n || e, d, e], a.rightContX = a.rightContY = null) : c = ['M', d, e]
      } else { c = a.call(this, b, c, g) } return c
    }); r(c, 'translate', function (a) { let b = this.chart; a.call(this); if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate)) { a = this.points; for (b = a.length; b--;) { this.toXY(a[b]) } } }); r(c, 'getSegmentPath', function (a, b) {
      const c = this.points; if (this.chart.polar && this.options.connectEnds !== !1 && b[b.length - 1] === c[c.length - 1] && c[0].y !== null) { this.connectEnds = !0, b = [].concat(b, [c[0]]) } return a.call(this,
        b)
    }); r(c, 'animate', b); if (i.column) {
      e = i.column.prototype, r(e, 'animate', b), r(e, 'translate', function (a) { let b = this.xAxis; const c = this.yAxis.len; const d = b.center; const e = b.startAngleRad; const i = this.chart.renderer; let l; let n; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) { b = this.points; for (n = b.length; n--;) { l = b[n], a = l.barX + e, l.shapeType = 'path', l.shapeArgs = { d: i.symbols.arc(d[0], d[1], c - l.plotY, null, { start: a, end: a + l.pointWidth, innerR: c - o(l.yBottom, c) }) }, this.toXY(l), l.tooltipPos = [l.plotX, l.plotY], l.ttBelow = l.plotY > d[1] } } }), r(e, 'alignDataLabel',
        function (a, b, d, e, j, i) { if (this.chart.polar) { a = b.rectPlotX / Math.PI * 180; if (e.align === null) { e.align = a > 20 && a < 160 ? 'left' : a > 200 && a < 340 ? 'right' : 'center' } if (e.verticalAlign === null) { e.verticalAlign = a < 45 || a > 315 ? 'bottom' : a > 135 && a < 225 ? 'top' : 'middle' }c.alignDataLabel.call(this, b, d, e, j, i) } else { a.call(this, b, d, e, j, i) } })
    }r(d, 'getCoordinates', function (a, b) {
      const c = this.chart; let d = { xAxis: [], yAxis: [] }; c.polar ? s(c.axes, function (a) {
        const e = a.isXAxis; var f = a.center; const i = b.chartX - f[0] - c.plotLeft; var f = b.chartY - f[1] - c.plotTop; d[e ? 'xAxis' : 'yAxis'].push({
          axis: a,
          value: a.translate(e ? Math.PI - Math.atan2(i, f) : Math.sqrt(i ** 2 + f ** 2), !0)
        })
      }) : d = a.call(this, b); return d
    })
  })()
})(Highcharts);
/*
 Highcharts JS v4.1.9 (2015-10-07)

 (c) 2009-2013 Torstein H?nsi

 License: www.highcharts.com/license
*/
(function (d) {
  function p (c, b, a) {
    let e; let g; var f = b.options.chart.options3d; let h = !1; a ? (h = b.inverted, a = b.plotWidth / 2, b = b.plotHeight / 2, e = f.depth / 2, g = z(f.depth, 1) * z(f.viewDistance, 0)) : (a = b.plotLeft + b.plotWidth / 2, b = b.plotTop + b.plotHeight / 2, e = f.depth / 2, g = z(f.depth, 1) * z(f.viewDistance, 0)); const j = []; const i = a; const k = b; const l = e; const q = g; var a = A * (h ? f.beta : -f.beta); var f = A * (h ? -f.alpha : f.alpha); const o = m(a); const x = n(a); const r = m(f); const v = n(f); let t; let u; let y; let w; let s; let p; d.each(c, function (a) {
      t = (h ? a.y : a.x) - i; u = (h ? a.x : a.y) - k; y = (a.z || 0) - l; w = x * t - o * y; s = -o * r * t - x * r * y + v * u; p = o * v * t + x * v * y + r * u; q > 0 &&
q < Number.POSITIVE_INFINITY && (w *= q / (p + l + q), s *= q / (p + l + q)); w += i; s += k; p += l; j.push({ x: h ? s : w, y: h ? w : s, z: p })
    }); return j
  } function B (c) { return c !== void 0 && c !== null } function F (c) { let b = 0; let a; let e; for (a = 0; a < c.length; a++) { e = (a + 1) % c.length, b += c[a].x * c[e].y - c[e].x * c[a].y } return b / 2 } function D (c) { let b = 0; let a; for (a = 0; a < c.length; a++) { b += c[a].z } return c.length ? b / c.length : 0 } function s (c, b, a, e, g, f, d, j) {
    let i = []; return f > g && f - g > o / 2 + 1.0e-4 ? (i = i.concat(s(c, b, a, e, g, g + o / 2, d, j)), i = i.concat(s(c, b, a, e, g + o / 2, f, d, j))) : f < g && g - f > o / 2 + 1.0e-4
      ? (i = i.concat(s(c, b, a, e, g, g - o / 2, d, j)), i = i.concat(s(c, b, a, e, g - o / 2, f, d, j))) : (i = f - g, ['C', c + a * n(g) - a * C * i * m(g) + d, b + e * m(g) + e * C * i * n(g) + j, c + a * n(f) + a * C * i * m(f) + d, b + e * m(f) - e * C * i * n(f) + j, c + a * n(f) + d, b + e * m(f) + j])
  } function G (c) {
    if (this.chart.is3d()) {
      const b = this.chart.options.plotOptions.column.grouping; if (b !== void 0 && !b && this.group.zIndex !== void 0 && !this.zIndexSet) { this.group.attr({ zIndex: this.group.zIndex * 10 }), this.zIndexSet = !0 } const a = this.options; const e = this.options.states; this.borderWidth = a.borderWidth = B(a.edgeWidth) ? a.edgeWidth
        : 1; d.each(this.data, function (b) { if (b.y !== null) { b = b.pointAttr, this.borderColor = d.pick(a.edgeColor, b[''].fill), b[''].stroke = this.borderColor, b.hover.stroke = d.pick(e.hover.edgeColor, this.borderColor), b.select.stroke = d.pick(e.select.edgeColor, this.borderColor) } })
    }c.apply(this, [].slice.call(arguments, 1))
  } var o = Math.PI; var A = o / 180; var m = Math.sin; var n = Math.cos; var z = d.pick; const H = Math.round; d.perspective = p; var C = 4 * (Math.sqrt(2) - 1) / 3 / (o / 2); d.SVGRenderer.prototype.toLinePath = function (c, b) {
    const a = []; d.each(c, function (b) {
      a.push('L',
        b.x, b.y)
    }); c.length && (a[0] = 'M', b && a.push('Z')); return a
  }; d.SVGRenderer.prototype.cuboid = function (c) {
    const b = this.g(); var c = this.cuboidPath(c); b.front = this.path(c[0]).attr({ zIndex: c[3], 'stroke-linejoin': 'round' }).add(b); b.top = this.path(c[1]).attr({ zIndex: c[4], 'stroke-linejoin': 'round' }).add(b); b.side = this.path(c[2]).attr({ zIndex: c[5], 'stroke-linejoin': 'round' }).add(b); b.fillSetter = function (a) {
      const b = d.Color(a).brighten(0.1).get(); const c = d.Color(a).brighten(-0.1).get(); this.front.attr({ fill: a }); this.top.attr({ fill: b })
      this.side.attr({ fill: c }); this.color = a; return this
    }; b.opacitySetter = function (a) { this.front.attr({ opacity: a }); this.top.attr({ opacity: a }); this.side.attr({ opacity: a }); return this }; b.attr = function (a) { a.shapeArgs || B(a.x) ? (a = this.renderer.cuboidPath(a.shapeArgs || a), this.front.attr({ d: a[0], zIndex: a[3] }), this.top.attr({ d: a[1], zIndex: a[4] }), this.side.attr({ d: a[2], zIndex: a[5] })) : d.SVGElement.prototype.attr.call(this, a); return this }; b.animate = function (a, b, c) {
      B(a.x) && B(a.y) ? (a = this.renderer.cuboidPath(a), this.front.attr({ zIndex: a[3] }).animate({ d: a[0] },
        b, c), this.top.attr({ zIndex: a[4] }).animate({ d: a[1] }, b, c), this.side.attr({ zIndex: a[5] }).animate({ d: a[2] }, b, c)) : a.opacity ? (this.front.animate(a, b, c), this.top.animate(a, b, c), this.side.animate(a, b, c)) : d.SVGElement.prototype.animate.call(this, a, b, c); return this
    }; b.destroy = function () { this.front.destroy(); this.top.destroy(); this.side.destroy(); return null }; b.attr({ zIndex: -c[3] }); return b
  }; d.SVGRenderer.prototype.cuboidPath = function (c) {
    var b = c.x; var a = c.y; const e = c.z; const g = c.height; const f = c.width; const h = c.depth; const j = d.map; var i = [{
      x: b,
      y: a,
      z: e
    }, { x: b + f, y: a, z: e }, { x: b + f, y: a + g, z: e }, { x: b, y: a + g, z: e }, { x: b, y: a + g, z: e + h }, { x: b + f, y: a + g, z: e + h }, { x: b + f, y: a, z: e + h }, { x: b, y: a, z: e + h }]; var i = p(i, d.charts[this.chartIndex], c.insidePlotArea); var a = function (a, b) { a = j(a, function (a) { return i[a] }); b = j(b, function (a) { return i[a] }); return F(a) < 0 ? a : F(b) < 0 ? b : [] }; var c = a([3, 2, 1, 0], [7, 6, 5, 4]); var b = a([1, 6, 7, 0], [4, 5, 2, 3]); var a = a([1, 2, 5, 6], [0, 7, 4, 3]); return [this.toLinePath(c, !0), this.toLinePath(b, !0), this.toLinePath(a, !0), D(c), D(b), D(a)]
  }; d.SVGRenderer.prototype.arc3d = function (c) {
    c.alpha *=
A; c.beta *= A; const b = this.g(); const a = this.arc3dPath(c); const e = b.renderer; const g = a.zTop * 100; b.shapeArgs = c; b.top = e.path(a.top).setRadialReference(c.center).attr({ zIndex: a.zTop }).add(b); b.side1 = e.path(a.side2).attr({ zIndex: a.zSide1 }); b.side2 = e.path(a.side1).attr({ zIndex: a.zSide2 }); b.inn = e.path(a.inn).attr({ zIndex: a.zInn }); b.out = e.path(a.out).attr({ zIndex: a.zOut }); b.fillSetter = function (a) {
      this.color = a; const b = d.Color(a).brighten(-0.1).get(); this.side1.attr({ fill: b }); this.side2.attr({ fill: b }); this.inn.attr({ fill: b }); this.out.attr({ fill: b })
      this.top.attr({ fill: a }); return this
    }; b.translateXSetter = function (a) { this.out.attr({ translateX: a }); this.inn.attr({ translateX: a }); this.side1.attr({ translateX: a }); this.side2.attr({ translateX: a }); this.top.attr({ translateX: a }) }; b.translateYSetter = function (a) { this.out.attr({ translateY: a }); this.inn.attr({ translateY: a }); this.side1.attr({ translateY: a }); this.side2.attr({ translateY: a }); this.top.attr({ translateY: a }) }; b.animate = function (a, b, c) {
      B(a.end) || B(a.start) ? (this._shapeArgs = this.shapeArgs, d.SVGElement.prototype.animate.call(this,
        { _args: a }, {
          duration: b,
          start () { const a = arguments[0].elem; const b = a._shapeArgs; b.fill !== a.color && a.attr({ fill: b.fill }) },
          step () {
            var a = arguments[1]; const b = a.elem; var c = b._shapeArgs; var e = a.end; var a = a.pos; var c = d.merge(c, { x: c.x + (e.x - c.x) * a, y: c.y + (e.y - c.y) * a, r: c.r + (e.r - c.r) * a, innerR: c.innerR + (e.innerR - c.innerR) * a, start: c.start + (e.start - c.start) * a, end: c.end + (e.end - c.end) * a }); var e = b.renderer.arc3dPath(c); b.shapeArgs = c; b.top.attr({ d: e.top, zIndex: e.zTop }); b.inn.attr({ d: e.inn, zIndex: e.zInn }); b.out.attr({ d: e.out, zIndex: e.zOut })
            b.side1.attr({ d: e.side1, zIndex: e.zSide1 }); b.side2.attr({ d: e.side2, zIndex: e.zSide2 })
          }
        }, c)) : d.SVGElement.prototype.animate.call(this, a, b, c); return this
    }; b.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); d.SVGElement.prototype.destroy.call(this) }; b.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; b.show = function () {
      this.top.show(); this.out.show(); this.inn.show(); this.side1.show()
      this.side2.show()
    }; b.zIndex = g; b.attr({ zIndex: g }); return b
  }; d.SVGRenderer.prototype.arc3dPath = function (c) {
    function b (a) { a %= 2 * o; a > o && (a = 2 * o - a); return a } let a = c.x; let e = c.y; let d = c.start; let f = c.end - 1.0e-5; let h = c.r; var j = c.innerR; var i = c.depth; var k = c.alpha; var l = c.beta; let q = n(d); const p = m(d); var c = n(f); let x = m(f); const r = h * n(l); h *= n(k); const v = j * n(l); const t = j * n(k); var j = i * m(l); const u = i * m(k); var i = ['M', a + r * q, e + h * p]; var i = i.concat(s(a, e, r, h, d, f, 0, 0)); var i = i.concat(['L', a + v * c, e + t * x]); var i = i.concat(s(a, e, v, t, f, d, 0, 0)); var i = i.concat(['Z']); var y = l > 0 ? o / 2 : 0; var l = k > 0 ? 0 : o / 2; var y = d > -y ? d : f > -y ? -y : d; const w = f < o -
l ? f : d < o - l ? o - l : f; var k = ['M', a + r * n(y), e + h * m(y)]; var k = k.concat(s(a, e, r, h, y, w, 0, 0)); f > o - l && d < o - l && (k = k.concat(['L', a + r * n(w) + j, e + h * m(w) + u]), k = k.concat(s(a, e, r, h, w, f, j, u)), k = k.concat(['L', a + r * n(f), e + h * m(f)]), k = k.concat(s(a, e, r, h, f, w, 0, 0))); k = k.concat(['L', a + r * n(w) + j, e + h * m(w) + u]); k = k.concat(s(a, e, r, h, w, y, j, u)); k = k.concat(['Z']); l = ['M', a + v * q, e + t * p]; l = l.concat(s(a, e, v, t, d, f, 0, 0)); l = l.concat(['L', a + v * n(f) + j, e + t * m(f) + u]); l = l.concat(s(a, e, v, t, f, d, j, u)); l = l.concat(['Z']); q = ['M', a + r * q, e + h * p, 'L', a + r * q + j, e + h * p + u, 'L', a +
v * q + j, e + t * p + u, 'L', a + v * q, e + t * p, 'Z']; a = ['M', a + r * c, e + h * x, 'L', a + r * c + j, e + h * x + u, 'L', a + v * c + j, e + t * x + u, 'L', a + v * c, e + t * x, 'Z']; x = Math.atan2(u, -j); e = Math.abs(f + x); c = Math.abs(d + x); d = Math.abs((d + f) / 2 + x); e = b(e); c = b(c); d = b(d); d *= 1e5; f = c * 1e5; e *= 1e5; return { top: i, zTop: o * 1e5 + 1, out: k, zOut: Math.max(d, f, e), inn: l, zInn: Math.max(d, f, e), side1: q, zSide1: e * 0.99, side2: a, zSide2: f * 0.99 }
  }; d.Chart.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; d.wrap(d.Chart.prototype, 'isInsidePlot',
    function (c) { return this.is3d() ? !0 : c.apply(this, [].slice.call(arguments, 1)) }); d.getOptions().chart.options3d = { enabled: !1, alpha: 0, beta: 0, depth: 100, viewDistance: 25, frame: { bottom: { size: 1, color: 'rgba(255,255,255,0)' }, side: { size: 1, color: 'rgba(255,255,255,0)' }, back: { size: 1, color: 'rgba(255,255,255,0)' } } }; d.wrap(d.Chart.prototype, 'init', function (c) {
    const b = [].slice.call(arguments, 1); let a; if (b[0].chart.options3d && b[0].chart.options3d.enabled) {
      b[0].chart.options3d.alpha = (b[0].chart.options3d.alpha || 0) % 360, b[0].chart.options3d.beta =
(b[0].chart.options3d.beta || 0) % 360, a = b[0].plotOptions || {}, a = a.pie || {}, a.borderColor = d.pick(a.borderColor, void 0)
    }c.apply(this, b)
  }); d.wrap(d.Chart.prototype, 'setChartSize', function (c) { c.apply(this, [].slice.call(arguments, 1)); if (this.is3d()) { const b = this.inverted; const a = this.clipBox; const e = this.margin; a[b ? 'y' : 'x'] = -(e[3] || 0); a[b ? 'x' : 'y'] = -(e[0] || 0); a[b ? 'height' : 'width'] = this.chartWidth + (e[3] || 0) + (e[1] || 0); a[b ? 'width' : 'height'] = this.chartHeight + (e[0] || 0) + (e[2] || 0) } }); d.wrap(d.Chart.prototype, 'redraw', function (c) {
    if (this.is3d()) {
      this.isDirtyBox =
!0
    } c.apply(this, [].slice.call(arguments, 1))
  }); d.wrap(d.Chart.prototype, 'renderSeries', function (c) { let b = this.series.length; if (this.is3d()) { for (;b--;) { c = this.series[b], c.translate(), c.render() } } else { c.call(this) } }); d.Chart.prototype.retrieveStacks = function (c) { const b = this.series; const a = {}; let e; let g = 1; d.each(this.series, function (d) { e = z(d.options.stack, c ? 0 : b.length - 1 - d.index); a[e] ? a[e].series.push(d) : (a[e] = { series: [d], position: g }, g++) }); a.totalStacks = g + 1; return a }; d.wrap(d.Axis.prototype, 'setOptions', function (c, b) {
    let a
    c.call(this, b); if (this.chart.is3d()) { a = this.options, a.tickWidth = d.pick(a.tickWidth, 0), a.gridLineWidth = d.pick(a.gridLineWidth, 1) }
  }); d.wrap(d.Axis.prototype, 'render', function (c) {
    c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
      let b = this.chart; const a = b.renderer; let e = b.options.chart.options3d; var d = e.frame; const f = d.bottom; let h = d.back; var d = d.side; const j = e.depth; const i = this.height; const k = this.width; const l = this.left; const q = this.top; if (!this.isZAxis) {
        this.horiz ? (h = { x: l, y: q + (b.xAxis[0].opposite ? -f.size : i), z: 0, width: k, height: f.size, depth: j, insidePlotArea: !1 },
        this.bottomFrame ? this.bottomFrame.animate(h) : this.bottomFrame = a.cuboid(h).attr({ fill: f.color, zIndex: b.yAxis[0].reversed && e.alpha > 0 ? 4 : -1 }).css({ stroke: f.color }).add()) : (e = { x: l + (b.yAxis[0].opposite ? 0 : -d.size), y: q + (b.xAxis[0].opposite ? -f.size : 0), z: j, width: k + d.size, height: i + f.size, depth: h.size, insidePlotArea: !1 }, this.backFrame ? this.backFrame.animate(e) : this.backFrame = a.cuboid(e).attr({ fill: h.color, zIndex: -3 }).css({ stroke: h.color }).add(), b = {
          x: l + (b.yAxis[0].opposite ? k : -d.size),
          y: q + (b.xAxis[0].opposite
            ? -f.size : 0),
          z: 0,
          width: d.size,
          height: i + f.size,
          depth: j,
          insidePlotArea: !1
        }, this.sideFrame ? this.sideFrame.animate(b) : this.sideFrame = a.cuboid(b).attr({ fill: d.color, zIndex: -2 }).css({ stroke: d.color }).add())
      }
    }
  }); d.wrap(d.Axis.prototype, 'getPlotLinePath', function (c) {
    let b = c.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d()) { return b } if (b === null) { return b } var a = this.chart.options.chart.options3d; var a = this.isZAxis ? this.chart.plotWidth : a.depth; let d = this.opposite; this.horiz && (d = !d); b = [this.swapZ({
      x: b[1],
      y: b[2],
      z: d ? a : 0
    }), this.swapZ({ x: b[1], y: b[2], z: a }), this.swapZ({ x: b[4], y: b[5], z: a }), this.swapZ({ x: b[4], y: b[5], z: d ? 0 : a })]; b = p(b, this.chart, !1); return b = this.chart.renderer.toLinePath(b, !1)
  }); d.wrap(d.Axis.prototype, 'getLinePath', function (c) { return this.chart.is3d() ? [] : c.apply(this, [].slice.call(arguments, 1)) }); d.wrap(d.Axis.prototype, 'getPlotBandPath', function (c) {
    if (this.chart.is3d()) {
      var b = arguments; let a = b[1]; var b = this.getPlotLinePath(b[2]); (a = this.getPlotLinePath(a)) && b ? a.push('L', b[10], b[11], 'L', b[7], b[8], 'L',
        b[4], b[5], 'L', b[1], b[2]) : a = null; return a
    } else { return c.apply(this, [].slice.call(arguments, 1)) }
  }); d.wrap(d.Tick.prototype, 'getMarkPath', function (c) { let b = c.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d()) { return b } b = [this.axis.swapZ({ x: b[1], y: b[2], z: 0 }), this.axis.swapZ({ x: b[4], y: b[5], z: 0 })]; b = p(b, this.axis.chart, !1); return b = ['M', b[0].x, b[0].y, 'L', b[1].x, b[1].y] }); d.wrap(d.Tick.prototype, 'getLabelPosition', function (c) {
    const b = c.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d()) { return b }
    const a = p([this.axis.swapZ({ x: b.x, y: b.y, z: 0 })], this.axis.chart, !1)[0]; a.x -= !this.axis.horiz && this.axis.opposite ? this.axis.transA : 0; a.old = b; return a
  }); d.wrap(d.Tick.prototype, 'handleOverflow', function (c, b) { if (this.axis.chart.is3d()) { b = b.old } return c.call(this, b) }); d.wrap(d.Axis.prototype, 'getTitlePosition', function (c) { let b = c.apply(this, [].slice.call(arguments, 1)); return !this.chart.is3d() ? b : b = p([this.swapZ({ x: b.x, y: b.y, z: 0 })], this.chart, !1)[0] }); d.wrap(d.Axis.prototype, 'drawCrosshair', function (c) {
    const b =
arguments; this.chart.is3d() && b[2] && (b[2] = { plotX: b[2].plotXold || b[2].plotX, plotY: b[2].plotYold || b[2].plotY }); c.apply(this, [].slice.call(b, 1))
  }); d.Axis.prototype.swapZ = function (c, b) { if (this.isZAxis) { const a = b ? 0 : this.chart.plotLeft; const d = this.chart; return { x: a + (d.yAxis[0].opposite ? c.z : d.xAxis[0].width - c.z), y: c.y, z: c.x - a } } else { return c } }; const E = d.ZAxis = function () { this.isZAxis = !0; this.init.apply(this, arguments) }; d.extend(E.prototype, d.Axis.prototype); d.extend(E.prototype, {
    setOptions (c) {
      c = d.merge({
        offset: 0,
        lineWidth: 0
      }, c); d.Axis.prototype.setOptions.call(this, c); this.coll = 'zAxis'
    },
    setAxisSize () { d.Axis.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left },
    getSeriesExtremes () {
      const c = this; const b = c.chart; c.hasVisibleSeries = !1; c.dataMin = c.dataMax = c.ignoreMinPadding = c.ignoreMaxPadding = null; c.buildStacks && c.buildStacks(); d.each(c.series, function (a) {
        if (a.visible || !b.options.chart.ignoreHiddenSeries) {
          if (c.hasVisibleSeries =
!0, a = a.zData, a.length) { c.dataMin = Math.min(z(c.dataMin, a[0]), Math.min.apply(null, a)), c.dataMax = Math.max(z(c.dataMax, a[0]), Math.max.apply(null, a)) }
        }
      })
    }
  }); d.wrap(d.Chart.prototype, 'getAxes', function (c) { const b = this; var a = this.options; var a = a.zAxis = d.splat(a.zAxis || {}); c.call(this); if (b.is3d()) { this.zAxis = [], d.each(a, function (a, c) { a.index = c; a.isX = !0; (new E(b, a)).setScale() }) } }); d.wrap(d.seriesTypes.column.prototype, 'translate', function (c) {
    c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
      const b = this.chart
      const a = this.options; const e = a.depth || 25; let g = (a.stacking ? a.stack || 0 : this._i) * (e + (a.groupZPadding || 1)); a.grouping !== !1 && (g = 0); g += a.groupZPadding || 1; d.each(this.data, function (a) { if (a.y !== null) { const c = a.shapeArgs; let d = a.tooltipPos; a.shapeType = 'cuboid'; c.z = g; c.depth = e; c.insidePlotArea = !0; d = p([{ x: d[0], y: d[1], z: g }], b, !1)[0]; a.tooltipPos = [d.x, d.y] } }); this.z = g
    }
  }); d.wrap(d.seriesTypes.column.prototype, 'animate', function (c) {
    if (this.chart.is3d()) {
      const b = arguments[1]; const a = this.yAxis; const e = this; const g = this.yAxis.reversed; if (d.svg) {
        b ? d.each(e.data,
          function (b) { if (b.y !== null && (b.height = b.shapeArgs.height, b.shapey = b.shapeArgs.y, b.shapeArgs.height = 1, !g)) { b.shapeArgs.y = b.stackY ? b.plotY + a.translate(b.stackY) : b.plotY + (b.negative ? -b.height : b.height) } }) : (d.each(e.data, function (a) { if (a.y !== null) { a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, e.options.animation) } }), this.drawDataLabels(), e.animate = null)
      }
    } else { c.apply(this, [].slice.call(arguments, 1)) }
  }); d.wrap(d.seriesTypes.column.prototype, 'init', function (c) {
    c.apply(this,
      [].slice.call(arguments, 1)); if (this.chart.is3d()) { const b = this.options; let a = b.grouping; let d = b.stacking; let g = 0; if (a === void 0 || a) { a = this.chart.retrieveStacks(d); d = b.stack || 0; for (g = 0; g < a[d].series.length; g++) { if (a[d].series[g] === this) { break } } g = a.totalStacks * 10 - 10 * (a.totalStacks - a[d].position) - g }b.zIndex = g }
  }); d.wrap(d.Series.prototype, 'alignDataLabel', function (c) {
    if (this.chart.is3d() && (this.type === 'column' || this.type === 'columnrange')) {
      const b = arguments[4]; var a = { x: b.x, y: b.y, z: this.z }; var a = p([a], this.chart, !0)[0]; b.x = a.x; b.y =
a.y
    }c.apply(this, [].slice.call(arguments, 1))
  }); d.seriesTypes.columnrange && d.wrap(d.seriesTypes.columnrange.prototype, 'drawPoints', G); d.wrap(d.seriesTypes.column.prototype, 'drawPoints', G); d.wrap(d.seriesTypes.pie.prototype, 'translate', function (c) {
    c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
      const b = this; const a = b.chart; const e = b.options; const g = e.depth || 0; const f = a.options.chart.options3d; const h = { x: a.plotWidth / 2, y: a.plotHeight / 2, z: f.depth }; const j = f.alpha; const i = f.beta; let k = e.stacking ? (e.stack || 0) * g : b._i * g; k += g / 2; e.grouping !==
!1 && (k = 0); d.each(b.data, function (a) { let c = a.shapeArgs; a.shapeType = 'arc3d'; c.z = k; c.depth = g * 0.75; c.origin = h; c.alpha = j; c.beta = i; c.center = b.center; c = (c.end + c.start) / 2; a.slicedTranslation = { translateX: H(n(c) * e.slicedOffset * n(j * A)), translateY: H(m(c) * e.slicedOffset * n(j * A)) } })
    }
  }); d.wrap(d.seriesTypes.pie.prototype.pointClass.prototype, 'haloPath', function (c) { const b = arguments; return this.series.chart.is3d() ? [] : c.call(this, b[1]) }); d.wrap(d.seriesTypes.pie.prototype, 'drawPoints', function (c) {
    const b = this.group; const a =
this.options; const e = a.states; if (this.chart.is3d()) {
      this.borderWidth = a.borderWidth = a.edgeWidth || 1, this.borderColor = a.edgeColor = d.pick(a.edgeColor, a.borderColor, void 0), e.hover.borderColor = d.pick(e.hover.edgeColor, this.borderColor), e.hover.borderWidth = d.pick(e.hover.edgeWidth, this.borderWidth), e.select.borderColor = d.pick(e.select.edgeColor, this.borderColor), e.select.borderWidth = d.pick(e.select.edgeWidth, this.borderWidth), d.each(this.data, function (a) {
        const b = a.pointAttr; b[''].stroke = a.series.borderColor || a.color
        b['']['stroke-width'] = a.series.borderWidth; b.hover.stroke = e.hover.borderColor; b.hover['stroke-width'] = e.hover.borderWidth; b.select.stroke = e.select.borderColor; b.select['stroke-width'] = e.select.borderWidth
      })
    } c.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && d.each(this.points, function (a) { const c = a.graphic; c.out.add(b); c.inn.add(b); c.side1.add(b); c.side2.add(b); c[a.y ? 'show' : 'hide']() })
  }); d.wrap(d.seriesTypes.pie.prototype, 'drawDataLabels', function (c) {
    if (this.chart.is3d()) {
      const b = this; d.each(b.data,
        function (a) { var c = a.shapeArgs; const d = c.r; const f = c.depth; const h = (c.alpha || b.chart.options.chart.options3d.alpha) * A; var c = (c.start + c.end) / 2; var a = a.labelPos; a[1] += -d * (1 - n(h)) * m(c) + (m(c) > 0 ? m(h) * f : 0); a[3] += -d * (1 - n(h)) * m(c) + (m(c) > 0 ? m(h) * f : 0); a[5] += -d * (1 - n(h)) * m(c) + (m(c) > 0 ? m(h) * f : 0) })
    }c.apply(this, [].slice.call(arguments, 1))
  }); d.wrap(d.seriesTypes.pie.prototype, 'addPoint', function (c) { c.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); d.wrap(d.seriesTypes.pie.prototype, 'animate', function (c) {
    if (this.chart.is3d()) {
      let b =
arguments[1]; let a = this.options.animation; const e = this.center; const g = this.group; const f = this.markerGroup; if (d.svg) { if (a === !0 && (a = {}), b) { if (g.oldtranslateX = g.translateX, g.oldtranslateY = g.translateY, b = { translateX: e[0], translateY: e[1], scaleX: 0.001, scaleY: 0.001 }, g.attr(b), f) { f.attrSetters = g.attrSetters, f.attr(b) } } else { b = { translateX: g.oldtranslateX, translateY: g.oldtranslateY, scaleX: 1, scaleY: 1 }, g.animate(b, a), f && f.animate(b, a), this.animate = null } }
    } else { c.apply(this, [].slice.call(arguments, 1)) }
  }); d.wrap(d.seriesTypes.scatter.prototype,
    'translate', function (c) { c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) { let b = this.chart; let a = d.pick(this.zAxis, b.options.zAxis[0]); const e = []; let g; let f; let h; for (h = 0; h < this.data.length; h++) { g = this.data[h], f = a.isLog && a.val2lin ? a.val2lin(g.z) : g.z, g.plotZ = a.translate(f), g.isInside = g.isInside ? f >= a.min && f <= a.max : !1, e.push({ x: g.plotX, y: g.plotY, z: g.plotZ }) }b = p(e, b, !0); for (h = 0; h < this.data.length; h++) { g = this.data[h], a = b[h], g.plotXold = g.plotX, g.plotYold = g.plotY, g.plotX = a.x, g.plotY = a.y, g.plotZ = a.z } } }); d.wrap(d.seriesTypes.scatter.prototype,
    'init', function (c, b, a) { if (b.is3d()) { this.axisTypes = ['xAxis', 'yAxis', 'zAxis'], this.pointArrayMap = ['x', 'y', 'z'], this.parallelArrays = ['x', 'y', 'z'] } c = c.apply(this, [b, a]); if (this.chart.is3d()) { this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>' : 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>' } return c }); if (d.VMLRenderer) {
    d.setOptions({ animate: !1 }), d.VMLRenderer.prototype.cuboid =
d.SVGRenderer.prototype.cuboid, d.VMLRenderer.prototype.cuboidPath = d.SVGRenderer.prototype.cuboidPath, d.VMLRenderer.prototype.toLinePath = d.SVGRenderer.prototype.toLinePath, d.VMLRenderer.prototype.createElement3D = d.SVGRenderer.prototype.createElement3D, d.VMLRenderer.prototype.arc3d = function (c) { c = d.SVGRenderer.prototype.arc3d.call(this, c); c.css({ zIndex: c.zIndex }); return c }, d.VMLRenderer.prototype.arc3dPath = d.SVGRenderer.prototype.arc3dPath, d.wrap(d.Axis.prototype, 'render', function (c) {
      c.apply(this, [].slice.call(arguments,
        1)); this.sideFrame && (this.sideFrame.css({ zIndex: 0 }), this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color })); this.backFrame && (this.backFrame.css({ zIndex: 0 }), this.backFrame.front.attr({ fill: this.backFrame.color }))
    })
  }
})(Highcharts);
/*
 Highcharts JS v4.1.9 (2015-10-07)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (g) {
  const z = g.Chart; const s = g.addEvent; const A = g.removeEvent; const B = HighchartsAdapter.fireEvent; const j = g.createElement; const p = g.discardElement; const u = g.css; const l = g.merge; const m = g.each; const q = g.extend; const E = g.splat; const F = Math.max; const k = document; const C = window; const G = g.isTouchDevice; const H = g.Renderer.prototype.symbols; const r = g.getOptions(); let x; q(r.lang, { printChart: 'Print chart', downloadPNG: 'Download PNG image', downloadJPEG: 'Download JPEG image', downloadPDF: 'Download PDF document', downloadSVG: 'Download SVG vector image', contextButtonTitle: 'Chart context menu' }); r.navigation =
{ menuStyle: { border: '1px solid #A0A0A0', background: '#FFFFFF', padding: '5px 0' }, menuItemStyle: { padding: '0 10px', background: 'none', color: '#303030', fontSize: G ? '14px' : '11px' }, menuItemHoverStyle: { background: '#4572A5', color: '#FFFFFF' }, buttonOptions: { symbolFill: '#E0E0E0', symbolSize: 14, symbolStroke: '#666', symbolStrokeWidth: 3, symbolX: 12.5, symbolY: 10.5, align: 'right', buttonSpacing: 3, height: 22, theme: { fill: 'white', stroke: 'none' }, verticalAlign: 'top', width: 24 } }; r.exporting = {
    type: 'image/png',
    url: 'http://export.highcharts.com/',
    buttons: { contextButton: { menuClassName: 'highcharts-contextmenu', symbol: 'menu', _titleKey: 'contextButtonTitle', menuItems: [{ textKey: 'printChart', onclick () { this.print() } }, { separator: !0 }, { textKey: 'downloadPNG', onclick () { this.exportChart() } }, { textKey: 'downloadJPEG', onclick () { this.exportChart({ type: 'image/jpeg' }) } }, { textKey: 'downloadPDF', onclick () { this.exportChart({ type: 'application/pdf' }) } }, { textKey: 'downloadSVG', onclick () { this.exportChart({ type: 'image/svg+xml' }) } }] } }
  }
  g.post = function (b, a, e) { let c; var b = j('form', l({ method: 'post', action: b, enctype: 'multipart/form-data' }, e), { display: 'none' }, k.body); for (c in a) { j('input', { type: 'hidden', name: c, value: a[c] }, null, b) }b.submit(); p(b) }; q(z.prototype, {
    sanitizeSVG (b) {
      return b.replace(/zIndex="[^"]+"/g, '').replace(/isShadow="[^"]+"/g, '').replace(/symbolName="[^"]+"/g, '').replace(/jQuery[0-9]+="[^"]+"/g, '').replace(/url\([^#]+#/g, 'url(#').replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g,
        ' xlink:href=').replace(/\n/, ' ').replace(/<\/svg>.*?$/, '</svg>').replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, '\u00A0').replace(/&shy;/g, '\u00AD').replace(/<IMG /g, '<image ').replace(/<(\/?)TITLE>/g, '<$1title>').replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/ id=([^" >]+)/g, ' id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g,
        ' ').replace(/:(path|rect)/g, '$1').replace(/style="([^"]+)"/g, function (a) { return a.toLowerCase() })
    },
    getChartHTML () { return this.container.innerHTML },
    getSVG (b) {
      const a = this; let e; let c; let f; let y; let h; let d = l(a.options, b); const I = d.exporting.allowHTML; if (!k.createElementNS) { k.createElementNS = function (a, b) { return k.createElement(b) } }c = j('div', null, { position: 'absolute', top: '-9999em', width: a.chartWidth + 'px', height: a.chartHeight + 'px' }, k.body); f = a.renderTo.style.width; h = a.renderTo.style.height; f = d.exporting.sourceWidth ||
d.chart.width || /px$/.test(f) && parseInt(f, 10) || 600; h = d.exporting.sourceHeight || d.chart.height || /px$/.test(h) && parseInt(h, 10) || 400; q(d.chart, { animation: !1, renderTo: c, forExport: !0, renderer: 'SVGRenderer', width: f, height: h }); d.exporting.enabled = !1; delete d.data; d.series = []; m(a.series, function (a) { y = l(a.options, { animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: a.visible }); y.isInternal || d.series.push(y) }); b && m(['xAxis', 'yAxis'], function (a) { m(E(b[a]), function (b, c) { d[a][c] = l(d[a][c], b) }) }); e = new g.Chart(d,
        a.callback); m(['xAxis', 'yAxis'], function (b) { m(a[b], function (a, c) { const d = e[b][c]; var f = a.getExtremes(); const h = f.userMin; var f = f.userMax; d && (h !== void 0 || f !== void 0) && d.setExtremes(h, f, !0, !1) }) }); f = e.getChartHTML(); d = null; e.destroy(); p(c); if (I && (c = f.match(/<\/svg>(.*?$)/))) { c = '<foreignObject x="0" y="0" width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">' + c[1] + '</body></foreignObject>', f = f.replace('</svg>', c + '</svg>') }f = this.sanitizeSVG(f); return f = f.replace(/(url\(#highcharts-[0-9]+)&quot;/g, '$1').replace(/&quot;/g,
        "'")
    },
    getSVGForExport (b, a) { const e = this.options.exporting; return this.getSVG(l({ chart: { borderRadius: 0 } }, e.chartOptions, a, { exporting: { sourceWidth: b && b.sourceWidth || e.sourceWidth, sourceHeight: b && b.sourceHeight || e.sourceHeight } })) },
    exportChart (b, a) { const e = this.getSVGForExport(b, a); var b = l(this.options.exporting, b); g.post(b.url, { filename: b.filename || 'chart', type: b.type, width: b.width || 0, scale: b.scale || 2, svg: e }, b.formAttributes) },
    print () {
      const b = this; const a = b.container; const e = []; const c = a.parentNode
      const f = k.body; const g = f.childNodes; if (!b.isPrinting) { b.isPrinting = !0, B(b, 'beforePrint'), m(g, function (a, b) { if (a.nodeType === 1) { e[b] = a.style.display, a.style.display = 'none' } }), f.appendChild(a), C.focus(), C.print(), setTimeout(function () { c.appendChild(a); m(g, function (a, b) { if (a.nodeType === 1) { a.style.display = e[b] } }); b.isPrinting = !1; B(b, 'afterPrint') }, 1e3) }
    },
    contextMenu (b, a, e, c, f, g, h) {
      const d = this; const l = d.options.navigation; const D = l.menuItemStyle; const n = d.chartWidth; const o = d.chartHeight; const k = 'cache-' + b; let i = d[k]; const t = F(f, g); let v; let w; let p; const r = function (a) {
        d.pointer.inClass(a.target,
          b) || w()
      }; if (!i) {
        d[k] = i = j('div', { className: b }, { position: 'absolute', zIndex: 1e3, padding: t + 'px' }, d.container), v = j('div', null, q({ MozBoxShadow: '3px 3px 10px #888', WebkitBoxShadow: '3px 3px 10px #888', boxShadow: '3px 3px 10px #888' }, l.menuStyle), i), w = function () { u(i, { display: 'none' }); h && h.setState(0); d.openMenu = !1 }, s(i, 'mouseleave', function () { p = setTimeout(w, 500) }), s(i, 'mouseenter', function () { clearTimeout(p) }), s(document, 'mouseup', r), s(d, 'destroy', function () { A(document, 'mouseup', r) }), m(a, function (a) {
          if (a) {
            const b =
a.separator ? j('hr', null, null, v) : j('div', { onmouseover () { u(this, l.menuItemHoverStyle) }, onmouseout () { u(this, D) }, onclick (b) { b.stopPropagation(); w(); a.onclick && a.onclick.apply(d, arguments) }, innerHTML: a.text || d.options.lang[a.textKey] }, q({ cursor: 'pointer' }, D), v); d.exportDivElements.push(b)
          }
        }), d.exportDivElements.push(v, i), d.exportMenuWidth = i.offsetWidth, d.exportMenuHeight = i.offsetHeight
      }a = { display: 'block' }; e + d.exportMenuWidth > n ? a.right = n - e - f - t + 'px' : a.left = e - t + 'px'; c + g + d.exportMenuHeight >
o && h.alignOptions.verticalAlign !== 'top' ? a.bottom = o - c - t + 'px' : a.top = c + g - t + 'px'; u(i, a); d.openMenu = !0
    },
    addButton (b) {
      const a = this; const e = a.renderer; const c = l(a.options.navigation.buttonOptions, b); const f = c.onclick; const k = c.menuItems; let h; let d; const m = { stroke: c.symbolStroke, fill: c.symbolFill }; const j = c.symbolSize || 12; if (!a.btnCount) { a.btnCount = 0 } if (!a.exportDivElements) { a.exportDivElements = [], a.exportSVGElements = [] } if (c.enabled !== !1) {
        const n = c.theme; var o = n.states; const p = o && o.hover; var o = o && o.select; let i; delete n.states; f ? i = function (b) {
          b.stopPropagation()
          f.call(a, b)
        } : k && (i = function () { a.contextMenu(d.menuClassName, k, d.translateX, d.translateY, d.width, d.height, d); d.setState(2) }); c.text && c.symbol ? n.paddingLeft = g.pick(n.paddingLeft, 25) : c.text || q(n, { width: c.width, height: c.height, padding: 0 }); d = e.button(c.text, 0, 0, i, n, p, o).attr({ title: a.options.lang[c._titleKey], 'stroke-linecap': 'round' }); d.menuClassName = b.menuClassName || 'highcharts-menu-' + a.btnCount++; c.symbol && (h = e.symbol(c.symbol, c.symbolX - j / 2, c.symbolY - j / 2, j, j).attr(q(m, {
          'stroke-width': c.symbolStrokeWidth ||
1,
          zIndex: 1
        })).add(d)); d.add().align(q(c, { width: d.width, x: g.pick(c.x, x) }), !0, 'spacingBox'); x += (d.width + c.buttonSpacing) * (c.align === 'right' ? -1 : 1); a.exportSVGElements.push(d, h)
      }
    },
    destroyExport (b) {
      var b = b.target; let a; let e; for (a = 0; a < b.exportSVGElements.length; a++) { if (e = b.exportSVGElements[a]) { e.onclick = e.ontouchstart = null, b.exportSVGElements[a] = e.destroy() } } for (a = 0; a < b.exportDivElements.length; a++) {
        e = b.exportDivElements[a], A(e, 'mouseleave'), b.exportDivElements[a] = e.onmouseout = e.onmouseover = e.ontouchstart =
e.onclick = null, p(e)
      }
    }
  }); H.menu = function (b, a, e, c) { return ['M', b, a + 2.5, 'L', b + e, a + 2.5, 'M', b, a + c / 2 + 0.5, 'L', b + e, a + c / 2 + 0.5, 'M', b, a + c - 1.5, 'L', b + e, a + c - 1.5] }; z.prototype.callbacks.push(function (b) { let a; const e = b.options.exporting; const c = e.buttons; x = 0; if (e.enabled !== !1) { for (a in c) { b.addButton(c[a]) }s(b, 'destroy', b.destroyExport) } })
})(Highcharts);
/*
  Highcharts JS v4.1.9 (2015-10-07)
 Solid angular gauge module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) {
  const q = a.getOptions().plotOptions; const r = a.pInt; const s = a.pick; const j = a.each; let k; q.solidgauge = a.merge(q.gauge, { colorByPoint: !0 }); k = {
    initDataClasses (b) { const c = this; const e = this.chart; let d; let o = 0; const f = this.options; this.dataClasses = d = []; j(b.dataClasses, function (g, h) { let p; var g = a.merge(g); d.push(g); if (!g.color) { f.dataClassColor === 'category' ? (p = e.options.colors, g.color = p[o++], o === p.length && (o = 0)) : g.color = c.tweenColors(a.Color(f.minColor), a.Color(f.maxColor), h / (b.dataClasses.length - 1)) } }) },
    initStops (b) {
      this.stops =
b.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; j(this.stops, function (b) { b.color = a.Color(b[1]) })
    },
    toColor (b, c) {
      let e; let d = this.stops; let a; const f = this.dataClasses; let g; let h; if (f) { for (h = f.length; h--;) { if (g = f[h], a = g.from, d = g.to, (a === void 0 || b >= a) && (d === void 0 || b <= d)) { e = g.color; if (c) { c.dataClass = h } break } } } else {
        this.isLog && (b = this.val2lin(b)); e = 1 - (this.max - b) / (this.max - this.min); for (h = d.length; h--;) { if (e > d[h][0]) { break } } a = d[h] || d[h + 1]; d = d[h + 1] || a; e = 1 - (d[0] - e) / (d[0] - a[0] || 1); e = this.tweenColors(a.color,
          d.color, e)
      } return e
    },
    tweenColors (b, c, a) { let d; !c.rgba.length || !b.rgba.length ? b = c.raw || 'none' : (b = b.rgba, c = c.rgba, d = c[3] !== 1 || b[3] !== 1, b = (d ? 'rgba(' : 'rgb(') + Math.round(c[0] + (b[0] - c[0]) * (1 - a)) + ',' + Math.round(c[1] + (b[1] - c[1]) * (1 - a)) + ',' + Math.round(c[2] + (b[2] - c[2]) * (1 - a)) + (d ? ',' + (c[3] + (b[3] - c[3]) * (1 - a)) : '') + ')'); return b }
  }; j(['fill', 'stroke'], function (b) { HighchartsAdapter.addAnimSetter(b, function (c) { c.elem.attr(b, k.tweenColors(a.Color(c.start), a.Color(c.end), c.pos)) }) }); a.seriesTypes.solidgauge =
a.extendClass(a.seriesTypes.gauge, {
  type: 'solidgauge',
  pointAttrToOptions: {},
  bindAxes () { let b; a.seriesTypes.gauge.prototype.bindAxes.call(this); b = this.yAxis; a.extend(b, k); b.options.dataClasses && b.initDataClasses(b.options); b.initStops(b.options) },
  drawPoints () {
    const b = this; const c = b.yAxis; const e = c.center; const d = b.options; const o = b.chart.renderer; const f = d.overshoot; const g = f && typeof f === 'number' ? f / 180 * Math.PI : 0; a.each(b.points, function (a) {
      const f = a.graphic; let i = c.startAngleRad + c.translate(a.y, null, null, null, !0); const j = r(s(a.options.radius,
        d.radius, 100)) * e[2] / 200; let l = r(s(a.options.innerRadius, d.innerRadius, 60)) * e[2] / 200; let m = c.toColor(a.y, a); let n = Math.min(c.startAngleRad, c.endAngleRad); const k = Math.max(c.startAngleRad, c.endAngleRad); m === 'none' && (m = a.color || b.color || 'none'); if (m !== 'none') { a.color = m }i = Math.max(n - g, Math.min(k + g, i)); d.wrap === !1 && (i = Math.max(n, Math.min(k, i))); n = Math.min(i, c.startAngleRad); i = Math.max(i, c.startAngleRad); i - n > 2 * Math.PI && (i = n + 2 * Math.PI); a.shapeArgs = l = { x: e[0], y: e[1], r: j, innerR: l, start: n, end: i, fill: m }; a.startR = j; if (f) {
        if (a = l.d,
        f.animate(l), a) { l.d = a }
      } else { a.graphic = o.arc(l).attr({ stroke: d.borderColor || 'none', 'stroke-width': d.borderWidth || 0, fill: m, 'sweep-flag': 0 }).add(b.group) }
    })
  },
  animate (b) { if (!b) { this.startAngleRad = this.yAxis.startAngleRad, a.seriesTypes.pie.prototype.animate.call(this, b) } }
})
})(Highcharts);
/*

 Highcharts funnel module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (c) {
  const q = c.getOptions(); const w = q.plotOptions; const r = c.seriesTypes; const G = c.merge; const F = function () {}; const C = c.each; const x = c.pick; w.funnel = G(w.pie, { animation: !1, center: ['50%', '50%'], width: '90%', neckWidth: '30%', height: '100%', neckHeight: '25%', reversed: !1, dataLabels: { connectorWidth: 1, connectorColor: '#606060' }, size: !0, states: { select: { color: '#C0C0C0', borderColor: '#000000', shadow: !1 } } }); r.funnel = c.extendClass(r.pie, {
    type: 'funnel',
    animate: F,
    translate () {
      var a = function (b, a) {
        return /%$/.test(b) ? a * parseInt(b, 10) / 100 : parseInt(b,
          10)
      }; let D = 0; var f = this.chart; const d = this.options; const c = d.reversed; const n = d.ignoreHiddenPoint; const g = f.plotWidth; const h = f.plotHeight; let q = 0; var f = d.center; const i = a(f[0], g); const r = a(f[1], h); const w = a(d.width, g); let k; let s; const e = a(d.height, h); const t = a(d.neckWidth, g); const u = a(d.neckHeight, h); const y = e - u; var a = this.data; let z; let A; const x = d.dataLabels.position === 'left' ? 1 : 0; let B; let l; let E; let p; let j; let v; let m; this.getWidthAt = s = function (b) { return b > e - u || e === u ? t : t + (w - t) * ((e - u - b) / (e - u)) }; this.getX = function (b, a) { return i + (a ? -1 : 1) * (s(c ? h - b : b) / 2 + d.dataLabels.distance) }; this.center = [i, r, e]; this.centerX = i; C(a, function (b) {
        if (!n ||
b.visible !== !1) { D += b.y }
      }); C(a, function (b) { m = null; A = D ? b.y / D : 0; l = r - e / 2 + q * e; j = l + A * e; k = s(l); B = i - k / 2; E = B + k; k = s(j); p = i - k / 2; v = p + k; l > y ? (B = p = i - t / 2, E = v = i + t / 2) : j > y && (m = j, k = s(y), p = i - k / 2, v = p + k, j = y); c && (l = e - l, j = e - j, m = m ? e - m : null); z = ['M', B, l, 'L', E, l, v, j]; m && z.push(v, m, p, m); z.push(p, j, 'Z'); b.shapeType = 'path'; b.shapeArgs = { d: z }; b.percentage = A * 100; b.plotX = i; b.plotY = (l + (m || j)) / 2; b.tooltipPos = [i, b.plotY]; b.slice = F; b.half = x; if (!n || b.visible !== !1) { q += A } })
    },
    drawPoints () {
      const a = this; const c = a.options; const f = a.chart.renderer; C(a.data,
        function (d) { const o = d.options; const n = d.graphic; const g = d.shapeArgs; n ? n.animate(g) : d.graphic = f.path(g).attr({ fill: d.color, stroke: x(o.borderColor, c.borderColor), 'stroke-width': x(o.borderWidth, c.borderWidth) }).add(a.group) })
    },
    sortByAngle (a) { a.sort(function (a, c) { return a.plotY - c.plotY }) },
    drawDataLabels () {
      const a = this.data; const c = this.options.dataLabels.distance; let f; let d; let o; let n = a.length; let g; let h; for (this.center[2] -= 2 * c; n--;) {
        o = a[n], d = (f = o.half) ? 1 : -1, h = o.plotY, g = this.getX(h, f), o.labelPos = [0, h, g + (c - 5) * d, h, g + c * d, h, f ? 'right'
          : 'left', 0]
      }r.pie.prototype.drawDataLabels.call(this)
    }
  }); q.plotOptions.pyramid = c.merge(q.plotOptions.funnel, { neckWidth: '0%', neckHeight: '0%', reversed: !0 }); c.seriesTypes.pyramid = c.extendClass(c.seriesTypes.funnel, { type: 'pyramid' })
})(Highcharts);
/*
 Highcharts JS v4.1.9 (2015-10-07)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2014 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (c) {
  function i () { return !!this.points.length } function e () { this.hasData() ? this.hideNoData() : this.showNoData() } const f = c.seriesTypes; const d = c.Chart.prototype; const g = c.getOptions(); const h = c.extend; const j = c.each; h(g.lang, { noData: 'No data to display' }); g.noData = { position: { x: 0, y: 0, align: 'center', verticalAlign: 'middle' }, attr: {}, style: { fontWeight: 'bold', fontSize: '12px', color: '#60606a' } }; j(['pie', 'gauge', 'waterfall', 'bubble'], function (a) { if (f[a]) { f[a].prototype.hasData = i } }); c.Series.prototype.hasData = function () {
    return this.visible &&
this.dataMax !== void 0 && this.dataMin !== void 0
  }; d.showNoData = function (a) { var b = this.options; var a = a || b.lang.noData; var b = b.noData; if (!this.noDataLabel) { this.noDataLabel = this.renderer.label(a, 0, 0, null, null, null, b.useHTML, null, 'no-data').attr(b.attr).css(b.style).add(), this.noDataLabel.align(h(this.noDataLabel.getBBox(), b.position), !1, 'plotBox') } }; d.hideNoData = function () { if (this.noDataLabel) { this.noDataLabel = this.noDataLabel.destroy() } }; d.hasData = function () {
    for (let a = this.series, b = a.length; b--;) {
      if (a[b].hasData() &&
!a[b].options.isInternal) { return !0 }
    } return !1
  }; d.callbacks.push(function (a) { c.addEvent(a, 'load', e); c.addEvent(a, 'redraw', e) })
})(Highcharts);
(function (k) {
  const l = k.Chart; const j = k.each; const m = k.pick; const n = HighchartsAdapter.addEvent; l.prototype.callbacks.push(function (e) { function f () { const c = []; j(e.series, function (a) { const b = a.options.dataLabels; const d = a.dataLabelCollections || ['dataLabel']; (b.enabled || a._hasPointLabels) && !b.allowOverlap && a.visible && j(d, function (b) { j(a.points, function (a) { if (a[b]) { a[b].labelrank = m(a.labelrank, a.shapeArgs && a.shapeArgs.height), c.push(a[b]) } }) }) }); e.hideOverlappingLabels(c) }f(); n(e, 'redraw', f) }); l.prototype.hideOverlappingLabels = function (e) {
    const f =
e.length; let c; let a; let b; let d; let g; let h; let i; for (a = 0; a < f; a++) { if (c = e[a]) { c.oldOpacity = c.opacity, c.newOpacity = 1 } }e.sort(function (a, b) { return (b.labelrank || 0) - (a.labelrank || 0) }); for (a = 0; a < f; a++) { b = e[a]; for (c = a + 1; c < f; ++c) { if (d = e[c], b && d && b.placed && d.placed && b.newOpacity !== 0 && d.newOpacity !== 0 && (g = b.alignAttr, h = d.alignAttr, i = 2 * (b.box ? 0 : b.padding), g = !(h.x > g.x + (b.width - i) || h.x + (d.width - i) < g.x || h.y > g.y + (b.height - i) || h.y + (d.height - i) < g.y))) { (b.labelrank < d.labelrank ? b : d).newOpacity = 0 } } }j(e, function (a) {
      let b, c; if (a) {
        c = a.newOpacity; if (a.oldOpacity !==
c && a.placed) { c ? a.show(!0) : b = function () { a.hide() }, a.alignAttr.opacity = c, a[a.isOld ? 'animate' : 'attr'](a.alignAttr, null, b) }a.isOld = !0
      }
    })
  }
})(Highcharts);
/*
 Highcharts JS v4.1.9 (2015-10-07)
 Data module

 (c) 2012-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (g) {
  const k = g.each; const t = g.pick; const r = HighchartsAdapter.inArray; const u = g.splat; let j; const p = function (b, a) { this.init(b, a) }; g.extend(p.prototype, {
    init (b, a) { this.options = b; this.chartOptions = a; this.columns = b.columns || this.rowsToColumns(b.rows) || []; this.firstRowAsNames = t(b.firstRowAsNames, !0); this.decimalRegex = b.decimalPoint && RegExp('^([0-9]+)' + b.decimalPoint + '([0-9]+)$'); this.rawColumns = []; this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet()) },
    getColumnDistribution () {
      const b =
this.chartOptions; let a = this.options; const e = []; const f = function (b) { return (g.seriesTypes[b || 'line'].prototype.pointArrayMap || [0]).length }; const d = b && b.chart && b.chart.type; const c = []; const h = []; let n = 0; let i; k(b && b.series || [], function (b) { c.push(f(b.type || d)) }); k(a && a.seriesMapping || [], function (b) { e.push(b.x || 0) }); e.length === 0 && e.push(0); k(a && a.seriesMapping || [], function (a) {
        const e = new j(); let o; const q = c[n] || f(d); const m = g.seriesTypes[((b && b.series || [])[n] || {}).type || d || 'line'].prototype.pointArrayMap || ['y']; e.addColumnReader(a.x, 'x'); for (o in a) {
          a.hasOwnProperty(o) &&
o !== 'x' && e.addColumnReader(a[o], o)
        } for (i = 0; i < q; i++) { e.hasReader(m[i]) || e.addColumnReader(void 0, m[i]) }h.push(e); n++
      }); a = g.seriesTypes[d || 'line'].prototype.pointArrayMap; a === void 0 && (a = ['y']); this.valueCount = { global: f(d), xColumns: e, individual: c, seriesBuilders: h, globalPointArrayMap: a }
    },
    dataFound () { if (this.options.switchRowsAndColumns) { this.columns = this.rowsToColumns(this.columns) } this.getColumnDistribution(); this.parseTypes(); this.parsed() !== !1 && this.complete() },
    parseCSV () {
      const b = this
      const a = this.options; const e = a.csv; const f = this.columns; const d = a.startRow || 0; const c = a.endRow || Number.MAX_VALUE; const h = a.startColumn || 0; const n = a.endColumn || Number.MAX_VALUE; let i; let g; let s = 0; e && (g = e.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split(a.lineDelimiter || '\n'), i = a.itemDelimiter || (e.includes('\t') ? '\t' : ','), k(g, function (a, e) { let g = b.trim(a); const v = g.indexOf('#') === 0; e >= d && e <= c && !v && g !== '' && (g = a.split(i), k(g, function (b, a) { a >= h && a <= n && (f[a - h] || (f[a - h] = []), f[a - h][s] = b) }), s += 1) }), this.dataFound())
    },
    parseTable () {
      const b = this.options; let a =
b.table; const e = this.columns; const f = b.startRow || 0; const d = b.endRow || Number.MAX_VALUE; const c = b.startColumn || 0; const h = b.endColumn || Number.MAX_VALUE; a && (typeof a === 'string' && (a = document.getElementById(a)), k(a.getElementsByTagName('tr'), function (b, a) { a >= f && a <= d && k(b.children, function (b, d) { if ((b.tagName === 'TD' || b.tagName === 'TH') && d >= c && d <= h) { e[d - c] || (e[d - c] = []), e[d - c][a - f] = b.innerHTML } }) }), this.dataFound())
    },
    parseGoogleSpreadsheet () {
      const b = this; const a = this.options; const e = a.googleSpreadsheetKey; const f = this.columns; const d = a.startRow || 0; const c = a.endRow ||
Number.MAX_VALUE; const h = a.startColumn || 0; const n = a.endColumn || Number.MAX_VALUE; let i; let g; e && jQuery.ajax({
        dataType: 'json',
        url: 'https://spreadsheets.google.com/feeds/cells/' + e + '/' + (a.googleSpreadsheetWorksheet || 'od6') + '/public/values?alt=json-in-script&callback=?',
        error: a.error,
        success (a) {
          var a = a.feed.entry; let e; const k = a.length; let m = 0; let j = 0; let l; for (l = 0; l < k; l++) { e = a[l], m = Math.max(m, e.gs$cell.col), j = Math.max(j, e.gs$cell.row) } for (l = 0; l < m; l++) { if (l >= h && l <= n) { f[l - h] = [], f[l - h].length = Math.min(j, c - d) } } for (l = 0; l < k; l++) {
            if (e = a[l], i = e.gs$cell.row -
1, g = e.gs$cell.col - 1, g >= h && g <= n && i >= d && i <= c) { f[g - h][i - d] = e.content.$t }
          }b.dataFound()
        }
      })
    },
    trim (b, a) { typeof b === 'string' && (b = b.replace(/^\s+|\s+$/g, ''), a && /^[0-9\s]+$/.test(b) && (b = b.replace(/\s/g, '')), this.decimalRegex && (b = b.replace(this.decimalRegex, '$1.$2'))); return b },
    parseTypes () { for (let b = this.columns, a = b.length; a--;) { this.parseColumn(b[a], a) } },
    parseColumn (b, a) {
      const e = this.rawColumns; const f = this.columns; let d = b.length; let c; let h; let g; let i; const k = this.firstRowAsNames; const j = r(a, this.valueCount.xColumns) !==
-1; const o = []; var q = this.chartOptions; let m; const p = (this.options.columnTypes || [])[a]; var q = j && (q && q.xAxis && u(q.xAxis)[0].type === 'category' || p === 'string'); for (e[a] || (e[a] = []); d--;) {
        if (c = o[d] || b[d], g = this.trim(c), i = this.trim(c, !0), h = parseFloat(i), e[a][d] === void 0 && (e[a][d] = g), q || d === 0 && k) { b[d] = g } else if (+i === h) { b[d] = h, h > 31536e6 && p !== 'float' ? b.isDatetime = !0 : b.isNumeric = !0, b[d + 1] !== void 0 && (m = h > b[d + 1]) } else if (h = this.parseDate(c), j && typeof h === 'number' && !isNaN(h) && p !== 'float') {
          if (o[d] = c, b[d] = h, b.isDatetime = !0, b[d + 1] !== void 0) {
            c =
h > b[d + 1]; if (c !== m && m !== void 0) { this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, d = b.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : b.unsorted = !0 } m = c
          }
        } else if (b[d] = g === '' ? null : g, d !== 0 && (b.isDatetime || b.isNumeric)) { b.mixed = !0 }
      }j && b.mixed && (f[a] = e[a]); if (j && m && this.options.sort) { for (a = 0; a < f.length; a++) { f[a].reverse(), k && f[a].unshift(f[a].pop()) } }
    },
    dateFormats: {
      'YYYY-mm-dd': {
        regex: /^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,
        parser (b) {
          return Date.UTC(+b[1],
            b[2] - 1, +b[3])
        }
      },
      'dd/mm/YYYY': { regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser (b) { return Date.UTC(+b[3], b[2] - 1, +b[1]) }, alternative: 'mm/dd/YYYY' },
      'mm/dd/YYYY': { regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser (b) { return Date.UTC(+b[3], b[1] - 1, +b[2]) } },
      'dd/mm/YY': { regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser (b) { return Date.UTC(+b[3] + 2e3, b[2] - 1, +b[1]) }, alternative: 'mm/dd/YY' },
      'mm/dd/YY': {
        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
        parser (b) { return Date.UTC(+b[3] + 2e3, b[1] - 1, +b[2]) }
      }
    },
    parseDate (b) {
      let a = this.options.parseDate; let e; let f; const d = this.options.dateFormat || this.dateFormat; let c; if (a) { e = a(b) } else if (typeof b === 'string') {
        if (d) { a = this.dateFormats[d], (c = b.match(a.regex)) && (e = a.parser(c)) } else { for (f in this.dateFormats) { if (a = this.dateFormats[f], c = b.match(a.regex)) { this.dateFormat = f; this.alternativeFormat = a.alternative; e = a.parser(c); break } } }c || (c = Date.parse(b), typeof c === 'object' && c !== null && c.getTime ? e = c.getTime() - c.getTimezoneOffset() *
6e4 : typeof c === 'number' && !isNaN(c) && (e = c - (new Date(c)).getTimezoneOffset() * 6e4))
      } return e
    },
    rowsToColumns (b) { let a, e, f, d, c; if (b) { c = []; e = b.length; for (a = 0; a < e; a++) { d = b[a].length; for (f = 0; f < d; f++) { c[f] || (c[f] = []), c[f][a] = b[a][f] } } } return c },
    parsed () { if (this.options.parsed) { return this.options.parsed.call(this, this.columns) } },
    getFreeIndexes (b, a) {
      let e; let f; const d = []; const c = []; let h; for (f = 0; f < b; f += 1) { d.push(!0) } for (e = 0; e < a.length; e += 1) {
        h = a[e].getReferencedColumnIndexes(); for (f = 0; f < h.length; f += 1) {
          d[h[f]] =
!1
        }
      } for (f = 0; f < d.length; f += 1) { d[f] && c.push(f) } return c
    },
    complete () {
      let b = this.columns; let a; const e = this.options; let f; let d; let c; let h; const g = []; let i; if (e.complete || e.afterComplete) {
        for (c = 0; c < b.length; c++) { if (this.firstRowAsNames) { b[c].name = b[c].shift() } }f = []; d = this.getFreeIndexes(b.length, this.valueCount.seriesBuilders); for (c = 0; c < this.valueCount.seriesBuilders.length; c++) { i = this.valueCount.seriesBuilders[c], i.populateColumns(d) && g.push(i) } for (;d.length > 0;) {
          i = new j(); i.addColumnReader(0, 'x'); c = r(0, d); c !== -1 && d.splice(c, 1); for (c =
0; c < this.valueCount.global; c++) { i.addColumnReader(void 0, this.valueCount.globalPointArrayMap[c]) }i.populateColumns(d) && g.push(i)
        }g.length > 0 && g[0].readers.length > 0 && (i = b[g[0].readers[0].columnIndex], i !== void 0 && (i.isDatetime ? a = 'datetime' : i.isNumeric || (a = 'category'))); if (a === 'category') { for (c = 0; c < g.length; c++) { i = g[c]; for (d = 0; d < i.readers.length; d++) { if (i.readers[d].configName === 'x') { i.readers[d].configName = 'name' } } } } for (c = 0; c < g.length; c++) {
          i = g[c]; d = []; for (h = 0; h < b[0].length; h++) { d[h] = i.read(b, h) }f[c] = { data: d }
          if (i.name) { f[c].name = i.name } if (a === 'category') { f[c].turboThreshold = 0 }
        }b = { series: f }; if (a) { b.xAxis = { type: a } }e.complete && e.complete(b); e.afterComplete && e.afterComplete(b)
      }
    }
  }); g.Data = p; g.data = function (b, a) { return new p(b, a) }; g.wrap(g.Chart.prototype, 'init', function (b, a, e) {
    const f = this; a && a.data ? g.data(g.extend(a.data, {
      afterComplete (d) {
        let c, h; if (a.hasOwnProperty('series')) {
          if (typeof a.series === 'object') { for (c = Math.max(a.series.length, d.series.length); c--;) { h = a.series[c] || {}, a.series[c] = g.merge(h, d.series[c]) } } else { delete a.series }
        } a = g.merge(d, a); b.call(f, a, e)
      }
    }), a) : b.call(f, a, e)
  }); j = function () { this.readers = []; this.pointIsArray = !0 }; j.prototype.populateColumns = function (b) { let a = !0; k(this.readers, function (a) { if (a.columnIndex === void 0) { a.columnIndex = b.shift() } }); k(this.readers, function (b) { b.columnIndex === void 0 && (a = !1) }); return a }; j.prototype.read = function (b, a) {
    const e = this.pointIsArray; const f = e ? [] : {}; let d; k(this.readers, function (c) { const d = b[c.columnIndex][a]; e ? f.push(d) : f[c.configName] = d }); if (this.name === void 0 && this.readers.length >=
2 && (d = this.getReferencedColumnIndexes(), d.length >= 2)) { d.shift(), d.sort(), this.name = b[d.shift()].name } return f
  }; j.prototype.addColumnReader = function (b, a) { this.readers.push({ columnIndex: b, configName: a }); if (!(a === 'x' || a === 'y' || a === void 0)) { this.pointIsArray = !1 } }; j.prototype.getReferencedColumnIndexes = function () { let b; const a = []; let e; for (b = 0; b < this.readers.length; b += 1) { e = this.readers[b], e.columnIndex !== void 0 && a.push(e.columnIndex) } return a }; j.prototype.hasReader = function (b) {
    let a, e; for (a = 0; a < this.readers.length; a +=
1) { if (e = this.readers[a], e.configName === b) { return !0 } }
  }
})(Highcharts)
