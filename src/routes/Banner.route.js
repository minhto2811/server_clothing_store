const express = require('express');
const router = express.Router();
const bnController = require('../controllers/BannerController');
const upload = require('../utils/saveIMG');

router.get('/home', bnController.home);
router.get('/add', bnController.add);
router.post('/add', upload.single('image'), bnController.store);
router.delete('/delete/:_id', bnController.delete);
router.get('/info/:_id', bnController.info);
router.put('/update/:_id',upload.single('image'), bnController.update);
module.exports = router;