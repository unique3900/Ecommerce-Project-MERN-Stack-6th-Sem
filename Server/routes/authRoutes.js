const express = require('express');
const {registerController} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');

// Router
const router = express();


router.post('/register', registerController);
router.post('/login',loginController)

module.exports = router;