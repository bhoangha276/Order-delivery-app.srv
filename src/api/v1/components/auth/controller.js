const bcrypt = require('bcryptjs')
const AccountModel = require('./account')
const tokenProvider = require('../../utilities/tokenProvider')
const HttpError = require('../../utilities/httpError')

// GET ALL
const getAllAccounts = async (req, res) => {
    const accounts = await AccountModel.find()

    res.send({
        success: 1,
        data: accounts,
    })
}

// GET BY ID
const getAccount = async (req, res) => {
    const id = req.params.accountID.trim()

    const foundAccount = await AccountModel.findById(id)

    if (!foundAccount) {
        throw new HttpError('Not found account!', 404)
    }

    res.send({
        success: 1,
        data: foundAccount,
    })
}

// CREATE
const createAccount = async (req, res) => {
    const newAccountData = req.body

    const updatedAccount = await AccountModel.create({
        ...newAccountData,
    })

    res.send({
        success: 1,
        id: updatedAccount._id,
    })
}

// UPDATE
const updateAccount = async (req, res) => {
    const id = req.params.accountID.trim()

    const updateAccountData = req.body

    const updatedAccount = await AccountModel.findOneAndUpdate(
        { _id: id },
        updateAccountData,
        { new: true }
    )

    if (!updatedAccount) {
        throw new HttpError('Not found account!', 404)
    }

    res.send({
        success: 1,
    })
}

// DELETE
const deleteAccount = async (req, res) => {
    const id = req.params.accountID.trim()

    const deletedAccount = await AccountModel.findOneAndDelete({
        _id: id,
    })

    if (!deletedAccount) {
        throw new HttpError('Not found account!', 404)
    }

    res.send({
        success: 1,
    })
}

//SIGN UP
const signUp = async (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        throw new HttpError('Email field is not empty!', 422)
    }

    if (!password && password.length < 5) {
        throw new HttpError('Password 5 characters or longer!', 422)
    }

    const existedAccount = await AccountModel.findOne({ email })
    if (existedAccount) {
        throw new HttpError('This email address is already used!', 400)
    }

    //   const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 10)

    const newAccount = await AccountModel.create({
        email,
        password: hashPassword,
    })

    const token = tokenProvider.sign(newAccount._id, newAccount.role)

    res.send({
        success: 1,
        data: {
            _id: newAccount._id,
            role: newAccount.role,
            email: newAccount.email,
            email_verfied: newAccount.emailVerified,
            phone_verified: newAccount.phoneVerified,
            token: token,
        },
    })
}

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body
    const existedAccount = await AccountModel.findOne({ email })

    if (!existedAccount) {
        throw new HttpError('Login failed!.', 400)
    }

    const hastPassword = existedAccount.password
    const matchedPassword = await bcrypt.compare(password, hastPassword)

    if (!matchedPassword) {
        throw new HttpError('Login failed!', 400)
    }

    const token = tokenProvider.sign(existedAccount._id, existedAccount.role)

    res.send({
        success: 1,
        data: {
            _id: existedAccount._id,
            role: existedAccount.role,
            email: existedAccount.email,
            email_verfied: existedAccount.emailVerified,
            phone_verified: existedAccount.phoneVerified,
            token: token,
        },
    })
}

const getAccountInfo = async (req, res) => {
    const { account } = req
    const accountInfo = account
        ? {
              email: account.email,
              _id: account._id,
          }
        : null

    res.send({ success: 1, data: accountInfo })
}

module.exports = {
    getAllAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    signUp,
    login,
    getAccountInfo,
}
