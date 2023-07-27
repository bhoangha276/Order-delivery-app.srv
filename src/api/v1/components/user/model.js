const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, reqiured: true },
        gender: { type: String, trim: true },
        birthday: { type: Date },
        phone: { type: String, trim: true, minLength: 10, maxLength: 11 },
        avatar: { type: String, trim: true },
    },
    { timestamps: true }
)
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
