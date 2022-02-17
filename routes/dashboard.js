const express = require('express');
router = express.Router();
dashboard = require('../controllers/dashboard-controller');

router.get('/get-employee-list', dashboard.getEmployeelist)
router.get('/get-all-employee-list', dashboard.getAllEmployeelist)
router.post('/create-employee', dashboard.createEmployee);
router.put('/update-employee/:id/', dashboard.updateEmployee)
router.delete('/delete-employee/:id/', dashboard.deleteEmployee);

module.exports = router;