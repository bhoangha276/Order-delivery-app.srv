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
    const { menuID } = req.params

    const foundMenu = await MenuModel.findById(menuID)

    if (foundMenu === null) {
        return res.send({
            success: 0,
            msg: 'not found!',
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
    const { menuID } = req.params

    const updateMenuData = req.body

    const updatedMenu = await MenuModel.findOneAndUpdate(
        { _id: menuID },
        updateMenuData,
        { new: true }
    )

    if (!updatedMenu) {
        throw new Error('Not found menu')
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteMenu = async (req, res) => {
    const { menuID } = req.params

    await MenuModel.findOneAndDelete({
        _id: menuID,
    })

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
