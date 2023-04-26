const Product = require('../models/ProductModel');
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
module.exports={createProductController}