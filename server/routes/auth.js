const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
var authContoller = require("../controllers/authController");


router.post('/login', authController.login);
router.post('/register', authController.register);

router.use(authContoller.check_token);
router.get('/user', authController.user_data);

module.exports = router;