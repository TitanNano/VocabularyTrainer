"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EventManager = {
    listeners: null,

    _make: function _make() {
        this.listeners = [];

        this._make = null;
    },

    addEventListener: function addEventListener(type, listener, useCapture) {
        this.listeners.push({
            type: type,
            listener: listener,
            useCapture: useCapture
        });
    },

    dispatchEvent: function dispatchEvent(event) {
        var _this = this;

        setTimeout(function () {
            _this.listeners.forEach(function (item) {
                if (item.type === event.type) {
                    setTimeout(function () {
                        item.listener(event);
                    }, 0);
                }
            });
        }, 0);
    }
};

exports.default = EventManager;