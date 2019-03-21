var movies = [
    {
        title: "In Bruge",
        hasWatched: true,
        rating: 5
    },
    {
        title: "Top Gun",
        hasWatched: false,
        rating: 3.5
    },
    {
        title: "Frozen",
        hasWatched: false,
        rating: 4.5
    }
];

function buildString (movie) {
    var result = "You have ";
    if (movie.hasWatched) {
        result += "watched ";
    } else {
        result += "not seen ";
    }
    result += `\"${movie.title}\" - ${movie.rating} stars.`;
    return result;
};

// movies.forEach(function (movie) {
    // var result = "You have ";
    // if (movie.hasWatched) {
    //     result += "watched ";
    // } else {
    //     result += "not seen ";
    // }
    // result += `\"${movie.title}\" - ${movie.rating} stars.`
    // console.log(result);
// });

movies.forEach(function (movie) {
    console.log(buildString(movie));
});