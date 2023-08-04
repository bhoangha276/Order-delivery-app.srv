const router = require('express').Router()
const isAuth = require('../../middleware/isAuth')
const authController = require('./controller')

router.get('/', isAuth, authController.getAllAccounts)
router.get('/:accountID', isAuth, authController.getAccount)
router.post('/', isAuth, authController.createAccount)
router.put('/:accountID', isAuth, authController.updateAccount)
router.delete('/:accountID', isAuth, authController.deleteAccount)

router.post('/', authController.signUp)
router.post('/login', authController.login)
router.get('/me', authController.getAccountInfo)

module.exports = router
