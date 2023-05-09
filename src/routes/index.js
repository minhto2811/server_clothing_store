const bnRoute = require('./Banner.route');
const prdRoute = require('./Product.route');
const cateRoute = require('./Category.route');
require('dotenv').config();
//api
const apiPrdRoute = require('./Api.products.route');
const apiBnRoute = require('./Api.banners.route');
const apiCateRoute = require('./Api.categorys.route');
const apiUserRoute = require('./Api.users.route');
const apiUrl = process.env.API_URL;

function route(app) {
    app.use('/api/product', apiPrdRoute);
    app.use('/api/banner', apiBnRoute);
    app.use('/api/category', apiCateRoute);
    app.use('/api/user', apiUserRoute);


    app.use('/product', prdRoute);
    app.use('/banner', bnRoute);
    app.use('/category', cateRoute);
}

module.exports = route;