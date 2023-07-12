const {generateSignupEmailTemplate} = require('../../utils/email-templates/regieter-user-email-util');
const mailer = require('../../config/node-mailer-config');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {generateResetPasswordEmailTemplate} = require("../../utils/email-templates/user-password-reset-email-util");

exports.sendUserValidationEmailService = async (user, req) => {
    try {
        let emailMessage = generateSignupEmailTemplate(user);
        return mailer.sendMail(emailMessage, async (error) => {
            if (error) {
                await errorHandler(error, req);
                return {
                    status: 500,
                    message: 'An error occurred while sending the user validation email-template.',
                    sent: false
                }
            }
            return {
                status: 200,
                message: 'User validation email-template sent successfully.',
                sent: true
            }
        });
    } catch (error) {
        console.log('Error in sendUserValidationEmailService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while sending the email-templates.',
            sent: false
        }
    }
};

exports.sendPasswordResetEmailService = async (email, passwordResetCode, req) => {
    let emailToSend = generateResetPasswordEmailTemplate(email, passwordResetCode);
    mailer.sendMail(emailToSend, async (error) => {
        if (error) {
            await errorHandler(error, req);
            return {
                status: 500,
                message: 'An error occurred while sending the email.',
                email: {}
            }
        } else {
            return {
                status: 200,
                message: 'Email password reset sent successfully.',
                email
            }
        }
    })
}
