"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (prototypes) {

    return new Proxy(prototypes, {
        get: function get(prototypes, key) {
            var prototype = Object.keys(prototypes).map(function (key) {
                return parseInt(key);
            }).sort(function (a, b) {
                return a > b;
            }).find(function (p) {
                return prototypes[p][key];
            });

            return prototypes[prototype][key];
        }
    });
};