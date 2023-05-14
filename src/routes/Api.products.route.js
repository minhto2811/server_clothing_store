const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiProductController');
const upload = require('../utils/saveIMG');


router.get('/home', apiController.home);
// http://localhost:3000/api/product/home
//lấy toàn bộ bản ghi sản phẩm 




router.get('/category/:category', apiController.category);
//// http://localhost:3000/api/product/category/:category   
// (":category" là 1 thuộc tính của model category)
//lấy toàn bộ bản ghi sản phẩm được nhóm theo danh mục (group by category)

router.get('/banner/:event', apiController.event);
//// http://localhost:3000/api/product/category/:category   
// (":event" là 1 thuộc tính của model event)
//lấy toàn bộ bản ghi sản phẩm được nhóm theo event (group by event)
//event chính là những banner tự chuyển trong phần màn hình chính của ứng dụng



//những phần chưa comment dưới đây là nhưng phần chưa dùng đến
router.post('/add', upload.single('image'), apiController.store);
router.delete('/delete/:_id', apiController.delete);
router.post('/search', apiController.search);
router.get('/info/:_id', apiController.info);
router.put('/update/:_id',upload.single('image'), apiController.update);
module.exports = router;