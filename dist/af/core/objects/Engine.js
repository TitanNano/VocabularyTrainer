'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _make = require('../../util/make.js');

var _functions = require('../../util/functions.js');

var _ApplicationScope = require('../prototypes/ApplicationScope.js');

var _ApplicationScope2 = _interopRequireDefault(_ApplicationScope);

var _ServiceScope = require('../prototypes/ServiceScope.js');

var _ServiceScope2 = _interopRequireDefault(_ServiceScope);

var _Scopes = require('./Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

var _Extendables = require('./Extendables.js');

var _Extendables2 = _interopRequireDefault(_Extendables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Engine
 * @author Jovan Gerodetti <jovan@titannao.de>
 * @copyright by TitanNano / Jovan Gerodetti - {@link http://www.titannano.de}
 * @role Inner
 */

var $$ = window;

/**
 * The engine holds private flags, arrays and functions.
 *
 * @namespace
 * @inner
 */
var Engine = {

	/**
  * @namespace
  */
	shared: {

		/**
   * @type {string}
   */
		serviceLoader: '',

		/**
   * @type {string[]}
   */
		renderModes: ['default'],

		/**
   * @type {Object}
   */
		features: {
			chromeLevel: location.protocol == 'chrome:' || location.protocol == 'resource:',
			//			storrage : !Engine.features.chromeLevel && (function(){try{ return sessionStorage && localStorage; }catch(e){ return false; }})(),
			//			indexedDB : !Engine.features.chromeLevel && (function(){try{ return indexedDB; }catch(e){ return false; }})(),
			notifications: Notification || false,
			renderFrame: requestAnimationFrame || false,
			audio: Audio || false,
			indexOf: Array.indexOf || false,
			forEach: Array.forEach || false,
			geolocation: navigator.geolocation || false,
			appCache: applicationCache || false,
			xcom: $$.postMessage || false,
			blobs: Blob || false,
			clipBoard: $$.ClipboardEvent || false,
			file: $$.File || false,
			fileReader: FileReader || false,
			hashchange: typeof onhashchange != "undefined" || false,
			json: JSON || false,
			matchMedia: matchMedia || false,
			timing: $$.PerformanceTiming || false,
			pageVisibility: typeof document.hidden != "undefined" && document.visibilityState,
			serverSentEvent: $$.EventSource || false,
			webWorker: Worker || false,
			sharedWebWorker: SharedWorker || false,
			arrayBuffer: ArrayBuffer || false,
			webSocket: WebSocket || false,
			computedStyle: getComputedStyle || false,
			deviceOrientation: $$.DeviceOrientationEvent || false
		},

		/**
   * @type {Object}
   * @property {string} EXTENSION
   */
		moduleTypes: {
			EXTENSION: 'extension'
		}
	},

	/**
  * @namespace
  */
	itemLibrary: {

		/**
   * @type {module:Engine~LibraryItem}
   */
		addon: (function () {
			var self = {};

			self.talk = function (type, message) {
				if ($$ != self) {
					return new Promise(function (okay) {
						var id = (0, _functions.createUniqueId)();
						var ready = function ready(e) {
							self.port.removeListener(ready);
							okay(e);
						};
						console.log(id);
						self.port.on(id, ready, false);
						self.port.emit(type, { id: id, message: message });
					});
				} else {
					console.error('Not available in this context!!');
				}
			};

			self.listen = function (type, callback) {
				if ($$ != self) {
					self.port.on(type, function (e) {
						var id = e.id;
						callback(e.message, function (message) {
							self.port.emit(id, message);
						});
					});
				} else {
					console.error('Not available in this context!!');
				}
			};

			if ($$ != self) return self;else return null;
		})(),

		/**
   * @type module:Engine~LibraryItem
   */
		applications: {
			'new': function _new(name) {
				var scope = (0, _make.Make)(_ApplicationScope2.default)(name);

				Engine.pushScope(scope);

				return scope.public;
			}
		},

		/**
   * @type module:Engine~LibraryItem
   */
		services: {
			'new': function _new(name) {
				Engine.pushScope((0, _make.Make)(_ServiceScope2.default)(name));
			},
			setLoaderModule: function setLoaderModule(url) {
				Engine.shared.serviceLoader = url;
			}
		},

		/**
   * @type {module:Engine~LibraryItem}
   */
		wrap: function wrap(source) {
			return new Promise(function (done) {
				done(source.apply({}));
			});
		},

		/**
   * @type {module:Engine~LibraryItem}
   */
		system: {
			settings: function settings(_settings) {
				_functions.objectExtend.apply(Engine.options, [_settings]);
			},
			info: function info() {
				return (0, _functions.cloneObject)(Engine.info);
			},
			shared: function shared() {
				return Engine.shared;
			},
			'import': function _import() {
				for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
					modules[_key] = arguments[_key];
				}

				var moduleTypes = Engine.shared.moduleTypes;

				Engine.ready = new Promise(function (ready) {
					Promise.all(modules.map(function (m) {
						return System.import(m);
					})).then(function (modules) {
						return modules.forEach(function (m) {
							if ('config' in m) {
								if (m.config.main) {
									if (m.config.type && m.config.type == moduleTypes.EXTENSION) {
										m[m.config.main](_Extendables2.default, _Scopes2.default);
									} else if (!(m.config.main in Engine.itemLibrary)) {
										Engine.itemLibrary[m.config.main] = m[m.config.main];
									} else {
										console.warn('an other version of "' + m.config.main + '" is already loaded!');
									}
								} else {
									console.error('couldn\'t find main in module config!');
								}
							}
						});
					});
				});
			}
		}
	},

	/**
  * @type {Object}
  * @property {string} applicationName
  * @property {string} renderMode
  * @property {string} override
  */
	options: {
		applicationName: '',
		renderMode: 'default',
		override: 'false'
	},

	/**
  * @type {Object}
  * @property {string} engine
  * @property {string} engineVersion
  * @property {string} platform
  */
	info: {
		engine: 'unknown',
		engineVersion: '1',
		platform: 'unknown',
		arch: 'x32',
		type: 'unknown'
	},

	/**
  * @type {Object}
  */
	scopeList: {},

	/**
  * @param {string} name
  *
  */ /**
     * @param {object} name
     */
	getLibraryItem: function getLibraryItem(name) {
		if (typeof name == 'string') {
			return Engine.itemLibrary[name];
		} else {
			return Engine.itemLibrary[name.name];
		}
	},

	/**
  * @param {Scope} scope
  */
	pushScope: function pushScope(scope) {
		if (!this.scopeList[scope.name] && scope.name != "application") this.scopeList[scope.name] = scope;else console.error('a scope with this name does already exist!');
	},

	/**
  * @param {string} name
     * @return {ApplicaionScopeInterface}
  */
	getScope: function getScope(name) {
		if (name == 'application') name = Engine.settings.applicationName;

		if (Engine.scopeList[name]) return Engine.scopeList[name].public;else console.error('scope does not exist!');
	},

	/**
  * @type {external:System.Promise}
  */
	ready: Promise.resolve()
};

/**
 * @member Engine
 * @type {module:Engine~Engine}
 * @memberof module:Engine
 */
exports.default = Engine;