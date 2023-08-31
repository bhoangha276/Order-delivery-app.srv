const UserHandler = require('./service')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterUser = async (req, res) => {
    const { keyword } = req.query

    const [users, total] = await UserHandler.filterUserHandler(keyword)

    res.send({
        success: 1,
        data: users,
        Total: total,
    })
}

// GET ALL
const getAllUsers = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [users, pagination, totalPage, total] =
        await UserHandler.getAllUserHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: users,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getUser = async (req, res) => {
    const id = req.params.userID.trim()

    const foundUser = await UserHandler.getUserHandler(id)

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

    const newUser = await UserHandler.createUserHandler(newUserData)

    res.send({
        success: 1,
        id: newUser._id,
    })
}

// UPDATE
const updateUser = async (req, res) => {
    const id = req.params.userID.trim()

    const updateUserData = req.body

    const updatedUser = await UserHandler.updateUserHandler(id, updateUserData)

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

    const deletedUser = await UserHandler.deleteUserHandler(id)

    if (!deletedUser) {
        throw new HttpError('Not found user!', 404)
    }

    res.send({
        success: 1,
    })
}

module.exports = {
    filterUser,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
