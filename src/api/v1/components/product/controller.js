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
    const { productID } = req.params

    const foundProduct = await ProductModel.findById(productID)

    if (foundProduct === null) {
        return res.send({
            success: 0,
            msg: 'not found!',
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
    const { productID } = req.params

    const updateProductData = req.body

    const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: productID },
        updateProductData,
        { new: true }
    )

    if (!updatedProduct) {
        throw new Error('Not found product')
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteProduct = async (req, res) => {
    const { productID } = req.params

    await ProductModel.findOneAndDelete({
        _id: productID,
    })

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
