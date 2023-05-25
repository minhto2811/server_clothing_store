const mongoose = require('mongoose');

const Favourite = new mongoose.Schema({
    id_user:{ type: String, require:true, unique:true},
    list_id_product: { type: Array},
}, {
    collection: "favourites"
});

module.exports = mongoose.model('Favourite', Favourite);