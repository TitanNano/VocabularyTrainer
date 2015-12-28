'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var splitChar = [',', '，'];

var TestUnit = {
    text: '',
    translation: '',
    pronounciation: null,
    answer: '',
    status: null,
    word: null,

    checkAnswer: function checkAnswer() {
        var _this = this;

        var split = splitChar.find(function (char) {
            return _this.translation.indexOf(char) > -1;
        });

        if (split) {
            this.status = this.translation.split(split).map(function (word) {
                return word.trim();
            }).indexOf(this.answer) > -1;
        } else {
            this.status = this.answer.trim() === this.translation;
        }
    }
};

exports.default = TestUnit;