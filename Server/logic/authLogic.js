const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        res.json("Error in password Hashing");
    }
}
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(hashedPassword, password);
}

module.exports = { hashPassword, comparePassword };