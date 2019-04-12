var bodyParser = require("body-parser"),
    express    = require('express'),
    mongoose   = require('mongoose');
    app        = express();

// Setup app
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Setup DB
mongoose.connect(
    "mongodb://localhost:27017/restful_blog_app",
    {useNewUrlParser: true}
);

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTful Routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, results) => {
        if(err) {
            console.log("OOOOPS! Something went wrong!");
        } else {
            res.render('index', {blogs: results});
        }
    });
});

// Initialise App
app.listen(3000, () => {
    console.log("RESTful Blog App has started.")
});


