const router = require('express').Router()
const userController = require('./controller')

router.get('/filter', userController.filterUser)
router.get('/', userController.getAllUsers)
router.get('/:userID', userController.getUser)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    userController.createUser
)
router.put('/:userID', userController.updateUser)
router.delete('/:userID', userController.deleteUser)

module.exports = router
