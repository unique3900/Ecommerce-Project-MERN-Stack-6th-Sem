const { hashPassword } = require('../logic/authLogic');
const User = require('../models/userModel');

const registerController = async (req, res) => {
    const { name, email, address, password, phone } = req.body;
    if (!name) {
        res.json({ message: "Name is Required" });
    }
    if (!email) {
        res.json({ message: "Email is Required" });
    }
    if (!address) {
        res.json({ message: "Address is Required" });
    }
    if (!password) {
        res.json({ message: "Password is Required" });
    }
    if (!phone) {
        res.json({ message: "Phone is Required" });
    }

    // DO user Exists
    const userExist = await User.find({ email , phone });
    if (userExist) {
        res.json({ message: "User Already Signed Up with this email or phone,Please login" });
    }
    else {
        const hashedPassword = await hashPassword(password);
        const user = await new User({ name, email, password: hashedPassword, address, phone }).save();
        if (user) {
            console.log(user);
            res.json({ message: "User Added Successfully" });
       }
        
    }
    

}

module.exports = registerController;