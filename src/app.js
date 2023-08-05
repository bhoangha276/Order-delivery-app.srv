require('dotenv').config()
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoute = require('./api/v1/components/auth')
const userRoute = require('./api/v1/components/user')
const menuRoute = require('./api/v1/components/menu')
const productRoute = require('./api/v1/components/product')
const employeeRoute = require('./api/v1/components/employee')
const orderRoute = require('./api/v1/components/order')
const orderItemRoute = require('./api/v1/components/order-item')
const InvoiceRoute = require('./api/v1/components/invoice')
const TableRoute = require('./api/v1/components/table')

const errorHandler = require('./api/v1/utilities/errorHandler')
const log = require('./api/v1/middlewares/log')

const api = process.env.API_URL
const port = process.env.PORT
const mongodb = process.env.MONGODB_URI

async function main() {
    await mongoose.connect(mongodb, {
        dbName: 'order-delivery',
    })
    console.log('DB connection successfuly!')

    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(log)

    app.get('/', (req, res) => {
        res.send('API is working! => Go to the /doc for details')
    })

    app.use(`${api}/auth`, authRoute)
    app.use(`${api}/user`, userRoute)
    app.use(`${api}/menu`, menuRoute)
    app.use(`${api}/product`, productRoute)
    app.use(`${api}/employee`, employeeRoute)
    app.use(`${api}/order`, orderRoute)
    app.use(`${api}/order-item`, orderItemRoute)
    app.use(`${api}/invoice`, InvoiceRoute)
    app.use(`${api}/table`, TableRoute)

    app.use(errorHandler)

    app.listen(port || 8000, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running http://localhost:${port}`
        )
    })
}

main()
