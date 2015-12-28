'use strict';

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _DataBinding = require('af/modules/DataBinding.js');

var _make = require('af/util/make.js');

var _Profile = require('./Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _TestUnit = require('./TestUnit.js');

var _TestUnit2 = _interopRequireDefault(_TestUnit);

var _UiPage = require('./UiPage.js');

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
                unit.word.right += 1;
            }

            unit.word.priority = unit.word.right;
            unit.word.tests += 1;
        });

        var rightTests = 0;
        var totalTests = 0;
        var notTested = 0;
        var totalWords = scope.profile.wordList.length;

        scope.profile.wordList.forEach(function (word) {
            rightTests += word.right;
            totalTests += word.tests;

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