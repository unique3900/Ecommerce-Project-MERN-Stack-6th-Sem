const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        price: Number,
        unique: true,
        
    },
    slug: {
        type: String,
        lowercase:true
    }
})

module.exports = mongoose.model('Category', CategorySchema);