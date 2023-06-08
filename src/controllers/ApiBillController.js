const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Notify = require('../models/Notify');
const { convertleObject } = require('../utils/convertObj');


// const dbfb = require('../config/firebase');


class ApiController {

    addBill(req, res, next) {
        const bill = req.body;
        const idArray = bill.list.map(item => item._id);
        Bill.create(bill).then(bill => {
            Cart.deleteMany({ _id: { $in: idArray } })
                .then(() => {
                    Notify.create({ id_bill: bill.id, id_user: bill.id_user, status: 0 }).then(
                        () => res.json(bill)
                    ).catch(err => res.json(err));
                })
                .catch(err => res.json(err))
        }).catch(err => res.json(err));
    }

    getAll(req, res, next) {
        const id_user = req.params.id_user;
        Bill.find({ id_user: id_user })
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => res.json(null));
    }

    cancelBill(req, res, next) {
        const id_bill = req.params.id_bill;
        Bill.findOne({ _id: id_bill })
            .then(bill => {
                if (bill.status === 0) {
                    bill.status = 4;
                    bill.save().then(rs => res.json(1)).catch(err => res.json(err));
                } else {
                    res.json(-1);
                }
            })
            .catch(err => res.json(err));
    }



}





module.exports = new ApiController;