const mongoose = require('mongoose');

const Category = new mongoose.Schema({

    image: { type: String, require: true },
    name: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "categorys"
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', Category);