const { json } = require('body-parser');
const Banner = require('../models/Banner');

const { convertleObject } = require('../utils/convertObj');



class BannerController {
    home(req, res, next) {
        Banner.find({})
            .then(nvs => {
                res.render('home-banner', { layout: 'main', users: convertleObject(nvs) });
            })
            .catch(next);
    }

    add(req, res, next) {
        res.render('add-banner', { layout: 'main' });
    }

    store(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.filename}`;
        Banner.create(object).then((nv) => res.redirect('home'))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        Banner.deleteOne({ _id: req.params._id })
            .then(() => res.redirect('/banner/home'))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }




    update(req, res, next) {
        const formData = req.body;
        const id = req.params._id;
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.filename}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        Banner.updateOne({ _id: id }, formData)
            .then(() => {
                res.redirect('/banner/home');
            })
            .catch(err => res.json(err));
    }



    async info(req, res, next) {
        const id = req.params._id;
        try {
            const user = await Banner.findById(id).exec();
            if (user) {
                res.render('info-banner', { layout: 'main', nv: convertleObject(user) });
            } else {
                res.redirect('home');
            }

        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }
}


module.exports = new BannerController;