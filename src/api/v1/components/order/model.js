const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        employeeID: {
            type: mongoose.Types.ObjectId,
            ref: 'Employee',
        },
        tableID: {
            type: mongoose.Types.ObjectId,
            ref: 'Table',
            default: null,
        },
        orderCode: { type: String, trim: true },
        address: { type: String, trim: true, default: '' },
        dateTime: { type: Date },
        status: { type: Number, default: 0 },
    },
    { timestamps: true }
)

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel
