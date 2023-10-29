const Joi = require('joi').extend(require('@joi/date'))

const createSchema = Joi.object({
    menuID: Joi.string(),
    name: Joi.string().max(100).required(),
    price: Joi.number(),
    imageUrl: Joi.string().required(),
    tags: Joi.array(),
    origins: Joi.array(),
    cookTime: Joi.string(),
})

// Remove 'required() of fields'
const updateSchema = Joi.object({
    menuID: Joi.string(),
    name: Joi.string().max(100),
    price: Joi.number(),
    imageUrl: Joi.string(),
    tags: Joi.array(),
    origins: Joi.array(),
    cookTime: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema,
}
