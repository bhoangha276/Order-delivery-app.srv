const router = require('express').Router()
const authController = require('./controller')

const isAuth = require('../../middlewares/isAuth')
const validateInput = require('../../middlewares/validateInput')
const authValid = require('./validation')

router.get('/filter', isAuth, authController.filterAccount)
router.get('/', isAuth, authController.getAllAccounts)
router.get('/:accountID', isAuth, authController.getAccount)
router.post(
    '/',
    isAuth,
    validateInput(authValid.createSchema, 'body'),
    authController.createAccount
)
router.put(
    '/:accountID',
    isAuth,
    validateInput(authValid.updateSchema, 'body'),
    authController.updateAccount
)
router.delete('/:accountID', isAuth, authController.deleteAccount)

router.post(
    '/signup',
    validateInput(authValid.signupSchema, 'body'),
    authController.signUp
)
router.post(
    '/login',
    validateInput(authValid.loginSchema, 'body'),
    authController.login
)
router.get('/me', authController.getAccountInfo)

module.exports = router
