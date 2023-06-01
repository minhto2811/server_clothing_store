const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiBillController');


router.post('/add', apiController.addBill);




module.exports = router;