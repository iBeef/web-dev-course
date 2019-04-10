var express = require('express');
var bodyParser = require("body-parser");

// App setup
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');

var campgrounds = [
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg" },
    { name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg" },
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg" },
    { name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg" },
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg" },
    { name: "Granite Hill", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg" },
];

// GET routes
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

// POST routes
app.post('/campgrounds', (req, res) => {
    // Get data from form and add to camp grounds array.
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect to campgrounds page.
    res.redirect('/campgrounds');
});

// Start server
app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});