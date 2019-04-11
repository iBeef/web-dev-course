var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


// App setup
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');

// Setup DB
mongoose.connect("mongodb://localhost:27017/yelp_camp");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"
// }, (err, campground) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });

// GET routes
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    // Get all campgrounds from db
    Campground.find({}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: result});     
        }
    });
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
    //  Create a new campground and save to db
    Campground.create(newCampground, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            // redirect to campgrounds page.
            res.redirect("/campgrounds")
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});