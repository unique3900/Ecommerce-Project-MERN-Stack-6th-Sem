const express = require('express');

const {loginController} = require('../controllers/authController');
const {requireSignIn,isAdmin} = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, getCategoryController, getParticularCategory, getParticularCategoryController, deleteCategoryController } = require('../controllers/categoryController');


// Router
const router = express();


router.post('/create-category',isAdmin,requireSignIn, createCategoryController);
router.put('/update-category/:_id', isAdmin, requireSignIn, updateCategoryController);
router.get('/get-category', getCategoryController);
router.get('/get-one-category', getParticularCategoryController);
router.delete('/delete-category/:_id', isAdmin, requireSignIn, deleteCategoryController);


module.exports = router;