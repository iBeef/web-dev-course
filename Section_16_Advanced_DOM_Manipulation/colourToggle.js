// My solution

// var button = document.querySelector("button");
// // var body = document.querySelector("body");
// // A quicker way to do this is: document.body is a shortcut  built intot he document object.
// var body = document.body;

// button.addEventListener("click", function() {
//     if (body.style.backgroundColor === 'purple') {
//         body.style.backgroundColor = 'white';
//     } else {
//         body.style.backgroundColor = "purple";
//     }
// });


// // Colts solution

// var button = document.querySelector("button");
// var isPurple = false;

// button.addEventListener("click", function() {
//     if (isPurple) {
//         document.body.style.backgroundColor = 'white';
//         // isPurple = false;
//     } else {
//         document.body.style.backgroundColor = "purple";
//         // isPurple = true;
//     }
//     isPurple = !isPurple;
// });


// Colts solution with toggle

var button = document.querySelector("button");
// var isPurple = false;

button.addEventListener("click", function() {
    document.body.classList.toggle("purple");
});
