const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiBillController');


router.post('/add', apiController.addBill);
router.get('/:id_user', apiController.getAll);




module.exports = router;