const OrderModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterOrder = async (req, res) => {
    const { keyword } = req.query
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

    const [orders, total] = await Promise.all([
        OrderModel.find(filters),
        OrderModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: orders,
        Total: total,
    })
}

// GET ALL
const getAllOrders = async (req, res) => {
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

    const [orders, total] = await Promise.all([
        OrderModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        OrderModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    res.send({
        success: 1,
        data: orders,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getOrder = async (req, res) => {
    const id = req.params.orderID.trim()

    const foundOrder = await OrderModel.findById(id)

    if (!foundOrder) {
        throw new HttpError('Not found order!', 404)
    }

    res.send({
        success: 1,
        data: foundOrder,
    })
}

// CREATE
const createOrder = async (req, res) => {
    const newOrderData = req.body

    const updatedOrder = await OrderModel.create({
        ...newOrderData,
    })

    res.send({
        success: 1,
        id: updatedOrder._id,
    })
}

// UPDATE
const updateOrder = async (req, res) => {
    const id = req.params.orderID.trim()

    const updateOrderData = req.body

    const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: id },
        updateOrderData,
        { new: true }
    )

    if (!updatedOrder) {
        throw new HttpError('Not found order!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteOrder = async (req, res) => {
    const id = req.params.orderID.trim()

    const deletedOrder = await OrderModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedOrder) {
        throw new HttpError('Not found order!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterOrder,
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
}
