const OrderItemModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllOrderItems = async (req, res) => {
    const orderItems = await OrderItemModel.find()
    // .populate({ path: 'orderItemID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: orderItems,
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
