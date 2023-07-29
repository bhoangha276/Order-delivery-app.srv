const TableModel = require('./model')

// GET ALL
const getAllTables = async (req, res) => {
    try {
        const tables = await TableModel.find()
        // .populate({ path: 'tableID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: tables,
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
const getTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const foundTable = await TableModel.findById(id)

    if (!foundTable) {
        return res.send({
            success: 0,
            message: 'Not found table!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found table!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found table!',
        })
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
