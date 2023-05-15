const express = require('express');
const { requireSignIn, isAdmin, isMyAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getParticularProduct, getProductImageController, deleteProductController, updateProductController, filterProductCategory, filterProductByCategory, productCountController, productPerPage, productSearchController, similarProductController, getProductByCategoryController, braintreeTokenController, braintreePaymentController } = require('../controllers/productController');
const formidableMiddleware = require('express-formidable');
const { getParticularCategoryController } = require('../controllers/categoryController');




// Router
const router = express();


router.post('/create-product', requireSignIn, isMyAdmin, formidableMiddleware(), createProductController);

router.get('/get-product', getProductController);
router.get('/get-product-categorywise/:slug', getProductByCategoryController);
router.get('/get-one-product/:slug', getParticularProduct);
router.get('/get-product-image/:_id', getProductImageController);
router.delete('/delete-product/:_id', requireSignIn, isMyAdmin, deleteProductController);
router.put('/update-product/:_id', requireSignIn, isMyAdmin, formidableMiddleware(), updateProductController);
router.post('/filter-product',filterProductCategory);
//  router.post('/filter-product-by-category',filterProductByCategory);

router.get('/count-product', productCountController);
router.get('/product-listing/:page', productPerPage);
router.get('/search/:keyword', productSearchController);
router.get('/similar-products/:pid/:cid', similarProductController);



// Payment Gateway

// token
router.get('/braintree/token', braintreeTokenController);
router.post('/braintree/payment',requireSignIn,braintreePaymentController)
module.exports = router;