const router = require('express').Router()
const userController = require('./controller')

const isAuth = require('../../middlewares/isAuth')
const validateInput = require('../../middlewares/validateInput')
const authValid = require('./validation')

router.get('/filter', userController.filterUser)
router.get('/', userController.getAllUsers)
router.get('/:userID', userController.getUser)
router.post(
    '/',
    validateInput(authValid.createSchema, 'body'),
    userController.createUser
)
router.put(
    '/:userID',
    validateInput(authValid.updateSchema, 'body'),
    userController.updateUser
)
router.delete('/:userID', userController.deleteUser)

module.exports = router
