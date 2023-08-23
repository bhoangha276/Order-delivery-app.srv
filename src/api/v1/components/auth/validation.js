const Joi = require('joi')

const createSchema = Joi.object({
    employeeID: Joi.string(),
    userID: Joi.string(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid('admin', 'employee', 'user'),
})

// Remove 'required() of fields'
const updateSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().min(5),
    role: Joi.string().valid('admin', 'employee', 'user'),
})

// Default is user
const signupSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string().min(5).required(),
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string().min(5).required(),
})

module.exports = {
    createSchema,
    updateSchema,

    signupSchema,
    loginSchema,
}
