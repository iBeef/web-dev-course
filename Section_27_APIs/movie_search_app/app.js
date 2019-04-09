var express = require('express');
var app = express();

var request = require('request');

app.set("view engine", 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    // res.send("Hello it works");
    var query = req.query.search;
    var url = `http://www.omdbapi.com/?apikey=thewdb&s=${query}`;
    request(url, (err, response, body) => {
        if(!err && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render('results', {data: data});
        }
    });
});

app.listen(3000, () => {
    console.log("The movie app has started.");
});