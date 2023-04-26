const Product = require('../models/ProductModel.js');
const slugify = require('slugify');
const fs = require('fs');


const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity,shipping } = req.fields;
        const { image } = req.files;
        
        switch (true) {
            case !name:
               return res.json({ success: false, message: 'Product Name is Required' });
            case !description:
                return res.json({ success: false, message: 'Product Description is Required' });
            case !price:
                return res.json({ success: false, message: 'Product Price is Required' });
            case !quantity:
                return res.json({ success: false, message: 'Product Quantity is Required' });
            case !image && image.size>1000000:
                return res.json({ success: false, message: 'Product Photo is Required and Size must be less than 1MB' });
            
        }

        //Product ko copy banako (REQ receive bhayeko)
        const myProduct = new Product({ ...req.fields, slug: slugify(name) });
        if (image) {
            myProduct.image.data = fs.readFileSync(image.path);
            myProduct.image.contentType = image.type;

        }
        await myProduct.save();
        res.json({ success: true, message: 'Product Added Successfully',myProduct });
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
}

const getProductController = async (req, res) => {
    try {
        const productFetch = await Product.find({}).select("-image").limit(10).sort({ createdAt: -1 }).populate('category');
        if (productFetch) {
             res.json({ success: true, message: 'Product Fetched Successfully',productFetch });
        } 
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }

}
const getParticularProduct = async (req, res) => {
    try {
        const {slug } = req.params;
        const findProduct = await Product.findOne({ slug });
        if (findProduct) {
            res.json({ success: true, message: 'Product Fetched Successfully',findProduct }).populate('category'); 
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });

    }
    
    
}

const getProductImageController = async (req, res) => {
    try {
        const { _id } = req.params;
        const productFind = await Product.findById(_id).select('image');
        if (productFind.image.data) {
            res.set('Content-Type', productFind.image.contentType);
            res.send(productFind.image.data)
        }
        
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
    
}

const deleteProductController = async (req, res) => {
    try {
        
        const { _id } = req.params;
        const delProduct = await Product.findByIdAndDelete(_id).select("-image");
        if (delProduct) {
            res.json({ success: true, message: 'Product Deleted Successfully'})
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
}


const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity,shipping } = req.fields;
        const { image } = req.files;
        const {_id} = req.params;
        
        switch (true) {
            case !name:
               return res.json({ success: false, message: 'Product Name is Required' });
            case !description:
                return res.json({ success: false, message: 'Product Description is Required' });
            case !price:
                return res.json({ success: false, message: 'Product Price is Required' });
            case !quantity:
                return res.json({ success: false, message: 'Product Quantity is Required' });
            case !image && image.size>1000000:
                return res.json({ success: false, message: 'Product Photo is Required and Size must be less than 1MB' });
            
        }

        //Product ko copy banako (REQ receive bhayeko)
        const myProduct = await Product.findByIdAndUpdate(req.params._id, { ...req.fields, slug: slugify(name) },{new:true});
        if (image) {
            myProduct.image.data = fs.readFileSync(image.path);
            myProduct.image.contentType = image.type;

        }
        await myProduct.save();
        res.json({ success: true, message: 'Product Updated Successfully',myProduct });
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }
}

module.exports={createProductController,getProductController,getParticularProduct,getProductImageController,deleteProductController,updateProductController}