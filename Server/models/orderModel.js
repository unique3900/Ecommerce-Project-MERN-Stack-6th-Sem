const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "Product",
        }
    ],
    payment: {
        
  },
  paidAmount: {
    type: Number,
    ref: "Product",
  },
  discountPercentage: {
    type: Number,
    default:0,
  },
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
        
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Order', OrderSchema);