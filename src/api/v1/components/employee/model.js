const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        role: { type: String, trim: true, default: 'user' },
        code: { type: Number, default: 0 },
        password: { type: String, default: 0 },
    },
    { timestamps: true }
)
const EmployeeModel = mongoose.model('Employee', EmployeeSchema)

module.exports = EmployeeModel
