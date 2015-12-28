"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

var CryptoJS = CryptoJS || (function (q, f) {
  var c = {},
      d = c.lib = {},
      v = function v() {},
      s = d.Base = { extend: function extend(a) {
      v.prototype = this;var b = new v();a && b.mixIn(a);b.hasOwnProperty("init") || (b.init = function () {
        b.$super.init.apply(this, arguments);
      });b.init.prototype = b;b.$super = this;return b;
    }, create: function create() {
      var a = this.extend();a.init.apply(a, arguments);return a;
    }, init: function init() {}, mixIn: function mixIn(a) {
      for (var b in a) {
        a.hasOwnProperty(b) && (this[b] = a[b]);
      }a.hasOwnProperty("toString") && (this.toString = a.toString);
    }, clone: function clone() {
      return this.init.prototype.extend(this);
    } },
      t = d.WordArray = s.extend({ init: function init(a, b) {
      a = this.words = a || [];this.sigBytes = b != f ? b : 4 * a.length;
    }, toString: function toString(a) {
      return (a || r).stringify(this);
    }, concat: function concat(a) {
      var b = this.words,
          e = a.words,
          j = this.sigBytes;a = a.sigBytes;this.clamp();if (j % 4) for (var p = 0; p < a; p++) {
        b[j + p >>> 2] |= (e[p >>> 2] >>> 24 - 8 * (p % 4) & 255) << 24 - 8 * ((j + p) % 4);
      } else if (65535 < e.length) for (p = 0; p < a; p += 4) {
        b[j + p >>> 2] = e[p >>> 2];
      } else b.push.apply(b, e);this.sigBytes += a;return this;
    }, clamp: function clamp() {
      var a = this.words,
          b = this.sigBytes;a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);a.length = q.ceil(b / 4);
    }, clone: function clone() {
      var a = s.clone.call(this);a.words = this.words.slice(0);return a;
    }, random: function random(a) {
      for (var b = [], e = 0; e < a; e += 4) {
        b.push(4294967296 * q.random() | 0);
      }return new t.init(b, a);
    } }),
      w = c.enc = {},
      r = w.Hex = { stringify: function stringify(a) {
      var b = a.words;a = a.sigBytes;for (var e = [], j = 0; j < a; j++) {
        var p = b[j >>> 2] >>> 24 - 8 * (j % 4) & 255;e.push((p >>> 4).toString(16));e.push((p & 15).toString(16));
      }return e.join("");
    }, parse: function parse(a) {
      for (var b = a.length, e = [], j = 0; j < b; j += 2) {
        e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
      }return new t.init(e, b / 2);
    } },
      g = w.Latin1 = { stringify: function stringify(a) {
      var b = a.words;a = a.sigBytes;for (var e = [], j = 0; j < a; j++) {
        e.push(String.fromCharCode(b[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
      }return e.join("");
    }, parse: function parse(a) {
      for (var b = a.length, e = [], j = 0; j < b; j++) {
        e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
      }return new t.init(e, b);
    } },
      n = w.Utf8 = { stringify: function stringify(a) {
      try {
        return decodeURIComponent(escape(g.stringify(a)));
      } catch (b) {
        throw Error("Malformed UTF-8 data");
      }
    }, parse: function parse(a) {
      return g.parse(unescape(encodeURIComponent(a)));
    } },
      u = d.BufferedBlockAlgorithm = s.extend({ reset: function reset() {
      this._data = new t.init();this._nDataBytes = 0;
    }, _append: function _append(a) {
      "string" == typeof a && (a = n.parse(a));this._data.concat(a);this._nDataBytes += a.sigBytes;
    }, _process: function _process(a) {
      var b = this._data,
          e = b.words,
          j = b.sigBytes,
          p = this.blockSize,
          c = j / (4 * p),
          c = a ? q.ceil(c) : q.max((c | 0) - this._minBufferSize, 0);a = c * p;j = q.min(4 * a, j);if (a) {
        for (var g = 0; g < a; g += p) {
          this._doProcessBlock(e, g);
        }g = e.splice(0, a);b.sigBytes -= j;
      }return new t.init(g, j);
    }, clone: function clone() {
      var a = s.clone.call(this);
      a._data = this._data.clone();return a;
    }, _minBufferSize: 0 });d.Hasher = u.extend({ cfg: s.extend(), init: function init(a) {
      this.cfg = this.cfg.extend(a);this.reset();
    }, reset: function reset() {
      u.reset.call(this);this._doReset();
    }, update: function update(a) {
      this._append(a);this._process();return this;
    }, finalize: function finalize(a) {
      a && this._append(a);return this._doFinalize();
    }, blockSize: 16, _createHelper: function _createHelper(a) {
      return function (b, e) {
        return new a.init(e).finalize(b);
      };
    }, _createHmacHelper: function _createHmacHelper(a) {
      return function (b, e) {
        return new x.HMAC.init(a, e).finalize(b);
      };
    } });var x = c.algo = {};return c;
})(Math);
(function (q) {
  var f = CryptoJS,
      c = f.lib,
      d = c.Base,
      v = c.WordArray,
      f = f.x64 = {};f.Word = d.extend({ init: function init(c, d) {
      this.high = c;this.low = d;
    } });f.WordArray = d.extend({ init: function init(c, d) {
      c = this.words = c || [];this.sigBytes = d != q ? d : 8 * c.length;
    }, toX32: function toX32() {
      for (var c = this.words, d = c.length, f = [], r = 0; r < d; r++) {
        var g = c[r];f.push(g.high);f.push(g.low);
      }return v.create(f, this.sigBytes);
    }, clone: function clone() {
      for (var c = d.clone.call(this), f = c.words = this.words.slice(0), q = f.length, r = 0; r < q; r++) {
        f[r] = f[r].clone();
      }return c;
    } });
})();
(function (q) {
  for (var f = CryptoJS, c = f.lib, d = c.WordArray, v = c.Hasher, s = f.x64.Word, c = f.algo, t = [], w = [], r = [], g = 1, n = 0, u = 0; 24 > u; u++) {
    t[g + 5 * n] = (u + 1) * (u + 2) / 2 % 64;var x = (2 * g + 3 * n) % 5,
        g = n % 5,
        n = x;
  }for (g = 0; 5 > g; g++) {
    for (n = 0; 5 > n; n++) {
      w[g + 5 * n] = n + 5 * ((2 * g + 3 * n) % 5);
    }
  }g = 1;for (n = 0; 24 > n; n++) {
    for (var a = x = u = 0; 7 > a; a++) {
      if (g & 1) {
        var b = (1 << a) - 1;32 > b ? x ^= 1 << b : u ^= 1 << b - 32;
      }g = g & 128 ? g << 1 ^ 113 : g << 1;
    }r[n] = s.create(u, x);
  }for (var e = [], g = 0; 25 > g; g++) {
    e[g] = s.create();
  }c = c.SHA3 = v.extend({ cfg: v.cfg.extend({ outputLength: 512 }), _doReset: function _doReset() {
      for (var a = this._state = [], b = 0; 25 > b; b++) {
        a[b] = new s.init();
      }this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
    }, _doProcessBlock: function _doProcessBlock(a, b) {
      for (var c = this._state, g = this.blockSize / 2, k = 0; k < g; k++) {
        var d = a[b + 2 * k],
            l = a[b + 2 * k + 1],
            d = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360,
            l = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360,
            h = c[k];h.high ^= l;h.low ^= d;
      }for (g = 0; 24 > g; g++) {
        for (k = 0; 5 > k; k++) {
          for (var f = d = 0, m = 0; 5 > m; m++) {
            h = c[k + 5 * m], d ^= h.high, f ^= h.low;
          }h = e[k];h.high = d;h.low = f;
        }for (k = 0; 5 > k; k++) {
          h = e[(k + 4) % 5];d = e[(k + 1) % 5];l = d.high;m = d.low;d = h.high ^ (l << 1 | m >>> 31);f = h.low ^ (m << 1 | l >>> 31);for (m = 0; 5 > m; m++) {
            h = c[k + 5 * m], h.high ^= d, h.low ^= f;
          }
        }for (l = 1; 25 > l; l++) {
          h = c[l], k = h.high, h = h.low, m = t[l], 32 > m ? (d = k << m | h >>> 32 - m, f = h << m | k >>> 32 - m) : (d = h << m - 32 | k >>> 64 - m, f = k << m - 32 | h >>> 64 - m), h = e[w[l]], h.high = d, h.low = f;
        }h = e[0];k = c[0];h.high = k.high;h.low = k.low;for (k = 0; 5 > k; k++) {
          for (m = 0; 5 > m; m++) {
            l = k + 5 * m, h = c[l], d = e[l], l = e[(k + 1) % 5 + 5 * m], f = e[(k + 2) % 5 + 5 * m], h.high = d.high ^ ~l.high & f.high, h.low = d.low ^ ~l.low & f.low;
          }
        }h = c[0];k = r[g];h.high ^= k.high;h.low ^= k.low;
      }
    }, _doFinalize: function _doFinalize() {
      var a = this._data,
          b = a.words,
          c = 8 * a.sigBytes,
          e = 32 * this.blockSize;b[c >>> 5] |= 1 << 24 - c % 32;b[(q.ceil((c + 1) / e) * e >>> 5) - 1] |= 128;a.sigBytes = 4 * b.length;this._process();for (var a = this._state, b = this.cfg.outputLength / 8, c = b / 8, e = [], g = 0; g < c; g++) {
        var f = a[g],
            l = f.high,
            f = f.low,
            l = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360,
            f = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;e.push(f);e.push(l);
      }return new d.init(e, b);
    }, clone: function clone() {
      for (var a = v.clone.call(this), b = a._state = this._state.slice(0), c = 0; 25 > c; c++) {
        b[c] = b[c].clone();
      }return a;
    } });
  f.SHA3 = v._createHelper(c);f.HmacSHA3 = v._createHmacHelper(c);
})(Math);
(function () {
  var q = CryptoJS,
      f = q.enc.Utf8;q.algo.HMAC = q.lib.Base.extend({ init: function init(c, d) {
      c = this._hasher = new c.init();"string" == typeof d && (d = f.parse(d));var q = c.blockSize,
          s = 4 * q;d.sigBytes > s && (d = c.finalize(d));d.clamp();for (var t = this._oKey = d.clone(), w = this._iKey = d.clone(), r = t.words, g = w.words, n = 0; n < q; n++) {
        r[n] ^= 1549556828, g[n] ^= 909522486;
      }t.sigBytes = w.sigBytes = s;this.reset();
    }, reset: function reset() {
      var c = this._hasher;c.reset();c.update(this._iKey);
    }, update: function update(c) {
      this._hasher.update(c);return this;
    }, finalize: function finalize(c) {
      var d = this._hasher;c = d.finalize(c);d.reset();return d.finalize(this._oKey.clone().concat(c));
    } });
})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
  var h = CryptoJS,
      j = h.lib.WordArray;h.enc.Base64 = { stringify: function stringify(b) {
      var e = b.words,
          f = b.sigBytes,
          c = this._map;b.clamp();b = [];for (var a = 0; a < f; a += 3) {
        for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++) {
          b.push(c.charAt(d >>> 6 * (3 - g) & 63));
        }
      }if (e = c.charAt(64)) for (; b.length % 4;) {
        b.push(e);
      }return b.join("");
    }, parse: function parse(b) {
      var e = b.length,
          f = this._map,
          c = f.charAt(64);c && (c = b.indexOf(c), -1 != c && (e = c));for (var c = [], a = 0, d = 0; d < e; d++) {
        if (d % 4) {
          var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
              h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);a++;
        }
      }return j.create(c, a);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
})();

exports.default = CryptoJS;