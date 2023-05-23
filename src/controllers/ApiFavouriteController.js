const Favourite = require('../models/Favourite');
const { convertleObject } = require('../utils/convertObj');

class ApiController {
   
    getAll(req, res, next) {
        console.log("getAll ")
        Favourite.findOne({ id_user: req.params.id_user })
            .then(nvs => {
                console.log("Favourite ", nvs.list_id_product)
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
                    console.log(req.body.id_product);
                    console.log(nvs.list_id_product);
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

    delete(req, res, next) {
        console.log(req.params._id);
        Favourite.deleteOne({ _id: req.params._id })
            .then(() => res.json({ err: "Xoa thanh cong" }))
            .catch(() => res.json({ err: "Xoa that bai" }));
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



    update(req, res, next) {
        Favourite.findOne({ Favouritename: req.params.Favouritename }).then(Favourite => {
            if (req.file !== undefined && req.file !== null) {
                Favourite.image = `/image/${req.file.filename}`;
            }
            Favourite.updateOne({ _id: Favourite._id }, Favourite)
                .then(res.json(Favourite))
                .catch(err => res.json(err));
        }
        ).catch(err => res.json(err))


    }



    async info(req, res, next) {
        const token = req.body.token;
        console.log(token)
        try {
            const decoded = await jwt.verify(token, SECRET);
            console.log(decoded)
            Favourite.findOne({ Favouritename: decoded.Favouritename })
                .then(nvs => {
                    if (nvs.password == decoded.password) {
                        res.json(nvs);
                    }
                    else {
                        res.json(null);
                    }
                })
                .catch(err => res.json(err));
        } catch (error) {
            res.json(error)
        }

    }

}





module.exports = new ApiController;