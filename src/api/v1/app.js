const express = require('express')
const cors = require('cors')

const log = require('../v1/middlewares/log')
const errorHandler = require('./utilities/errorHandler')

const AuthRoute = require('./components/auth')
const UserRoute = require('./components/user')
const MenuRoute = require('./components/menu')
const ProductRoute = require('./components/product')
const EmployeeRoute = require('./components/employee')
const OrderRoute = require('./components/order')
const OrderItemRoute = require('./components/order-item')
const InvoiceRoute = require('./components/invoice')
const TableRoute = require('./components/table')
const UploadRouter = require('./components/upload')

const config = require('./config')

const api = config.App.api

const app = express()
app.use(cors())
app.use(log)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is working! => Go to the /docs for details')
})

app.use(express.static('public'))
app.use(`/uploads`, express.static('uploads'))
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

module.exports = app
