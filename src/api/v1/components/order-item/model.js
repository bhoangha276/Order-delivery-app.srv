const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema(
    {
        orderID: {
            type: mongoose.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        productID: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: { type: Number, default: 1 },
        unitPrice: { type: Number, default: 0 },
    },
    { timestamps: true }
)
const OrderItemModel = mongoose.model('OrderItem', OrderItemSchema)

module.exports = OrderItemModel
