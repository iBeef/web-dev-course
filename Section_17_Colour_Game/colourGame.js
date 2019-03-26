var numOfSquares = 6;
var colours = generateRandomColours(numOfSquares)
var squares = document.querySelectorAll('.square');
var pickedColour = pickColour();
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector('#reset');
var easyButton = document.querySelector("#easyBtn");
var hardButton = document.querySelector("#hardBtn");

easyButton.addEventListener("click", function() {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    numOfSquares = 3;
    colours = generateRandomColours(numOfSquares);
    pickedColour = pickColour();
    colourDisplay.textContent = pickedColour;
    for (var i = 0; i < squares.length; i++) {
        if (colours[i]) {
            squares[i].style.background = colours[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardButton.addEventListener("click", function() {
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    numOfSquares = 6;
    colours = generateRandomColours(numOfSquares);
    pickedColour = pickColour();
    colourDisplay.textContent = pickedColour;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colours[i];
        squares[i].style.display = "block";
    }
});

resetButton.addEventListener("click", function() {
    // Generate random colours
    colours = generateRandomColours(6)
    // Pick a new random colour from the array
    pickedColour = pickColour()
    // Change colourDisplay to match pickedColour
    colourDisplay.textContent = pickColour();
    // Change colours of squares on page
    for (var i = 0; i < squares.length; i++) {
        // Add initital colours to squares.
        squares[i].style.backgroundColor = colours[i];
    }
    h1.style.background = '#232323'
});

colourDisplay.textContent = pickedColour;

for (var i = 0; i < squares.length; i++) {
    // Add initital colours to squares.
    squares[i].style.backgroundColor = colours[i];

    // Add click listeners to squares.
    squares[i].addEventListener("click", function() {
        // Get colour of picked square and compare to picked colour.
        var clickedColour = this.style.backgroundColor;
        if (clickedColour === pickedColour) {
            messageDisplay.textContent = "Correct!"
            changeColours(clickedColour);
            h1.style.backgroundColor = clickedColour;
            resetButton.textContent = "Play Again?"
        } else {
            this.style.backgroundColor = '#232323';
            messageDisplay.textContent = "Try again"
        }
    })
}

function changeColours(colour) {
    // Loop through all squares and change colour to match given colour.
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colour;
    }
}

function pickColour() {
    var random = Math.floor((Math.random() * colours.length));
    return colours[random];
}

function generateRandomColours(num) {
    // Make an array.
    var arr = [];
    // Add random colours to that array.
    for (var i = 0; i < num; i++) {
        // Gen random colour
        // Push into array
        arr.push(randomColour());
    }
    // Return that array.
    return arr;
}

function randomColour() {
    // Pick a red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // Pick a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // Pick a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;

}