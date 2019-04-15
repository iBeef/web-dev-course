var mongoose   = require('mongoose'),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
    {
        name: "Clouds Rest",
        image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
        description: "Blah Blah Blah"
    },
    {
        name: "Woody Woodlands",
        image: "https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg",
        description: "Blah Blah Blah"
    },
    {
        name: "Nomads Retreat",
        image: "https://farm1.staticflickr.com/211/467048513_4042c7979f.jpg",
        description: "Blah Blah Blah"
    },
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Removed Campgrounds!");
        // Add a few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet.",
                            author: "Homer"
                        }, (err, comment) => {
                            if(err) {
                                console.log(err);
                            } else {
                                // console.log(comment);
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!");
                            }
                        }
                    );
                }
            });
        });
    });
    // Add a few comments

}

module.exports = seedDB;