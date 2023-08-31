const OrderHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterOrder = async (req, res) => {
    const { keyword } = req.query

    const [orders, total] = await OrderHandler.filterOrderHandler(keyword)

    res.send({
        success: 1,
        data: orders,
        Total: total,
    })
}

// GET ALL
const getAllOrders = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [orders, pagination, totalPage, total] =
        await OrderHandler.getAllOrderHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

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
    const id = req.params.id.trim()

    const foundOrder = await OrderHandler.getOrderHandler(id)

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

    const newOrder = await OrderHandler.createOrderHandler(newOrderData)

    res.send({
        success: 1,
        id: newOrder._id,
    })
}

// UPDATE
const updateOrder = async (req, res) => {
    const id = req.params.orderID.trim()

    const updateOrderData = req.body

    const updatedOrder = await OrderHandler.updateOrderHandler(
        id,
        updateOrderData
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

    const deletedOrder = await OrderHandler.deleteOrderHandler(id)

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
