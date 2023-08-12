const TableModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterTable = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [
                  //   { number: { $regex: new RegExp(`${keyword}`, 'i') } },
                  //   { capacity: { $regex: new RegExp(`${keyword}`, 'i') } },
                  //   { status: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [tables, total] = await Promise.all([
        TableModel.find(filters),
        TableModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: tables,
        Total: total,
    })
}

// GET ALL
const getAllTables = async (req, res) => {
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

    const [tables, total] = await Promise.all([
        TableModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        TableModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

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

    const foundTable = await TableModel.findById(id)

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
    filterTable,
    getAllTables,
    getTable,
    createTable,
    updateTable,
    deleteTable,
}
