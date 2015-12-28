'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _make2 = require('../../util/make.js');

var _Catalog = require('./Catalog.js');

var _Catalog2 = _interopRequireDefault(_Catalog);

var _Extendables = require('../objects/Extendables.js');

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