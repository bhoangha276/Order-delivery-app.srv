const router = require('express').Router()
const orderController = require('./controller')

router.get('/', orderController.getAllOrders)
router.get('/:orderID', orderController.getOrder)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    orderController.createOrder
)
router.put('/:orderID', orderController.updateOrder)
router.delete('/:orderID', orderController.deleteOrder)

module.exports = router
