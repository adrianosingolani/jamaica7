const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        role: {
            type: String,
            default: 'user',
        },
        email: {
            type: String,
            lowercase: true,
            unique: [true, 'already in use'],
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
        },
        email_confirmed: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            trim: true,
            minlength: 6,
            maxlength: 60,
        },
        username: {
            type: String,
            lowercase: true,
            unique: [true, 'already in use'],
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
        },
        temporary_token: {
            type: String,
            default: null,
            unique: [true, 'already in use'],
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;