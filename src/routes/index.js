const bnRoute = require('./Banner.route');
const prdRoute = require('./Product.route');
const cateRoute = require('./Category.route');
require('dotenv').config();
//api
const apiPrdRoute = require('./Api.products.route');
const apiBnRoute = require('./Api.banners.route');
const apiCateRoute = require('./Api.categorys.route');
const apiUrl = process.env.API_URL;

function route(app) {
    app.use(apiUrl+'/api/product', apiPrdRoute);
    app.use(apiUrl+'/api/banner', apiBnRoute);
    app.use(apiUrl+'/api/category', apiCateRoute);


    app.use(apiUrl+'/product', prdRoute);
    app.use(apiUrl+'/banner', bnRoute);
    app.use(apiUrl+'/category', cateRoute);
}

module.exports = route;