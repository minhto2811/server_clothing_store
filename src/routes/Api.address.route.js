const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiAddressController');


router.get('/provinces', apiController.provinces);
router.get('/districts/:parent_code', apiController.districts);
router.get('/wards/:parent_code', apiController.wards);
router.post('/addNew/:id_user',apiController.addNew);
router.get('/all/:id_user',apiController.address);
router.post('/update',apiController.update);
router.post('/delete/:id_address',apiController.delete);



module.exports = router;