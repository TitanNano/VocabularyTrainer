'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.main = undefined;

var _make2 = require('util/make.js');

var _error = require('util/error.js');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var select = function select(selector) {
    if (selector[0] == '@') {
        return document.querySelectorAll(selector.substr(1));
    } else {
        return document.querySelector(selector);
    }
};

var main = exports.main = function main(Prototypes, Scopes) {
    var ApplicationScopeInterface = Prototypes.ApplicationScopeInterface;
    var error = _error2.default.error;

    Prototypes.ControllerTreeNode = {
        _make: function _make(queryTree) {
            var _this = this;

            var node = null;
            var listeners = [];
            var construct = null;

            if ((0, _make2.hasPrototype)(queryTree, String)) {
                node = select(queryTree);
            } else if ((0, _make2.hasPrototype)(queryTree, Object)) {
                Object.keys(queryTree).forEach(function (key) {
                    if (key == 'selector') {
                        node = select(queryTree[key]);
                    } else if (key[0] == '$') {
                        listeners.push({ name: key.substr(1), f: queryTree[key] });
                    } else if (key == 'c') {
                        construct = queryTree[key];
                    } else {
                        _this[key] = (0, _make2.Make)(Prototypes.ControllerTreeNode)(queryTree[key]);
                    }
                });

                if (construct !== null) construct.apply(this);

                listeners.forEach(function (item) {
                    if ((0, _make2.hasPrototype)(node, NodeList)) {
                        [].forEach.apply(node, [function (node) {
                            node.addEventListener(item.name, item.f);
                        }]);
                    } else {
                        node.addEventListener(item.name, item.f);
                    }
                });
            }

            Scopes.set(this, node);
        },

        attribute: function attribute() {},

        dataset: function dataset(name, value) {
            var node = Scopes.get(this);

            if (value) node.dataset[name] = value;else return node.dataset[name];
        }
    };

    Prototypes.ApplicationScopeInterface = (0, _make2.Make)({

        controller: function controller(tree) {}

    }, ApplicationScopeInterface).get();
};

var config = exports.config = {
    main: 'main',
    version: 'v1.0',
    author: 'Jovan Gerodetti',
    type: 'extension'
};

/*
query tree

{
    'body' {
        name : 'body',
        header : '.header',
        content : {
            c : function(){},
            selector : 'div.content',
            $click : function(){},
            title : '.title span',
            main : '.main',
            articles : {
                selector : '@.main .article',
                $click : function(){},
            },
            'footer' : {
                selector : 'footer',
                left : '.left',
                right : {
                    $mouseover : function(){}
                }
            }
        }
    }
}

*/