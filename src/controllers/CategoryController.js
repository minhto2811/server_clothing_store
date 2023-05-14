const { json } = require('body-parser');
const Category = require('../models/Category');

const { convertleObject } = require('../utils/convertObj');



class CategoryController {
    home(req, res, next) {
        Category.find({})
            .then(nvs => {
                res.render('home-category', { layout: 'main', users: convertleObject(nvs) });
            })
            .catch(next);
    }

    add(req, res, next) {
        res.render('add-category', { layout: 'main' });
    }

    store(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.filename}`;
        Category.create(object).then((nv) => res.redirect('home'))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        Category.deleteOne({ _id: req.params._id })
            .then(() => res.redirect('/Category/home'))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }

    search(req, res, next) {
        const query = req.body.name;
        Category.find({ name: query })
            .then(nv => {
                if (nv.length === 0) {
                    res.redirect('/Category/home');
                } else {
                    res.render('home-category', { layout: 'main', users: convertleObject(nv), valueSearch: query });
                }
            }).catch(next);

    }



    update(req, res, next) {
        const formData = req.body;
        const id = req.params._id;
        console.log("update: ", id);
        console.log("update: ", formData);
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.filename}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        Category.updateOne({ _id: id }, formData)
            .then(() => {
                res.redirect('/Category/home');
            })
            .catch(err => res.json(err));
    }



    async info(req, res, next) {
        const id = req.params._id;
        try {
            const user = await Category.findById(id).exec();
            if (user) {
                res.render('info-category', { layout: 'main', nv: convertleObject(user) });
            } else {
                res.redirect('/home');
            }

        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }






}





module.exports = new CategoryController;