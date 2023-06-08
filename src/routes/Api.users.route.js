const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiUserController');
const upload = require('../utils/saveIMG');

router.post('/tokenNotify/:id_user', apiController.tokenNotify);
router.post('/login', apiController.login);
router.post('/add', apiController.store);
router.post('/info', apiController.info);
router.post('/update/image/:username', upload.single('image'), apiController.update);
router.post('/password', apiController.changePass);
router.post('/update/info', apiController.updateinfo);
router.get('/forgetpassword/:username', apiController.forgetpassword);
router.post('/reset-password/:resetToken', apiController.resetpassword);


module.exports = router;