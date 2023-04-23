const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

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
    const email = "admin@admin.com";
    const user = await userModel.findOne({ email });
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

module.exports = { requireSignIn, isAdmin };

