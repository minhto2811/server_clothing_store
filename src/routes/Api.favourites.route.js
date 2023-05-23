const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiFavouriteController');


router.get('/:id_user', apiController.getAll);
router.post('/add/:id_user',  apiController.add);
router.get('/product/:id_user', apiController.info);
router.post('/update/:id_user', apiController.update);



// router.get('/home', apiController.home);

// router.post('/search', apiController.search);

module.exports = router;