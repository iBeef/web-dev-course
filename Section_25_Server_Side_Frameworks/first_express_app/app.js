var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("Hi there!");
});

app.get('/bye', function(req, res){
    res.send('Goodbye!');
});

app.get('/dog', function(req, res){
    console.log("Someone made a request to /dog");
    res.send('Woof!');
});

app.listen(3000, function() {
    console.log("First express app server started");
});