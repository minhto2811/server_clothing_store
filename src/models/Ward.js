const mongoose = require('mongoose');

const Ward = new mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    slug: { type: String, require: true },
    name_with_type: { type: String, require: true },
    path: { type: String, require: true },
    path_with_type: { type: String, require: true },
    code: { type: String, require: true },
    parent_code: { type: String, require: true },

}, {
    collection: "wards"
});

module.exports = mongoose.model('Ward', Ward);