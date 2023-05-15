const Category = require('../models/Category');

const { convertleObject } = require('../utils/convertObj');



class ApiController {
    home(req, res, next) {
        Category.find({})
            .then(nvs => {
                res.json(nvs)
            })
            .catch(err => res.json(err));
    }



    store(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.filename}`;
        Category.create(object).then((nv) => res.json(nv))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        Category.deleteOne({ _id: req.params._id })
            .then(() => res.json({ err: "Xoa thanh cong" }))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }

    search(req, res, next) {
        const query = req.body.name;
        Category.find({ name: query })
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
        console.log("update: ", id);
        console.log("formData: ", formData);
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.filename}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        Category.updateOne({ _id: id }, formData)
            .then(() => {
                res.json({ msg: "update thanh cong" })
            })
            .catch(err => res.json(err));
    }



    async info(req, res, next) {
        const id = req.params._id;
        try {
            const user = await Category.findById(id).exec();
            res.json(user)
        } catch (err) {
            console.error(err);
            res.json(err)
        }
    }






}





module.exports = new ApiController;