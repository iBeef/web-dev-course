var numOfSquares = 6;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll('.square');
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    resetButton.addEventListener("click", function() {
        reset();
    });
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    // Mode button event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function(){
           modeButtons[0].classList.remove("selected");
           modeButtons[1 ].classList.remove("selected");
           this.classList.add("selected");
           this.textContent == 'Easy' ? numOfSquares = 3: numOfSquares = 6;
           reset();
        });
    }
}

function setupSquares() {
    // Set event listeners for squares
    for (var i = 0; i < squares.length; i++) {
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
}

function reset() {
    // Generate random colours
    colours = generateRandomColours(numOfSquares)
    // Pick a new random colour from the array
    pickedColour = pickColour()
    // Change colourDisplay to match pickedColour
    colourDisplay.textContent = pickColour();
    resetButton.textContent = "New Colours";
    messageDisplay.textContent = '';
    // Change colours of squares on page
    for (var i = 0; i < squares.length; i++) {
        // Add initital colours to squares.
        if(colours[i]) {
            squares[i].style.display = 'block';
            squares[i].style.background = colours[i];
        } else {
            squares[i].style.display = 'none';
        }
        squares[i].style.backgroundColor = colours[i];
    }
    h1.style.background = 'steelblue';
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