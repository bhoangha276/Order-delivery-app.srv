const { google } = require('googleapis')

const accessToken = async (googleApiConfig) => {
    const oAuth2Client = new google.auth.OAuth2(
        googleApiConfig.clientId,
        googleApiConfig.clientSecret,
        googleApiConfig.redirectUri
    )

    oAuth2Client.setCredentials({ refresh_token: googleApiConfig.refreshToken })

    return await oAuth2Client.getAccessToken()
}

module.exports = {
    accessToken,
}
