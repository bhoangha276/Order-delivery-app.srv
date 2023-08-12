const Joi = require('joi').extend(require('@joi/date'))

const createSchema = Joi.object({
    position: Joi.string().max(50),
    name: Joi.string().max(100).required(),
    gender: Joi.string().valid('male', 'female'),
    birthday: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).utc(),
    phone: Joi.string().min(10).max(11).required(),
    photo: Joi.string(),
})

// Remove 'required() of fields'
const updateSchema = Joi.object({
    position: Joi.string().max(50),
    name: Joi.string().max(100),
    gender: Joi.string().valid('male', 'female'),
    birthday: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).utc(),
    phone: Joi.string().min(10).max(11),
    photo: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema,
}
