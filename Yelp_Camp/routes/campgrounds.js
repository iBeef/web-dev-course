var Campground = require("../models/campground"),
    express = require('express'),
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
router.get('/new', isLoggedIn, (req, res) => {
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
router.post('/', isLoggedIn,  (req, res) => {
    // Get data from form and add to campgrounds array.
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
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
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    // Is userlogged in
    Campground.findById(req.params.id, (err, result) => {
        res.render("campgrounds/edit", {campground: result});
    });
});

// Update Campground Route
router.put("/:id", checkCampgroundOwnership, (req, res) => {
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
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    // Is userlogged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, result) => {
            if(err) {
                res.redirect("back");
            } else {
                // Does user own campground?
                if(result.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back"); 
    }
}

module.exports = router; 