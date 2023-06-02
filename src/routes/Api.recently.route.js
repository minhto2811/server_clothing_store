const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiRecentlyController');


router.post('/add/:id_user', apiController.add);
router.post('/delete/:id_user', apiController.delete);
router.get('/:id_user', apiController.getAll);





module.exports = router;