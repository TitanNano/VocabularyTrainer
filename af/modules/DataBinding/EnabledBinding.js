'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make = require('../../util/make.js');

var _Binding = require('./Binding.js');

var _Binding2 = _interopRequireDefault(_Binding);

var _Parser = require('./Parser.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnabledBinding = (0, _make.Make)( /** @lends EnabledBinding.prototype*/{
    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @constructs
     * @extends {Binding}
     */
    _make: _Binding2.default._make,

    update: function update(scope) {
        var value = (0, _Parser.parseExpression)(this.originalNodeValue, scope);

        if (!value) {
            this.parentNode.setAttribute('disabled', '');
        } else {
            this.parentNode.removeAttribute('disabled');
        }
    }

}, _Binding2.default).get();

exports.default = EnabledBinding;