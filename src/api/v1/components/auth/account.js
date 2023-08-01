const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            // required: true,
        },
        email: { type: String, require: true },
        password: { type: String, require: true },
        role: { type: String, default: 'user' },
        token: { type: String },
        refreshToken: { type: String },
        emailVerified: { type: Boolean, default: 0 },
        phoneVerified: { type: Boolean, default: 0 },
        status: { type: Boolean, default: 1 },
    },
    {
        timestamp: true,
    }
)

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel
