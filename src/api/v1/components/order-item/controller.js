const OrderItemModel = require('./model')

// GET ALL
const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItemModel.find()
        // .populate({ path: 'orderItemID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: orderItems,
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
const getOrderItem = async (req, res) => {
    const id = req.params.orderItemID.trim()

    const foundOrderItem = await OrderItemModel.findById(id)

    if (!foundOrderItem) {
        return res.send({
            success: 0,
            message: 'Not found order-item!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found order-item!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found order-item!',
        })
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
