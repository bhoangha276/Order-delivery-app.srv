require('express-async-errors')

const config = require('./api/v1/config')
const mongoDB = require('../db')
const app = require('./api/v1/app')

async function main() {
    await mongoDB.connect(config.App.mongoUri, config.App.connectOptions)

    app.listen(config.App.port, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running http://localhost:${config.App.port}`
        )
    })

    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLED REJECTION!!!  shutting down ...')
        console.log(err.name, err.message)
        server.close(() => {
            process.exit(1)
        })
    })
}

main()
