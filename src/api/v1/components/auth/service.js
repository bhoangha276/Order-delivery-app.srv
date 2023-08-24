const bcrypt = require('bcryptjs')
const AccountModel = require('./account')
const mongoose = require('mongoose')

const filterAccountHandler = async (keyword) => {
    const filter = keyword
        ? {
              $or: [
                  { email: { $regex: new RegExp(`${keyword}`, 'i') } },
                  { role: { $regex: new RegExp(`${keyword}`, 'i') } },
              ],
          }
        : {}

    const filters = {
        ...filter,
    }

    return ([accounts, total] = await Promise.all([
        AccountModel.find(filters),
        AccountModel.find(filters).countDocuments(),
    ]))
}

const getAllAccountHandler = async (page, limit, sortDirection, sortField) => {
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

    const [accounts, total] = await Promise.all([
        AccountModel.find()
            .sort(sortFieldParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        AccountModel.find().countDocuments(),
    ])

    let totalPage = Math.ceil(total / pagination.limit)

    return [accounts, pagination, totalPage, total]
}

const getAccountHandler = async (id) => {
    // FIND BY ID
    const foundByID = await AccountModel.findById(id)
    if (foundByID) {
        const data = foundByID
        return data
    }

    // FIND BY EMPLOYEE_ID
    const foundByEmployeeID = await AccountModel.findOne({
        employeeID: new mongoose.Types.ObjectId(id),
    }).exec()
    if (foundByEmployeeID) {
        const data = foundByEmployeeID
        return data
    }

    return null
}

const createAccount = async (newAccountData) => {
    return await AccountModel.create({
        ...newAccountData,
    })
}

const updateAccountHandler = async (id, updateAccountData) => {
    return await AccountModel.findOneAndUpdate({ _id: id }, updateAccountData, {
        new: true,
    })
}

const deleteAccountHandler = async (id) => {
    return await AccountModel.findOneAndDelete({
        _id: id,
    })
}

const signUpHandler = async (email, password) => {
    const existedAccount = await AccountModel.findOne({ email })
    if (existedAccount) {
        throw new HttpError('This email address is already used!', 400)
    }

    //   const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 10)

    return await AccountModel.create({
        email,
        password: hashPassword,
    })
}

const loginHandler = async (email, password) => {
    const existedAccount = await AccountModel.findOne({ email })

    if (!existedAccount) {
        throw new HttpError('Login failed!.', 400)
    }

    const hastPassword = existedAccount.password
    const matchedPassword = await bcrypt.compare(password, hastPassword)

    return [existedAccount, matchedPassword]
}

module.exports = {
    filterAccountHandler,
    getAllAccountHandler,
    getAccountHandler,
    createAccount,
    updateAccountHandler,
    deleteAccountHandler,
    signUpHandler,
    loginHandler,
}
