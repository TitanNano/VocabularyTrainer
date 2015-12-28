'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Bind = require('./Bind.js');

/**
 * Prototype for data binding scopes.
 */
var ScopePrototype = {

    /**
     * will apply the current state of the bound model.
     *
     * @param {function} fn
     */
    __apply__: function __apply__(fn, localRecycle) {
        if (fn) {
            fn();
        }

        return (0, _Bind.recycle)(localRecycle ? this : null);
    },

    __watch__: function __watch__(expression, cb) {
        if (!_Bind.watcherList.has(this)) {
            _Bind.watcherList.set(this, []);
        }

        _Bind.watcherList.get(this).push({
            expression: expression,
            cb: cb
        });
    }
};

exports.default = ScopePrototype;