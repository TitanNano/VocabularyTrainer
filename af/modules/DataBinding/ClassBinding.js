'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Make = require('../../util/Make.js');

var _Binding = require('./Binding.js');

var _Binding2 = _interopRequireDefault(_Binding);

var _Parser = require('./Parser.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassBinding = (0, _Make.Make)( /** @lends ClassBinding.prototype*/{

    /**
     * @type {Object}
     */
    classes: null,

    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @constructs
     * @extends {Binding}
     */
    _make: _Binding2.default._make,

    applyClass: function applyClass(scope, classes, key) {
        var expression = classes[key];
        var value = (0, _Parser.parseExpression)(expression, scope);

        key = key[0] === '!' ? key.substr(1) : key;

        if (value) {
            this.parentNode.classList.add(key);
        } else {
            this.parentNode.classList.remove(key);
        }
    },

    update: function update(scope) {
        var _this = this;

        var classes = JSON.parse(JSON.stringify(this.classes));

        Object.keys(classes).filter(function (key) {
            return key.indexOf('!') === 0;
        }).forEach(this.applyClass.bind(this, scope, classes));

        setTimeout(function () {
            Object.keys(classes).filter(function (key) {
                return key.indexOf('!') !== 0;
            }).forEach(_this.applyClass.bind(_this, scope, classes));
        }, 0);
    }

}, _Binding2.default).get();

exports.default = ClassBinding;