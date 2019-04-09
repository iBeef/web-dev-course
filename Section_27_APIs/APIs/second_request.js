var request = require('request');

// request('http://www.google.com', function(error, response, body) {
request('http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22', function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        // console.log(parsedData['name']);
        var city = parsedData['name'];
        // console.log(parsedData['sys']['country']);
        var country = parsedData['sys']['country'];
        // console.log(parsedData['weather'][0]['description']);
        var weather = parsedData['weather'][0]['description'];
        console.log(`The weather in ${city}, ${country} is ${weather}.`);
    }
});