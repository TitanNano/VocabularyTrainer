'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPolyParent = exports.polyMask = exports.unwrapPolymerNode = exports.selectAllElements = exports.selectElement = undefined;

var _make = require('af/util/make.js');

/**
 * selects a dom node by the given query.
 *
 * @param {string} query
 * @param {Node} context
 * @return {Node}
 */
var selectElement = exports.selectElement = function selectElement(query, context) {
    var node = null;

    if (context) {
        node = context.querySelector(query);
    } else {
        node = document.querySelector(query);
    }

    node = polyMask(node);

    return node;
};

/**
 * @param {string} query
 * @param {Node} context
 * @return {NodeList}
 */
var selectAllElements = exports.selectAllElements = function selectAllElements(query, context) {
    var nodeList = null;

    if (context) {
        nodeList = context.querySelectorAll(query);
    } else {
        nodeList = document.querySelectorAll(query);
    }

    if (window.Polymer) {
        nodeList = [].map.apply(nodeList, [polyMask]);
    }

    return nodeList;
};

var unwrapPolymerNode = exports.unwrapPolymerNode = function unwrapPolymerNode(node) {
    if (!(0, _make.hasPrototype)(node, Node)) {
        return (0, _make.Mixin)(node, node.node);
    }

    return node;
};

var polyMask = exports.polyMask = function polyMask(node) {
    var polyNode = {};

    var additions = {
        get bare() {
            return node;
        }
    };

    if (window.Polymer) {
        polyNode = window.Polymer.dom(node);
    }

    return (0, _make.Mixin)(polyNode, node, additions);
};

var getPolyParent = exports.getPolyParent = function getPolyParent(node, parentName) {
    while (node && node.localName !== parentName) {
        node = node.parentNode;
    }

    if (window.Polymer) {
        node = window.Polymer.dom(node);
    }

    return node;
};