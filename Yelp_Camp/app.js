var express    = require("express"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    mongoose   = require("mongoose"),
    seedDB     = require("./seeds");

var app = express();

// App setup
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');

seedDB();

// GET routes
app.get('/', (req, res) => {
    res.render('landing');
});

app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from db
    Campground.find({}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: result});     
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render("./campgrounds/new");
});

// Shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //  Find campground with provided id.
    Campground.findById(req.params.id).populate("comments").exec((err, result)=> {
        if(err) {
            console.log(err)
        } else {
            console.log(result);
            // Render the show twmplate with that campground
            res.render("campgrounds/show", {campground: result});    
        }
    });
});

app.post('/campgrounds', (req, res) => {
    // Get data from form and add to camp grounds array.
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
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

// Comments Routes

app.get("/campgrounds/:id/comments/new", (req, res) => {
    //  Find the campground
    Campground.findById(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: result});
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});