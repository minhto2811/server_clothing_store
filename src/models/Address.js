const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    id_user: { type: String, require: true },
    fullname: { type: String, require: true },
    numberphone: { type: String, require: true },
    province: { type: String, require: true },
    district:{ type: String, require: true },
    wards:{ type: String, require: true },
    address:{ type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "address"
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', Address);