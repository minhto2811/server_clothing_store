const session = require('express-session');
const User = require('../models/User');
const { convertleObject } = require('../utils/convertObj');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;
var jwt = require('jsonwebtoken')


class SiteController {

    signIn(req, res) {
        res.render('sign-in', { layout: 'main' });
    }
    forgotPassword(req, res) {
        res.render('forgot-password', { layout: 'main' });
    }
    register(req, res) {
        res.render('register', { layout: 'home' });
    }

    async registercheckout(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.originalname}`;
        object.type = 1;
        try {
            await bcrypt.hash(object.password, 15, function (err, hash) {
                object.password = hash;
                const user = new User(object);
                user.save().then(() => res.redirect('/sign-in'))
                    .catch(next);
            });
        } catch (error) {
            res.send(error);
        }



    }


    async checkOut(req, res, next) {
        const user = req.body.username;
        const pass = req.body.password;
        User.findOne({ username: user }).then(
            (user) => {
                if (!user) {
                    res.render('sign-in', { layout: 'main', err: "Tài khoản hoặc mật khẩu không chính xác!", username: req.body.username, password: req.body.password });
                } else {
                    if (pass == jwt.verify(user.password, SECRET) && user.role) {
                        req.session.user = user;
                        res.redirect('/product/home')

                    } else {
                        res.render('sign-in', { layout: 'main', err: "Tài khoản hoặc mật khẩu không chính xác!", username: req.body.username, password: req.body.password });
                    }
                }
            }
        )
    }


    home(req, res, next) {
        Product.find({})
            .then(products => {
                const userM = req.session.user;
                var type_eq_0 = userM ? (userM.type == 0) : false;
                res.render('home', { layout: 'home', userM, type_eq_0, products: convertleObject(products) });
            })
            .catch(next);
    }

    logOut(req, res, next) {
        if (req.session.user != null) {
            req.session.user = null;
            req.session.destroy();
        }
        res.redirect('/sign-in');
    }

}

module.exports = new SiteController;