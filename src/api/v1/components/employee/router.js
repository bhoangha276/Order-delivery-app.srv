const router = require('express').Router()
const employeeController = require('./controller')

router.post('/manage', employeeController.manage)
router.get('/', employeeController.getAllEmployees)
router.get('/:employeeID', employeeController.getEmployee)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    employeeController.createEmployee
)
router.put('/:employeeID', employeeController.updateEmployee)
router.delete('/:employeeID', employeeController.deleteEmployee)

module.exports = router
