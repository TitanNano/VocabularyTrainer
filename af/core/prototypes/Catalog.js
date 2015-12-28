'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Catalog = {

    _listeners: null,

    _make: function _make() {
        this._listeners = [];

        this._make = null;
    },

    on: function on(event, listener) {
        var self = this;

        return new Promise(function (success) {
            if (listener.length > 0) self._listeners.push({ event: event, listener: listener, success: success });else success();
        });
    },

    add: function add(key, value) {
        this[key] = value;
        var object = this;
        this._listeners.forEach(function (item) {

            if (item.event == 'available') {
                var ready = 0;
                item.listener.forEach(function (item) {
                    if (Object.keys(object).indexOf(item) > -1) ready++;
                });

                if (ready == item.listener.length) {
                    item.success();
                }
            }
        });
    }
};

exports.default = Catalog;