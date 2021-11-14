const express = require('express');
router = express.Router();
login = require('../controllers/login');

router.post('/register', login.userRegister);
router.get('/getUsers',login.getUsers);

module.exports = router;