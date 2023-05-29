const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    id_user: { type: String, require: true },
    id_product: { type: String, require: true },
    quantity:{ type: Number, require: true },
}, {
    collection: "carts"
});

module.exports = mongoose.model('Cart', Cart);