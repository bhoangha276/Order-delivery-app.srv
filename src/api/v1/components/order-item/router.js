const router = require('express').Router()
const orderItemController = require('./controller')

router.get('/best-product', orderItemController.getBestProducts)
router.get('/', orderItemController.getAllOrderItems)
router.get('/:orderItemID', orderItemController.getOrderItem)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    orderItemController.createOrderItem
)
router.put('/:orderItemID', orderItemController.updateOrderItem)
router.delete('/:orderItemID', orderItemController.deleteOrderItem)

module.exports = router
