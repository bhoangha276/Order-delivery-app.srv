const nodemailer = require('nodemailer')

const sendEmail = async (transportConfig, mailOptions) => {
    try {
        const transporter = nodemailer.createTransport(transportConfig)

        transporter.verify((err, success) => {
            // if (err) throw Error(err)
            // console.log('Your config is correct')
        })

        return await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log('email not sent')
        console.log(err)
    }
}

module.exports = {
    sendEmail,
}
