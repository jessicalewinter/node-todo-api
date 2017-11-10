const mongoose = require('mongoose');
const validator =  require('validator');

var Users = mongoose.model('Users', {
    username: {
        type: String,
        unique: true,
    },    
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
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens:[{
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

module.exports = {Users};