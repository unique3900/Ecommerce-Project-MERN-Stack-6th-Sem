const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOTPVerificationSchema = new Schema({
    email: String,
    otp: String,
    createdAt: Date,
    expiresAt:Date
})

const userOTPVerificationModel = mongoose.model("userOTPVerification", userOTPVerificationSchema);

module.exports = userOTPVerificationModel;