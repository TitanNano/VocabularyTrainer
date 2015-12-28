import App from './App.js';
import { DataBinding } from 'af/modules/DataBinding.js';
import Profile from './Profile.js';
import UiPage from './UiPage.js';

App.on('ui-page:main-view', () => {
    /** @type {ScopePrototype} */
    let { scope } = DataBinding.makeTemplate('#main-view', {
        profile : null,

        $methods : {
            manageWords : function(){
                UiPage.activate('word-manager');
            },

            trainWords : function(){
                UiPage.activate('word-trainer');
            },

            reset : function(){
                this.profile.progress = 0;

                this.profile.wordList.forEach(word => {
                    word.tests = 0;
                    word.right = 0;
                    word.priority = 0;
                });

                Profile.save(this.profile);
            }
        }
    });

    App.on('ui-page:activated', function(){
        console.log(scope.profile);
        if (scope.profile) {
            Profile.save(scope.profile);
        }
    });

    Profile.get().then(profile => {
        scope.profile = profile;

        scope.__apply__();
    });
});
