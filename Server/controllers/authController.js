const { hashPassword, comparePassword } = require('../helpers/authLogic');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

const registerController = async (req, res) => {
    const { name, email, address, password, phone } = req.body;
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

    // DO user Exists

    try {
        const userExist = await User.findOne({ email, phone });
    
        if (userExist) {
            res.json({success:false, message: "User Already Signed Up with this email or phone,Please login" });
        }
        else {
            const hashedPassword = await hashPassword(password);
            const user = await new User({ name, email, password: hashedPassword, address, phone }).save();
            if (user) {
                console.log(user);
                res.json({ success:true,message: "User Registration Successful" });
           }
            
        }
    } catch (error) {
        res.json({ success:false,message: "Error Processing Request,User With this email or phone already exists" });
    }
   
    

}


// Login COntroller
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
                            address:user.address
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
module.exports = {
    registerController, 
    loginController,
    // anotherMethod
};

