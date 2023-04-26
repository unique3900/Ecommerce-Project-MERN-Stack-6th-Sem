const express = require('express');
const {registerController, forgotPasswordController, verificationController, changePasswordController, isAdmins} = require('../controllers/authController');
const {loginController} = require('../controllers/authController');
const {requireSignIn,isAdmin, isMyAdmin} = require('../middlewares/authMiddleware');


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
router.post('/admin-auth',requireSignIn , isMyAdmin, (req, res) => {
   console.log(req.body)
    res.status(200).json({ valid: true });
   
    
})


module.exports = router;