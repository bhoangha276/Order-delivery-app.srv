const ProductModel = require('./model')
const mongoose = require('mongoose')

const filterProductHandler = async (name, tag) => {
    let filter = {}
    if (name) {
        filter = {
            $or: [{ name: { $regex: new RegExp(`${name}`, 'i') } }],
        }
    }

    if (tag) {
        filter = {
            $or: [{ tags: { $regex: new RegExp(`${tag}`, 'i') } }],
        }
    }

    const filters = {
        ...filter,
    }

    return ([products, total] = await Promise.all([
        ProductModel.find(filters),
        ProductModel.find(filters).countDocuments(),
    ]))
}

const getAllProductHandler = async (page, limit, sortDirection, sortField) => {
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

    return [products, pagination, totalPage, total]
}

const getProductHandler = async (id) => {
    // FIND BY ID
    const foundByID = await ProductModel.findById(id)
    if (foundByID) {
        const data = foundByID
        return data
    }

    // FIND BY MENU_ID
    const foundByMenuID = await ProductModel.findOne({
        menuID: new mongoose.Types.ObjectId(id),
    })
    if (foundByMenuID) {
        const data = foundByMenuID
        return data
    }

    return null
}

const createProductHandler = async (data) => {
    return await ProductModel.create({
        ...data,
    })
}

const updateProductHandler = async (id, data) => {
    return await ProductModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteProductHandler = async (id) => {
    return await ProductModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterProductHandler,
    getAllProductHandler,
    getProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
}
