import App from './App.js';
import { DataBinding } from '../af/modules/DataBinding.js';
import { Make } from '../af/util/make.js';
import Profile from './Profile.js';
import TestUnit from './TestUnit.js';
import UiPage from './UiPage.js';

App.on('ui-page:word-trainer', () => {

    let next = function(){
        scope.currentIndex += 1;
        let item = scope.testList[scope.currentIndex];
        let userLang = (scope.language === scope.profile.userLang);

        if (scope.testUnit) {
            scope.testUnitList.push(scope.testUnit);
        }

        if (item){
            scope.testUnit = Make({
                text : userLang ? item.text : item.translation,
                translation : userLang ? item.translation : item.text,
                pronounciation : userLang ? item.pronounciation : null,
                word : item
            }, TestUnit).get();

            return true;
        }

        return false;
    };

    let finalize = function(){
        scope.testUnitList.forEach(unit => {
            if (unit.status) {
                unit.word.right = parseInt(unit.word.right) + 1;
                unit.word.priority = parseInt(unit.word.priority) + 1;
            }

            unit.word.tests = parseInt(unit.word.tests) + 1;
        });

        let rightTests = 0;
        let totalTests = 0;
        let notTested = 0;
        let totalWords = scope.profile.wordList.length;

        scope.profile.wordList.forEach(word => {
            rightTests += parseInt(word.right);
            totalTests += parseInt(word.tests);

            if (word.tests === 0) {
                notTested += 1;
            }
        });

        console.log('Tests:', rightTests, '/', totalTests);
        console.log('Words Tested:', totalWords - notTested, '/', totalWords);

        scope.profile.progress = ((rightTests / totalTests) * ((totalWords - notTested) / totalWords) * 100).toFixed(2);
        scope.profile.lastTime = (new Date()).toLocaleString();
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    let shuffleArray = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    let { scope } = DataBinding.makeTemplate('#word-trainer', {
        profile : null,

        language : null,

        /**
         * @type {TestUnit}
         */
        testUnit : null,

        /**
         * @type {Word[]}
         */
        testList : null,

        /**
         * @type {TestUnit[]}
         */
        testUnitList : null,

        currentIndex : 0,

        noLanguage : function(){
            return !this.language;
        },

        isLanguage : function(){
            return !!this.language;
        },

        getIndex : function(){
            return this.currentIndex + 1;
        },

        hasPronounc : function(){
            return !!(this.testUnit && this.testUnit.pronounciation);
        },

        getButtonStatus(){
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

        noStatus : function(){
            return !!(this.testUnit && this.testUnit.status === null);
        },

        wrongStatus : function(){
            return !!(this.testUnit && this.testUnit.status !== null && !this.testUnit.status);
        },

        rightStatus : function(){
            return !!(this.testUnit && this.testUnit.status !== null && this.testUnit.status);
        },

        hasStatus : function(){
            return !!(this.testUnit && this.testUnit.status !== null);
        },

        $methods : {
            chooseUserLang : function(){
                this.language = this.profile.userLang;
                next();
            },

            chooseTargetLang : function(){
                this.language = this.profile.targetLang;
                next();
            },

            check : function(){
                this.testUnit.checkAnswer();

                if (this.testUnit.status) {
                    this.testUnit.answer = this.testUnit.translation;
                }
            },

            checkOnEnter : function(e){
                if (e.which === 13) {
                    this.$methods.check.apply(this);
                }
            },

            continue : function() {
                if(!next()){
                    this.$methods.back();
                };
            },

            back : function(){
                if (scope.profile) {
                    finalize();
                }

                UiPage.activate('main-view');
            }
        }
    });

    App.on('ui-page:word-trainer:activated', () => {
        let wordList = shuffleArray(scope.profile.wordList.slice()).sort((a, b) => {
            return a.priority > b.priority;
        });

        let testList = [];

        for (let i = 0; i < 20 && i < wordList.length; i+= 1) {
            testList.push(wordList[i]);
        }

        scope.testList = testList;
        scope.testUnitList = [];
        scope.currentIndex = -1;
        scope.language = null;
        scope.__apply__();
    });

    Profile.get().then(profile => {
        scope.profile = profile;
    })

});
