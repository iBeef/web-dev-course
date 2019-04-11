var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the db

// var george = new Cat({
//     name: "Mrs Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save((err, cat) => {
//     if(err) {
//         console.log("Something went wrong!");
//     } else {
//         console.log("We just saved a cat to the db.");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "bland"
// }, (err, result) => {
//     if(err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("Cat added");
//         console.log(result);
//     }
// });

// Retrieve all cats from the database.
Cat.find({}, (err, result) => {
    if(err) {
        console.log("Oh no, an error!");
        console.log(err);
    } else {
        console.log("All the cats!")
        console.log(result);
    }
});