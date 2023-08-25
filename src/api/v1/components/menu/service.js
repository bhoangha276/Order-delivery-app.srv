const MenuModel = require('./model')

const filterMenuHandler = async (keyword) => {
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

    return ([menus, total] = await Promise.all([
        MenuModel.find(filters),
        MenuModel.find(filters).countDocuments(),
    ]))
}

const getAllMenuHandler = async (page, limit, sortDirection, sortField) => {
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

    return [menus, pagination, totalPage, total]
}

const getMenuHandler = async (id) => {
    return await MenuModel.findById(id)
}

const createMenuHandler = async (data) => {
    return await MenuModel.create({
        ...data,
    })
}

const updateMenuHandler = async (id, data) => {
    return await MenuModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteMenuHandler = async (id) => {
    return await MenuModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterMenuHandler,
    getAllMenuHandler,
    getMenuHandler,
    createMenuHandler,
    updateMenuHandler,
    deleteMenuHandler,
}
