const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema(
    {
        position: { type: String, trim: true },
        name: { type: String, trim: true, required: true },
        gender: { type: String, enum: ['male', 'female'], trim: true },
        birthday: { type: Date },
        phone: {
            type: String,
            trim: true,
            minLength: [10, 'Wrong phone number!'],
            maxLength: [11, 'Wrong phone number!'],
            required: true,
        },
        photo: { type: String, trim: true },
    },
    { timestamps: true }
)
const EmployeeModel = mongoose.model('Employee', EmployeeSchema)

module.exports = EmployeeModel
