var express    = require('express'),
    passport   = require('passport'),
    User = require("../models/user"),
    router     = express.Router();

// Root Route
router.get('/', (req, res) => {
    res.render('landing');
});

// Show Register Form
router.get("/register", (req, res) => {
    res.render('register')
});

// Register new user
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

// Show Login Form
router.get("/login", (req, res) => {
    res.render('login');
});

// Handle Logging In
router.post("/login",
passport.authenticate('local',
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
),
(req, res) => {
});

// Handle Logging Out
router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', "Logged you out!")
    res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;