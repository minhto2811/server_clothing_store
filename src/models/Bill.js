const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Bill = new mongoose.Schema({
    id_user: { type: String, require: true },
    name: { type: String, require: true },
    phone: { type: String, require: true },
    total:{ type: Number, require: true },
    date:{ type: Date, default: Date.now },
    status:{ type: Number, require: true },
    list: [Object],
    address:{ type: String, require: true },
    methodShipping:{ type: String, require: true },
    methodPayment:{ type: String, require: true },
}, {
    collection: "bills"
});

module.exports = mongoose.model('Bill', Bill);