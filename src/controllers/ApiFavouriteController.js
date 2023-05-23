const Favourite = require('../models/Favourite');
const { convertleObject } = require('../utils/convertObj');
const Product = require('../models/Product');
class ApiController {

    getAll(req, res, next) {
        Favourite.findOne({ id_user: req.params.id_user })
            .then(nvs => {
                res.json(nvs.list_id_product);
            })
            .catch(err => res.json(err));
    }



    add(req, res, next) {

        Favourite.findOne({ id_user: req.params.id_user })
            .then(nvs => {
                if (nvs === null || nvs === undefined) {
                    Favourite.create({ id_user: req.params.id_user, list_id_product: req.body.id_product })
                        .then((nv) => res.json(nv))
                        .catch((err) => {
                            res.json(err);
                        });
                } else {
                    const a = nvs.list_id_product.concat(req.body.id_product)
                    Favourite.updateOne({ id_user: req.params.id_user }, { id_user: req.params.id_user, list_id_product: a }).then(
                        nv => res.json({ id_user: req.params.id_user, list_id_product: a })
                    ).catch(
                        err => res.json(err)
                    );

                }
            })
            .catch(err => res.json(err));

    }

    update(req, res, next) {
        console.log(req.params.id_user);
        console.log(req.body.id_product);
        Favourite.findOne({ id_user: req.params.id_user })
            .then(fav => {
                const list = fav.list_id_product.filter(function (element) {
                    return element !== req.body.id_product;
                });;
                Favourite.updateOne({ id_user: req.params.id_user }, { id_user: req.params.id_user, list_id_product: list })
                    .then(
                        nv => res.json({ id_user: req.params.id_user, list_id_product: list })
                    ).catch(
                        err => res.json(err)
                    );

            })
            .catch(err => res.json(err));
    }




    search(req, res, next) {
        const query = req.body.name;
        Favourite.find({ name: query })
            .then(nv => {
                if (nv.length === 0) {
                    res.json({ msg: "nhan vien khong ton tai" })
                } else {
                    res.json(nv)
                }
            }).catch(err => res.json(err));

    }







    info(req, res, next) {
        console.log("info = ", req.params.id_user)
        Favourite.findOne({ id_user: req.params.id_user })
            .then(nvs => {
                console.log(nvs)
                Product.find({ _id: { $in: nvs.list_id_product } })
                    .then((pro) => {
                        console.log(pro)
                        res.json(pro)
                    })
                    .catch(err => {
                        res.json(err)
                    })
            })
            .catch(err => res.json(err));
    }

}





module.exports = new ApiController;