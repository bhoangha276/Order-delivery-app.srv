const Joi = require('joi').extend(require('@joi/date'))

const createSchema = Joi.object({
    name: Joi.string().max(100).required(),
    address: Joi.array(),
    gender: Joi.string().valid('male', 'female'),
    birthday: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).utc(),
    phone: Joi.string().min(10).max(11).required(),
    photo: Joi.string(),
})

// Remove 'required() of fields'
const updateSchema = Joi.object({
    name: Joi.string().max(100),
    address: Joi.array(),
    gender: Joi.string().valid('male', 'female'),
    birthday: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).utc(),
    phone: Joi.string().min(10).max(11),
    photo: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema,
}
