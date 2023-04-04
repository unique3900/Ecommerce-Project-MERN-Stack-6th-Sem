const express = require('express');
const registerController = require('../controllers/authController');

// Router
const router = express();


router.post('/register', registerController);

module.exports = router;