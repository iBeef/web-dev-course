var bodyParser            = require("body-parser"),
    express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

var app = express();

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Not so secret that will end up on Github",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================================================
// Routes
// =================================================
    
app.get('/', (req, res) => {
    res.render('home');
});

app.get("/secret", (req, res) => {
    res.render('secret');
});

app.get("/register", (req, res) => {
    // Show sign-up form
    res.render('register');
});

app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect("/secret");
        });
    });
});

app.listen('3000', () => {
    console.log("The server has started.");
});