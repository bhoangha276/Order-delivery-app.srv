const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        address: { type: Array, default: [] },
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
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
