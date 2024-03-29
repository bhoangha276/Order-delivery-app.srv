const errorHandler = (err, req, res, next) => {
    const status = err.status || 500

    res.status(status).send({
        success: 0,
        data: null,
        message: err.message || 'Something went wrong',
    })
}

module.exports = errorHandler
