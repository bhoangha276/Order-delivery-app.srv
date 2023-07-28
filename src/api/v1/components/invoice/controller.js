const InvoiceModel = require('./model')

// GET ALL
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceModel.find()
        // .populate({ path: 'invoiceID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: invoices,
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
const getInvoice = async (req, res) => {
    const id = req.params.invoiceID.trim()

    const foundInvoice = await InvoiceModel.findById(id)

    if (!foundInvoice) {
        return res.send({
            success: 0,
            message: 'Not found invoice!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found invoice!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found invoice!',
        })
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
