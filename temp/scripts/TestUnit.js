let splitChar = [',', '，'];

let TestUnit = {
    text : '',
    translation : '',
    pronounciation : null,
    answer : '',
    status : null,
    word : null,

    checkAnswer : function(){
        let split = splitChar.find(char => this.translation.indexOf(char) > -1);

        if (split) {
            this.status = this.translation.split(split).map(word => word.trim()).indexOf(this.answer) > -1;
        } else {
            this.status = this.answer.trim() === this.translation;
        }

    }
};

export default TestUnit;
