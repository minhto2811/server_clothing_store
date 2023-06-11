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
        Bill.create(bill)
            .then(bill => {
                return bill;
            })
            .then(async (bill) => {
                try {
                    await Cart.deleteMany({ _id: { $in: idArray } });
                    return bill;
                } catch {
                    return bill;
                }
            })
            .then(async (bill) => {
                try {
                    await Notify.create({ id_bill: bill._id, id_user: bill.id_user, status: 0 });
                    return bill;
                } catch {
                    return bill;
                }
            })
            .then((bill) => {
                const data = {
                    "data": {
                        "title": "Có thông báo mới",
                        "body": "Đơn hàng có mã " + bill._id + " đặt thành công",
                        "status": 0
                    },
                    "to": token
                };

                const headers = {
                    "Authorization": 'key=AAAA8GzFVPw:APA91bF-C8cV3b1M6Ag3R7Raxd0sUH5dsZ9UTbd7EOs04FE9DgHVfYOc5m4R6IrOGQa21GzkT1ciXgUPzZQF7EcfYdsLmY5F0NPVZPqfNT1U6W08W632lmxFPpqcWWKnP1mTOQP9RPUw',
                    "Content-Type": "application/json"
                };

                axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                    .then(function (response) {
                        res.json(bill);
                    })
                    .catch(function (error) {
                        res.json(bill);
                    });

            })
            .catch(err => res.json(err));
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
        const token = req.params.token;
        Bill.updateOne({ _id: id_bill }, { $set: { status: 4 } })
            .then((rs) => { return rs.modifiedCount })
            .then((num) => {
                Notify.updateOne({ id_bill: id_bill }, { $set: { status: 4 } }).then(
                    () => { return num; }).catch(() => { return num });
            })
            .then((num) => {
                const data = {
                    "data": {
                        "title": "Có thông báo mới",
                        "body": "Đơn hàng có mã " + id_bill + " hủy thành công",
                        "status": 4
                    },
                    "to": token
                };

                const headers = {
                    "Authorization": 'key=AAAA8GzFVPw:APA91bF-C8cV3b1M6Ag3R7Raxd0sUH5dsZ9UTbd7EOs04FE9DgHVfYOc5m4R6IrOGQa21GzkT1ciXgUPzZQF7EcfYdsLmY5F0NPVZPqfNT1U6W08W632lmxFPpqcWWKnP1mTOQP9RPUw',
                    "Content-Type": "application/json"
                };

                axios.post('https://fcm.googleapis.com/fcm/send', data, { headers })
                    .then(function (response) {
                        console.log('gửi thông báo đến thiết bị thành công');
                        res.json(1);
                    })
                    .catch(function (error) {
                        console.log('gửi thông báo đến thiết bị thất bại')
                        res.json(0);
                    });
            })
            .catch(err => console.log(err));


    }
}





module.exports = new ApiController;