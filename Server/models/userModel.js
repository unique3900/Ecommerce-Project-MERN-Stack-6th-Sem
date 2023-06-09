const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    secretKey: {
        type: Number,
        default: 2222,
        
    },
    status: {
        type: Boolean,
        default:false,
    },
    gender: {
        type: JSON,
        required: true,
    },
    designation: {
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true });


module.exports = mongoose.model("users", userSchema);