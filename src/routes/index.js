

const bnRoute = require('./Banner.route');
const prdRoute = require('./Product.route');
const cateRoute = require('./Category.route');
const errRoute = require('./Error.route');
const billRoute = require('./Bill.route');
const siteRoute = require('./site.route');

//api
const apiPrdRoute = require('./Api.products.route');
const apiBnRoute = require('./Api.banners.route');
const apiCateRoute = require('./Api.categorys.route');
const apiUserRoute = require('./Api.users.route');
const apiFavRoute = require('./Api.favourites.route');
const apiAddrRoute = require('./Api.address.route');
const apicartRoute = require('./Api.cart.route');
const apibillRoute = require('./Api.bill.route');
const apirecRoute = require('./Api.recently.route');
const apinotRoute = require('./Api.notify.route');


function route(app) {
    app.use('/api/product', apiPrdRoute);
    app.use('/api/banner', apiBnRoute);
    app.use('/api/category', apiCateRoute);
    app.use('/api/user', apiUserRoute);
    app.use('/api/favourites', apiFavRoute);
    app.use('/api/address', apiAddrRoute);
    app.use('/api/cart', apicartRoute);
    app.use('/api/bill', apibillRoute);
    app.use('/api/recently', apirecRoute);
    app.use('/api/notify', apinotRoute);




    app.use('/product', prdRoute);
    app.use('/banner', bnRoute);
    app.use('/category', cateRoute);
    app.use('/bill', billRoute);
    app.use('/user', siteRoute);

    // app.use("",errRoute);

}

module.exports = route;