const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.listen(8000, (err) => {
    if (err) throw err
    console.log('Order-delivery-management server is running!')
})

app.get('/', (req, res) => {
    res.send('API is working! => Go to the /doc for details')
})
