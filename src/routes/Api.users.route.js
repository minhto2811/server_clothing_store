const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiUserController');
const upload = require('../utils/saveIMG');


router.post('/login', apiController.login);
router.post('/add', upload.single('image'), apiController.store);
router.post('/info', apiController.info);
router.post('/update/image/:username',upload.single('image'), apiController.update);



// router.get('/home', apiController.home);
// router.delete('/delete/:_id', apiController.delete);
// router.post('/search', apiController.search);

module.exports = router;