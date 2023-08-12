const InvoiceModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterInvoice = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [{ method: { $regex: new RegExp(`${keyword}`, 'i') } }],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [invoices, total] = await Promise.all([
        InvoiceModel.find(filters),
        InvoiceModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: invoices,
        Total: total,
    })
}

// GET ALL
const getAllInvoices = async (req, res) => {
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

    const [invoices, total] = await Promise.all([
        InvoiceModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        InvoiceModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    res.send({
        success: 1,
        data: invoices,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getInvoice = async (req, res) => {
    const id = req.params.invoiceID.trim()

    const foundInvoice = await InvoiceModel.findById(id)

    if (!foundInvoice) {
        throw new HttpError('Not found invoice!', 404)
    }

    res.send({
        success: 1,
        data: foundInvoice,
    })
}

// CREATE
const createInvoice = async (req, res) => {
    const newInvoiceData = req.body

    const updatedInvoice = await InvoiceModel.create({
        ...newInvoiceData,
    })

    res.send({
        success: 1,
        id: updatedInvoice._id,
    })
}

// UPDATE
const updateInvoice = async (req, res) => {
    const id = req.params.invoiceID.trim()

    const updateInvoiceData = req.body

    const updatedInvoice = await InvoiceModel.findOneAndUpdate(
        { _id: id },
        updateInvoiceData,
        { new: true }
    )

    if (!updatedInvoice) {
        throw new HttpError('Not found invoice!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteInvoice = async (req, res) => {
    const id = req.params.invoiceID.trim()

    const deletedInvoice = await InvoiceModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedInvoice) {
        throw new HttpError('Not found invoice!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterInvoice,
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
}
