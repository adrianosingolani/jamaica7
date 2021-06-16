const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema(
    {
        role: {
            type: String,
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
        username: {
            type: String,
            lowercase: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true,
        },
        email_confirmed: {
            type: Boolean,
            default: false,
        },
        email_temporary_token: {
            type: String,
            unique: true,
        },
        password_temporary_token: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true
    }
);

const passportLocalMongooseOptions = {
    usernameField: 'email',
    findByUsername: function (model, queryParameters) {
        // Add additional query parameter - AND condition - active: true
        queryParameters.active = true;
        return model.findOne(queryParameters);
    },
    errorMessages: {
        UserExistsError: 'A user with the given email is already registered',
        MissingUsernameError: 'No email was given',
    }
}

userSchema.statics.returnUserToClient = function(user) {
    const clientUser = {
        username: user.username,
        email: user.email,
        email_confirmed: user.email_confirmed,
    }
    
    return clientUser;
}

userSchema.plugin(passportLocalMongoose, passportLocalMongooseOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;