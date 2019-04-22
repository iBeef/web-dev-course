var Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    // Is userlogged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, result) => {
            if(err) {
                req.flash('error', "Campground not found.");
                res.redirect("back");
            } else {
                if(!result) {
                    req.flash('error', "Campground not found.");
                    res.redirect('back');
                }
                // Does user own campground?
                if(result.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash('error', "You need to be logged in to do that.");
        res.redirect("back"); 
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Is userlogged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, result) => {
            if(err) {
                req.flash('error', "Comment not found.");
                res.redirect("back");
            } else {
                // Does user own comment?
                if(result.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash('error', "You need to be logged in to do that.");
        res.redirect("back"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', "You need to be logged in to do that.");
    res.redirect("/login");
}


module.exports = middlewareObj;