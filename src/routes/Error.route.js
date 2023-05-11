const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
});
router.get("/", (req, res) => {
    res.send('SERVER ON')
})

module.exports = router;