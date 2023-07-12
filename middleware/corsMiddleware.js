// corsMiddleware.js
const cors = require('cors');

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: [],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
