require('dotenv').config()

const App = {
    baseUrl: process.env.BASE_URL,
    api: process.env.API_URL,
    port: process.env.PORT || 8000,

    mongoUri: process.env.MONGODB_URI,
    connectOptions: {
        dbName: 'order-delivery',
    },
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
    host: process.env.HOST,
    service: process.env.SERVICE,
    user: process.env.USER,
    pass: process.env.PASS,
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
}
