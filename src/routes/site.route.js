const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');


router.post('/check-account', siteController.checkOut);
router.get('/logout', siteController.logOut);
router.get('/sign-in', siteController.signIn);
router.get('/forgot-password',siteController.forgotPassword);



module.exports = router;