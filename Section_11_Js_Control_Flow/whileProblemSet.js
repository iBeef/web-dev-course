console.log("All numbers between -10 and 19");
console.log("");

var num = -10;

while (num < 20) {
    console.log("The number is: " + num);
    num++;
}
// Space
console.log("");
// Reset var num
num = 10;

console.log("All even numbers between 10 and 40");
console.log("");

while (num <= 40) {
    if (num % 2 === 0) {
        console.log("The even no. is: " + num);
    }
    num++;
}
// Space
console.log("");
// Reset var num
num = 300;

console.log("All odd numbers between 300 and 333");
console.log("");

while (num <= 333) {
    if (num % 2 === 1) {
        console.log("The even no. is: " + num);
    }
    num++;
}
// Space
console.log("");
// Reset var num
num = 5;

console.log("All numbers divisible by 5 and 3 between 5 and 50");
console.log("");

while (num <= 50) {
    if (num % 5 === 0 && num % 3 === 0) {
        console.log("The no. is: " + num);
    }
    num++;
}