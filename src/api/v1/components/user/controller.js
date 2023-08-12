const UserModel = require('./model')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterUser = async (req, res) => {
    const { keyword } = req.query
    const filter = keyword
        ? {
              $or: [
                  { name: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { address: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { gender: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { phone: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    const [users, total] = await Promise.all([
        UserModel.find(filters),
        UserModel.find(filters).countDocuments(),
    ])

    res.send({
        success: 1,
        data: users,
        Total: total,
    })
}

// GET ALL
const getAllUsers = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const pagination = {
        page: page > 0 ? Number(page) : 1,
        limit: limit > 0 ? Number(limit) : 2,
    }
    pagination.skip = (pagination.page - 1) * pagination.limit

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1
    const sortFieldParams = sortField
        ? {
              [sortField]: sortDirectionParams,
          }
        : { createdAt: sortDirectionParams }

    const [users, total] = await Promise.all([
        UserModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        UserModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

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
    filterUser,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
