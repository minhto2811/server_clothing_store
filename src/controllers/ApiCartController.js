const Cart = require('../models/Cart');
const User = require('../models/User');
const { convertleObject } = require('../utils/convertObj');

class ApiController {



    addProduct(req, res, next) {
        const cart = new Cart(req.body);
        cart.save().then(cart => res.json(cart)).catch(err => res.json(err));
    }

    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Cart.find({ id_user: id_user }).then(arr => res.json(arr)).catch(err => res.json(err));
    }


}





module.exports = new ApiController;