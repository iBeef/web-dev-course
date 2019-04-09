// var request = require('request');
const rp = require('request-promise');

// request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body) {
// request('https://jsonplaceholder.typicode.com/users/1', (error, response, body) => { // Arrow function => ES6 syntax
rp('https://jsonplaceholder.typicode.com/users/1')
    .then((body) => {
        const parsedData = JSON.parse(body);
        console.log(`${parsedData['name']} lives in ${parsedData.address.city}`);
        // console.log(body);
    })
    .catch((err) => {
        console.log('Error!', err);
    });