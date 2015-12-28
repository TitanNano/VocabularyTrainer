'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    _l: null,
    busy: false,
    step: 0,
    status: 'notstarted',

    _make: function _make(loop) {
        this._l = loop;

        this._make = null;
    },

    run: function run() {
        this.busy = true;
        var loop = this;
        return new Promise(function (success) {
            var next = function next() {
                loop.step++;
                loop.status = 'running';
                loop._l(next, exit);
            };

            var exit = function exit(status) {
                if (status === 0) loop.status = 'canceled';else if (status > 0) loop.status = 'completed';else loop.status = 'error';
                loop.busy = false;
                loop.step = 0;
                success(loop);
            };

            next();
        });
    }
};