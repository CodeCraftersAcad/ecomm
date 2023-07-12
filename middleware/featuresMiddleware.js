// Middleware function to check if the specified feature is enabled
const isFeatureEnabled = (feature) => {
    return (req, res, next) => {
        const isEnabled = process.env[feature] === 'true';

        if (isEnabled) {
            next();
        } else {
            const statusCode = 403;
            const message = `The feature '${feature}' is not allowed with your plan. Please upgrade your plan to use '${feature}'`;
            res.status(statusCode).send({ message, authorized: false });
        }
    };
};

module.exports = isFeatureEnabled;