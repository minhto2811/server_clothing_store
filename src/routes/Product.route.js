const express = require('express');
const router = express.Router();
const prdController = require('../controllers/ProductController');
const upload = require('../utils/saveIMG');

router.get('/home', prdController.home);
router.get('/add', prdController.add);
router.post('/add', upload.array('image'), prdController.store);
router.delete('/delete/:_id', prdController.delete);
router.post('/search', prdController.search);
router.get('/info/:_id', prdController.info);
router.put('/update/:_id',upload.array('image'), prdController.update);
module.exports = router;