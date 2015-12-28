'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make2 = require('../../util/make.js');

var _Extendables = require('../objects/Extendables.js');

var _Extendables2 = _interopRequireDefault(_Extendables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this prototype defines a new service scope
exports.default = {
    thread: null,
    isReady: false,
    messageQueue: null,
    public: null,

    _make: function _make() {
        this.public = (0, _make2.Make)(_Extendables2.default.ServiceScopeInterface)(this);
        this.messageQueue = [];

        this._make = null;
    }
};