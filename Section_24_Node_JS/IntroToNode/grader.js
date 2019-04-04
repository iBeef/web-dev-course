function average(scores) {
    // var total = 0;
    // scores.forEach(num => total += num);
    var total = scores.reduce((a, b) => a + b);
    // Above is equivalent to:
    // var total = scores.reduce(function(a, b) {
    //     return a + b;
        
    // });
    var avg = Math.round(total / scores.length);
    return avg;
};

var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(average(scores));
console.log(average(scores2));