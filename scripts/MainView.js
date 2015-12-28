'use strict';

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _DataBinding = require('af/modules/DataBinding.js');

var _Profile = require('./Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _UiPage = require('./UiPage.js');

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