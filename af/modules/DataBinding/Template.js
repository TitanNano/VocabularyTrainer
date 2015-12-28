'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeTemplate = undefined;

var _make = require('../../util/make.js');

var _Bind = require('./Bind.js');

var _Util = require('./Util.js');

var makeElementFromTemplate = function makeElementFromTemplate(template, scope, application, item) {
    var node = template.content.cloneNode(true);
    var placeholder = (0, _Util.selectElement)('bind-placeholder', node);

    item = (0, _Util.unwrapPolymerNode)(item);

    item.attributes.forEach(function (attr) {
        node.firstElementChild.setAttribute(attr.name, attr.value);
    });

    if (placeholder) {
        (function () {
            var node = item.firstElementChild;
            placeholder.parentNode.replaceChild(item.firstElementChild, placeholder.bare);

            [].forEach.apply(item.children, [function (item) {
                node.parentNode.appendChild(item);
            }]);
        })();
    }

    node.firstElementChild.className = template.id + ' ' + node.firstElementChild.className;

    scope = scope();

    [].map.apply(node.firstElementChild.attributes, [function (item) {
        if (item.name.search(/^scope\-/) > -1) {
            scope[item.name.replace(/^scope\-/, '')] = item.value;
        }
    }]);

    scope = (0, _Bind.bindNode)(node, scope);

    item.parentNode.replaceChild(node, item.bare);

    if (application) {
        application.emit('newElement:' + template.id, scope);
    }
};

/**
 * creates a new instance of an HTML template and applies the binding with
 * the given scope.
 *
 * @param {Node|string} template
 * @param {ScopePrototype} scope
 * @param {ApplicationScopeInterface} application
 * @return {Object}
 */
var makeTemplate = exports.makeTemplate = function makeTemplate(template, scope, application) {
    var _this = this;

    template = (0, _make.hasPrototype)(template, Node) ? template : (0, _Util.selectElement)(template);

    if (template.hasAttribute('bind-element')) {
        (function () {
            var makeElement = makeElementFromTemplate.bind(_this, template, scope, application);
            var list = (0, _Util.selectAllElements)(template.id);

            [].forEach.apply(list, [makeElement]);

            new MutationObserver(function (mutations) {
                mutations.forEach(function (item) {
                    if (item.addedNodes.length > 0) {
                        var _list = (0, _Util.selectAllElements)(template.id);

                        [].forEach.apply(_list, [makeElement]);
                    }
                });
            }).observe(document.body, {
                childList: true,
                subtree: true
            });
        })();
    } else {
        var node = template.content.cloneNode(true);

        scope = (0, _Bind.bindNode)(node, scope);

        if (template.hasAttribute('replace')) {
            template.parentNode.replaceChild(node, template.bare);
        }

        return { node: node, scope: scope };
    }
};