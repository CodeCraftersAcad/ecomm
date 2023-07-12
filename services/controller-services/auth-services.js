const User = require('../../models/UserModel');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {generateAccessToken} = require('../../middleware/auth');
const bcrypt = require('bcrypt');

/*
  * Description: Service worker to check if email is available
  * File Usage: controllers/public-controllers/auth-routes.js
  * Params: email
*/
exports.checkEmailAvailabilityService = async (email, req) => {
    try {
        const user = await User.findOne({email});
        if (user) return {status: 200, message: 'Email already in use.', available: false};

        return {status: 200, message: 'Email is available', available: true};
    } catch (error) {
        console.log('Error in checkEmailAvailabilityService');
        await errorHandler(error, req);
        return {status: 500, message: 'An error occurred while checking email availability.', available: false};
    }
}

/*
  * Description: Service worker to register a new user
  * File Usage: controllers/public-controllers/auth-routes.js
  * Params: user: {firstName, lastName, email, password, phone}
*/
exports.registerUserService = async (user, req) => {
    try {
        let newUser = await User.create(user);
        if (!newUser) return {status: 400, message: 'User not created.', token: ''};

        let token = await generateAccessToken(newUser._id);
        if (!token) {
            await User.deleteOne({_id: newUser._id});
            return {status: 400, message: 'Error in generating token. User deleted.', token: ''};
        }

        // Generate email-templates verification code
        const emailVerificationCode = Math.random().toString(36).slice(-8);
        const emailVerificationCodeExpiration = Date.now() + 15 * 60 * 1000; // Expires in 15 minutes

        newUser.emailVerification = {
            emailVerificationCode, emailVerificationCodeExpiration, emailVerified: false
        };

        await newUser.save();

        return {
            status: 201, message: 'User created.', token, emailVerificationCode
        };
    } catch (error) {
        console.log('Error in registerUserService');
        await errorHandler(error, req);
        return {
            status: 500, message: error, token: ''
        };
    }
};

/*
  * Description: Service worker to login a user
  * File Usage: controllers/public-controllers/auth-routes.js
  * Params: email, password, remember
*/
exports.loginUserService = async (email, password, remember, req) => {
    try {
        let loginUser = await User.findOne({email});
        if (!loginUser) return {status: 400, message: 'User does not exist.', token: ''};

        let isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) return {status: 400, message: 'Invalid credentials.', token: ''};

        loginUser.lastLogin = Date.now();
        await loginUser.save();

        return {
            status: 201, token: await generateAccessToken(loginUser._id, remember), message: 'User logged in.'
        };
    } catch (error) {
        console.log('Error in loginUserService');
        await errorHandler(error, req);
        return {
            status: 500, message: error, token: ''
        };
    }
};

/*
  * Description: Service worker to check if email is verified
  * File Usage: controllers/public-controllers/auth-routes.js
  * Params: email code
*/
exports.validateUserEmailService = async (email, verificationCode, req) => {
    try {
        const user = await User.findOne({email});
        if (!user) return {status: 404, message: 'User does not exist.', validated: false};

        if (user.accountStatus === 'active') return {
            status: 200, message: 'This account has already been verified.', validated: true
        };

        if (user.emailVerification.emailVerificationCode !== verificationCode) return {
            status: 400, message: 'Invalid code or code has expired. Please request a new code.', validated: false
        };

        if (user.emailVerification.emailVerificationCodeExpiration < Date.now()) return {
            status: 400, message: 'Invalid code or code has expired. Please request a new code.', validated: false
        };

        if (user.accountStatus === 'paused') return {
            status: 400,
            message: 'This account has been paused. Please contact support for more information.',
            validated: false
        }

        if (user.emailVerification.emailVerified === verificationCode) {
            user.accountStatus = 'active';
            user.emailVerification = {
                emailVerificationCode: '', emailVerificationCodeExpiration: '', emailVerified: true
            };
            await user.save();
        }

        return {status: 200, message: 'Thank you for verifying your account', validated: true};
    } catch (error) {
        console.log('Error in checkEmailVerificationService');
        await errorHandler(error, req);
        return {
            status: 500, message: error.message, code: {}
        }
    }
}

