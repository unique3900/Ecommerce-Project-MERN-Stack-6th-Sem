const express = require('express');
const {registerController, forgotPasswordController, verificationController, changePasswordController} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');


// Router
const router = express();


router.post('/register', registerController);

router.post('/login', loginController);

router.post('/forgot-password',forgotPasswordController);


router.post('/send-verification', verificationController);


router.post('/change-password', changePasswordController);


router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).json({valid:true})
})

// Protected admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req, res) => {
    res.status(200).json({valid:true})
})


module.exports = router;