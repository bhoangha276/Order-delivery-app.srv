const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        employeeID: {
            type: mongoose.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tableID: {
            type: mongoose.Types.ObjectId,
            ref: 'Table',
        },
        orderCode: { type: Number },
        dateTime: { type: Date },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
)

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel
