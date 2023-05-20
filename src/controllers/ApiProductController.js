const Product = require('../models/Product');

const { convertleObject } = require('../utils/convertObj');



class ApiController {
    home(req, res, next) {
        Product.find({})
            .then(nvs => {
                res.json(nvs)
            })
            .catch(err => res.json(err));
    }

    category(req, res, next) {
        console.log(req.params.category);
        Product.find({ category: req.params.category })
            .then(nvs => {
                res.json(nvs)
            })
            .catch(err => res.json(err));
    }

    event(req, res, next) {
        console.log(req.params.event);
        Product.find({ event: req.params.event })
            .then(nvs => {
                res.json(nvs)
            })
            .catch(err => res.json(err));
    }

    
    related(req, res, next) {
        Product.find({ category: req.params.category }).limit(15)
            .then(nvs => {
                res.json(nvs)
            })
            .catch(err => res.json(err));
    }




    store(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.originalname}`;
        Product.create(object).then((nv) => res.json(nv))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        Product.deleteOne({ _id: req.params._id })
            .then(() => res.json({ err: "Xoa thanh cong" }))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }

    search(req, res, next) {
        const query = req.body.name;
        Product.find({ name: query })
            .then(nv => {
                if (nv.length === 0) {
                    res.json({ msg: "nhan vien khong ton tai" })
                } else {
                    res.json(nv)
                }
            }).catch(err => res.json(err));

    }



    update(req, res, next) {
        const formData = req.body;
        const id = req.params._id;
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.originalname}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        Product.updateOne({ _id: id }, formData)
            .then(() => {
                res.json({ msg: "update thanh cong" })
            })
            .catch(err => res.json(err));
    }



    async info(req, res, next) {
        const id = req.params._id;
        try {
            const user = await Product.findById(id).exec();
            res.json(user)
        } catch (err) {
            console.error(err);
            res.json(err)
        }
    }



}





module.exports = new ApiController;