const bcrypt = require('bcryptjs')
const EmployeeModel = require('./model')
const tokenProvider = require('../../utilities/tokenProvider')
const HttpError = require('../../utilities/httpError')

//LOGIN MANAGE
const manage = async (req, res) => {
    const { code, password } = req.body
    const existedEmployee = await EmployeeModel.findOne({ code })

    if (!existedEmployee) {
        throw new HttpError('Login failed!.', 400)
    }

    const hastPassword = existedEmployee.password
    const matchedPassword = await bcrypt.compare(password, hastPassword)

    if (!matchedPassword) {
        throw new HttpError('Login failed!', 400)
    }

    const token = tokenProvider.sign(existedEmployee._id)

    res.send({
        success: 1,
        data: {
            _id: existedEmployee._id,
            name: existedEmployee.name,
            role: existedEmployee.role,
            code: existedEmployee.code,
            token: token,
        },
    })
}

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
    const { name, role, code, password } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    const newEmployeeData = { name, role, code }

    const updatedEmployee = await EmployeeModel.create({
        ...newEmployeeData,
        password: hashPassword,
    })

    res.send({
        success: 1,
        id: updatedEmployee._id,
    })
}

// UPDATE
const updateEmployee = async (req, res) => {
    const id = req.params.employeeID.trim()

    const { name, role, code, password } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    const updateEmployeeData = {
        name: name,
        role: role,
        code: code,
        password: hashPassword,
    }

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
    manage,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
