var mongoose = require("mongoose");
var faker = require("faker");
var productModel = require("../models/productModel")

mongoose.connect('mongodb://localhost:27017/auth_test', { useNewUrlParser: true, useUnifiedTopology: true});

async function add(n) {
    try {
        for(let i=0; i<n; i++) {
            const p = new productModel();
            p.name = faker.commerce.productName();
            p.department = faker.commerce.department();
            p.price = faker.commerce.price();
            await p.save();
        }
    }
    catch(err) {
        console.error(err);
    }
}

add(100)
    .then(() => {
        console.log("OK");
        mongoose.disconnect();
    })