const router = require('express').Router()
const invoiceController = require('./controller')

router.get('/', invoiceController.getAllInvoices)
router.get('/:invoiceID', invoiceController.getInvoice)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    invoiceController.createInvoice
)
router.put('/:invoiceID', invoiceController.updateInvoice)
router.delete('/:invoiceID', invoiceController.deleteInvoice)

module.exports = router
