const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.redirect('/user/sign-in')
});

module.exports = router;