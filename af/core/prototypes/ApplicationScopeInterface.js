'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make = require('../../util/make.js');

var _Scopes = require('../objects/Scopes.js');

var _Scopes2 = _interopRequireDefault(_Scopes);

var _ApplicationScopePrivatePrototype = require('./ApplicationScopePrivatePrototype.js');

var _ApplicationScopePrivatePrototype2 = _interopRequireDefault(_ApplicationScopePrivatePrototype);

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

var _Extendables = require('../objects/Extendables.js');

var _Extendables2 = _interopRequireDefault(_Extendables);

var _Engine = require('../objects/Engine.js');

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