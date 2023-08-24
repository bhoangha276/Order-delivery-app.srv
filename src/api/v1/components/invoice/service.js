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

    // FIND BY EMPLOYEE_ID
    const foundByEmployeeID = await InvoiceModel.findOne({
        orderID: new mongoose.Types.ObjectId(id),
    }).exec()
    if (foundByEmployeeID) {
        const data = foundByEmployeeID
        return data
    }

    return null
}

const createInvoiceHandler = async (newInvoiceData) => {
    return await InvoiceModel.create({
        ...newInvoiceData,
    })
}

const updateInvoiceHandler = async (id, updateInvoiceData) => {
    return await InvoiceModel.findOneAndUpdate({ _id: id }, updateInvoiceData, {
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
    createInvoiceHandler,
    updateInvoiceHandler,
    deleteInvoiceHandler,
}
