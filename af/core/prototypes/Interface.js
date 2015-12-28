'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Scopes = require('../objects/Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interface = {

    _make: function _make(scope) {
        _Scopes2.default.set(this, scope);

        this._make = null;
    }

};

exports.default = Interface;