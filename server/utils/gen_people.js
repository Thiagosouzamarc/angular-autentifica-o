var mongoose = require("mongoose");
var faker = require("faker");
var personModel = require("../models/personModel")

mongoose.connect('mongodb://localhost:27017/auth_test', { useNewUrlParser: true, useUnifiedTopology: true});

async function add(n) {
    try {
        for(let i=0; i<n; i++) {
            const p = new personModel();
            p.name = faker.name.firstName();
            p.country = faker.address.country();
            p.email = faker.internet.email();
            p.company = faker.company.companyName();
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