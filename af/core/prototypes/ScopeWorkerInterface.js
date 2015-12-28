'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _make = require('../../util/make.js');

var _Scopes = require('../objects/Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this prototype defines a new scope worker interface
exports.default = (0, _make.Make)({
	then: function then(f) {
		return _Scopes2.default.get(this).promise.then(f);
	},

	onprogress: function onprogress(f) {
		_Scopes2.default.get(this).progressListeners.push(f);
	}
}, _Interface2.default).get();