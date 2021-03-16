var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userShema = new Schema({
    'firstName': String,
    'lastName': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'mobilePhone': String,
    'email': String,
    'password': String,
})

module.exports = mongoose.model('User', userShema);