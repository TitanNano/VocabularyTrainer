/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _DataBinding = __webpack_require__(20);
	
	var _UiPage = __webpack_require__(36);
	
	var _UiPage2 = _interopRequireDefault(_UiPage);
	
	__webpack_require__(37);
	
	__webpack_require__(40);
	
	__webpack_require__(41);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var once = false;
	
	var bootstrap = function bootstrap() {
	    var queue = [];
	
	    console.log('ready!');
	
	    [].slice.apply(document.querySelectorAll('link[rel="import-async"]')).forEach(function (element) {
	        var node = document.createElement('link');
	
	        node.setAttribute('rel', 'import');
	        node.setAttribute('href', element.href);
	
	        queue.push(new Promise(function (success) {
	            return node.addEventListener('load', success);
	        }));
	
	        element.parentNode.replaceChild(node, element);
	    });
	
	    Promise.all(queue).then(function () {
	        console.log('all components loaded!');
	
	        _UiPage2.default.init();
	
	        setTimeout(function () {
	            _DataBinding.DataBinding.bindNode('.style-spinner-start', {
	                active: false
	            });
	        }, 0);
	    });
	};
	
	if (window.Polymer && window.Polymer.ImportStatus._ready) {
	    Polymer.ImportStatus.whenReady(bootstrap);
	} else {
	    window.addEventListener('WebComponentsReady', bootstrap);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _af = __webpack_require__(2);
	
	var App = (0, _af.$)('applications').new('app');
	
	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @module ApplicationFrame
	 * @version 0.1.0
	 * @copyright by TitanNano / Jovan Gerodetti - {@link http://www.titannano.de}
	 */
	
	"use strict";
	
	// import { Make } from './util/make.js';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.$_ = exports.$ = undefined;
	
	var _functions = __webpack_require__(3);
	
	var _Engine = __webpack_require__(4);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	var _make = __webpack_require__(5);
	
	var _Application = __webpack_require__(16);
	
	var _Application2 = _interopRequireDefault(_Application);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var $$ = window || global;
	
	/**
	 * @param {navigator.userAgent} userAgentString
	 * @return {UserAgent}
	 */
	var userAgentParser = function userAgentParser(userAgentString) {
		var items = [];
		var current = '';
		var enabled = true;
		var version = '';
		var engines = ['Gecko', 'AppleWebKit', 'Firefox', 'Safari', 'Chrome', 'OPR', 'Trident'];
		var found = [];
		var record = {};
	
		for (var i = 0; i < userAgentString.length; i++) {
			if (userAgentString[i] == ' ' && enabled) {
				items.push(current);
				current = '';
			} else if (userAgentString[i] == '(') {
				enabled = false;
			} else if (userAgentString[i] == ')') {
				enabled = true;
			} else {
				current += userAgentString[i];
			}
		}
		items.push(current);
	
		items.forEach(function (item) {
			if (item.indexOf(';') > -1) {
				record.platform = item;
			} else if (item.indexOf('/') > -1) {
				item = item.split('/');
				if (item[0] == 'Version') {
					version = item[1];
				} else {
					item.push(engines.indexOf(item[0]));
					found.push(item);
				}
			}
		});
	
		if (found.length == 1) {
			record.engine = found[0][0];
			record.engineVersion = found[0][1];
		} else if (found.length > 1) {
			found.sort(function (a, b) {
				if (a[2] < b[2]) return 0;else return 1;
			});
			record.engine = found[found.length - 1][0];
			record.engineVersion = found[found.length - 1][1];
		} else {
			record.engine = 'unknown';
			record.engineVersion = '1';
		}
	
		record.arch = 'x32';
	
		record.platform.substring(1, record.platform.length - 2).split('; ').forEach(function (item) {
			if (item.indexOf('OS X') > -1) {
				record.platform = item;
				record.arch = 'x64';
			} else if (item.indexOf('Windows') > -1) {
				record.platform = item;
			} else if (item.indexOf('Linux') > -1) {
				record.platform = item;
			} else if (item.indexOf('WOW64') > -1 || item.indexOf('Win64') > -1 || item.indexOf('x64') > -1) {
				record.arch = 'x64';
			} else if (item.indexOf('/') > -1) {
				if (engines.indexOf(item.split('/')[0]) > -1) {
					record.engine = item.split('/')[0];
					record.engineVersion = item.split('/')[1];
				}
			} else if (item.indexOf(':') < 0) {
				record.platform = item;
			}
		});
	
		if (version !== '') {
			record.engineVersion = version;
		}
	
		return record;
	};
	
	// find out which engine is used
	if ($$.navigator) {
		_Engine2.default.info.type = 'Web';
		_functions.objectExtend.apply(_Engine2.default.info, [userAgentParser(navigator.userAgent)]);
	
		//  check if touchscreen is supported
		$$.navigator.isTouch = 'ontouchstart' in $$;
	
		// check if current platform is the Mozilla Add-on runtime
	} else if ($$.exports && $$.require && $$.module) {
			var system = $$.require('sdk/system');
			_functions.objectExtend.apply(_Engine2.default.info, [{
				engine: system.name,
				engineVersion: system.version,
				platform: system.platform + ' ' + system.platformVersion,
				type: 'MozillaAddonSDK',
				arch: system.architecture
			}]);
	
			// check if current platform is the Node.js runtime
		} else if ($$.process && $$.process.versions && $$.process.env && $$.process.pid) {
				_functions.objectExtend.apply(_Engine2.default.info, [{
					engine: $$.process.name,
					engineVersion: $$.process.versions.node,
					platform: $$.process.platform,
					arch: $$.process.arch,
					type: 'Node'
				}]);
			}
	
	/**
	 * @type {module:Engine~Engine.getLibraryItem}
	 * @static
	 */
	var $ = exports.$ = _Engine2.default.getLibraryItem;
	
	/**
	 * @type {module:Engine~Engine.getScope}
	 * @static
	 */
	var $_ = exports.$_ = _Engine2.default.getScope;
	
	exports.default = {
		Util: {
			Make: _make.Make,
			hasPrototype: _make.hasPrototype,
			Mixin: _make.Mixin
		},
	
		Prototypes: {
			Application: _Application2.default
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var objectExtend = exports.objectExtend = function objectExtend(update) {
		var _this = this;
	
		Object.keys(update).forEach(function (item) {
			if (_typeof(update[item]) == 'object' && !Array.isArray(update[item]) && update[item] !== null) objectExtend.apply(_this[item], [update[item]]);else _this[item] = update[item];
		});
	};
	
	var cloneObject = exports.cloneObject = function cloneObject(object) {
		return JSON.parse(JSON.stringify(object));
	};
	
	// this function creates a new unique id
	var createUniqueId = exports.createUniqueId = function createUniqueId() {
		var time = Date.now();
		while (time == Date.now()) {}
		return Date.now();
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _functions = __webpack_require__(3);
	
	var _ApplicationScope = __webpack_require__(6);
	
	var _ApplicationScope2 = _interopRequireDefault(_ApplicationScope);
	
	var _ServiceScope = __webpack_require__(15);
	
	var _ServiceScope2 = _interopRequireDefault(_ServiceScope);
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	var _Extendables = __webpack_require__(8);
	
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
			addon: function () {
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
			}(),
	
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * The make module consits of Make, getPrototypeOf and mixin.
	 * See the documentation for each method to see what is does.
	 * This module is part of the ApplicationFrame.
	 * @module Make
	 * @author Jovan Gerodetti
	 * @copyright Jovan Gerodetti
	 * @version 1.0
	 */
	
	/**
	 * Internal function to apply one objects propteries to a target object.
	 *
	 * @param {Object} target
	 * @param {Object} source
	 * @inner
	 */
	var apply = function apply(target, source) {
	    Object.keys(source).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	
	    return target;
	};
	
	/**
	 * Creates a new object with the given prototype.
	 * If two arguments are passed in, the properties of the first object will be
	 * applied to the new object.
	 *
	 * @param {Object} object
	 * @param {Object} prototype
	 * @return {function}
	 */
	var Make = exports.Make = function Make(object, prototype) {
	    if (arguments.length < 2) {
	        prototype = object;
	        object = null;
	    }
	
	    if (object === null) {
	        object = Object.create(prototype);
	    } else {
	        object = apply(Object.create(prototype), object);
	    }
	
	    var m = function m() {
	        var make = object.make || object._make || function () {};
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        make.apply(object, args);
	
	        return object;
	    };
	
	    m.get = function () {
	        return object;
	    };
	
	    return m;
	};
	
	/**
	 * This method checks if the given prototype is in the prototype chain of
	 * the given target object.
	 *
	 * @param {Object} object
	 * @param {Object} prototype
	 * @return {boolean}
	 */
	var hasPrototype = exports.hasPrototype = function hasPrototype(object, prototype) {
	    var p = Object.getPrototypeOf(object);
	
	    while (p !== null && p !== undefined) {
	        if (typeof prototype == 'function') prototype = prototype.prototype;
	
	        if (p == prototype) return true;else p = Object.getPrototypeOf(p);
	    }
	
	    return false;
	};
	
	/**
	 * Creates a new prototype mixing all the given prototypes. Incase two or more
	 * prototypes contain the same propterty, the new prototype will return
	 * the propterty of the first prototype in the list which contains it.
	 *
	 * @param {...Object} prototypes
	 * @return {Proxy}
	 */
	var Mixin = exports.Mixin = function Mixin() {
	    for (var _len2 = arguments.length, prototypes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        prototypes[_key2] = arguments[_key2];
	    }
	
	    return new Proxy(prototypes, MixinTrap);
	};
	
	/**
	 * Internal function to find a proptery in a list of prototypes.
	 *
	 * @param {Object[]} prototypes
	 * @param {string} key
	 * @return {Object}
	 */
	var findProperty = function findProperty(prototypes, key) {
	    for (var i = 0; i < prototypes.length; i++) {
	        var item = prototypes[i];
	
	        if (item && item[key]) {
	            return item;
	        }
	    }
	
	    return undefined;
	};
	
	/**
	 * Traps to create a mixin.
	 */
	var MixinTrap = {
	
	    'get': function get(prototypes, key) {
	        var object = findProperty(prototypes, key);
	
	        if (object && typeof object[key] === 'function') {
	            return object[key].bind(object);
	        }
	
	        return object ? object[key] : null;
	    },
	
	    'set': function set(prototypes, key, value) {
	        var object = findProperty(prototypes, key);
	
	        if (object) {
	            object[key] = value;
	        } else {
	            prototypes[0][key] = value;
	        }
	
	        return true;
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Catalog = __webpack_require__(7);
	
	var _Catalog2 = _interopRequireDefault(_Catalog);
	
	var _Extendables = __webpack_require__(8);
	
	var _Extendables2 = _interopRequireDefault(_Extendables);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @lends ApplicationScope.prototype
	 */
	var ApplicationScope = {
	  /**
	   * @type {string}
	   */
	  name: null,
	
	  /**
	   * @type {string}
	   */
	  type: 'application',
	
	  /**
	   * @type {ApplicationScopeInterface}
	   */
	  public: null,
	
	  /**
	   * @type {ApplicationScopePrivatePrototype}
	   */
	  private: null,
	
	  /**
	   * @type {Thread}
	   */
	  thread: null,
	
	  /**
	   * @type {Worker[]}
	   */
	  workers: null,
	
	  /**
	   * @type {Object}
	   */
	  listeners: null,
	
	  /**
	   * @type {Catalog}
	   */
	  modules: null,
	
	  /**
	   * this prototype defines a new application scope
	   *
	   * @constructs
	   * @param {string} name
	   * @implements {Scope}
	   */
	  _make: function _make(name) {
	    this.name = name;
	    this.public = (0, _make2.Make)(_Extendables2.default.ApplicationScopeInterface)(this);
	
	    this.workers = [];
	    this.listeners = {};
	    this.modules = (0, _make2.Make)(_Catalog2.default)();
	
	    this._make = null;
	  }
	};
	
	exports.default = ApplicationScope;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Catalog = {
	
	    _listeners: null,
	
	    _make: function _make() {
	        this._listeners = [];
	
	        this._make = null;
	    },
	
	    on: function on(event, listener) {
	        var self = this;
	
	        return new Promise(function (success) {
	            if (listener.length > 0) self._listeners.push({ event: event, listener: listener, success: success });else success();
	        });
	    },
	
	    add: function add(key, value) {
	        this[key] = value;
	        var object = this;
	        this._listeners.forEach(function (item) {
	
	            if (item.event == 'available') {
	                var ready = 0;
	                item.listener.forEach(function (item) {
	                    if (Object.keys(object).indexOf(item) > -1) ready++;
	                });
	
	                if (ready == item.listener.length) {
	                    item.success();
	                }
	            }
	        });
	    }
	};
	
	exports.default = Catalog;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ApplicationScopeInterface = __webpack_require__(9);
	
	var _ApplicationScopeInterface2 = _interopRequireDefault(_ApplicationScopeInterface);
	
	var _ServiceScopeInterface = __webpack_require__(13);
	
	var _ServiceScopeInterface2 = _interopRequireDefault(_ServiceScopeInterface);
	
	var _MozillaAddonScopeInterface = __webpack_require__(14);
	
	var _MozillaAddonScopeInterface2 = _interopRequireDefault(_MozillaAddonScopeInterface);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  /**
	   * @type {ApplicationScopeInterface}
	   */
	  ApplicationScopeInterface: _ApplicationScopeInterface2.default,
	
	  /**
	   * @type {MozillaAddonScopeInterface}
	   */
	  MozillaAddonScopeInterface: _MozillaAddonScopeInterface2.default,
	
	  /**
	   * @type {ServiceScopeInterface}
	   */
	  ServiceScopeInterface: _ServiceScopeInterface2.default
	}; /**
	    * @module Extendables
	    */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	var _ApplicationScopePrivatePrototype = __webpack_require__(11);
	
	var _ApplicationScopePrivatePrototype2 = _interopRequireDefault(_ApplicationScopePrivatePrototype);
	
	var _Interface = __webpack_require__(12);
	
	var _Interface2 = _interopRequireDefault(_Interface);
	
	var _Extendables = __webpack_require__(8);
	
	var _Extendables2 = _interopRequireDefault(_Extendables);
	
	var _Engine = __webpack_require__(4);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * this prototype defines a new application scope interface
	 *
	 * @class ApplicationScopeInterface
	 * @extends {Interface}
	 */
	
	var ApplicationScopeInterface = (0, _make.Make)(
	/** @lends ApplicationScopeInterface.prototype */
	{
	
	    /**
	     * @param {string} type
	     * @param {function} listener
	     */
	    on: function on(type, listener) {
	        var scope = _Scopes2.default.get(this);
	
	        if (!scope.listeners[type]) {
	            scope.listeners[type] = [];
	        }
	
	        scope.listeners[type].push(listener);
	
	        return this;
	    },
	
	    /**
	     * Emmits a new event on this application.
	     *
	     * @param {string} type
	     * @param {Object} data
	     */
	    emit: function emit(type, data) {
	        var scope = _Scopes2.default.get(this);
	
	        if (scope.listeners[type]) {
	            scope.listeners[type].forEach(function (f) {
	                setTimeout(function () {
	                    f(data);
	                }, 0);
	            });
	        }
	    },
	
	    /**
	     * @param {function} f
	     * @return {ApplicationScopeInterface}
	     */
	    thread: function thread(f) {
	        var scope = _Scopes2.default.get(this);
	
	        scope.workers.push((0, _make.Make)(_Extendables2.default.ScopeWorker)(f));
	
	        return this;
	    },
	
	    /**
	     * Creates the prototype for the application. The properties then
	     * can be accessed inside the applications main routine and it's modules.
	     *
	     * @param {Object} object
	     * @return {ApplicationScopeInterface}
	     */
	    prototype: function prototype(object) {
	        _Scopes2.default.get(this).private = (0, _make.Make)(object, _ApplicationScopePrivatePrototype2.default)(_Scopes2.default.get(this));
	
	        return this;
	    },
	
	    /**
	     * Sets the main routine for the application. It will be invoced after all modules are loaded.
	     *
	     * @param {function} f
	     * @return {ApplicationScopeInterface}
	     */
	    main: function main(f) {
	        var scope = _Scopes2.default.get(this);
	
	        if (scope.private === null) scope.private = (0, _make.Make)(_ApplicationScopePrivatePrototype2.default)(scope);
	
	        scope.thread = f.bind(scope.private);
	
	        _Engine2.default.ready.then(scope.thread);
	
	        return this;
	    },
	
	    /**
	     * Defines a module for the application.
	     *
	     * @param {string} name - The name of the new module. Other modules and the main routine can reference to the module with this name.
	     * @param {string[]} dependencies - The names of all the modules on which this module depends.
	     * @param {function} f - the main routine of this module.
	     * @return {ApplicationScopeInterface}
	     */
	    module: function module(name, dependencies, f) {
	        var scope = _Scopes2.default.get(this);
	
	        scope.modules.on('available', dependencies).then(function () {
	            scope.modules.add(new Promise(function (ready) {
	                f(scope, ready);
	            }));
	        });
	
	        return this;
	    },
	
	    /**
	     * This function will try to terminate the application by emitting the termination event.
	     *
	     * @param {string} reason - the reason for the termination.
	     */
	    terminate: function terminate(reason) {
	        this.emmit('terminate', reason);
	    }
	
	}, _Interface2.default).get();
	
	exports.default = ApplicationScopeInterface;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = new WeakMap();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Interface = __webpack_require__(12);
	
	var _Interface2 = _interopRequireDefault(_Interface);
	
	var _make2 = __webpack_require__(5);
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ApplicationScopePrivatePrototype = (0, _make2.Make)( /** @lends ApplicationScopePrivatePrototype.prototype */{
	  /**
	   * Reference to the public interface of this application.
	   *
	   * @type {ApplicationScopeInterface}
	   */
	  public: null,
	
	  /**
	   * A dictionary of all the available modules in the application.
	   *
	   * @type {Object}
	   */
	  modules: null,
	
	  /**
	   * The private prototype for the application. Only the application and
	   * it's modules have access to the properties of this prototype.
	   *
	   * @constructs
	   * @param {ApplicationScope} scope - The [{ApplicationScope}]{@link ApplicationScope} this object belongs to.
	   * @extends {Interface}
	   */
	  _make: function _make(scope) {
	    _Interface2.default._make(scope);
	
	    this.public = scope.public;
	    this.modules = {};
	
	    this._make = null;
	  },
	
	  /**
	   * @param {function} f
	   */
	  onprogress: function onprogress(f) {
	    _Scopes2.default.get(this).listeners.push({ type: 'progress', listener: f });
	  }
	
	}, _Interface2.default).get();
	
	exports.default = ApplicationScopePrivatePrototype;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Interface = {
	
	    _make: function _make(scope) {
	        _Scopes2.default.set(this, scope);
	
	        this._make = null;
	    }
	
	};
	
	exports.default = Interface;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _functions = __webpack_require__(3);
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	var _Interface = __webpack_require__(12);
	
	var _Interface2 = _interopRequireDefault(_Interface);
	
	var _Engine = __webpack_require__(4);
	
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _functions = __webpack_require__(3);
	
	var _Scopes = __webpack_require__(10);
	
	var _Scopes2 = _interopRequireDefault(_Scopes);
	
	var _ApplicationScopeInterface = __webpack_require__(9);
	
	var _ApplicationScopeInterface2 = _interopRequireDefault(_ApplicationScopeInterface);
	
	var _Interface = __webpack_require__(12);
	
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Extendables = __webpack_require__(8);
	
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Thread = __webpack_require__(17);
	
	var _Thread2 = _interopRequireDefault(_Thread);
	
	var _ApplicationInternal = __webpack_require__(19);
	
	var _ApplicationInternal2 = _interopRequireDefault(_ApplicationInternal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Internal = new WeakMap();
	
	var Application = {
	
	    /**
	     * Name of this application so other components can identify the application.
	     *
	     * @type {string}
	     */
	    name: '',
	
	    /**
	     * Some components may need to know the version of this applicaion.
	     *
	     * @type {string}
	     */
	    version: '0.0.0',
	
	    /**
	     * @type {string}
	     */
	    author: '',
	
	    /**
	     * @constructs
	     */
	    _make: function _make() {
	        Internal.set(this, (0, _make2.Make)(_ApplicationInternal2.default)());
	    },
	
	    /**
	     * Initializes this application, default interface for components and modules.
	     */
	    init: function init() {
	        console.log('Initialzing Application "' + this.name + '"!');
	    },
	
	    /**
	     * Registers a new event listener for the given event type.
	     *
	     * @param {string} type
	     * @param {function} listener
	     */
	    on: function on(type, listener) {
	        var scope = Internal.get(this);
	
	        if (!scope.listeners[type]) {
	            scope.listeners[type] = [];
	        }
	
	        scope.listeners[type].push(listener);
	
	        return this;
	    },
	
	    /**
	     * Emmits a new event on this application.
	     *
	     * @param {string} type
	     * @param {Object} data
	     */
	    emit: function emit(type, data) {
	        var scope = Internal.get(this);
	
	        if (scope.listeners[type]) {
	            scope.listeners[type].forEach(function (f) {
	                setTimeout(function () {
	                    f(data);
	                }, 0);
	            });
	        }
	    },
	
	    /**
	     * Creates a new thread for this applicaion.
	     *
	     * @param {function} f
	     * @return {ApplicationScopeInterface}
	     */
	    thread: function thread(f) {
	        var scope = Internal.get(this);
	
	        scope.workers.push((0, _make2.Make)(_Thread2.default)(f));
	
	        return this;
	    },
	
	    /**
	     * This function will try to terminate the application by emitting the termination event.
	     *
	     * @param {string} reason - the reason for the termination.
	     */
	    terminate: function terminate(reason) {
	        this.emit('terminate', reason);
	    }
	
	};
	
	exports.default = Application;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Shared = __webpack_require__(18);
	
	var _Shared2 = _interopRequireDefault(_Shared);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * this prototype defines a new scope worker
	 */
	var Thread = {
	
	    /**
	     * The parent application of this thread.
	     *
	     * @type {Application}
	     */
	    parent: null,
	
	    /**
	     * The Worker Object for this thread.
	     *
	     * @type {Worker}
	     * @private
	     */
	    _thread: null,
	
	    _promise: null,
	
	    then: null,
	
	    catch: null,
	
	    /**
	     * @constructs
	     * @param {function} f
	     * @param {Application} parent
	     */
	    _make: function _make(f, parent) {
	        var _this = this;
	
	        this.parent = parent;
	        this.thread = new Worker(_Shared2.default.threadLoader);
	        this.thread.postMessage({ name: 'init', func: f });
	        this.progressListeners = [];
	
	        this._promise = new Promise(function (done) {
	            _this._thread.addEventListener('message', function (e) {
	                if (e.data.name == 'af-worker-done') done(e.data.data);
	            }, false);
	        });
	
	        this._thread.addEventListener('message', function (e) {
	            if (e.data.name == 'af-worker-progress') {
	                _this.emit('progress', e.data.data);
	            }
	        }, false);
	
	        this.then = this._promise.then.bind(this._promise);
	        this.catch = this._promise.catch.bind(this._promise);
	    }
	};
	
	exports.default = Thread;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ApplicationInternal = {
	  /**
	   * @type {Thread}
	   */
	  thread: null,
	
	  /**
	   * @type {Worker[]}
	   */
	  workers: null,
	
	  /**
	   * @type {Array}
	   */
	  listeners: null,
	
	  /**
	   * @type {Catalog}
	   */
	  modules: null,
	
	  /**
	   * this prototype defines a new application scope
	   *
	   * @constructs
	   * @param {string} name
	   * @implements {Scope}
	   */
	  _make: function _make() {
	    this.workers = [];
	    this.listeners = [];
	
	    this._make = null;
	  }
	};
	
	exports.default = ApplicationInternal;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.config = exports.DataBinding = undefined;
	
	var _Template = __webpack_require__(21);
	
	var _Bind = __webpack_require__(22);
	
	var _ViewPort = __webpack_require__(35);
	
	var _ViewPort2 = _interopRequireDefault(_ViewPort);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @module DataBinding
	 * @version 1.0
	 * @author Jovan Gerodetti
	 */
	
	NodeList.prototype.forEach = NamedNodeMap.prototype.forEach = Array.prototype.forEach;
	
	/**
	 * calculates the hash of an Object.
	 *
	 * @memberof Object.prototype
	 */
	/**Object.prototype.toString = function(){
	
	    let data = Object.keys(this).map(function(key){
	    	return key + '=' + this[key];
	    }.bind(this)).join('&');
	
	    let hash = CryptoJS.SHA3(data, { outputLength: 224 });
	
	    return hash.toString(CryptoJS.enc.Base64);
	};**/
	
	//import CryptoJS from '../libs/CryptoJS-SHA-3.js';
	var style = document.createElement('style');
	
	style.innerHTML = '\n    [bind-display="false"] {\n        display: none !important;\n    }\n\n    [bind-visible="false"] {\n        visibility: hidden;\n    }\n';
	
	document.head.appendChild(style);
	
	var DataBinding = exports.DataBinding = {
	    makeTemplate: _Template.makeTemplate,
	    bindNode: _Bind.bindNode,
	    ViewPort: _ViewPort2.default
	};
	
	var config = exports.config = {
	    main: 'DataBinding',
	    author: 'Jovan Gerodetti'
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.makeTemplate = undefined;
	
	var _make = __webpack_require__(5);
	
	var _Bind = __webpack_require__(22);
	
	var _Util = __webpack_require__(25);
	
	var _TemplateLoader = __webpack_require__(33);
	
	var _ScopePrototype = __webpack_require__(29);
	
	var _ScopePrototype2 = _interopRequireDefault(_ScopePrototype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var makeElementFromTemplate = function makeElementFromTemplate(template, scope, application, item) {
	    var node = document.importNode(template.content, true);
	    var placeholder = (0, _Util.selectElement)('bind-placeholder', node);
	
	    item = (0, _Util.polyMask)(item);
	
	    item.attributes.forEach(function (attr) {
	        node.firstElementChild.setAttribute(attr.name, attr.value);
	    });
	
	    if (placeholder.bare) {
	        (function () {
	            var node = item.firstElementChild;
	            placeholder.parentNode.replaceChild(item.firstElementChild, placeholder.bare);
	
	            [].forEach.apply(item.children, [function (item) {
	                node.parentNode.appendChild(item);
	            }]);
	        })();
	    }
	
	    node.firstElementChild.className = template.id + ' ' + node.firstElementChild.className;
	
	    scope = scope();
	
	    [].map.apply(node.firstElementChild.attributes, [function (item) {
	        if (item.name.search(/^scope\-/) > -1) {
	            scope[item.name.replace(/^scope\-/, '')] = item.value;
	        }
	    }]);
	
	    if (template.hasAttribute('component')) {
	        scope.element = node.firstElementChild;
	    }
	
	    scope = (0, _Bind.bindNode)(node, scope);
	
	    item.parentNode.replaceChild(node, item.bare);
	
	    if (application) {
	        application.emit('newElement:' + template.id, scope);
	    }
	};
	
	/**
	 * creates a new instance of an HTML template and applies the binding with
	 * the given scope.
	 *
	 * @param {Node|string} template
	 * @param {ScopePrototype} scope
	 * @param {ApplicationScopeInterface} application
	 * @return {Object}
	 */
	var makeTemplate = exports.makeTemplate = function makeTemplate(template, scope, application) {
	    var _this = this;
	
	    template = typeof template === 'string' ? (0, _Util.selectElement)(template) : (0, _Util.polyMask)(template);
	
	    if (template.hasAttribute('src') && !template.processed) {
	        var source = template.getAttribute('src');
	
	        scope = (0, _make.Make)(scope, _ScopePrototype2.default)();
	
	        (0, _TemplateLoader.importTemplate)(source, template).then(function (template) {
	            template.processed = true;
	            makeTemplate(template, scope, application);
	        });
	
	        return scope;
	    } else if (template.hasAttribute('bind-element')) {
	        (function () {
	            var makeElement = makeElementFromTemplate.bind(_this, template, scope, application);
	            var list = (0, _Util.selectAllElements)(template.id);
	
	            [].forEach.apply(list, [makeElement]);
	
	            new MutationObserver(function (mutations) {
	                mutations.forEach(function (item) {
	                    if (item.addedNodes.length > 0) {
	                        var _list = (0, _Util.selectAllElements)(template.id);
	
	                        [].forEach.apply(_list, [makeElement]);
	                    }
	                });
	            }).observe(document.body, {
	                childList: true,
	                subtree: true
	            });
	        })();
	    } else {
	        var node = document.importNode(template.content, true);
	
	        scope = (0, _Bind.bindNode)(node, scope);
	
	        if (template.hasAttribute('replace')) {
	            console.log('replace template');
	            template.parentNode.replaceChild(node, template.bare);
	        } else if (template.hasAttribute('insert')) {
	            template.parentNode.insertBefore(node, template.bare);
	        }
	
	        return { node: node, scope: scope };
	    }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.destoryScope = exports.recycle = exports.bindNode = exports.watcherList = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _make = __webpack_require__(5);
	
	var _Parser = __webpack_require__(23);
	
	var _Mapping = __webpack_require__(24);
	
	var _Util = __webpack_require__(25);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _ClassBinding = __webpack_require__(27);
	
	var _ClassBinding2 = _interopRequireDefault(_ClassBinding);
	
	var _TwoWayBinding = __webpack_require__(28);
	
	var _TwoWayBinding2 = _interopRequireDefault(_TwoWayBinding);
	
	var _ScopePrototype = __webpack_require__(29);
	
	var _ScopePrototype2 = _interopRequireDefault(_ScopePrototype);
	
	var _EnabledBinding = __webpack_require__(30);
	
	var _EnabledBinding2 = _interopRequireDefault(_EnabledBinding);
	
	var _TemplateRepeatBinding = __webpack_require__(31);
	
	var _TemplateRepeatBinding2 = _interopRequireDefault(_TemplateRepeatBinding);
	
	var _AutoBinding = __webpack_require__(32);
	
	var _AutoBinding2 = _interopRequireDefault(_AutoBinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Contains all scope, scopeInfo pairs.
	 *
	 * @type {WeakMap}
	 */
	var scopeList = new WeakMap();
	
	/**
	 * @type {ScopePrototype[]}
	 */
	var scopeIndex = [];
	
	/**
	 * @type {Array[]}
	 */
	var watcherList = exports.watcherList = new WeakMap();
	
	/**
	 * @type {Object}
	 */
	var expressionTracking = {};
	
	/**
	 * applies the binding to the node for the given scope.
	 *
	 * @param {Node|string} node - the node which should be bound
	 * @param {Object} scope - the scope which should be bound to
	 * @param {boolean} isolated - indicates if this scope should be recycled isolated
	 * @return {ScopePrototype}
	 */
	var bindNode = exports.bindNode = function bindNode(node, scope, isolated) {
	    scope = (0, _make.hasPrototype)(scope, _ScopePrototype2.default) ? scope : (0, _make.Make)(scope, _ScopePrototype2.default)();
	    node = (0, _make.hasPrototype)(node, Node) ? node : (0, _Util.selectElement)(node);
	
	    scopeList.set(scope, {
	        node: node,
	        bindings: []
	    });
	
	    scopeIndex.push(scope);
	
	    checkNode(node, scope);
	    recycle(isolated ? scope : false);
	
	    return scope;
	};
	
	/**
	 * Travels through a node and it's children searching for binding expressions
	 *
	 * @param {Node} node
	 * @param {ScopePrototype} scope
	 * @param {Node} parentNode
	 */
	var checkNode = function checkNode(node, scope, parentNode) {
	    var dataRegex = /{{[^{}]*}}/g;
	    var scopeInfo = scopeList.get(scope);
	
	    if (node.nodeName == '#text' || node.nodeType === 2) {
	        var text = node.value || node.textContent,
	            variables = text.match(dataRegex),
	            visibilityBinding = node.name === _Mapping.attributeNames.get('visible'),
	            transparencyBinding = node.name === _Mapping.attributeNames.get('transparent'),
	            enabledAttribute = node.name === _Mapping.attributeNames.get('enabled'),
	            classes = node.name === _Mapping.attributeNames.get('classes'),
	            modelBinding = node.name === _Mapping.attributeNames.get('model'),
	            autoBinding = node.name === 'bind',
	            twoWay = node.name === _Mapping.attributeNames.get('value') || modelBinding;
	
	        var singleBinding = visibilityBinding || transparencyBinding;
	
	        if (twoWay) {
	            bindTwoWay(text, scope, scopeInfo, node, parentNode, modelBinding);
	        } else if (classes) {
	            bindClasses(text, node, scopeInfo, parentNode);
	        } else if (enabledAttribute) {
	            bindEnabled(text, scopeInfo, parentNode);
	        } else if (variables || singleBinding) {
	            bindSimple(text, node, variables, scopeInfo, singleBinding, parentNode);
	        } else if (autoBinding) {
	            bindAuto(text, scopeInfo, parentNode);
	        }
	    } else if (node.localName === 'template') {
	        var repeatedTemplate = node.hasAttribute('replace') && node.hasAttribute('repeat');
	
	        node.attributes.forEach(function (child) {
	            return checkNode(child, scope, node);
	        });
	
	        if (repeatedTemplate) {
	            bindTemplateRepeat(node, scopeInfo);
	        }
	    } else {
	        if (node.attributes) {
	            node.attributes.forEach(function (child) {
	                return checkNode(child, scope, node);
	            });
	
	            var events = node.getAttribute(_Mapping.attributeNames.get('events'));
	
	            if (events !== null) {
	                bindEvents(events, node, scope);
	
	                node.removeAttribute(_Mapping.attributeNames.get('events'));
	            }
	        }
	
	        node.childNodes.forEach(function (node) {
	            return checkNode(node, scope);
	        });
	    }
	};
	
	/**
	 * creates a two way binding
	 *
	 * @param {string} text
	 * @param {ScopePrototype} scope
	 * @param {Object} scopeInfo
	 * @param {Node} node,
	 * @param {Node} parentNode
	 * @param {boolean} indirect
	 */
	var bindTwoWay = function bindTwoWay(text, scope, scopeInfo, node, parentNode, indirect) {
	    var property = text.replace(/[{}]/g, '');
	    var value = (0, _Parser.parseExpression)(property, scope);
	
	    var _split = (parentNode.getAttribute(_Mapping.attributeNames.get('modelEvent')) || '').split(':');
	
	    var _split2 = _slicedToArray(_split, 4);
	
	    var event = _split2[0];
	    var viewBinding = _split2[1];
	    var eventBinding = _split2[2];
	    var preventDefault = _split2[3];
	
	    /** @type {TwoWayBinding} */
	
	    var binding = (0, _make.Make)({
	        properties: [property],
	        originalNodeValue: text,
	        currentValue: value,
	        node: node,
	        parentNode: parentNode,
	        indirect: indirect,
	        viewBinding: viewBinding
	    }, _TwoWayBinding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	
	    if (node.name === _Mapping.attributeNames.get('model')) {
	        parentNode.addEventListener(event, function (e) {
	            if (preventDefault === 'true') {
	                e.preventDefault();
	            }
	
	            console.log(e);
	            var value = (0, _Parser.parseExpression)(eventBinding, e);
	            compareTwoWay(value, scope, binding);
	        });
	    } else if (node.name === _Mapping.attributeNames.get('value')) {
	        parentNode.addEventListener('keyup', function (e) {
	            e.preventDefault();
	            compareTwoWay(getElementValue(e.target), scope, binding);
	        });
	    }
	};
	
	/**
	 * Compares for changes in the UI in a two way binding
	 *
	 * @param {string} newValue
	 * @param {ScopePrototype} scope
	 * @param {TwoWayBinding} binding
	 */
	var compareTwoWay = function compareTwoWay(newValue, scope, binding) {
	    if (binding.currentValue !== newValue) {
	        (0, _Parser.assignExpression)(binding.properties[0], scope, newValue);
	        binding.currentValue = newValue;
	
	        console.log('update from view:', scope);
	
	        recycle();
	    }
	};
	
	/**
	 * creates a simple binding
	 *
	 * @type {string} text
	 * @type {Node} node
	 * @type {string[]} variables
	 * @type {ScopePrototype} scope
	 * @type {ScopeInfo} scopeInfo
	 */
	var bindSimple = function bindSimple(text, node, variables, scopeInfo, singleExpression, parentNode) {
	    /** @type {Binding} */
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        node: node,
	        parentNode: parentNode,
	        singleExpression: singleExpression,
	        properties: variables ? variables.map(function (item) {
	            return item.replace(/[{}]/g, '');
	        }) : []
	    }, _Binding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	};
	
	var bindClasses = function bindClasses(text, node, scopeInfo, parentNode) {
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        node: node,
	        classes: (0, _Parser.ObjectParser)(text),
	        parentNode: parentNode
	    }, _ClassBinding2.default).get();
	
	    scopeInfo.bindings.push(binding);
	};
	
	var bindEnabled = function bindEnabled(text, scopeInfo, parentNode) {
	    var binding = (0, _make.Make)({
	        originalNodeValue: text,
	        parentNode: parentNode
	    }, _EnabledBinding2.default)();
	
	    scopeInfo.bindings.push(binding);
	};
	
	var bindTemplateRepeat = function bindTemplateRepeat(template, scopeInfo) {
	    var marker = document.createComment('repeat ' + template.id + ' with ' + template.getAttribute('repeat'));
	    var binding = (0, _make.Make)({
	        originalNodeValue: template.getAttribute('repeat'),
	        template: template,
	        marker: marker
	    }, _TemplateRepeatBinding2.default)();
	
	    console.log('replace template with marker');
	    (0, _Util.polyMask)(template.parentNode).replaceChild(marker, template);
	    scopeInfo.bindings.push(binding);
	};
	
	/**
	 * binds the events specified for a Node
	 *
	 * @param {string[]} events
	 * @param {Node} node
	 * @param {ScopePrototype} scope
	 */
	var bindEvents = function bindEvents(events, node, scope) {
	    var eventRegex = /{[A-Za-z0-9\-_\.: \(\)]*}/g;
	
	    events = events.match(eventRegex);
	
	    events.forEach(function (event) {
	        console.log(event);
	        event = event.replace(/[{}]/g, '');
	
	        var _event$split = event.split(':');
	
	        var _event$split2 = _slicedToArray(_event$split, 2);
	
	        var name = _event$split2[0];
	        var method = _event$split2[1];
	
	
	        if (scope.$methods && scope.$methods[method.trim()]) {
	            node.addEventListener(name.trim(), function (e) {
	                scope.$methods[method.trim()].apply(scope, [e]);
	
	                scope.__apply__();
	            });
	        }
	    });
	};
	
	var bindAuto = function bindAuto(text, scopeInfo, template) {
	    var binding = (0, _make.Make)({
	        scopeName: text,
	        template: template
	    }, _AutoBinding2.default)();
	
	    scopeInfo.bindings.push(binding);
	};
	
	var executeWatchers = function executeWatchers(scope) {
	    watcherList.get(scope) && watcherList.get(scope).forEach(function (watcher) {
	        var value = (0, _Parser.parseExpression)(watcher.expression, scope);
	
	        expressionTracking[watcher.expression] = expressionTracking[watcher.expression] || { value: '', newValue: '' };
	
	        if (expressionTracking[watcher.expression].value !== value) {
	            watcher.cb.apply(scope, [value]);
	
	            expressionTracking[watcher.expression].newValue = value;
	        }
	    });
	};
	
	/**
	 * Checks every binding for the given scope and updates every value.
	 *
	 * @param {ScopePrototype} scope
	 * @param {ScopeInfo} scopeInfo
	 */
	var recycle = exports.recycle = function recycle(scope) {
	    var t0 = window.performance.now();
	
	    if (scope) {
	        executeWatchers(scope);
	        scopeList.get(scope).bindings.forEach(function (binding) {
	            return binding.update(scope);
	        });
	    } else {
	        scopeIndex.forEach(function (scope) {
	            executeWatchers(scope);
	            scopeList.get(scope).bindings.forEach(function (binding) {
	                return binding.update(scope);
	            });
	        });
	    }
	
	    Object.keys(expressionTracking).forEach(function (expr) {
	        expr = expressionTracking[expr];
	
	        expr.value = expr.newValue;
	    });
	
	    var t1 = window.performance.now();
	    var duration = ((t1 - t0) / 1000).toFixed(2);
	
	    if (scope) {
	        console.log('scope recycled in ' + duration + 's', scope);
	    } else {
	        console.log('full recycle in ' + duration + 's');
	    }
	};
	
	var destoryScope = exports.destoryScope = function destoryScope(scope) {
	    scopeList.delete(scope);
	    scopeIndex.splice(scopeIndex.indexOf(scope), 1);
	    watcherList.delete(scope);
	};
	
	/**
	 * Returns the value of an DOM Node
	 *
	 * @param {Node} node
	 */
	var getElementValue = function getElementValue(node) {
	    if (node.localName === 'input') {
	        return node.value;
	    } else {
	        return 'UNKNOWN NODE!';
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	/**
	 * Parses an object expression
	 *
	 * @param {string} source
	 * @param {ScopePrototype} scope
	 */
	var ObjectParser = exports.ObjectParser = function ObjectParser(source) {
	    var target = null;
	    var key = false;
	    var keyBuffer = '';
	    var valueBuffer = '';
	    var run = true;
	
	    source.split('').forEach(function (char) {
	        if (run) {
	            if (char === '{') {
	                target = {};
	                key = true;
	            } else if (char === ':') {
	                key = false;
	            } else if (char === ',') {
	                target[keyBuffer.trim()] = valueBuffer.trim();
	                keyBuffer = valueBuffer = '';
	                key = true;
	            } else if (char === '}') {
	                target[keyBuffer.trim()] = valueBuffer.trim();
	                run = false;
	            } else if (key) {
	                keyBuffer += char;
	            } else if (!key) {
	                valueBuffer += char;
	            }
	        }
	    });
	
	    return target;
	};
	
	/**
	 * Parses a given expression in the context of the given scope.
	 *
	 * @param {string} expression
	 * @param {ScopePrototype} scope
	 * @return {ScopePrototype}
	 */
	var parseExpression = exports.parseExpression = function parseExpression(expression, scope) {
	    var chain = expression.split('.');
	
	    chain.forEach(function (item) {
	        var pos = item.search(/\(\)$/);
	
	        if (scope) {
	            if (pos > 0) {
	                var scopeChild = scope[item.substring(0, pos)];
	
	                if (scopeChild) {
	                    scope = scopeChild.apply(scope);
	                } else {
	                    return '';
	                }
	            } else {
	                scope = scope[item];
	            }
	        }
	    });
	
	    return typeof scope !== 'null' && typeof scope !== 'undefined' ? scope : '';
	};
	
	/**
	 * Assings an value to an expression in an given scope
	 *
	 * @param {string} expression
	 * @param {ScopePrototype} scope
	 * @param {string} value
	 */
	var assignExpression = exports.assignExpression = function assignExpression(expression, scope, value) {
	    var chain = expression.split('.');
	
	    chain.forEach(function (property, index) {
	        if (chain.length - 1 !== index) {
	            scope = scope[property];
	        } else {
	            scope[property] = value;
	        }
	    });
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Contains all the attribute names
	 *
	 * @type {Object}
	 */
	var attributeNames = exports.attributeNames = {
	    events: 'events',
	    visible: 'display',
	    transparent: 'visible',
	    classes: 'class',
	    value: 'value',
	    prefix: 'bind',
	    enabled: 'enabled',
	    model: 'model',
	    modelEvent: 'model-event',
	
	    get: function get(key) {
	        return this.prefix + '-' + this[key];
	    },
	
	    rename: function rename(name) {
	        return name.replace(this.prefix + '-', '');
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getPolyParent = exports.polyMask = exports.unwrapPolymerNode = exports.selectAllElements = exports.selectElement = undefined;
	
	var _make = __webpack_require__(5);
	
	/**
	 * selects a dom node by the given query.
	 *
	 * @param {string} query
	 * @param {Node} context
	 * @return {Node}
	 */
	var selectElement = exports.selectElement = function selectElement(query, context) {
	    var node = null;
	
	    if (context) {
	        node = context.querySelector(query);
	    } else {
	        node = document.querySelector(query);
	    }
	
	    node = polyMask(node);
	
	    return node;
	};
	
	/**
	 * @param {string} query
	 * @param {Node} context
	 * @return {NodeList}
	 */
	var selectAllElements = exports.selectAllElements = function selectAllElements(query, context) {
	    var nodeList = null;
	
	    if (context) {
	        nodeList = context.querySelectorAll(query);
	    } else {
	        nodeList = document.querySelectorAll(query);
	    }
	
	    if (window.Polymer) {
	        nodeList = [].map.apply(nodeList, [polyMask]);
	    }
	
	    return nodeList;
	};
	
	var unwrapPolymerNode = exports.unwrapPolymerNode = function unwrapPolymerNode(node) {
	    if (!(0, _make.hasPrototype)(node, Node)) {
	        return (0, _make.Mixin)(node, node.node);
	    }
	
	    return node;
	};
	
	var polyMask = exports.polyMask = function polyMask(node) {
	    var polyNode = {};
	
	    var additions = {
	        get bare() {
	            return node;
	        }
	    };
	
	    if (window.Polymer) {
	        polyNode = window.Polymer.dom(node);
	    }
	
	    return (0, _make.Mixin)(polyNode, node, additions);
	};
	
	var getPolyParent = exports.getPolyParent = function getPolyParent(node, parentName) {
	    while (node && node.localName !== parentName) {
	        node = node.parentNode;
	    }
	
	    if (window.Polymer) {
	        node = window.Polymer.dom(node);
	    }
	
	    return node;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Parser = __webpack_require__(23);
	
	var _Util = __webpack_require__(25);
	
	var Binding = {
	
	    /**
	     * @type {string[]}
	     */
	    properties: null,
	
	    /**
	     * @type {string}
	     */
	    originalNodeValue: '',
	
	    /**
	     * @type {Node}
	     */
	    node: null,
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @type {Boolean}
	     */
	    singleExpression: false,
	
	    _make: function _make() {
	        this.properties = [];
	    },
	
	    update: function update(scope) {
	        var text = this.originalNodeValue;
	        var values = this.properties.map(function (key) {
	            var item = { name: key, value: (0, _Parser.parseExpression)(key, scope) };
	
	            return item;
	        });
	
	        if (this.singleExpression) {
	            text = (0, _Parser.parseExpression)(text, scope);
	        } else {
	            values.forEach(function (pair) {
	                text = text.replace('{{' + pair.name + '}}', pair.value);
	            });
	        }
	
	        if ((0, _make2.hasPrototype)(this.node, window.Attr)) {
	            (0, _Util.polyMask)(this.parentNode).setAttribute(this.node.name, text);
	        } else {
	            this.node.textContent = text.replace(/ /g, ' ');;
	        }
	    }
	};
	
	exports.default = Binding;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ClassBinding = (0, _make.Make)( /** @lends ClassBinding.prototype*/{
	
	    /**
	     * @type {Object}
	     */
	    classes: null,
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @constructs
	     * @extends {Binding}
	     */
	    _make: _Binding2.default._make,
	
	    applyClass: function applyClass(scope, classes, key) {
	        var expression = classes[key];
	        var value = (0, _Parser.parseExpression)(expression, scope);
	
	        key = key[0] === '!' ? key.substr(1) : key;
	
	        if (value) {
	            this.parentNode.classList.add(key);
	        } else {
	            this.parentNode.classList.remove(key);
	        }
	    },
	
	    update: function update(scope) {
	        var _this = this;
	
	        var classes = JSON.parse(JSON.stringify(this.classes));
	
	        Object.keys(classes).filter(function (key) {
	            return key.indexOf('!') === 0;
	        }).forEach(this.applyClass.bind(this, scope, classes));
	
	        setTimeout(function () {
	            Object.keys(classes).filter(function (key) {
	                return key.indexOf('!') !== 0;
	            }).forEach(_this.applyClass.bind(_this, scope, classes));
	        }, 0);
	    }
	
	}, _Binding2.default).get();
	
	exports.default = ClassBinding;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _Parser = __webpack_require__(23);
	
	var _Mapping = __webpack_require__(24);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TwoWayBinding = (0, _make.Make)( /** @lends TwoWayBinding.prototype*/{
	    /**
	     * @type {string}
	     */
	    currentValue: '',
	
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @type {boolean}
	     */
	    indirect: false,
	
	    /**
	     * @type {string}
	     */
	    viewBinding: '',
	
	    update: function update(scope) {
	        var value = (0, _Parser.parseExpression)(this.properties[0], scope);
	        var attribute = _Mapping.attributeNames.rename(this.node.name);
	
	        if (!this.indirect) {
	            this.parentNode.setAttribute(attribute, value);
	        } else {
	            var oldValue = (0, _Parser.parseExpression)(this.viewBinding, this.parentNode);
	
	            if (value !== oldValue) {
	                (0, _Parser.assignExpression)(this.viewBinding, this.parentNode, value);
	                this.currentValue = value;
	            }
	        }
	    }
	}, _Binding2.default).get();
	
	exports.default = TwoWayBinding;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Bind = __webpack_require__(22);
	
	/**
	 * Prototype for data binding scopes.
	 */
	var ScopePrototype = {
	
	    /**
	     * will apply the current state of the bound model.
	     *
	     * @param {function} fn
	     */
	    __apply__: function __apply__(fn, localRecycle) {
	        if (fn) {
	            fn();
	        }
	
	        return (0, _Bind.recycle)(localRecycle ? this : null);
	    },
	
	    __watch__: function __watch__(expression, cb) {
	        if (!_Bind.watcherList.has(this)) {
	            _Bind.watcherList.set(this, []);
	        }
	
	        _Bind.watcherList.get(this).push({
	            expression: expression,
	            cb: cb
	        });
	    },
	
	    __destroy__: function __destroy__() {
	        (0, _Bind.destoryScope)(this);
	    }
	};
	
	exports.default = ScopePrototype;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make = __webpack_require__(5);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EnabledBinding = (0, _make.Make)( /** @lends EnabledBinding.prototype*/{
	    /**
	     * @type {Node}
	     */
	    parentNode: null,
	
	    /**
	     * @constructs
	     * @extends {Binding}
	     */
	    _make: _Binding2.default._make,
	
	    update: function update(scope) {
	        var value = (0, _Parser.parseExpression)(this.originalNodeValue, scope);
	
	        if (!value) {
	            this.parentNode.setAttribute('disabled', '');
	        } else {
	            this.parentNode.removeAttribute('disabled');
	        }
	    }
	
	}, _Binding2.default).get();
	
	exports.default = EnabledBinding;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _make2 = __webpack_require__(5);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(23);
	
	var _Bind = __webpack_require__(22);
	
	var _Util = __webpack_require__(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TemplateRepeatBinding = (0, _make2.Make)( /** @lends TemplateRepeatBinding.prototype*/{
	
	    /**
	     * @type {WeakMap<Node>}
	     */
	    itemNodeList: null,
	
	    /**
	     * @type {WeakMap<ScopePrototype>}
	     */
	    itemScopeList: null,
	
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
	     * @return {void}
	     */
	    _make: function _make() {
	        _Binding2.default._make.apply(this);
	
	        this.itemNodeList = new WeakMap();
	        this.itemScopeList = new WeakMap();
	        this.modelBackup = [];
	    },
	
	    renderItem: function renderItem(model, scope, itemName, cursor, polyParent, item, index) {
	        var node = null;
	
	        if (this.itemNodeList.has(item)) {
	            node = this.itemNodeList.get(item);
	            var childScope = this.itemScopeList.get(item);
	
	            childScope.$first = index === 0;
	            childScope.$last = model.length - 1 === index;
	            childScope.$index = index;
	        } else {
	            var childScope = (0, _make2.Make)({
	                $first: index === 0,
	                $last: model.length - 1 === index,
	                $index: index
	            }, scope).get();
	
	            childScope[itemName] = item;
	
	            node = document.importNode(this.template.content, true).firstElementChild;
	            (0, _Bind.bindNode)(node, childScope, true);
	
	            this.itemNodeList.set(item, node);
	            this.itemScopeList.set(item, childScope);
	        }
	
	        if (cursor.value && cursor.value.parentNode) {
	            if (node !== cursor.value) {
	                if (polyParent) {
	                    (0, _Util.getPolyParent)(cursor.value, polyParent).insertBefore(node, cursor.value);
	                } else {
	                    (0, _Util.polyMask)(cursor.value.parentNode).insertBefore(node, cursor.value);
	                }
	            } else {
	                cursor.value = cursor.value.nextElementSibling;
	            }
	        } else {
	            if (polyParent) {
	                (0, _Util.getPolyParent)(this.marker.parentNode, polyParent).appendChild(node);
	            } else {
	                (0, _Util.polyMask)(this.marker.parentNode).appendChild(node);
	            }
	        }
	    },
	
	    update: function update(scope) {
	        var _this = this;
	
	        var _originalNodeValue$sp = this.originalNodeValue.split(' ');
	
	        var _originalNodeValue$sp2 = _slicedToArray(_originalNodeValue$sp, 3);
	
	        var itemName = _originalNodeValue$sp2[0];
	        var link = _originalNodeValue$sp2[1];
	        var expression = _originalNodeValue$sp2[2];
	
	        var model = (0, _Parser.parseExpression)(expression, scope);
	        var polyParent = this.template.getAttribute('bind-polymer-parent');
	
	        if (link !== 'in') {
	            console.console.error('DataBinding: invalide expression', this.originalNodeValue);
	            return;
	        }
	
	        if (Array.isArray(model)) {
	
	            this.modelBackup.forEach(function (item) {
	                if (model.indexOf(item) < 0) {
	                    if (polyParent) {
	                        (0, _Util.getPolyParent)(_this.marker, polyParent).removeChild(_this.itemNodeList.get(item));
	                    } else {
	                        (0, _Util.polyMask)(_this.marker.parentNode).removeChild(_this.itemNodeList.get(item));
	                        _this.itemNodeList.delete(item);
	                    }
	                }
	            });
	
	            this.modelBackup = model.slice();
	
	            if (window.Polymer) {
	                window.Polymer.dom.flush();
	            }
	
	            var cursor = {
	                value: this.marker.nextElementSibling
	            };
	
	            model.forEach(this.renderItem.bind(this, model, scope, itemName, cursor, polyParent));
	        }
	    }
	
	}, _Binding2.default).get();
	
	exports.default = TemplateRepeatBinding;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Binding = __webpack_require__(26);
	
	var _Binding2 = _interopRequireDefault(_Binding);
	
	var _Parser = __webpack_require__(23);
	
	var _Template = __webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AutoBinding = (0, _make2.Make)( /** @lends AutoBinding.prototype*/{
	
	    scopeName: '',
	
	    /** @type {HTMLTemplateNode} */
	    template: null,
	
	    _isBound: false,
	
	    _make: function _make() {},
	
	    update: function update(scope) {
	        var _this = this;
	
	        if (!this._isBound) {
	            (function () {
	                var subScope = (0, _Parser.parseExpression)(_this.scopeName, scope);
	
	                setTimeout(function () {
	                    var scopeHolder = null;
	                    var scopeObjName = null;
	
	                    if (_this.scopeName.lastIndexOf('.') > 0) {
	                        scopeHolder = _this.scopeName.split('.');
	                        scopeObjName = scopeHolder.pop();
	                        scopeHolder = (0, _Parser.parseExpression)(scopeHolder.join('.'), scope);
	
	                        scopeHolder[scopeObjName] = (0, _Template.makeTemplate)(_this.template, subScope, true);
	                    } else {
	                        (0, _Template.makeTemplate)(_this.template, subScope, true);
	                    }
	                }, 0);
	
	                _this._isBound = true;
	            })();
	        }
	    }
	
	}, _Binding2.default).get();
	
	exports.default = AutoBinding;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.importTemplate = undefined;
	
	var _NetworkRequest = __webpack_require__(34);
	
	var _NetworkRequest2 = _interopRequireDefault(_NetworkRequest);
	
	var _make2 = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FakeTemplate = {
	    _markup: '',
	
	    _make: function _make(markup) {
	        this._markup = markup;
	    },
	
	    get content() {
	        var fragment = new DocumentFragment();
	        var container = document.createElement('div');
	
	        container.innerHTML = this._markup;
	
	        [].forEach.apply(container.childNodes, [function (element) {
	            fragment.appendChild(element);
	        }]);
	
	        return fragment;
	    }
	};
	
	var importTemplate = exports.importTemplate = function importTemplate(source, template) {
	    var request = (0, _make2.Make)(_NetworkRequest2.default)(source, {});
	
	    return request.send().then(function (markup) {
	        var tplContainer = (0, _make2.Make)(FakeTemplate)(markup);
	
	        return (0, _make2.Mixin)(tplContainer, template);
	    });
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * @param {Object} object
	 */
	var stripHashKey = function stripHashKey(object) {
		if (Array.isArray(object)) {
			object = object.map(stripHashKey);
		} else {
			object = JSON.parse(JSON.stringify(object));
	
			Object.keys(object).forEach(function (key) {
				if (key == '$$hashKey') {
					delete object[key];
				} else if (_typeof(object[key]) === 'object') {
					object[key] = stripHashKey(object[key]);
				}
			});
		}
	
		return object;
	};
	
	/**
	 * @lends NetworkRequest.prototype
	 */
	var NetworkRequest = {
		/**
	  * @private
	  * @type {Object}
	  */
		_body: {},
	
		/**
	  * @private
	  * @type {Object}
	  */
		_headers: null,
	
		/**
	  * @type {string}
	  */
		type: '',
	
		/**
	  * @type {string}
	  */
		method: '',
	
		/**
	  * @type {string}
	  */
		url: '',
	
		/**
	  * @type {function[]}
	  */
		_listeners: null,
	
		/**
	  * The constructor for the NetworkRequest. It simply sets up the properties.
	  *
	  * @constructs
	  * @param {string} url
	  * @param {Object} config
	  * @return {NetworkRequest}
	  */
		_make: function _make(url, _ref) {
			var _ref$method = _ref.method;
			var method = _ref$method === undefined ? 'GET' : _ref$method;
			var _ref$type = _ref.type;
			var type = _ref$type === undefined ? 'none' : _ref$type;
	
			this.type = type;
			this.method = method;
			this._headers = {};
			this.url = url;
			this._listeners = [];
		},
	
		/**
	  * this method will set the given object as the request body.
	  *
	  * @param {Object} data
	  * @return {NetworkRequest}
	  */
		body: function body(data) {
			this._body = data;
	
			return this;
		},
	
		/**
	  * This method will set the request headers, in case custom headers are required.
	  *
	  * @param {Object} headers
	  * @return {NetworkRequest}
	  */
		headers: function headers(_headers) {
			this._headers = _headers;
	
			return this;
		},
	
		/**
	  * Sets a single header for this request.
	  *
	  * @param {string} key
	  * @param {string} value
	  * @return {NetworkRequest}
	  */
		setHeader: function setHeader(key, value) {
			this._headers[key] = value;
	
			return this;
		},
	
		/**
	  * @param {function} fn
	  */
		onReady: function onReady(fn) {
			this._listeners.push(fn);
		},
	
		/**
	  * This will actually create the network connection and initiate the request.
	  *
	  * @return {Promise}
	  */
		send: function send() {
			var _this = this;
	
			var self = this;
			var xhr = new XMLHttpRequest();
	
			if (this.method === 'GET' && this._body) {
				this.url += '?' + Object.keys(this._body).map(function (key) {
					return key + '=' + self._body[key];
				}).join('&');
			}
	
			xhr.open(this.method, this.url, true);
	
			var promise = new Promise(function (success, failure) {
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var response = xhr.response;
	
							if (xhr.getResponseHeader('Content-Type').indexOf('application/json') > -1 && typeof response === 'string') {
								response = JSON.parse(response);
							}
	
							_this._listeners.forEach(function (fn) {
								return fn(xhr);
							});
	
							success(response);
						} else {
							failure(xhr);
						}
					}
				};
			});
	
			Object.keys(this._headers).forEach(function (key) {
				xhr.setRequestHeader(key, self._headers[key]);
			});
	
			if (this.type === 'json') {
				var body = this._body;
	
				xhr.setRequestHeader('Content-Type', 'application/json');
	
				if (body) {
					body = stripHashKey(body);
					body = JSON.stringify(body);
				}
	
				xhr.send(body);
			} else {
				xhr.send(this._body);
			}
	
			return promise;
		}
	};
	
	exports.default = NetworkRequest;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DataBinding = __webpack_require__(20);
	
	var _make2 = __webpack_require__(5);
	
	var ViewPortInstance = {
	    _scope: null,
	    _bound: false,
	    _innerScope: null,
	    _originalTemplate: null,
	
	    _make: function _make(scope) {
	        this._scope = scope;
	    },
	
	    bind: function bind(context) {
	        if (!this._bound) {
	            this._scope.templateUrl = context.template;
	            this._scope.__apply__();
	
	            if (!this._originalTemplate) {
	                this._originalTemplate = this._scope.element.firstElementChild;
	            }
	
	            this._innerScope = _DataBinding.DataBinding.makeTemplate(this._originalTemplate, context.scope || {});
	            this._bound = true;
	
	            context.scope = this._innerScope;
	        } else {
	            console.error('ViewPort: viewport is already bound!');
	        }
	
	        return this;
	    },
	
	    update: function update() {
	        var _innerScope;
	
	        return (_innerScope = this._innerScope).__apply__.apply(_innerScope, arguments);
	    },
	
	    get scope() {
	        return this._innerScope;
	    },
	
	    destory: function destory() {
	        this._innerScope.__destroy__();
	
	        while (this._scope.element.children.length > 0) {
	            this._scope.element.removeChild(this._scope.element.firstChild);
	        }
	
	        this._scope.element.appendChild(this._originalTemplate);
	        this._bound = false;
	    }
	};
	
	var ViewPort = {
	
	    _elements: {},
	
	    /** @type {Application} */
	    _application: null,
	
	    /**
	     * @constructs
	     * @param {Application} application
	     */
	    _make: function _make(application) {
	        var _this = this;
	
	        var style = document.head.appendChild(document.createElement('style'));
	        var template = document.createElement('template');
	
	        style.innerHTML = '\n            .view-port {\n                position: absolute;\n                left: 0;\n                top: 0;\n                bottom: 0;\n                right: 0;\n                display: flex;\n                flex-direction: column;\n                overflow: auto;\n            }\n        ';
	
	        template.id = 'view-port';
	        template.setAttribute('bind-element', '');
	        template.setAttribute('component', '');
	
	        template.innerHTML = '\n            <div class="custom-element">\n                <template src="{{templateUrl}}" replace></template>\n            </div>\n        ';
	
	        application.on('newElement:view-port', function (scope) {
	            _this._elements[scope.name] = (0, _make2.Make)(ViewPortInstance)(scope);
	
	            application.emit('viewPort:ready:' + scope.name);
	        });
	
	        this._application = application;
	
	        _DataBinding.DataBinding.makeTemplate(template, function () {
	            return {};
	        }, application);
	    },
	
	    getInstance: function getInstance(name) {
	        var _this2 = this;
	
	        return new Promise(function (success) {
	            if (_this2._elements[name]) {
	                success(_this2._elements[name]);
	            } else {
	                _this2._application.on('viewPort:ready:' + name, function () {
	                    return success(_this2._elements[name]);
	                });
	            }
	        });
	    }
	};
	
	exports.default = ViewPort;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _DataBinding = __webpack_require__(20);
	
	var _make2 = __webpack_require__(5);
	
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _DataBinding = __webpack_require__(20);
	
	var _Profile = __webpack_require__(38);
	
	var _Profile2 = _interopRequireDefault(_Profile);
	
	var _UiPage = __webpack_require__(36);
	
	var _UiPage2 = _interopRequireDefault(_UiPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_App2.default.on('ui-page:main-view', function () {
	    /** @type {ScopePrototype} */
	
	    var _DataBinding$makeTemp = _DataBinding.DataBinding.makeTemplate('#main-view', {
	        profile: null,
	
	        $methods: {
	            manageWords: function manageWords() {
	                _UiPage2.default.activate('word-manager');
	            },
	
	            trainWords: function trainWords() {
	                _UiPage2.default.activate('word-trainer');
	            },
	
	            reset: function reset() {
	                this.profile.progress = 0;
	
	                this.profile.wordList.forEach(function (word) {
	                    word.tests = 0;
	                    word.right = 0;
	                    word.priority = 0;
	                });
	
	                _Profile2.default.save(this.profile);
	            }
	        }
	    });
	
	    var scope = _DataBinding$makeTemp.scope;
	
	
	    _App2.default.on('ui-page:activated', function () {
	        console.log(scope.profile);
	        if (scope.profile) {
	            _Profile2.default.save(scope.profile);
	        }
	    });
	
	    _Profile2.default.get().then(function (profile) {
	        scope.profile = profile;
	
	        scope.__apply__();
	    });
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _make2 = __webpack_require__(5);
	
	var _Word = __webpack_require__(39);
	
	var _Word2 = _interopRequireDefault(_Word);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var db = new Promise(function (success, failure) {
	    var request = window.indexedDB.open('VocTrainer.ProfileStroage', 3);
	
	    request.onsuccess = function (e) {
	        var db = e.target.result;
	
	        var Interface = {
	            getProfile: function getProfile(name) {
	                return new Promise(function (success, failure) {
	                    var request = db.transaction(['profile']).objectStore('profile').get(name);
	
	                    request.onsuccess = function (e) {
	                        success(e.target.result);
	                    };
	
	                    request.onerror = failure;
	                });
	            },
	
	            saveProfile: function saveProfile(profile) {
	                return new Promise(function (success) {
	                    var request = db.transaction(['profile'], 'readwrite').objectStore('profile').put(profile);
	
	                    request.onsuccess = function () {
	                        success();
	                    };
	                });
	            }
	        };
	
	        success(Interface);
	    };
	
	    request.onupgradeneeded = function (e) {
	        var db = e.target.result;
	
	        console.log('upgrading DB', e.oldVersion, 1);
	
	        if (e.oldVersion < 1) {
	            db.createObjectStore('profile', { keyPath: 'name' });
	        }
	    };
	
	    request.onerror = failure;
	});
	
	var ProfilePrototype = {
	    userLang: '',
	    targetLang: '',
	    progress: 0,
	    lasttTime: '',
	    wordList: null,
	    name: '',
	
	    _make: function _make(name) {
	        this.wordList = [];
	        this.name = name;
	    },
	
	    langSet: function langSet() {
	        return this.userLang.length > 0 && this.targetLang.length > 0;
	    },
	
	    canTest: function canTest() {
	        return this.langSet() && this.wordList.length > 0;
	    }
	};
	
	var Profile = {
	
	    _profile: null,
	
	    get: function get() {
	        if (!this._profile) {
	            this._profile = db.then(function (db) {
	                return db.getProfile('default');
	            }).then(function (profile) {
	
	                if (profile) {
	                    profile = (0, _make2.Make)(profile, ProfilePrototype).get();
	                    profile.wordList = profile.wordList.map(function (word) {
	                        return (0, _make2.Make)(word, _Word2.default).get();
	                    });
	                } else {
	                    profile = (0, _make2.Make)(ProfilePrototype)('default');
	                }
	
	                console.log('profile', profile);
	
	                return profile;
	            }, function (error) {
	                console.error(error);
	            });
	        }
	
	        return this._profile;
	    },
	
	    save: function save(profile) {
	        db.then(function (db) {
	            db.saveProfile(profile);
	        });
	    }
	};
	
	exports.default = Profile;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Word = {
	    text: '',
	    translation: '',
	    pronounciation: '',
	    right: 0,
	    tests: 0,
	    priority: 0,
	
	    get percent() {
	        return Math.round(this.right / this.tests * 100);
	    }
	};
	
	exports.default = Word;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _DataBinding = __webpack_require__(20);
	
	var _make = __webpack_require__(5);
	
	var _Profile = __webpack_require__(38);
	
	var _Profile2 = _interopRequireDefault(_Profile);
	
	var _UiPage = __webpack_require__(36);
	
	var _UiPage2 = _interopRequireDefault(_UiPage);
	
	var _Word = __webpack_require__(39);
	
	var _Word2 = _interopRequireDefault(_Word);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_App2.default.on('ui-page:word-manager', function () {
	    /** @type {ScopePrototype} */
	
	    var _DataBinding$makeTemp = _DataBinding.DataBinding.makeTemplate('#word-manager', {
	        profile: null,
	
	        selection: -1,
	
	        hideList: function hideList() {
	            return !!editorScope.item;
	        },
	
	        $methods: {
	            backToMain: function backToMain() {
	                _UiPage2.default.activate('main-view');
	            },
	            selectionChanged: function selectionChanged(e) {
	                if (this.profile) setWordItem();
	            }
	        }
	    });
	
	    var managerScope = _DataBinding$makeTemp.scope;
	
	    var _DataBinding$makeTemp2 = _DataBinding.DataBinding.makeTemplate('#word-editor', {
	        item: null,
	        profile: null,
	
	        hasItem: function hasItem() {
	            return !!this.item;
	        },
	
	        checkNew: function checkNew() {
	            return this.item && !this.item.isNew;
	        },
	
	        hideEditor: function hideEditor() {
	            return !this.item;
	        },
	
	        $methods: {
	            removeItem: function removeItem() {
	                var index = this.profile.wordList.indexOf(this.item);
	
	                this.profile.wordList.splice(index, 1);
	            },
	
	            closeEditor: function closeEditor() {
	                this.item = null;
	                managerScope.selection = -1;
	            }
	        }
	    });
	
	    var editorScope = _DataBinding$makeTemp2.scope;
	
	
	    var setWordItem = function setWordItem() {
	        if (editorScope.item && !editorScope.item.isNew) {
	            _Profile2.default.save(editorScope.profile);
	        }
	
	        if (managerScope.profile && managerScope.selection < managerScope.profile.wordList.length) {
	            editorScope.item = managerScope.profile.wordList[managerScope.selection];
	        } else if (managerScope.selection > 0 || editorScope.profile && editorScope.profile.wordList.length === 0) {
	            editorScope.item = (0, _make.Make)({
	                text: '',
	                translation: '',
	                pronounciation: '',
	                isNew: true
	            }, _Word2.default).get();
	        } else {
	            editorScope.item = null;
	        }
	    };
	
	    managerScope.__watch__('profile', setWordItem);
	
	    editorScope.__watch__('item.text', function (value) {
	        if (value && value !== '' && this.item.isNew) {
	            this.item.isNew = false;
	            this.profile.wordList.push(this.item);
	        }
	    });
	
	    _Profile2.default.get().then(function (profile) {
	        managerScope.profile = editorScope.profile = profile;
	
	        managerScope.__apply__();
	    });
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(1);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _DataBinding = __webpack_require__(20);
	
	var _make = __webpack_require__(5);
	
	var _Profile = __webpack_require__(38);
	
	var _Profile2 = _interopRequireDefault(_Profile);
	
	var _TestUnit = __webpack_require__(42);
	
	var _TestUnit2 = _interopRequireDefault(_TestUnit);
	
	var _UiPage = __webpack_require__(36);
	
	var _UiPage2 = _interopRequireDefault(_UiPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_App2.default.on('ui-page:word-trainer', function () {
	
	    var next = function next() {
	        scope.currentIndex += 1;
	        var item = scope.testList[scope.currentIndex];
	        var userLang = scope.language === scope.profile.userLang;
	
	        if (scope.testUnit) {
	            scope.testUnitList.push(scope.testUnit);
	        }
	
	        if (item) {
	            scope.testUnit = (0, _make.Make)({
	                text: userLang ? item.text : item.translation,
	                translation: userLang ? item.translation : item.text,
	                pronounciation: userLang ? item.pronounciation : null,
	                word: item
	            }, _TestUnit2.default).get();
	
	            return true;
	        }
	
	        return false;
	    };
	
	    var finalize = function finalize() {
	        scope.testUnitList.forEach(function (unit) {
	            if (unit.status) {
	                unit.word.right = parseInt(unit.word.right) + 1;
	                unit.word.priority = parseInt(unit.word.priority) + 1;
	            }
	
	            unit.word.tests = parseInt(unit.word.tests) + 1;
	        });
	
	        var rightTests = 0;
	        var totalTests = 0;
	        var notTested = 0;
	        var totalWords = scope.profile.wordList.length;
	
	        scope.profile.wordList.forEach(function (word) {
	            rightTests += parseInt(word.right);
	            totalTests += parseInt(word.tests);
	
	            if (word.tests === 0) {
	                notTested += 1;
	            }
	        });
	
	        console.log('Tests:', rightTests, '/', totalTests);
	        console.log('Words Tested:', totalWords - notTested, '/', totalWords);
	
	        scope.profile.progress = (rightTests / totalTests * ((totalWords - notTested) / totalWords) * 100).toFixed(2);
	        scope.profile.lastTime = new Date().toLocaleString();
	    };
	
	    /**
	     * Randomize array element order in-place.
	     * Using Durstenfeld shuffle algorithm.
	     */
	    var shuffleArray = function shuffleArray(array) {
	        for (var i = array.length - 1; i > 0; i--) {
	            var j = Math.floor(Math.random() * (i + 1));
	            var temp = array[i];
	            array[i] = array[j];
	            array[j] = temp;
	        }
	        return array;
	    };
	
	    var _DataBinding$makeTemp = _DataBinding.DataBinding.makeTemplate('#word-trainer', {
	        profile: null,
	
	        language: null,
	
	        /**
	         * @type {TestUnit}
	         */
	        testUnit: null,
	
	        /**
	         * @type {Word[]}
	         */
	        testList: null,
	
	        /**
	         * @type {TestUnit[]}
	         */
	        testUnitList: null,
	
	        currentIndex: 0,
	
	        noLanguage: function noLanguage() {
	            return !this.language;
	        },
	
	        isLanguage: function isLanguage() {
	            return !!this.language;
	        },
	
	        getIndex: function getIndex() {
	            return this.currentIndex + 1;
	        },
	
	        hasPronounc: function hasPronounc() {
	            return !!(this.testUnit && this.testUnit.pronounciation);
	        },
	
	        getButtonStatus: function getButtonStatus() {
	            if (this.testUnit) {
	                if (this.testUnit.status === null) {
	                    return 'icons:done';
	                } else if (this.testUnit.status) {
	                    return 'icons:done-all';
	                } else if (!this.testUnit.status) {
	                    return 'icons:clear';
	                }
	            }
	        },
	
	
	        noStatus: function noStatus() {
	            return !!(this.testUnit && this.testUnit.status === null);
	        },
	
	        wrongStatus: function wrongStatus() {
	            return !!(this.testUnit && this.testUnit.status !== null && !this.testUnit.status);
	        },
	
	        rightStatus: function rightStatus() {
	            return !!(this.testUnit && this.testUnit.status !== null && this.testUnit.status);
	        },
	
	        hasStatus: function hasStatus() {
	            return !!(this.testUnit && this.testUnit.status !== null);
	        },
	
	        $methods: {
	            chooseUserLang: function chooseUserLang() {
	                this.language = this.profile.userLang;
	                next();
	            },
	
	            chooseTargetLang: function chooseTargetLang() {
	                this.language = this.profile.targetLang;
	                next();
	            },
	
	            check: function check() {
	                this.testUnit.checkAnswer();
	
	                if (this.testUnit.status) {
	                    this.testUnit.answer = this.testUnit.translation;
	                }
	            },
	
	            checkOnEnter: function checkOnEnter(e) {
	                if (e.which === 13) {
	                    this.$methods.check.apply(this);
	                }
	            },
	
	            continue: function _continue() {
	                if (!next()) {
	                    this.$methods.back();
	                };
	            },
	
	            back: function back() {
	                if (scope.profile) {
	                    finalize();
	                }
	
	                _UiPage2.default.activate('main-view');
	            }
	        }
	    });
	
	    var scope = _DataBinding$makeTemp.scope;
	
	
	    _App2.default.on('ui-page:word-trainer:activated', function () {
	        var wordList = shuffleArray(scope.profile.wordList.slice()).sort(function (a, b) {
	            return a.priority > b.priority;
	        });
	
	        var testList = [];
	
	        for (var i = 0; i < 20 && i < wordList.length; i += 1) {
	            testList.push(wordList[i]);
	        }
	
	        scope.testList = testList;
	        scope.testUnitList = [];
	        scope.currentIndex = -1;
	        scope.language = null;
	        scope.__apply__();
	    });
	
	    _Profile2.default.get().then(function (profile) {
	        scope.profile = profile;
	    });
	});

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var splitChar = [',', '，'];
	
	var TestUnit = {
	    text: '',
	    translation: '',
	    pronounciation: null,
	    answer: '',
	    status: null,
	    word: null,
	
	    checkAnswer: function checkAnswer() {
	        var _this = this;
	
	        var split = splitChar.find(function (char) {
	            return _this.translation.indexOf(char) > -1;
	        });
	
	        if (split) {
	            this.status = this.translation.split(split).map(function (word) {
	                return word.trim();
	            }).indexOf(this.answer) > -1;
	        } else {
	            this.status = this.answer.trim() === this.translation;
	        }
	    }
	};
	
	exports.default = TestUnit;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map