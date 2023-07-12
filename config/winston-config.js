const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');

// Configure the Winston logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winstonDailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;
