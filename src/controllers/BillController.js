const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Notify = require('../models/Notify');
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
        const status = parseInt(req.params.status);
        Bill.findOneAndUpdate({ _id: id_bill }, { $set: { status: status } })
            .then(bill => {
                if (status != 3) {
                    Notify.updateOne({ _id: bill.id }, { $set: { status: status } }).then(
                        () => res.redirect('/bill/home/' + (status - 1))
                    ).catch(err => res.json(err));


                } else {
                    const updateOperations = bill.list.map(({ id_product, quantity }) => ({
                        updateOne: {
                            filter: { _id: id_product },
                            update: { $inc: { sold: quantity } }
                        }
                    }));
                    Product.bulkWrite(updateOperations)
                        .then(() => {
                            const id = bill._id;
                            console.log("fb", bill)
                            const billRef = dbfb.ref('bills/' + bill.id_user + "/" + id);
                            billRef.set(status)
                                .then(() => {
                                    console.log('firebase ok')
                                    res.redirect('/bill/home/' + (status - 1));
                                })
                                .catch((error) => {
                                    console.log('err fb');
                                    res.json(error);
                                });

                        })
                        .catch((error) => {
                            res.json(error);
                        });
                }

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
                    res.redirect('/bill/home/' + status);
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