'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Engine = require('../objects/Engine.js');

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this prototype defines a new scope worker
exports.default = {
    scope: null,
    thread: null,
    progressListeners: null,
    promise: null,

    _make: function _make(f, scope) {
        var self = this;

        this.scope = scope;
        this.thread = new Worker(_Engine2.default.shared.threadLoader);
        this.thread.postMessage({ name: 'init', func: f });
        this.progressListeners = [];

        this.promise = new Promise(function (done) {
            self.thread.addEventListener('message', function (e) {
                if (e.data.name == 'af-worker-done') done(e.data.data);
            }, false);
        });

        this.thread.addEventListener('message', function (e) {
            if (e.data.name == 'af-worker-progress') self.progressListners.forEach(function (item) {
                item(e.data.data);
            });
        }, false);
    }
};