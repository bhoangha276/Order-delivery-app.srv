const router = require('express').Router()
const employeeController = require('./controller')

const isAuth = require('../../middlewares/isAuth')
const validateInput = require('../../middlewares/validateInput')
const authValid = require('./validation')

router.get('/filter', employeeController.filterEmployee)
router.get('/', employeeController.getAllEmployees)
router.get('/:employeeID', employeeController.getEmployee)
router.post(
    '/',
    validateInput(authValid.createSchema, 'body'),
    employeeController.createEmployee
)
router.put(
    '/:employeeID',
    validateInput(authValid.updateSchema, 'body'),
    employeeController.updateEmployee
)
router.delete('/:employeeID', employeeController.deleteEmployee)

module.exports = router
