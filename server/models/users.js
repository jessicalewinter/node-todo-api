const mongoose = require('mongoose');
const validator =  require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }

    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var users = this;
    var userObject = users.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var users = this;
    var access = 'auth';
    var token = jwt.sign({_id: users._id.toHexString(), access},'abc123').toString();

    users.tokens.push({access, token});

    return users.save().then(() => {
        return token;
    });
};

var Users = mongoose.model('Users', UserSchema);

module.exports = {Users};