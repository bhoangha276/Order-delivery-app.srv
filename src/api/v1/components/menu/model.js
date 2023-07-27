const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, reqiured: true },
        category: { type: String, trim: true },
        startDate: { type: Number, default: 0 },
        endDate: { type: Number, default: 0 },
    },
    { timestamps: true }
)
const MenuModel = mongoose.model('Menu', MenuSchema)

module.exports = MenuModel
