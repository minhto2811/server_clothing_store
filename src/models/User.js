const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    numberphone: { type: String },
    role: { type: Boolean },
    email: { type: String, require: false },
    image: { type: String, require: false },
    sex: { type: Boolean, require: false },
    date: { type: String, require: false },
    tokenNotify: { type: String, require: false },
    resetToken: { type: String, require: false },
    resetTokenExpiration: { type: Date, require: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "users"
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);