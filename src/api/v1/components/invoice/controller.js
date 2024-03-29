const InvoiceHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterInvoice = async (req, res) => {
    const { keyword } = req.query

    const [invoices, total] = await InvoiceHandler.filterInvoiceHandler(keyword)

    res.send({
        success: 1,
        data: invoices,
        Total: total,
    })
}

// GET ALL
const getAllInvoices = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [invoices, pagination, totalPage, total] =
        await InvoiceHandler.getAllInvoiceHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

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
    const id = req.params.id.trim()

    const foundInvoice = await InvoiceHandler.getInvoiceHandler(id)
    if (!foundInvoice) {
        throw new HttpError('Not found invoice!', 404)
    }

    res.send({
        success: 1,
        data: foundInvoice,
    })
}

const getRevenue = async (req, res) => {
    const { year, month } = req.query

    const getRevenue = await InvoiceHandler.getRevenueHandler(year, month)
    if (!getRevenue) {
        throw new HttpError('Error get revenue!', 404)
    }

    res.send({
        success: 1,
        data: getRevenue,
    })
}

// CREATE
const createInvoice = async (req, res) => {
    const newInvoiceData = req.body

    const newInvoice = await InvoiceHandler.createInvoiceHandler(newInvoiceData)

    res.send({
        success: 1,
        id: newInvoice._id,
    })
}

// UPDATE
const updateInvoice = async (req, res) => {
    const id = req.params.invoiceID.trim()

    const updateInvoiceData = req.body

    const updatedInvoice = await InvoiceHandler.updateInvoiceHandler(
        id,
        updateInvoiceData
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

    const deletedInvoice = await InvoiceHandler.deleteInvoiceHandler(id)

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
    getRevenue,
    createInvoice,
    updateInvoice,
    deleteInvoice,
}
