const tokenProvider = require('../utilities/tokenProvider')
const AccountModel = require('../components/auth/account')
const HttpError = require('../utilities/httpError')

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        throw new HttpError('Not have token!', 401)
    }
    const identityData = tokenProvider.verify(token)

    if (!identityData.id) {
        throw new HttpError('Invalid token!', 401)
    }

    const existedAccount = await AccountModel.findById(identityData.id)

    if (!existedAccount) {
        throw new HttpError('Not found account!', 401)
    }

    const isAdmin = existedAccount.role

    if (!isAdmin || isAdmin != 'admin') {
        throw new HttpError('Permission denied!', 401)
    }

    req.account = existedAccount
    next()
}

module.exports = isAuth
