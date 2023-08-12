const HttpError = require('../utilities/httpError')

const validateInput = (schema, property) => {
    return (req, res, next) => {
        // const input = { ...req.params, ...req.body, ...req.query }
        const input = req[property]
        const { error } = schema.validate(input)
        const valid = error == null

        if (valid) {
            next()
        } else {
            const { details } = error
            const message = details.map((i) => i.message).join(',')

            console.log('error', message)
            throw new HttpError(message, 422)
        }
    }
}

module.exports = validateInput
