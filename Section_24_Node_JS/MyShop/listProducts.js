var faker = require('faker');
console.log('========================');
console.log("Welcome to my shop!");
console.log('========================');
for(var i = 0; i < 10; i++) {
    // console.log(faker.fake("{{commerce.productName}}"));
    product = faker.fake("{{commerce.productName}}");
    price = faker.fake("{{commerce.price}}");
    console.log(`Product: ${product} - Price: ${price}`);
}