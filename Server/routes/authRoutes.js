const express = require('express');
const {registerController} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');
const requireSignIn = require('../middlewares/authMiddleware');

// Router
const router = express();


router.post('/register', registerController);

router.post('/login', loginController);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).json({valid:true})
})


module.exports = router;