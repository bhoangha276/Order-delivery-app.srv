require('express-async-errors')

const config = require('./api/v1/config')
const mongoDB = require('../db')
const app = require('./api/v1/app')

let PORT = config.App.port
let HOST = config.App.networkhost || config.App.localhost

async function main() {
    await mongoDB.connect(config.App.mongoUri, config.App.connectOptions)

    const server = await app.listen(PORT, HOST, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running on: http://${HOST}:${PORT}`
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
