const express = require('express');
const { requireSignIn, isAdmin, isMyAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/productController');
const formidableMiddleware = require('express-formidable');



// Router
const router = express();


router.post('/create-product',requireSignIn,isMyAdmin ,formidableMiddleware(),createProductController);


 
module.exports = router;