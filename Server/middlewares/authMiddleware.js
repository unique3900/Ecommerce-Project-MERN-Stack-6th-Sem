const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');
const formidableMiddleware = require('express-formidable');

const requireSignIn = async (req, res, next) => {

    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
};


// Admin Auth
const isAdmin = async (req, res, next) => {
  try {
      // const email = "admin@admin.com";
    const email = req.body.email;
    
      const user = await userModel.findOne({email });
     
      console.log(user.designation);
      if (user.designation == 1) {
        next();
        console.log("Success")
      } else {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
};

const isMyAdmin=async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.designation !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error,
      message: "Error in admin middelware"+error,
    });
  }
};

module.exports = { requireSignIn, isAdmin,isMyAdmin };