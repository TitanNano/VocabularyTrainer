'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Contains all the attribute names
 *
 * @type {Object}
 */
var attributeNames = exports.attributeNames = {
    events: 'events',
    visible: 'display',
    transparent: 'visible',
    classes: 'class',
    value: 'value',
    prefix: 'bind',
    enabled: 'enabled',
    model: 'model',
    modelEvent: 'model-event',

    get: function get(key) {
        return this.prefix + '-' + this[key];
    },

    rename: function rename(name) {
        return name.replace(this.prefix + '-', '');
    }
};