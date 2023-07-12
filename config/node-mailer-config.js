const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ORIGIN_EMAIL,
        pass: process.env.ORIGIN_EMAIL_PASSWORD,
    }
});

module.exports = mailer;
