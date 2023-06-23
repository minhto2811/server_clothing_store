const { json } = require('body-parser');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Banner = require('../models/Banner');

const { convertleObject } = require('../utils/convertObj');


const dataS = ['Còn hàng','Hết hàng','Dừng bán'];
const dataC = [];
const dataB = ["Trống"];


Banner.find({})
    .then(banners => {
        for (let index = 0; index < convertleObject(banners).length; index++) {
            dataB.push(convertleObject(banners)[index].event);
        }
    })
    .catch(err => console.log(err));



Category.find({})
    .then(products => {
        for (let index = 0; index < convertleObject(products).length; index++) {
            dataC.push(convertleObject(products)[index].name);
        }
    })
    .catch(err => console.log(err));



class ProductController {
    home(req, res, next) {
        Product.find({})
            .then(nvs => {
                res.render('home', { layout: 'main', users: convertleObject(nvs) });
            })
            .catch(next);
    }

    add(req, res, next) {
        const selectedOption = dataS.reduce(
            (acc, option) => ({
                ...acc,
                [option]: option === 'Còn hàng',
            }),
            {}
        );

        const selectedOptionCategory = dataC.reduce(
            (acc, option) => ({
                ...acc,
                [option]: option === 'Áo',
            }),
            {}
        );

        const selectedOptionEvent = dataB.reduce(
            (acc, option) => ({
                ...acc,
                [option]: option === "Trống",
            }),
            {}
        );
        res.render('add', { layout: 'main', selectedOption, selectedOptionCategory,selectedOptionEvent });
    }

    store(req, res, next) {
        var object = req.body;
        object.image = req.files.map(file => `/image/${file.filename}`);
        object.price = parseFloat(req.body.price);
        object.sale = parseInt(req.body.sale);
        object.sold = 0;
        Product.create(object).then((nv) => res.redirect('home'))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        Product.deleteOne({ _id: req.params._id })
            .then(() => res.redirect('/product/home'))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }

    search(req, res, next) {
        const query = req.body.name;
        Product.find({ name: query })
            .then(nv => {
                if (nv.length === 0) {
                    res.redirect('/product/home');
                } else {
                    res.render('home', { layout: 'main', users: convertleObject(nv), valueSearch: query });
                }
            }).catch(next);

    }



    update(req, res, next) {
        const formData = req.body;
        const id = req.params._id;
        const arr = req.files.map(file => `/image/${file.filename}`);
        const io = formData.old.split(",");
        const result = io.map((item) => item.trim());
        formData.image = result.concat(arr);
        formData.sale = parseInt(req.body.sale);
        delete formData.old;
        console.log(formData);
        Product.updateOne({ _id: id }, formData)
            .then(() => {
                res.redirect('/product/home');
            })
            .catch(err => res.json(err));
    }



    async info(req, res, next) {
        const id = req.params._id;
        try {
            const user = await Product.findById(id).exec();
            if (user) {
                const selectedOption = dataS.reduce(
                    (acc, option) => ({
                        ...acc,
                        [option]: option === user.status,
                    }),
                    {}
                );

                const selectedOptionCategory = dataC.reduce(
                    (acc, option) => ({
                        ...acc,
                        [option]: option === user.category,
                    }),
                    {}
                );

                const selectedOptionEvent = dataB.reduce(
                    (acc, option) => ({
                        ...acc,
                        [option]: option === user.event,
                    }),
                    {}
                );
                const nv = convertleObject(user);
                const avatar = nv.image[0];
                res.render('info', { layout: 'main', nv, selectedOption, selectedOptionCategory, avatar ,selectedOptionEvent});
            } else {
                res.redirect('/home');
            }

        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }






}





module.exports = new ProductController;