import { Make } from 'af/util/make.js';
import Word from './Word.js';

let db = new Promise((success, failure) => {
    let request = window.indexedDB.open('VocTrainer.ProfileStroage', 3);

    request.onsuccess = function(e) {
        let db = e.target.result;

        let Interface = {
            getProfile : function(name) {
                return new Promise((success, failure) => {
                    let request = db.transaction(['profile']).objectStore('profile').get(name);

                    request.onsuccess = function(e){
                        success(e.target.result);
                    };

                    request.onerror = failure;
                });
            },

            saveProfile : function(profile){
                return new Promise(success => {
                    let request = db.transaction(['profile'], 'readwrite').objectStore('profile').put(profile);

                    request.onsuccess = function(){
                        success();
                    }
                });
            }
        };

        success(Interface);
    };

    request.onupgradeneeded = function(e){
        let db = e.target.result;

        console.log('upgrading DB', e.oldVersion, 1);

        if (e.oldVersion < 1) {
            db.createObjectStore('profile', { keyPath : 'name' });
        }
    };

    request.onerror = failure;
});

let ProfilePrototype = {
    userLang : '',
    targetLang : '',
    progress : 0,
    lasttTime : '',
    wordList : null,
    name: '',

    _make : function(name){
        this.wordList = [];
        this.name = name;
    },

    langSet : function(){
        return this.userLang.length > 0 && this.targetLang.length > 0;
    },

    canTest : function(){
        return this.langSet() && this.wordList.length > 0;
    }
}

let Profile = {

    _profile : null,

    get : function(){
        if (!this._profile) {
            this._profile = db.then(db => {
                return db.getProfile('default');
            }).then(profile => {

                if (profile) {
                    profile = Make(profile, ProfilePrototype).get();
                    profile.wordList = profile.wordList.map(word => Make(word, Word).get());
                } else {　
                    profile = Make(ProfilePrototype)('default');
                }

                console.log('profile', profile);

                return profile;
            }, error => {
                console.error(error);
            });
        }

        return this._profile;
    },

    save : function(profile) {
        db.then(db => {
            db.saveProfile(profile);
        });
    }
}


export default Profile;
