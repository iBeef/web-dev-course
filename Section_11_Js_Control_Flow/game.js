// Create secretNumber
var secretNumber = 4;

// Ask user for guess
var stringGuess = prompt("Guess a number");
var guess = Number(stringGuess);

// Check guess
if (guess === secretNumber) {
    alert("You got it right!")
}
else if (guess > secretNumber) {
    alert("Too high! Guess again.")
}
else {
    alert("Too low! Guess again.")
}