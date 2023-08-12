const router = require('express').Router()
const productController = require('./controller')

const isAuth = require('../../middlewares/isAuth')
const validateInput = require('../../middlewares/validateInput')
const authValid = require('./validation')

router.get('/filter', productController.filterProduct)
router.get('/', productController.getAllProducts)
router.get('/:productID', productController.getProduct)
router.post(
    '/',
    validateInput(authValid.createSchema, 'body'),
    productController.createProduct
)
router.put(
    '/:productID',
    validateInput(authValid.updateSchema, 'body'),
    productController.updateProduct
)
router.delete('/:productID', productController.deleteProduct)

module.exports = router
