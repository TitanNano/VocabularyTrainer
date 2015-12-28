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
var ObjectParser = exports.ObjectParser = function ObjectParser(source) {
    var target = null;
    var key = false;
    var keyBuffer = '';
    var valueBuffer = '';
    var run = true;

    source.split('').forEach(function (char) {
        if (run) {
            if (char === '{') {
                target = {};
                key = true;
            } else if (char === ':') {
                key = false;
            } else if (char === ',') {
                target[keyBuffer.trim()] = valueBuffer.trim();
                keyBuffer = valueBuffer = '';
                key = true;
            } else if (char === '}') {
                target[keyBuffer.trim()] = valueBuffer.trim();
                run = false;
            } else if (key) {
                keyBuffer += char;
            } else if (!key) {
                valueBuffer += char;
            }
        }
    });

    return target;
};

/**
 * Parses a given expression in the context of the given scope.
 *
 * @param {string} expression
 * @param {ScopePrototype} scope
 * @return {ScopePrototype}
 */
var parseExpression = exports.parseExpression = function parseExpression(expression, scope) {
    var chain = expression.split('.');

    chain.forEach(function (item) {
        var pos = item.search(/\(\)$/);

        if (scope) {
            if (pos > 0) {
                var scopeChild = scope[item.substring(0, pos)];

                if (scopeChild) {
                    scope = scopeChild.apply(scope);
                } else {
                    return '';
                }
            } else {
                scope = scope[item];
            }
        }
    });

    return typeof scope !== 'null' && typeof scope !== 'undefined' ? scope : '';
};

/**
 * Assings an value to an expression in an given scope
 *
 * @param {string} expression
 * @param {ScopePrototype} scope
 * @param {string} value
 */
var assignExpression = exports.assignExpression = function assignExpression(expression, scope, value) {
    var chain = expression.split('.');

    chain.forEach(function (property, index) {
        if (chain.length - 1 !== index) {
            scope = scope[property];
        } else {
            scope[property] = value;
        }
    });
};