const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email-templates']
    },
    emailVerification: {
        emailVerificationCode: {
            type: String,
            required: false
        },
        emailVerificationCodeExpiration: {
            type: Date,
            required: false
        },
        emailVerified: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    passwordReset: {
        passwordResetCode: {
            type: String,
            required: false
        },
        passwordResetCodeExpiration: {
            type: Date,
            required: false
        }
    },
    phone: String,
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    accountStatus: {
        type: String,
        enum: ['pending', 'active', 'paused'],
        default: 'pending'
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    creditCardTokens: [{
        type: Schema.Types.ObjectId,
        ref: 'CreditCardToken',
        required: false
    }],
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: false,
    }],
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    profilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    preferences: {
        type: Schema.Types.ObjectId,
        ref: 'Preferences'
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Favorite'
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    lastLogin: Date
}, {
    timestamps: true
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
