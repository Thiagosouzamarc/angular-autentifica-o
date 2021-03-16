var express = require("express");
var router = express.Router();
var personController = require("../controllers/personController");
var productController = require("../controllers/productController");
var authContoller = require("../controllers/authController");

router.use(authContoller.check_token);

router.get('/people', personController.all);
router.get('/product', productController.all);

module.exports = router;