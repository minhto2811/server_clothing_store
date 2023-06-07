const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');
const mdw = require('../utils/midleware');
const upload = require('../utils/saveIMG');
router.post('/check-account', siteController.checkOut);
router.get('/sign-in', siteController.signIn);
router.get('/forgot-password', siteController.forgotPassword);
router.get('/settings', mdw.check_admin, siteController.settings);
router.post('/update', mdw.check_admin, upload.single('image'), siteController.update);
router.post('/logout', mdw.check_admin, siteController.logout);
router.get('/password', mdw.check_admin, siteController.password);
router.post('/password', mdw.check_admin, siteController.changePassword);
router.get('/statistical', mdw.check_admin, siteController.statistical);
router.post('/statistical', mdw.check_admin, siteController.getStatistical);

module.exports = router;