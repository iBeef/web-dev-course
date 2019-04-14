var mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/blog_demo_2",
    {useNewUrlParser: true}
);

// Post - Title, Content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model('Post', postSchema);

// User - Email, Name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

var User = mongoose.model('User', userSchema);

// Create a user
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// Create a post
// Post.create({
//     title: "How to cook the best burger",
//     content: "Instructions and stuff about burgers!"
// }, (err, result) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// Create a post and update user
Post.create({
    title: "How to cook the best burger pt. 3",
    content: "Even even more instructions and stuff about burgers!"
}, (err, post) => {
    if(err) {
        console.log(err);
    } else {
        User.findOne({name: "Bob Belcher"}, (err, user) => {
            user.posts.push(post);
            user.save((err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
        });
    }
});

// Find posts by user
User.findOne({email: "bob@gmail.com"}).populate('posts').exec((err, user) => {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});