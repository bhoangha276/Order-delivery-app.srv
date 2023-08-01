const TableModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllTables = async (req, res) => {
    const tables = await TableModel.find()
    // .populate({ path: 'tableID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: tables,
    })
}

// GET BY ID
const getTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const foundTable = await TableModel.findById(id)

    if (!foundTable) {
        throw new HttpError('Not found user!', 404)
    }

    res.send({
        success: 1,
        data: foundTable,
    })
}

// CREATE
const createTable = async (req, res) => {
    const newTableData = req.body

    const updatedTable = await TableModel.create({
        ...newTableData,
    })

    res.send({
        success: 1,
        id: updatedTable._id,
    })
}

// UPDATE
const updateTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const updateTableData = req.body

    const updatedTable = await TableModel.findOneAndUpdate(
        { _id: id },
        updateTableData,
        { new: true }
    )

    if (!updatedTable) {
        throw new HttpError('Not found table!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const deletedTable = await TableModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedTable) {
        throw new HttpError('Not found table!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllTables,
    getTable,
    createTable,
    updateTable,
    deleteTable,
}
