 function type1() {
        this.param1 = 4;
        this.param2 = 5;
        this.func1 = function() { console.log('function1')}
        this.func2 = function() { console.log('function1')}

}

function  type2() {
    this.param3 = 6;
    this.param4 = 7;
    this.func3 = function() { console.log('function1')}
    this.func4 = function() { console.log('function1')}

}

const object1 = new type1();
const object2 = new type2();

object1.prototype = object2;
console.log(object1);
console.log(object2);
console.log(object1.param3);
console.log(object1.prototype.param3);
console.log(object1.prototype);

// class class1 {
//     constructor() {
//         param1 = "param1";
//         param2 = "param2";
//     }

//     method1 = function
// }

