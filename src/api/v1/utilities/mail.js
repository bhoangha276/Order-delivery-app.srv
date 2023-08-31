const MailGen = require('mailgen')
const nodemailer = require('nodemailer')

const emailTemplate = async (username, verifiLink) => {
    const email = {
        body: {
            name: username, // name user signup
            intro: 'Welcome to email verification',
            action: {
                instructions:
                    'Please click the button below to verify your account',
                button: {
                    color: '#33b5e5',
                    text: 'Verify account',
                    link: verifiLink,
                },
            },
        },
    }

    const mailGenerator = await new MailGen({
        theme: 'salted',
        product: {
            name: 'Order & delivery app',
            link: `http://127.0.0.1:8000/`, // url web app
            // logo: your app logo url
        },
    })

    return await mailGenerator.generate(email)
}

const sendEmail = async (transportConfig, mailOptions) => {
    try {
        const transporter = nodemailer.createTransport(transportConfig)

        // transporter.verify((err, success) => {
        //     // if (err) throw Error(err)
        //     // console.log('Your config is correct')
        // })

        return await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log('email not sent')
        console.log(err)
    }
}

module.exports = {
    emailTemplate,
    sendEmail,
}
