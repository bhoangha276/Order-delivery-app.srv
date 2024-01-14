const router = require('express').Router()
const invoiceController = require('./controller')

router.get('/filter', invoiceController.filterInvoice)
router.get('/revenue', invoiceController.getRevenue)
router.get('/', invoiceController.getAllInvoices)
router.get('/:id', invoiceController.getInvoice)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    invoiceController.createInvoice
)
router.put('/:invoiceID', invoiceController.updateInvoice)
router.delete('/:invoiceID', invoiceController.deleteInvoice)

module.exports = router
