const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        role: { type: String, trim: true, default: 'employee' },
        code: { type: Number, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
)
const EmployeeModel = mongoose.model('Employee', EmployeeSchema)

module.exports = EmployeeModel
