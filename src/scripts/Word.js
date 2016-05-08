let Word = {
    text : '',
    translation : '',
    pronounciation : '',
    right : 0,
    tests : 0,
    priority : 0,

    get percent() {
        return Math.round(this.right / this.tests * 100);
    }
}

export default Word;
