var obj = {
    name: "Chuck",
    add: function(x, y) {
        return x + y;
    }
};

console.log(obj.add(10, 5));

var comments = {};

comments.data = [
    "Great",
    "Good Job!",
    "That's Awesome!"
];

comments.print = function () {
    this.data.forEach(function(el) {
        console.log(el);
    });
};

// function print(arr) {
//     array.forEach(function (el) {
//         console.log(el);
//     });
// };

comments.print();