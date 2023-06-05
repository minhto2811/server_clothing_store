const express = require('express');
const router = express.Router();
const prdController = require('../controllers/ProductController');
const upload = require('../utils/saveIMG');
const mdw = require('../utils/midleware');


router.get('/home', mdw.check_admin, prdController.home);
router.get('/add', mdw.check_admin, prdController.add);
router.post('/add', mdw.check_admin, upload.array('image'), prdController.store);
router.delete('/delete/:_id', mdw.check_admin, prdController.delete);
router.post('/search', mdw.check_admin, prdController.search);
router.get('/info/:_id', mdw.check_admin, prdController.info);
router.put('/update/:_id', mdw.check_admin, upload.array('image'), prdController.update);
module.exports = router;