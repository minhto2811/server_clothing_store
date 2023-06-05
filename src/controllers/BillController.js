const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { convertleObject } = require('../utils/convertObj');

class ApiController {



    getAll(req, res, next) {
        const status = parseInt(req.params.status);
        Bill.find({ status: status })
            .then((arr) => {
                if (status == 0) {
                    var statusUpdate = 'Đơn chờ xác nhận';
                } else if (status == 1) {
                    var statusUpdate = 'Đơn đã xác nhận';
                } else if (status == 2) {
                    var statusUpdate = 'Đơn đang giao';
                } else if (status == 3) {
                    var statusUpdate = 'Đơn giao thành công';
                } else {
                    var statusUpdate = 'Đơn đã hủy';
                }
                res.render('home-bill', { layout: 'main', bills: convertleObject(arr), condition: (status < 3), statusUpdate, status });
            })
            .catch(err => res.json(err));
    }

    cancelBill(req, res, next) {
        const id_bill = req.params.id_bill;
        const status = req.params.status;
        Bill.updateOne({ _id: id_bill }, { $set: { status: status } })
            .then(bill => {
                res.redirect('/bill/home/' + status);
            })
            .catch(err => res.json(err));
    }

    search(req, res, next) {
        const query = req.body.name;
        const status = req.params.status;
        console.log(query + "-" + status)
        Bill.find({ phone: query, status: status })
            .then(nv => {
                if (nv.length === 0) {
                    res.redirect('/bill/home/'+status);
                } else {
                    if (status === 0) {
                        var statusUpdate = 'Đơn chờ xác nhận';
                    } else if (status == 1) {
                        var statusUpdate = 'Đơn đã xác nhận';
                    } else if (status == 2) {
                        var statusUpdate = 'Đơn đang giao';
                    } else if (status == 3) {
                        var statusUpdate = 'Đơn giao thành công';
                    } else {
                        var statusUpdate = 'Đơn đã hủy';
                    }
                    res.render('home-bill', { layout: 'main', bills: convertleObject(nv), valueSearch: query, condition: (status < 3), statusUpdate, status });
                }
            }).catch(err => res.json(err));
    }



}





module.exports = new ApiController;