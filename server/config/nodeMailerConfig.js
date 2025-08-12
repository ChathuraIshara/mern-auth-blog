const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport(
    {
        host:"smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
)
// In node mailer,we need to create a transporter,for that we need SMTP settings like host, port, and auth credentials.for that we can create Brevo account for free use,
// In brevo account we can find these configs under smtp and api settings

module.exports = transporter