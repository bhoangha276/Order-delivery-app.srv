const ProductModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterProduct = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [{ name: { $regex: new RegExp(`${keyword}`, 'i') } }],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [products, total] = await Promise.all([
        ProductModel.find(filters),
        ProductModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: products,
        Total: total,
    })
}

// GET ALL
const getAllProducts = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const pagination = {
        page: page > 0 ? Number(page) : 1,
        limit: limit > 0 ? Number(limit) : 2,
    }
    pagination.skip = (pagination.page - 1) * pagination.limit

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortFieldParams = sortField
        ? {
              [sortField]: sortDirectionParams,
          }
        : { createdAt: sortDirectionParams }

    const [products, total] = await Promise.all([
        ProductModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        ProductModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

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
    const id = req.params.productID.trim()

    const foundProduct = await ProductModel.findById(id)

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
        throw new HttpError('Not found product!', 404)
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
