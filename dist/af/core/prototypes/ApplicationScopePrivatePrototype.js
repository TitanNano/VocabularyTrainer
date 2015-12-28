'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

var _make2 = require('../../util/make.js');

var _Scopes = require('../objects/Scopes.js');

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