'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recycle = exports.bindNode = exports.watcherList = undefined;

var _make = require('../../util/make.js');

var _Parser = require('./Parser.js');

var _Mapping = require('./Mapping.js');

var _Util = require('./Util.js');

var _Binding = require('./Binding.js');

var _Binding2 = _interopRequireDefault(_Binding);

var _ClassBinding = require('./ClassBinding.js');

var _ClassBinding2 = _interopRequireDefault(_ClassBinding);

var _TwoWayBinding = require('./TwoWayBinding.js');

var _TwoWayBinding2 = _interopRequireDefault(_TwoWayBinding);

var _ScopePrototype = require('./ScopePrototype.js');

var _ScopePrototype2 = _interopRequireDefault(_ScopePrototype);

var _EnabledBinding = require('./EnabledBinding.js');

var _EnabledBinding2 = _interopRequireDefault(_EnabledBinding);

var _TemplateRepeatBinding = require('./TemplateRepeatBinding.js');

var _TemplateRepeatBinding2 = _interopRequireDefault(_TemplateRepeatBinding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains all scope, scopeInfo pairs.
 *
 * @type {WeakMap}
 */
var scopeList = new WeakMap();

/**
 * @type {WeakMap[]}
 */
var scopeIndex = [];

/**
 * @type {Array[]}
 */
var watcherList = exports.watcherList = new WeakMap();

/**
 * @type {Object}
 */
var expressionTracking = {};

/**
 * applies the binding to the node for the given scope.
 *
 * @param {Node|string} node
 * @param {Object} scope
 * @return {ScopePrototype}
 */
var bindNode = exports.bindNode = function bindNode(node, scope, isolated) {
    scope = (0, _make.hasPrototype)(scope, _ScopePrototype2.default) ? scope : (0, _make.Make)(scope, _ScopePrototype2.default)();
    node = (0, _make.hasPrototype)(node, Node) ? node : (0, _Util.selectElement)(node);

    scopeList.set(scope, {
        node: node,
        bindings: []
    });

    scopeIndex.push(scope);

    checkNode(node, scope);
    recycle(isolated ? scope : false);

    return scope;
};

/**
 * Travels through a node and it's children searching for binding expressions
 *
 * @param {Node} node
 * @param {ScopePrototype} scope
 * @param {Node} parentNode
 */
var checkNode = function checkNode(node, scope, parentNode) {
    var dataRegex = /{{[^{}]*}}/g;
    var scopeInfo = scopeList.get(scope);

    if (node.nodeName == '#text' || node.nodeType === 2) {
        var text = node.value || node.textContent,
            variables = text.match(dataRegex),
            visibilityBinding = node.name === _Mapping.attributeNames.get('visible'),
            transparencyBinding = node.name === _Mapping.attributeNames.get('transparent'),
            enabledAttribute = node.name === _Mapping.attributeNames.get('enabled'),
            classes = node.name === _Mapping.attributeNames.get('classes'),
            modelBinding = node.name === _Mapping.attributeNames.get('model'),
            twoWay = node.name === _Mapping.attributeNames.get('value') || modelBinding;

        var singleBinding = visibilityBinding || transparencyBinding;

        if (twoWay) {
            bindTwoWay(text, scope, scopeInfo, node, parentNode, modelBinding);
        } else if (classes) {
            bindClasses(text, node, scopeInfo, parentNode);
        } else if (enabledAttribute) {
            bindEnabled(text, scopeInfo, parentNode);
        } else if (variables || singleBinding) {
            bindSimple(text, node, variables, scopeInfo, singleBinding, parentNode);
        }
    } else if (node.localName === 'template') {
        var repeatedTemplate = node.hasAttribute('replace') && node.hasAttribute('repeat');

        if (repeatedTemplate) {
            bindTemplateRepeat(node, scopeInfo);
        }
    } else {
        if (node.attributes) {
            node.attributes.forEach(function (child) {
                return checkNode(child, scope, node);
            });

            var events = node.getAttribute(_Mapping.attributeNames.get('events'));

            if (events !== null) {
                bindEvents(events, node, scope);

                node.removeAttribute(_Mapping.attributeNames.get('events'));
            }
        }

        node.childNodes.forEach(function (node) {
            return checkNode(node, scope);
        });
    }
};

/**
 * creates a two way binding
 *
 * @param {string} text
 * @param {ScopePrototype} scope
 * @param {Object} scopeInfo
 * @param {Node} node,
 * @param {Node} parentNode
 * @param {boolean} indirect
 */
var bindTwoWay = function bindTwoWay(text, scope, scopeInfo, node, parentNode, indirect) {
    var property = text.replace(/[{}]/g, '');
    var value = (0, _Parser.parseExpression)(property, scope);

    var _split = (parentNode.getAttribute(_Mapping.attributeNames.get('modelEvent')) || '').split(':');

    var _split2 = _slicedToArray(_split, 4);

    var event = _split2[0];
    var viewBinding = _split2[1];
    var eventBinding = _split2[2];
    var preventDefault = _split2[3];

    /** @type {TwoWayBinding} */

    var binding = (0, _make.Make)({
        properties: [property],
        originalNodeValue: text,
        currentValue: value,
        node: node,
        parentNode: parentNode,
        indirect: indirect,
        viewBinding: viewBinding
    }, _TwoWayBinding2.default).get();

    scopeInfo.bindings.push(binding);

    if (node.name === _Mapping.attributeNames.get('model')) {
        parentNode.addEventListener(event, function (e) {
            if (preventDefault === 'true') {
                e.preventDefault();
            }

            console.log(e);
            var value = (0, _Parser.parseExpression)(eventBinding, e);
            compareTwoWay(value, scope, binding);
        });
    } else if (node.name === _Mapping.attributeNames.get('value')) {
        parentNode.addEventListener('keyup', function (e) {
            e.preventDefault();
            compareTwoWay(getElementValue(e.target), scope, binding);
        });
    }
};

/**
 * Compares for changes in the UI in a two way binding
 *
 * @param {string} newValue
 * @param {ScopePrototype} scope
 * @param {TwoWayBinding} binding
 */
var compareTwoWay = function compareTwoWay(newValue, scope, binding) {
    if (binding.currentValue !== newValue) {
        (0, _Parser.assignExpression)(binding.properties[0], scope, newValue);
        binding.currentValue = newValue;

        console.log('update from view:', scope);

        recycle();
    }
};

/**
 * creates a simple binding
 *
 * @type {string} text
 * @type {Node} node
 * @type {string[]} variables
 * @type {ScopePrototype} scope
 * @type {ScopeInfo} scopeInfo
 */
var bindSimple = function bindSimple(text, node, variables, scopeInfo, singleExpression, parentNode) {
    /** @type {Binding} */
    var binding = (0, _make.Make)({
        originalNodeValue: text,
        node: node,
        parentNode: parentNode,
        singleExpression: singleExpression,
        properties: variables ? variables.map(function (item) {
            return item.replace(/[{}]/g, '');
        }) : []
    }, _Binding2.default).get();

    scopeInfo.bindings.push(binding);
};

var bindClasses = function bindClasses(text, node, scopeInfo, parentNode) {
    var binding = (0, _make.Make)({
        originalNodeValue: text,
        node: node,
        classes: (0, _Parser.ObjectParser)(text),
        parentNode: parentNode
    }, _ClassBinding2.default).get();

    scopeInfo.bindings.push(binding);
};

var bindEnabled = function bindEnabled(text, scopeInfo, parentNode) {
    var binding = (0, _make.Make)({
        originalNodeValue: text,
        parentNode: parentNode
    }, _EnabledBinding2.default)();

    scopeInfo.bindings.push(binding);
};

var bindTemplateRepeat = function bindTemplateRepeat(template, scopeInfo) {
    var marker = document.createComment('repeat ' + template.id + ' with ' + template.getAttribute('repeat'));
    var binding = (0, _make.Make)({
        originalNodeValue: template.getAttribute('repeat'),
        template: template,
        marker: marker
    }, _TemplateRepeatBinding2.default)();

    template.parentNode.replaceChild(marker, template);
    scopeInfo.bindings.push(binding);
};

/**
 * binds the events specified for a Node
 *
 * @param {string[]} events
 * @param {Node} node
 * @param {ScopePrototype} scope
 */
var bindEvents = function bindEvents(events, node, scope) {
    var eventRegex = /{[A-Za-z0-9\-_\.: \(\)]*}/g;

    events = events.match(eventRegex);

    events.forEach(function (event) {
        console.log(event);
        event = event.replace(/[{}]/g, '');

        var _event$split = event.split(':');

        var _event$split2 = _slicedToArray(_event$split, 2);

        var name = _event$split2[0];
        var method = _event$split2[1];

        if (scope.$methods && scope.$methods[method.trim()]) {
            node.addEventListener(name.trim(), function (e) {
                scope.$methods[method.trim()].apply(scope, [e]);

                scope.__apply__();
            });
        }
    });
};

var executeWatchers = function executeWatchers(scope) {
    watcherList.get(scope) && watcherList.get(scope).forEach(function (watcher) {
        var value = (0, _Parser.parseExpression)(watcher.expression, scope);

        expressionTracking[watcher.expression] = expressionTracking[watcher.expression] || { value: '', newValue: '' };

        if (expressionTracking[watcher.expression].value !== value) {
            watcher.cb.apply(scope, [value]);

            expressionTracking[watcher.expression].newValue = value;
        }
    });
};

/**
 * Checks every binding for the given scope and updates every value.
 *
 * @param {ScopePrototype} scope
 * @param {ScopeInfo} scopeInfo
 */
var recycle = exports.recycle = function recycle(scope) {
    var t0 = window.performance.now();

    if (scope) {
        executeWatchers(scope);
        scopeList.get(scope).bindings.forEach(function (binding) {
            return binding.update(scope);
        });
    } else {
        scopeIndex.forEach(function (scope) {
            executeWatchers(scope);
            scopeList.get(scope).bindings.forEach(function (binding) {
                return binding.update(scope);
            });
        });
    }

    Object.keys(expressionTracking).forEach(function (expr) {
        expr = expressionTracking[expr];

        expr.value = expr.newValue;
    });

    var t1 = window.performance.now();
    var duration = ((t1 - t0) / 1000).toFixed(2);

    if (scope) {
        console.log('scope recycled in ' + duration + 's', scope);
    } else {
        console.log('full recycle in ' + duration + 's');
    }
};

/**
 * Returns the value of an DOM Node
 *
 * @param {Node} node
 */
var getElementValue = function getElementValue(node) {
    if (node.localName === 'input') {
        return node.value;
    } else {
        return 'UNKNOWN NODE!';
    }
};