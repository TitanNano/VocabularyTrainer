let Word = {
    text : '',
    translation : '',
    pronounciation : '',
    right : 0,
    tests : 0,
    priority : 0,

    get percent() {
        let right = this.right || 0;
        let tests = (this.tests && this.tests > 0) ? this.tests : 1;

        return Math.round(right / tests * 100);
    }
}

export default Word;
