const mongoose = require('mongoose');

const Banner = new mongoose.Schema({

    image: { type: String, require: true },
    event: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "banners"
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', Banner);