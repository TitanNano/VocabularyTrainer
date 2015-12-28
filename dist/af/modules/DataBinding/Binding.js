'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make2 = require('af/util/make.js');

var _Parser = require('./Parser.js');

var _Util = require('./Util.js');

var Binding = {

    /**
     * @type {string[]}
     */
    properties: null,

    /**
     * @type {string}
     */
    originalNodeValue: '',

    /**
     * @type {Node}
     */
    node: null,

    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @type {Boolean}
     */
    singleExpression: false,

    _make: function _make() {
        this.properties = [];
    },

    update: function update(scope) {
        var text = this.originalNodeValue;
        var values = this.properties.map(function (key) {
            return { name: key, value: (0, _Parser.parseExpression)(key, scope) };
        });

        if (this.singleExpression) {
            text = (0, _Parser.parseExpression)(text, scope);
        } else {
            values.forEach(function (pair) {
                text = text.replace('{{' + pair.name + '}}', pair.value);
            });
        }

        if ((0, _make2.hasPrototype)(this.node, window.Attr)) {
            (0, _Util.polyMask)(this.parentNode).setAttribute(this.node.name, text);
        } else {
            this.node.textContent = text;
        }
    }
};

exports.default = Binding;