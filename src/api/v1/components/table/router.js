const router = require('express').Router()
const tableController = require('./controller')

router.get('/filter', tableController.filterTable)
router.get('/', tableController.getAllTables)
router.get('/:tableID', tableController.getTable)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    tableController.createTable
)
router.put('/:tableID', tableController.updateTable)
router.delete('/:tableID', tableController.deleteTable)

module.exports = router
