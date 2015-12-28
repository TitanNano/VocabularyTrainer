'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _DataBinding = require('af/modules/DataBinding.js');

var _make2 = require('af/util/make.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UiPage = (0, _make2.Make)( /** @lends UiPage.prototype*/{

    _elements: {},

    _active: null,

    _make: function _make() {
        var _this = this;

        _App2.default.on('newElement:ui-page', function (scope) {
            _this._elements[scope.name] = scope;

            if (scope.active) {
                _this._active = scope;
            }

            _App2.default.emit('ui-page:' + scope.name, scope);
        });
    },

    activate: function activate(name) {
        this._active.active = false;
        this._elements[name].active = true;
        this._active = this._elements[name];

        _App2.default.emit('ui-page:activated');
        _App2.default.emit('ui-page:' + name + ':activated');
        this._active.__apply__();
    },

    init: function init() {
        _DataBinding.DataBinding.makeTemplate('#ui-page', function () {
            return {
                side: 'left',

                active: false,

                isRight: function isRight() {
                    return this.side === 'right';
                },

                isLeft: function isLeft() {
                    return this.side === 'left';
                }
            };
        }, _App2.default);
    }
})();

exports.default = UiPage;