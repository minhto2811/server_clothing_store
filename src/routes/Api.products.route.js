const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiProductController');
const upload = require('../utils/saveIMG');


router.get('/home', apiController.home);
router.get('/category/:category', apiController.category);
router.get('/banner/:event', apiController.event);
router.post('/add', upload.single('image'), apiController.store);
router.delete('/delete/:_id', apiController.delete);
router.post('/search', apiController.search);
router.get('/info/:_id', apiController.info);
router.put('/update/:_id',upload.single('image'), apiController.update);
module.exports = router;