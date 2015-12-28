'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * The make module consits of Make, getPrototypeOf and mixin.
 * See the documentation for each method to see what is does.
 * This module is part of the ApplicationFrame.
 * @module Make
 * @author Jovan Gerodetti
 * @copyright Jovan Gerodetti
 * @version 1.0
 */

/**
 * Internal function to apply one objects propteries to a target object.
 *
 * @param {Object} target
 * @param {Object} source
 * @inner
 */
var apply = function apply(target, source) {
    Object.keys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });

    return target;
};

/**
 * Creates a new object with the given prototype.
 * If two arguments are passed in, the properties of the first object will be
 * applied to the new object.
 *
 * @param {Object} object
 * @param {Object} prototype
 * @return {function}
 */
var Make = exports.Make = function Make(object, prototype) {
    if (arguments.length < 2) {
        prototype = object;
        object = null;
    }

    if (object === null) {
        object = Object.create(prototype);
    } else {
        object = apply(Object.create(prototype), object);
    }

    var m = function m() {
        var make = object.make || object._make || function () {};

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        make.apply(object, args);

        return object;
    };

    m.get = function () {
        return object;
    };

    return m;
};

/**
 * This method checks if the given prototype is in the prototype chain of
 * the given target object.
 *
 * @param {Object} object
 * @param {Object} prototype
 * @return {boolean}
 */
var hasPrototype = exports.hasPrototype = function hasPrototype(object, prototype) {
    var p = Object.getPrototypeOf(object);

    while (p !== null && p !== undefined) {
        if (typeof prototype == 'function') prototype = prototype.prototype;

        if (p == prototype) return true;else p = Object.getPrototypeOf(p);
    }

    return false;
};

/**
 * Creates a new prototype mixing all the given prototypes. Incase two or more
 * prototypes contain the same propterty, the new prototype will return
 * the propterty of the first prototype in the list which contains it.
 *
 * @param {...Object} prototypes
 * @return {Proxy}
 */
var Mixin = exports.Mixin = function Mixin() {
    for (var _len2 = arguments.length, prototypes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        prototypes[_key2] = arguments[_key2];
    }

    return new Proxy(prototypes, MixinTrap);
};

/**
 * Internal function to find a proptery in a list of prototypes.
 *
 * @param {Object[]} prototypes
 * @param {string} key
 * @return {Object}
 */
var findProperty = function findProperty(prototypes, key) {
    for (var i = 0; i < prototypes.length; i++) {
        var item = prototypes[i];

        if (item && item[key]) {
            return item;
        }
    }

    return undefined;
};

/**
 * Traps to create a mixin.
 */
var MixinTrap = {

    'get': function get(prototypes, key) {
        var object = findProperty(prototypes, key);

        if (object && typeof object[key] === 'function') {
            return object[key].bind(object);
        }

        return object ? object[key] : null;
    },

    'set': function set(prototypes, key, value) {
        var object = findProperty(prototypes, key);

        if (object) {
            object[key] = value;
        } else {
            prototypes[0][key] = value;
        }
    }
};