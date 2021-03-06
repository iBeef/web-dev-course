var express        = require("express"),
    bodyParser     = require("body-parser"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    flash          = require("connect-flash"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    passport       = require('passport'),
    User           = require("./models/user"),
    seedDB         = require("./seeds");

// Import Routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index");
    

var app = express();

// App setup
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Not an actual secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add user data to templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

// Start server
app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});