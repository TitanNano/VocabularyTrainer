'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApplicationScopeInterface = require('../prototypes/ApplicationScopeInterface.js');

var _ApplicationScopeInterface2 = _interopRequireDefault(_ApplicationScopeInterface);

var _ServiceScopeInterface = require('../prototypes/ServiceScopeInterface.js');

var _ServiceScopeInterface2 = _interopRequireDefault(_ServiceScopeInterface);

var _MozillaAddonScopeInterface = require('../prototypes/MozillaAddonScopeInterface.js');

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