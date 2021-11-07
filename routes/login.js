const express = require('express');
router = express.Router();
login = require('../controllers/login');

router.post('/register', login.userRegister);
router.get('/page',login.page);

module.exports = router;