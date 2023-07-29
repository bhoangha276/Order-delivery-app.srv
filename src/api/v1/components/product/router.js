const router = require('express').Router()
const productController = require('./controller')

router.get('/', productController.getAllProducts)
router.get('/:productID', productController.getProduct)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    productController.createProduct
)
router.put('/:productID', productController.updateProduct)
router.delete('/:productID', productController.deleteProduct)

module.exports = router
