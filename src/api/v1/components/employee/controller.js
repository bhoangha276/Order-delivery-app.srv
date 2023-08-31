const EmployeeHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterEmployee = async (req, res) => {
    const { keyword } = req.query

    const [employees, total] = await EmployeeHandler.filterEmployeeHandler(
        keyword
    )

    res.send({
        success: 1,
        data: employees,
        Total: total,
    })
}

// GET ALL
const getAllEmployees = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [employees, pagination, totalPage, total] =
        await EmployeeHandler.getAllEmployeeHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

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

    const foundEmployee = await EmployeeHandler.getEmployeeHandler(id)

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

    const newEmployee = await EmployeeHandler.createEmployeeHandler(
        newEmployeeData
    )

    res.send({
        success: 1,
        id: newEmployee._id,
    })
}

// UPDATE
const updateEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const updateEmployeeData = req.body

    const updatedEmployee = await EmployeeHandler.updateEmployeeHandler(
        id,
        updateEmployeeData
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

    const deletedEmployee = await EmployeeHandler.deleteEmployeeHandler(id)
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
