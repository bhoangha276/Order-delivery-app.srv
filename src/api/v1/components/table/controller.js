const TableHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterTable = async (req, res) => {
    const { keyword } = req.query

    const [tables, total] = await TableHandler.filterTableHandler(keyword)

    res.send({
        success: 1,
        data: tables,
        Total: total,
    })
}

// GET ALL
const getAllTables = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [tables, pagination, totalPage, total] =
        await TableHandler.getAllTableHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: tables,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const foundTable = await TableHandler.getTableHandler(id)

    if (!foundTable) {
        throw new HttpError('Not found table!', 404)
    }

    res.send({
        success: 1,
        data: foundTable,
    })
}

// CREATE
const createTable = async (req, res) => {
    const newTableData = req.body

    const newTable = await TableHandler.createTableHandler(newTableData)

    res.send({
        success: 1,
        id: newTable._id,
    })
}

// UPDATE
const updateTable = async (req, res) => {
    const id = req.params.tableID.trim()

    const updateTableData = req.body

    const updatedTable = await TableHandler.updateTableHandler(
        id,
        updateTableData
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

    const deletedTable = await TableHandler.deleteTableHandler(id)

    if (!deletedTable) {
        throw new HttpError('Not found table!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterTable,
    getAllTables,
    getTable,
    createTable,
    updateTable,
    deleteTable,
}
