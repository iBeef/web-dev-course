var bodyParser       = require("body-parser"),
    express          = require('express'),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    mongoose         = require('mongoose'),
    app              = express();

// Setup app
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"))

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

//  Index
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, results) => {
        if(err) {
            console.log("OOOOPS! Something went wrong!");
        } else {
            res.render('index', {blogs: results});
        }
    });
});

// New Route
app.get("/blogs/new", (req, res) => {
    res.render('new');
});

// Create Route
app.post("/blogs", (req, res) => {
    // Sanitize body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Create blog
    Blog.create(req.body.blog, (err, result) => {
        if(err) {
            res.render('new')
        } else {
            // Redirect
            res.redirect("/blogs");
        }
    });
});

// Show Route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, result) => {
        if(err) {
            res.redirect("/blogs")
        } else {
            res.render('show', {blog: result});
        }
    });
});

// Edit Route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, result) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render('edit', {blog: result});
        }
    });
});

// Update Route
app.put("/blogs/:id", (req, res) => {
    // Sanitize body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // Update db
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, result) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

// Delete Route
app.delete("/blogs/:id", (req, res) => {
    // Destroy blog
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            // Redirect somewhere
            res.redirect("/blogs");
        }
    });
});

// Initialise App
app.listen(3000, () => {
    console.log("RESTful Blog App has started.")
});


