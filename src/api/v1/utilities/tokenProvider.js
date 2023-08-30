const jwt = require('jsonwebtoken')
const config = require('../config')

const sign = (id, role) => {
    const identityData = {
        id,
        role,
    }
    const token = jwt.sign(identityData, config.JWT.privateKey, {
        expiresIn: config.JWT.expireTime,
    })

    return token
}

const verify = (token) => {
    return jwt.verify(token, config.JWT.privateKey)
}

module.exports = {
    sign,
    verify,
}
