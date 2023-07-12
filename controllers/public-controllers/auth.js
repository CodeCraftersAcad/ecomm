const {
    registerUserService,
    checkEmailAvailabilityService,
    loginUserService,
    validateUserEmailService
} = require("../../services/controller-services/auth-services");
const {sendUserValidationEmailService} = require("../../services/controller-services/email-services");
const errorHandler = require("../../utils/error-handler/controller-errors");
const {sendErrorResponse} = require("../../utils/error-handler/error-response");

/*
  * Description: Checks if the user email is available
*/
exports.checkEmailAvailability = async (req, res) => {
    const {email} = req.body;
    try {
        const {status, message, available} = await checkEmailAvailabilityService(email, req);

        res.status(status).send({message, available});
    } catch (error) {
        console.log('Error in checkEmailAvailabilityController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while checking the email-templates availability.', {available: false});
    }
};

/*
  * Description: Registers a new user
*/
exports.registerUser = async (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body;

    try {
        const {status, message, token, emailVerificationCode} =
            await registerUserService({
                firstName,
                lastName,
                email,
                password,
                phone
            }, req);

        if (status === 201)
            await sendUserValidationEmail({
                firstName,
                lastName,
                email,
                emailVerificationCode
            }, req);

        res.status(status).send({message, token});
    } catch (error) {
        console.log('Error in registerUserController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while registering the user. Please try again. If the problem persists please contact us.', {token: ''});
    }
};

/*
  * Description: Login a user.
*/
exports.loginUser = async (req, res) => {
    try {
        const {email, password, remember} = req.body;
        const {status, token, message} = await loginUserService(email, password, remember, req);

        res.status(status).send({message, token});
    } catch (error) {
        console.log('Error in loginUserController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while logging in. Please try again. If the problem persists please contact us.', {token: ''});
    }
};

/*
  * Description: Route for frontend to check for an existing email.
*/
exports.validateUserEmail = async (req, res) => {
    try {
        let {email, code} = req.body;
        let {status, message, validated} = await validateUserEmailService(email, code, req);

        res.status(status).send({message, validated});
    } catch (error) {
        console.log('Error in checkEmailVerificationController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while checking the email verification.', {validated: false});
    }
};

/*
  * Description: Function to send the user a validation email.
*/
const sendUserValidationEmail = async ({firstName, lastName, email, emailVerificationCode}, req) => {
    if (process.env.NODE_ENV === 'development')
        return await sendUserValidationEmailService({firstName, lastName, email, emailVerificationCode}, req);
};
