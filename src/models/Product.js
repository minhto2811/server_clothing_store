const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: Array, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    status: { type: String, require: true },
    sold: { type: Number, require: true },
    event: { type: String,  },
    sale: { type: Number,  },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "products"
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);