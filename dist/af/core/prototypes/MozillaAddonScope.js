'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make2 = require('../../util/make.js');

var _Extendables = require('../objects/Extendables.js');

var _Extendables2 = _interopRequireDefault(_Extendables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this prototype defines a new mozilla addon scope
exports.default = {
    name: 'addon',
    type: 'addon',
    public: null,

    _make: function _make() {
        this.public = (0, _make2.Make)(_Extendables2.default.MozillaAddonScopeInterface)(this);

        var self = this;
        this.private = {
            public: this.public,
            onprogress: function onprogress(f) {
                self.listeners.push({ type: 'progress', listener: f });
            }
        };

        this._make = null;
    }
};