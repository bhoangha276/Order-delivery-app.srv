const bcrypt = require('bcryptjs')
const AccountModel = require('./account')
const tokenProvider = require('../../utilities/tokenProvider')
const HttpError = require('../../utilities/httpError')

const signUp = async (req, res, next) => {
    try {
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

        const token = tokenProvider.sign(newAccount._id)

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
    } catch (err) {
        res.status(400).send({
            success: 0,
            data: null,
            message: err.message || 'Something went wrong!',
        })
    }
}

const login = async (req, res) => {
    try {
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

        const token = tokenProvider.sign(existedAccount._id)

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
    } catch (err) {
        res.status(400).send({
            success: 0,
            data: null,
            message: err.message || 'Something went wrong!',
        })
    }
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
    signUp,
    login,
    getAccountInfo,
}
