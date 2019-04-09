var express = require('express');
var app = express();

app.set("view engine", 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Granite Hill", image: "https://photosforclass.com/download/flickr-225912054"},
        {name: "Mountain Goat's Rest", image: "https://photosforclass.com/download/flickr-1430198323"}
    ];

    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});