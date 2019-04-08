var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

var friends = ['Tony', 'Lilly', 'Steve', 'Alexios', 'Dan'];

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/addfriend', function(req, res) {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect('/friends');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.listen(3000, function() {
    console.log("The server has started.");
});