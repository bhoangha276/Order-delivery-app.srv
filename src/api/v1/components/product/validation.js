const Joi = require('joi').extend(require('@joi/date'))

const createSchema = Joi.object({
    menuID: Joi.string(),
    name: Joi.string().max(100).required(),
    price: Joi.number(),
    imageUrl: Joi.string().required(),
})

// Remove 'required() of fields'
const updateSchema = Joi.object({
    menuID: Joi.string(),
    name: Joi.string().max(100),
    price: Joi.number(),
    imageUrl: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema,
}
