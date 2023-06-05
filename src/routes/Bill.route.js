const express = require('express');
const router = express.Router();
const controller = require('../controllers/BillController');
const mdw = require('../utils/midleware');
router.get('/update/:id_bill/:status', mdw.check_admin, controller.cancelBill);
router.get('/home/:status', mdw.check_admin, controller.getAll);
router.post('/search/:status', mdw.check_admin, controller.search)




module.exports = router;