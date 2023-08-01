const MenuModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllMenus = async (req, res) => {
    const menus = await MenuModel.find()
    // .populate({ path: 'menuID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: menus,
    })
}

// GET BY ID
const getMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const foundMenu = await MenuModel.findById(id)

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

    const updatedMenu = await MenuModel.create({
        ...newMenuData,
    })

    res.send({
        success: 1,
        id: updatedMenu._id,
    })
}

// UPDATE
const updateMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const updateMenuData = req.body

    const updatedMenu = await MenuModel.findOneAndUpdate(
        { _id: id },
        updateMenuData,
        { new: true }
    )

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

    const deletedMenu = await MenuModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedMenu) {
        throw new HttpError('Not found menu!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
}
