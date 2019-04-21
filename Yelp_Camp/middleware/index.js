var Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Is userlogged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, result) => {
            if(err) {
                res.redirect("back");
            } else {
                // Does user own comment?
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

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', "Please Login First!");
    res.redirect("/login");
}


module.exports = middlewareObj;