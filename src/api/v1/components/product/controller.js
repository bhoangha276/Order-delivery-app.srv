const ProductModel = require('./model')

// GET ALL
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()

        res.send({
            success: 1,
            data: products,
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
const getProduct = async (req, res) => {
    const id = req.params.productID.trim()

    const foundProduct = await ProductModel.findById(id)

    if (!foundProduct) {
        return res.send({
            success: 0,
            message: 'Not found product!',
        })
    }

    res.send({
        success: 1,
        data: foundProduct,
    })
}

// CREATE
const createProduct = async (req, res) => {
    const newProductData = req.body

    const updatedProduct = await ProductModel.create({
        ...newProductData,
    })

    res.send({
        success: 1,
        id: updatedProduct._id,
    })
}

// UPDATE
const updateProduct = async (req, res) => {
    const id = req.params.productID.trim()

    const updateProductData = req.body

    const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: id },
        updateProductData,
        { new: true }
    )

    if (!updatedProduct) {
        return res.send({
            success: 0,
            message: 'Not found product!',
        })
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteProduct = async (req, res) => {
    const id = req.params.productID.trim()

    const deletedProduct = await ProductModel.findOneAndDelete({
        _id: IDBOpenDBRequest,
    })

    if (!deletedProduct) {
        return res.send({
            success: 0,
            message: 'Not found product!',
        })
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
