const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Set session expiration time (e.g., 1 day)
    },
});

module.exports = sessionMiddleware;
