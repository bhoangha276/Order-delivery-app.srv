const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema(
    {
        number: { type: Number, required: true },
        ordinalOfGuest: { type: Number },
        capacity: { type: Number, default: 1 },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
)
const TableModel = mongoose.model('Table', TableSchema)

module.exports = TableModel
