const express = require('express');

const {loginController} = require('../controllers/authController');
const {requireSignIn,isAdmin, isMyAdmin} = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, getCategoryController, getParticularCategory, getParticularCategoryController, deleteCategoryController } = require('../controllers/categoryController');


// Router
const router = express();


router.post('/create-category',requireSignIn,isMyAdmin, createCategoryController);
router.put('/update-category/:_id',requireSignIn, isMyAdmin, updateCategoryController);
router.get('/get-category', getCategoryController);
router.get('/get-one-category/:_id', getParticularCategoryController);
router.delete('/delete-category/:_id',requireSignIn, isMyAdmin, deleteCategoryController);


module.exports = router;