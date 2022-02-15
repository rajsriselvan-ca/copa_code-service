const express = require('express');
router = express.Router();
dashboard = require('../controllers/dashboard-controller');
console.log("connminhgg---")

router.get('/get-employee-list', dashboard.getEmployeelist)
router.post('/create-employee', dashboard.createEmployee);
router.put('/update-employee/:id/', dashboard.updateEmployee)
router.delete('/delete-employee/:id/', dashboard.deleteEmployee);

module.exports = router;