

const bnRoute = require('./Banner.route');
const prdRoute = require('./Product.route');
const cateRoute = require('./Category.route');
const errRoute = require('./Error.route');

//api
const apiPrdRoute = require('./Api.products.route');
const apiBnRoute = require('./Api.banners.route');
const apiCateRoute = require('./Api.categorys.route');
const apiUserRoute = require('./Api.users.route');
const apiFavRoute = require('./Api.favourites.route');

function route(app) {
    app.use('/api/product', apiPrdRoute);
    app.use('/api/banner', apiBnRoute);
    app.use('/api/category', apiCateRoute);
    app.use('/api/user', apiUserRoute);
    app.use('/api/favourites', apiFavRoute);


    app.use('/product', prdRoute);
    app.use('/banner', bnRoute);
    app.use('/category', cateRoute);

    app.use("",errRoute);

}

module.exports = route;