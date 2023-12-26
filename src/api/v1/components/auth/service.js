const bcrypt = require('bcryptjs')
const AccountModel = require('./account')
const mongoose = require('mongoose')

const config = require('../../config')
const mail = require('../../utilities/mail')
// const googleApis = require('../../utilities/googleApis')
const tokenProvider = require('../../utilities/tokenProvider')

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

    // FIND BY EMPLOYEE_ID || USER_ID
    const foundAccount = await AccountModel.findOne({
        $or: [
            { employeeID: new mongoose.Types.ObjectId(id) },
            { userID: new mongoose.Types.ObjectId(id) },
        ],
    })

    if (foundAccount) {
        return (data = foundAccount)
    }

    return null
}

const createAccountHandler = async (data) => {
    return await AccountModel.create({
        ...data,
    })
}

const updateAccountHandler = async (id, data) => {
    return await AccountModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
}

const deleteAccountHandler = async (id) => {
    return await AccountModel.findOneAndDelete({
        _id: id,
    })
}

const signUpHandler = async (userID, email, password) => {
    const existedAccount = await AccountModel.findOne({ email })
    if (existedAccount) {
        throw new Error('This email address is already used!', 400)
    }

    //   const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 10)

    return await AccountModel.create({
        userID,
        email,
        password: hashPassword,
    })
}

const sendEmailHandler = async (username, account, token) => {
    const address = account.email
    const subject = 'Account Verification Token'

    let PUBLIC_HOST = config.App.publicHost
    let PORT = config.App.port
    let HOST = config.App.networkHost || config.App.localHost
    let link = ``

    if (PUBLIC_HOST) {
        link = `${PUBLIC_HOST}${config.App.api}/auth/verify/${account._id}/${token}`
    } else
        link = `http://${HOST}:${PORT}${config.App.api}/auth/verify/${account._id}/${token}`

    const tempEmail = await mail.emailTemplate(username, link)

    // const googleApiConfig = {
    //     clientId: config.GoogleApis.clientId,
    //     clientSecret: config.GoogleApis.clientSecret,
    //     redirectUri: config.GoogleApis.redirectUri,
    //     refreshToken: config.GoogleApis.refreshToken,
    // }

    // const accessToken = await googleApis.accessToken(googleApiConfig)

    const transportConfig = {
        host: config.Email.host,
        service: config.Email.service,
        port: 587,
        secure: true,
        auth: {
            user: config.Email.user,
            pass: config.Email.pass,
        },
        // service: config.Email.service,
        // auth: {
        //     type: 'OAuth2',
        //     user: config.Email.user,
        //     clientId: googleApiConfig.clientId,
        //     clientSecret: googleApiConfig.clientSecret,
        //     refreshToken: googleApiConfig.refreshToken,
        //     accessToken: accessToken,
        //     expires: 1484314697598,
        // },
    }

    const mailOptions = {
        from: `ADMIN-ODM 📢 <${config.Email.user}>`,
        to: address,
        subject: subject,
        html: tempEmail,
    }

    return await mail.sendEmail(transportConfig, mailOptions)
}

const verifyAccountHandler = async (id, token) => {
    if (!token) {
        throw new Error('Not have token!', 401)
    }

    const identityData = tokenProvider.verify(token)

    if (!identityData.id && identityData.id !== id) {
        throw new Error('Invalid token!', 401)
    }

    return await AccountModel.findOneAndUpdate(
        { _id: id },
        { emailVerified: true },
        { new: true }
    )
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
    createAccountHandler,
    updateAccountHandler,
    deleteAccountHandler,
    signUpHandler,
    sendEmailHandler,
    verifyAccountHandler,
    loginHandler,
}
