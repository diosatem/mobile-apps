/*
Calculator steps:
wait for a button to be clicked.
check which button it was.
if it was a number...
    check to see if we have a current operation.
        if yes, this should be the second number. store the number as number2.
        if no, this is the first number. store it.
if it was an operation...
    store the operation.
if it was equal...
    check to make sure we have a current number1 number2 and operation
    if yes, perform the operation, display the result, clear the operation and number2
    if no, error.

TO DO:
1. now it works if I am adding. just like we did with calc2. make the add method an arrow...
2. notice all of the 'this' references. how does 'this' work with objects and methods?
3. this is a simple way to build objects for OOP in JavaScript. there are a couple of...
4. below the calculator object is a bunch of commented out code. it is an example of what...
    */

const calc = {
    _number1: 0,
    _number2: 0,
    _operation: '',
    _inputOutput: document.getElementById('calcInput'),
    clear: function() {
        if (this._inputOutput.value == '') {
            //we want a deep clear... clear all properties, usually the second click of C
            this._operation = '';
            this._number1 = 0;
            this._number2 = 0;
        } else {
            //just clear the current display... usually the first click of C
            this._inputOutput.value = '';
        }
    },

    add: function() {
        return this._number1 + this._number2;
    },
    equal: function() {
        console.log(this);
        if (this._operation != '') {
            switch (this._operation) {
                case '+': this._inputOutput.value = this.add();
                break;
            }
        }
    },
    buttonClicked: function(button) {
        //notice the difference in the output between console.log and console.dir
        console.log(button);
        console.dir(button);


    }
}