const UserModel = require('./model')

const filterUserHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [
                  { name: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { address: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { gender: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { phone: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([users, total] = await Promise.all([
        UserModel.find(filters),
        UserModel.find(filters).countDocuments(),
    ]))
}

const getAllUserHandler = async (page, limit, sortDirection, sortField) => {
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

    const [users, total] = await Promise.all([
        UserModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        UserModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [users, pagination, totalPage, total]
}

const getUserHandler = async (id) => {
    return await UserModel.findById(id)
}

const createUserHandler = async (data) => {
    return await UserModel.create({
        ...data,
    })
}

const updateUserHandler = async (id, data) => {
    return await UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteUserHandler = async (id) => {
    return await UserModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterUserHandler,
    getAllUserHandler,
    getUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
}
