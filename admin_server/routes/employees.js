var express = require('express');
var router = express.Router();
const employeeController = require('../controllers').employee;

/* GET users listing. */
router.get('/', employeeController.list);
router.get('/check_email', employeeController.check_email);
router.get('/:id', employeeController.getById);
router.post('/', employeeController.add);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router;
