const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiFavouriteController');


router.get('/:id_user', apiController.getAll);
router.post('/add/:id_user',  apiController.add);
router.post('/info', apiController.info);
router.post('/update/image/:username', apiController.update);



// router.get('/home', apiController.home);
// router.delete('/delete/:_id', apiController.delete);
// router.post('/search', apiController.search);

module.exports = router;