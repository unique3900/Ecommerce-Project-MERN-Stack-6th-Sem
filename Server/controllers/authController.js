const { hashPassword, comparePassword } = require('../helpers/authLogic');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const userModel = require('../models/userModel');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const userOTPVerificationModel = require('../models/OtpModel');
const orderModel = require('../models/orderModel');


const registerController = async (req, res) => {
    const { name, email, address, password, phone,gender } = req.body;
    if (!name) {
        res.json({success:false, message: "Name is Required" });
    }
    if (!email) {
        res.json({success:false, message: "Email is Required" });
    }
    if (!address) {
        res.json({success:false, message: "Address is Required" });
    }
    if (!password) {
        res.json({success:false, message: "Password is Required" });
    }
    if (!phone) {
        res.json({success:false, message: "Phone is Required" });
    }

    if (!gender) {
        res.json({success:false, message: "Gender is Required" });
    }

    // DO user Exists

    try {
        const userExist = await User.findOne({ email, phone });
    
        if (userExist) {
            res.json({success:false, message: "User Already Signed Up with this email or phone,Please login" });
        }
        else {
            const hashedPassword = await hashPassword(password);
            const user = await new User({ name, email, password: hashedPassword, address, phone,gender}).save();
            if (user) {
                console.log(user);
                res.json({ success: true, message: "User Registration Successful" });
           }
            
        }
    } catch (error) {
        res.json({ success:false,message: "Error Processing Request,User With this email or phone already exists"+error });
    }
   
    

}


//======================== Login Controller=======================
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.json({ message: "Enter a valid email or password" });

        }
        else {
            const user = await User.findOne({ email });
            if (!user) {
                res.json({
                    success: false,
                    message:"User Not Found"
                })
            }
            else {
                const matchPassword = await comparePassword(password, user.password);
                if (!matchPassword) {
                    res.json({
                        success: false,
                        message:"Incorrect Password!"
                    })
                }
                else {
                    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
                    res.json({
                        success:true,
                        message: "User Logged in Successfully",
                        user: {
                            _id:user._id,
                            name: user.name,
                            email: user.email,
                            address: user.address,
                            gender: user.gender,
                            phone: user.phone,
                            designation:user.designation
                        },

                        token
                    });
                }
            }
        }
    } catch (error) {
        res.json({ message: "Problem Executing Login Function! Try Again" });
    }
}


// ============ Change Password ================

const changePasswordController = async (req, res) => {
    const { email, password,otp } = req.body;
    try {
        
        const userExist = await User.findOne({ email });
        if (userExist) {
            const hashednewPassword = await hashPassword(password);

            if (otp == userExist.secretKey) {
                const pwdUpdate = await userModel.findByIdAndUpdate(userExist._id, { password: hashednewPassword });
                if (pwdUpdate) {
                    res.json({ success: true, message: "Password Changed" });
                }
                
            }
            else {
                res.json({ success: false, message: "Invalid OTP" });
                
            }
            
        }
        else {
            res.json({ success: false, message: "User Doesnot Exist" });
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server error"+error });
    }
   
}

// =========== FORGOT PASSWORD ====================
const forgotPasswordController = async (req, res) => {
   try {
       const { email, password, otp } = req.body;
       const userExist = await User.findOne({ email });
       if (userExist) {
           const userOTP = userExist.secretKey;
           const hashedPassword=await hashPassword(password);
           if (otp == userOTP) {
               const pwdUpdate = await userModel.findByIdAndUpdate(userExist._id, { password: hashedPassword });
               if (pwdUpdate) {
                res.json({ success: true, message: "Password Updated" });
               }
           } else {
            res.json({ success: false, message: "Invalid OTP" });
           }
       } else {
           res.json({ success: false, message: "User Doesnot Exist" });
       }
   } catch (error) {
    res.json({  success: false,message: "SMTP Server Error,Couldnot send OTP"+error });
   }
}



const isAdmins = async (req, res, next) => {
    try {
    //   const email = "admin@admin.com";
      const {email} = req.body;
      const user = await userModel.findOne({email });

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


       
 



const verificationController = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            const secretKey =  Math.floor(1000 + Math.random() * 9000) ;
            const otpUpdate = await userModel.findByIdAndUpdate(userExist._id, { secretKey: secretKey });
            const mailAction = sendEmail(name, email, secretKey);
            if (mailAction) {
                res.json({ success: true, message: "OTP sent to your Email" });
            }
        }
        else {
            res.json({ success: false, message: "User Doesnot Exist" });
        }
    
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error,Couldnot send OTP"+error });
    }
}

const sendEmail=async (name,email,secretKey)=> {
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lorenza.davis@ethereal.email',
        pass: 'xz3n6udewEubQuecn9'
    }
  });
    
  const info = {
    from: process.env.OTP_Email, // sender address
    to:email, // list of receivers
    subject: "Your Secret key", // Subject line
    html: `<p>Hello ${name}: your secret key is <b>${secretKey}</b> use this when you need to recover the account </p>`, // html body
  };
    
    const mailsent = await transporter.sendMail(info).then(() => {
        console.log("Your Secret Key is Sent to your Email")
    }).catch((e) => {
   
        console.log("Couldnot send you secret key" )
  });
    if (mailsent) {
        res.json({  success: true,message: "OTP sent to your email" });
  }

}

const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({success:true,message:"User Fetched Successfullt",user});
    } catch (error) {
        console.log("Couldnot send user Data" + error);
    }
}

const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address,phone,gender,email } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email, address, gender, phone })
        if (user) {
            res.json({success:true,message:"User Updated Successfully",user});
        }
        
    } catch (error) {
        console.log("Couldnot send user Data" + error);
    }
}


const getOrderController = async (req, res) => {
    try {
        
        const orders = await orderModel.find({ buyer: req.user._id }).populate('products', '-image').populate('buyer', 'name');

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
    }
}
const getAllOrderController = async (req, res) => {
    try {
        
        const orders = await orderModel.find({ }).populate('products', '-image').populate('buyer', 'name');

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerController, 
    loginController,
    forgotPasswordController,verificationController,changePasswordController,isAdmins,getUserByIdController
,updateUserController,getOrderController ,getAllOrderController   // anotherMethod
};