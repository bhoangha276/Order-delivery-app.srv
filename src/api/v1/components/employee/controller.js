const EmployeeModel = require('./model')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllEmployees = async (req, res) => {
    const employees = await EmployeeModel.find()
    // .populate({ path: 'employeeID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: employees,
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
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
