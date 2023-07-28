const UserModel = require('./model')
const dateReg = /([12]\d{3}([-/.])(0[1-9]|1[0-2])([-/.])(0[1-9]|[12]\d|3[01]))$/

// GET ALL
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        // .populate({ path: 'userID', select: 'title' })
        // .populate('createdBy', 'username');

        res.send({
            success: 1,
            data: users,
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
const getUser = async (req, res) => {
    const id = req.params.userID.trim()

    const foundUser = await UserModel.findById(id)

    if (!foundUser) {
        return res.send({
            success: 0,
            message: 'Not found user!',
        })
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
        return res.send({
            success: 0,
            message: 'Wrong birthday!',
        })
    }

    if (checkPhone != 10 && checkPhone !== 11) {
        return res.send({
            success: 0,
            message: 'Wrong phone number!',
        })
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
        return res.send({
            success: 0,
            message: 'Wrong birthday!',
        })
    }

    if (checkPhone != 10 && checkPhone !== 11) {
        return res.send({
            success: 0,
            message: 'Wrong phone number!',
        })
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        updateUserData,
        { new: true }
    )

    if (!updatedUser) {
        return res.send({
            success: 0,
            message: 'Not found user!',
        })
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
        return res.send({
            success: 0,
            message: 'Not found user!',
        })
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
