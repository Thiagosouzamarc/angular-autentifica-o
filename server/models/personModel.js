var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personShema = new Schema({
    'name': String,
    'country': String,
    'email': String,
    'company': String 
})

module.exports = mongoose.model('Person', personShema);