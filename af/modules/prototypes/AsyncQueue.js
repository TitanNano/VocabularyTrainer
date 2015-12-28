"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    queue: null,
    active: false,
    processor: null,

    _make: function _make(processor) {
        this._processor = processor;

        this._make = null;
    },

    next: function next() {
        if (this.queue.length > 0) {
            this.integrate.apply(this, _toConsumableArray(this.queue.shift()));
            this.next();
        } else {
            this.active = false;
        }
    },

    push: function push() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (done) {
            args.push(done);
            _this.queue.push(args);

            if (!_this.active) {
                _this.active = true;
                _this.next();
            }
        }).then(function () {
            return _this.next();
        });
    }
};