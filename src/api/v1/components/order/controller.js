const OrderModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllOrders = async (req, res) => {
    const orders = await OrderModel.find()
    // .populate({ path: 'orderID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: orders,
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
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
}
