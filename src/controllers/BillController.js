const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Notify = require('../models/Notify');
const { convertleObject } = require('../utils/convertObj');
const User = require('../models/User');
const axios = require('axios');

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
            .then(async bill => {
                await Notify.updateOne({ id_bill: id_bill }, { $set: { status: status } });
                if (status == 3) {
                    const updateOperations = bill.list.map(({ id_product, quantity }) => ({
                        updateOne: {
                            filter: { _id: id_product },
                            update: { $inc: { sold: quantity } }
                        }
                    }));
                    await Product.bulkWrite(updateOperations);
                }

                return bill;
            })
            .then(bill => {
                return User.findOne({ _id: bill.id_user })
                    .then(user => {
                        let body = "";
                        if (status == 1) {
                            body = " đã được xác nhận";
                        } else if (status == 2) {
                            body = " đang được giao";
                        } else if (status == 3) {
                            body = " đã được giao thành công";
                        } else {
                            body = " đã bị hủy";
                        }
                        const data = {
                            "data": {
                                "title": "Có thông báo mới",
                                "body": "Đơn hàng có mã " + bill.id + body,
                                "status": status
                            },
                            "to": user.tokenNotify
                        };

                        const headers = {
                            "Authorization": 'key=AAAA8GzFVPw:APA91bF-C8cV3b1M6Ag3R7Raxd0sUH5dsZ9UTbd7EOs04FE9DgHVfYOc5m4R6IrOGQa21GzkT1ciXgUPzZQF7EcfYdsLmY5F0NPVZPqfNT1U6W08W632lmxFPpqcWWKnP1mTOQP9RPUw',
                            "Content-Type": "application/json"
                        };

                        return axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                            .then(response => {
                                return { bill, response };
                            });
                    });
            })
            .then(({ bill, response }) => {
                console.log('gửi thông báo đến thiết bị thành công', bill);
                res.redirect('/bill/home/' + (status - 1));
            })
            .catch(error => {
                console.log('gửi thông báo đến thiết bị thất bại', error);
                res.json(error);
            });

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