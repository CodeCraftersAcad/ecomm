exports.generateResetPasswordEmailTemplate = (email, passwordResetCode) => {
    return {
        from: process.env.ORIGIN_EMAIL,
        to: email,
        subject: 'Ecomm Study site Reset Password',
        html: `
            <h1>Reset Password</h1>
            <code>
                <p>Reset code: ${passwordResetCode}</p>
            </code>
            <p>Click this <a href="${process.env.ORIGIN}/reset-password/${email}">link</a> to reset your password.</p>
        `
    }
}