const mongoose = require('mongoose')

const connect = async (uri, options) => {
    await mongoose.connect(uri, options).catch((err) => {
        throw new Error(err)
    })

    console.log('DB connection successfuly!')
}

module.exports = {
    connect,
}
