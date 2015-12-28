/*****************************************************************
 * dom.js v1.1  part of the ApplicationFrame                     *
 * © copyright by Jovan Gerodetti (TitanNano.de)                 *
 * The following Source is licensed under the Appache 2.0        *
 * License. - http://www.apache.org/licenses/LICENSE-2.0         *
 *****************************************************************/

"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
var apply = function apply(target, features) {
    Object.keys(features).forEach(function (key) {
        target[key] = features[key];
    });
};

var append = function append(element) {
    return this.appendChild(element);
};

var classes = function classes() {
    var list = this.className.split(' ');
    var add = [];
    var remove = [];

    for (var _len = arguments.length, _classes = Array(_len), _key = 0; _key < _len; _key++) {
        _classes[_key] = arguments[_key];
    }

    _classes.forEach(function (item) {
        if (item.substr(0, 1) == '-') remove.push(item.substr(1));else if (item.substr(0, 1) == '+') add.push(item.substr(1));else add.push(item);
    });

    remove.forEach(function (item) {
        if (list.indexOf(item) > -1) list.splice(list.indexOf(item), 1);
    });

    add.forEach(function (item) {
        if (list.indexOf(item) < 0) list.push(item);
    });

    this.className = list.join(' ');
};

var css = function css(properties, extend) {
    if (extend) {
        var current = {};
        properties.split(';').forEach(function (item) {
            var _item$split = item.split(':');

            var _item$split2 = _slicedToArray(_item$split, 2);

            var key = _item$split2[0];
            var value = _item$split2[1];

            current[key] = value;
        });

        Object.keys(properties).forEach(function (key) {
            if (properties[key] === null) delete current[key];else current[key] = properties[key];
        });

        this.style.cssText = Object.keys(current).map(function (key) {
            return key + ':' + current[key];
        }).join(';');
    } else {
        this.style.cssText = Object.keys(properties).map(function (key) {
            return key + ':' + properties[key];
        }).join(';');
    }
};

var replace = function replace(node) {
    if (node instanceof Node) {
        this.parentNode.replaceChild(node, this);
    }
};

var transition = function transition() {
    for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
    }

    return new Promise((function (setValue) {
        //     		set event listener
        this.addEventListener('transitionend', function x(e) {
            this.removeEventListener('transitionend', x);
            setValue(this, e);
        });

        classes.apply(this, items);
    }).bind(this));
};

var remove = function remove() {
    this.parentNode.removeChild(this);
};

var dom = exports.dom = function dom(item) {

    var features = {
        append: append,
        classes: classes,
        css: css,
        replace: replace,
        remove: remove,
        transition: transition
    };

    if (item instanceof String) {
        item = document.querySelector(item);
    }

    if (item && item instanceof Node) {
        apply(item, features);
    } else if (item && (item instanceof Array || item instanceof NodeList)) {
        item.map(function (element) {
            return apply(element, features);
        });
    } else {
        item = null;
    }

    return item;
};

dom.selectAll = function (query) {
    return dom(document.querySelectorAll(query));
};

dom.create = function (elementName) {
    return dom(document.createElement(elementName));
};

var config = exports.config = {
    author: 'Jovan Gerodetti',
    main: 'dom',
    version: 'v1.0',
    name: 'DOM manipulation Module'
};