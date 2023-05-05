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
             res.json({ success: true,productFetch });
        } 
        else {
            res.json({ success: false,productFetch });
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error"+error });
    }

}
const getParticularProduct = async (req, res) => {
    try {
        const product = await Product
        .findOne({ slug: req.params.slug })
        .select("-image")
            .populate("category");
        
            res.status(200).send({
                success: true,
                message: "Single Product Fetched",
                product,
              });
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

const filterProductCategory = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await Product.find(args);
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Filtering Products",
          error,
        });
      }

}



const productCountController = async (req, res) => {
    try {
        const totalCount = await Product.find({}).estimatedDocumentCount();
        if (totalCount) {
            res.json({ success: true, totalCount });
        }
        else {
            res.json({ success: false, message:"Error in total fetch" });
        }
        
     
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Counting Product",
          error,
        });
    }
}


const productPerPage = async (req, res) => {
    try {
        const productsPerpage = 5;
        const page = req.params.page ? req.params.page : 1;
        const products = await Product.find({})
        .select("-image")
        .skip((page - 1) * productsPerpage)
        .limit(productsPerpage)
        .sort({ createdAt: -1 });

        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile fetching Product Per page",
          error,
        });
    }
}

const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-imege");
    res.json(results);

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error While searching Product",
            error,
          });
    }
}
// const filterProductByCategory = async (req, res) => {
//     try {
//         const { category } = req.body;
        
//         const products = await Product.find({category});
//         res.status(200).send({
//           success: true,
//           products,
//         });
//       } catch (error) {
//         console.log(error);
//         res.status(400).send({
//           success: false,
//           message: "Error WHile Filtering Products",
//           error,
//         });
//       }

// }

module.exports={createProductController,getProductController,getParticularProduct,getProductImageController,deleteProductController,updateProductController,filterProductCategory,productCountController,productPerPage,productSearchController}