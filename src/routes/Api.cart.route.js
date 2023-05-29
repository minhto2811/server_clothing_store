const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiCartController');


router.post('/add', apiController.addProduct);
router.get('/:id_user', apiController.getAll);




module.exports = router;