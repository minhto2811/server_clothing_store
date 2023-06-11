const mongoose = require('mongoose');

const Status = new mongoose.Schema({
    status: { type: String, require: true,unique:true },
}, {
    collection: "status"
});

module.exports = mongoose.model('Status', Status);