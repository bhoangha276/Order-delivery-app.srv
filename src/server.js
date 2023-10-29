require('express-async-errors')

const config = require('./api/v1/config')
const mongoDB = require('../db')
const app = require('./api/v1/app')

async function main() {
    await mongoDB.connect(config.App.mongoUri, config.App.connectOptions)

    const server = app.listen(config.App.port, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running ${config.App.baseUrl}${config.App.port}`
        )
    })

    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLED REJECTION!!!\nShutting down ...')
        console.log(err.name, err.message)
        server.close(() => {
            process.exit(1)
        })
    })
}

module.exports = main
