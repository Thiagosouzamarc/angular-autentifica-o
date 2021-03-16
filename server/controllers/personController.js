var personModel = require('../models/personModel');

module.exports = {
    all: function(req, res) {
        personModel.find({}).lean().exec(function(err, people) {
            if (err)
                return res.json([])
            return res.json(people);
        })
    }
}