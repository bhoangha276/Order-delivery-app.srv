const EmployeeModel = require('./model')

const filterEmployeeHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [
                  { name: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { position: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { gender: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { phone: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([employees, total] = await Promise.all([
        EmployeeModel.find(filters),
        EmployeeModel.find(filters).countDocuments(),
    ]))
}

const getAllEmployeeHandler = async (page, limit, sortDirection, sortField) => {
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

    const [employees, total] = await Promise.all([
        EmployeeModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        EmployeeModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [employees, pagination, totalPage, total]
}

const getEmployeeHandler = async (id) => {
    return await EmployeeModel.findById(id)
}

const createEmployeeHandler = async (data) => {
    return await EmployeeModel.create({
        ...data,
    })
}

const updateEmployeeHandler = async (id, data) => {
    return await EmployeeModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteEmployeeHandler = async (id) => {
    return await EmployeeModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterEmployeeHandler,
    getAllEmployeeHandler,
    getEmployeeHandler,
    createEmployeeHandler,
    updateEmployeeHandler,
    deleteEmployeeHandler,
}
