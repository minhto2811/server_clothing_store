const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiFavouriteController');



router.post('/add/:id_user',  apiController.add);
router.get('/product/:id_user', apiController.info);
router.post('/update/:id_user', apiController.update);



module.exports = router;