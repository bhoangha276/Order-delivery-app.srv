require('dotenv').config()
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

const AuthRoute = require('./api/v1/components/auth')
const UserRoute = require('./api/v1/components/user')
const MenuRoute = require('./api/v1/components/menu')
const ProductRoute = require('./api/v1/components/product')
const EmployeeRoute = require('./api/v1/components/employee')
const OrderRoute = require('./api/v1/components/order')
const OrderItemRoute = require('./api/v1/components/order-item')
const InvoiceRoute = require('./api/v1/components/invoice')
const TableRoute = require('./api/v1/components/table')
const UploadRouter = require('./api/v1/components/upload')

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
    app.use(log)
    app.use(express.json())

    app.use(express.static('public'))
    app.use(`${api}/uploads`, express.static('uploads'))

    app.get('/', (req, res) => {
        res.send('API is working! => Go to the /doc for details')
    })

    app.use(`${api}/auth`, AuthRoute)
    app.use(`${api}/user`, UserRoute)
    app.use(`${api}/menu`, MenuRoute)
    app.use(`${api}/product`, ProductRoute)
    app.use(`${api}/employee`, EmployeeRoute)
    app.use(`${api}/order`, OrderRoute)
    app.use(`${api}/order-item`, OrderItemRoute)
    app.use(`${api}/invoice`, InvoiceRoute)
    app.use(`${api}/table`, TableRoute)
    app.use(`${api}/upload`, UploadRouter)

    app.use(errorHandler)

    app.listen(port || 8000, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running http://localhost:${port}`
        )
    })
}

main()
