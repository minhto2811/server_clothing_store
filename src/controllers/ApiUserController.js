const User = require('../models/User');
const { convertleObject } = require('../utils/convertObj');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;
const nodemailer = require('nodemailer');

class ApiController {
    login(req, res, next) {
        console.log("user lay duoc ", req.body)
        User.findOne({ username: req.body.username, password: req.body.password })
            .then(nvs => {
                console.log("user ", nvs)
                res.json(convertleObject(nvs));
            })
            .catch(err => res.json(err));
    }



    store(req, res, next) {
        console.log("tao tai khoan: ", req.body)
        User.findOne({username:req.body.username}).then(u => {
            if (u) {
                return res.json(null);
            }
            var object = req.body;
            object.image = "/image/Default-welcomer-1683621300160.png"
            User.create(object).then((nv) => res.json(nv))
                .catch((err) => {
                    res.json(err);
                });
        }).catch((err) => {
            res.json(err);
        });

    }



    update(req, res, next) {
        User.findOne({ username: req.params.username }).then(user => {
            if (req.file !== undefined && req.file !== null) {
                user.image = `/image/${req.file.filename}`;
            }
            User.updateOne({ _id: user._id }, user)
                .then(res.json(user))
                .catch(err => res.json(err));
        }
        ).catch(err => res.json(err))


    }


    changePass(req, res, next) {
        const filter = { username: req.body.username, password: req.body.password };
        const update = { $set: { password: req.body.passwordnew } };
        console.log(filter);
        console.log(update);
        User.updateOne(filter, update)
            .then(rs => {
                res.json(rs.modifiedCount)
            })
            .catch(err => res.json(err));

    }


    async info(req, res, next) {
        const token = req.body.token;
        console.log(token)
        try {
            const decoded = await jwt.verify(token, SECRET);
            console.log(decoded)
            User.findOne({ username: decoded.username })
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

    updateinfo(req, res, next) {
        console.log(req.body._id)
        console.log(req.body)
        User.updateOne({ _id: req.body._id }, req.body).then((rs) => {
            console.log(rs)
            if (rs.matchedCount === 1 && rs.modifiedCount === 0) {
                res.json(rs.modifiedCount - 1)
            } else {
                res.json(rs.modifiedCount)
            }

        })
            .catch(err => res.json(err));
    }

    forgetpassword(req, res, next) {
        const username = req.params.username;
        console.log(username)
        User.findOne({ username: username }).then(user => {
            console.log(user)
            if (!user) {
                return res.json(0);
            }
            if (user.email.length == 0) {
                return res.json(-1);
            }
            const resetToken = Math.random().toString(36).slice(-8);
            const resetTokenExpiration = Date.now() + 3600000;
            user.resetToken = resetToken;
            user.resetTokenExpiration = resetTokenExpiration;
            user.save();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: 'milkissily@gmail.com',
                    pass: 'nhhdcrvxcsihlkmb'
                }
            });


            const mailOptions = {
                from: 'milkissily@gmail.com',
                to: user.email,
                subject: 'Yêu cầu đặt lại mật khẩu',
                text: `Để đặt lại mật khẩu, vui lòng truy cập liên kết sau: http://192.168.22.105:3000/api/user/reset-password/${resetToken}`,
                html: `<h1>Mã đặt lại mật khẩu của bạn là:</h1> <h3>${resetToken}</a></h3>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.json(10);
                }
                console.log(`${resetToken}`);
                return res.json(1);

            });


        }).catch(err => res.json(err))
    }

    resetpassword(req, res, next) {
        const resetToken = req.params.resetToken;
        const password = req.body.password;
        User.findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } })
            .then(user => {
                console.log(user);
                if (!user) {
                    return res.json(0);
                }
                user.password = password;
                user.resetToken = null;
                user.resetTokenExpiration = null;
                user.save();
                return res.json(1);
            })
            .catch(err => res.json(err))

    }


}





module.exports = new ApiController;