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
        const address = req.body;
        console.log(address)
        Address.create(address).then(
            obj => {
                res.json(obj)
            }
        ).catch(err => console.log(err));
    }

    address(req, res, next) {
        const id_user = req.params.id_user;
        Address.find({ id_user: id_user }).then(
            arr => {
                if (!arr) {
                    res.json(null);
                }else{
                    res.json(arr);
                }
            }
        ).catch(err => res.json(null));
    }

    update(req, res, next) {
        const address = req.body;
        console.log(address)
        Address.findByIdAndUpdate(address._id, address).then(rs => res.json(address)).catch(err => res.json(err));
    }

    delete(req, res, next) {
        const id_address = req.params.id_address;
        console.log("delete", id_address)
        Address.deleteOne({ _id: id_address })
            .then((rs) => { res.json(rs.deletedCount) })
            .catch(err => res.json(err));
    }


}





module.exports = new ApiController;