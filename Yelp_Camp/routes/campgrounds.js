var Campground = require("../models/campground"),
    express = require('express'),
    middleware = require("../middleware"),
    router = express.Router();

// Index Route
router.get("/", (req, res) => {
    // Get all campgrounds from db
    // console.log(req.user);
    Campground.find({}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", 
                {
                    campgrounds: result,
                    currentUser: req.user
                }
            );
        }
    });
});

// Create Route
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render("./campgrounds/new");
});

// Shows more info about one campground
router.get("/:id", (req, res) => {
    //  Find campground with provided id.
    Campground.findById(req.params.id).populate("comments").exec((err, result)=> {
        if(err) {
            console.log(err)
        } else {
            // Render the show twmplate with that campground
            res.render("campgrounds/show", {campground: result});    
        }
    });
});

// Logic for adding a new campground
router.post('/', middleware.isLoggedIn,  (req, res) => {
    // Get data from form and add to campgrounds array.
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        price: price,
        image: image,
        description: desc,
        author: author
    };
    //  Create a new campground and save to db
    Campground.create(newCampground, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            // redirect to campgrounds page.
            // console.log(result);
            res.redirect("/campgrounds")
        }
    });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    // Is userlogged in
    Campground.findById(req.params.id, (err, result) => {
        res.render("campgrounds/edit", {campground: result});
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
});

// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router; 