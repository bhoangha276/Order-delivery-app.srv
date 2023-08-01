const UserModel = require('./model')
const dateReg = /([12]\d{3}([-/.])(0[1-9]|1[0-2])([-/.])(0[1-9]|[12]\d|3[01]))$/
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllUsers = async (req, res) => {
    const users = await UserModel.find()
    // .populate({ path: 'userID', select: 'title' })
    // .populate('createdBy', 'username');

    res.send({
        success: 1,
        data: users,
    })
}

// GET BY ID
const getUser = async (req, res) => {
    const id = req.params.userID.trim()

    const foundUser = await UserModel.findById(id)

    if (!foundUser) {
        throw new HttpError('Not found user!', 404)
    }

    res.send({
        success: 1,
        data: foundUser,
    })
}

// CREATE
const createUser = async (req, res) => {
    const newUserData = req.body
    const checkPhone = newUserData.phone.length
    const checkBirthday = newUserData.birthday.match(dateReg)

    if (checkBirthday === null) {
        throw new HttpError('Wrong birthday!')
    }

    if (checkPhone != 10 && checkPhone !== 11) {
        throw new HttpError('Wrong phone number!')
    }

    const updatedUser = await UserModel.create({
        ...newUserData,
    })

    res.send({
        success: 1,
        id: updatedUser._id,
    })
}

// UPDATE
const updateUser = async (req, res) => {
    const id = req.params.userID.trim()

    const updateUserData = req.body
    const checkPhone = updateUserData.phone.length
    const checkBirthday = updateUserData.birthday.match(dateReg)

    if (checkBirthday === null) {
        throw new HttpError('Wrong birthday!')
    }

    if (checkPhone != 10 && checkPhone !== 11) {
        throw new HttpError('Wrong phone number!')
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        updateUserData,
        { new: true }
    )

    if (!updatedUser) {
        throw new HttpError('Not found user!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteUser = async (req, res) => {
    const id = req.params.userID.trim()

    const deletedUser = await UserModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedUser) {
        throw new HttpError('Not found user!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
