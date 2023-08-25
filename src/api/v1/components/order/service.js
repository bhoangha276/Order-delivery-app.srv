const OrderModel = require('./model')
const mongoose = require('mongoose')

const filterOrderHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [
                  { orderCode: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { address: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([orders, total] = await Promise.all([
        OrderModel.find(filters),
        OrderModel.find(filters).countDocuments(),
    ]))
}

const getAllOrderHandler = async (page, limit, sortDirection, sortField) => {
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

    const [orders, total] = await Promise.all([
        OrderModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        OrderModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [orders, pagination, totalPage, total]
}

const getOrderHandler = async (id) => {
    // FIND BY ID
    const foundByID = await OrderModel.findById(id)
    if (foundByID) {
        const data = foundByID
        return data
    }

    // FIND BY EMPLOYEE_ID || USER_ID
    const foundOrder = await OrderModel.find({
        $or: [
            { employeeID: new mongoose.Types.ObjectId(id) },
            { userID: new mongoose.Types.ObjectId(id) },
        ],
    })

    if (foundOrder) {
        return (data = foundOrder)
    }

    return null
}

const createOrderHandler = async (data) => {
    return await OrderModel.create({
        ...data,
    })
}

const updateOrderHandler = async (id, data) => {
    return await OrderModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteOrderHandler = async (id) => {
    return await OrderModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterOrderHandler,
    getAllOrderHandler,
    getOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    deleteOrderHandler,
}
