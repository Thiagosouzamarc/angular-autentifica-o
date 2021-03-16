var productModel = require('../models/productModel');

module.exports = {
    all: function(req, res) {
        productModel.find({}).lean().exec(function(err, products) {
            if (err)
                return res.json([])
            return res.json(products);
        })
    }
}