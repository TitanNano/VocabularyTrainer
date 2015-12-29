import App from './App.js';
import { DataBinding } from '../af/modules/DataBinding.js';
import { Make } from '../af/util/make.js';
import Profile from './Profile.js';
import UiPage from './UiPage.js';
import Word from './Word.js';

App.on('ui-page:word-manager', () => {
    /** @type {ScopePrototype} */
    let { scope : managerScope } = DataBinding.makeTemplate('#word-manager', {
        profile : null,

        selection : -1,

        hideList : function(){
            return !!editorScope.item;
        },

        $methods : {
            backToMain : function(){
                UiPage.activate('main-view');
            },
            selectionChanged : function(e){
                if (this.profile) setWordItem();
            }
        }
    });

    let { scope : editorScope } = DataBinding.makeTemplate('#word-editor', {
        item : null,
        profile : null,

        hasItem : function(){
            return !!this.item;
        },

        checkNew : function(){
            return this.item && !this.item.isNew;
        },

        hideEditor : function(){
            return !this.item;
        },

        $methods : {
            removeItem : function(){
                let index = this.profile.wordList.indexOf(this.item);

                this.profile.wordList.splice(index, 1);
            },

            closeEditor : function(){
                this.item = null;
                managerScope.selection = -1;
            }
        }
    });

    let setWordItem = function(){
        if (editorScope.item && !editorScope.item.isNew) {
            Profile.save(editorScope.profile);
        }

        if (managerScope.profile && managerScope.selection < managerScope.profile.wordList.length) {
            editorScope.item = managerScope.profile.wordList[managerScope.selection];
        } else if (managerScope.selection > 0 || (editorScope.profile &&　editorScope.profile.wordList.length  === 0)) {
            editorScope.item = Make({
                text : '',
                translation : '',
                pronounciation : '',
                isNew : true
            }, Word).get();
        } else {
            editorScope.item = null;
        }
    }

    managerScope.__watch__('profile', setWordItem);

    editorScope.__watch__('item.text', function(value){
        if (value && value !== '' && this.item.isNew) {
            this.item.isNew = false;
            this.profile.wordList.push(this.item);
        }
    });

    Profile.get().then(profile => {
        managerScope.profile = editorScope.profile = profile;

        managerScope.__apply__();
    });
});
