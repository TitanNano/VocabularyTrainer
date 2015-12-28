'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Parses an object expression
 *
 * @param {string} source
 * @param {ScopePrototype} scope
 */
var ObjectParser = function ObjectParser(source) {
    var target = null;
    var key = false;
    var read = true;
    var skip = true;
    var keyBuffer = '';
    var valueBuffer = '';
    var run = false;

    source.split('').forEach(function (char) {
        if (run) {
            if (char === '{') {
                target = {};
                key = true;
            } else if (char === ' ' && !skip) {
                read = false;
            } else if (key && read) {
                keyBuffer += char;
                skip = false;
            } else if (char === ':') {
                skip = read = true;
                key = false;
            } else if (char === ',') {
                target[keyBuffer] = valueBuffer;
                keyBuffer = valueBuffer = '';
                key = skip = true;
            } else if (char === '}') {
                target[keyBuffer] = valueBuffer;
                run = false;
            } else if (!key && read) {
                valueBuffer += char;
                skip = false;
            }
        }
    });
};

exports.default = ObjectParser;