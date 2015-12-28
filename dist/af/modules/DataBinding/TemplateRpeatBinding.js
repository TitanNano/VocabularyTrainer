'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Make = require('../../util/Make.js');

var _Binding = require('./Binding.js');

var _Binding2 = _interopRequireDefault(_Binding);

var _Parser = require('./Parser.js');

var _Bind = require('./Bind.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateRepeatBinding = (0, _Make.Make)( /** @lends TemplateRepeatBinding.prototype*/{

    /**
     * @type {WeakMap<Node>}
     */
    itemNodeList: null,

    /**
     * @type {Node}
     */
    template: null,

    /**
     * @type {Node}
     */
    marker: null,

    /**
     * @type {Array}
     */
    modelBackup: null,

    /**
     * @constructs
     * @extends {Binding}
     */
    _make: function _make() {
        _Binding2.default._make.apply(this);

        this.itemNodeList = new WeakMap();
        this.modelBackup = [];
    },

    update: function update(scope) {
        var _this = this;

        var _originalNodeValue$sp = this.originalNodeValue.split(' ');

        var _originalNodeValue$sp2 = _slicedToArray(_originalNodeValue$sp, 3);

        var itemName = _originalNodeValue$sp2[0];
        var link = _originalNodeValue$sp2[1];
        var expression = _originalNodeValue$sp2[2];

        var model = (0, _Parser.parseExpression)(expression, scope);
        var cursor = this.marker.nextElementSibling;

        if (link !== 'in') {
            console.log('DataBinding: invalide expression', this.originalNodeValue);
            return;
        }

        if (Array.isArray(model)) {
            model.forEach(function (item, index) {
                var node = null;

                if (_this.itemNodeList.has(item)) {
                    node = _this.itemNodeList.get(item);
                } else {
                    /**
                     * @todo update this meta info on each recycle not only when we create a new scope.
                     */
                    var childScope = (0, _Make.Make)({
                        $first: index === 0,
                        $last: model.length - 1 === index,
                        $index: index
                    }, scope).get();

                    childScope[itemName] = item;

                    node = _this.template.content.cloneNode(true);
                    (0, _Bind.bindNode)(node, childScope);

                    _this.itemNodeList.set(item, node);
                }

                if (cursor) {
                    if (node !== cursor) {
                        cursor.parentNode.insertBefore(node, cursor);
                    }
                } else {
                    _this.marker.parentNode.appendChild(node);
                }

                _this.modelBackup.forEach(function (item) {
                    if (model.indexOf(item) < 0) {
                        _this.marker.parentNode.removeChild(_this.itemNodeList.get(item));
                        _this.itemNodeList.delete(item);
                    }
                });

                _this.modelBackup = model.slice();
            });
        }
    }

}, _Binding2.default).get();

exports.default = TemplateRepeatBinding;