const bnRoute = require('./Banner.route');
const prdRoute = require('./Product.route');
const cateRoute = require('./Category.route');

//api
const apiPrdRoute = require('./Api.products.route');
const apiBnRoute = require('./Api.banners.route');
const apiCateRoute = require('./Api.categorys.route');


function route(app) {
    app.use('/api/product', apiPrdRoute);
    app.use('/api/banner', apiBnRoute);
    app.use('/api/category', apiCateRoute);


    app.use('/product', prdRoute);
    app.use('/banner', bnRoute);
    app.use('/category', cateRoute);
}

module.exports = route;