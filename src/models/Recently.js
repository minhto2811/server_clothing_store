const mongoose = require('mongoose');


const Recently = new mongoose.Schema({
    id_user: { type: String, require: true, unique: true },
    list_id_product: { type: Array, require: true },
}, {
    collection: "recentlys"
});

module.exports = mongoose.model('Recently', Recently);