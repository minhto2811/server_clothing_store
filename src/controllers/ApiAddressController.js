const Province = require('../models/Province');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Address = require('../models/Address');
const User = require('../models/User');
const { convertleObject } = require('../utils/convertObj');
class ApiController {

    provinces(req, res, next) {
        Province.find()
            .then(nvs => {
                res.json(nvs);
            })
            .catch(err => res.json(err));
    }

    districts(req, res, next) {
        District.find({ parent_code: req.params.parent_code })
            .then(nvs => {
                res.json(nvs);
            })
            .catch(err => res.json(err));
    }

    wards(req, res, next) {
        Ward.find({ parent_code: req.params.parent_code })
            .then(nvs => {
                res.json(nvs);
            })
            .catch(err => res.json(err));
    }


    addNew(req, res, next) {
        console.log(req.body)
        const address = new Address(req.body);
        address.save().then(
            obj => {
                User.findOne({ _id: req.params.id_user })
                    .then(user => {
                        user.address = user.address.concat(address.id);
                        user.save();
                        res.json(obj);
                    })
                    .catch(err => res.json(err))
            }
        ).catch(err => res.json(err));
    }

    address(req, res, next) {
        const id_user = req.params.id_user;
        User.findOne({ _id: id_user }).then(
            user => {
                const id_address = user.address;
                Address.find({ _id: { $in: id_address } }).then(arr => {
                    res.json(arr);
                }).catch(err => res.json(err))
            }
        ).catch(err => res.json(err));
    }

    update(req, res, next) {
        const address = req.body;
        console.log(address)
        Address.findByIdAndUpdate(address._id, address).then(rs => res.json(address)).catch(err => res.json(err));
    }

    delete(req, res, next) {
        const id_user = req.params.id_user;
        const id_address = req.body.id_address;
        console.log(id_user+"  "+id_address);
        Address.findByIdAndDelete().then(
            obj => {
                User.findOne({ _id: id_user }).then(
                    user => {
                        user.address = user.address.filter(item => item !== id_address);
                        User.updateOne({ _id: id_user }, user).then(
                            user => {
                                res.json(user);
                            }
                        ).catch(err => res.json(err));
                    }
                ).catch(err => res.json(err))
            }
        ).catch(err => res.json(err));
    }


}





module.exports = new ApiController;