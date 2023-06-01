const mongoose = require('mongoose');


const Cart = new mongoose.Schema({
    id_user: { type: String, require: true },
    id_product: { type: String, require: true },
    image: { type: String },
    name_product: { type: String },
    price_product:{ type: Number},
    sale_product:{ type: Number},
    quantity:{ type: Number, require: true },
}, {
    collection: "carts"
});

module.exports = mongoose.model('Cart', Cart);