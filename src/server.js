require('express-async-errors')

const config = require('./config')
const mongoDB = require('../db')
const app = require('./api/v1/app')

async function main() {
    await mongoDB.connect(
        config.configApp.mongo_uri,
        config.configApp.connectOptions
    )

    app.listen(config.configApp.port, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running http://localhost:${config.configApp.port}`
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
