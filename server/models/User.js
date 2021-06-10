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

userSchema.statics.randomUsername = async function(user) {
    
    const newUsername = user.email.split('@')[0] + Date.now();
    
    return this.findByIdAndUpdate(user._id, { username: newUsername }, { new: true });
}

userSchema.plugin(passportLocalMongoose, passportLocalMongooseOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;