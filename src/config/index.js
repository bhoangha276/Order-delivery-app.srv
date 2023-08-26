require('dotenv').config()

const configApp = {
    api: process.env.API_URL,
    port: process.env.PORT || 8000,

    mongo_uri: process.env.MONGODB_URI,
    connectOptions: {
        dbName: 'order-delivery',
    },
}

module.exports = { configApp }
