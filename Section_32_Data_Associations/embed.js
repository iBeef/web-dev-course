var mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/blog_demo",
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
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);

// var newUser = new User({
//     email: "hermoine@hogwarts.edu",
//     name: "Hermoine Grainger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion.",
//     content: "Just kidding, go to potions class!"
// });

// newUser.save((err, result) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on apples.",
//     content: "They are delicious."
// });

// newPost.save((err, result) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

User.findOne({name: "Hermoine Grainger"}, (err, result) => {
    if(err) {
        console.log(err, result);
    } else {
        result.posts.push({
            title: "3 things I really hate!",
            content: "Voldermort, Voldermort and Voldermort "
        });
        result.save((err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
});