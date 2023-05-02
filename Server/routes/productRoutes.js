const express = require('express');
const { requireSignIn, isAdmin, isMyAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getParticularProduct, getProductImageController, deleteProductController, updateProductController, filterProductCategory } = require('../controllers/productController');
const formidableMiddleware = require('express-formidable');




// Router
const router = express();


router.post('/create-product', requireSignIn, isMyAdmin, formidableMiddleware(), createProductController);

router.get('/get-product', getProductController);
router.get('/get-one-product/:slug', getParticularProduct);
router.get('/get-product-image/:_id', getProductImageController);
router.delete('/delete-product/:_id', requireSignIn, isMyAdmin, deleteProductController);
router.put('/update-product/:_id', requireSignIn, isMyAdmin, formidableMiddleware(), updateProductController);
router.post('/filter-product',filterProductCategory);
 
module.exports = router;