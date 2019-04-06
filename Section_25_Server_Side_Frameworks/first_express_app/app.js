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

app.get('/r/:subRedditName', function(req, res) {
    var subReddit = req.params.subRedditName;
    res.send(`Welcome to a ${subReddit} sub-reddit`);
});

app.get('/r/:subRedditName/comments/:id/:title', function(req, res) {
    console.log(req.params);
    res.send("Welcome to a sub-reddit comment section");
});

app.get('*', function(req, res) {
    res.send("You're a star!");
});

app.listen(3000, function() {
    console.log("First express app server started");
});