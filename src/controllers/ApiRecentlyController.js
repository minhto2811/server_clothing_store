
const Recently = require('../models/Recently');
const Product = require('../models/Product');
const { convertleObject } = require('../utils/convertObj');

class ApiController {
    add(req, res, next) {
        const id_user = req.params.id_user;
        const id_product = req.body.id_product;
        Recently.findOne({ id_user: id_user })
            .then((rec) => {
                if (rec) {
                    var index = rec.list_id_product.indexOf(id_product);
                    if (index !== -1) {
                        res.json(0);
                    } else {
                        rec.list_id_product = rec.list_id_product.concat(id_product);
                        rec.save();
                        res.json(1);
                    }
                } else {
                    Recently.create({ id_user: id_user, list_id_product: id_product }).then(() => res.json(1)).catch(err => res.json(err));
                }
            })
            .catch(err => res.json(err));
    }



    delete(req, res, next) {
        const id_user = req.params.id_user;
        const id_product = req.body.id_product;
        Recently.findOne({ id_user: id_user })
            .then((rec) => {
                rec.list_id_product = rec.list_id_product.filter(item => item !== id_product);
                rec.save();
                res.json(1);
            }).catch(err => res.json(err))
    }






    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Recently.findOne({ id_user: id_user })
            .then((rec) => {
                if (rec) {
                    if (rec.list_id_product.length > 0) {
                        Product.find({ _id: { $in: rec.list_id_product } }).then((prd) => {
                            res.json(prd);
                        }).catch(err => res.json(err))
                    } else {
                        res.json(null);
                    }
                } else {
                    res.json(null);
                }
            })
            .catch(err => console.log(null));
    }


}





module.exports = new ApiController;