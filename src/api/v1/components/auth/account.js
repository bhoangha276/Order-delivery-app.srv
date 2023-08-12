const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema(
    {
        employeeID: {
            type: mongoose.Types.ObjectId,
            ref: 'Employee',
            default: undefined,
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: undefined,
        },
        email: { type: String, require: true },
        password: { type: String, require: true },
        role: {
            type: String,
            enum: ['admin', 'employee', 'user'],
            default: 'user',
        },
        token: { type: String },
        refreshToken: { type: String },
        emailVerified: { type: Boolean, default: 0 },
        phoneVerified: { type: Boolean, default: 0 },
        status: { type: Boolean, default: 1 },
    },
    { timestamp: true }
)

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel
