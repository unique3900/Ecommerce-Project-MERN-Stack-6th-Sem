const Category = require('../models/Categorymodel');
const slugify = require('slugify');

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.json({ success:false, message: "Category Name is Requires" });

        }
        else {
            const categoryExist = await Category.findOne({ name });
            if (categoryExist) {
                res.json({ success:false, message: "Category Already Exist" });
            }
            else {
                const addNewCategory = await new Category({ name,slug:slugify(name) }).save();
                if (addNewCategory) {
                    res.json({ success:true, message: "Category Added Successfully" });
                }
            }
        }

    } catch (error) {
        res.json({ success:false, message: "Internal Server Error" });
    }
}


const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body;
    const {_id} = req.params;

    const productExist = await Category.findById({_id});
    if (!productExist) {
        res.json({ success: false, message: "Category Doesnot Exist" });
    }
    else {
        // Category Page update Garauna new chaincha
        const updateCategory = await Category.findByIdAndUpdate(_id, { name, slug:slugify(name)},{new:true});
        if (updateCategory) {
            res.json({ success: true, message: "Category Updated Successfully" });
        }
    }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
    
}

const getCategoryController = async (req, res) => {
    try {
        const getAllCategory = await Category.find({});
        if (getAllCategory) {
            res.json({
                success: true,
                message: "All Categories Fetched",
                getAllCategory
            })
        }
        else {
            res.json({
                success: false,
                message: "No Category Found",
               
            })
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
}
const getParticularCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const getonecategory = await Category.find({ name });
        if (getonecategory) {
            if (getonecategory) {
                res.json({
                    success: true,
                    message: "Category Fetched",
                    getonecategory
                })
            }
            else {
                res.json({
                    success: false,
                    message: "Category Doesnot Exist",
                   
                })
            }
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
}


const deleteCategoryController = async (req, res) => {
    try {
        const {_id} = req.params;
        const categoryExist = await Category.findOne({_id });
        if (!categoryExist) {
            res.json({ success: false, message: "Category Doesnot Exist" });
        }
        else {
            const deleteCategory = await Category.findByIdAndDelete(_id);
            if (!deleteCategory) {
                res.json({ success: false, message: "Couldnot Delete Category" });
            }
            else {
                res.json({ success: true, message: "Category Deleted Successfully" });
            }
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }


}
module.exports={createCategoryController,updateCategoryController,getCategoryController,getParticularCategoryController,deleteCategoryController}