const MenuModel = require('./model')

// GET ALL
const getAllMenus = async (req, res) => {
    try {
        const menus = await MenuModel.find()
        // .populate({ path: 'menuID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: menus,
        })
    } catch (err) {
        res.status(400).send({
            success: 0,
            data: null,
            message: err.message || 'Something went wrong',
        })
    }
}

// GET BY ID
const getMenu = async (req, res) => {
    const id = req.params.menuID.trim()

    const foundMenu = await MenuModel.findById(id)

    if (!foundMenu) {
        return res.send({
            success: 0,
            message: 'Not found menu!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found menu!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found menu!',
        })
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
