const mongoose = require('mongoose');

const Favourite = new mongoose.Schema({
    id_user:{ type: String, require:true, unique:true},
    list_id_product: { type: Array},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "favourites"
}, {
    timestamps: true
});

module.exports = mongoose.model('Favourite', Favourite);