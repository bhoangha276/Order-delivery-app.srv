const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema(
    {
        orderID: {
            type: mongoose.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        cost: { type: Number },
        method: { type: String, required: true },
        status: { type: Boolean, default: 0 },
    },
    { timestamps: true }
)

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)

module.exports = InvoiceModel
