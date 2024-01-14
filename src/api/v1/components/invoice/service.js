const InvoiceModel = require('./model')
const mongoose = require('mongoose')

const filterInvoiceHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [{ method: { $regex: new RegExp(`${keyword}`, 'i') } }],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([invoices, total] = await Promise.all([
        InvoiceModel.find(filters),
        InvoiceModel.find(filters).countDocuments(),
    ]))
}

const getAllInvoiceHandler = async (page, limit, sortDirection, sortField) => {
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

    const [invoices, total] = await Promise.all([
        InvoiceModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        InvoiceModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [invoices, pagination, totalPage, total]
}

const getInvoiceHandler = async (id) => {
    // FIND BY ID
    const foundByID = await InvoiceModel.findById(id)
    if (foundByID) {
        const data = foundByID
        return data
    }

    // FIND BY ORDER_ID
    const foundByOrderID = await InvoiceModel.findOne({
        orderID: new mongoose.Types.ObjectId(id),
    })
    if (foundByOrderID) {
        const data = foundByOrderID
        return data
    }

    return null
}

const getRevenueHandler = async (year, month) => {
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
                year: { $year: '$createdAt' },
                month: month === 'true' ? { $month: '$createdAt' } : null,
            },
            totalCost: { $sum: '$cost' },
            quantity: { $sum: 1 },
        },
    }

    return await InvoiceModel.aggregate([match, group])
}

const createInvoiceHandler = async (data) => {
    return await InvoiceModel.create({
        ...data,
    })
}

const updateInvoiceHandler = async (id, data) => {
    return await InvoiceModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteInvoiceHandler = async (id) => {
    return await InvoiceModel.findOneAndDelete({
        _id: id,
    })
}

module.exports = {
    filterInvoiceHandler,
    getAllInvoiceHandler,
    getInvoiceHandler,
    getRevenueHandler,
    createInvoiceHandler,
    updateInvoiceHandler,
    deleteInvoiceHandler,
}
