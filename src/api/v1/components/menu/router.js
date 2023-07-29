const router = require('express').Router()
const menuController = require('./controller')

router.get('/', menuController.getAllMenus)
router.get('/:menuID', menuController.getMenu)
router.post(
    '/',
    // validateInput(postValid.createPostSchema, 'body'),
    // isAuth,
    menuController.createMenu
)
router.put('/:menuID', menuController.updateMenu)
router.delete('/:menuID', menuController.deleteMenu)

module.exports = router
