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
        Cart.find({ id_user: id_user })
            .then(arr => {
                const promises = arr.map(item => {
                    return Product.findOne({ _id: item.id_product });
                });
    
                return Promise.all(promises)
                    .then(products => {
                        products.forEach((product, index) => {
                            arr[index].image = product.image[0];
                            arr[index].name_product = product.name;
                            arr[index].price_product = product.price;
                            arr[index].sale_product = product.sale;
                        });
    
                        return arr;
                    });
            })
            .then(arr => {
                console.log(arr);
                res.json(arr);
            })
            .catch(err => res.json(err));
    }
    

}





module.exports = new ApiController;