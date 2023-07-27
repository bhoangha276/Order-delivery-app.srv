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
    const { employeeID } = req.params

    const foundEmployee = await EmployeeModel.findById(employeeID)

    if (foundEmployee === null) {
        return res.send({
            success: 0,
            msg: 'not found!',
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
    const { employeeID } = req.params

    const updateEmployeeData = req.body

    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { _id: employeeID },
        updateEmployeeData,
        { new: true }
    )

    if (!updatedEmployee) {
        throw new Error('Not found employee')
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteEmployee = async (req, res) => {
    const { employeeID } = req.params

    await EmployeeModel.findOneAndDelete({
        _id: employeeID,
    })

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
