const mongoose = require('mongoose');
const validator =  require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByToken = function (token) {
    var Users = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        return Promise.reject();
    }

    return Users.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var users = this;

    if (users.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(users.password, salt, (err, hash) => {
                users.password = hash;
                 next();
            });
        });
    } else{
        next();
    }
});

var Users = mongoose.model('Users', UserSchema);

module.exports = {Users};