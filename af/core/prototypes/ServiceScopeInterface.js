'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _make = require('../../util/make.js');

var _functions = require('../../util/functions.js');

var _Scopes = require('../objects/Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

var _Engine = require('../objects/Engine.js');

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this prototype defines a new service scope loader
exports.default = (0, _make.Make)({

	talk: function talk(name, data) {
		var scope = _Scopes2.default.get(this);

		if (name != 'init' && !scope.isReady) {
			return new Promise(function (success) {
				scope.messageQueue.push({ name: name, data: data, resolve: success });
			});
		} else {
			return new Promise(function (success) {
				var id = (0, _functions.createUniqueId)();
				var listener = function listener(e) {
					if (e.data.id == id) {
						scope.thread.removeEventListener('message', listener);
						success(e.data.data);
					}
				};

				scope.thread.addEventListener('message', listener, false);
				scope.thread.postMessage({ name: name, id: id, data: data });
			});
		}
	},

	listen: function listen(name, callback) {
		var scope = _Scopes2.default.get(this);

		scope.addEventListener('message', function (e) {
			if (e.data.name == name) {
				var id = e.data.id;
				var setAnswer = function setAnswer(data) {
					scope.postMessage({ id: id, data: data });
				};
				callback(e.data.data, setAnswer);
			}
		}, false);

		return this;
	},

	main: function main(source) {
		var scope = _Scopes2.default.get(this);

		scope.thread = new ServiceWorker(_Engine2.default.shared.serviceLoader + '?' + scope.name);

		if (typeof source == "function") {
			source = '$$.main= ' + source.toString();
			source = new Blob([source], { type: 'text/javascript' });
			source = URL.createObjectURL(source);
		}

		scope.thread.talk('init', source).then(function () {
			scope.isReady = true;
			scope.messageQueue.forEach(function (item) {
				scope.thread.talk(item.name, item.data).then(function (data) {
					item.resolve(data);
				});
			});

			scope.messageQueue = null;
			//			source= $$.URL.revokeObjectURL(source);
		});

		return this;
	}
}, _Interface2.default).get();