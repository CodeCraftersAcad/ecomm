const ErrorLogger = require('../../models/ErrorLoggerModel');
const logger = require('../../config/winston-config')

const errorHandler = async (error, req) => {
    const errorLog = new ErrorLogger({
        message: error.message,
        stack: error.stack,
        timestamp: new Date(),
        pathname: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        user: req.user ? req.user._id : null,
    });

    await errorLog.save();
    logger.error('PCra... You made an error occur', error);
};

module.exports = errorHandler;