const MenuModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterMenu = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [
                  { name: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { category: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [menus, total] = await Promise.all([
        MenuModel.find(filters),
        MenuModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: menus,
        Total: total,
    })
}

// GET ALL
const getAllMenus = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const pagination = {
        page: page > 0 ? Number(page) : 1,
        limit: limit > 0 ? Number(limit) : 2,
    }
    pagination.skip = (pagination.page - 1) * pagination.limit

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortFieldParams = sortField
        ? {
              [sortField]: sortDirectionParams,
          }
        : { createdAt: sortDirectionParams }

    const [menus, total] = await Promise.all([
        MenuModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        MenuModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

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
    filterMenu,
    getAllMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
}
