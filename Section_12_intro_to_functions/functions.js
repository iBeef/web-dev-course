// function isEven(num) {
//     if (num % 2 === 0) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

function isEven(num) {
    return num % 2 == 0;
}

console.log(isEven(4));
console.log(isEven(21));
console.log(isEven(68));
console.log(isEven(333));

// function factorial(num) {
//     if (num === 0) {
//         return 1;
//     }
//     var result;
//     for(num; num > 0; num--) {
//         if (!result) {
//             result = num;
//         }
//         else {
//             result*=num;
//         }
//     }
//     return result;
// }

function factorial(num) {
    var result = 1;
    for(var i = 2; i <= num; i++) {
        result *= i
    }
    return result;
}

console.log(factorial(5));
console.log(factorial(2));
console.log(factorial(10));
console.log(factorial(0));

// function kebabToSnake(str) {
//     var newStr = "";
//     for (var i = 0; i < str.length; i++) {
//         if (str[i] === "-") {
//             newStr += "_";
//         }
//         else {
//             newStr += str[i];
//         }
//     }
//     return newStr;
// }

function kebabToSnake(str) {
    return str.replace(/-/g, "_")
}

console.log(kebabToSnake("hello-world"));
console.log(kebabToSnake("dogs-are-awesome"));
console.log(kebabToSnake("blah"));