var express       = require("express"),
    bodyParser    = require("body-parser"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    localStrategy = require("passport-local"),
    mongoose      = require("mongoose"),
    passport      = require('passport'),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

var app = express();

// App setup
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", 'ejs');
seedDB();

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
    next();
})

// GET routes
app.get('/', (req, res) => {
    res.render('landing');
});

app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from db
    console.log(req.user);
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    //  Find the campground
    Campground.findById(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: result});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    // Lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Create new comment
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save()
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// Auth Routes
app.get("/register", (req, res) => {
    res.render('register')
});

app.post("/register", (req, res) => {
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

// Show login form
app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login",
passport.authenticate('local',
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
),
(req, res) => {
});

// Logout Route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Start server
app.listen(3000, () => {
    console.log("The YelpCamp server has started.");
});