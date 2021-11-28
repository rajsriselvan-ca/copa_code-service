const express = require('express');
router = express.Router();
dashboard = require('../controllers/dashboard-controller');

router.get('/notes-type', dashboard.getNotesType);
router.get('/get-program-language', dashboard.getLanguage);
router.post('/create-notes', dashboard.createNotes);

module.exports = router;