'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Make = require('../../util/Make.js');

var _Parser = require('./Parser.js');

var _Mapping = require('./Mapping.js');

var _Binding = require('./Binding.js');

var _Binding2 = _interopRequireDefault(_Binding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwoWayBinding = (0, _Make.Make)( /** @lends TwoWayBinding.prototype*/{
    /**
     * @type {string}
     */
    currentValue: '',

    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @type {boolean}
     */
    indirect: false,

    /**
     * @type {string}
     */
    viewBinding: '',

    update: function update(scope) {
        var value = (0, _Parser.parseExpression)(this.properties[0], scope);
        var attribute = _Mapping.attributeNames.rename(this.node.name);

        if (!this.indirect) {
            this.parentNode.setAttribute(attribute, value);
        } else {
            var oldValue = (0, _Parser.parseExpression)(this.viewBinding, this.parentNode);

            if (value !== oldValue) {
                (0, _Parser.assignExpression)(this.viewBinding, this.parentNode, value);
                this.currentValue = value;
            }
        }
    }
}, _Binding2.default).get();

exports.default = TwoWayBinding;