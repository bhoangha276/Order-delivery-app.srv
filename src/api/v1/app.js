const express = require('express')
const cors = require('cors')

const log = require('../v1/middlewares/log')
const errorHandler = require('./utilities/errorHandler')

const AuthRoute = require('./components/auth')
const UserRoute = require('./components/user')
const ProductRoute = require('./components/product')
const EmployeeRoute = require('./components/employee')
const OrderRoute = require('./components/order')
const OrderItemRoute = require('./components/order-item')
const InvoiceRoute = require('./components/invoice')
// const TableRoute = require('./components/table')
// const MenuRoute = require('./components/menu')
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

app.use(`${api}/upload`, UploadRouter)
app.use(`${api}/auth`, AuthRoute)
app.use(`${api}/users`, UserRoute)
app.use(`${api}/products`, ProductRoute)
app.use(`${api}/employees`, EmployeeRoute)
app.use(`${api}/orders`, OrderRoute)
app.use(`${api}/order-items`, OrderItemRoute)
app.use(`${api}/invoices`, InvoiceRoute)
// app.use(`${api}/tables`, TableRoute)
// app.use(`${api}/menus`, MenuRoute)

app.use(errorHandler)

module.exports = app
