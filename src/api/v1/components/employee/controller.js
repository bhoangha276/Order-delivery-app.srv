const EmployeeModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterEmployee = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [
                  { name: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { position: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { gender: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { phone: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [employees, total] = await Promise.all([
        EmployeeModel.find(filters),
        EmployeeModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: employees,
        Total: total,
    })
}

// GET ALL
const getAllEmployees = async (req, res) => {
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

    const [employees, total] = await Promise.all([
        EmployeeModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        EmployeeModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    res.send({
        success: 1,
        data: employees,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const foundEmployee = await EmployeeModel.findById(id)

    if (!foundEmployee) {
        throw new HttpError('Not found employee!', 404)
    }

    res.send({
        success: 1,
        data: foundEmployee,
    })
}

// CREATE
const createEmployee = async (req, res) => {
    const newEmployeeData = req.body

    const updatedEmployee = await EmployeeModel.create({
        ...newEmployeeData,
    })

    res.send({
        success: 1,
        id: updatedEmployee._id,
    })
}

// UPDATE
const updateEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const updateEmployeeData = req.body

    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { _id: id },
        updateEmployeeData,
        { new: true }
    )

    if (!updatedEmployee) {
        throw new HttpError('Not found employee!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const deletedEmployee = await EmployeeModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedEmployee) {
        throw new HttpError('Not found employee!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterEmployee,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
