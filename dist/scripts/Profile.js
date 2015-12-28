'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _make2 = require('af/util/make.js');

var _Word = require('./Word.js');

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