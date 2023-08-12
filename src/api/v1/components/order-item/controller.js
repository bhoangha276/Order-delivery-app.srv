const OrderItemModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllOrderItems = async (req, res) => {
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

    const [orderItems, total] = await Promise.all([
        OrderItemModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        OrderItemModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    res.send({
        success: 1,
        data: orderItems,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const foundOrderItem = await OrderItemModel.findById(id)

    if (!foundOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
        data: foundOrderItem,
    })
}

// CREATE
const createOrderItem = async (req, res) => {
    const newOrderItemData = req.body

    const updatedOrderItem = await OrderItemModel.create({
        ...newOrderItemData,
    })

    res.send({
        success: 1,
        id: updatedOrderItem._id,
    })
}

// UPDATE
const updateOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const updateOrderItemData = req.body

    const updatedOrderItem = await OrderItemModel.findOneAndUpdate(
        { _id: id },
        updateOrderItemData,
        { new: true }
    )

    if (!updatedOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const deletedOrderItem = await OrderItemModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedOrderItem) {
        throw new HttpError('Not found order-item!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllOrderItems,
    getOrderItem,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
}
