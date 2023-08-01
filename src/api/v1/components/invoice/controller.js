const InvoiceModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllInvoices = async (req, res) => {
    const invoices = await InvoiceModel.find()
    // .populate({ path: 'invoiceID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: invoices,
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
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
}
