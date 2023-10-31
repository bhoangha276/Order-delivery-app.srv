require('dotenv').config()

const App = {
    baseUrlNetwork: process.env.BASE_URL_NETWORK,
    baseUrlLocal: process.env.BASE_URL_LOCAL,
    api: process.env.API_URL,
    port: process.env.PORT || 8000,

    mongoUri: process.env.MONGODB_URI,
    connectOptions: {
        dbName: 'order-delivery',
    },
}

const JWT = {
    privateKey: process.env.JWT_PRIVATE_KEY,
    expireTime: process.env.JWT_EXPIRE_TIME,
    refreshToken: process.env.JWT_REFRESH_TOKEN,
}

const Firebase = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}

const Email = {
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
}

const GoogleApis = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
}

module.exports = {
    App,
    Firebase,
    Email,
    GoogleApis,
    JWT,
}
