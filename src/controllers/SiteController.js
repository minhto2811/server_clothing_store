const session = require('express-session');
const User = require('../models/User');
const Bill = require('../models/Bill');
const { convertleObject } = require('../utils/convertObj');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;
var jwt = require('jsonwebtoken');
const { use } = require('../routes/Banner.route');


class SiteController {

    signIn(req, res) {
        if (req.session.user != null && req.session.user.role) {
            res.redirect('/product/home');
        } else {
            res.render('sign-in', { layout: 'main' });
        }
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

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/user/sign-in');
    }
    settings(req, res, next) {
        res.render('user', { layout: 'main', nv: req.session.user });
    }


    update(req, res, next) {
        const user = req.session.user;
        user.fullname = req.body.fullname;
        user.numberphone = req.body.numberphone;
        user.email = req.body.email;
        if (req.file || req.files) {
            user.image = `/image/${req.file.filename}`;
        }
        User.findOneAndUpdate({ _id: user._id }, user).then(() => {
            req.session.user = user;
            res.redirect('/user/settings')
        })
            .catch(err => res.json(err));
    }

    password(req, res, next) {
        res.render('password', { layout: 'main' });
    }

    changePassword(req, res, next) {
        const passOld = jwt.sign(req.body.oldPassword, SECRET);
        const passNew = jwt.sign(req.body.newPassword, SECRET);
        const id = req.session.user._id;
        User.findOne({ _id: id, password: passOld })
            .then((user) => {
                if (!user) {
                    res.render('password', { layout: 'main', err: 'Mật khẩu cũ không chính xác' });
                } else {
                    user.password = passNew;
                    user.save().then(() => {
                        req.session.user = user;
                        res.render('password', { layout: 'main', msg: 'Thay đổi mật khẩu thành công' });
                    }).catch(err => res.json(err));
                }
            })
            .catch(err => res.json(err));
    }

    statistical(req, res, next) {
        res.render('statistical', { layout: 'main' });
    }

    getStatistical(req, res, next) {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()-1);
        const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);

        if (startDate.getTime() > endDate.getTime()) {
            res.render('statistical', { layout: 'main', err: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc' });
        } else {
            Bill.find({
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                },status:3
            }).then((bill) => {
                let totalSum = 0;
                for (let i = 0; i < bill.length; i++) {
                    totalSum += bill[i].total;
                }

                res.render('statistical', { layout: 'main', totalSum, start: req.body.startDate, end: req.body.endDate });
            }).catch(err => res.json(err));
        }
    }


}

module.exports = new SiteController;