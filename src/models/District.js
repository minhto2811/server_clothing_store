const mongoose = require('mongoose');

const District = new mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    slug: { type: String, require: true },
    name_with_type: { type: String, require: true },
    path: { type: String, require: true },
    path_with_type: { type: String, require: true },
    code: { type: String, require: true },
    parent_code: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "districts"
}, {
    timestamps: true
});

module.exports = mongoose.model('District', District);