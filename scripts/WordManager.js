'use strict';

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _DataBinding = require('af/modules/DataBinding.js');

var _make = require('af/util/make.js');

var _Profile = require('./Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _UiPage = require('./UiPage.js');

var _UiPage2 = _interopRequireDefault(_UiPage);

var _Word = require('./Word.js');

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