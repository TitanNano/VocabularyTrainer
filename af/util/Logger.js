'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make = require('./make.js');

exports.default = {
    error: function error() {
        var _console;

        var level = 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if ((0, _make.hasPrototype)(args[args.length - 1], Number)) {
            level = args.pop();
        }

        level += 1;

        var stackTrace = new Error().stack.split('\n');

        stackTrace = stackTrace.slice(level, stackTrace.length);

        args.push('\n\n' + stackTrace.join('\n'));

        (_console = console).error.apply(_console, args);
    }
};