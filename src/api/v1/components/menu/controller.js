const MenuHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterMenu = async (req, res) => {
    const { keyword } = req.query

    const [menus, total] = await MenuHandler.filterMenuHandler(keyword)

    res.send({
        success: 1,
        data: menus,
        Total: total,
    })
}

// GET ALL
const getAllMenus = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [menus, pagination, totalPage, total] =
        await MenuHandler.getAllMenuHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: menus,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const foundMenu = await MenuHandler.getMenuHandler(id)

    if (!foundMenu) {
        throw new HttpError('Not found menu!', 404)
    }

    res.send({
        success: 1,
        data: foundMenu,
    })
}

// CREATE
const createMenu = async (req, res) => {
    const newMenuData = req.body

    const newMenu = await MenuHandler.createMenuHandler(newMenuData)

    res.send({
        success: 1,
        id: newMenu._id,
    })
}

// UPDATE
const updateMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const updateMenuData = req.body

    const updatedMenu = await MenuHandler.updateMenuHandler(id, updateMenuData)

    if (!updatedMenu) {
        throw new HttpError('Not found menu!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const deletedMenu = await MenuHandler.deleteMenuHandler(id)
    if (!deletedMenu) {
        throw new HttpError('Not found menu!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterMenu,
    getAllMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
}
