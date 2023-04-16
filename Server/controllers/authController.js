const { hashPassword, comparePassword } = require('../helpers/authLogic');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');
const userModel = require('../models/userModel');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const userOTPVerificationModel = require('../models/OtpModel');


const registerController = async (req, res) => {
    const { name, email, address, password, phone,gender,securityQuestion } = req.body;
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
    if (!securityQuestion) {
        res.json({success:false, message: "Security Question is Required" });
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
            const user = await new User({ name, email, password: hashedPassword, address, phone,gender,securityQuestion}).save();
            if (user) {
                console.log(user);
                res.json({ success:true,message: "User Registration Successful" });
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
                            name: user.name,
                            email: user.email,
                            address: user.address,
                            gender: user.gender,
                            phone:user.phone
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


// =========== FORGOT PASSWORD ====================
const forgotPasswordController = async (req, res) => {
    try {
        const { email, OTP, password } = req.body;
        if (!email || !OTP || !password) {
            res.status(400).json({message:"Please Enter Every Field"})
        }
        else {
            const userExist = await User.findOne({ email });
            if (userExist) {
                const hashedPassword = await hashPassword(password);
                if (OTP == process.env.OTP) {
                   const pwdUpdate= await userModel.findByIdAndUpdate(userExist._id, { password: hashedPassword });
                    if (pwdUpdate) {
                        res.json({ message: "OTP Verified,Password Updated", newpassword: password, hashed: hashedPassword });
                      
                   }
                }
                else {
                    res.json({message:"OTP Doesnot Match"})
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error Occures" });
        console.log(error)
    }
}




module.exports = {
    registerController, 
    loginController,
    forgotPasswordController
    // anotherMethod
};

