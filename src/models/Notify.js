const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Notify = new mongoose.Schema({
    id_user: { type: String, require: true },
    id_bill: { type: String, require: true,unique:true },
    time: { type: Date, default: Date.now },
    status:{ type: Number, require: true },

}, {
    collection: "notifys"
});

module.exports = mongoose.model('Notify', Notify);