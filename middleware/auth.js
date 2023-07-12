const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const errorHandler = require('../utils/error-handler/controller-errors');

// Check if public-controllers is logged in
exports.userTokenAuth = async (req, res, next) => {
    try {
        // Check for Bearer token
        const authHeader = req.headers['authorization'];

        const bearerCheck = authHeader && authHeader.split(' ');
        // Check token is Bearer token
        if (!bearerCheck || bearerCheck[0] !== 'Bearer') {
            return res.status(500).send({message: 'Invalid Auth: No Auth Token', expiredToken: true});
        }

        // Get token
        const token = bearerCheck[1];
        if (!token) return res.status(500).send({message: 'Invalid Auth: No Auth Token'});
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                await errorHandler(error, req);
                return res.status(500).send({message: 'Invalid Auth or No Auth Token', expiredToken: true});
            }

            // Check token expiration
            if (Date.now() >= decoded.exp * 1000) {
                return res.status(401).send({message: 'Token has expired', expiredToken: true});
            }

            // If token is found, set requesting public-controllers to the found public-controllers
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.log('Error in userTokenAuth');
        await errorHandler(error, req);
        return res.status(500).send({message: error.message});
    }
};

// Check if public-controllers is admin-controllers
exports.authAdmin = async (req, res, next) => {
    try {
        const id = req.user;
        const user = await User.findOne({_id: id.id});

        if (!user) return res.status(400).send({msg: 'No user found', access: false});

        // Check the user role
        if (user.role !== 'admin') return res.status(400).send({
            msg: 'Umm... Yeah you are not allowed to preform this action... What are you trying to do??? ACCESS DENIED!',
            access: false
        });
        next();
    } catch (error) {
        console.log('Error in authAdmin');
        await errorHandler(error, req);
        return res.status(500).send({msg: error.message, access: false});
    }
};

exports.generateAccessToken = (user, remember) => {
    return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: remember ? '14d' : '12h'});
};
