const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { convertleObject } = require('../utils/convertObj');

class ApiController {

    addBill(req, res, next) {
        const bill = req.body;
        const idArray = bill.list.map(item => item._id);
        Bill.create(bill).then(bill => {
            Cart.deleteMany({ _id: { $in: idArray } })
                .then(() => res.json(bill))
                .catch(err => res.json(err))
        }).catch(err => res.json(err));
    }



}





module.exports = new ApiController;