var age = prompt("How old are you?");

if (age < 0) {
    console.log("Error you cannot have a negative age!");
}

//  Doesn't work with triple '=' because the number is a prompt is a string.
// Needs converting to int to work with triple '='
else if (age == 21) {
    console.log("Happy 21st Birthday!");
}

else if (age % 2 === 1) {
    console.log("Your age is odd!");
}

else if (Number.isInteger(Math.sqrt(age))) {
    console.log("Perfect Square!");
}

// Can also be:
// else if (age % Math.sqrt(age) === 0) {
//     console.log("Perfect Square!");
// }
