var express = require('express');

var app = express();

var animalNoises = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof!',
    cat: 'Meow',
    lion: 'Roar!!!'
};

var errorMsg = "Sorry, page not found...What are you doing with your life?";

// Home page '/'
app.get('/', function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

// Animal speak page
app.get('/speak/:animal', function(req, res) {
    animal = req.params.animal.toLowerCase();
    animalNoise = animalNoises[animal];
    if (animalNoise) {
        res.send(`The ${animal} says '${animalNoise}'`);
    } else {
        res.send("Sorry, animal not defined.");
    }
});

// Word repeat page
app.get('/repeat/:word/:noTimes', function(req, res) {
    word = req.params.word;
    noTimes = parseInt(req.params.noTimes);
    var str = word;
    for(var i = 0; i < noTimes - 1; i++) {
        str += ` ${word}`;
    }
    res.send(str);
});

// None defined pages
app.get('*', function(req, res) {
    res.send(errorMsg);
});

app.listen(3000, function() {
    console.log("Express route assignment server started");
})