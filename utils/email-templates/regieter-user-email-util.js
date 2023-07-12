exports.generateSignupEmailTemplate = user => {
    return {
        to: user.email,
        from: process.env.ORIGIN_EMAIL,
        subject: `Ecomm store verification email for ${user.firstName} ${user.lastName}`,
        html: `
            <div>
                <h3>
                    This email contains sensitive information. Please do not share this email with anyone. It is only valid for the next 15mins.
                </h3>
            </div>
            <div>
                <h4>       
                    Code: <span style="font-size: 26px; font-weight: bold; padding: 5px; letter-spacing: 4px">${user.emailVerificationCode}</span>
                </h4>
            </div>
        <br>
        `
    }
};

