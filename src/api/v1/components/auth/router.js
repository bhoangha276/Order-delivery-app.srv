const router = require('express').Router()
const authController = require('./controller')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/me', authController.getAccountInfo)

module.exports = router
