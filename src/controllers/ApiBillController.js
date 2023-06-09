const Bill = require('../models/Bill');
const Cart = require('../models/Cart');
const Notify = require('../models/Notify');
const { convertleObject } = require('../utils/convertObj');
const axios = require('axios');





class ApiController {

    addBill(req, res, next) {
        const bill = req.body;
        const token = req.params.token;
        const idArray = bill.list.map(item => item._id);
        Bill.create(bill).then(bill => {
            Cart.deleteMany({ _id: { $in: idArray } })
                .then(() => {
                    Notify.create({ id_bill: bill.id, id_user: bill.id_user, status: 0 }).then(
                        () => {
                            res.json(bill);
                            const data = {
                                "data": {
                                    "title": "Có thông báo mới",
                                    "body": "Đơn hàng có mã " + bill.id + " đặt thành công",
                                },
                                "to": token
                            };

                            const headers = {
                                "Authorization": 'key=AAAA8GzFVPw:APA91bF-C8cV3b1M6Ag3R7Raxd0sUH5dsZ9UTbd7EOs04FE9DgHVfYOc5m4R6IrOGQa21GzkT1ciXgUPzZQF7EcfYdsLmY5F0NPVZPqfNT1U6W08W632lmxFPpqcWWKnP1mTOQP9RPUw',
                                "Content-Type": "application/json"
                            };

                            axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                                .then(function (response) {
                                    console.log('gửi thông báo đến thiết bị thành công', data)
                                })
                                .catch(function (error) {
                                    console.log('gửi thông báo đến thiết bị thất bại')
                                });

                        }
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