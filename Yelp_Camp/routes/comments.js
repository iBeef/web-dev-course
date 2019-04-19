var Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    express = require('express'),
    router = express.Router({mergeParams: true});

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
    //  Find the campground
    Campground.findById(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: result});
        }
    });
});

//  Comments Create
router.post("/", isLoggedIn, (req, res) => {
    // Lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Create new comment
            // console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save()
                    console.log(comment);
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
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

module.exports = router;