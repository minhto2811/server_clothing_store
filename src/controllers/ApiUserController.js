const User = require('../models/User');
const { convertleObject } = require('../utils/convertObj');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;

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
        var object = req.body;
        object.image = "/image/Default-welcomer-1683621300160.png"
        User.create(object).then((nv) => res.json(nv))
            .catch((err) => {
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
        User.updateOne({ _id: req.body._id }, req.body).then((rs) => {
            if (rs.matchedCount === 1 && rs.modifiedCount === 0) {
                res.json(rs.modifiedCount-1)
            }else{
                res.json(rs.modifiedCount)
            }
        
        })
            .catch(err => res.json(err));
    }

}





module.exports = new ApiController;