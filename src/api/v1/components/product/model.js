const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        menuID: { type: mongoose.Types.ObjectId, ref: 'Menu' },
        name: { type: String, trim: true, reqiured: true },
        price: { type: Number, reqiured: true },
        imageUrl: { type: String, trim: true, reqiured: true },
    },
    { timestamps: true }
)
const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel
