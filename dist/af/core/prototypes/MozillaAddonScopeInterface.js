'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _make = require('../../util/make.js');

var _functions = require('../../util/functions.js');

var _Scopes = require('../objects/Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

var _ApplicationScopeInterface = require('./ApplicationScopeInterface.js');

var _ApplicationScopeInterface2 = _interopRequireDefault(_ApplicationScopeInterface);

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this	prototype defines a new mozilla addon scope interface
exports.default = (0, _make.Make)({

	create: _ApplicationScopeInterface2.default.main,

	'module': _ApplicationScopeInterface2.default.module,

	modules: function modules(depsObject) {
		var scope = _Scopes2.default.get(this);

		Object.keys(depsObject).forEach(function (key) {
			if (!scope.modules[key]) scope.modules[key] = depsObject[key];
		});

		return this;
	},

	hook: function hook(globalObject) {
		var scope = _Scopes2.default.get(this);

		scope.global = globalObject;

		return this;
	},

	dataURL: function dataURL() {
		//		var prefixURI= require('@loader/options').prefixURI;

		//        return (prefixURI + 'af/lib/') + (path || '');
	},

	talkTo: function talkTo(worker) {
		return {
			talk: function talk(type, message) {
				return new Promise(function (okay) {
					var id = (0, _functions.createUniqueId)();
					worker.port.on(id, function ready(e) {
						worker.port.removeListener(ready);
						okay(e);
					});
					worker.port.emit(type, { id: id, message: message });
				});
			},
			listen: function listen(type, callback) {
				worker.port.on(type, function (e) {
					var id = e.id;
					callback(e.message, function (message) {
						worker.port.emit(id, message);
					});
				});
			}
		};

		return this;
	}
}, _Interface2.default).get(); /* global require */