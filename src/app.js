require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const userRoute = require('./api/v1/components/user')
const menuRoute = require('./api/v1/components/menu')
const productRoute = require('./api/v1/components/product')
const employeeRoute = require('./api/v1/components/employee')

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
    app.use(morgan('tiny'))

    app.listen(port || 8000, (err) => {
        if (err) throw err
        console.log(
            `Order-delivery-management server is running http://localhost:${port}`
        )
    })

    app.get('/', (req, res) => {
        res.send('API is working! => Go to the /doc for details')
    })

    app.use(`${api}/user`, userRoute)
    app.use(`${api}/menu`, menuRoute)
    app.use(`${api}/product`, productRoute)
    app.use(`${api}/employee`, employeeRoute)
}

main()
