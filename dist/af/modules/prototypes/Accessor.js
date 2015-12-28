"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/** @lends Accessor.prototype */
var Accessor = {

    /**
     * @type {WeakMap}
     */
    privateMap: null,

    /**
     * @constructs
     */
    _make: function _make() {
        this.privateMap = new WeakMap();
    },

    /**
     * @deprecated
     * @param {Object} target
     * @param {Object} [object]
     */
    attributes: function attributes(target, object) {
        if (!object) {
            return { public: target, private: this.privateMap.get(target) };
        } else {
            this.privateMap.set(target, object);
            return { public: target, private: object };
        }
    },

    /**
     * @param {Object} target
     * @param {Object} [properties]
     */
    properties: function properties(target, _properties) {
        if (!_properties) {
            return this.privateMap.get(target);
        } else {
            return this.privateMap.set(target, _properties);
        }
    }
};

exports.default = Accessor;