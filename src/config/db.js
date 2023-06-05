const mongoose = require('mongoose');
require('dotenv').config();
const URI_MONGODB = process.env.URI_MONGODB;

async function connect() {
    try {
        await mongoose.connect(URI_MONGODB, { useNewUrlParser: true,
        useUnifiedTopology: true });
        console.log('kết nối db thành công');
    } catch (error) {
        console.log('kết nối db thất bại');
    }

}

module.exports = { connect };