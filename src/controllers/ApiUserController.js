const User = require('../models/User');
// const jwt = require('jsonwebtoken');
const { convertleObject } = require('../utils/convertObj');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;

class ApiController {
    login(req, res, next) {
        // console.log("account dang nhap",req.body.username)
        // User.findOne({ username: req.body.username })
        //     .then(nvs => {
        //         console.log("user lay duoc ",nvs)
        //         if (nvs.password === req.body.password) {
        //             var token = jwt.sign({ username: nvs.username, password: nvs.password }, SECRET);
        //             console.log("token",token)
        //             res.json(token);
        //         }
        //         else {
        //             res.json(null);
        //         }
        //     })
        //     .catch(err => res.json(err));
    }



    store(req, res, next) {
        var object = req.body;
        object.image = "/image/Default-welcomer-1683621300160.png"
        User.create(object).then((nv) => res.json(nv))
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res, next) {
        console.log(req.params._id);
        User.deleteOne({ _id: req.params._id })
            .then(() => res.json({ err: "Xoa thanh cong" }))
            .catch(() => res.json({ err: "Xoa that bai" }));
    }

    search(req, res, next) {
        const query = req.body.name;
        User.find({ name: query })
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
            formData.image = `/image/${req.file.originalname}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        User.updateOne({ _id: id }, formData)
            .then(() => {
                res.json({ msg: "update thanh cong" })
            })
            .catch(err => res.json(err));
    }



   async info(req, res, next) {
        // const token = req.body.token;
        // console.log(token)
        // try {
        //     const decoded = await jwt.verify(token, SECRET);
        //     console.log(decoded)
        //     User.findOne({ username: decoded.username })
        //         .then(nvs => {
        //             if (nvs.password == decoded.password) {
        //                 res.json(nvs);
        //             }
        //             else {
        //                 res.json(null);
        //             }
        //         })
        //         .catch(err => res.json(err));
        // } catch (error) {
        //     res.json(error)
        // }

    }






}





module.exports = new ApiController;