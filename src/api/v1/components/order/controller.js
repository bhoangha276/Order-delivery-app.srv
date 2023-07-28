const OrderModel = require('./model')

// GET ALL
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        // .populate({ path: 'orderID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: orders,
        })
    } catch (err) {
        res.status(400).send({
            success: 0,
            data: null,
            message: err.message || 'Something went wrong',
        })
    }
}

// GET BY ID
const getOrder = async (req, res) => {
    const id = req.params.orderID.trim()

    const foundOrder = await OrderModel.findById(id)

    if (!foundOrder) {
        return res.send({
            success: 0,
            message: 'Not found order!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found order!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found order!',
        })
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
