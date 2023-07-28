const EmployeeModel = require('./model')

// GET ALL
const getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find()
        // .populate({ path: 'employeeID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: employees,
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
const getEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const foundEmployee = await EmployeeModel.findById(id)

    if (!foundEmployee) {
        return res.send({
            success: 0,
            message: 'Not found employee!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found employee!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found employee!',
        })
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
