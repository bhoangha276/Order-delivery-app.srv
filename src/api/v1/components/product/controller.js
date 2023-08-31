const ProductHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterProduct = async (req, res) => {
    const { keyword } = req.query

    const [products, total] = await ProductHandler.filterProductHandler(keyword)

    res.send({
        success: 1,
        data: products,
        Total: total,
    })
}

// GET ALL
const getAllProducts = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [products, pagination, totalPage, total] =
        await ProductHandler.getAllProductHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: products,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getProduct = async (req, res) => {
    const id = req.params.id.trim()

    const foundProduct = await ProductHandler.getProductHandler(id)

    if (!foundProduct) {
        throw new HttpError('Not found product!', 404)
    }

    res.send({
        success: 1,
        data: foundProduct,
    })
}

// CREATE
const createProduct = async (req, res) => {
    const newProductData = req.body

    const newProduct = await ProductHandler.createProductHandler(newProductData)

    res.send({
        success: 1,
        id: newProduct._id,
    })
}

// UPDATE
const updateProduct = async (req, res) => {
    const id = req.params.productID.trim()

    const updateProductData = req.body

    const updatedProduct = await ProductHandler.updateProductHandler(
        id,
        updateProductData
    )

    if (!updatedProduct) {
        throw new HttpError('Not found product!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteProduct = async (req, res) => {
    const id = req.params.productID.trim()

    const deletedProduct = await ProductHandler.deleteProductHandler(id)

    if (!deletedProduct) {
        throw new HttpError('Not found product!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterProduct,
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
