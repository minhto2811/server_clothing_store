const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiUserController');
const upload = require('../utils/saveIMG');


router.post('/login', apiController.login);
router.post('/add', upload.single('image'), apiController.store);
router.post('/info', apiController.info);
router.post('/update/image/:username',upload.single('image'), apiController.update);
router.post('/password',apiController.changePass);
router.post('/updateinfo/:id_user',apiController.updateinfo);


module.exports = router;