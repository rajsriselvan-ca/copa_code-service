const express = require('express');
router = express.Router();
const multer = require('multer')
const path = require('path')
dashboard = require('../controllers/dashboard-controller');
const { body, validationResult } = require('express-validator');

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')    
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});

router.get('/get-employee-list', dashboard.getEmployeelist)
router.get('/get-all-employee-list',dashboard.getAllEmployeelist);
router.post('/create-employee',upload.single('file'),
body('firstName').exists({ checkFalsy: true }).isLength({ min: 3, max: 36 }).isAlpha('en-US', {ignore: ' '}),
body('lastName').exists({ checkFalsy: true }).isLength({ min: 3, max: 36 }).isAlpha('en-US', {ignore: ' '}),
body('emailID').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
body('skillSet').exists({ checkFalsy: true }).isLength({ min: 3, max: 30 }).isAlphanumeric('en-US', {ignore: ' '}),
body('yearsOfExperience').exists({ checkFalsy: true }).isInt({ min: 1, max: 10 }),
(request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.send(errors);
          }
          dashboard.createEmployee(request, response);
});
router.put('/update-employee/:id/', dashboard.updateEmployee)
router.delete('/delete-employee/:id/', dashboard.deleteEmployee);

module.exports = router;