const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const upload = require('../utils/saveIMG');
const mdw = require('../utils/midleware');

router.get('/home', mdw.check_admin, categoryController.home);
router.get('/add', mdw.check_admin, categoryController.add);
router.post('/add', mdw.check_admin, upload.single('image'), categoryController.store);
router.delete('/delete/:_id', mdw.check_admin, categoryController.delete);
router.post('/search', mdw.check_admin, categoryController.search);
router.get('/info/:_id', mdw.check_admin, categoryController.info);
router.put('/update/:_id', mdw.check_admin, upload.single('image'), categoryController.update);
module.exports = router;