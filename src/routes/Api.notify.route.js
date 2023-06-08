const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiNotifyController');

router.get('/:id_user', apiController.getAll);




module.exports = router;