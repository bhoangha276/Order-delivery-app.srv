const TableModel = require('./model')

const filterTableHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [
                  //   { number: { $regex: new RegExp(`${keyword}`, 'i') } },
                  //   { capacity: { $regex: new RegExp(`${keyword}`, 'i') } },
                  //   { status: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([tables, total] = await Promise.all([
        TableModel.find(filters),
        TableModel.find(filters).countDocuments(),
    ]))
}

const getAllTableHandler = async (page, limit, sortDirection, sortField) => {
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

    const [tables, total] = await Promise.all([
        TableModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        TableModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [tables, pagination, totalPage, total]
}

const getTableHandler = async (id) => {
    return await TableModel.findById(id)
}

const createTableHandler = async (data) => {
    return await TableModel.create({
        ...data,
    })
}

const updateTableHandler = async (id, data) => {
    return await TableModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteTableHandler = async (id) => {
    return await TableModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterTableHandler,
    getAllTableHandler,
    getTableHandler,
    createTableHandler,
    updateTableHandler,
    deleteTableHandler,
}
