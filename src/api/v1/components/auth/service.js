const bcrypt = require('bcryptjs')
const AccountModel = require('./account')
const mongoose = require('mongoose')

const config = require('../../config')
const mail = require('../../utilities/mail')
const googleApis = require('../../utilities/googleApis')

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

const signUpHandler = async (email, password) => {
    const existedAccount = await AccountModel.findOne({ email })
    if (existedAccount) {
        throw new Error('This email address is already used!', 400)
    }

    //   const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 10)

    return await AccountModel.create({
        email,
        password: hashPassword,
    })
}

const sendEmailHandler = async (account, token) => {
    const address = account.email
    const subject = 'Account Verification Token'
    const link = `${config.App.baseUrl}${config.App.port}${config.App.api}/verify/${account._id}/${token}`
    const message = `<p>Welcom you.<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
    <br><p>If you did not request this, please ignore this email.</p>`

    const googleApiConfig = {
        clientId: config.GoogleApis.clientId,
        clientSecret: config.GoogleApis.clientSecret,
        redirectUri: config.GoogleApis.redirectUri,
        refreshToken: config.GoogleApis.refreshToken,
    }

    const accessToken = await googleApis.accessToken(googleApiConfig)

    const transportConfig = {
        // host: config.Email.host,
        service: config.Email.service,
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // logger: true,
        // debug: true,
        // secureConnection: false,
        auth: {
            type: 'OAuth2',
            user: config.Email.user,
            // pass: config.Email.pass,
            clientId: googleApiConfig.clientId,
            clientSecret: googleApiConfig.clientSecret,
            refreshToken: googleApiConfig.refreshToken,
            accessToken: accessToken,
            expires: 1484314697598,
        },
        // tls: {
        //     rejectUnAuthorized: false,
        // },
    }

    const mailOptions = {
        from: config.Email.user,
        to: address,
        subject: subject,
        text: message,
    }

    return await mail.sendEmail(transportConfig, mailOptions)
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
    loginHandler,
}
