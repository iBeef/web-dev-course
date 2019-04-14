var mongoose = require('mongoose'),
    Post     = require("./models/post"),
    User     = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/blog_demo_2",
    {useNewUrlParser: true}
);

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
    title: "How to cook the best burger pt. 4",
    content: "The final chapter on  instructions and stuff about burgers!"
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

// // Find posts by user
// User.findOne({email: "bob@gmail.com"}).populate('posts').exec((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });