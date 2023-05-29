const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { convertleObject } = require('../utils/convertObj');

class ApiController {



    addProduct(req, res, next) {
        const cart = new Cart(req.body);
        cart.save().then(cart => res.json(cart)).catch(err => res.json(err));
    }


    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Cart.find({ id_user: id_user }).then(arr => {
            for (let i = 0; i < arr.length; i++) {
                Product.findOne({ _id: arr[i].id_product })
                    .then(product => {
                        arr[i].name_product = product.name;
                        arr[i].price_product = product.price;
                        arr[i].sale_product = product.sale;
                    })
            }
            res.json(arr);
        }).catch(err => res.json(err));
    }


}





module.exports = new ApiController;