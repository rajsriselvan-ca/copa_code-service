const express = require('express');
router = express.Router();
login = require('../controllers/login-controller');

router.post('/register', login.userRegister);
router.post('/loginUserDetailsPost',login.loginUserDetailsPost);

module.exports = router;