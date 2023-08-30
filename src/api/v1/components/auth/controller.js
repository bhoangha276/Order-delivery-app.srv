const AccountHandler = require('./service')
const tokenProvider = require('../../utilities/tokenProvider')
const HttpError = require('../../utilities/httpError')

// FILTER
const filterAccount = async (req, res) => {
    const { keyword } = req.query

    const [accounts, total] = await AccountHandler.filterAccountHandler(keyword)

    res.send({
        success: 1,
        data: accounts,
        Total: total,
    })
}

// GET ALL
const getAllAccounts = async (req, res) => {
    const { page, limit, sortDirection, sortField } = req.query

    const [accounts, pagination, totalPage, total] =
        await AccountHandler.getAllAccountHandler(
            page,
            limit,
            sortDirection,
            sortField
        )

    res.send({
        success: 1,
        data: accounts,
        Paging: {
            CurrentPage: pagination.page,
            Limit: pagination.limit,
            TotalPage: totalPage,
            Total: total,
        },
    })
}

// GET BY ID
const getAccount = async (req, res) => {
    const id = req.params.id.trim()

    const account = await AccountHandler.getAccountHandler(id)

    if (!account) {
        throw new HttpError('Not found account!', 404)
    }

    res.send({
        success: 1,
        data: account,
    })
}

// CREATE
const createAccount = async (req, res) => {
    const newAccountData = req.body

    const updatedAccount = await AccountHandler.createAccountHandler(
        newAccountData
    )

    res.send({
        success: 1,
        id: updatedAccount._id,
    })
}

// UPDATE
const updateAccount = async (req, res) => {
    const id = req.params.accountID.trim()

    const updateAccountData = req.body

    const updatedAccount = await AccountHandler.updateAccountHandler(
        id,
        updateAccountData
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

    const deletedAccount = await AccountHandler.deleteAccountHandler(id)

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

    const newAccount = await AccountHandler.signUpHandler(email, password)

    const token = await tokenProvider.sign(newAccount._id, newAccount.role)

    // Send email to verify
    const result = await AccountHandler.sendEmailHandler(newAccount, token)
    console.log(result)

    res.send({
        success: 1,
        data: {
            _id: newAccount._id,
            token: token,
        },
        message: 'An Email sent to your account please verify!',
    })
}

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body

    const [existedAccount, matchedPassword] = await AccountHandler.loginHandler(
        email,
        password
    )

    if (!existedAccount.emailVerified) {
        throw new HttpError('Your email has not been verified!', 400)
    }

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

const verifyAccount = async (req, res) => {
    const { accountID, token } = req.params

    const verifiedAccount = await AccountHandler.verifyAccountHandler(
        accountID,
        token
    )

    if (!verifiedAccount) {
        throw new HttpError('Not found account!', 404)
    }

    res.send({
        success: 1,
        message: 'Email verified sucessfully',
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
    filterAccount,
    getAllAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,

    signUp,
    login,
    verifyAccount,
    getAccountInfo,
}
