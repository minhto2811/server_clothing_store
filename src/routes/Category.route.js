const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const upload = require('../utils/saveIMG');

router.get('/home', categoryController.home);
router.get('/add', categoryController.add);
router.post('/add', upload.single('image'), categoryController.store);
router.delete('/delete/:_id', categoryController.delete);
router.post('/search', categoryController.search);
router.get('/info/:_id', categoryController.info);
router.put('/update/:_id',upload.single('image'), categoryController.update);
module.exports = router;