const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiCategoryController');
const upload = require('../utils/saveIMG');


router.get('/home', apiController.home);
router.post('/add', upload.single('image'), apiController.store);
router.delete('/delete/:_id', apiController.delete);
router.post('/search', apiController.search);
router.get('/info/:_id', apiController.info);
router.put('/update/:_id', upload.single('image'), apiController.update);
module.exports = router;