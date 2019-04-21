var Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    express = require('express'),
    middleware = require("../middleware"),
    router = express.Router({mergeParams: true});

// Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
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
                    // console.log(comment);
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// Comments Edit Route
router.get("/:commentId/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.commentId, (err, result) => {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: result});
        }
    });
});

// Comments Update Route
router.put("/:commentId", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, result) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    });
});

// Comment Destroy Route
router.delete("/:commentId", middleware.checkCommentOwnership, (req, res) => {
    // Comment find by id and remove
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if(err) {
            res.redirect('back');
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

module.exports = router;