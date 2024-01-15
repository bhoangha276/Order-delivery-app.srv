const OrderItemModel = require('./model')
const mongoose = require('mongoose')

const getAllOrderIHandler = async (page, limit, sortDirection, sortField) => {
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

    const [orderItems, total] = await Promise.all([
        OrderItemModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        OrderItemModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [orderItems, pagination, totalPage, total]
}

const getOrderIHandler = async (id) => {
    // FIND BY ID
    const foundByID = await OrderItemModel.findById(id)
    if (foundByID) {
        const data = foundByID
        return data
    }

    // FIND BY ORDER_ID
    const foundByOrderID = await OrderItemModel.findOne({
        orderID: new mongoose.Types.ObjectId(id),
    })
    if (foundByOrderID) {
        const data = foundByOrderID
        return data
    }

    return null
}

const getBestProductsHandler = async (year, month) => {
    const match = {
        $match: {
            createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
            },
        },
    }

    const group = {
        $group: {
            _id: {
                productID: '$productID',
                name: '',
                year: { $year: '$createdAt' },
                month: month === 'true' ? { $month: '$createdAt' } : null,
            },
            totalQuantity: { $sum: '$quantity' },
            totalPrice: { $sum: '$unitPrice' },
        },
    }

    const sort = {
        $sort: {
            totalQuantity: -1,
        },
    }

    const limit = {
        $limit: 5,
    }

    return await OrderItemModel.aggregate([match, group, sort, limit])
}

const createOrderIHandler = async (data) => {
    return await OrderItemModel.create({
        ...data,
    })
}

const updateOrderIHandler = async (id, data) => {
    return await OrderItemModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteOrderIHandler = async (id) => {
    return await OrderItemModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    getAllOrderIHandler,
    getOrderIHandler,
    getBestProductsHandler,
    createOrderIHandler,
    updateOrderIHandler,
    deleteOrderIHandler,
}
