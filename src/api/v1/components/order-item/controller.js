const OrderItemHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllOrderItems = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [orderItems, pagination, totalPage, total] =
        await OrderItemHandler.getAllOrderIHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

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

    const foundOrderItem = await OrderItemHandler.getOrderIHandler(id)

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

    const updatedOrderItem = await OrderItemHandler.createOrderIHandler(
        newOrderItemData
    )

    res.send({
        success: 1,
        id: updatedOrderItem._id,
    })
}

// UPDATE
const updateOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const updateOrderItemData = req.body

    const updatedOrderItem = await OrderItemHandler.updateOrderIHandler(
        id,
        updateOrderItemData
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

    const deletedOrderItem = await OrderItemHandler.deleteOrderIHandler(id)

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
