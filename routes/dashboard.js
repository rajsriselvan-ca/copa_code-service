const express = require('express');
router = express.Router();
dashboard = require('../controllers/dashboard-controller');
verifyTokenReference = require('../controllers/verifyToken');

router.get('/notes-type', dashboard.getNotesType);
router.get('/get-program-language', dashboard.getLanguage);
router.get('/get-notes', verifyTokenReference.verifyToken, dashboard.getNotes);
router.get('/get-all-notes', dashboard.getAllNotes)
router.post('/create-notes', dashboard.createNotes);
router.put('/update-note/:id/', dashboard.updateNotes)
router.delete('/delete-note/:id/', dashboard.deleteNote);

module.exports = router;